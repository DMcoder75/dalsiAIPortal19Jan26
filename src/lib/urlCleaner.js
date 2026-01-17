/**
 * URL Cleaner Utility
 * Removes invalid characters and formatting artifacts from URLs
 */

/**
 * Clean a single URL by removing trailing parentheses and other invalid characters
 * @param {string} url - The URL to clean
 * @returns {string} - The cleaned URL
 */
export function cleanURL(url) {
  if (!url || typeof url !== 'string') return url
  
  // Remove trailing parentheses that might be included from Markdown formatting
  // e.g., "https://example.com/page)" -> "https://example.com/page"
  let cleaned = url.trim()
  
  // Remove trailing closing parentheses
  while (cleaned.endsWith(')')) {
    cleaned = cleaned.slice(0, -1)
  }
  
  // Remove trailing closing brackets
  while (cleaned.endsWith(']')) {
    cleaned = cleaned.slice(0, -1)
  }
  
  // Remove trailing closing braces
  while (cleaned.endsWith('}')) {
    cleaned = cleaned.slice(0, -1)
  }
  
  // Remove trailing whitespace
  cleaned = cleaned.trim()
  
  return cleaned
}

/**
 * Clean an array of references/URLs
 * @param {Array} references - Array of reference objects or strings
 * @returns {Array} - Array of cleaned references
 */
export function cleanReferences(references) {
  if (!Array.isArray(references)) return []
  
  return references.map(ref => {
    if (typeof ref === 'string') {
      return cleanURL(ref)
    } else if (typeof ref === 'object' && ref !== null) {
      // If it's an object with a url property, clean that
      if (ref.url) {
        return {
          ...ref,
          url: cleanURL(ref.url)
        }
      }
      return ref
    }
    return ref
  })
}

/**
 * Extract and clean URLs from text
 * Finds all URLs in text and returns them cleaned
 * @param {string} text - Text to search for URLs
 * @returns {Array} - Array of cleaned URLs found in text
 */
export function extractAndCleanURLs(text) {
  if (!text || typeof text !== 'string') return []
  
  // Regex to find URLs
  const urlRegex = /(https?:\/\/[^\s\)]+)/g
  const matches = text.match(urlRegex) || []
  
  return matches.map(url => cleanURL(url))
}
