/**
 * FormattedResponseContent
 * Renders AI responses with Markdown + Math support using react-markdown
 */

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Sparkles } from 'lucide-react'

/**
 * Comprehensive LaTeX symbol replacement
 * Must be done BEFORE markdown parsing to avoid breaking list structure
 */
const replaceLatexSymbols = (text) => {
  if (!text || typeof text !== 'string') return text
  
  return text
    // Replace fractions with simplified format: \frac{a}{b} → a/b
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    
    // Replace common mathematical symbols
    .replace(/\\times/g, '×')
    .replace(/\\approx/g, '≈')
    .replace(/\\cdot/g, '·')
    .replace(/\\div/g, '÷')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\infty/g, '∞')
    .replace(/\\sqrt/g, '√')
    .replace(/\\sum/g, '∑')
    .replace(/\\prod/g, '∏')
    .replace(/\\int/g, '∫')
    .replace(/\\partial/g, '∂')
    .replace(/\\nabla/g, '∇')
    .replace(/\\leq/g, '≤')
    .replace(/\\geq/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\equiv/g, '≡')
    .replace(/\\propto/g, '∝')
    .replace(/\\sim/g, '~')
    .replace(/\\approx/g, '≈')
    .replace(/\\cong/g, '≅')
    .replace(/\\ll/g, '<<')
    .replace(/\\gg/g, '>>')
    .replace(/\\in/g, '∈')
    .replace(/\\notin/g, '∉')
    .replace(/\\subset/g, '⊂')
    .replace(/\\supset/g, '⊃')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\supseteq/g, '⊇')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\emptyset/g, '∅')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    .replace(/\\neg/g, '¬')
    .replace(/\\wedge/g, '∧')
    .replace(/\\vee/g, '∨')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\leftarrow/g, '←')
    .replace(/\\leftrightarrow/g, '↔')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\Leftarrow/g, '⇐')
    .replace(/\\Leftrightarrow/g, '⇔')
    
    // Remove \text{...} wrapper
    .replace(/\\text\{([^}]*)\}/g, '$1')
    
    // Remove \left and \right
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\left\{/g, '{')
    .replace(/\\right\}/g, '}')
    .replace(/\\left\|/g, '|')
    .replace(/\\right\|/g, '|')
}

/**
 * Fix malformed markdown where list items are concatenated
 */
const fixConcatenatedListItems = (text) => {
  if (!text || typeof text !== 'string') return text
  
  // Fix: ". 2. **" → ".\n\n2. **" (numbered list items on same line)
  text = text.replace(/([.!?])\s+(\d+)\.\s+\*\*/g, '$1\n\n$2. **')
  
  // Fix: "- text. 2. **" → "- text.\n\n2. **"
  text = text.replace(/(-\s+[^\n]*)\.\s+(\d+)\.\s+\*\*/g, '$1.\n\n$2. **')
  
  return text
}

/**
 * Parse response text and render as formatted React components with Markdown + Math
 */
export const FormattedResponseContent = ({ text }) => {
  if (!text || typeof text !== 'string') return <p className="text-sm text-white">{text}</p>

  // Fix concatenated list items FIRST
  let processedText = fixConcatenatedListItems(text)
  
  // Replace LaTeX symbols BEFORE markdown parsing
  processedText = replaceLatexSymbols(processedText)

  return (
    <div className="space-y-4 text-white">
      {/* DalsiAI Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-purple-500/30">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-wide">DalsiAI</span>
      </div>

      {/* Response Content with Markdown + Math */}
      <div className="prose prose-invert max-w-none text-gray-200">
        <style>{`
          /* Fix list rendering - remove paragraph margins inside list items */
          li > p {
            margin-bottom: 0 !important;
            margin-top: 0 !important;
            display: inline;
          }
          
          li > p + ul,
          li > p + ol {
            margin-top: 0.5rem;
            display: block;
          }
          
          /* Proper list indentation */
          ol, ul {
            padding-left: 1.5em !important;
            margin-left: 0 !important;
          }
          
          li {
            display: list-item;
            margin-left: 0 !important;
            padding-left: 0 !important;
          }
          
          /* Nested lists */
          li > ol,
          li > ul {
            padding-left: 1.5em;
            margin-top: 0.5rem;
          }
        `}</style>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Custom styling for headings
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mt-4 mb-2 border-b border-purple-500/30 pb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-white mt-4 mb-2 border-b border-purple-500/30 pb-2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-white mt-3 mb-2" {...props} />,
            h4: ({ node, ...props }) => <h4 className="text-base font-semibold text-white mt-2 mb-1" {...props} />,
            
            // Custom styling for paragraphs
            p: ({ node, ...props }) => <p className="text-sm leading-relaxed text-gray-200 mb-3" style={{ textAlign: 'justify', textAlignLast: 'left' }} {...props} />,
            
            // Custom styling for lists - FIXED: keep number and text inline
            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-3 pl-0" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-0 mb-3 pl-0" {...props} />,
            li: ({ node, ...props }) => <li className="text-sm text-gray-200 ml-0" {...props} />,
            
            // Custom styling for blockquotes
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-3" {...props} />,
            
            // Custom styling for code
            code: ({ node, inline, ...props }) => 
              inline ? 
                <code className="bg-purple-900/30 text-purple-200 px-1.5 py-0.5 rounded text-xs" {...props} /> :
                <code className="bg-purple-900/50 text-purple-100 p-3 rounded block my-3 overflow-x-auto text-xs" {...props} />,
            
            pre: ({ node, ...props }) => <pre className="bg-purple-900/50 p-3 rounded my-3 overflow-x-auto" {...props} />,
            
            // Custom styling for tables
            table: ({ node, ...props }) => <table className="border-collapse border border-purple-500/30 my-3 w-full text-sm" {...props} />,
            thead: ({ node, ...props }) => <thead className="bg-purple-900/30" {...props} />,
            tbody: ({ node, ...props }) => <tbody {...props} />,
            tr: ({ node, ...props }) => <tr className="border border-purple-500/30" {...props} />,
            th: ({ node, ...props }) => <th className="border border-purple-500/30 p-2 text-left font-semibold text-purple-200" {...props} />,
            td: ({ node, ...props }) => <td className="border border-purple-500/30 p-2" {...props} />,
            
            // Custom styling for links
            a: ({ node, ...props }) => <a className="text-purple-400 hover:text-purple-300 underline" {...props} />,
            
            // Custom styling for strong/emphasis
            strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
            em: ({ node, ...props }) => <em className="italic text-gray-300" {...props} />,
          }}
        >
          {processedText}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default FormattedResponseContent
