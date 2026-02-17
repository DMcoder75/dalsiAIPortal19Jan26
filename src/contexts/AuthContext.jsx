import { createContext, useContext, useState, useEffect } from 'react'
import { 
  verifyJWT, 
  logoutJWT, 
  getCurrentUser, 
  isAuthenticated,
  setupAutoRefresh 
} from '../lib/jwtAuth'
import { setSupabaseJWT, clearSupabaseJWT } from '../lib/supabase'

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
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(null)
  const [authError, setAuthError] = useState(null)

  // Check for existing JWT session on mount
  useEffect(() => {
    
    // Skip JWT check on callback pages - let the callback page handle auth
    // On other pages, restore user from localStorage
    const isCallbackPage = window.location.pathname.includes('/auth/') && 
                          (window.location.pathname.includes('/callback') ||
                           window.location.pathname.includes('/verify'));
    
    if (!isCallbackPage) {
      checkJWTSession();
    } else {
      setLoading(false);
    }
    
    initGuestSession();
  }, [])

  // Setup automatic token refresh when user is authenticated
  useEffect(() => {
    if (user && !autoRefreshInterval) {
      const intervalId = setupAutoRefresh();
      setAutoRefreshInterval(intervalId);
    }

    // Cleanup on unmount or logout
    return () => {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
      }
    };
  }, [user]);

  const initGuestSession = () => {
    // Generate or retrieve guest session ID
    let sessionId = localStorage.getItem('guest_session_id')
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem('guest_session_id', sessionId)
    }
    setGuestSessionId(sessionId)
  }

  const checkJWTSession = async () => {
    try {
      setAuthError(null);
      
      // Check if user has JWT token
      if (!isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Verify JWT token validity (lightweight check)
      const verification = await verifyJWT();
      
      if (verification.valid) {
        // Token is valid, use the stored user data from login
        const storedUserInfo = localStorage.getItem('user_info');
        if (storedUserInfo) {
          try {
            const userData = JSON.parse(storedUserInfo);
            
            // Set JWT token in Supabase client for authenticated requests
            const token = localStorage.getItem('jwt_token');
            if (token) {
              setSupabaseJWT(token);
            }
            
            setUser(userData);
            setAuthError(null);
          } catch (e) {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user_info');
            setUser(null);
            setAuthError('Session error. Please login again.');
          }
        } else {
          localStorage.removeItem('jwt_token');
          setUser(null);
          setAuthError('Session error. Please login again.');
        }
      } else {
        // Token is invalid, clear everything
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
        setUser(null);
        setAuthError('Session expired. Please login again.');
      }
    } catch (error) {
      // Handle JWT verification errors
      
      // Check if this is a network error
      const isNetworkError = error.message && (
        error.message.includes('fetch') || 
        error.message.includes('network') || 
        error.message.includes('CORS') ||
        error.message.includes('Failed to fetch')
      );
      
      if (isNetworkError) {
        
        // On network error, try to restore user from localStorage
        const storedUserInfo = localStorage.getItem('user_info');
        const storedToken = localStorage.getItem('jwt_token');
        
        if (storedUserInfo && storedToken) {
          try {
            const userData = JSON.parse(storedUserInfo);
            setUser(userData);
            setAuthError(null); // Don't show error if we have cached data
          } catch (e) {
            setUser(null);
            setAuthError('Session error. Please login again.');
          }
        } else {
          setUser(null);
          setAuthError('Auth service unavailable. Please check your connection.');
        }
      } else {
        // Clear invalid token only on actual auth errors (not network errors)
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
        setUser(null);
        setAuthError('Authentication service error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const login = (userData) => {
    // Store complete user data to localStorage
    localStorage.setItem('user_info', JSON.stringify(userData));
    
    // Get the JWT token and set it in Supabase client
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setSupabaseJWT(token);
    }
    
    setUser(userData);
    setAuthError(null);
  }

  const logout = async () => {
    try {
      
      // Clear auto-refresh interval
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        setAutoRefreshInterval(null);
      }
      
      // Clear JWT token and user info
      logoutJWT();
      clearSupabaseJWT();
      setUser(null);
      setAuthError(null);
      
      
      // Reload page to ensure clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
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
    checkSession: checkJWTSession,
    guestSessionId,
    clearGuestSession,
    isAuthenticated: !!user,
    authError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
