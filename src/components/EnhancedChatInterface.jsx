import { useState, useEffect, useRef, useCallback } from 'react'
import Navigation from './Navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader } from './ui/card'
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
 X,
 Code,
 Download,
 Check,
 Image as ImageIcon,
 Sparkles,
 Crown,
 Zap,
 Upload,
 AlertCircle,
 Settings,
 Archive,
 ChevronDown,
 StopCircle,
 Loader2,
 DollarSign
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import * as dalsiAPI from '../lib/dalsiAPI'
import { useAuth } from '../contexts/AuthContext'
import { cleanTextForDB } from '../lib/textCleaner'
import { ChatOptionsMenu } from './ChatOptionsMenu'
const textEncoder = new TextEncoder()
import ExperienceNav from './ExperienceNav'
import { logChatApiCall, logGuestApiCall, getClientIp } from '../services/apiLogging'
import { trackFunnelStep } from '../services/analyticsAPI'
import { loggingDiagnostics } from '../services/loggingDiagnostics'
import { 
 getUsageStatus, 
 incrementGuestMessageCount,
 canGuestSendMessage,
 canUserSendMessage,
 getGuestMessageCount,
 fetchGuestLimit,
 fetchPlanLimits,
 getGuestLimit
} from '../lib/usageTracking'
import logo from '../assets/DalSiAILogo2.png'
import neoDalsiLogo from '../assets/neoDalsiLogo.png'
import { checkFriction, logFrictionAction } from '../services/frictionAPI'

// Code syntax highlighting component
const CodeBlock = ({ code, language = 'javascript' }) => {
 const [copied, setCopied] = useState(false)

 const copyCode = () => {
 navigator.clipboard.writeText(code)
 setCopied(true)
 setTimeout(() => setCopied(false), 2000)
 }

 return (
 <div className="relative bg-card rounded-lg border border-border my-4 overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
  <div className="flex items-center space-x-2">
   <Code className="h-4 w-4 text-muted-foreground" />
   <span className="text-sm font-medium text-muted-foreground">{language}</span>
  </div>
  <Button
   variant="ghost"
   size="sm"
   onClick={copyCode}
   className="h-6 px-2 text-muted-foreground hover:text-white"
  >
   {copied ? (
   <Check className="h-3 w-3 text-green-400" />
   ) : (
   <Copy className="h-3 w-3" />
   )}
  </Button>
  </div>
  <div className="p-4 overflow-x-auto">
  <pre className="text-sm text-foreground whitespace-pre-wrap">
   <code>{code}</code>
  </pre>
  </div>
 </div>
 )
}

