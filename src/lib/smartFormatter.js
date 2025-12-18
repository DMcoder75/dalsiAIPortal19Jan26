/**
 * Smart Text Formatter - Improved Version
 * Intelligently detects content type and applies appropriate formatting
 * without forcing artificial structure on the content
 */

const BOLD_KEYWORDS = [
  'WordPress', 'WooCommerce', 'portfolio website', 'personal portfolio',
  'ecommerce', 'e-commerce', 'website', 'web', 'mobile app',
  'theme', 'plugin', 'design', 'layout', 'strategy',
  'content', 'page', 'post', 'product', 'marketing',
  'integration', 'platform', 'system', 'campaign',
  'SEO', 'responsive', 'mobile', 'social media',
  'user experience', 'UX', 'UI', 'target audience',
  'key features', 'key milestone', 'key event',
  'success', 'challenge', 'important', 'significant',
  'crucial', 'essential', 'fundamental', 'critical',
  'step', 'phase', 'stage', 'milestone', 'timeline',
  'goal', 'objective', 'target', 'leadership', 'partnership',
  'Python', 'JavaScript', 'React', 'data structures', 'algorithms',
  'interactive', 'expert', 'industry', 'partnership', 'curriculum'
]

/**
 * Detect content type based on text characteristics
 */
function detectContentType(text) {
  const lowerText = text.toLowerCase()
  
  // Marketing/Sales content indicators
  const marketingIndicators = [
    /don't wait|enroll now|sign up|limited time|exclusive|special offer/i,
    /join us|unlock your|elevate your|transform your|revolutionize/i,
    /cutting-edge|innovative|premium|world-class|industry-leading/i,
    /call to action|cta|[[]link[]]|click here/i
  ]
  
  // Educational content indicators
  const educationalIndicators = [
    /explain|understand|learn|teach|concept|theory|principle/i,
    /step by step|how to|tutorial|guide|introduction/i,
    /research|study|evidence|data|analysis|findings/i
  ]
  
  // Narrative/Story content indicators
  const narrativeIndicators = [
    /once upon|story|tale|journey|adventure|experience/i,
    /character|plot|scene|dialogue|narrative/i
  ]
  
  // Instructional content indicators
  const instructionalIndicators = [
    /ingredients|procedure|instructions|steps|method|process/i,
    /first|second|third|next|finally|then|after/i
  ]
  
  const marketingMatches = marketingIndicators.filter(pattern => pattern.test(lowerText)).length
  const educationalMatches = educationalIndicators.filter(pattern => pattern.test(lowerText)).length
  const narrativeMatches = narrativeIndicators.filter(pattern => pattern.test(lowerText)).length
  const instructionalMatches = instructionalIndicators.filter(pattern => pattern.test(lowerText)).length
  
  if (marketingMatches > 0) return 'marketing'
  if (narrativeMatches > 0) return 'narrative'
  if (instructionalMatches > 0) return 'instructional'
  if (educationalMatches > 0) return 'educational'
  
  return 'general'
}

/**
 * Detect if text has natural sections with headers
 */
function hasNaturalSections(text) {
  const sectionPatterns = [
    /^#{1,3}\s+/m,  // Markdown headers
    /^[A-Z][^.!?]*:$/m,  // Lines ending with colon
    /^(Introduction|Conclusion|Summary|Overview|Background)/m
  ]
  
  return sectionPatterns.some(pattern => pattern.test(text))
}

/**
 * Check if text looks like a header/introduction
 */
