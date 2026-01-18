/**
 * FormattedResponseContent
 * Renders AI responses with comprehensive Markdown formatting
 */

import React from 'react'
import { smartFormatText } from '../lib/smartFormatter'
import { parseInlineMarkdown, renderInlineMarkdown } from '../lib/inlineFormatter.jsx'
import { Sparkles, BookOpen, Lightbulb, Target, Zap, Settings, TrendingUp, Users, Briefcase, Award, Rocket } from 'lucide-react'
import TableRenderer from './TableRenderer'
import CodeBlockRenderer from './CodeBlockRenderer'
import BlockquoteRenderer from './BlockquoteRenderer'
import UnorderedListRenderer from './UnorderedListRenderer'

/**
 * Custom bold checkmark icon in purple - thick, solid style
 */
const BoldCheckmark = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

/**
 * Get appropriate icon for heading content
 */
const getHeadingIcon = (content) => {
  const lowerContent = content.toLowerCase()
  
  // Map keywords to icons - comprehensive matching
  if (lowerContent.match(/objective|goal|aim|purpose|morning|evening|afternoon|before|after|during|week|topic|covered|plan|study/i)) return <Target className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/step|activity|process|procedure|exercise|stretching|warm|cool|technique|method|hydration|meditation|break/i)) return <Zap className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/question|ask|inquiry|faq|tip|advice|suggestion/i)) return <Lightbulb className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/resource|material|tool|reference|link|guide|tutorial|instruction/i)) return <BookOpen className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/result|outcome|conclusion|summary|benefit|effect|impact|advantage|feature/i)) return <BoldCheckmark className="w-5 h-5" />
  if (lowerContent.match(/challenge|issue|problem|difficulty|risk|concern|caution|warning/i)) return <TrendingUp className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/team|group|people|collaboration|community|audience|participant|member/i)) return <Users className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/business|strategy|plan|approach|method|system|framework|model/i)) return <Briefcase className="w-5 h-5 text-purple-400" />
  if (lowerContent.match(/next|future|upcoming|launch|continue|additional|more|further|advanced/i)) return <Rocket className="w-5 h-5 text-purple-400" />
  
  // Default icon for any heading (numbered or not)
  return <BoldCheckmark className="w-5 h-5" />
}

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
    <div className="space-y-2 text-white">
      {/* DalsiAI Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-purple-500/30">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-wide">DalsiAI</span>
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

        // Handle nested bullet points under headings
        if (item.type === 'nested_bullets') {
          // Get the previous heading to determine indentation level
          let headingLevel = 3
          for (let i = idx - 1; i >= 0; i--) {
            if (formattedItems[i].type === 'heading') {
              headingLevel = formattedItems[i].level
              break
            }
          }
          
          // Indent bullets based on parent heading level
          const bulletIndentMap = {
            3: 'pl-12 md:pl-16',
            4: 'pl-16 md:pl-20',
            5: 'pl-20 md:pl-24',
            6: 'pl-24 md:pl-28'
          }
          
          return (
            <div key={idx} className={`space-y-1 ${bulletIndentMap[headingLevel] || 'pl-12 md:pl-16'} text-white`}>
              {item.items.map((bulletItem, bulletIdx) => (
                <div
                  key={bulletIdx}
                  className="text-sm leading-relaxed flex items-start gap-3"
                  style={{
                    textAlign: 'justify',
                    textAlignLast: 'left',
                    wordSpacing: '0.05em',
                    letterSpacing: '0.3px',
                    lineHeight: '1.6',
                    hyphens: 'none',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}
                >
                  <span className="text-purple-400 flex-shrink-0 mt-0.5 min-w-fit">•</span>
                  <span>{renderFormattedText(bulletItem.content)}</span>
                </div>
              ))}
            </div>
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
            2: 'pl-4 md:pl-6',
            3: 'pl-8 md:pl-12',
            4: 'pl-12 md:pl-16',
            5: 'pl-16 md:pl-20',
            6: 'pl-20 md:pl-24'
          }
          
          const icon = getHeadingIcon(item.content)
          const marginTopPx = item.level <= 2 ? '32px' : '24px'
          const marginBottomPx = '0px'

          return (
            <div key={idx} className={`${indentMap[item.level] || 'pl-0'} ${headingClasses[item.level] || 'text-lg'} font-semibold text-white border-b border-purple-500/20 pb-0 flex items-start gap-3`} style={{
              marginTop: marginTopPx,
              marginBottom: marginBottomPx
            }}>
              {icon ? <span className="text-purple-400 flex-shrink-0 mt-0.5">{icon}</span> : <span className="text-purple-400 flex-shrink-0 mt-0.5">✓</span>}
              <span>{renderFormattedText(item.content)}</span>
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
          // Use headingLevel if available, otherwise look back for parent heading
          let headingLevel = item.headingLevel || 3
          if (!item.headingLevel) {
            for (let i = idx - 1; i >= 0; i--) {
              if (formattedItems[i].type === 'heading') {
                headingLevel = formattedItems[i].level
                break
              }
            }
          }
          
          // Indent lists based on heading level (same as nested_bullets)
          const listIndentMap = {
            3: 'pl-12 md:pl-16',
            4: 'pl-16 md:pl-20',
            5: 'pl-20 md:pl-24',
            6: 'pl-24 md:pl-28'
          }
          
          return (
            <ol key={idx} className={`space-y-1 ${listIndentMap[headingLevel] || 'pl-12 md:pl-16'} text-white`}>
              {item.items.map((listItem, listIdx) => {
                // Check if this is a sub-item (e.g., 1.1, 2.3)
                const isSubItem = listItem.number && listItem.number.toString().includes('.')
                const subItemIndent = isSubItem ? 'pl-4 md:pl-6' : 'pl-0'
                
                return (
                  <li key={listIdx} className={`text-sm leading-relaxed ${subItemIndent}`} style={{
                    textAlign: 'justify',
                    textAlignLast: 'left',
                    wordSpacing: '0.05em',
                    letterSpacing: '0.3px',
                    lineHeight: '1.6',
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
          // Use headingLevel if available, otherwise look back for parent heading
          let headingLevel = item.headingLevel || 3
          if (!item.headingLevel) {
            for (let i = idx - 1; i >= 0; i--) {
              if (formattedItems[i].type === 'heading') {
                headingLevel = formattedItems[i].level
                break
              }
            }
          }
          
          // Indent paragraphs based on heading level
          const paragraphIndentMap = {
            3: 'pl-8 md:pl-12',
            4: 'pl-12 md:pl-16',
            5: 'pl-16 md:pl-20',
            6: 'pl-20 md:pl-24'
          }
          
          return (
            <p key={idx} className={`text-sm leading-snug text-gray-200 ${paragraphIndentMap[headingLevel] || 'pl-8 md:pl-12'}`} style={{
              textAlign: 'justify',
              textAlignLast: 'left',
              wordSpacing: '0.05em',
              letterSpacing: '0.3px',
              lineHeight: '1.5',
              hyphens: 'none',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              {renderFormattedText(item.content)}
            </p>
          )
        }

        // Fallback for unknown types
        return (
          <div key={idx} className="text-sm text-gray-300">
            {JSON.stringify(item)}
          </div>
        )
      })}
    </div>
  )
}

export default FormattedResponseContent