// Enhanced message content renderer with professional typography
const MessageContent = ({ content, sources }) => {
 const [copied, setCopied] = useState(false)

 const copyFullMessage = () => {
 navigator.clipboard.writeText(content)
 setCopied(true)
 setTimeout(() => setCopied(false), 2000)
 }

 // Enhanced content parser for better formatting
 const parseContent = (text) => {
 const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
 const parts = []
 let lastIndex = 0
 let match

 while ((match = codeBlockRegex.exec(text)) !== null) {
  // Add text before code block
  if (match.index > lastIndex) {
  parts.push({
   type: 'text',
   content: text.slice(lastIndex, match.index)
  })
  }

  // Add code block
  parts.push({
  type: 'code',
  language: match[1] || 'text',
  content: match[2].trim()
  })

  lastIndex = match.index + match[0].length
 }

 // Add remaining text
 if (lastIndex < text.length) {
  parts.push({
  type: 'text',
  content: text.slice(lastIndex)
  })
 }

 return parts.length > 0 ? parts : [{ type: 'text', content: text }]
 }

 // Render text with enhanced typography
 const renderFormattedText = (text) => {
 // Split by double line breaks for paragraphs
 const paragraphs = text.split('\n\n')
 
 return paragraphs.map((paragraph, pIndex) => {
  if (!paragraph.trim()) return null
  
  // Check if it's a heading (starts with **)
  if (paragraph.startsWith('**') && paragraph.includes('**')) {
  const lines = paragraph.split('\n')
  return (
   <div key={pIndex} className="mb-6">
   {lines.map((line, lIndex) => {
    if (line.startsWith('**') && line.endsWith('**')) {
    // Main heading
    const headingText = line.replace(/\*\*/g, '')
    return (
     <h3 key={lIndex} className="text-lg font-semibold text-foreground mb-3 flex items-center">
     <div className="w-1 h-6 bg-primary rounded-full mr-3 text-white"></div>
     {headingText}
     </h3>
    )
    } else if (line.startsWith('**') && line.includes('**')) {
    // Subheading with description
    const parts = line.split('**')
    const title = parts[1]
    const description = parts[2]
    return (
     <div key={lIndex} className="mb-4 pl-4 border-l-2 border-muted">
     <h4 className="font-medium text-foreground mb-1">{title}</h4>
     <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
     </div>
    )
    } else if (line.startsWith('•')) {
    // Bullet points
    return (
     <div key={lIndex} className="flex items-start mb-2 pl-4">
     <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0 text-white"></div>
     <span className="text-sm text-foreground">{line.substring(2)}</span>
     </div>
    )
    } else if (line.trim()) {
    // Regular text
    return (
     <p key={lIndex} className="text-sm text-muted-foreground leading-relaxed mb-2">
     {line}
     </p>
    )
    }
    return null
   })}
   </div>
  )
  } else {
  // Regular paragraph
  return (
   <p key={pIndex} className="text-sm text-foreground leading-relaxed mb-4">
   {paragraph}
   </p>
  )
  }
 })
 }

 const contentParts = parseContent(content)

 return (
 <div className="relative group">
  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
  <Button
   variant="ghost"
   size="sm"
   onClick={copyFullMessage}
   className="h-6 w-6 p-0"
  >
   {copied ? (
   <Check className="h-3 w-3 text-green-500" />
   ) : (
   <Copy className="h-3 w-3" />
   )}
  </Button>
  </div>
  
  <div className="font-sans">
  {contentParts.map((part, index) => (
   <div key={index}>
   {part.type === 'text' ? (
    <div className="pr-8">
    {renderFormattedText(part.content)}
    </div>
   ) : (
    <CodeBlock code={part.content} language={part.language} />
   )}
   </div>
  ))}
  </div>
 </div>
 )
}

