import { getAnalytics, logEvent, setUserProperties, setUserId } from 'firebase/analytics'
import { app } from './firebase'

// Initialize Firebase Analytics
let analytics = null

try {
  analytics = getAnalytics(app)
  console.log('✅ Firebase Analytics initialized')
} catch (error) {
  console.warn('⚠️ Analytics not available:', error.message)
}

// ============================================
// PRODUCT EVENTS
// ============================================

/**
 * Track product page view
 * @param {Object} product - Product data
 */
export const trackProductView = (product) => {
  if (!analytics) return

  // Firebase Analytics event
  logEvent(analytics, 'view_item', {
    currency: 'USD',
    value: product.basePrice || 0,
    items: [{
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      item_category2: product.modelType,
      item_brand: 'DalSi AI',
      price: product.basePrice || 0
    }]
  })

  // Custom event for detailed tracking
  logEvent(analytics, 'product_page_view', {
    product_slug: product.slug,
    product_name: product.name,
    product_category: product.category,
    model_type: product.modelType,
    timestamp: new Date().toISOString()
  })

  console.log('📊 Tracked product view:', product.name)
}

/**
 * Track CTA button click
 * @param {string} productSlug - Product slug
 * @param {string} ctaType - 'primary', 'secondary', 'trial', 'pricing'
 */
export const trackCTAClick = (productSlug, ctaType = 'primary') => {
  if (!analytics) return

  logEvent(analytics, 'select_promotion', {
    promotion_id: `${productSlug}_${ctaType}`,
    promotion_name: `${productSlug} CTA`,
    creative_name: ctaType,
    creative_slot: 'product_page'
  })

  logEvent(analytics, 'cta_click', {
    product_slug: productSlug,
    cta_type: ctaType,
    timestamp: new Date().toISOString()
  })

  console.log('🎯 Tracked CTA click:', productSlug, ctaType)
}

/**
 * Track trial start
 * @param {Object} product - Product data
 */
export const trackTrialStart = (product) => {
  if (!analytics) return

  logEvent(analytics, 'begin_checkout', {
    currency: 'USD',
    value: 0, // Free trial
    items: [{
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      price: 0,
      quantity: 1
    }]
  })

  logEvent(analytics, 'trial_start', {
    product_slug: product.slug,
    product_name: product.name,
    product_category: product.category,
    timestamp: new Date().toISOString()
  })

  console.log('🚀 Tracked trial start:', product.name)
}

/**
 * Track feature interaction
 * @param {string} productSlug - Product slug
 * @param {string} featureTitle - Feature title
 */
export const trackFeatureClick = (productSlug, featureTitle) => {
  if (!analytics) return

  logEvent(analytics, 'feature_interaction', {
    product_slug: productSlug,
    feature_title: featureTitle,
    timestamp: new Date().toISOString()
  })

  console.log('✨ Tracked feature click:', featureTitle)
}

// ============================================
// USER EVENTS
// ============================================

/**
 * Set user ID for tracking
 * @param {string} userId - User ID
 */
export const setAnalyticsUserId = (userId) => {
  if (!analytics) return

  setUserId(analytics, userId)
  console.log('👤 Set analytics user ID:', userId)
}

/**
 * Set user properties
 * @param {Object} properties - User properties
 */
export const setAnalyticsUserProperties = (properties) => {
  if (!analytics) return

  setUserProperties(analytics, properties)
  console.log('📝 Set user properties:', properties)
}

/**
 * Track user sign up
 * @param {string} method - Sign up method ('email', 'google', etc.)
 */
export const trackSignUp = (method) => {
  if (!analytics) return

  logEvent(analytics, 'sign_up', {
    method: method
  })

  console.log('✅ Tracked sign up:', method)
}

/**
 * Track user login
 * @param {string} method - Login method
 */
export const trackLogin = (method) => {
  if (!analytics) return

  logEvent(analytics, 'login', {
    method: method
  })

  console.log('🔐 Tracked login:', method)
}

// ============================================
// NAVIGATION EVENTS
// ============================================

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (!analytics) return

  logEvent(analytics, 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    timestamp: new Date().toISOString()
  })

  console.log('📄 Tracked page view:', pageTitle)
}

/**
 * Track navigation click
 * @param {string} destination - Destination page
 * @param {string} source - Source location
 */
export const trackNavigation = (destination, source) => {
  if (!analytics) return

  logEvent(analytics, 'navigation_click', {
    destination: destination,
    source: source,
    timestamp: new Date().toISOString()
  })

  console.log('🧭 Tracked navigation:', source, '→', destination)
}

/**
 * Track dropdown menu interaction
 * @param {string} menuName - Menu name ('models', 'products', etc.)
 * @param {string} action - 'open' or 'close'
 */
export const trackDropdownInteraction = (menuName, action) => {
  if (!analytics) return

  logEvent(analytics, 'dropdown_interaction', {
    menu_name: menuName,
    action: action,
    timestamp: new Date().toISOString()
  })
}

