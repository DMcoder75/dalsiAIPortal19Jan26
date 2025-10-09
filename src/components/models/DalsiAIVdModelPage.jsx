import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  Video, 
  Film, 
  Languages, 
  Music, 
  TrendingUp,
  GraduationCap,
  ArrowRight,
  Zap,
  Globe,
  Headphones
} from 'lucide-react'
import Navigation from '../Navigation'
import Footer from '../Footer'

export default function DalsiAIVdModelPage() {
  const products = [
    {
      icon: Film,
      name: "DalSi MovieMaker",
      description: "Create full-length movies from text with AI-powered video production",
      link: "/products/moviemaker",
      color: "purple"
    },
    {
      icon: Languages,
      name: "DalSi Translate Global",
      description: "Translate content across 100+ languages with voice-over and subtitles",
      link: "/products/translate-global",
      color: "purple"
    },
    {
      icon: Music,
      name: "DalSi Music Studio",
      description: "Generate original music, soundtracks, and audio effects with AI",
      link: "/products/music-studio",
      color: "purple"
    },
    {
      icon: TrendingUp,
      name: "DalSi VideoAds",
      description: "Create engaging marketing videos and social media ads automatically",
      link: "/products/video-ads",
      color: "purple"
    },
    {
      icon: GraduationCap,
      name: "DalSi Learning Platform",
      description: "Build educational videos, courses, and training content at scale",
      link: "/products/learning-platform",
      color: "purple"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple/10 px-4 py-2 rounded-full mb-6">
            <Video className="h-5 w-5 text-purple animate-pulse" />
            <span className="text-purple font-semibold">Dalsi AI Vd - Video & Media AI Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Create Anything You Can Imagine
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple to-accent mt-2">
              Video, Audio & Translation AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From Hollywood-quality movies to global translations and original music. 
            Dalsi AI Vd is the complete multimedia AI production suite.
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
            <Card className="border-purple/20">
              <CardContent className="pt-6 text-center">
                <Film className="h-8 w-8 text-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Full Production</h3>
                <p className="text-sm text-muted-foreground">Complete video creation</p>
              </CardContent>
            </Card>
            <Card className="border-purple/20">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 text-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100+ Languages</h3>
                <p className="text-sm text-muted-foreground">Global reach instantly</p>
              </CardContent>
            </Card>
            <Card className="border-purple/20">
              <CardContent className="pt-6 text-center">
                <Headphones className="h-8 w-8 text-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Audio Studio</h3>
                <p className="text-sm text-muted-foreground">Professional music & sound</p>
              </CardContent>
            </Card>
            <Card className="border-purple/20">
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 text-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Enterprise Ready</h3>
                <p className="text-sm text-muted-foreground">Scalable infrastructure</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              5 Game-Changing Media AI Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for multimedia content creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-purple/20 hover:border-purple/40 hover:scale-105 cursor-pointer"
                  onClick={() => window.location.href = product.link}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple/30 transition-colors">
                      <Icon className="h-6 w-6 text-purple" />
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {product.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" className="text-purple">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powering Creative Industries Worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8 text-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Film & TV</h3>
              <p className="text-muted-foreground">Production studios and content creators</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Business</h3>
              <p className="text-muted-foreground">International communication and localization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Music Industry</h3>
              <p className="text-muted-foreground">Artists and audio production</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">E-learning and training content</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Start Creating Professional Media Content Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators using Dalsi AI Vd for their multimedia needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple hover:bg-purple/90" onClick={() => window.location.href = '/experience'}>
              Try Now Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/#pricing'}>
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

