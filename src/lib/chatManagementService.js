/**
 * Chat Management Service
 * Handles chat_id tracking, message storage, and API integration
 * Stores all required data for seamless system integration
 */

import { supabase } from './supabase'

/**
 * Store chat metadata including chat_id from API
 */
export const storeChatMetadata = async (conversationId, chatId, endpoint, serviceType) => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .update({
        metadata: {
          api_chat_id: chatId,
          endpoint: endpoint,
          service_type: serviceType,
          last_updated: new Date().toISOString()
        }
      })
      .eq('id', conversationId)
      .select()

    if (error) {
      
      // API Response Metadata
      metadata: {
        api_chat_id: apiResponse.chat_id,
        is_continuation: apiResponse.is_continuation || false,
        completeness_score: apiResponse.completeness_score,
        is_complete: apiResponse.is_complete,
        missing_elements: apiResponse.missing_elements,
        model: apiResponse.model,
        service: apiResponse.service,
        response_timestamp: apiResponse.timestamp,
        followup_questions: apiResponse.followup_questions || [],
        references: apiResponse.references || []
      },
      
      // Context Data for continuation tracking
      context_data: {
        conversation_flow: 'active',
        continuation_keywords: ['continue', 'next', 'more', 'go on', 'keep going'],
        last_api_response: apiResponse.chat_id ? true : false,
        endpoint: apiResponse.service ? `/api/${apiResponse.service}/generate` : null
      },
      
      // Performance Metrics
      token_count: apiResponse.tokens_used || 0,
      tokens_used: apiResponse.tokens_used || 0,
      processing_time_ms: apiResponse.processing_time_ms || 0,
      response_time_ms: apiResponse.response_time_ms || 0,
      
      // Model Information
      model_used: apiResponse.model || 'DalsiAI',
      service_type: apiResponse.service || 'general',
      
      // User Feedback Ready
      feedback_score: null,
      is_flagged: false,
      user_rating: null,
      feedback_text: null,
      
      // Edit Tracking
      is_edited: false,
      edited_at: null
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()

    if (error) {
      avg_response_time: data?.length > 0 
        ? data.reduce((sum, msg) => sum + (msg.response_time_ms || 0), 0) / data.length 
        : 0,
      services_used: [...new Set(data?.map(msg => msg.service_type) || [])]
    }

    return stats
  } catch (error) {