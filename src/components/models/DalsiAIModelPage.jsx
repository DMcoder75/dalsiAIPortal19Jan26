import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  MessageSquare, 
  FileText, 
  Code, 
  Briefcase, 
  Search,
  Bot,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react'
import Navigation from '../Navigation'
import Footer from '../Footer'

export default function DalsiAIModelPage() {
  const products = [
    {
      icon: FileText,
      name: "DalSi Writer Pro",
      description: "AI-powered writing assistant for blogs, articles, and creative content",
      link: "/products/writer-pro",
      color: "primary"
    },
    {
      icon: Code,
      name: "DalSi Code Genius",
      description: "Intelligent programming partner for code generation and debugging",
      link: "/products/code-genius",
      color: "primary"
    },
    {
      icon: Briefcase,
      name: "DalSi Business Suite",
      description: "Corporate communication tools for emails, reports, and proposals",
      link: "/products/business-suite",
      color: "primary"
    },
    {
      icon: Search,
      name: "DalSi Researcher",
      description: "Academic and research assistant with citation management",
      link: "/products/researcher",
      color: "primary"
    },
    {
      icon: Bot,
      name: "DalSi Chatbot Builder",
      description: "Build and deploy custom AI chatbots for any business need",
      link: "/products/chatbot-builder",
      color: "primary"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-primary font-semibold">Dalsi AI - Text AI Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            The Most Advanced
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-2">
              Text AI Engine
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Power your business with state-of-the-art natural language AI. From content creation to code generation, 
            Dalsi AI delivers unmatched accuracy and speed.
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">&lt;500ms response time</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Enterprise Secure</h3>
                <p className="text-sm text-muted-foreground">HIPAA & SOC 2 compliant</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24/7 Available</h3>
                <p className="text-sm text-muted-foreground">99.99% uptime SLA</p>
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
              5 Powerful Text AI Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect solution for your text AI needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 hover:scale-105 cursor-pointer"
                  onClick={() => window.location.href = product.link}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {product.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" className="text-primary">
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Text AI Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start with any of our products today and experience the power of Dalsi AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => window.location.href = '/experience'}>
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

