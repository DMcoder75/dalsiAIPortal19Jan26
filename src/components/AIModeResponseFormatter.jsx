/**
 * AI Mode Response Formatter
 * Displays responses in different formats based on mode (Chat, Debate, Project)
 * Non-intrusive component that integrates with existing message display
 */

import React from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Copy, ExternalLink, Sparkles, MessageCircle } from 'lucide-react'
import FormattedResponseContent from './FormattedResponseContent'

/**
 * Format and display chat mode response
 */
export const ChatModeResponse = ({ response, references, followups, onFollowupClick }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Copy Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded transition-colors"
        >
          <Copy className="w-3 h-3" />
          {copied ? 'Copied!' : 'Copy'}
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

      {/* References Section - Premium Design */}
      {references && references.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                REFERENCES & SOURCES
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
          </div>
          
          <div className="grid gap-2.5">
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

      {/* Follow-up Questions Section - Premium Design */}
      {followups && followups.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gradient-to-r from-purple-500/30 via-pink-500/20 to-transparent">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                FOLLOW-UP QUESTIONS
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
          </div>
          
          <div className="grid gap-2.5">
            {followups.map((followup, idx) => (
              <button
                key={idx}
                onClick={() => onFollowupClick && onFollowupClick(followup)}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 text-left w-full"
                title={followup}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Border gradient */}
                <div className="absolute inset-0 rounded-xl border border-purple-500/30 group-hover:border-purple-400/60 transition-colors duration-300"></div>
                
                {/* Content */}
                <div className="relative px-4 py-3 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                      <span className="text-purple-300 group-hover:text-purple-200 transition-colors">→</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-purple-200 group-hover:text-purple-100 transition-colors line-clamp-2">
                      {followup}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <span className="text-purple-300 text-xs">→</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Format and display debate mode response
 */
export const DebateModeResponse = ({ debate, references }) => {
  const [expandedPersona, setExpandedPersona] = React.useState(null)

  const personaColors = {
    'Optimist': 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    'Pessimist': 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    'Data Analyst': 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  }

  const personaIcons = {
    'Optimist': '😊',
    'Pessimist': '😟',
    'Data Analyst': '📊',
  }

  return (
    <div className="space-y-3">
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium text-foreground">
          🎭 <strong>Debate:</strong> {debate.question}
        </p>
      </div>

      <div className="space-y-2">
        {debate.debate_responses && debate.debate_responses.map((response, idx) => (
          <div
            key={idx}
            className={`border rounded-lg overflow-hidden transition-all ${personaColors[response.persona] || 'bg-muted'}`}
          >
            <button
              onClick={() => setExpandedPersona(expandedPersona === idx ? null : idx)}
              className="w-full px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{personaIcons[response.persona] || '🤔'}</span>
                <span className="font-semibold text-sm">{response.persona}</span>
              </div>
              {expandedPersona === idx ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedPersona === idx && (
              <div className="px-4 py-3 border-t border-current border-opacity-20">
                <p className="text-sm whitespace-pre-wrap text-foreground">
                  {response.response}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {references && references.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-2">📚 References</p>
          <div className="space-y-1">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline block truncate"
                title={ref.title}
              >
                {ref.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Format and display project mode response
 */
export const ProjectModeResponse = ({ goal, structured_data, formatted_output, references }) => {
  const [completedTasks, setCompletedTasks] = React.useState({})

  const toggleTaskCompletion = (phaseIdx, taskIdx) => {
    const key = `${phaseIdx}-${taskIdx}`
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm font-semibold text-foreground mb-1">🎯 Goal</p>
        <p className="text-sm text-foreground">{goal}</p>
      </div>

      {structured_data && structured_data.phases && (
        <div className="space-y-3">
          {structured_data.phases.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-muted">
                <p className="font-semibold text-sm text-foreground">
                  📍 {phase.phase_name}
                </p>
              </div>

              <div className="px-4 py-3 space-y-2">
                {phase.tasks && phase.tasks.map((task, taskIdx) => (
                  <button
                    key={taskIdx}
                    onClick={() => toggleTaskCompletion(phaseIdx, taskIdx)}
                    className="w-full flex items-start gap-3 p-2 hover:bg-muted rounded transition-colors text-left"
                  >
                    {completedTasks[`${phaseIdx}-${taskIdx}`] ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${completedTasks[`${phaseIdx}-${taskIdx}`] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.task_name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {formatted_output && (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-2">📋 Full Plan</p>
          <div className="prose prose-sm max-w-none dark:prose-invert text-xs">
            <pre className="whitespace-pre-wrap text-foreground overflow-auto max-h-96">
              {formatted_output}
            </pre>
          </div>
        </div>
      )}

      {references && references.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-2">📚 References</p>
          <div className="space-y-1">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline block truncate"
                title={ref.title}
              >
                {ref.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Main formatter component that routes to appropriate display
 */
export const AIModeResponseFormatter = ({ mode = 'chat', response, references, followups, onFollowupClick }) => {
  if (!response) return null

  // Handle different response structures based on mode
  if (mode === 'debate' && response.debate) {
    return <DebateModeResponse debate={response.debate} references={references} />
  }

  if (mode === 'project' && response.structured_data) {
    return (
      <ProjectModeResponse
        goal={response.goal}
        structured_data={response.structured_data}
        formatted_output={response.formatted_output}
        references={references}
      />
    )
  }

  // Default to chat mode
  return <ChatModeResponse response={response.response || response} references={references} followups={followups} onFollowupClick={onFollowupClick} />
}

export default AIModeResponseFormatter
