import * as firebaseAnalytics from './analytics'
import { supabase } from './supabase'

// ============================================
// HYBRID ANALYTICS SERVICE
// Combines Firebase Analytics + Database Tracking
// ============================================

let currentSessionId = null
let currentSessionUUID = null

/**
 * Initialize session tracking
 */
export const initializeSession = async (userId = null) => {
  try {
    // Generate session ID
    currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Get IP and geolocation (using external service)
    const geoData = await getGeolocation()
    
    // Get device info
    const deviceInfo = getDeviceInfo()
    
    // Track in database
    const { data, error } = await supabase
      .rpc('track_user_session', {
        p_session_id: currentSessionId,
        p_user_id: userId,
        p_ip_address: geoData.ip,
        p_user_agent: navigator.userAgent,
        p_referrer: document.referrer || null,
        p_landing_page: window.location.href
      })
    
    if (error) throw error
    
    currentSessionUUID = data
    
    // Also update session with geo data
    await supabase
      .from('user_sessions')
      .update({
        country: geoData.country,
        city: geoData.city,
        region: geoData.region,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os
      })
      .eq('id', currentSessionUUID)
    
        p_page_path: pagePath,
        p_page_title: pageTitle,
        p_referrer: document.referrer || null
      })
    }
    
      p_session_id: currentSessionId,
      p_referrer: document.referrer || null
    })
    
      p_session_id: currentSessionId,
      p_cta_type: ctaType
    })
    
        last_used_at: new Date().toISOString()
      })
    
        user_agent: navigator.userAgent
      })
  } catch (error) {
          is_active: false
        })
        .eq('id', currentSessionUUID)
    }
  })
  
  // Track inactivity
  let inactivityTimer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(async () => {
      if (currentSessionUUID) {
        await supabase
          .from('user_sessions')
          .update({ is_active: false })
          .eq('id', currentSessionUUID)
      }
    }, 30 * 60 * 1000) // 30 minutes
  }
  
  // Reset timer on user activity
  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer)
  })
  
  resetInactivityTimer()
}

/**
 * Setup automatic click tracking
 */
export const setupClickTracking = () => {
  document.addEventListener('click', async (e) => {
    const element = e.target
    await trackBehaviorEvent('click', {
      elementId: element.id,
      elementClass: element.className,
      elementText: element.textContent?.substring(0, 100),
      x: e.clientX,
      y: e.clientY
    })
  })
}

/**
 * Setup automatic scroll tracking
 */
export const setupScrollTracking = () => {
  let maxScroll = 0
  let scrollTimeout
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage
        trackScrollDepth(scrollPercentage)
      }
    }, 500)
  })
}

export default {
  initializeSession,
  trackPageView,
  trackProductView,
  trackCTAClick,
  trackBehaviorEvent,
  trackLoginAttempt,
  trackFeatureUsage,
  trackAPICall,
  trackError,
  trackScrollDepth,
  logAdminAction,
  setupClickTracking,
  setupScrollTracking
}

