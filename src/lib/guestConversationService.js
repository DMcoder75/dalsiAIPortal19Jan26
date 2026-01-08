/**
 * Guest Conversation Service
 * Handles guest conversation tracking and management
 * Stores conversations in sessionStorage and syncs with backend
 */

import logger from './logger'

const GUEST_CONVERSATIONS_KEY = 'dalsi_guest_conversations'
const GUEST_CURRENT_CONVERSATION_KEY = 'dalsi_guest_current_conversation'

/**
 * Initialize guest conversations from sessionStorage
 * @returns {Array} - Array of guest conversations
 */
export const initializeGuestConversations = () => {
  try {
    const stored = sessionStorage.getItem(GUEST_CONVERSATIONS_KEY)
    if (stored) {
      const conversations = JSON.parse(stored)
      logger.info('✅ Guest conversations loaded from session:', conversations.length)
      return conversations
    }
    logger.info('ℹ️ No guest conversations in session, starting fresh')
    return []
  } catch (error) {
    logger.error('❌ Error initializing guest conversations:', error)
    return []
  }
}

/**
 * Create a new guest conversation
 * @param {string} title - Conversation title (auto-generated from first message)
 * @returns {Object} - New conversation object
 */
export const createGuestConversation = (title = 'New Conversation') => {
  try {
    const conversations = initializeGuestConversations()
    
    const newConversation = {
      id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      message_count: 0,
      messages: []
    }

    conversations.push(newConversation)
    sessionStorage.setItem(GUEST_CONVERSATIONS_KEY, JSON.stringify(conversations))
    sessionStorage.setItem(GUEST_CURRENT_CONVERSATION_KEY, newConversation.id)

    logger.info('✅ Guest conversation created:', newConversation.id)
    return newConversation
  } catch (error) {
    logger.error('❌ Error creating guest conversation:', error)
    return null
  }
}

/**
 * Get current guest conversation
 * @returns {Object|null} - Current conversation or null
 */
export const getCurrentGuestConversation = () => {
  try {
    const conversationId = sessionStorage.getItem(GUEST_CURRENT_CONVERSATION_KEY)
    if (!conversationId) return null

    const conversations = initializeGuestConversations()
    const conversation = conversations.find(c => c.id === conversationId)
    
    return conversation || null
  } catch (error) {
    logger.error('❌ Error getting current guest conversation:', error)
    return null
  }
}

/**
 * Set current guest conversation
 * @param {string} conversationId - Conversation ID to set as current
 */
export const setCurrentGuestConversation = (conversationId) => {
  try {
    sessionStorage.setItem(GUEST_CURRENT_CONVERSATION_KEY, conversationId)
    logger.info('✅ Current guest conversation set:', conversationId)
  } catch (error) {
    logger.error('❌ Error setting current guest conversation:', error)
  }
}

/**
 * Add message to guest conversation
 * @param {string} conversationId - Conversation ID
 * @param {string} role - Message role ('user' or 'assistant')
 * @param {string} content - Message content
 * @returns {Object|null} - Updated conversation or null
 */
export const addMessageToGuestConversation = (conversationId, role, content) => {
  try {
    const conversations = initializeGuestConversations()
    const conversation = conversations.find(c => c.id === conversationId)

    if (!conversation) {
      logger.error('❌ Guest conversation not found:', conversationId)
      return null
    }

    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: role,
      content: content,
      created_at: new Date().toISOString()
    }

    if (!conversation.messages) {
      conversation.messages = []
    }

    conversation.messages.push(message)
    conversation.message_count = conversation.messages.length
    conversation.updated_at = new Date().toISOString()

    sessionStorage.setItem(GUEST_CONVERSATIONS_KEY, JSON.stringify(conversations))

    logger.info('✅ Message added to guest conversation:', conversationId)
    return conversation
  } catch (error) {
    logger.error('❌ Error adding message to guest conversation:', error)
    return null
  }
}

/**
 * Update guest conversation title
 * @param {string} conversationId - Conversation ID
 * @param {string} newTitle - New title
 * @returns {Object|null} - Updated conversation or null
 */
