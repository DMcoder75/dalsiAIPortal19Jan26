/**
 * Chat API Service
 * Handles all API calls for chat/conversation management
 * Includes caching for conversations and messages
 */

const API_BASE_URL = 'https://api.neodalsi.com'

// Cache storage
const cache = {
  conversations: {},
  messages: {}
}

/**
 * Get all conversations for authenticated user
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of conversations
 */
export const fetchConversations = async (token) => {
  try {