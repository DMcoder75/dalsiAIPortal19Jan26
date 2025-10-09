import { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'

export default function ExperienceNav() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const navigate = (path) => {
    window.location.href = path
  }

  return (
    <nav className="flex items-center space-x-1">
      {/* Models Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2"
          onClick={() => toggleDropdown('models')}
        >
          Models
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
        {openDropdown === 'models' && (
          <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50">
            <button
              onClick={() => navigate('/models/dalsi-ai')}
              className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm"
            >
              <div className="font-semibold text-primary">Dalsi AI</div>
              <div className="text-xs text-muted-foreground">Text AI Engine</div>
            </button>
            <button
              onClick={() => navigate('/models/dalsi-ai-vi')}
              className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm"
            >
              <div className="font-semibold text-accent">Dalsi AI Vi</div>
              <div className="text-xs text-muted-foreground">Vision AI Engine</div>
            </button>
            <button
              onClick={() => navigate('/models/dalsi-ai-vd')}
              className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm"
            >
              <div className="font-semibold text-purple">Dalsi AI Vd</div>
              <div className="text-xs text-muted-foreground">Video & Media AI</div>
            </button>
          </div>
        )}
      </div>

      {/* Products Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs px-2"
          onClick={() => toggleDropdown('products')}
        >
          Products
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
        {openDropdown === 'products' && (
          <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[250px] z-50 max-h-[400px] overflow-y-auto">
            {/* Dalsi AI Products */}
            <div className="px-3 py-1 text-xs font-semibold text-primary">Text AI Products</div>
            <button onClick={() => navigate('/products/writer-pro')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm">
              DalSi Writer Pro
            </button>
            <button onClick={() => navigate('/products/code-genius')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm">
              DalSi Code Genius
            </button>
            <button onClick={() => navigate('/products/business-suite')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm">
              DalSi Business Suite
            </button>
            <button onClick={() => navigate('/products/researcher')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm">
              DalSi Researcher
            </button>
            <button onClick={() => navigate('/products/chatbot-builder')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm">
              DalSi Chatbot Builder
            </button>

            <div className="border-t border-border my-2"></div>

            {/* Dalsi AI Vi Products */}
            <div className="px-3 py-1 text-xs font-semibold text-accent">Vision AI Products</div>
            <button onClick={() => navigate('/products/vision-scan')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm">
              DalSi Vision Scan
            </button>
            <button onClick={() => navigate('/products/medvision')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm">
              DalSi MedVision
            </button>
            <button onClick={() => navigate('/products/art-studio')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm">
              DalSi Art Studio
            </button>
            <button onClick={() => navigate('/products/inspector')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm">
              DalSi Inspector
            </button>
            <button onClick={() => navigate('/products/brand-guard')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm">
              DalSi Brand Guard
            </button>

            <div className="border-t border-border my-2"></div>

            {/* Dalsi AI Vd Products */}
            <div className="px-3 py-1 text-xs font-semibold text-purple">Media AI Products</div>
            <button onClick={() => navigate('/products/moviemaker')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm">
              DalSi MovieMaker
            </button>
            <button onClick={() => navigate('/products/translate-global')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm">
              DalSi Translate Global
            </button>
            <button onClick={() => navigate('/products/music-studio')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm">
              DalSi Music Studio
            </button>
            <button onClick={() => navigate('/products/video-ads')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm">
              DalSi VideoAds
            </button>
            <button onClick={() => navigate('/products/learning-platform')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm">
              DalSi Learning Platform
            </button>
          </div>
        )}
      </div>

      {/* Other Menu Items */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/#healthcare')} className="text-xs px-2">
        Healthcare
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/#education')} className="text-xs px-2">
        Education
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/#pricing')} className="text-xs px-2">
        Pricing
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/contact')} className="text-xs px-2">
        Help & Support
      </Button>
    </nav>
  )
}