export const updateGuestConversationTitle = (conversationId, newTitle) => {
  try {
    const conversations = initializeGuestConversations()
    const conversation = conversations.find(c => c.id === conversationId)

    if (!conversation) {
      logger.error('❌ Guest conversation not found:', conversationId)
      return null
    }

    conversation.title = newTitle
    conversation.updated_at = new Date().toISOString()

    sessionStorage.setItem(GUEST_CONVERSATIONS_KEY, JSON.stringify(conversations))

    logger.info('✅ Guest conversation title updated:', conversationId)
    return conversation
  } catch (error) {
    logger.error('❌ Error updating guest conversation title:', error)
    return null
  }
}

/**
 * Delete guest conversation
 * @param {string} conversationId - Conversation ID to delete
 * @returns {boolean} - Success status
 */
export const deleteGuestConversation = (conversationId) => {
  try {
    let conversations = initializeGuestConversations()
    
    const initialLength = conversations.length
    conversations = conversations.filter(c => c.id !== conversationId)

    if (conversations.length === initialLength) {
      logger.warn('⚠️ Guest conversation not found:', conversationId)
      return false
    }

    sessionStorage.setItem(GUEST_CONVERSATIONS_KEY, JSON.stringify(conversations))

    // If deleted conversation was current, clear current
    const currentId = sessionStorage.getItem(GUEST_CURRENT_CONVERSATION_KEY)
    if (currentId === conversationId) {
      sessionStorage.removeItem(GUEST_CURRENT_CONVERSATION_KEY)
    }

    logger.info('✅ Guest conversation deleted:', conversationId)
    return true
  } catch (error) {
    logger.error('❌ Error deleting guest conversation:', error)
    return false
  }
}

/**
 * Get all guest conversations
 * @returns {Array} - Array of all guest conversations
 */
export const getAllGuestConversations = () => {
  try {
    return initializeGuestConversations()
  } catch (error) {
    logger.error('❌ Error getting all guest conversations:', error)
    return []
  }
}

/**
 * Get messages for guest conversation
 * @param {string} conversationId - Conversation ID
 * @returns {Array} - Array of messages
 */
export const getGuestConversationMessages = (conversationId) => {
  try {
    const conversations = initializeGuestConversations()
    const conversation = conversations.find(c => c.id === conversationId)

    if (!conversation) {
      logger.error('❌ Guest conversation not found:', conversationId)
      return []
    }

    return conversation.messages || []
  } catch (error) {
    logger.error('❌ Error getting guest conversation messages:', error)
    return []
  }
}

/**
 * Clear all guest conversations (on logout or signup)
 */
export const clearAllGuestConversations = () => {
  try {
    sessionStorage.removeItem(GUEST_CONVERSATIONS_KEY)
    sessionStorage.removeItem(GUEST_CURRENT_CONVERSATION_KEY)
    logger.info('✅ All guest conversations cleared')
  } catch (error) {
    logger.error('❌ Error clearing guest conversations:', error)
  }
}

/**
 * Generate conversation title from first message
 * @param {string} message - First message text
 * @returns {string} - Generated title
 */
export const generateTitleFromMessage = (message) => {
  try {
    // Remove special characters and extra whitespace
    let title = message
      .replace(/[*#_`\[\]()]/g, '') // Remove markdown characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    // Take first 50 characters
    if (title.length > 50) {
      title = title.substring(0, 50).trim()
      // Remove incomplete words
      const lastSpace = title.lastIndexOf(' ')
      if (lastSpace > 0) {
        title = title.substring(0, lastSpace)
      }
      title += '...'
    }

    return title || 'New Conversation'
  } catch (error) {
    logger.error('❌ Error generating title from message:', error)
    return 'New Conversation'
  }
}

/**
 * Export guest conversations for migration to registered account
 * @returns {Array} - Array of guest conversations ready for migration
 */
export const exportGuestConversationsForMigration = () => {
  try {
    const conversations = initializeGuestConversations()
    
    logger.info('✅ Guest conversations exported for migration:', conversations.length)
    return conversations
  } catch (error) {
    logger.error('❌ Error exporting guest conversations:', error)
    return []
  }
}

export default {
  initializeGuestConversations,
  createGuestConversation,
  getCurrentGuestConversation,
  setCurrentGuestConversation,
  addMessageToGuestConversation,
  updateGuestConversationTitle,
  deleteGuestConversation,
  getAllGuestConversations,
  getGuestConversationMessages,
  clearAllGuestConversations,
  generateTitleFromMessage,
  exportGuestConversationsForMigration
}
