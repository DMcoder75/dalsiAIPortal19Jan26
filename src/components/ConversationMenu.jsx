import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Edit2, Trash2 } from 'lucide-react'

/**
 * ConversationMenu Component
 * Three-dot menu for conversation options (edit/delete)
 * Maintains existing UI styling and appearance
 */
export default function ConversationMenu({
  conversation,
  onEdit,
  onDelete,
  isLoading = false
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEdit = (e) => {
    e.stopPropagation()
    setIsOpen(false)
    onEdit(conversation)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    setIsOpen(false)
    
    if (confirm(`Delete conversation "${conversation.title}"?`)) {
      onDelete(conversation.id)
    }
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        disabled={isLoading}
        className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        title="Conversation options"
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-slate-900 border border-border rounded-lg shadow-lg z-50">
          {/* Edit Option */}
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2 rounded-t-lg disabled:opacity-50 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit Title</span>
          </button>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Delete Option */}
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 flex items-center gap-2 rounded-b-lg disabled:opacity-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  )
}