function isHeaderLike(text) {
  // Short text that ends with colon
  if (text.length < 100 && text.trim().endsWith(':')) {
    return true
  }
  
  // Opening statements like "Certainly!", "Let me...", "Here's...", etc.
  const headerPatterns = [
    /^(Certainly|Sure|Absolutely|Let me|Here's|Here are|Below|Following|Above|Next|First|Finally|Additionally|Furthermore|Moreover|In summary|To summarize)/i,
    /^[A-Z][^.!?]*:$/,  // Ends with colon
    /^(Introduction|Overview|Summary|Conclusion|Note|Important|Key Point)/i
  ]
  
  return headerPatterns.some(pattern => pattern.test(text.trim()))
}

/**
 * Detect if text contains a numbered list
 * Only matches numbers at the start of a line (not in middle of text like "CO2.")
 */
function hasNumberedList(text) {
  const lines = text.split('\n')
  return lines.some(line => /^\d{1,2}\.\s+/.test(line.trim()))
}

/**
 * Extract numbered list items from text
 * Only extracts items that start at the beginning of a line
 */
function extractListItems(text) {
  const lines = text.split('\n')
  const items = []
  
  lines.forEach(line => {
    const trimmedLine = line.trim()
    const match = trimmedLine.match(/^(\d{1,2})\.\s+(.+)$/)
    if (match) {
      items.push({
        number: match[1],
        content: match[2].trim()
      })
    }
  })
  
  return items
}

/**
 * Split text into natural paragraphs
 */
function splitIntoParagraphs(text) {
  // Split by double newlines or by sentence groups
  const paragraphs = text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
  
  // If no double newlines, split by sentences
  if (paragraphs.length === 1) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const grouped = []
    let current = []
    
    sentences.forEach((sentence, idx) => {
      current.push(sentence.trim())
      
      // Group 2-3 sentences together
      if (current.length >= 2 || idx === sentences.length - 1) {
        grouped.push(current.join(' '))
        current = []
      }
    })
    
    return grouped.filter(p => p.length > 0)
  }
  
  return paragraphs
}

/**
 * Apply bold formatting to keywords
 */
function applyBoldFormatting(text) {
  let formatted = text
  
  BOLD_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    formatted = formatted.replace(regex, `**${keyword}**`)
  })
  
  return formatted
}

/**
 * Main formatter function
 */
export function smartFormatText(text) {
  if (!text || typeof text !== 'string') return []
  
  const contentType = detectContentType(text)
  const hasLists = hasNumberedList(text)
  const paragraphs = splitIntoParagraphs(text)
  
  const result = []
  
  // If text contains numbered lists, extract and format them
  if (hasLists) {
    const listItems = extractListItems(text)
    
    if (listItems.length > 0) {
      // Find where the list starts
      const firstListItemIndex = text.indexOf(`${listItems[0].number}.`)
      const beforeList = text.substring(0, firstListItemIndex).trim()
      
      // Add header and paragraphs before list
      if (beforeList) {
        const beforeParagraphs = beforeList.split(/\n\n+/).filter(p => p.trim())
        beforeParagraphs.forEach((para, idx) => {
          if (idx === 0 && isHeaderLike(para)) {
            result.push({
              type: 'header',
              content: para.replace(/:$/, '')
            })
          } else if (para.trim().length > 0) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
      
      // Add list items
      result.push({
        type: 'list',
        items: listItems.map(item => ({
          number: item.number,
          content: applyBoldFormatting(item.content)
        }))
      })
    }
    
    return result.filter(item => item && ((item.content && item.content.length > 0) || item.type === 'list'))
  }
  
  // For marketing content: Keep it as-is with minimal formatting
  if (contentType === 'marketing') {
    paragraphs.forEach((para, idx) => {
      // Check if first paragraph looks like a header
      if (idx === 0 && isHeaderLike(para)) {
        result.push({
          type: 'header',
          content: para.replace(/:$/, '')  // Remove trailing colon
        })
      } else {
        result.push({
          type: 'paragraph',
          content: applyBoldFormatting(para),
          preserveFlow: true  // Don't add headers
        })
      }
    })
    return result
  }
  
  // For narrative content: Keep natural flow
  if (contentType === 'narrative') {
    paragraphs.forEach((para, idx) => {
      // Check if first paragraph looks like a header
      if (idx === 0 && isHeaderLike(para)) {
        result.push({
          type: 'header',
          content: para.replace(/:$/, '')  // Remove trailing colon
        })
      } else {
        result.push({
          type: 'paragraph',
          content: applyBoldFormatting(para),
          preserveFlow: true
        })
      }
    })
    return result
  }
  
  // Default: Return as paragraphs with formatting
  paragraphs.forEach((para, idx) => {
    // Check if first paragraph looks like a header
    if (idx === 0 && isHeaderLike(para)) {
      result.push({
        type: 'header',
        content: para.replace(/:$/, '')  // Remove trailing colon
      })
    } else if (para.trim().length > 0) {
      result.push({
        type: 'paragraph',
        content: applyBoldFormatting(para)
      })
    }
  })
  
  return result.filter(item => item && ((item.content && item.content.length > 0) || item.type === 'list'))
}

export default smartFormatText
