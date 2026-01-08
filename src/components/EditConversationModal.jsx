import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

/**
 * EditConversationModal Component
 * Modal for editing conversation title
 * Maintains existing UI styling and appearance
 */
export default function EditConversationModal({
  isOpen,
  conversation,
  onClose,
  onSave,
  isLoading = false
}) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (conversation) {
      setTitle(conversation.title || '')
      setError('')
    }
  }, [conversation, isOpen])

  if (!isOpen || !conversation) return null

  const handleSave = async () => {
    // Validate title
    if (!title.trim()) {
      setError('Title cannot be empty')
      return
    }

    if (title.trim().length > 200) {
      setError('Title must be less than 200 characters')
      return
    }

    // Call save handler
    await onSave(conversation.id, title.trim())
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSave()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Edit Conversation Title</CardTitle>
            <CardDescription>Update the name of this conversation</CardDescription>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Conversation Title
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError('')
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter new title..."
              disabled={isLoading}
              maxLength={200}
              className="bg-input border-border text-foreground"
              autoFocus
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/200 characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
