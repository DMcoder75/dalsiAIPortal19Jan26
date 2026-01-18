/**
 * Smart Text Formatter - Comprehensive Version
 * Intelligently detects and parses all Markdown content types
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
  
  const marketingIndicators = [
    /don't wait|enroll now|sign up|limited time|exclusive|special offer/i,
    /join us|unlock your|elevate your|transform your|revolutionize/i,
    /cutting-edge|innovative|premium|world-class|industry-leading/i,
  ]
  
  const educationalIndicators = [
    /explain|understand|learn|teach|concept|theory|principle/i,
    /step by step|how to|tutorial|guide|introduction/i,
    /research|study|evidence|data|analysis|findings/i
  ]
  
  const narrativeIndicators = [
    /once upon|story|tale|journey|adventure|experience/i,
    /character|plot|scene|dialogue|narrative/i
  ]
  
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
 * Check if text looks like a header/introduction
 */
function isHeaderLike(text) {
  if (text.length < 100 && text.trim().endsWith(':')) {
    return true
  }
  
  const headerPatterns = [
    /^(Certainly|Sure|Absolutely|Let me|Here's|Here are|Below|Following|Above|Next|First|Finally|Additionally|Furthermore|Moreover|In summary|To summarize)/i,
    /^[A-Z][^.!?]*:$/,
    /^(Introduction|Overview|Summary|Conclusion|Note|Important|Key Point)/i
  ]
  
  return headerPatterns.some(pattern => pattern.test(text.trim()))
}

/**
 * Detect if text contains a Markdown table
 */
function hasMarkdownTable(text) {
  const lines = text.split('\n')
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim()
    const nextLine = lines[i + 1].trim()
    
    if (line.startsWith('|') && nextLine.startsWith('|')) {
      if (/^\|[\s\-|:]+\|$/.test(nextLine)) {
        return true
      }
    }
  }
  return false
}

/**
 * Parse Markdown table
 */
function parseMarkdownTable(text) {
  const lines = text.split('\n')
  let tableStartIdx = -1
  let tableEndIdx = -1
  
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim()
    const nextLine = lines[i + 1].trim()
    
    if (line.startsWith('|') && nextLine.startsWith('|') && /^\|[\s\-|:]+\|$/.test(nextLine)) {
      tableStartIdx = i
      tableEndIdx = i + 1
      
      for (let j = i + 2; j < lines.length; j++) {
        if (lines[j].trim().startsWith('|')) {
          tableEndIdx = j
        } else {
          break
        }
      }
      break
    }
  }
  
  if (tableStartIdx === -1) return null
  
  const headerLine = lines[tableStartIdx].trim()
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h)
  
  const rows = []
  for (let i = tableStartIdx + 2; i <= tableEndIdx; i++) {
    const line = lines[i].trim()
    if (!line.startsWith('|')) break
    
    const cells = line.split('|')
      .map(c => c.trim())
      .filter((c, idx) => idx > 0 && idx < headers.length + 1)
    
    if (cells.length === headers.length) {
      rows.push(cells)
    }
  }
  
  return {
    headers,
    rows,
    startIdx: tableStartIdx,
    endIdx: tableEndIdx
  }
}

/**
 * Detect if text contains a numbered list
 */
function hasNumberedList(text) {
  const lines = text.split('\n')
  return lines.some(line => /^\d{1,2}\.\s+/.test(line.trim()))
}

/**
 * Extract numbered list items
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
 * Detect if text contains unordered lists
 */
function hasUnorderedList(text) {
  const lines = text.split('\n')
  return lines.some(line => /^[\s]*[-*+]\s+/.test(line))
}

/**
 * Extract unordered list items with nesting support
 */
function extractUnorderedListItems(text) {
  const lines = text.split('\n')
  const items = []
  
  lines.forEach(line => {
    const match = line.match(/^([\s]*)[-*+]\s+(.+)$/)
    if (match) {
      const indent = match[1].length / 2 // Assume 2 spaces per level
      items.push({
        level: Math.floor(indent),
        content: match[2].trim()
      })
    }
  })
  
  return items
}

/**
 * Detect code blocks
 */
function hasCodeBlock(text) {
  return /```[\s\S]*?```/.test(text)
}

