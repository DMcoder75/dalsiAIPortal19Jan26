import { 
  FileText, Code, Briefcase, Search, Bot,
  ScanLine, Stethoscope, Palette, Eye, Shield,
  Film, Languages, Music, TrendingUp, GraduationCap,
  Sparkles, Zap, Globe, CheckCircle, BookOpen,
  Newspaper, FileEdit, Lock, Headphones, Video
} from 'lucide-react'

// ============================================
// DALSI AI (TEXT) PRODUCTS
// ============================================

export const writerProData = {
  slug: 'writer-pro',
  name: 'DalSi Writer Pro',
  category: 'text',
  modelType: 'dalsi-ai',
  icon: FileText,
  colorClass: 'text-primary',
  gradientClass: 'bg-gradient-to-r from-primary to-accent',
  headline: 'Your AI Writing',
  subheadline: 'Assistant',
  description: 'Create professional content 10x faster. From blog posts to books, DalSi Writer Pro helps you write better, faster, and smarter.',
  ctaPrimary: 'Start Writing Free',
  ctaSecondary: 'Watch Demo',
  ctaTitle: 'Ready to Transform Your Writing?',
  ctaDescription: 'Join thousands of writers who create better content with DalSi Writer Pro',
  ctaFinal: 'Get Started Free',
  aiIndicator: 'AI is writing...',
  featuresTitle: 'Everything You Need to Write Better',
  featuresSubtitle: 'Powerful features designed for professional writers',
  useCasesTitle: 'Perfect For Every Writer',
  basePrice: 29.99,
  stats: [
    { value: '10x', label: 'Faster Writing' },
    { value: '50+', label: 'Content Types' },
    { value: '99%', label: 'Accuracy' }
  ],
  mockupLines: ['100%', '85%', '65%', '100%', '45%'],
  features: [
    { icon: Sparkles, title: 'AI-Powered Writing', description: 'Generate high-quality content in seconds with advanced language models' },
    { icon: BookOpen, title: 'Multiple Formats', description: 'Blogs, articles, stories, scripts, and more - all in one platform' },
    { icon: Globe, title: 'SEO Optimization', description: 'Built-in SEO tools to rank higher on search engines' },
    { icon: FileEdit, title: 'Smart Editing', description: 'AI-powered grammar checking and style suggestions' },
    { icon: TrendingUp, title: 'Content Analytics', description: 'Track performance and optimize your writing strategy' },
    { icon: Zap, title: 'Lightning Fast', description: 'Generate 1000+ words in under 30 seconds' }
  ],
  useCases: [
    { icon: Newspaper, title: 'Content Creators', description: 'Create engaging blog posts, articles, and social media content at scale' },
    { icon: TrendingUp, title: 'Marketing Teams', description: 'Generate compelling copy for campaigns, emails, and landing pages' },
    { icon: BookOpen, title: 'Authors & Writers', description: 'Overcome writer\'s block and accelerate your creative writing process' }
  ],
  benefits: [
    { title: '10x Faster Content Creation', description: 'Generate high-quality content in minutes, not hours' },
    { title: 'SEO-Optimized by Default', description: 'Every piece of content is optimized for search engines automatically' },
    { title: 'Multiple Content Types', description: 'From blog posts to product descriptions, create any type of content' },
    { title: 'Plagiarism-Free Guarantee', description: 'All content is 100% original and unique' }
  ]
}

export const codeGeniusData = {
  slug: 'code-genius',
  name: 'DalSi Code Genius',
  category: 'text',
  modelType: 'dalsi-ai',
  icon: Code,
  colorClass: 'text-primary',
  gradientClass: 'bg-gradient-to-r from-primary to-accent',
  headline: 'Your AI Programming',
  subheadline: 'Partner',
  description: 'Write code faster with AI assistance. From debugging to documentation, Code Genius is your intelligent coding companion.',
  ctaPrimary: 'Start Coding Free',
  ctaSecondary: 'See Examples',
  ctaTitle: 'Ready to Code Smarter?',
  ctaDescription: 'Join developers who ship code 5x faster with Code Genius',
  ctaFinal: 'Try Code Genius Free',
  aiIndicator: 'Generating code...',
  featuresTitle: 'Everything Developers Need',
  featuresSubtitle: 'Powerful AI tools for modern development',
  useCasesTitle: 'Built For Developers',
  basePrice: 39.99,
  stats: [
    { value: '50+', label: 'Languages' },
    { value: '5x', label: 'Faster Coding' },
    { value: '99.9%', label: 'Accuracy' }
  ],
  mockupLines: ['100%', '90%', '75%', '100%', '60%'],
  features: [
    { icon: Code, title: 'Code Generation', description: 'Generate functions, classes, and entire modules from descriptions' },
    { icon: Search, title: 'Intelligent Debugging', description: 'AI-powered bug detection and fix suggestions' },
    { icon: FileText, title: 'Auto Documentation', description: 'Generate comprehensive documentation automatically' },
    { icon: Zap, title: 'Code Completion', description: 'Smart autocomplete that understands context' },
    { icon: Shield, title: 'Security Analysis', description: 'Detect vulnerabilities and security issues' },
    { icon: TrendingUp, title: 'Code Optimization', description: 'Improve performance and efficiency automatically' }
  ],
  useCases: [
    { icon: Code, title: 'Full-Stack Developers', description: 'Build complete applications faster with AI assistance' },
    { icon: Shield, title: 'DevOps Engineers', description: 'Automate infrastructure code and deployment scripts' },
    { icon: Search, title: 'Code Reviewers', description: 'Identify issues and improve code quality instantly' }
  ],
  benefits: [
    { title: 'Support for 50+ Languages', description: 'From Python to Rust, we support all major programming languages' },
    { title: 'Context-Aware Suggestions', description: 'AI understands your entire codebase for better suggestions' },
    { title: 'Real-time Error Detection', description: 'Catch bugs before they make it to production' },
    { title: 'Automated Testing', description: 'Generate unit tests and integration tests automatically' }
  ]
}

