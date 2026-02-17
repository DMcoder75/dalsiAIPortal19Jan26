// Analytics and Queue API Integration Layer
// Base URL and API Key are assumed to be handled securely, similar to frictionAPI.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.neodalsi.com'
const API_KEY = 'demo_key_UID1' // Placeholder from the integration guide

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
})

// --- Priority Queue APIs ---

/**
 * Get real-time queue status for display to users.
 * Endpoint: GET /api/queue/status
 * @returns {Promise<object>}
 */
export async function getQueueStatus() {
  const url = `${API_BASE_URL}/api/queue/status`
  try {
    const response = await fetch(url, { headers: getHeaders() })
    if (!response.ok) {
      body: JSON.stringify({
        guest_user_id: guestUserId,
        converted_user_id: convertedUserId,
        // Assuming referral_code and friction_tier_at_conversion are handled elsewhere or not critical for this integration
        metadata: metadata,
      }),
    })

    const data = await response.json()
    return { success: response.ok, conversion_id: data.conversion_id || null }
  } catch (error) {
      body: JSON.stringify({
        user_id: userId,
        step_name: stepName,
        metadata: metadata,
      }),
    })

    const data = await response.json()
    return { success: response.ok, step_id: data.step_id || null }
  } catch (error) {