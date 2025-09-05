import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import heroPattern from "@/assets/hero-pattern.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Ultra Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Mesh Gradient Base */}
        <div className="absolute inset-0 animate-mesh-gradient opacity-60" />
        
        {/* Interactive Wave Patterns */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-wave-pattern animate-wave opacity-30" />
          <div className="absolute inset-0 bg-wave-pattern animate-wave-reverse opacity-20" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Complex Grid System */}
        <div 
          className="absolute inset-0 opacity-25 cyber-grid-advanced parallax"
          data-speed="0.3"
          style={{
            backgroundImage: `url(${heroPattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Dynamic Particle System */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`advanced-particle-${i}`}
            className={`absolute bg-primary/70 rounded-full animate-particle-advanced-${i % 4}`}
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 8}s`
            }}
          />
        ))}
        
        {/* Floating Geometric Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`geometry-${i}`}
            className={`absolute border border-primary/40 animate-geometry-float-${i % 4}`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
        
        {/* Dynamic Gradient Orbs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-full blur-2xl animate-orb-complex" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-radial from-accent/50 via-accent/25 to-transparent rounded-full blur-xl animate-orb-complex-reverse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-radial from-secondary/30 via-secondary/15 to-transparent rounded-full blur-3xl animate-orb-complex" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-radial from-primary/35 via-primary/20 to-transparent rounded-full blur-2xl animate-orb-complex-reverse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-10 w-28 h-28 bg-gradient-radial from-accent/45 via-accent/22 to-transparent rounded-full blur-xl animate-orb-complex" style={{ animationDelay: '6s' }} />
        
        {/* Flowing Energy Networks */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="energy-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="energy-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <path d="M0,400 Q300,200 600,400 Q900,600 1200,400" stroke="url(#energy-gradient-1)" strokeWidth="2" fill="none" className="animate-energy-flow" />
            <path d="M0,200 Q400,500 800,200 Q1000,100 1200,300" stroke="url(#energy-gradient-2)" strokeWidth="1.5" fill="none" className="animate-energy-flow" style={{ animationDelay: '3s' }} />
            <path d="M200,600 Q500,300 800,600 Q1000,700 1200,500" stroke="url(#energy-gradient-1)" strokeWidth="1.2" fill="none" className="animate-energy-flow" style={{ animationDelay: '6s' }} />
            <path d="M0,600 Q200,100 400,600 Q700,800 1000,300" stroke="url(#energy-gradient-2)" strokeWidth="1.8" fill="none" className="animate-energy-flow" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
        
        {/* Rotating Constellation */}
        <div className="absolute inset-0 animate-constellation-rotate">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-primary/80 rounded-full animate-twinkle"
              style={{
                left: `${20 + (i * 60) % 80}%`,
                top: `${30 + (i * 40) % 60}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Multi-layer Glow System */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent animate-glow-wave" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-accent/20 via-accent/10 to-transparent animate-glow-wave-reverse" />
        <div className="absolute top-1/2 left-0 w-32 h-full bg-gradient-to-r from-secondary/15 via-secondary/8 to-transparent animate-glow-wave" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-0 w-32 h-full bg-gradient-to-l from-primary/15 via-primary/8 to-transparent animate-glow-wave-reverse" style={{ animationDelay: '4s' }} />
        
        {/* Dynamic Background Shifts */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-background-shift opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-secondary/3 animate-background-shift-reverse opacity-60" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-8 animate-slide-in">
            <Zap className="w-4 h-4" />
            <span className="font-cyber">AI-Powered Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient animate-float">CyberG AI</span>
            <br />
            <span className="text-foreground">Redefining Smart</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light">
            Unlock the future of intelligent decision-making with advanced AI analytics 
            that transform data into actionable insights in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="xl" className="group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glow" size="xl">
              <BarChart3 className="w-5 h-5" />
              View Demo
            </Button>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center scale-in animate">
              <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center scale-in animate delay-200">
              <div className="text-3xl font-bold text-gradient mb-2">2.4s</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center scale-in animate delay-400">
              <div className="text-3xl font-bold text-gradient mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;