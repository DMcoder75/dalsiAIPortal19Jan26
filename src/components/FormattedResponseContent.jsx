/**
 * FormattedResponseContent
 * Renders AI responses with comprehensive Markdown formatting
 */

import React from 'react'
import { smartFormatText } from '../lib/smartFormatter'
import { parseInlineMarkdown, renderInlineMarkdown } from '../lib/inlineFormatter.jsx'
import { Sparkles } from 'lucide-react'
import TableRenderer from './TableRenderer'
import CodeBlockRenderer from './CodeBlockRenderer'
import BlockquoteRenderer from './BlockquoteRenderer'
import UnorderedListRenderer from './UnorderedListRenderer'

/**
 * Render formatted text with inline Markdown support
 */
const renderFormattedText = (paragraph) => {
  if (!paragraph) return null

  const parts = parseInlineMarkdown(paragraph)
  return renderInlineMarkdown(parts)
}

/**
 * Parse response text and render as formatted React components
 */
export const FormattedResponseContent = ({ text }) => {
  if (!text || typeof text !== 'string') return <p className="text-sm text-white">{text}</p>

  // DEBUG: Log the full text received
  console.log('[FormattedResponseContent] Full text length:', text.length)
  console.log('[FormattedResponseContent] Text preview (first 300 chars):', text.substring(0, 300))
  console.log('[FormattedResponseContent] Text ending (last 300 chars):', text.substring(text.length - 300))

  // Apply smart formatting
  const formattedItems = smartFormatText(text)
  
  // DEBUG: Log what smartFormatter returns
  console.log('[FormattedResponseContent] Formatted items count:', formattedItems.length)
  formattedItems.forEach((item, idx) => {
    if (item.content) {
      console.log(`[FormattedResponseContent] Item ${idx}: type=${item.type}, contentLength=${item.content.length}, preview=${typeof item.content === 'string' ? item.content.substring(0, 100) : 'not string'}`)
    } else {
      console.log(`[FormattedResponseContent] Item ${idx}: type=${item.type}`)
    }
  })

  return (
    <div className="space-y-1.5 text-white">
      {/* DalsiAI Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-purple-500/30">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-base font-bold text-white tracking-wide">DalsiAI</span>
      </div>

      {/* Response Content */}
      {formattedItems.map((item, idx) => {
        // Handle tables
        if (item.type === 'table') {
          return (
            <TableRenderer
              key={idx}
              headers={item.headers}
              rows={item.rows}
            />
          )
        }

        // Handle code blocks
        if (item.type === 'code_block') {
          return (
            <CodeBlockRenderer
              key={idx}
              language={item.language}
              code={item.code}
            />
          )
        }

        // Handle blockquotes
        if (item.type === 'blockquote') {
          return (
            <BlockquoteRenderer
              key={idx}
              content={item.content}
            />
          )
        }

        // Handle unordered lists
        if (item.type === 'unordered_list') {
          return (
            <UnorderedListRenderer
              key={idx}
              items={item.items}
            />
          )
        }

        // Handle Markdown headings
        if (item.type === 'heading') {
          const headingClasses = {
            1: 'text-2xl',
            2: 'text-xl',
            3: 'text-lg',
            4: 'text-base',
            5: 'text-sm',
            6: 'text-xs'
          }

          // Calculate indentation based on heading level
          const indentMap = {
            1: 'pl-0',
            2: 'pl-0',
            3: 'pl-4 md:pl-6',
            4: 'pl-8 md:pl-12',
            5: 'pl-12 md:pl-16',
            6: 'pl-16 md:pl-20'
          }

          return (
            <div key={idx} className={`${indentMap[item.level] || 'pl-0'} ${headingClasses[item.level] || 'text-lg'} font-semibold text-white mt-3 mb-1.5 border-b border-purple-500/30 pb-1`}>
              {renderFormattedText(item.content)}
            </div>
          )
        }

        // Handle standalone headers
        if (item.type === 'header') {
          return (
            <h2 key={idx} className="text-lg font-semibold text-white mt-3 mb-1.5 border-b border-purple-500/30 pb-1 pl-4 md:pl-6">
              {renderFormattedText(item.content)}
            </h2>
          )
        }

        // Handle numbered lists
        if (item.type === 'list') {
          return (
            <ol key={idx} className="space-y-1 ml-6 pl-4 md:pl-6 text-white">
              {item.items.map((listItem, listIdx) => {
                // Check if this is a sub-item (e.g., 1.1, 2.3)
                const isSubItem = listItem.number && listItem.number.toString().includes('.')
                const subItemIndent = isSubItem ? 'pl-4 md:pl-6' : 'pl-0'
                
                return (
                  <li key={listIdx} className={`text-sm leading-snug ${subItemIndent}`} style={{
                    textAlign: 'justify',
                    textAlignLast: 'left',
                    wordSpacing: '0.05em',
                    letterSpacing: '0.3px',
                    lineHeight: '1.4',
                    hyphens: 'none',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}>
                    <span className="font-semibold text-white">{listItem.number}.</span> {renderFormattedText(listItem.content)}
                  </li>
                )
              })}
            </ol>
          )
        }

        // Handle regular paragraphs
        if (item.type === 'paragraph') {
          return (
            <p key={idx} className="text-sm leading-snug text-gray-200 pl-4 md:pl-6" style={{
              textAlign: 'justify',
              textAlignLast: 'left',
              wordSpacing: '0.05em',
              letterSpacing: '0.3px',
              lineHeight: '1.4',
              hyphens: 'none',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              {renderFormattedText(item.content)}
            </p>
          )
        }

        // Handle sections with header and content
        if (item.type === 'section') {
          return (
            <div key={idx} className="space-y-4">
              {/* Section Header */}
              <h2 className="text-xl font-semibold text-white mt-6 mb-4 border-b border-purple-500/30 pb-3">
                {renderFormattedText(item.header)}
              </h2>

              {/* Section Content - render each paragraph in the section */}
              <div className="space-y-6">
                {Array.isArray(item.content) ? (
                  item.content.map((para, paraIdx) => (
                    <p
                      key={paraIdx}
                      className="text-sm text-white leading-relaxed"
                      style={{
                        textAlign: 'justify',
                        textAlignLast: 'left',
                        wordSpacing: '0.05em',
                        letterSpacing: '0.3px',
                        lineHeight: '2',
                        hyphens: 'none',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word'
                      }}
                    >
                      {renderFormattedText(para)}
                    </p>
                  ))
                ) : (
                  <p
                    className="text-sm text-white leading-relaxed"
                    style={{
                      textAlign: 'justify',
                      textAlignLast: 'left',
                      wordSpacing: '0.05em',
                      letterSpacing: '0.3px',
                      lineHeight: '2',
                      hyphens: 'none',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    {renderFormattedText(item.content)}
                  </p>
                )}
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default FormattedResponseContent
