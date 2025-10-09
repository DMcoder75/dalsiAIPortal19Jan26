import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  Eye, 
  ScanLine, 
  Stethoscope, 
  Palette, 
  Search,
  Shield,
  ArrowRight,
  Zap,
  Lock,
  Sparkles
} from 'lucide-react'
import Navigation from '../Navigation'
import Footer from '../Footer'

export default function DalsiAIViModelPage() {
  const products = [
    {
      icon: ScanLine,
      name: "DalSi Vision Scan",
      description: "Intelligent document scanning with OCR and data extraction",
      link: "/products/vision-scan",
      color: "accent"
    },
    {
      icon: Stethoscope,
      name: "DalSi MedVision",
      description: "Medical image analysis for X-rays, MRIs, and diagnostics",
      link: "/products/medvision",
      color: "accent"
    },
    {
      icon: Palette,
      name: "DalSi Art Studio",
      description: "AI-powered image generation and creative visual design",
      link: "/products/art-studio",
      color: "accent"
    },
    {
      icon: Search,
      name: "DalSi Inspector",
      description: "Visual quality control and defect detection for manufacturing",
      link: "/products/inspector",
      color: "accent"
    },
    {
      icon: Shield,
      name: "DalSi Brand Guard",
      description: "Logo detection and brand monitoring across digital platforms",
      link: "/products/brand-guard",
      color: "accent"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Eye className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-accent font-semibold">Dalsi AI Vi - Vision AI Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            See Beyond Human Vision
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mt-2">
              Advanced Visual Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform images into insights. From medical diagnostics to creative design, 
            Dalsi AI Vi brings superhuman visual understanding to your fingertips.
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Advanced Vision</h3>
                <p className="text-sm text-muted-foreground">99.9% accuracy in image analysis</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Lock className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">On-premise deployment available</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">Instant image understanding</p>
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
              5 Revolutionary Vision AI Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlock the power of visual intelligence for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-accent/20 hover:border-accent/40 hover:scale-105 cursor-pointer"
                  onClick={() => window.location.href = product.link}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {product.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" className="text-accent">
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
              Trusted Across Industries
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
              <p className="text-muted-foreground">Medical imaging analysis and diagnostic assistance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manufacturing</h3>
              <p className="text-muted-foreground">Quality control and defect detection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Protection</h3>
              <p className="text-muted-foreground">Logo detection and trademark monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Experience the Future of Visual AI
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start analyzing images with superhuman accuracy today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => window.location.href = '/experience'}>
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

