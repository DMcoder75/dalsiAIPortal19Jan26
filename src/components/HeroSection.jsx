import { Button } from './ui/button'
import { ArrowRight, Brain, Zap, Shield } from 'lucide-react'

export default function HeroSection() {
 return (
 <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14 sm:pt-16">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10"></div>
  
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse text-white"></div>
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-destructive/5 rounded-full blur-2xl animate-bounce delay-500"></div>
  
  {/* Floating particles */}
  <div className="absolute top-20 left-20 w-4 h-4 bg-primary/30 rounded-full animate-ping delay-300 text-white"></div>
  <div className="absolute top-40 right-32 w-3 h-3 bg-accent/40 rounded-full animate-ping delay-700"></div>
  <div className="absolute bottom-32 left-16 w-2 h-2 bg-primary/50 rounded-full animate-ping delay-1000 text-white"></div>
  <div className="absolute bottom-20 right-20 w-5 h-5 bg-accent/20 rounded-full animate-ping delay-200"></div>
  
  {/* Moving gradient orbs */}
  <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-spin-slow"></div>
  <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-l from-accent/30 to-primary/30 rounded-full blur-lg animate-reverse-spin"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  <div className="space-y-6 sm:space-y-8">
   {/* Company tagline */}
   <div className="text-sm sm:text-lg md:text-xl font-semibold text-primary/80 tracking-wider uppercase mb-4 animate-fade-in-up">
   <span className="inline-block animate-pulse">✨</span>
   <span className="mx-1 sm:mx-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
    Artificial Intelligence Made Real
   </span>
   <span className="inline-block animate-pulse delay-500">✨</span>
   </div>

   {/* Main heading */}
   <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in-up delay-200">
   <span className="inline-block hover:scale-105 transition-transform duration-300">Revolutionizing</span>
   <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x bg-300% hover:animate-pulse">
    AI Solutions
   </span>
   <span className="inline-block hover:scale-105 transition-transform duration-300">for Tomorrow</span>
   </h1>

   {/* Subheading */}
   <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
   Dalsi AI & Automations pioneers cutting-edge artificial intelligence solutions that transform 
   healthcare delivery and educational experiences through advanced text and multimodal AI technologies.
   </p>

   {/* Feature highlights */}
   <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 sm:mt-12 animate-fade-in-up delay-500 px-2">
   <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-pointer group text-white">
    <Brain className="h-4 sm:h-5 w-4 sm:w-5 text-primary group-hover:animate-spin" />
    <span className="text-xs sm:text-sm font-medium">Advanced AI Models</span>
   </div>
   <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
    <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-accent group-hover:animate-bounce" />
    <span className="text-xs sm:text-sm font-medium">Real-time Processing</span>
   </div>
   <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-border hover:border-destructive/50 hover:bg-destructive/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
    <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-destructive group-hover:animate-pulse" />
    <span className="text-xs sm:text-sm font-medium">Enterprise Security</span>
   </div>
   </div>

   {/* CTA buttons */}
   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12 animate-fade-in-up delay-700 px-4">
   <Button 
    size="lg" 
    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group w-full sm:w-auto text-white"
    onClick={() => window.location.href = '/experience'}
   >
    <span className="group-hover:animate-pulse">Experience Dalsi AI</span>
    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
   </Button>
   <Button 
    size="lg" 
    variant="outline" 
    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 w-full sm:w-auto text-white"
    onClick={() => document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' })}
   >
    Explore Solutions
   </Button>
   </div>

   {/* Stats */}
   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-16 border-t border-border animate-fade-in-up delay-1000 px-4">
   <div className="text-center group cursor-pointer">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse">99.9%</div>
    <div className="text-xs sm:text-sm text-muted-foreground mt-1 group-hover:text-primary transition-colors">Accuracy Rate</div>
   </div>
   <div className="text-center group cursor-pointer">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse">24/7</div>
    <div className="text-xs sm:text-sm text-muted-foreground mt-1 group-hover:text-accent transition-colors">AI Availability</div>
   </div>
   <div className="text-center group cursor-pointer">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">1000+</div>
    <div className="text-xs sm:text-sm text-muted-foreground mt-1 group-hover:text-primary transition-colors">Healthcare Providers</div>
   </div>
   <div className="text-center group cursor-pointer">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">500+</div>
    <div className="text-xs sm:text-sm text-muted-foreground mt-1 group-hover:text-accent transition-colors">Educational Institutions</div>
   </div>
   </div>
  </div>
  </div>
 </section>
 )
}
