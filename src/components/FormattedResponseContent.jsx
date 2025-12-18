/**
 * FormattedResponseContent
 * Renders AI responses with professional formatting using React components
 * Applies justified text alignment, bold, italic, and Tailwind CSS styling
 */

import React from 'react'
import { smartFormatText, parseFormattedText } from '../lib/smartFormatter'

/**
 * Render formatted text with bold and italic
 */
const renderFormattedText = (paragraph) => {
  if (!paragraph) return null

  const parts = paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g)

  return parts.map((part, idx) => {
    if (!part) return null

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return (
        <em key={idx} className="italic text-white">
          {part.slice(1, -1)}
        </em>
      )
    } else {
      return <span key={idx} className="text-white">{part}</span>
    }
  })
}

/**
 * Parse response text and render as formatted React components
 */
export const FormattedResponseContent = ({ text }) => {
  if (!text || typeof text !== 'string') return <p className="text-sm text-white">{text}</p>

  // Apply smart formatting
  const formattedItems = smartFormatText(text)

  return (
    <div className="space-y-6 text-white">
      {formattedItems.map((item, idx) => {
        // Handle regular paragraphs
        if (item.type === 'paragraph') {
          return (
            <p
              key={idx}
              className="text-sm text-white leading-relaxed"
              style={{
                textAlign: 'justify',
                textAlignLast: 'left',
                wordSpacing: '0.05em',
                letterSpacing: '0.3px',
                lineHeight: '1.8',
                hyphens: 'auto'
              }}
            >
              {renderFormattedText(item.content)}
            </p>
          )
        }

        // Handle sections with header and content
        if (item.type === 'section') {
          return (
            <div key={idx} className="space-y-3">
              {/* Section Header */}
              <h2 className="text-xl font-semibold text-white mt-6 mb-4 border-b border-purple-500/30 pb-2">
                {item.header}
              </h2>

              {/* Section Content - render each paragraph in the section */}
              <div className="space-y-4">
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
                        lineHeight: '1.8',
                        hyphens: 'auto'
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
                      lineHeight: '1.8',
                      hyphens: 'auto'
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