// ============================================
// SEARCH & DISCOVERY
// ============================================

/**
 * Track search
 * @param {string} searchTerm - Search term
 */
export const trackSearch = (searchTerm) => {
  if (!analytics) return

  logEvent(analytics, 'search', {
    search_term: searchTerm
  })

  console.log('🔍 Tracked search:', searchTerm)
}

/**
 * Track product list view
 * @param {string} listName - List name (category, recommendations, etc.)
 * @param {Array} products - Array of products
 */
export const trackProductListView = (listName, products) => {
  if (!analytics) return

  logEvent(analytics, 'view_item_list', {
    item_list_name: listName,
    items: products.map((product, index) => ({
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      index: index
    }))
  })

  console.log('📋 Tracked product list view:', listName)
}

// ============================================
// ENGAGEMENT EVENTS
// ============================================

/**
 * Track video play
 * @param {string} videoTitle - Video title
 * @param {string} productSlug - Related product
 */
export const trackVideoPlay = (videoTitle, productSlug) => {
  if (!analytics) return

  logEvent(analytics, 'video_start', {
    video_title: videoTitle,
    product_slug: productSlug,
    timestamp: new Date().toISOString()
  })

  console.log('▶️ Tracked video play:', videoTitle)
}

/**
 * Track scroll depth
 * @param {number} percentage - Scroll percentage
 * @param {string} pagePath - Page path
 */
export const trackScrollDepth = (percentage, pagePath) => {
  if (!analytics) return

  logEvent(analytics, 'scroll_depth', {
    percentage: percentage,
    page_path: pagePath,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track time on page
 * @param {string} pagePath - Page path
 * @param {number} seconds - Time in seconds
 */
export const trackTimeOnPage = (pagePath, seconds) => {
  if (!analytics) return

  logEvent(analytics, 'time_on_page', {
    page_path: pagePath,
    seconds: seconds,
    timestamp: new Date().toISOString()
  })
}

// ============================================
// CONVERSION EVENTS
// ============================================

/**
 * Track purchase/subscription
 * @param {Object} transaction - Transaction data
 */
export const trackPurchase = (transaction) => {
  if (!analytics) return

  logEvent(analytics, 'purchase', {
    transaction_id: transaction.id,
    value: transaction.value,
    currency: transaction.currency || 'USD',
    tax: transaction.tax || 0,
    shipping: transaction.shipping || 0,
    items: transaction.items
  })

  console.log('💰 Tracked purchase:', transaction.id)
}

/**
 * Track add to cart (for pricing/plans)
 * @param {Object} item - Item data
 */
export const trackAddToCart = (item) => {
  if (!analytics) return

  logEvent(analytics, 'add_to_cart', {
    currency: 'USD',
    value: item.price,
    items: [{
      item_id: item.slug,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: 1
    }]
  })

  console.log('🛒 Tracked add to cart:', item.name)
}

// ============================================
// ERROR TRACKING
// ============================================

/**
 * Track errors
 * @param {string} errorMessage - Error message
 * @param {string} errorLocation - Where error occurred
 */
export const trackError = (errorMessage, errorLocation) => {
  if (!analytics) return

  logEvent(analytics, 'exception', {
    description: errorMessage,
    fatal: false,
    location: errorLocation,
    timestamp: new Date().toISOString()
  })

  console.error('❌ Tracked error:', errorMessage)
}

// ============================================
// CUSTOM EVENTS
// ============================================

/**
 * Track custom event
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
export const trackCustomEvent = (eventName, params = {}) => {
  if (!analytics) return

  logEvent(analytics, eventName, {
    ...params,
    timestamp: new Date().toISOString()
  })

  console.log('📊 Tracked custom event:', eventName, params)
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get session ID for tracking
 */
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id')
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  
  return sessionId
}

/**
 * Track user journey
 * @param {string} step - Journey step
 * @param {Object} data - Additional data
 */
export const trackUserJourney = (step, data = {}) => {
  if (!analytics) return

  const journey = JSON.parse(localStorage.getItem('user_journey') || '[]')
  journey.push({
    step,
    data,
    timestamp: new Date().toISOString()
  })
  localStorage.setItem('user_journey', JSON.stringify(journey))

  logEvent(analytics, 'user_journey_step', {
    step,
    ...data,
    journey_length: journey.length
  })
}

/**
 * Initialize analytics for a user
 * @param {Object} user - User object
 */
export const initializeUserAnalytics = (user) => {
  if (!analytics || !user) return

  setAnalyticsUserId(user.id)
  
  setAnalyticsUserProperties({
    user_type: user.subscription_tier || 'free',
    signup_date: user.created_at,
    last_login: new Date().toISOString()
  })

  console.log('✅ Initialized analytics for user:', user.id)
}

export default {
  trackProductView,
  trackCTAClick,
  trackTrialStart,
  trackFeatureClick,
  trackPageView,
  trackNavigation,
  trackSearch,
  trackPurchase,
  trackError,
  trackCustomEvent,
  initializeUserAnalytics
}

