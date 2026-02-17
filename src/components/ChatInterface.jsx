import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { 
  Send, 
  Plus, 
  MessageSquare, 
  User, 
  Bot, 
  Trash2, 
  Edit3, 
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Menu,
  X
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import logo from '../assets/DalSiAILogo2.png'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)
  const messagesEndRef = useRef(null)

  // Sample welcome message
  const welcomeMessage = {
    id: 'welcome',
    sender: 'ai',
    content: `Hello! I'm DalSi AI, your intelligent assistant powered by advanced artificial intelligence. I'm here to help you with:

🏥 **Healthcare Queries** - Medical information, symptoms analysis, treatment guidance
📚 **Educational Support** - Learning materials, explanations, academic assistance  
🤖 **AI Consultation** - Technology insights, automation solutions, AI implementation
💡 **General Assistance** - Research, analysis, problem-solving, and more

How can I assist you today?`,
    timestamp: new Date().toISOString()
  }

  useEffect(() => {
    // Initialize with welcome message if no current chat
    if (!currentChatId && messages.length === 0) {
      setMessages([welcomeMessage])
    }
  }, [currentChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        loadChats()
      }
    }
    checkUser()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setChats(data || [])
    } catch (error) {
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Save user message if authenticated
    if (user && currentChatId) {
      await saveMessage(currentChatId, 'user', userMessage.content)
    }

    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        content: simulateAIResponse(userMessage.content),
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)

      // Save AI response if authenticated
      if (user && currentChatId) {
        await saveMessage(currentChatId, 'ai', aiResponse.content)
      }
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
  }

  const rateMessage = async (messageId, rating) => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('messages')
        .update({ feedback_score: rating })
        .eq('id', messageId)

      if (error) throw error
    } catch (error) {