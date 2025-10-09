import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentSession, logout as logoutUser } from '../lib/auth'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [guestSessionId, setGuestSessionId] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    checkSession()
    initGuestSession()
  }, [])

  const initGuestSession = () => {
    // Generate or retrieve guest session ID
    let sessionId = localStorage.getItem('guest_session_id')
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem('guest_session_id', sessionId)
    }
    setGuestSessionId(sessionId)
  }

  const checkSession = async () => {
    try {
      const session = await getCurrentSession()
      if (session && session.users) {
        setUser(session.users)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const clearGuestSession = () => {
    localStorage.removeItem('guest_session_id')
    localStorage.removeItem('guest_messages')
    localStorage.removeItem('dalsi_guest_messages')
    setGuestSessionId(null)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    checkSession,
    guestSessionId,
    clearGuestSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
