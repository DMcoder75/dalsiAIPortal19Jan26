import React, { useState, useRef } from 'react'
import { X, Send, Copy, Download, History, Loader } from 'lucide-react'
import { smartGenerate } from '../lib/aiGenerationService'
import { saveEmailGeneration, getEmailHistory } from '../lib/emailService'
import FormattedResponseContent from './FormattedResponseContent'
import logger from '../lib/logger'

export default function EmailWriterModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('generate') // 'generate' or 'history'
  const [loading, setLoading] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState(null)
  const [emailHistory, setEmailHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    emailType: 'professional',
    recipientName: '',
    recipientEmail: '',
    subject: '',
    purpose: '',
    tone: 'formal',
    keyPoints: ''
  })

  const [error, setError] = useState(null)

  // Email types
  const emailTypes = [
    { value: 'professional', label: '💼 Professional' },
    { value: 'formal', label: '📋 Formal' },
    { value: 'casual', label: '👋 Casual' },
    { value: 'follow_up', label: '📧 Follow-up' },
    { value: 'complaint', label: '⚠️ Complaint' },
    { value: 'inquiry', label: '❓ Inquiry' },
    { value: 'thank_you', label: '🙏 Thank You' }
  ]

  const tones = [
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'neutral', label: 'Neutral' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateEmail = async () => {
    try {
      setLoading(true)
      setError(null)
      logger.info('📧 [EMAIL_WRITER] Generating email...')

      // Build the prompt
      const prompt = `Generate a ${formData.tone} ${formData.emailType} email with the following details:
Recipient: ${formData.recipientName || 'Recipient'}
Email: ${formData.recipientEmail || 'recipient@example.com'}
Subject: ${formData.subject}
Purpose: ${formData.purpose}
Key Points to Include: ${formData.keyPoints}

Please generate a complete, professional email that includes:
1. Proper greeting
2. Clear introduction
3. Main body with key points
4. Professional closing
5. Signature line

Format the email with proper structure and formatting.`

      // Call AI API
      const response = await smartGenerate(prompt, {
        mode: 'chat',
        maxLength: 'medium'
      })

      logger.info('📧 [EMAIL_WRITER] Email generated successfully')

      // Extract email content
      const emailContent = response.data?.response || response.data || ''

      setGeneratedEmail({
        id: `email-${Date.now()}`,
        type: formData.emailType,
        recipientName: formData.recipientName,
        recipientEmail: formData.recipientEmail,
        subject: formData.subject,
        body: emailContent,
        tone: formData.tone,
        keyPoints: formData.keyPoints.split(',').map(p => p.trim()).filter(p => p),
        generatedAt: new Date().toLocaleString()
      })

      // Save to database
      if (user) {
        await saveEmailGeneration({
          user_id: user.id,
          email_type: formData.emailType,
          recipient_name: formData.recipientName,
          recipient_email: formData.recipientEmail,
          subject: formData.subject,
          body: emailContent,
          tone: formData.tone,
          key_points: formData.keyPoints.split(',').map(p => p.trim()).filter(p => p),
          metadata: {
            model_used: 'general',
            generation_time: new Date().toISOString()
          }
        })
        logger.info('📧 [EMAIL_WRITER] Email saved to database')
      }
    } catch (err) {
      logger.error('❌ [EMAIL_WRITER] Error generating email:', err)
      setError(err.message || 'Failed to generate email')
    } finally {
      setLoading(false)
    }
  }

  const handleLoadHistory = async () => {
    try {
      setHistoryLoading(true)
      logger.info('📧 [EMAIL_WRITER] Loading email history...')

      if (user) {
        const history = await getEmailHistory(user.id)
        setEmailHistory(history || [])
        logger.info('📧 [EMAIL_WRITER] History loaded:', history?.length || 0, 'emails')
      }
    } catch (err) {
      logger.error('❌ [EMAIL_WRITER] Error loading history:', err)
      setError('Failed to load email history')
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleCopyEmail = () => {
    if (generatedEmail) {
      const emailText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`
      navigator.clipboard.writeText(emailText)
      logger.info('📧 [EMAIL_WRITER] Email copied to clipboard')
    }
  }

  const handleDownloadEmail = () => {
    if (generatedEmail) {
      const element = document.createElement('a')
      const file = new Blob([`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`], {
        type: 'text/plain'
      })
      element.href = URL.createObjectURL(file)
      element.download = `email-${Date.now()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      logger.info('📧 [EMAIL_WRITER] Email downloaded')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">✉️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Email Writer</h2>
              <p className="text-xs text-purple-300">Generate professional emails</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 pt-4 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('generate')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'generate'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => {
              setActiveTab('history')
              if (emailHistory.length === 0) handleLoadHistory()
            }}
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'history'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'generate' ? (
            <div className="p-6 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                {/* Email Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Type
                  </label>
                  <select
                    name="emailType"
                    value={formData.emailType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {emailTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="e.g., John Smith"
                      className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="recipientEmail"
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Email subject line"
                    className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Purpose / Main Message
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="What is the main purpose of this email?"
                    rows="3"
                    className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                {/* Key Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Points (comma-separated)
                  </label>
                  <textarea
                    name="keyPoints"
                    value={formData.keyPoints}
                    onChange={handleInputChange}
                    placeholder="Point 1, Point 2, Point 3"
                    rows="2"
                    className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {tones.map(tone => (
                      <button
                        key={tone.value}
                        onClick={() => setFormData(prev => ({ ...prev, tone: tone.value }))}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.tone === tone.value
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Email */}
              {generatedEmail && (
                <div className="mt-8 p-6 bg-slate-800/50 border border-purple-500/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Email</h3>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Subject:</p>
                      <p className="text-sm font-medium text-white">{generatedEmail.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email Body:</p>
                      <div className="mt-2 p-4 bg-slate-900 rounded border border-purple-500/10">
                        <FormattedResponseContent content={generatedEmail.body} />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={handleDownloadEmail}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* History Tab */
            <div className="p-6">
              {historyLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-6 h-6 animate-spin text-purple-400" />
                </div>
              ) : emailHistory.length > 0 ? (
                <div className="space-y-3">
                  {emailHistory.map(email => (
                    <div
                      key={email.id}
                      className="p-4 bg-slate-800/50 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors cursor-pointer"
                      onClick={() => setGeneratedEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{email.subject}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {email.recipient_name} • {email.email_type}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">{email.created_at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No emails generated yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'generate' && (
          <div className="p-6 border-t border-purple-500/20 bg-slate-800/50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleGenerateEmail}
              disabled={loading || !formData.subject || !formData.purpose}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Generate Email
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
