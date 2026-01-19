import { Button } from '../components/ui/button'
import { ArrowLeft, Shield, Eye, Lock, Database, Users, FileText } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground dark"
         style={{
           background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
           minHeight: '100vh'
         }}>
      <Navigation />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy', href: '/privacy-policy' }]} />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Button 
                variant="ghost" 
                className="mb-6 text-primary hover:text-primary/80"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your privacy is fundamental to our mission. Learn how we protect, collect, and use your information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: January 1, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Overview */}
        <section className="py-16 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h2 className="text-2xl font-bold text-foreground">Our Privacy Commitment</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Dalsi AI & Automations ("we," "our," or "us"), we are committed to protecting your privacy and 
                ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website, use our AI services, 
                or interact with our applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in transparency and want you to understand exactly how your data is handled. This policy 
                applies to all users of our services, including healthcare providers, educational institutions, 
                and individual users.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Information We Collect */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-accent mr-4" />
                <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Name, email address, and contact information</li>
                    <li>• Company or organization details</li>
                    <li>• Professional credentials and role information</li>
                    <li>• Account credentials and authentication data</li>
                    <li>• Payment and billing information (processed securely through third-party providers)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Usage Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We automatically collect certain information about your use of our services:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Device information (IP address, browser type, operating system)</li>
                    <li>• Usage patterns and interaction data with our AI services</li>
                    <li>• Log files and technical data for service optimization</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">AI Interaction Data</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you use our AI services, we may collect:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Input queries and prompts submitted to our AI models</li>
                    <li>• Generated responses and outputs</li>
                    <li>• Feedback and rating data to improve our services</li>
                    <li>• Session data and conversation history (when applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-destructive mr-4" />
                <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We use the collected information for the following purposes:
                </p>
                <ul className="space-y-3 ml-6">
                  <li>• <strong className="text-foreground">Service Provision:</strong> To provide, maintain, and improve our AI services and applications</li>
                  <li>• <strong className="text-foreground">Personalization:</strong> To customize your experience and provide relevant recommendations</li>
                  <li>• <strong className="text-foreground">Communication:</strong> To respond to inquiries, provide support, and send important updates</li>
                  <li>• <strong className="text-foreground">Analytics:</strong> To analyze usage patterns and improve our AI models and services</li>
                  <li>• <strong className="text-foreground">Security:</strong> To detect, prevent, and address technical issues and security threats</li>
                  <li>• <strong className="text-foreground">Compliance:</strong> To comply with legal obligations and regulatory requirements</li>
                  <li>• <strong className="text-foreground">Research:</strong> To conduct research and development for advancing AI technology (with anonymized data)</li>
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-chart-4 mr-4" />
                <h2 className="text-2xl font-bold text-foreground">Data Protection & Security</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Security Measures</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• End-to-end encryption for data transmission</li>
                    <li>• Secure data storage with encryption at rest</li>
                    <li>• Regular security audits and vulnerability assessments</li>
                    <li>• Access controls and authentication protocols</li>
                    <li>• Employee training on data protection and privacy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Data Retention</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information only for as long as necessary to fulfill the purposes 
                    outlined in this policy, comply with legal obligations, resolve disputes, and enforce our 
                    agreements. AI interaction data may be retained for service improvement purposes but is 
                    anonymized when possible.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Data Minimization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We follow the principle of data minimization, collecting only the information necessary 
                    to provide our services effectively. We regularly review our data collection practices 
                    to ensure they remain aligned with this principle.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-primary mr-4" />
                <h2 className="text-2xl font-bold text-foreground">Information Sharing & Disclosure</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, 
                  except in the following circumstances:
                </p>
                <ul className="space-y-3 ml-6">
                  <li>• <strong className="text-foreground">Service Providers:</strong> With trusted third-party service providers who assist in operating our services (under strict confidentiality agreements)</li>
                  <li>• <strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                  <li>• <strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
                  <li>• <strong className="text-foreground">Consent:</strong> With your explicit consent for specific purposes</li>
                  <li>• <strong className="text-foreground">Safety:</strong> To protect the rights, property, or safety of our users or the public</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We ensure that any third parties we work with maintain appropriate data protection standards 
                  and use your information only for the specified purposes.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-accent mr-4" />
                <h2 className="text-2xl font-bold text-foreground">Your Privacy Rights</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="space-y-3 ml-6">
                  <li>• <strong className="text-foreground">Access:</strong> Request access to your personal information we hold</li>
                  <li>• <strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li>• <strong className="text-foreground">Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li>• <strong className="text-foreground">Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li>• <strong className="text-foreground">Restriction:</strong> Request restriction of processing under certain circumstances</li>
                  <li>• <strong className="text-foreground">Objection:</strong> Object to processing based on legitimate interests</li>
                  <li>• <strong className="text-foreground">Withdrawal:</strong> Withdraw consent for processing (where consent is the legal basis)</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise these rights, please contact us at <strong className="text-primary">info@neodalsi.com</strong>. 
                  We will respond to your request within 30 days.
                </p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cookies & Tracking Technologies</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  These technologies help us:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Remember your preferences and settings</li>
                  <li>• Analyze website traffic and usage patterns</li>
                  <li>• Provide personalized content and recommendations</li>
                  <li>• Ensure security and prevent fraud</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences. However, disabling certain 
                  cookies may affect the functionality of our services.
                </p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">International Data Transfers</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of 
                  residence. We ensure that such transfers comply with applicable data protection laws and 
                  implement appropriate safeguards, including:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Standard contractual clauses approved by relevant authorities</li>
                  <li>• Adequacy decisions by competent data protection authorities</li>
                  <li>• Other legally recognized transfer mechanisms</li>
                </ul>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Children's Privacy</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Our services are not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If we become aware that we have collected 
                  personal information from a child under 13, we will take steps to delete such information 
                  promptly.
                </p>
                <p className="leading-relaxed">
                  For educational institutions using our services with students, we require appropriate 
                  parental consent and compliance with applicable educational privacy laws such as FERPA.
                </p>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Updates to This Policy</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  technology, legal requirements, or other factors. We will notify you of any material changes 
                  by posting the updated policy on our website and updating the "Last updated" date.
                </p>
                <p className="leading-relaxed">
                  We encourage you to review this policy periodically to stay informed about how we protect 
                  your information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                  data practices, please contact us:
                </p>
                <div className="bg-background rounded-lg p-6 border border-border">
                  <p>Email: <span className="text-primary">info@neodalsi.com</span></p>
                </div>
                <p className="leading-relaxed">
                  We are committed to addressing your privacy concerns and will respond to your inquiries 
                  in a timely manner.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
