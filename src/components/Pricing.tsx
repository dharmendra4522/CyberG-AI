import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Zap, Crown, Rocket, Star } from "lucide-react";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small teams getting started with AI analytics",
      monthlyPrice: 29,
      annualPrice: 24,
      icon: Zap,
      popular: false,
      features: [
        "Up to 10,000 data points",
        "5 chart types available",
        "Basic AI insights",
        "Email support",
        "Standard export formats",
        "1 team member",
        "7-day data retention"
      ],
      limitations: [
        "Limited to basic charts",
        "No real-time updates"
      ]
    },
    {
      name: "Professional", 
      description: "Ideal for growing businesses that need advanced analytics and collaboration",
      monthlyPrice: 79,
      annualPrice: 65,
      icon: Crown,
      popular: true,
      features: [
        "Up to 100,000 data points",
        "All 40+ chart types",
        "Advanced AI predictions",
        "Priority support",
        "All export formats + API",
        "10 team members",
        "30-day data retention",
        "Real-time collaboration",
        "Custom branding",
        "Advanced integrations"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring unlimited scale and premium support",
      monthlyPrice: 199,
      annualPrice: 165,
      icon: Rocket,
      popular: false,
      features: [
        "Unlimited data points",
        "All chart types + custom",
        "AI-powered automation",
        "24/7 dedicated support",
        "White-label solution",
        "Unlimited team members",
        "Unlimited data retention",
        "Advanced security (SSO)",
        "Custom integrations",
        "On-premise deployment",
        "SLA guarantee",
        "Training & onboarding"
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-dots opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-gradient">Intelligence Level</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Scale your AI analytics capabilities with plans designed for every stage of growth. 
              Start free, upgrade when you need more power.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`p-8 relative transition-all duration-500 ${
                plan.popular 
                  ? 'chart-container shadow-neon scale-105 border-primary/50' 
                  : 'chart-container hover:shadow-cyber'
              } ${isVisible ? 'scale-in animate' : 'scale-in'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-cyber text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                  plan.popular ? 'bg-gradient-cyber shadow-neon' : 'bg-primary/10'
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${plan.monthlyPrice}/month
                    </div>
                  )}
                  <div className="text-sm text-primary font-medium">
                    {isAnnual ? 'Billed annually' : 'Billed monthly'}
                  </div>
                </div>
              </div>
              
              <Button 
                variant={plan.popular ? "hero" : "cyber"} 
                size="lg" 
                className="w-full mb-8"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </Button>
              
              <div className="space-y-4">
                <div className="text-sm font-semibold text-foreground mb-3">Everything included:</div>
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-border/50">
                    <div className="text-sm font-semibold text-muted-foreground mb-2">Limitations:</div>
                    {plan.limitations.map((limitation, lIndex) => (
                      <div key={lIndex} className="text-sm text-muted-foreground/70">
                        • {limitation}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`text-center ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`} style={{ animationDelay: '800ms' }}>
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 text-left chart-container">
                <h4 className="font-semibold mb-3">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <p className="text-muted-foreground mb-4">Need a custom solution?</p>
            <Button variant="glow" size="lg">
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;