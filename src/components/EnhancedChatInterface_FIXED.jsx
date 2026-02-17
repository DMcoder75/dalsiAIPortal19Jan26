// FIXED CODE SNIPPET - Replace the chat creation and message saving section

 // Auto-create chat if none exists (for logged-in users)
 let activeChatId = currentChatId // Use current chat ID if it exists
 if (user && !currentChatId) {
  try {
  processing_time: Date.now() - userMessage.id,
  sources: aiResponse.sources
  })
 } else if (!user) {
  // Save guest AI response to localStorage AND database
  const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
  guestMessages.push(aiResponse)
  localStorage.setItem('guest_messages', JSON.stringify(guestMessages))
  
  // Also save to database temp table
  await saveGuestMessageToDB(aiResponse)
 }