// Model selector component
const ModelSelector = ({ selectedModel, onModelChange, availableModels, userUsageCount, userSubscription, user, guestLimit }) => {
 const [isOpen, setIsOpen] = useState(false)

 return (
 <div className="relative">
  <Button
  variant="outline"
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center space-x-2 min-w-[160px] justify-between"
  >
  <div className="flex items-center space-x-2">
   {selectedModel === 'dalsi-aivi' ? (
   <Sparkles className="h-4 w-4 text-purple-500" />
   ) : (
   <Zap className="h-4 w-4 text-blue-500" />
   )}
   <span className="text-sm font-medium">
   {availableModels.find(m => m.id === selectedModel)?.name || 'DalSiAI'}
   </span>
  </div>
  <Settings className="h-3 w-3" />
  </Button>

  {isOpen && (
  <div className="absolute top-full left-0 mt-2 w-80 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg z-50">
   <div className="p-3 border-b border-border">
   <h3 className="font-semibold text-sm">Select AI Model</h3>
   </div>
   <div className="p-2 space-y-1">
   {availableModels.map((model) => {
    const isSelected = selectedModel === model.id
    const isGuest = !user
    const actualGuestLimit = guestLimit || 5
    const hasAccess = model.available || (model.id === 'dalsi-ai' && (user || userUsageCount < actualGuestLimit))
    const remainingUses = isGuest ? (actualGuestLimit - userUsageCount) : null
    
    return (
    <div
     key={model.id}
     className={`p-3 rounded-lg cursor-pointer transition-colors ${
     isSelected 
      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
      : hasAccess 
      ? 'hover:bg-gray-50 dark:hover:bg-gray-700' 
      : 'opacity-50 cursor-not-allowed'
     }`}
     onClick={() => {
     if (hasAccess) {
      onModelChange(model.id)
      setIsOpen(false)
     }
     }}
    >
     <div className="flex items-start justify-between">
     <div className="flex items-center space-x-3">
      {model.id === 'dalsi-aivi' ? (
      <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />
      ) : (
      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0" />
      )}
      <div>
      <div className="flex items-center space-x-2">
       <span className="font-medium text-sm">{model.name}</span>
       {model.requiresSubscription && (
       <Crown className="h-3 w-3 text-yellow-500" />
       )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
       {model.description}
      </p>
      {model.id === 'dalsi-ai' && isGuest && remainingUses > 0 && (
       <p className="text-xs text-green-600 dark:text-green-400 mt-1">
       {remainingUses} free use{remainingUses !== 1 ? 's' : ''} remaining
       </p>
      )}
      {model.id === 'dalsi-ai' && user && (
       <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
       Available for logged-in users
       </p>
      )}
      </div>
     </div>
     {!hasAccess && !user && (
      <Button size="sm" variant="outline" className="text-xs" onClick={(e) => { e.stopPropagation(); window.showAuth(); }}>
      Sign In
      </Button>
     )}
     {!hasAccess && user && model.requiresSubscription && (
      <Button size="sm" variant="outline" className="text-xs">
      Upgrade
      </Button>
     )}
     </div>
    </div>
    )
   })}
   </div>
  </div>
  )}
 </div>
 )
}

// Cinematic usage limit warning component
const UsageLimitWarning = ({ usageStatus, onUpgrade, onLogin }) => {
 // Guest user needs to login
 if (usageStatus.needsLogin) {
 return (
  <div className="mx-4 mb-4 relative overflow-hidden">
  <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm rounded-xl"></div>
  <div className="relative p-4 border border-blue-500/30 rounded-xl shadow-lg shadow-blue-500/20">
   <div className="flex items-center justify-between">
   <div className="flex items-center space-x-4">
    <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
    <AlertCircle className="h-6 w-6 text-blue-400" />
    </div>
    <div>
    <h3 className="font-bold text-lg text-blue-100 mb-1">
     Sign In to Continue
    </h3>
    <p className="text-sm text-blue-300">
     You've used your free guest message. Sign in to get 3 more free messages!
    </p>
    </div>
   </div>
   <Button 
    onClick={onLogin} 
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
   >
    Sign In
   </Button>
   </div>
  </div>
  </div>
 )
 }

 // Logged-in user needs to upgrade
 if (usageStatus.needsSubscription) {
 return (
  <div className="mx-4 mb-4 relative overflow-hidden">
  <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm rounded-xl"></div>
  <div className="relative p-4 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20">
   <div className="flex items-center justify-between">
   <div className="flex items-center space-x-4">
    <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
    <Crown className="h-6 w-6 text-purple-400" />
    </div>
    <div>
    <h3 className="font-bold text-lg text-purple-100 mb-1">
     Unlock Your Full Potential
    </h3>
    <p className="text-sm text-purple-300">
     You've reached your free message limit. Upgrade to a Pro plan for unlimited access.
    </p>
    </div>
   </div>
   <Button 
    onClick={onUpgrade} 
    className="bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
   >
    Upgrade Now
   </Button>
   </div>
  </div>
  </div>
 )
 }

 return null
}

const EnhancedChatInterface = () => {
 const { user, authLoading, logout, guestSessionId } = useAuth()
 const [messages, setMessages] = useState([
 {
  id: 'welcome',
  sender: 'ai',
  content: 'Welcome to the DalSi AI Experience! I am your personal AI assistant, ready to help with any questions you have about Healthcare, Education, or AI. How can I assist you today?',
  timestamp: new Date().toISOString()
 }
 ])
 const [inputMessage, setInputMessage] = useState('')
 const [isLoading, setIsLoading] = useState(false)
 const [currentChatId, setCurrentChatId] = useState(null)
 const [chats, setChats] = useState([])
 const [sidebarOpen, setSidebarOpen] = useState(true)
 const [selectedModel, setSelectedModel] = useState('dalsi-ai')
 const [availableModels, setAvailableModels] = useState([])
 const [userUsageCount, setUserUsageCount] = useState(0)
 const [userSubscription, setUserSubscription] = useState(null)
 const [planLimits, setPlanLimits] = useState(null)
 const [apiHealthy, setApiHealthy] = useState({ 'dalsi-ai': null, 'dalsi-aivi': null })
 const [selectedImage, setSelectedImage] = useState(null)
 const [imagePreview, setImagePreview] = useState(null)
 const [showArchives, setShowArchives] = useState(false)
 const [isStreaming, setIsStreaming] = useState(false)
 const [streamingMessage, setStreamingMessage] = useState('')
 const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
 const [isGuestLimitLoading, setIsGuestLimitLoading] = useState(true) // <--- NEW: Loading state
	 const [guestUserId, setGuestUserId] = useState(null)
 const [clientIp, setClientIp] = useState(null)
 const [guestMessageCount, setGuestMessageCount] = useState(getGuestMessageCount())
 const [frictionModalData, setFrictionModalData] = useState(null)
 const [isFrictionModalOpen, setIsFrictionModalOpen] = useState(false)
 const [errorMessage, setErrorMessage] = useState(null) // NEW: Track API errors

 const messagesEndRef = useRef(null)
 const fileInputRef = useRef(null)
 const abortControllerRef = useRef(null)

 useEffect(() => { const initializeChat = async () => {
      if (frictionResponse.should_show) {
        setFrictionModalData(frictionResponse.friction_data);
        setIsFrictionModalOpen(true);
        // Stop message sending process
        return;
      }
    }

 if ((!inputMessage.trim() && !selectedImage) || isLoading || isStreaming) return

 // Check message limit per chat (11 messages max)
 if (user && currentChatId && messages.length >= 11) {
  alert('This chat has reached the maximum of 11 messages. Please start a new chat to continue.')
  return
 }

 // Auto-create chat if none exists (for logged-in users)
 let activeChatId = currentChatId // Use current chat ID if it exists
 if (user && !currentChatId) {
  try {
  sender: 'user',
  content: inputMessage.trim() || '[Image uploaded]',
  timestamp: new Date().toISOString(),
  hasImage: !!selectedImage
 }

 setMessages(prev => [...prev, userMessage])
 const currentInput = inputMessage.trim()
 const currentImage = selectedImage
 setInputMessage('')
 removeImage()
 setIsLoading(true)
 setIsStreaming(false)

 // Save user message if authenticated
	     cost_usd: 0, // Placeholder: Cost calculation is complex and usually done server-side
	     subscription_tier: 'free', // Guest users are always free tier
	     ip_address: clientIp,
	     request_size_bytes: textEncoder.encode(enhancedMessage).length, // Use enhanced message size
	     response_size_bytes: textEncoder.encode(finalResponse).length, // Use final response size
	     user_agent: navigator.userAgent,
	     metadata: {
	      model: selectedModel,
	      messageLength: inputMessage.length,
	      responseLength: finalResponse.length,
	      sessionId: currentChatId,
	      guest_session_id: guestUserId // Ensure guest session ID is in metadata
	     }
	    })
	   }

  const aiResponse = {
   id: Date.now() + 1,
   sender: 'assistant',
	    content: finalResponse,
	    timestamp: new Date().toISOString(),
	    model: selectedModel,
	    sources: sources || [] // Ensure sources is always an array
	   }

   setMessages(prev => [...prev, aiResponse])
   setStreamingMessage('')
   setIsStreaming(false)
   setIsLoading(false)
   setIsWaitingForResponse(false)

   // Save AI response if authenticated
   if (user && activeChatId) {
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
	    // Note: Sources are saved within aiResponse object
	    // Note: Sources are saved within aiResponse object
	    // Note: Sources are saved within aiResponse object
   }

   // Update usage count
   if (selectedModel === 'dalsi-ai') {
    if (!user) {
    // Increment guest count in localStorage and state
    incrementGuestMessageCount()
    setGuestMessageCount(prev => prev + 1)
    } else if (!userSubscription || userSubscription.status !== 'active') {
    // Increment logged-in user count
    setUserUsageCount(prev => prev + 1)
    }
   }

   resolve()
   },
   // onError callback
   async (error) => {
    sender: 'ai',
    content: `I apologize, but I'm experiencing technical difficulties right now. ${error.message}\n\nPlease try again in a moment. If the problem persists, you can:\n\n1. Check your internet connection\n2. Refresh the page\n3. Contact our support team\n\nI'm here to help once the connection is restored!`,
    timestamp: new Date().toISOString()
   }

   setMessages(prev => [...prev, errorResponse])
   setStreamingMessage('')
   setIsStreaming(false)
   setIsLoading(false)
   setIsWaitingForResponse(false)
   reject(error)
   },
   selectedModel, // modelId
   3000, // maxLength - sufficient for context + complete responses
   abortControllerRef.current.signal // Pass abort signal
  )
  })

 } catch (error) {
      handleUpgrade();
    }}
  />
 </div>
 )
}

