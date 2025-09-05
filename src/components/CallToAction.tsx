import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Dark Background with Cyber Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
      <div className="absolute inset-0 cyber-dots opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float delay-1000" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Start Your AI Journey Today</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-background">
              Ready to Transform Your
              <br />
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Data into Intelligence?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-background/80 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
              Join thousands of forward-thinking organizations using CyberG AI to unlock 
              the full potential of their data. Start your free trial today—no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group px-12 py-4 text-lg font-semibold"
              >
                <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start Free Trial
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="border-background/30 text-background hover:bg-background/10 hover:border-background px-12 py-4 text-lg"
              >
                <TrendingUp className="w-6 h-6 mr-3" />
                Schedule Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className={`text-center ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '800ms' }}>
                <div className="text-2xl font-bold text-primary mb-1">14 Days</div>
                <div className="text-sm text-background/70">Free Trial</div>
              </div>
              <div className={`text-center ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '900ms' }}>
                <div className="text-2xl font-bold text-accent mb-1">No Setup</div>
                <div className="text-sm text-background/70">Required</div>
              </div>
              <div className={`text-center ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '1000ms' }}>
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-background/70">Support</div>
              </div>
              <div className={`text-center ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '1100ms' }}>
                <div className="text-2xl font-bold text-accent mb-1">Cancel</div>
                <div className="text-sm text-background/70">Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default CallToAction;