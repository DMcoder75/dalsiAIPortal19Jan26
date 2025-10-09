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
    
    console.log('✅ Session initialized:', currentSessionId)
    
    // Set up session end tracking
    setupSessionEndTracking()
    
    return currentSessionId
  } catch (error) {
    console.error('❌ Error initializing session:', error)
  }
}

/**
 * Track page view (both GA4 and DB)
 */
export const trackPageView = async (pagePath, pageTitle) => {
  try {
    // Firebase Analytics
    firebaseAnalytics.trackPageView(pagePath, pageTitle)
    
    // Database tracking
    if (currentSessionUUID) {
      await supabase.rpc('track_page_view', {
        p_session_id: currentSessionUUID,
        p_user_id: (await supabase.auth.getUser()).data.user?.id || null,
        p_page_path: pagePath,
        p_page_title: pageTitle,
        p_referrer: document.referrer || null
      })
    }
    
    console.log('📄 Page view tracked:', pageTitle)
  } catch (error) {
    console.error('❌ Error tracking page view:', error)
  }
}

/**
 * Track product view (hybrid)
 */
export const trackProductView = async (product) => {
  try {
    // Firebase Analytics
    firebaseAnalytics.trackProductView(product)
    
    // Database tracking
    await supabase.rpc('track_product_view', {
      p_product_slug: product.slug,
      p_user_id: (await supabase.auth.getUser()).data.user?.id || null,
      p_session_id: currentSessionId,
      p_referrer: document.referrer || null
    })
    
    console.log('🛍️ Product view tracked:', product.name)
  } catch (error) {
    console.error('❌ Error tracking product view:', error)
  }
}

/**
 * Track CTA click (hybrid)
 */
export const trackCTAClick = async (productSlug, ctaType = 'primary') => {
  try {
    // Firebase Analytics
    firebaseAnalytics.trackCTAClick(productSlug, ctaType)
    
    // Database tracking
    await supabase.rpc('track_cta_click', {
      p_product_slug: productSlug,
      p_user_id: (await supabase.auth.getUser()).data.user?.id || null,
      p_session_id: currentSessionId,
      p_cta_type: ctaType
    })
    
    console.log('🎯 CTA click tracked:', productSlug, ctaType)
  } catch (error) {
    console.error('❌ Error tracking CTA click:', error)
  }
}

/**
 * Track user behavior event
 */
export const trackBehaviorEvent = async (eventType, eventData = {}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase
      .from('user_behavior_events')
      .insert({
        session_id: currentSessionUUID,
        user_id: user?.id || null,
        event_type: eventType,
        element_id: eventData.elementId,
        element_class: eventData.elementClass,
        element_text: eventData.elementText,
        page_path: window.location.pathname,
        x_position: eventData.x,
        y_position: eventData.y,
        event_data: eventData
      })
    
    console.log('👆 Behavior event tracked:', eventType)
  } catch (error) {
    console.error('❌ Error tracking behavior:', error)
  }
}

/**
 * Track login attempt
 */
export const trackLoginAttempt = async (email, success, failureReason = null, userId = null) => {
  try {
    // Firebase Analytics
    if (success) {
      firebaseAnalytics.trackLogin('email')
    }
    
    // Get IP and device info
    const geoData = await getGeolocation()
    const deviceInfo = getDeviceInfo()
    
    // Database tracking
    await supabase.rpc('track_login_attempt', {
      p_email: email,
      p_user_id: userId,
      p_success: success,
      p_failure_reason: failureReason,
      p_ip_address: geoData.ip,
      p_user_agent: navigator.userAgent
    })
    
    // Update session with user ID if successful
    if (success && userId && currentSessionUUID) {
      await supabase
        .from('user_sessions')
        .update({ user_id: userId })
        .eq('id', currentSessionUUID)
    }
    
    console.log(success ? '✅ Login successful' : '❌ Login failed:', email)
  } catch (error) {
    console.error('❌ Error tracking login:', error)
  }
}

/**
 * Track feature usage
 */
