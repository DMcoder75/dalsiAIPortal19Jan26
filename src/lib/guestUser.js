/**
 * Guest User Management
 * 
 * Handles getting the guest user ID from the session
 * The guest user ID is returned by the /api/auth/guest-key endpoint
 * and stored in sessionStorage when the guest session is created
 */

/**
 * Get the guest user ID from sessionStorage
 * This ID is set when /api/auth/guest-key is called during auth initialization
 * 
 * @returns {string|null} - Guest user ID or null if not found
 */
export const getGuestUserId = () => {
  try {
    // Check localStorage first (where it's stored by authService)
    const guestUserId = localStorage.getItem('dalsi_guest_user_id')
    
    if (guestUserId) {