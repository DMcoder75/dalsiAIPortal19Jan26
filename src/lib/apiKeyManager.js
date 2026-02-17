/**
 * API Key Management Utility
 * 
 * Handles fetching and updating API keys from the api_keys table
 * Tracks usage statistics for each API key
 */

import { supabase } from './supabase';

// Cache API keys to reduce database queries
const apiKeyCache = new Map();

/**
 * Get the active API key for a user
 * Fetches from database and caches for performance
 * 
 * @param {string} userId - User UUID
 * @returns {Promise<Object|null>} - API key record or null
 */
export const getUserApiKey = async (userId) => {
  if (!userId) {
    return null;
  }

  // Check cache first
  if (apiKeyCache.has(userId)) {
    const cached = apiKeyCache.get(userId);
    return cached;
  }

  try {
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, user_id, key_prefix, key_hash, name, is_active, subscription_tier, rate_limit_per_minute, rate_limit_per_hour, rate_limit_per_day')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    // Cache the API key
    apiKeyCache.set(userId, data);
      name: data.name,
      prefix: data.key_prefix
    });

    return data;

  } catch (error) {
    return null;
  }
};

/**
 * Update API key usage statistics
 * Increments counters and updates last used information
 * 
 * @param {string} apiKeyId - API key UUID
 * @param {Object} usageData - Usage data to update
 * @param {number} usageData.tokens_used - Tokens consumed in this request
 * @param {number} usageData.cost_usd - Cost of this request in USD
 * @param {string} usageData.endpoint - API endpoint used
 * @param {string} usageData.ip_address - Client IP address
 * @returns {Promise<boolean>} - Success status
 */
export const updateApiKeyUsage = async (apiKeyId, usageData) => {
  if (!apiKeyId) {
    return false;
  }

  try {
      tokens: usageData.tokens_used,
      cost: usageData.cost_usd
    });

    // First, get current values
    const { data: currentKey, error: fetchError } = await supabase
      .from('api_keys')
      .select('total_requests, total_tokens_used, total_cost_usd')
      .eq('id', apiKeyId)
      .single();

    if (fetchError) {
      return false;
    }

    // Calculate new values
    const newTotalRequests = (currentKey.total_requests || 0) + 1;
    const newTotalTokens = (currentKey.total_tokens_used || 0) + (usageData.tokens_used || 0);
    const newTotalCost = parseFloat(currentKey.total_cost_usd || 0) + parseFloat(usageData.cost_usd || 0);

    // Update the API key record
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({
        total_requests: newTotalRequests,
        total_tokens_used: newTotalTokens,
        total_cost_usd: newTotalCost,
        last_used_at: new Date().toISOString(),
        last_used_ip: usageData.ip_address || null,
        last_used_endpoint: usageData.endpoint || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', apiKeyId);

    if (updateError) {
      return false;
    }

    return true;

  } catch (error) {
    return false;
  }
};

/**
 * Clear the API key cache
 * Useful for testing or when keys are updated
 * 
 * @param {string} userId - Optional user ID to clear specific cache entry
 */
export const clearApiKeyCache = (userId = null) => {
  if (userId) {
    apiKeyCache.delete(userId);
  } else {
    apiKeyCache.clear();
  }
};

/**
 * Get API key cache stats
 * For debugging and monitoring
 * 
 * @returns {Object} - Cache statistics
 */
export const getApiKeyCacheStats = () => {
  return {
    size: apiKeyCache.size,
    keys: Array.from(apiKeyCache.keys()).map(k => k.substring(0, 8) + '...')
  };
};