/**
 * Extract code blocks
 */
function extractCodeBlocks(text) {
  const blocks = []
  const regex = /```(\w*)\n([\s\S]*?)```/g
  let match
  
  while ((match = regex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
      fullMatch: match[0]
    })
  }
  
  return blocks
}

/**
 * Detect blockquotes
 */
function hasBlockquote(text) {
  const lines = text.split('\n')
  return lines.some(line => /^>\s+/.test(line.trim()))
}

/**
 * Extract blockquotes
 */
function extractBlockquotes(text) {
  const lines = text.split('\n')
  const blockquotes = []
  let currentQuote = []
  
  lines.forEach(line => {
    const match = line.match(/^>\s+(.+)$/)
    if (match) {
      currentQuote.push(match[1])
    } else if (currentQuote.length > 0) {
      blockquotes.push(currentQuote.join('\n'))
      currentQuote = []
    }
  })
  
  if (currentQuote.length > 0) {
    blockquotes.push(currentQuote.join('\n'))
  }
  
  return blockquotes
}

/**
 * Detect Markdown headings
 */
function hasMarkdownHeadings(text) {
  return /^#{1,6}\s+/m.test(text)
}

/**
 * Extract Markdown headings with levels and line indices
 */
function extractHeadingsWithIndices(text) {
  const lines = text.split('\n')
  const headings = []
  
  lines.forEach((line, idx) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      headings.push({
        level: match[1].length,
        content: match[2].trim(),
        lineIdx: idx
      })
    }
  })
  
  return headings
}

/**
 * Parse inline formatting with links, bold, italic, code, strikethrough
 */
function parseInlineFormatting(text) {
  if (!text) return text
  
  // This will be handled by the component rendering
  // Store markers for the component to process
  return text
}

/**
 * Split text into natural paragraphs
 */
