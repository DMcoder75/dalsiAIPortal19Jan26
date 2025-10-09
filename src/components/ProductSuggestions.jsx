import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { X, Sparkles, ArrowRight } from 'lucide-react'

export default function ProductSuggestions({ currentPage, category }) {
  const [isOpen, setIsOpen] = useState(false)

  // Smart suggestions based on current page and category
  const getSmartSuggestions = () => {
    const suggestions = {
      'text': [
        { name: 'DalSi Writer Pro', link: '/products/writer-pro', desc: 'AI Writing Assistant' },
        { name: 'DalSi Code Genius', link: '/products/code-genius', desc: 'Programming Partner' },
        { name: 'DalSi Business Suite', link: '/products/business-suite', desc: 'Corporate Tools' }
      ],
      'vision': [
        { name: 'DalSi Vision Scan', link: '/products/vision-scan', desc: 'Document Intelligence' },
        { name: 'DalSi MedVision', link: '/products/medvision', desc: 'Medical Imaging' },
        { name: 'DalSi Art Studio', link: '/products/art-studio', desc: 'Image Generation' }
      ],
      'media': [
        { name: 'DalSi MovieMaker', link: '/products/moviemaker', desc: 'AI Film Production' },
        { name: 'DalSi Translate Global', link: '/products/translate-global', desc: 'Multimedia Translation' },
        { name: 'DalSi Music Studio', link: '/products/music-studio', desc: 'Music Production' }
      ]
    }

    return suggestions[category] || suggestions.text
  }

  const suggestions = getSmartSuggestions()

  return (
    <>
      {/* Floating Suggestions Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl bg-primary hover:bg-primary/90 hover:scale-110 transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 animate-pulse" />}
        </Button>
      </div>

      {/* Suggestions Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-40 animate-slide-up">
          <Card className="p-6 w-80 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Related Products</h3>
              <p className="text-sm text-muted-foreground">Explore more AI solutions</p>
            </div>
            
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    window.location.href = suggestion.link
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {suggestion.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {suggestion.desc}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = '/experience'}
              >
                Try AI Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