const FrictionModal = ({ isOpen, data, onDismiss, onUpgrade, userId }) => {
  if (!isOpen || !data) return null;
  
  // Track funnel step: friction_shown
  useEffect(() => {
    if (isOpen && data && userId) {
      trackFunnelStep(userId, 'friction_shown', { friction_type: data.friction_type, event_id: data.event_id });
    }
  }, [isOpen, data, userId]);

  const handleDismiss = () => {
    logFrictionAction(data.event_id, 'dismissed');
    trackFunnelStep(userId, 'friction_dismissed', { friction_type: data.friction_type, event_id: data.event_id });
    onDismiss();
  };

  const handleUpgrade = () => {
    logFrictionAction(data.event_id, 'upgraded');
    trackFunnelStep(userId, 'friction_accepted', { friction_type: data.friction_type, event_id: data.event_id });
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-card border-primary shadow-2xl relative overflow-hidden">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary mb-4">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{data.message_template.title}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-6">{data.message_template.message}</p>
          <div className="space-y-2 mb-6">
            {data.message_template.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={handleUpgrade} className="w-full bg-primary hover:bg-primary/90 text-white">{data.message_template.cta_text}</Button>
            <Button onClick={handleDismiss} variant="ghost" className="w-full text-muted-foreground">{data.message_template.dismiss_text}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedChatInterface

// Removed old UsageLimitWarning component definition

const UsageStatusDisplay = ({ usageStatus, onUpgrade, onLogin }) => {
  const isGuest = usageStatus.isGuest;
  const isSubscribed = usageStatus.limit === Infinity;
  const isFreeTier = !isGuest && !isSubscribed;

  let statusText = '';
  let statusColor = 'text-muted-foreground';
  let button = null;

  if (isSubscribed) {
    statusText = `Plan: ${usageStatus.subscriptionType || 'Premium'} (Unlimited)`;
    statusColor = 'text-green-500';
  } else if (isGuest) {
    const limitText = usageStatus.limit === 1 ? '1 free message' : `${usageStatus.limit} free messages`;
    const remainingText = usageStatus.remaining === 1 ? '1 message' : `${usageStatus.remaining} messages`;
    statusText = usageStatus.remaining > 0 
      ? `Guest: ${remainingText} remaining today (out of ${usageStatus.limit}).`
      : `Guest: Daily limit of ${usageStatus.limit} messages exhausted. Resets tomorrow.`;
    statusColor = usageStatus.remaining > 0 ? 'text-yellow-500' : 'text-red-500';
    button = (
      <Button variant="outline" size="sm" onClick={onLogin} className="h-7 text-xs px-2">
        Sign In
      </Button>
    );
  } else if (isFreeTier) {
    statusText = `Free Tier: ${usageStatus.remaining} of ${usageStatus.limit} messages remaining.`;
    statusColor = usageStatus.remaining > 0 ? 'text-yellow-500' : 'text-red-500';
    button = (
      <Button variant="outline" size="sm" onClick={onUpgrade} className="h-7 text-xs px-2 bg-primary hover:bg-primary/90 text-white">
        Upgrade
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50">
      <span className={`text-sm font-medium ${statusColor}`}>{statusText}</span>
      {button}
    </div>
  );
};