export const trackFeatureUsage = async (featureName, productSlug = null) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return
    
    // Firebase Analytics
    firebaseAnalytics.trackFeatureClick(productSlug, featureName)
    
    // Database tracking
    await supabase
      .from('feature_usage')
      .insert({
        user_id: user.id,
        feature_name: featureName,
        product_slug: productSlug
      })
      .onConflict('user_id,feature_name,product_slug')
      .merge({
        usage_count: supabase.raw('feature_usage.usage_count + 1'),
        last_used_at: new Date().toISOString()
      })
    
    console.log('✨ Feature usage tracked:', featureName)
  } catch (error) {
    console.error('❌ Error tracking feature usage:', error)
  }
}

/**
 * Track API call
 */
export const trackAPICall = async (endpoint, method, statusCode, responseTime) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase
      .from('api_usage')
      .insert({
        user_id: user?.id || null,
        endpoint,
        method,
        status_code: statusCode,
        response_time_ms: responseTime,
        ip_address: (await getGeolocation()).ip,
        user_agent: navigator.userAgent
      })
  } catch (error) {
    console.error('❌ Error tracking API call:', error)
  }
}

/**
 * Track error
 */
export const trackError = async (errorType, errorMessage, stackTrace = null, severity = 'medium') => {
  try {
    // Firebase Analytics
    firebaseAnalytics.trackError(errorMessage, window.location.pathname)
    
    // Database tracking
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase
      .from('error_logs')
      .insert({
        user_id: user?.id || null,
        session_id: currentSessionUUID,
        error_type: errorType,
        error_message: errorMessage,
        stack_trace: stackTrace,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        severity
      })
    
    console.error('❌ Error logged:', errorType, errorMessage)
  } catch (error) {
    console.error('❌ Error tracking error:', error)
  }
}

/**
 * Track scroll depth
 */
export const trackScrollDepth = async (percentage) => {
  try {
    // Firebase Analytics
    firebaseAnalytics.trackScrollDepth(percentage, window.location.pathname)
    
    // Update current page view in database
    if (currentSessionUUID) {
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('id')
        .eq('session_id', currentSessionUUID)
        .eq('page_path', window.location.pathname)
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (pageViews && pageViews.length > 0) {
        await supabase
          .from('page_views')
          .update({ scroll_depth_percentage: percentage })
          .eq('id', pageViews[0].id)
      }
    }
  } catch (error) {
    console.error('❌ Error tracking scroll:', error)
  }
}

/**
 * Log admin action
 */
export const logAdminAction = async (action, targetType = null, targetId = null, details = null) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No user logged in')
    
    const geoData = await getGeolocation()
    
    await supabase.rpc('log_admin_action', {
      p_admin_id: user.id,
      p_action: action,
      p_target_type: targetType,
      p_target_id: targetId,
      p_details: details,
      p_ip_address: geoData.ip,
      p_user_agent: navigator.userAgent
    })
    
    console.log('🔐 Admin action logged:', action)
  } catch (error) {
    console.error('❌ Error logging admin action:', error)
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get geolocation data from IP
 */
async function getGeolocation() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      ip: data.ip,
      country: data.country_name,
      city: data.city,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude
    }
  } catch (error) {
    console.warn('⚠️ Could not fetch geolocation:', error)
    return {
      ip: null,
      country: null,
      city: null,
      region: null,
      latitude: null,
      longitude: null
    }
  }
}

/**
 * Get device information
 */
function getDeviceInfo() {
  const ua = navigator.userAgent
  
  // Device type
  let deviceType = 'desktop'
  if (/mobile/i.test(ua)) deviceType = 'mobile'
  else if (/tablet|ipad/i.test(ua)) deviceType = 'tablet'
  
  // Browser
  let browser = 'Unknown'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  else if (ua.includes('Edge')) browser = 'Edge'
  
  // OS
  let os = 'Unknown'
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iOS')) os = 'iOS'
  
  return { deviceType, browser, os }
}

/**
 * Setup session end tracking
 */
function setupSessionEndTracking() {
  // Track when user leaves
  window.addEventListener('beforeunload', async () => {
    if (currentSessionUUID) {
      await supabase
        .from('user_sessions')
        .update({
          ended_at: new Date().toISOString(),
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