function splitIntoParagraphs(text) {
  const paragraphs = text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
  
  if (paragraphs.length === 1) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const grouped = []
    let current = []
    
    sentences.forEach((sentence, idx) => {
      current.push(sentence.trim())
      
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
 * DISABLED: This was causing random words to appear bold
 * The inline formatter handles bold/italic formatting properly
 */
function applyBoldFormatting(text) {
  // DISABLED: Return text as-is without auto-bolding keywords
  // This prevents words like 'website', 'industry', 'strategy' from being auto-bolded
  return text
}

/**
 * Restore code blocks and blockquotes from placeholders
 */
function restoreCodeBlocksAndQuotes(items, codeBlockMap, blockquoteMap) {
  return items.map(item => {
    if (item.type === 'paragraph' || item.type === 'heading') {
      const codeBlockKey = Object.keys(codeBlockMap).find(key => item.content?.includes(key))
      if (codeBlockKey) {
        return {
          type: 'code_block',
          language: codeBlockMap[codeBlockKey].language,
          code: codeBlockMap[codeBlockKey].code
        }
      }
      
      const quoteKey = Object.keys(blockquoteMap).find(key => item.content?.includes(key))
      if (quoteKey) {
        return {
          type: 'blockquote',
          content: blockquoteMap[quoteKey]
        }
      }
    }
    return item
  })
}

/**
 * Main formatter function - processes all Markdown content types
 */
export function smartFormatText(text) {
  if (!text || typeof text !== 'string') return []
  
  const contentType = detectContentType(text)
  const result = []
  
  // Priority 1: Extract code blocks first (they should be preserved as-is)
  const codeBlocks = extractCodeBlocks(text)
  let processText = text
  const codeBlockMap = {}
  
  codeBlocks.forEach((block, idx) => {
    const placeholder = `__CODE_BLOCK_${idx}__`
    codeBlockMap[placeholder] = block
    processText = processText.replace(block.fullMatch, placeholder)
  })
  
  // Priority 2: Extract blockquotes
  const blockquotes = extractBlockquotes(processText)
  const blockquoteMap = {}
  
  blockquotes.forEach((quote, idx) => {
    const placeholder = `__BLOCKQUOTE_${idx}__`
    blockquoteMap[placeholder] = quote
    blockquotes.forEach(bq => {
      processText = processText.replace(`> ${bq}`, placeholder)
    })
  })
  
  // Priority 3: Check for Markdown headings FIRST (before lists)
  // This prevents numbered lists within sections from destroying content
  const hasHeadings = hasMarkdownHeadings(processText)
  if (hasHeadings) {
    const headingsWithIndices = extractHeadingsWithIndices(processText)
    const lines = processText.split('\n')
    
    // Process each heading and its associated content
    headingsWithIndices.forEach((heading, headingIdx) => {
      // Add the heading
      result.push({
        type: 'heading',
        level: heading.level,
        content: heading.content
      })
      
      // Find content between this heading and the next heading
      const nextHeadingIdx = headingIdx + 1 < headingsWithIndices.length 
        ? headingsWithIndices[headingIdx + 1].lineIdx 
        : lines.length
      
      // Get all lines between this heading and the next
      const contentLines = lines.slice(heading.lineIdx + 1, nextHeadingIdx)
      const contentText = contentLines.join('\n').trim()
      
      if (contentText) {
        // Split content into bullet points and regular text
        const contentParts = []
        let currentParagraph = []
        
        contentLines.forEach(line => {
          const trimmedLine = line.trim()
          
          // Check if it's a bullet point
          if (/^[-*+]\s+/.test(trimmedLine)) {
            // If we have accumulated paragraph text, add it first
            if (currentParagraph.length > 0) {
              const paraText = currentParagraph.join('\n').trim()
              if (paraText) {
                contentParts.push({
                  type: 'paragraph',
                  content: paraText
                })
              }
              currentParagraph = []
            }
            
            // Extract bullet point text
            const bulletText = trimmedLine.replace(/^[-*+]\s+/, '').trim()
            contentParts.push({
              type: 'bullet',
              content: bulletText
            })
          } else if (trimmedLine) {
            // Regular text line
            currentParagraph.push(line)
          }
        })
        
        // Add any remaining paragraph text
        if (currentParagraph.length > 0) {
          const paraText = currentParagraph.join('\n').trim()
          if (paraText) {
            contentParts.push({
              type: 'paragraph',
              content: paraText
            })
          }
        }
        
        // Add content parts to result
        let bulletGroup = []
        contentParts.forEach(part => {
          if (part.type === 'bullet') {
            bulletGroup.push({
              content: applyBoldFormatting(part.content)
            })
          } else {
            // If we have accumulated bullets, add them as a group
            if (bulletGroup.length > 0) {
              result.push({
                type: 'nested_bullets',
                items: bulletGroup
              })
              bulletGroup = []
            }
            
            // Add the paragraph
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(part.content)
            })
          }
        })
        
        // Add any remaining bullets
        if (bulletGroup.length > 0) {
          result.push({
            type: 'nested_bullets',
            items: bulletGroup
          })
        }
      }
    })
    
    return restoreCodeBlocksAndQuotes(result, codeBlockMap, blockquoteMap)
  }
  
  // Priority 4: Check for tables
  const hasTable = hasMarkdownTable(processText)
  if (hasTable) {
    const tableData = parseMarkdownTable(processText)
    if (tableData) {
      const beforeTable = processText.substring(0, processText.indexOf(processText.split('\n')[tableData.startIdx])).trim()
      if (beforeTable) {
        const beforeParagraphs = beforeTable.split(/\n\n+/).filter(p => p.trim())
        beforeParagraphs.forEach((para, idx) => {
          if (idx === 0 && isHeaderLike(para)) {
            result.push({
              type: 'header',
              content: para.replace(/:$/, '')
            })
          } else if (para.trim().length > 0 && !para.includes('__CODE_BLOCK_') && !para.includes('__BLOCKQUOTE_')) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
      
      result.push({
        type: 'table',
        headers: tableData.headers,
        rows: tableData.rows
      })
      
      const afterTableStartIdx = processText.indexOf(processText.split('\n')[tableData.endIdx]) + processText.split('\n')[tableData.endIdx].length
      const afterTable = processText.substring(afterTableStartIdx).trim()
      if (afterTable) {
        const afterParagraphs = afterTable.split(/\n\n+/).filter(p => p.trim())
        afterParagraphs.forEach((para) => {
          if (para.trim().length > 0 && !para.includes('__CODE_BLOCK_') && !para.includes('__BLOCKQUOTE_')) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
      
      return restoreCodeBlocksAndQuotes(result, codeBlockMap, blockquoteMap)
    }
  }
  
  // Priority 5: Check for numbered lists (lower priority than headings)
  const hasLists = hasNumberedList(processText)
  if (hasLists) {
    const listItems = extractListItems(processText)
    
    if (listItems.length > 0) {
      const firstListItemIndex = processText.indexOf(`${listItems[0].number}.`)
      const beforeList = processText.substring(0, firstListItemIndex).trim()
      
      if (beforeList) {
        const beforeParagraphs = beforeList.split(/\n\n+/).filter(p => p.trim())
        beforeParagraphs.forEach((para, idx) => {
          if (idx === 0 && isHeaderLike(para)) {
            result.push({
              type: 'header',
              content: para.replace(/:$/, '')
            })
          } else if (para.trim().length > 0 && !para.includes('__CODE_BLOCK_') && !para.includes('__BLOCKQUOTE_')) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
      
      result.push({
        type: 'list',
        items: listItems.map(item => ({
          number: item.number,
          content: applyBoldFormatting(item.content)
        }))
      })
      
      // Process content AFTER the list
      const lastListItem = listItems[listItems.length - 1]
      const lastListItemIndex = processText.lastIndexOf(`${lastListItem.number}. ${lastListItem.content}`)
      const afterListStartIdx = lastListItemIndex + `${lastListItem.number}. ${lastListItem.content}`.length
      const afterList = processText.substring(afterListStartIdx).trim()
      
      if (afterList) {
        const afterParagraphs = afterList.split(/\n\n+/).filter(p => p.trim())
        afterParagraphs.forEach((para) => {
          if (para.trim().length > 0 && !para.includes('__CODE_BLOCK_') && !para.includes('__BLOCKQUOTE_')) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
    }
    
    return restoreCodeBlocksAndQuotes(result, codeBlockMap, blockquoteMap)
  }
  
  // Priority 6: Check for unordered lists
  const hasUnordered = hasUnorderedList(processText)
  if (hasUnordered) {
    const unorderedItems = extractUnorderedListItems(processText)
    
    if (unorderedItems.length > 0) {
      const lines = processText.split('\n')
      const firstListLineIdx = lines.findIndex(line => /^[\s]*[-*+]\s+/.test(line))
      const beforeList = lines.slice(0, firstListLineIdx).join('\n').trim()
      
      if (beforeList) {
        const beforeParagraphs = beforeList.split(/\n\n+/).filter(p => p.trim())
        beforeParagraphs.forEach((para, idx) => {
          if (idx === 0 && isHeaderLike(para)) {
            result.push({
              type: 'header',
              content: para.replace(/:$/, '')
            })
          } else if (para.trim().length > 0 && !para.includes('__CODE_BLOCK_') && !para.includes('__BLOCKQUOTE_')) {
            result.push({
              type: 'paragraph',
              content: applyBoldFormatting(para)
            })
          }
        })
      }
      
      result.push({
        type: 'unordered_list',
        items: unorderedItems
      })
    }
    
    return restoreCodeBlocksAndQuotes(result, codeBlockMap, blockquoteMap)
  }
  
  // Priority 7: Markdown headings already handled above as Priority 3
  
  // Default: Process as paragraphs
  const paragraphs = splitIntoParagraphs(processText)
  paragraphs.forEach((para, idx) => {
    if (para.includes('__CODE_BLOCK_')) {
      const blockKey = Object.keys(codeBlockMap).find(key => para.includes(key))
      if (blockKey) {
        result.push({
          type: 'code_block',
          language: codeBlockMap[blockKey].language,
          code: codeBlockMap[blockKey].code
        })
      }
    } else if (para.includes('__BLOCKQUOTE_')) {
      const quoteKey = Object.keys(blockquoteMap).find(key => para.includes(key))
      if (quoteKey) {
        result.push({
          type: 'blockquote',
          content: blockquoteMap[quoteKey]
        })
      }
    } else if (para.trim().length > 0) {
      result.push({
        type: 'paragraph',
        content: applyBoldFormatting(para)
      })
    }
  })
  
  return restoreCodeBlocksAndQuotes(result, codeBlockMap, blockquoteMap)
}

export default smartFormatText
