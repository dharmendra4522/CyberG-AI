import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import InteractiveBackground from "./InteractiveBackground";

const EnhancedHero = () => {
  const { elementRef, getAnimationClass } = useScrollAnimation({ 
    threshold: 0.2, 
    triggerOnce: true 
  });

  return (
    <section 
      ref={elementRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
    >
      <InteractiveBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 animate-mesh-gradient" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/30 rounded-full animate-particle-advanced-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 800}ms`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div {...getAnimationClass('scroll-fade-up')}>
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
            <span className="text-gradient animate-pulse-glow">CyberG</span>
            <span className="text-primary hover-glow"> AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your business with cutting-edge artificial intelligence. 
            Unlock insights, automate processes, and accelerate growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="xl" className="cyber-button bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-cyber hover-lift">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="xl" variant="outline" className="px-8 py-4 text-lg font-semibold rounded-lg border-primary/30 hover:bg-primary/10 hover-glow">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Grid with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Zap, title: "Lightning Fast", description: "Process data at unprecedented speeds" },
            { icon: Shield, title: "Enterprise Security", description: "Bank-grade security for your data" },
            { icon: TrendingUp, title: "Proven Results", description: "Join thousands of successful companies" }
          ].map((feature, index) => (
            <div 
              key={index}
              {...getAnimationClass('scroll-bounce-in', index)}
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift hover-glow"
            >
              <feature.icon className="h-8 w-8 text-primary mx-auto mb-4 hover-rotate" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;