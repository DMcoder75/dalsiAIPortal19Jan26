/**
 * Markdown Cleaner
 * Cleans up Markdown syntax from stored messages for proper display
 */

/**
 * Remove or convert Markdown heading symbols (###) to proper formatting
 * This is needed for messages loaded from database that contain raw Markdown
 * 
 * @param {string} text - The raw text potentially containing ### symbols
 * @returns {string} - Cleaned text without ### symbols
 */
export function cleanMarkdownHeadings(text) {
  if (!text || typeof text !== 'string') return text
  
  // Replace Markdown headings (### Text) with just the text
  // This removes the ### symbols so they don't display in the chat
  return text.replace(/^#{1,6}\s+/gm, '')
}

/**
 * Clean all Markdown formatting issues from stored messages
 * 
 * @param {string} text - The raw text from database
 * @returns {string} - Cleaned text
 */
export function cleanStoredMessageContent(text) {
  if (!text || typeof text !== 'string') return text
  
  // Remove heading symbols
  let cleaned = cleanMarkdownHeadings(text)
  
  // Additional cleaning can be added here as needed
  // For now, just focus on removing ### symbols
  
  return cleaned
}
