/**
 * Hierarchical Markdown Parser
 * Intelligently parses AI output with nested heading structure
 * Handles markdown headings (##, ###, ####) and groups content hierarchically
 */

/**
 * Parse markdown text into hierarchical structure
 * @param {string} text - Raw markdown text from AI
 * @returns {Array} - Hierarchical structure with headings and nested content
 */
export function parseHierarchicalMarkdown(text) {
  if (!text || typeof text !== 'string') return []

  const lines = text.split('\n')
  const structure = []
  let currentSection = null
  let stack = [] // Stack to track nested sections

  lines.forEach((line, idx) => {
    const trimmedLine = line.trim()
    
    // Skip empty lines
    if (!trimmedLine) return

    // Check if line is a heading
    const headingMatch = trimmedLine.match(/^(#{2,6})\s+(.+)$/)
    
    if (headingMatch) {
      const [, hashes, content] = headingMatch
      const level = hashes.length
      
      // Pop stack until we find parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      // Create new section
      const section = {
        type: 'heading',
        level: level,
        content: content.trim(),
        children: [],
        index: idx
      }

      // Add to parent or root
      if (stack.length > 0) {
        stack[stack.length - 1].children.push(section)
      } else {
        structure.push(section)
      }

      // Push to stack
      stack.push(section)
      currentSection = section
    } else {
      // This is content (not a heading)
      const contentObj = {
        type: 'content',
        text: trimmedLine,
        index: idx
      }

      // Add to current section's children or root
      if (stack.length > 0) {
        stack[stack.length - 1].children.push(contentObj)
      } else {
        structure.push(contentObj)
      }
    }
  })

  return structure
}

/**
 * Convert hierarchical structure to flat array for rendering
 * Includes depth information for proper indentation
 * @param {Array} structure - Hierarchical structure
 * @returns {Array} - Flat array with depth info
 */
export function flattenHierarchy(structure, depth = 0) {
  const flat = []

  structure.forEach(item => {
    if (item.type === 'heading') {
      flat.push({
        type: 'heading',
        level: item.level,
        content: item.content,
        depth: depth,
        hasChildren: item.children && item.children.length > 0
      })

      // Add children with increased depth
      if (item.children && item.children.length > 0) {
        const childFlat = flattenHierarchy(item.children, depth + 1)
        flat.push(...childFlat)
      }
    } else if (item.type === 'content') {
      flat.push({
        type: 'content',
        text: item.text,
        depth: depth
      })
    }
  })

  return flat
}

/**
 * Group consecutive content items under headings
 * @param {Array} flat - Flat array from flattenHierarchy
 * @returns {Array} - Grouped structure
 */
export function groupContentUnderHeadings(flat) {
  const grouped = []
  let currentHeading = null
  let currentContent = []

  flat.forEach(item => {
    if (item.type === 'heading') {
      // Save previous heading with its content
      if (currentHeading) {
        grouped.push({
          ...currentHeading,
          content_items: currentContent
        })
      }

      // Start new heading
      currentHeading = item
      currentContent = []
    } else if (item.type === 'content') {
      currentContent.push(item)
    }
  })

  // Don't forget the last heading
  if (currentHeading) {
    grouped.push({
      ...currentHeading,
      content_items: currentContent
    })
  }

  return grouped
}

/**
 * Main export function - parse and structure markdown
 * @param {string} text - Raw markdown text
 * @returns {Array} - Grouped and structured content
 */
export function parseAndStructureMarkdown(text) {
  const hierarchical = parseHierarchicalMarkdown(text)
  const flat = flattenHierarchy(hierarchical)
  const grouped = groupContentUnderHeadings(flat)
  return grouped
}

/**
 * Get heading hierarchy info
 * @param {Array} grouped - Grouped structure
 * @returns {Object} - Statistics about heading levels
 */
export function getHeadingHierarchyInfo(grouped) {
  const info = {
    totalHeadings: 0,
    levelCounts: {},
    maxDepth: 0,
    minLevel: Infinity,
    maxLevel: 0
  }

  grouped.forEach(item => {
    if (item.type === 'heading') {
      info.totalHeadings++
      info.levelCounts[item.level] = (info.levelCounts[item.level] || 0) + 1
      info.maxDepth = Math.max(info.maxDepth, item.depth)
      info.minLevel = Math.min(info.minLevel, item.level)
      info.maxLevel = Math.max(info.maxLevel, item.level)
    }
  })

  return info
}

/**
 * Validate heading hierarchy (no skipped levels)
 * @param {Array} grouped - Grouped structure
 * @returns {Object} - Validation result
 */
export function validateHeadingHierarchy(grouped) {
  const result = {
    isValid: true,
    issues: []
  }

  let previousLevel = 1
  let levelStack = [1]

  grouped.forEach((item, idx) => {
    if (item.type === 'heading') {
      const currentLevel = item.level

      // Check if level jumps more than 1
      if (currentLevel > previousLevel + 1) {
        result.isValid = false
        result.issues.push({
          type: 'LEVEL_SKIP',
          message: `Skipped heading level at item ${idx}: jumped from level ${previousLevel} to ${currentLevel}`,
          itemIndex: idx,
          previousLevel,
          currentLevel
        })
      }

      previousLevel = currentLevel
    }
  })

  return result
}
