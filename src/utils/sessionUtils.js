// Generate or retrieve session ID for guest users
export const getGuestSessionId = () => {
  let sessionId = localStorage.getItem('guest_session_id')
  
  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem('guest_session_id', sessionId)
  }
  
  return sessionId
}

// Clear guest session
export const clearGuestSession = () => {
  localStorage.removeItem('guest_session_id')
  localStorage.removeItem('guest_messages')
  localStorage.removeItem('dalsi_guest_messages')
}
