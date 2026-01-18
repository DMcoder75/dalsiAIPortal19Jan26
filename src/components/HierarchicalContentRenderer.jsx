import React from 'react'
import { parseAndStructureMarkdown } from '../lib/hierarchicalParser'

/**
 * Hierarchical Content Renderer
 * Renders parsed markdown with proper hierarchy, indentation, and styling
 */
export function HierarchicalContentRenderer({ content }) {
  if (!content || typeof content !== 'string') {
    return <div className="text-gray-400">No content to display</div>
  }

  // Parse the markdown content
  const structured = parseAndStructureMarkdown(content)

  return (
    <div className="hierarchical-content space-y-2">
      {structured.map((item, idx) => {
        if (item.type === 'heading') {
          return (
            <HeadingWithContent key={idx} item={item} index={idx} />
          )
        }
        return null
      })}
    </div>
  )
}

/**
 * Render a heading with its nested content
 */
function HeadingWithContent({ item, index }) {
  const { level, content, depth, content_items } = item

  // Calculate styling based on heading level and depth
  const headingStyles = getHeadingStyles(level, depth)
  const contentIndent = getContentIndent(depth)

  return (
    <div key={index} className={`heading-section ${contentIndent}`}>
      {/* Heading */}
      <div className={headingStyles.container}>
        <h2 className={headingStyles.text}>
          {content}
        </h2>
        <div className={headingStyles.border}></div>
      </div>

      {/* Content under this heading */}
      {content_items && content_items.length > 0 && (
        <div className={`content-block ${getContentSpacing(level)} mt-1`}>
          {content_items.map((contentItem, contentIdx) => (
            <ContentItem
              key={contentIdx}
              item={contentItem}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Render individual content item
 */
function ContentItem({ item, depth }) {
  const { text } = item
  const indent = getContentIndent(depth)

  // Check if content is a list item
  const isListItem = /^[-*+]\s+/.test(text.trim())
  const isBulletPoint = /^•\s+/.test(text.trim())

  if (isListItem || isBulletPoint) {
    return (
      <div className={`list-item ${indent}`}>
        <div className="flex gap-2">
          <span className="text-purple-400 flex-shrink-0 mt-0.5">•</span>
          <p className="text-sm text-gray-200 leading-snug flex-grow">
            {cleanListItemText(text)}
          </p>
        </div>
      </div>
    )
  }

  // Regular paragraph
  return (
    <p className={`content-text ${indent} text-sm text-gray-200 leading-snug`}>
      {text}
    </p>
  )
}

/**
 * Get heading styles based on level and depth
 */
function getHeadingStyles(level, depth) {
  const baseStyles = {
    2: {
      container: 'heading-level-2 mt-4 mb-1',
      text: 'text-2xl font-bold text-white',
      border: 'h-1 bg-gradient-to-r from-purple-500 to-purple-300 mt-1 rounded-full'
    },
    3: {
      container: 'heading-level-3 mt-3 mb-1',
      text: 'text-xl font-semibold text-purple-200',
      border: 'h-0.5 bg-gradient-to-r from-purple-400 to-purple-200 mt-0.5'
    },
    4: {
      container: 'heading-level-4 mt-2 mb-0.5',
      text: 'text-lg font-semibold text-purple-100',
      border: 'h-0.5 bg-purple-300 mt-0.5'
    },
    5: {
      container: 'heading-level-5 mt-2 mb-0.5',
      text: 'text-base font-semibold text-purple-50',
      border: 'h-px bg-purple-300'
    },
    6: {
      container: 'heading-level-6 mt-2 mb-0.5',
      text: 'text-sm font-semibold text-gray-300',
      border: 'h-px bg-gray-400'
    }
  }

  return baseStyles[level] || baseStyles[6]
}

/**
 * Get content indentation based on depth
 */
function getContentIndent(depth) {
  const indentMap = {
    0: 'pl-0',
    1: 'pl-4 md:pl-6',
    2: 'pl-8 md:pl-12',
    3: 'pl-12 md:pl-16',
    4: 'pl-16 md:pl-20',
    5: 'pl-20 md:pl-24'
  }

  return indentMap[depth] || indentMap[5]
}

/**
 * Get content spacing based on heading level
 */
function getContentSpacing(level) {
  const spacingMap = {
    2: 'space-y-1.5',
    3: 'space-y-1',
    4: 'space-y-1',
    5: 'space-y-0.5',
    6: 'space-y-0.5'
  }

  return spacingMap[level] || 'space-y-1'
}

/**
 * Clean list item text by removing markdown list markers
 */
function cleanListItemText(text) {
  return text
    .replace(/^[-*+]\s+/, '')
    .replace(/^•\s+/, '')
    .trim()
}

export default HierarchicalContentRenderer
