import { useState } from 'react'
import { Button } from './ui/button'
import { 
 Menu, 
 X, 
 Home, 
 Brain, 
 Stethoscope, 
 GraduationCap, 
 MessageSquare, 
 User, 
 Phone, 
 Settings,
 ChevronRight,
 Zap,
 Shield,
 FileText,
 Mail
} from 'lucide-react'

export default function QuickMenu() {
 const [isOpen, setIsOpen] = useState(false)

 const menuItems = [
 { icon: Home, label: 'Home', href: '/', color: 'text-primary', special: true },
 { icon: Brain, label: 'AI Solutions', href: '#solutions', color: 'text-accent' },
 { icon: Stethoscope, label: 'Healthcare', href: '#healthcare', color: 'text-destructive' },
 { icon: GraduationCap, label: 'Education', href: '#education', color: 'text-chart-4' },
 { icon: MessageSquare, label: 'Experience Dalsi', href: '/experience', color: 'text-primary', special: true },
 { icon: User, label: 'About Us', href: '/about', color: 'text-muted-foreground' },
 { icon: Phone, label: 'Contact', href: '/contact', color: 'text-muted-foreground' },
 { icon: FileText, label: 'Documentation', href: '/docs', color: 'text-muted-foreground' },
 { icon: Mail, label: 'Newsletter', href: '/newsletter', color: 'text-muted-foreground' },
 { icon: Settings, label: 'Settings', href: '/settings', color: 'text-muted-foreground' }
 ]

 const handleItemClick = (href, special = false) => {
 if (special || href.startsWith('/')) {
  window.location.href = href
 } else {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
 }
 setIsOpen(false)
 }

 return (
 <>
  {/* Menu Toggle Button */}
  <div className="fixed top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-50">
  <Button
   variant="outline"
   size="icon"
   onClick={() => setIsOpen(!isOpen)}
   className={`
   bg-card/80 backdrop-blur-md border-primary/30 hover:border-primary/60 
   hover:bg-primary/10 transition-all duration-300 shadow-lg h-10 w-10 sm:h-12 sm:w-12
   ${isOpen ? 'translate-x-60 sm:translate-x-64' : 'hover:scale-110'}
   `}
  >
   {isOpen ? (
   <X className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
   ) : (
   <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
   )}
  </Button>
  </div>

  {/* Overlay */}
  {isOpen && (
  <div 
   className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-opacity duration-300"
   onClick={() => setIsOpen(false)}
  />
  )}

  {/* Side Menu */}
  <div className={`
  fixed top-0 left-0 h-full w-60 sm:w-64 bg-card/95 backdrop-blur-md border-r border-border 
  transform transition-transform duration-300 ease-in-out z-50 shadow-2xl
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `}>
  {/* Menu Header */}
  <div className="p-4 sm:p-6 border-b border-border">
   <div className="flex items-center space-x-2 sm:space-x-3">
   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
    <Brain className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-pulse" />
   </div>
   <div>
    <h3 className="font-bold text-foreground text-sm sm:text-base">Quick Menu</h3>
    <p className="text-xs text-muted-foreground">Navigate with ease</p>
   </div>
   </div>
  </div>

  {/* Menu Items */}
  <div className="p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto h-full pb-20">
   {menuItems.map((item, index) => (
   <button
    key={index}
    onClick={() => handleItemClick(item.href, item.special)}
    className={`
    w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-200
    hover:bg-primary/10 hover:scale-105 hover:shadow-md group
    ${item.special ? 'bg-primary/5 border border-primary/20' : ''}
    `}
   >
    <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color} group-hover:animate-bounce`} />
    <span className={`
    flex-1 text-left font-medium transition-colors text-sm sm:text-base
    ${item.special ? 'text-primary' : 'text-foreground group-hover:text-primary'}
    `}>
    {item.label}
    </span>
    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
   </button>
   ))}

   {/* Quick Actions */}
   <div className="mt-6 pt-4 border-t border-border">
   <h4 className="text-sm font-semibold text-muted-foreground mb-3 px-3">Quick Actions</h4>
   
   <div className="space-y-2">
    <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-200 group text-white">
    <Zap className="h-4 w-4 text-primary group-hover:animate-spin" />
    <span className="text-sm font-medium text-primary">Start AI Chat</span>
    </button>
    
    <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-200 group">
    <Shield className="h-4 w-4 text-accent group-hover:animate-pulse" />
    <span className="text-sm font-medium text-accent">Security Center</span>
    </button>
   </div>
   </div>

   {/* Status Indicator */}
   <div className="mt-6 p-3 bg-muted/30 rounded-lg">
   <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    <span className="text-xs text-muted-foreground">All systems operational</span>
   </div>
   <div className="flex items-center space-x-2 mt-1">
    <div className="w-2 h-2 bg-primary rounded-full animate-ping text-white"></div>
    <span className="text-xs text-muted-foreground">AI models active</span>
   </div>
   </div>
  </div>
  </div>
 </>
 )
}
