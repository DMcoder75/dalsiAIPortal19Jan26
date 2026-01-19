import { Button } from './ui/button'
import { Input } from './ui/input'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import logo from '../assets/DalSiAILogo2.png'

export default function Footer() {
 return (
 <footer className="bg-card border-t border-border">
  {/* Main footer content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
   
   {/* Company Info */}
   <div className="lg:col-span-1">
   <div className="flex items-center mb-6">
    <img src={logo} alt="Dalsi AI" className="h-12 w-auto" />
    <div className="ml-3">
    <div className="text-lg font-bold text-foreground">Dalsi AI</div>
    <div className="text-sm text-primary font-medium">Artificial Intelligence Made Real</div>
    </div>
   </div>
   <p className="text-muted-foreground mb-6 leading-relaxed">
    Pioneering the future of artificial intelligence with cutting-edge solutions that transform 
    healthcare and education through advanced AI technologies.
   </p>
   
   {/* Social Media Icons */}
   <div className="flex space-x-4">
    <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground text-white">
    <Facebook className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground text-white">
    <Instagram className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground text-white">
    <Twitter className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground text-white">
    <Linkedin className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground text-white">
    <Youtube className="h-5 w-5" />
    </Button>
   </div>
   </div>

   {/* Solutions & Products */}
   <div className="lg:col-span-1">
   <h3 className="text-lg font-semibold text-foreground mb-6">Solutions & Products</h3>
   <ul className="space-y-3">
    <li><a href="/models/dalsi-ai" className="text-muted-foreground hover:text-primary transition-colors">DalSiAI - Text AI Engine</a></li>
    <li><a href="/models/dalsi-ai-vi" className="text-muted-foreground hover:text-primary transition-colors">DalSiAIVi - Multimodal AI</a></li>
    <li><a href="/models/dalsi-ai-vd" className="text-muted-foreground hover:text-primary transition-colors">DalSiAI VD - Video & Document</a></li>
    <li><a href="#healthcare" className="text-muted-foreground hover:text-primary transition-colors">Healthcare Solutions</a></li>
    <li><a href="#education" className="text-muted-foreground hover:text-primary transition-colors">Education & Training</a></li>
    <li><a href="#automation" className="text-muted-foreground hover:text-primary transition-colors">AI Automation</a></li>
    <li><a href="/experience" className="text-muted-foreground hover:text-primary transition-colors">Experience Dalsi</a></li>
    <li><a href="/api-docs" className="text-muted-foreground hover:text-primary transition-colors">API Integration</a></li>
    <li><a href="/#solutions" className="text-muted-foreground hover:text-primary transition-colors">Enterprise Solutions</a></li>
   </ul>
   </div>

   {/* Company & Support */}
   <div className="lg:col-span-1">
   <h3 className="text-lg font-semibold text-foreground mb-6">Company & Support</h3>
   <ul className="space-y-3">
    <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
    <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
    <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
    <li><a href="/news-updates" className="text-muted-foreground hover:text-primary transition-colors">News & Updates</a></li>
    <li><a href="/support-center" className="text-muted-foreground hover:text-primary transition-colors">Support Center</a></li>
    <li><a href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
    <li><a href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
    <li><a href="/partners" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
   </ul>
   </div>

   {/* Legal & Resources */}
   <div className="lg:col-span-1">
   <h3 className="text-lg font-semibold text-foreground mb-6">Legal & Resources</h3>
   <ul className="space-y-3 mb-6">
    <li><a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
    <li><a href="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
    <li><a href="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
    <li><a href="/security" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
    <li><a href="/compliance" className="text-muted-foreground hover:text-primary transition-colors">Compliance</a></li>
    <li><a href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</a></li>
   </ul>

   {/* Newsletter Signup */}
   <div>
    <h4 className="text-sm font-semibold text-foreground mb-3">Newsletter</h4>
    <div className="flex space-x-2">
    <Input 
     placeholder="Enter your email" 
     className="flex-1 bg-background border-border"
    />
    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
     Subscribe
    </Button>
    </div>
   </div>
   </div>
  </div>

  {/* Contact Information */}
  <div className="border-t border-border mt-12 pt-8">
   <div className="flex items-center space-x-3">
    <Mail className="h-5 w-5 text-primary" />
    <div>
    <div className="text-sm font-medium text-foreground">Email</div>
    <div className="text-sm text-muted-foreground">info@neodalsi.com</div>
    </div>
   </div>
  </div>
  </div>

  {/* Bottom footer */}
  <div className="border-t border-border bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
   <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
   <div className="text-sm text-muted-foreground">
    © 2025 Dalsi Music Studio. All rights reserved.
   </div>
   <div className="flex items-center space-x-6 text-sm text-muted-foreground">
    <span>Powered by Advanced AI Technology</span>
    <span>•</span>
    <span>Made with ❤️ for the Future</span>
   </div>
   </div>
  </div>
  </div>
 </footer>
 )
}