export const businessSuiteData = {
  slug: 'business-suite',
  name: 'DalSi Business Suite',
  category: 'text',
  modelType: 'dalsi-ai',
  icon: Briefcase,
  colorClass: 'text-primary',
  gradientClass: 'bg-gradient-to-r from-primary to-accent',
  headline: 'Corporate Communication',
  subheadline: 'Reimagined',
  description: 'Professional business communication powered by AI. Create emails, reports, proposals, and presentations in minutes.',
  ctaPrimary: 'Start Free Trial',
  ctaSecondary: 'View Demo',
  ctaTitle: 'Transform Your Business Communication',
  ctaDescription: 'Join enterprises using Business Suite for professional communication',
  ctaFinal: 'Get Started Today',
  aiIndicator: 'Crafting business content...',
  featuresTitle: 'Professional Tools for Business',
  featuresSubtitle: 'Everything your team needs to communicate effectively',
  useCasesTitle: 'Perfect For Every Business',
  basePrice: 49.99,
  stats: [
    { value: '80%', label: 'Time Saved' },
    { value: '500+', label: 'Templates' },
    { value: '24/7', label: 'Support' }
  ],
  mockupLines: ['100%', '95%', '80%', '100%', '70%'],
  features: [
    { icon: Briefcase, title: 'Business Templates', description: '500+ professional templates for every business need' },
    { icon: FileText, title: 'Report Generation', description: 'Create comprehensive business reports automatically' },
    { icon: Globe, title: 'Multi-language Support', description: 'Communicate in 100+ languages seamlessly' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption and compliance' },
    { icon: TrendingUp, title: 'Analytics Dashboard', description: 'Track communication effectiveness and engagement' },
    { icon: Zap, title: 'Team Collaboration', description: 'Real-time collaboration with your entire team' }
  ],
  useCases: [
    { icon: Briefcase, title: 'Corporate Teams', description: 'Streamline internal and external communication' },
    { icon: TrendingUp, title: 'Sales Teams', description: 'Create compelling proposals and presentations' },
    { icon: Shield, title: 'Legal Departments', description: 'Draft contracts and legal documents with AI assistance' }
  ],
  benefits: [
    { title: 'Professional Templates', description: 'Access 500+ templates for emails, reports, and proposals' },
    { title: 'Brand Consistency', description: 'Maintain your brand voice across all communications' },
    { title: 'Compliance Ready', description: 'GDPR, HIPAA, and SOC 2 compliant' },
    { title: 'Integration Ready', description: 'Works with Slack, Teams, Gmail, and more' }
  ]
}

export const researcherData = {
  slug: 'researcher',
  name: 'DalSi Researcher',
  category: 'text',
  modelType: 'dalsi-ai',
  icon: Search,
  colorClass: 'text-primary',
  gradientClass: 'bg-gradient-to-r from-primary to-accent',
  headline: 'Academic & Research',
  subheadline: 'Assistant',
  description: 'Accelerate your research with AI. From literature review to citation management, Researcher is your academic companion.',
  ctaPrimary: 'Start Research Free',
  ctaSecondary: 'Learn More',
  ctaTitle: 'Accelerate Your Research',
  ctaDescription: 'Join researchers and academics using DalSi Researcher',
  ctaFinal: 'Begin Your Research',
  aiIndicator: 'Analyzing research...',
  featuresTitle: 'Advanced Research Tools',
  featuresSubtitle: 'Everything you need for academic excellence',
  useCasesTitle: 'Built For Researchers',
  basePrice: 34.99,
  stats: [
    { value: '10M+', label: 'Papers Indexed' },
    { value: '3x', label: 'Faster Research' },
    { value: '100%', label: 'Accurate Citations' }
  ],
  mockupLines: ['100%', '88%', '72%', '100%', '55%'],
  features: [
    { icon: Search, title: 'Smart Literature Review', description: 'Find relevant papers and research instantly' },
    { icon: FileText, title: 'Auto Citations', description: 'Generate citations in any format automatically' },
    { icon: BookOpen, title: 'Research Synthesis', description: 'Summarize and synthesize multiple papers' },
    { icon: TrendingUp, title: 'Trend Analysis', description: 'Identify emerging trends in your field' },
    { icon: Shield, title: 'Plagiarism Check', description: 'Ensure originality with advanced detection' },
    { icon: Globe, title: 'Multi-language', description: 'Access research in 50+ languages' }
  ],
  useCases: [
    { icon: GraduationCap, title: 'PhD Students', description: 'Accelerate your dissertation research and writing' },
    { icon: Search, title: 'Research Scientists', description: 'Stay updated with latest research in your field' },
    { icon: BookOpen, title: 'Academic Writers', description: 'Write and publish papers faster' }
  ],
  benefits: [
    { title: 'Access 10M+ Papers', description: 'Search across major academic databases instantly' },
    { title: 'Auto-Generate Citations', description: 'APA, MLA, Chicago, and 20+ citation styles' },
    { title: 'Research Collaboration', description: 'Share and collaborate with your research team' },
    { title: 'Export to LaTeX', description: 'Seamless integration with academic writing tools' }
  ]
}

export const chatbotBuilderData = {
  slug: 'chatbot-builder',
  name: 'DalSi Chatbot Builder',
  category: 'text',
  modelType: 'dalsi-ai',
  icon: Bot,
  colorClass: 'text-primary',
  gradientClass: 'bg-gradient-to-r from-primary to-accent',
  headline: 'Build Custom AI',
  subheadline: 'Chatbots',
  description: 'Create intelligent chatbots for your business in minutes. No coding required, just drag, drop, and deploy.',
  ctaPrimary: 'Build Chatbot Free',
  ctaSecondary: 'See Examples',
  ctaTitle: 'Ready to Build Your Chatbot?',
  ctaDescription: 'Join businesses automating customer service with AI chatbots',
  ctaFinal: 'Start Building Now',
  aiIndicator: 'Training chatbot...',
  featuresTitle: 'Powerful Chatbot Platform',
  featuresSubtitle: 'Everything you need to build intelligent chatbots',
  useCasesTitle: 'Perfect For Every Business',
  basePrice: 44.99,
  stats: [
    { value: '10min', label: 'Setup Time' },
    { value: '24/7', label: 'Availability' },
    { value: '95%', label: 'Satisfaction' }
  ],
  mockupLines: ['100%', '92%', '78%', '100%', '65%'],
  features: [
    { icon: Bot, title: 'Drag & Drop Builder', description: 'Create chatbots visually without any coding' },
    { icon: Sparkles, title: 'Natural Language', description: 'Understand and respond naturally to users' },
    { icon: Globe, title: 'Multi-channel Deploy', description: 'Deploy to website, WhatsApp, Facebook, and more' },
    { icon: TrendingUp, title: 'Analytics Dashboard', description: 'Track conversations and improve performance' },
    { icon: Zap, title: 'Instant Responses', description: 'Answer customer queries in milliseconds' },
    { icon: Shield, title: 'Secure & Compliant', description: 'Enterprise-grade security and data protection' }
  ],
  useCases: [
    { icon: Briefcase, title: 'E-commerce', description: 'Automate customer support and boost sales' },
    { icon: Stethoscope, title: 'Healthcare', description: 'Patient scheduling and information assistance' },
    { icon: GraduationCap, title: 'Education', description: 'Student support and course information' }
  ],
  benefits: [
    { title: 'No Coding Required', description: 'Build sophisticated chatbots with visual interface' },
    { title: 'Multi-language Support', description: 'Communicate with customers in 100+ languages' },
    { title: 'Easy Integration', description: 'Connect with CRM, helpdesk, and other tools' },
    { title: 'Unlimited Conversations', description: 'No limits on chatbot interactions' }
  ]
}

// ============================================
// DALSI AI VI (VISION) PRODUCTS
// ============================================

export const visionScanData = {
  slug: 'vision-scan',
  name: 'DalSi Vision Scan',
  category: 'vision',
  modelType: 'dalsi-ai-vi',
  icon: ScanLine,
  colorClass: 'text-accent',
  gradientClass: 'bg-gradient-to-r from-accent to-primary',
  headline: 'Document Intelligence',
  subheadline: 'Powered by AI',
  description: 'Transform documents into structured data instantly. OCR, data extraction, and intelligent document processing.',
  ctaPrimary: 'Try Vision Scan Free',
  ctaSecondary: 'Watch Demo',
  ctaTitle: 'Ready to Digitize Your Documents?',
  ctaDescription: 'Join businesses processing millions of documents with Vision Scan',
  ctaFinal: 'Start Scanning Now',
  aiIndicator: 'Scanning document...',
  featuresTitle: 'Advanced Document Processing',
  featuresSubtitle: 'Everything you need for intelligent document management',
  useCasesTitle: 'Perfect For Every Industry',
  basePrice: 39.99,
  stats: [
    { value: '99.9%', label: 'Accuracy' },
    { value: '<1s', label: 'Processing Time' },
    { value: '100+', label: 'Languages' }
  ],
  mockupLines: ['100%', '87%', '70%', '100%', '50%'],
  features: [
    { icon: ScanLine, title: 'Advanced OCR', description: '99.9% accuracy in text extraction from any document' },
    { icon: FileText, title: 'Data Extraction', description: 'Automatically extract key information and data points' },
    { icon: Globe, title: '100+ Languages', description: 'Process documents in any language' },
    { icon: Shield, title: 'Secure Processing', description: 'Bank-level encryption for sensitive documents' },
    { icon: Zap, title: 'Batch Processing', description: 'Process thousands of documents simultaneously' },
    { icon: TrendingUp, title: 'Smart Classification', description: 'Automatically categorize and organize documents' }
  ],
  useCases: [
    { icon: Briefcase, title: 'Financial Services', description: 'Process invoices, receipts, and financial documents' },
    { icon: Shield, title: 'Legal Firms', description: 'Digitize and search through legal documents' },
    { icon: Stethoscope, title: 'Healthcare', description: 'Process medical records and insurance forms' }
  ],
  benefits: [
    { title: '99.9% OCR Accuracy', description: 'Industry-leading accuracy in text extraction' },
    { title: 'Intelligent Data Extraction', description: 'Extract tables, forms, and structured data automatically' },
    { title: 'Multi-format Support', description: 'PDF, images, scanned documents, and more' },
    { title: 'API Integration', description: 'Easy integration with your existing systems' }
  ]
}

export const medVisionData = {
  slug: 'medvision',
  name: 'DalSi MedVision',
  category: 'vision',
  modelType: 'dalsi-ai-vi',
  icon: Stethoscope,
  colorClass: 'text-accent',
  gradientClass: 'bg-gradient-to-r from-accent to-primary',
  headline: 'Medical Image',
  subheadline: 'Analysis',
  description: 'AI-powered medical imaging analysis. Assist diagnosis with advanced computer vision for X-rays, MRIs, and CT scans.',
  ctaPrimary: 'Request Demo',
  ctaSecondary: 'Learn More',
  ctaTitle: 'Transform Medical Imaging',
  ctaDescription: 'Join healthcare providers using MedVision for better patient outcomes',
  ctaFinal: 'Get Started Today',
  aiIndicator: 'Analyzing medical image...',
  featuresTitle: 'Advanced Medical AI',
  featuresSubtitle: 'Cutting-edge technology for healthcare professionals',
  useCasesTitle: 'Trusted by Healthcare Providers',
  basePrice: 199.99,
  stats: [
    { value: '98%', label: 'Accuracy' },
    { value: 'FDA', label: 'Approved' },
    { value: '50K+', label: 'Scans Daily' }
  ],
  mockupLines: ['100%', '90%', '75%', '100%', '60%'],
  features: [
    { icon: Stethoscope, title: 'Multi-modality Support', description: 'X-ray, MRI, CT, ultrasound, and more' },
    { icon: Search, title: 'Anomaly Detection', description: 'Identify potential issues with high accuracy' },
    { icon: Shield, title: 'HIPAA Compliant', description: 'Full compliance with healthcare regulations' },
    { icon: TrendingUp, title: 'Diagnostic Assistance', description: 'AI-powered insights for better diagnosis' },
    { icon: FileText, title: 'Automated Reports', description: 'Generate comprehensive analysis reports' },
    { icon: Lock, title: 'Secure & Private', description: 'Patient data never leaves your infrastructure' }
  ],
  useCases: [
    { icon: Stethoscope, title: 'Radiologists', description: 'Accelerate image analysis and improve accuracy' },
    { icon: Shield, title: 'Hospitals', description: 'Scale diagnostic capabilities across departments' },
    { icon: Search, title: 'Research Institutions', description: 'Analyze large datasets for medical research' }
  ],
  benefits: [
    { title: 'FDA Approved', description: 'Clinically validated and approved for medical use' },
    { title: '98% Diagnostic Accuracy', description: 'Matches or exceeds human expert performance' },
    { title: 'On-Premise Deployment', description: 'Keep sensitive data within your infrastructure' },
    { title: 'Continuous Learning', description: 'AI improves with every scan analyzed' }
  ]
}

export const artStudioData = {
  slug: 'art-studio',
  name: 'DalSi Art Studio',
  category: 'vision',
  modelType: 'dalsi-ai-vi',
  icon: Palette,
  colorClass: 'text-accent',
  gradientClass: 'bg-gradient-to-r from-accent to-primary',
  headline: 'AI Image',
  subheadline: 'Generation',
  description: 'Create stunning images from text descriptions. Professional-quality artwork, photos, and designs in seconds.',
  ctaPrimary: 'Create Art Free',
  ctaSecondary: 'View Gallery',
  ctaTitle: 'Start Creating Beautiful Art',
  ctaDescription: 'Join artists and designers using Art Studio for creative work',
  ctaFinal: 'Try Art Studio Now',
  aiIndicator: 'Generating artwork...',
  featuresTitle: 'Professional Creative Tools',
  featuresSubtitle: 'Everything you need to create stunning visuals',
  useCasesTitle: 'Perfect For Creatives',
  basePrice: 29.99,
  stats: [
    { value: '4K', label: 'Resolution' },
    { value: '100+', label: 'Art Styles' },
    { value: '<30s', label: 'Generation Time' }
  ],
  mockupLines: ['100%', '85%', '68%', '100%', '52%'],
  features: [
    { icon: Palette, title: 'Text-to-Image', description: 'Create images from detailed text descriptions' },
    { icon: Sparkles, title: '100+ Art Styles', description: 'From photorealistic to anime, abstract to oil painting' },
    { icon: Zap, title: 'High Resolution', description: 'Generate images up to 4K resolution' },
    { icon: FileEdit, title: 'Image Editing', description: 'Edit and refine generated images with AI' },
    { icon: TrendingUp, title: 'Style Transfer', description: 'Apply artistic styles to existing images' },
    { icon: Globe, title: 'Commercial License', description: 'Use generated images for commercial purposes' }
  ],
  useCases: [
    { icon: Palette, title: 'Digital Artists', description: 'Create concept art and illustrations faster' },
    { icon: TrendingUp, title: 'Marketing Teams', description: 'Generate unique visuals for campaigns' },
    { icon: Briefcase, title: 'Content Creators', description: 'Create eye-catching thumbnails and graphics' }
  ],
  benefits: [
    { title: 'Unlimited Generations', description: 'Create as many images as you need' },
    { title: 'Commercial Rights', description: 'Full commercial usage rights for all generated images' },
    { title: 'Multiple Styles', description: 'Access 100+ artistic styles and aesthetics' },
    { title: 'High Quality Output', description: 'Professional-grade 4K resolution images' }
  ]
}

export const inspectorData = {
  slug: 'inspector',
  name: 'DalSi Inspector',
  category: 'vision',
  modelType: 'dalsi-ai-vi',
  icon: Eye,
  colorClass: 'text-accent',
  gradientClass: 'bg-gradient-to-r from-accent to-primary',
  headline: 'Visual Quality',
  subheadline: 'Control',
  description: 'AI-powered defect detection for manufacturing. Identify quality issues with superhuman accuracy in real-time.',
  ctaPrimary: 'Request Demo',
  ctaSecondary: 'See Case Studies',
  ctaTitle: 'Transform Quality Control',
  ctaDescription: 'Join manufacturers achieving 99.9% quality with Inspector',
  ctaFinal: 'Get Started Today',
  aiIndicator: 'Inspecting product...',
  featuresTitle: 'Industrial-Grade Quality Control',
  featuresSubtitle: 'Advanced AI for manufacturing excellence',
  useCasesTitle: 'Trusted by Manufacturers',
  basePrice: 299.99,
  stats: [
    { value: '99.9%', label: 'Detection Rate' },
    { value: '<100ms', label: 'Inspection Time' },
    { value: '24/7', label: 'Operation' }
  ],
  mockupLines: ['100%', '93%', '80%', '100%', '68%'],
  features: [
    { icon: Eye, title: 'Defect Detection', description: '99.9% accuracy in identifying quality issues' },
    { icon: Zap, title: 'Real-time Inspection', description: 'Inspect products at production line speed' },
    { icon: TrendingUp, title: 'Quality Analytics', description: 'Track and analyze quality trends over time' },
    { icon: Shield, title: 'Customizable Rules', description: 'Define your own quality standards and thresholds' },
    { icon: Search, title: 'Root Cause Analysis', description: 'Identify patterns and sources of defects' },
    { icon: Globe, title: 'Multi-camera Support', description: 'Integrate with existing camera systems' }
  ],
  useCases: [
    { icon: Briefcase, title: 'Electronics Manufacturing', description: 'Inspect PCBs, components, and assemblies' },
    { icon: Shield, title: 'Automotive Industry', description: 'Quality control for parts and assemblies' },
    { icon: Eye, title: 'Food & Beverage', description: 'Ensure product quality and packaging integrity' }
  ],
  benefits: [
    { title: '99.9% Detection Accuracy', description: 'Catch defects that human inspectors miss' },
    { title: 'Real-time Processing', description: 'Inspect at full production line speed' },
    { title: 'Reduce Waste', description: 'Identify issues early and reduce scrap rates' },
    { title: 'Easy Integration', description: 'Works with existing cameras and systems' }
  ]
}

export const brandGuardData = {
  slug: 'brand-guard',
  name: 'DalSi Brand Guard',
  category: 'vision',
  modelType: 'dalsi-ai-vi',
  icon: Shield,
  colorClass: 'text-accent',
  gradientClass: 'bg-gradient-to-r from-accent to-primary',
  headline: 'Logo & Brand',
  subheadline: 'Protection',
  description: 'Monitor and protect your brand across digital platforms. Detect logo usage, counterfeits, and trademark violations.',
  ctaPrimary: 'Protect Your Brand',
  ctaSecondary: 'Learn More',
  ctaTitle: 'Protect Your Brand Identity',
  ctaDescription: 'Join brands using Brand Guard for trademark protection',
  ctaFinal: 'Start Monitoring Now',
  aiIndicator: 'Scanning for brand usage...',
  featuresTitle: 'Comprehensive Brand Protection',
  featuresSubtitle: 'Advanced AI for trademark monitoring',
  useCasesTitle: 'Trusted by Global Brands',
  basePrice: 149.99,
  stats: [
    { value: '1M+', label: 'Sites Monitored' },
    { value: '99%', label: 'Detection Rate' },
    { value: '24/7', label: 'Monitoring' }
  ],
  mockupLines: ['100%', '88%', '73%', '100%', '58%'],
  features: [
    { icon: Shield, title: 'Logo Detection', description: 'Find your logo across the internet automatically' },
    { icon: Search, title: 'Counterfeit Detection', description: 'Identify fake products and unauthorized sellers' },
    { icon: Globe, title: 'Global Monitoring', description: 'Monitor websites, social media, and marketplaces worldwide' },
    { icon: Zap, title: 'Real-time Alerts', description: 'Get notified instantly of potential violations' },
    { icon: TrendingUp, title: 'Brand Analytics', description: 'Track brand mentions and usage patterns' },
    { icon: FileText, title: 'Automated Reports', description: 'Generate compliance reports for legal teams' }
  ],
  useCases: [
    { icon: Briefcase, title: 'E-commerce Brands', description: 'Protect against counterfeit sellers on marketplaces' },
    { icon: Shield, title: 'Luxury Brands', description: 'Monitor for unauthorized use and counterfeits' },
    { icon: TrendingUp, title: 'Marketing Agencies', description: 'Track brand presence and competitor activity' }
  ],
  benefits: [
    { title: 'Automated Monitoring', description: 'Scan millions of websites and platforms daily' },
    { title: 'Instant Alerts', description: 'Get notified of potential violations in real-time' },
    { title: 'Legal Support', description: 'Generate reports for trademark enforcement' },
    { title: 'Global Coverage', description: 'Monitor across all major platforms worldwide' }
  ]
}

// ============================================
// DALSI AI VD (MEDIA) PRODUCTS
// ============================================

export const movieMakerData = {
  slug: 'moviemaker',
  name: 'DalSi MovieMaker',
  category: 'media',
  modelType: 'dalsi-ai-vd',
  icon: Film,
  colorClass: 'text-purple',
  gradientClass: 'bg-gradient-to-r from-purple to-accent',
  headline: 'AI Film',
  subheadline: 'Production',
  description: 'Create full-length movies from text. From script to screen, MovieMaker handles every aspect of video production.',
  ctaPrimary: 'Create Movie Free',
  ctaSecondary: 'Watch Examples',
  ctaTitle: 'Start Creating Movies Today',
  ctaDescription: 'Join filmmakers creating professional videos with MovieMaker',
  ctaFinal: 'Begin Your Production',
  aiIndicator: 'Generating video...',
  featuresTitle: 'Complete Film Production Suite',
  featuresSubtitle: 'Everything you need to create professional videos',
  useCasesTitle: 'Perfect For Content Creators',
  basePrice: 79.99,
  stats: [
    { value: '4K', label: 'Resolution' },
    { value: '60fps', label: 'Frame Rate' },
    { value: '<1hr', label: 'Render Time' }
  ],
  mockupLines: ['100%', '90%', '75%', '100%', '62%'],
  features: [
    { icon: Film, title: 'Text-to-Video', description: 'Generate complete videos from script descriptions' },
    { icon: Sparkles, title: 'Multiple Styles', description: 'Cinematic, documentary, animated, and more' },
    { icon: Music, title: 'Auto Soundtrack', description: 'AI-generated music and sound effects' },
    { icon: FileEdit, title: 'Video Editing', description: 'Professional editing tools built-in' },
    { icon: Globe, title: 'Multi-language', description: 'Generate videos in 100+ languages' },
    { icon: Zap, title: 'Fast Rendering', description: 'Render 4K videos in under an hour' }
  ],
  useCases: [
    { icon: Film, title: 'Content Creators', description: 'Create YouTube videos and social media content' },
    { icon: TrendingUp, title: 'Marketing Teams', description: 'Produce promotional videos and ads' },
    { icon: GraduationCap, title: 'Educators', description: 'Create educational and training videos' }
  ],
  benefits: [
    { title: 'Full Production Pipeline', description: 'From script to final video in one platform' },
    { title: '4K Quality Output', description: 'Professional-grade video quality' },
    { title: 'Unlimited Projects', description: 'Create as many videos as you need' },
    { title: 'Commercial License', description: 'Use videos for commercial purposes' }
  ]
}

export const translateGlobalData = {
  slug: 'translate-global',
  name: 'DalSi Translate Global',
  category: 'media',
  modelType: 'dalsi-ai-vd',
  icon: Languages,
  colorClass: 'text-purple',
  gradientClass: 'bg-gradient-to-r from-purple to-accent',
  headline: 'Multimedia',
  subheadline: 'Translation',
  description: 'Translate videos, audio, and documents across 100+ languages. Voice-over, subtitles, and cultural localization.',
  ctaPrimary: 'Translate Now',
  ctaSecondary: 'See Languages',
  ctaTitle: 'Go Global with Your Content',
  ctaDescription: 'Join businesses reaching worldwide audiences with Translate Global',
  ctaFinal: 'Start Translating',
  aiIndicator: 'Translating content...',
  featuresTitle: 'Complete Translation Platform',
  featuresSubtitle: 'Everything you need for global content',
  useCasesTitle: 'Perfect For Global Businesses',
  basePrice: 59.99,
  stats: [
    { value: '100+', label: 'Languages' },
    { value: '99%', label: 'Accuracy' },
    { value: '<5min', label: 'Processing' }
  ],
  mockupLines: ['100%', '86%', '71%', '100%', '56%'],
  features: [
    { icon: Languages, title: '100+ Languages', description: 'Translate to and from any major language' },
    { icon: Music, title: 'Voice-Over', description: 'Natural-sounding voice-over in target language' },
    { icon: FileText, title: 'Auto Subtitles', description: 'Generate accurate subtitles automatically' },
    { icon: Globe, title: 'Cultural Localization', description: 'Adapt content for cultural context' },
    { icon: Zap, title: 'Fast Processing', description: 'Translate hours of content in minutes' },
    { icon: Shield, title: 'Quality Assurance', description: 'Human-level translation quality' }
  ],
  useCases: [
    { icon: Globe, title: 'Global Businesses', description: 'Localize content for international markets' },
    { icon: Film, title: 'Content Creators', description: 'Reach global audiences with translated content' },
    { icon: GraduationCap, title: 'E-learning', description: 'Make courses accessible worldwide' }
  ],
  benefits: [
    { title: '100+ Languages', description: 'Support for all major world languages' },
    { title: 'Natural Voice-Over', description: 'Human-quality voice synthesis in any language' },
    { title: 'Cultural Adaptation', description: 'More than translation - true localization' },
    { title: 'Subtitle Formats', description: 'Export in SRT, VTT, and all major formats' }
  ]
}

export const musicStudioData = {
  slug: 'music-studio',
  name: 'DalSi Music Studio',
  category: 'media',
  modelType: 'dalsi-ai-vd',
  icon: Music,
  colorClass: 'text-purple',
  gradientClass: 'bg-gradient-to-r from-purple to-accent',
  headline: 'AI Music',
  subheadline: 'Production',
  description: 'Generate original music, soundtracks, and audio effects. Professional-quality music production powered by AI.',
  ctaPrimary: 'Create Music Free',
  ctaSecondary: 'Listen to Samples',
  ctaTitle: 'Start Creating Music Today',
  ctaDescription: 'Join musicians and producers using Music Studio',
  ctaFinal: 'Begin Composing',
  aiIndicator: 'Composing music...',
  featuresTitle: 'Professional Music Production',
  featuresSubtitle: 'Everything you need to create amazing music',
  useCasesTitle: 'Perfect For Musicians',
  basePrice: 49.99,
  stats: [
    { value: '50+', label: 'Genres' },
    { value: '100+', label: 'Instruments' },
    { value: 'Studio', label: 'Quality' }
  ],
  mockupLines: ['100%', '84%', '69%', '100%', '54%'],
  features: [
    { icon: Music, title: 'AI Composition', description: 'Generate original music from text descriptions' },
    { icon: Sparkles, title: '50+ Genres', description: 'From classical to EDM, hip-hop to jazz' },
    { icon: Headphones, title: 'Studio Quality', description: 'Professional-grade audio output' },
    { icon: FileEdit, title: 'Music Editing', description: 'Edit and refine generated tracks' },
    { icon: Zap, title: 'Instant Generation', description: 'Create complete tracks in seconds' },
    { icon: Globe, title: 'Commercial License', description: 'Use music for commercial projects' }
  ],
  useCases: [
    { icon: Music, title: 'Music Producers', description: 'Generate ideas and complete productions' },
    { icon: Film, title: 'Video Creators', description: 'Create custom soundtracks for videos' },
    { icon: TrendingUp, title: 'Game Developers', description: 'Generate game music and sound effects' }
  ],
  benefits: [
    { title: 'Unlimited Tracks', description: 'Generate as many tracks as you need' },
    { title: 'Royalty-Free', description: 'Full commercial rights to all generated music' },
    { title: 'Multiple Formats', description: 'Export in WAV, MP3, FLAC, and more' },
    { title: 'Stem Separation', description: 'Get individual instrument tracks' }
  ]
}

export const videoAdsData = {
  slug: 'video-ads',
  name: 'DalSi VideoAds',
  category: 'media',
  modelType: 'dalsi-ai-vd',
  icon: TrendingUp,
  colorClass: 'text-purple',
  gradientClass: 'bg-gradient-to-r from-purple to-accent',
  headline: 'Marketing Video',
  subheadline: 'Creator',
  description: 'Create engaging marketing videos and social media ads automatically. Optimized for every platform.',
  ctaPrimary: 'Create Ad Free',
  ctaSecondary: 'View Examples',
  ctaTitle: 'Start Creating High-Converting Ads',
  ctaDescription: 'Join marketers creating viral ads with VideoAds',
  ctaFinal: 'Create Your First Ad',
  aiIndicator: 'Generating ad...',
  featuresTitle: 'Complete Ad Creation Platform',
  featuresSubtitle: 'Everything you need for successful video marketing',
  useCasesTitle: 'Perfect For Marketers',
  basePrice: 69.99,
  stats: [
    { value: '10+', label: 'Platforms' },
    { value: '3x', label: 'Higher CTR' },
    { value: '<5min', label: 'Creation Time' }
  ],
  mockupLines: ['100%', '89%', '74%', '100%', '60%'],
  features: [
    { icon: TrendingUp, title: 'Auto Ad Creation', description: 'Generate complete ads from product descriptions' },
    { icon: Globe, title: 'Multi-Platform', description: 'Optimized for Facebook, Instagram, TikTok, YouTube' },
    { icon: Sparkles, title: 'A/B Testing', description: 'Generate multiple variations for testing' },
    { icon: TrendingUp, title: 'Performance Analytics', description: 'Track ad performance and optimize' },
    { icon: Zap, title: 'Fast Production', description: 'Create ads in minutes, not days' },
    { icon: FileText, title: 'Auto Captions', description: 'Generate engaging captions automatically' }
  ],
  useCases: [
    { icon: TrendingUp, title: 'E-commerce', description: 'Create product ads that convert' },
    { icon: Briefcase, title: 'Agencies', description: 'Scale ad production for multiple clients' },
    { icon: Globe, title: 'SMBs', description: 'Professional ads without big budgets' }
  ],
  benefits: [
    { title: 'Platform Optimization', description: 'Ads optimized for each social platform' },
    { title: '3x Higher CTR', description: 'AI-optimized ads perform better' },
    { title: 'Unlimited Variations', description: 'Test multiple versions to find winners' },
    { title: 'Brand Templates', description: 'Maintain brand consistency across all ads' }
  ]
}

export const learningPlatformData = {
  slug: 'learning-platform',
  name: 'DalSi Learning Platform',
  category: 'media',
  modelType: 'dalsi-ai-vd',
  icon: GraduationCap,
  colorClass: 'text-purple',
  gradientClass: 'bg-gradient-to-r from-purple to-accent',
  headline: 'Educational Content',
  subheadline: 'Creator',
  description: 'Create engaging educational videos, courses, and training content. Make learning accessible and engaging.',
  ctaPrimary: 'Create Course Free',
  ctaSecondary: 'See Examples',
  ctaTitle: 'Transform Education with AI',
  ctaDescription: 'Join educators creating engaging content with Learning Platform',
  ctaFinal: 'Start Creating',
  aiIndicator: 'Creating lesson...',
  featuresTitle: 'Complete E-Learning Platform',
  featuresSubtitle: 'Everything you need for online education',
  useCasesTitle: 'Perfect For Educators',
  basePrice: 54.99,
  stats: [
    { value: '100+', label: 'Templates' },
    { value: '50+', label: 'Languages' },
    { value: '10x', label: 'Faster Creation' }
  ],
  mockupLines: ['100%', '87%', '72%', '100%', '58%'],
  features: [
    { icon: GraduationCap, title: 'Course Creation', description: 'Generate complete courses from outlines' },
    { icon: Video, title: 'Video Lessons', description: 'Create engaging video lessons automatically' },
    { icon: FileText, title: 'Auto Quizzes', description: 'Generate assessments and quizzes' },
    { icon: Globe, title: 'Multi-language', description: 'Create courses in 50+ languages' },
    { icon: TrendingUp, title: 'Learning Analytics', description: 'Track student progress and engagement' },
    { icon: Sparkles, title: 'Interactive Content', description: 'Add interactivity and engagement' }
  ],
  useCases: [
    { icon: GraduationCap, title: 'Online Educators', description: 'Create and sell online courses' },
    { icon: Briefcase, title: 'Corporate Training', description: 'Build employee training programs' },
    { icon: Shield, title: 'Compliance Training', description: 'Create mandatory training content' }
  ],
  benefits: [
    { title: 'Complete Course Creation', description: 'From outline to final course in one platform' },
    { title: 'Engaging Content', description: 'AI-optimized for maximum student engagement' },
    { title: 'Multi-format Export', description: 'SCORM, xAPI, and all major LMS formats' },
    { title: 'Unlimited Students', description: 'No limits on course enrollment' }
  ]
}

// Export all products as array
export const allProducts = [
  writerProData,
  codeGeniusData,
  businessSuiteData,
  researcherData,
  chatbotBuilderData,
  visionScanData,
  medVisionData,
  artStudioData,
  inspectorData,
  brandGuardData,
  movieMakerData,
  translateGlobalData,
  musicStudioData,
  videoAdsData,
  learningPlatformData
]

// Export by category
export const textProducts = [writerProData, codeGeniusData, businessSuiteData, researcherData, chatbotBuilderData]
export const visionProducts = [visionScanData, medVisionData, artStudioData, inspectorData, brandGuardData]
export const mediaProducts = [movieMakerData, translateGlobalData, musicStudioData, videoAdsData, learningPlatformData]

