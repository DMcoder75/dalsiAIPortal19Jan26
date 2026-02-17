// Usage tracking utility for guest and logged-in users
import { supabase } from './supabase'

// Global variable to store the dynamic guest limit
let GUEST_LIMIT = 1 // Default value, will be updated from DB

/**
 * Fetches the guest message limit from the 'Free' plan in the database.
 */
export const fetchGuestLimit = async () => {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('limits')
      .eq('name', 'Free')
      .single()

    if (error) throw error

    if (data && data.limits && data.limits.queries_per_day) {
      GUEST_LIMIT = data.limits.queries_per_day

export const canGuestSendMessage = () => {
  return getGuestMessageCount() < GUEST_LIMIT
}

/**
 * Check if logged-in user can send message
 * @param {number} userMessageCount - Total messages sent by user from DB
 * @param {object} subscription - User subscription object with tier info
 * @param {object} planLimits - Plan limits from subscription_plans table
 */
export const canUserSendMessage = (userMessageCount, subscription, planLimits) => {
  // If user has active subscription (not free tier)
  if (subscription && subscription.status === 'active' && subscription.tier !== 'free') {
    return { canSend: true, reason: 'subscribed' }
  }

  // Get limit from plan limits or use default
  const dailyLimit = planLimits?.queries_per_day || Infinity
  
  // For free tier or no subscription, check if unlimited
  if (dailyLimit === Infinity || dailyLimit === -1) {
    return { canSend: true, reason: 'unlimited' }
  }

  // Check if user has reached limit
  if (userMessageCount >= dailyLimit) {
    return { 
      canSend: false, 
      reason: 'limit_reached',
      remaining: 0
    }
  }

  return { 
    canSend: true, 
    reason: 'free_tier',
    remaining: dailyLimit - userMessageCount
  }
}

/**
 * Get usage status for display
 * @param {boolean} isGuest - Whether user is a guest
 * @param {number} userMessageCount - Total messages sent by user
 * @param {object} subscription - User subscription with tier info
 * @param {object} planLimits - Plan limits from subscription_plans table
 */
export const getUsageStatus = (isGuest, userMessageCount, subscription, planLimits) => {
  if (isGuest) {
    const guestCount = getGuestMessageCount()
    return {
      isGuest: true,
      used: guestCount,
      limit: GUEST_LIMIT,
      remaining: Math.max(0, GUEST_LIMIT - guestCount),
      needsLogin: guestCount >= GUEST_LIMIT,
      needsSubscription: false
    }
  }

  // Get subscription tier name
  const tierName = subscription?.tier || subscription?.plan_type || 'free'
  
  // Check if user has paid subscription (pro, enterprise, etc)
  const isPaidTier = tierName && tierName.toLowerCase() !== 'free'
  
  // Get daily limit from plan limits
  const dailyLimit = planLimits?.queries_per_day
  
  // If paid tier or unlimited plan
  if (isPaidTier || dailyLimit === Infinity || dailyLimit === -1 || dailyLimit === null) {
    return {
      isGuest: false,
      used: userMessageCount,
      limit: Infinity,
      remaining: Infinity,
      needsLogin: false,
      needsSubscription: false,
      subscriptionType: tierName
    }
  }

  // Free tier with limits
  const limit = dailyLimit || 10 // Default to 10 if not specified
  
  return {
    isGuest: false,
    used: userMessageCount,
    limit: limit,
    remaining: Math.max(0, limit - userMessageCount),
    needsLogin: false,
    needsSubscription: userMessageCount >= limit,
    subscriptionType: tierName
  }
}

export { GUEST_LIMIT }
