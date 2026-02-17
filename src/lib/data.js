import { supabase } from './supabase'

/**
 * Fetches all active subscription plans from the database, ordered by tier level.
 * @returns {Promise<Array<Object>|null>} A promise that resolves to an array of plan objects or null on error.
 */
export async function fetchSubscriptionPlans() {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('tier_level', { ascending: true })

    if (error) {
      limits: typeof plan.limits === 'string' ? JSON.parse(plan.limits) : plan.limits,
    }))

    return plans
  } catch (e) {