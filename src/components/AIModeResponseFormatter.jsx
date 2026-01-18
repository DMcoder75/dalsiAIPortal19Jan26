/**
 * AI Mode Response Formatter
 * Displays responses in different formats based on mode (Chat, Debate, Project)
 * Non-intrusive component that integrates with existing message display
 */

import React from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Copy, ExternalLink, Sparkles, MessageCircle, Volume2, Download } from 'lucide-react'
import FormattedResponseContent from './FormattedResponseContent'

/**
 * Format and display chat mode response
 */
export const ChatModeResponse = ({ response, references, followups, onFollowupClick }) => {
  const [copied, setCopied] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const textToSpeak = typeof response === 'string' ? response : String(response)
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.onend = () => setIsSpeaking(false)
    
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const handleDownload = () => {
    const textToDownload = typeof response === 'string' ? response : String(response)
    const element = document.createElement('a')
    const file = new Blob([textToDownload], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `response-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors"
          title="Copy response"
        >
          <Copy className="w-3 h-3" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleSpeak}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors"
          title="Speak response"
        >
          <Volume2 className="w-3 h-3" />
          {isSpeaking ? 'Stop' : 'Speak'}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors"
          title="Download response"
        >
          <Download className="w-3 h-3" />
          Download
        </button>
      </div>

      {/* Main Response */}
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {typeof response === 'object' && response.$$typeof ? (
          <div className="text-sm leading-relaxed">{response}</div>
        ) : typeof response === 'string' ? (
          <FormattedResponseContent text={response} />
        ) : (
          <div className="text-sm leading-relaxed">{response}</div>
        )}
      </div>

      {/* Separator before References */}
      {references && references.length > 0 && (
        <div className="my-4 h-px bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent"></div>
      )}

      {/* References Section - Premium Design */}
      {references && references.length > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-blue-300 tracking-widest uppercase">
                References & Sources
              </h3>
            </div>
          </div>
          
          <div className="grid gap-2">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Border gradient */}
                <div className="absolute inset-0 rounded-xl border border-blue-500/30 group-hover:border-blue-400/60 transition-colors duration-300"></div>
                
                {/* Content */}
                <div className="relative px-4 py-3 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-blue-200 group-hover:text-blue-100 transition-colors truncate">
                      {ref.title || ref}
                    </p>
                    {ref.url && (
                      <p className="text-xs text-blue-400/60 group-hover:text-blue-400/80 truncate mt-1 transition-colors">
                        {ref.url}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Thicker Separator before Follow-up Questions */}
      {followups && followups.length > 0 && (
        <div className="my-6 h-0.5 bg-gradient-to-r from-purple-500/40 via-purple-500/30 to-transparent"></div>
      )}

      {/* Follow-up Questions Section - Improved Design */}
      {followups && followups.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-purple-400">+</span>
              <h3 className="text-xs font-bold text-purple-300 tracking-widest uppercase">
                Suggested follow-ups
              </h3>
            </div>
          </div>
          
          <div className="space-y-0">
            {followups.map((followup, idx) => (
              <div key={idx}>
                <button
                  onClick={() => onFollowupClick && onFollowupClick(followup)}
                  className="group relative w-full transition-all duration-300 text-left py-3 px-4 flex items-center justify-between hover:bg-purple-500/5"
                  title={followup}
                >
                  {/* Content */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className="text-base font-bold text-purple-400 group-hover:text-purple-300 transition-colors">+</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-purple-200 group-hover:text-purple-100 transition-colors">
                        {followup}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 ml-3 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-lg">→</span>
                  </div>
                </button>
                
                {/* Line separator between items */}
                {idx < followups.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 Debate mode response with structured arguments
 */
export const DebateModeResponse = ({ response, arguments: args, references, followups, onFollowupClick }) => {
  const [expandedArgs, setExpandedArgs] = React.useState({})
  const toggleArg = (idx) => {
    setExpandedArgs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }
  return (
    <div className="space-y-4">
      {/* Main Response */}
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {typeof response === 'string' ? (
          <FormattedResponseContent text={response} />
        ) : (
          <div className="text-sm leading-relaxed">{response}</div>
        )}
      </div>
      {/* Arguments Section */}
      {args && args.length > 0 && (
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <h3 className="text-sm font-bold text-white mb-3">Key Arguments</h3>
          <div className="space-y-2">
            {args.map((arg, idx) => (
              <div key={idx} className="border border-purple-500/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleArg(idx)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-purple-500/10 transition-colors text-left"
                >
                  <span className="font-semibold text-purple-200">{arg.title}</span>
                  {expandedArgs[idx] ? (
                    <ChevronUp className="w-4 h-4 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-purple-400" />
                  )}
                </button>
                {expandedArgs[idx] && (
                  <div className="px-4 py-3 bg-purple-500/5 border-t border-purple-500/20 text-sm text-gray-300">
                    {arg.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* References */}
      {references && references.length > 0 && (
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <h3 className="text-sm font-bold text-white mb-3">References</h3>
          <div className="space-y-2">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-400 hover:text-blue-300 truncate"
              >
                {ref.title || ref}
              </a>
            ))}
          </div>
        </div>
      )}
      {/* Follow-up Questions */}
      {followups && followups.length > 0 && (
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <h3 className="text-sm font-bold text-white mb-3">Follow-up Questions</h3>
          <div className="space-y-2">
            {followups.map((followup, idx) => (
              <button
                key={idx}
                onClick={() => onFollowupClick && onFollowupClick(followup)}
                className="w-full text-left px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-sm text-purple-200 hover:text-purple-100 transition-colors"
              >
                ➕ {followup}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export const AIModeResponseFormatter = ChatModeResponse
export default ChatModeResponse
