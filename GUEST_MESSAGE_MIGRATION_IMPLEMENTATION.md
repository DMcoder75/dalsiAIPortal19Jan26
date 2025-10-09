# Guest Message Migration Implementation

## Overview
Implemented automatic migration of guest conversation to user account upon login.

## Use Case
1. **Guest user** sends a message and receives AI response
2. System prompts guest to login after reaching message limit
3. **Upon login**, a new chat is automatically created with the existing guest conversation
4. The chat appears in the sidebar with a title generated from the first message

## Implementation Details

### 1. AuthContext.jsx
**Changes:**
- Modified `login()` function to check for guest messages in localStorage
- Sets `pending_guest_migration` flag when guest messages exist
- This flag triggers the migration process in ChatInterface

```javascript
const login = async (userData) => {
  setUser(userData)
  // Trigger guest message migration if there are any
  const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
  if (guestMessages.length > 0) {
    localStorage.setItem('pending_guest_migration', 'true')
  }
}
```

### 2. EnhancedChatInterface.jsx
**Changes:**
- Enhanced `migrateGuestMessages()` function with:
  - Check for `pending_guest_migration` flag
  - Automatic chat creation with title from first message
  - Transfer of all guest messages (user + AI responses) to database
  - Setting new chat as active
  - Sidebar refresh to show new chat
  - Cleanup of localStorage after successful migration

**Key Features:**
- Console logging for debugging
- Error handling with flag cleanup
- Proper message metadata preservation
- Automatic chat title generation (first 5 words, max 40 chars)

### 3. AuthModal.jsx
**Changes:**
- Updated login handler to:
  - Call `login()` which sets migration flag
  - Close modal to allow migration
  - Delay page reload by 1 second for migration to complete

```javascript
// Update auth context (this will trigger migration)
await login(userData)

// Close modal and let the migration happen
if (onSuccess) {
  onSuccess()
}
onClose()

// Reload after a short delay to allow migration to complete
setTimeout(() => {
  window.location.reload()
}, 1000)
```

## Flow Diagram

```
Guest User Sends Message
         ↓
AI Response Received
         ↓
Messages Stored in localStorage
         ↓
User Clicks Login
         ↓
Login Successful
         ↓
AuthContext.login() sets migration flag
         ↓
ChatInterface detects flag
         ↓
migrateGuestMessages() executes:
  - Creates new chat
  - Saves all messages to database
  - Sets chat as active
  - Refreshes sidebar
  - Clears localStorage
         ↓
Page Reloads (after 1 second)
         ↓
User sees their conversation in sidebar
```

## Testing Instructions

### Test Case 1: Guest Message Migration
1. Open portal in incognito/private mode
2. Send a message as guest (e.g., "Hello, what can you do?")
3. Receive AI response
4. Click "Sign In" button
5. Login with credentials
6. **Expected Result:**
   - New chat appears in sidebar with title "Hello, what can you do?"
   - Chat contains both the guest message and AI response
   - Chat is automatically selected and displayed

### Test Case 2: Multiple Guest Messages
1. As guest, send multiple messages
2. Login after conversation
3. **Expected Result:**
   - All messages (user + AI) are transferred
   - Chat title is from first user message
   - Conversation continuity is maintained

### Test Case 3: No Guest Messages
1. Login without sending any guest messages
2. **Expected Result:**
   - No migration occurs
   - Normal login flow
   - No errors in console

## Console Logging
The implementation includes detailed console logging for debugging:
- `🔄 Migrating X guest messages to user account...`
- `✅ Created new chat: [ID] Title: [Title]`
- `✅ All messages saved to database`
- `✅ Guest messages migrated successfully!`
- `❌ Error messages` if something fails

## Database Schema
Messages are saved with metadata:
```javascript
{
  chat_id: newChat.id,
  sender: 'user' | 'ai',
  content: message.content,
  content_type: 'text',
  metadata: {
    migrated_from_guest: true,
    original_timestamp: msg.timestamp,
    model: selectedModel  // Store model name in metadata (not model_id)
  },
  context_data: { timestamp: msg.timestamp }
}
```

**Note:** The model name is stored in `metadata.model` as a string (e.g., "dalsi-ai"), NOT in a `model_id` field. The `model_id` field expects a UUID reference to the `ai_models` table and should not be used for message storage.

## Deployment

### Option 1: Manual Deployment
```bash
cd dalsi_ai_portal
git pull origin main
npm run build
firebase deploy --only hosting
```

### Option 2: Local Testing
```bash
cd dalsi_ai_portal
git pull origin main
npm install
npm run dev
```

## Files Modified
1. `/src/contexts/AuthContext.jsx`
2. `/src/components/EnhancedChatInterface.jsx`
3. `/src/components/AuthModal.jsx`

## Git Commit
```
commit 157b5a4
Author: Your Name
Date: Today

Implement guest message migration on login

- Modified AuthContext to trigger migration when user logs in
- Enhanced migrateGuestMessages to automatically create chat with guest conversation
- Updated login flow to allow migration before page reload
- Guest messages and AI responses are now transferred to user account upon login
```

## Notes
- Migration only happens once per login session
- Guest messages are cleared from localStorage after successful migration
- Migration flag is cleared even on error to prevent infinite retry
- Page reload ensures fresh state after migration
- Chat appears in sidebar immediately after migration

## Future Enhancements
1. Add visual feedback during migration (loading spinner)
2. Show success notification after migration
3. Highlight the migrated chat in sidebar
4. Add option to merge with existing chat instead of creating new one
