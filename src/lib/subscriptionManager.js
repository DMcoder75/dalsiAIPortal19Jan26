/**
 * Subscription Manager Service
 * Handles all subscription-related operations using Supabase client
 */

import { supabase } from './supabase'

export const subscriptionManager = {
  /**
   * Get user's current active subscription with plan details
   */
  async getCurrentSubscription(userId) {
    try {
          auto_renew: true
        }])
        .select()
        .single()
      
      if (subError) {
          updated_at: new Date().toISOString()
        })
        .eq('id', currentSub.id)
      
      if (updateError) {
          updated_at: new Date().toISOString()
        })
        .eq('id', currentSub.id)
      
      if (cancelError) {
          to_plan:to_plan_id (name, display_name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) {