// Dalsi AI API Integration Layer

// API endpoints for DalSi AI models
// New unified API endpoint for all AI models
const API_URL = 'https://api.neodalsi.com'

import { getJWT } from './jwtAuth'
import { cleanTextForDisplay, hasProblematicCharacters } from './textCleaner'

// API key for authentication (will be set from user's API key)
let currentApiKey = null

/**
 * Set the API key for authenticated requests
 */
export const setApiKey = (apiKey) => {
  currentApiKey = apiKey
}

/**
 * Get current API key
 */
export const getApiKey = () => {
  return currentApiKey
}

/**
 * Get authentication headers
 * Includes both JWT token (if available) and API key
 */
const getAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  // Add JWT token if available
  const jwtToken = getJWT()
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }
  
  // Add API key if available
  if (currentApiKey) {
    headers['X-API-Key'] = currentApiKey
  }
  
  return headers
}

/**
 * Get available models based on subscription
 */
export const getAvailableModels = (subscription) => {
  const baseModels = [
    {
      id: 'dalsi-ai',
      name: 'DalSi AI',
      description: 'Text-based AI model for healthcare, education, and general AI assistance',
      free: true
    },
    {
      id: 'dalsi-ai-health',
      name: 'DalSi AI - Healthcare',
      description: 'Specialized AI model for clinical, medical, and healthcare-related queries.',
      free: true
    },
    {
      id: 'dalsi-ai-weather',
      name: 'DalSi AI - Weather',
      description: 'Specialized AI model for weather, climate, and meteorological queries.',
      free: true
    }
  ]

  return baseModels
}

/**
 * Check if user has access to a model
 */
export const checkModelAccess = async (modelId, usageCount, subscription) => {
  // All models are accessible
  return { hasAccess: true }
}

/**
 * Get API endpoint for a model
 */
const getModelEndpoint = (modelId, serviceType = 'general') => {
  // Map model IDs to service endpoints
  const endpointMap = {
    'education': '/edu/generate',
    'healthcare': '/healthcare/generate',
    'weather': '/weathersense/generate',
    'general': '/generate'
  }
  
  const endpoint = endpointMap[serviceType] || '/generate'
  return `${API_URL}${endpoint}`
}

/**
 * Health check for API
 */
export const checkAPIHealth = async (modelId) => {
  try {
    const response = await fetch(`${API_URL}/v1/health`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      return {
        status: 'healthy',
        model_loaded: data.model_loaded || true,
        ...data
      }
    }
  } catch (error) {
      signal: abortSignal
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    // Process Server-Sent Events stream
    reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8', { fatal: false, ignoreBOM: true })
    let fullResponse = ''
    let buffer = ''
    let hasCalledComplete = false

    while (true) {
      // Check if aborted
      if (abortSignal?.aborted) {
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    