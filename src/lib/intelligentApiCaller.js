/**
 * Intelligent API Caller
 * Handles API calls with smart continuation detection
 * Only passes chat_id when it's actually a continuation request
 */

import * as dalsiAPI from './dalsiAPI'
import { isContinuationKeyword, extractChatIdFromResponse } from './chatManagementService'
import logger from './logger'

/**
 * Store chat_id per conversation
 * Map: conversationId -> chatId
 */
const conversationChatIds = new Map()

/**
 * Store last response per conversation for metadata
 * Map: conversationId -> lastResponse
 */
const conversationLastResponses = new Map()

/**
 * Determine if this is a continuation request
 * @param {string} message - User message
 * @param {string} conversationId - Conversation ID
 * @returns {boolean} True if this is a continuation
 */
const isContinuationRequest = (message, conversationId) => {
  // Check if message is a continuation keyword
  if (isContinuationKeyword(message)) {