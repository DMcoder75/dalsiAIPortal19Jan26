import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, Star, Shield, Loader2 } from 'lucide-react';
import { fetchSubscriptionPlans } from '@/lib/data';

const PricingSection = () => {
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlans = async () => {
      try {
        setLoading(true);
        const plans = await fetchSubscriptionPlans();
        if (plans) {
          // Add UI-specific properties to the fetched plans
          const uiEnhancedPlans = plans.map(plan => {
            let color = 'bg-card border-border';
            let popular = false;
            if (plan.tier_level === 3) { // Explorer
              color = 'bg-card border-primary';
              popular = true;
            } else if (plan.tier_level >= 4) { // Pro and Enterprise
              color = 'bg-card border-accent';
            }

            return {
              ...plan,
              name: plan.display_name,
              price: plan.price_monthly > 0 ? `$${parseInt(plan.price_monthly)}` : 'Custom',
              period: plan.price_monthly > 0 ? '/month' : 'pricing',
              features: plan.features?.features || [],
              limitations: plan.features?.limitations || [],
              color,
              buttonColor: plan.tier_level >= 4 ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90',
              popular,
            };
          });
          setPricingTiers(uiEnhancedPlans);
        } else {
          setError('Could not load subscription plans.');
        }
      } catch (e) {
        setError('An unexpected error occurred.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getPlans();
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl text-white"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 text-white">
            <span className="text-primary font-semibold text-sm">Revenue Model</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
            Choose Your AI Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent, scalable pricing designed to grow with your organization. 
            From startups to enterprise giants, we have the perfect AI solution for your needs.
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-muted-foreground">Loading plans...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Pricing Cards Container */}
        {!loading && !error && (
          <div className="pricing-grid-container">
            <style>{`
              .pricing-grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                max-width: 1600px;
                margin: 0 auto;
                padding: 0 1rem;
              }
              
              .pricing-card {
                position: relative;
                height: auto;
                min-height: 700px;
                display: flex;
                flex-direction: column;
              }
              
              .pricing-card-content {
                flex: 1;
                display: flex;
                flex-direction: column;
              }
              
              .pricing-features {
                flex: 1;
              }
            `}</style>
            
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`pricing-card ${tier.color} ${tier.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : 'hover:shadow-xl'} transition-all duration-300 hover:scale-105`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold animate-pulse text-white">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground ml-1">{tier.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pricing-card-content">
                  <div className="pricing-features">
                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {tier.limitations && tier.limitations.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Limitations:</h4>
                        <div className="space-y-2">
                          {tier.limitations.map((limitation, limitIndex) => (
                            <div key={limitIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto space-y-4">
                    <Button 
                      className={`w-full ${tier.buttonColor} text-white hover:scale-105 transition-all duration-300 group`}
                      size="lg"
                    >
                      {tier.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* Additional Info */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        {tier.name === "Enterprise" ? "Custom implementation timeline" : `${tier.trial_days || 14}-day free trial • No credit card required`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse text-white">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">ROI Guarantee</h3>
            <p className="text-muted-foreground text-sm">
              See measurable improvements in efficiency and outcomes within 90 days, or get your money back.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scalable Growth</h3>
            <p className="text-muted-foreground text-sm">
              Start small and scale seamlessly as your organization grows. No migration headaches.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-destructive/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
            <p className="text-muted-foreground text-sm">
              Built for the most demanding environments with enterprise-grade security and compliance.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Organization?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of healthcare providers and educational institutions already using Dalsi AI 
            to deliver better outcomes and enhanced experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-white">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 text-white">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
