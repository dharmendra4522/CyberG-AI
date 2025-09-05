import { useEffect, useRef, useState } from "react";
import { Brain, TrendingUp, Shield, Zap, BarChart3, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
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

  const features = [
    {
      icon: Brain,
      title: "Neural Intelligence",
      description: "Advanced machine learning algorithms that adapt and learn from your data patterns in real-time.",
      stat: "4x Faster",
      delay: 0
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast trends and outcomes with 99.9% accuracy using our proprietary AI models.",
      stat: "99.9% Accurate",
      delay: 200
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and privacy protection for your most sensitive data.",
      stat: "Zero Breaches",
      delay: 400
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Process millions of data points instantly with sub-second response times.",
      stat: "2.4s Response",
      delay: 600
    },
    {
      icon: BarChart3,
      title: "Visual Insights",
      description: "Transform complex data into beautiful, interactive visualizations and dashboards.",
      stat: "50+ Charts",
      delay: 800
    },
    {
      icon: Target,
      title: "Smart Automation",
      description: "Automate decision-making processes with intelligent AI-driven workflows.",
      stat: "80% Automation",
      delay: 1000
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-dots opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Powered by <span className="text-gradient">Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of AI-driven analytics with features designed 
              to revolutionize how you understand and act on your data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`p-8 chart-container group hover:shadow-cyber transition-all duration-500 ${
                isVisible ? 'scale-in animate' : 'scale-in'
              }`}
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-cyber rounded-xl flex items-center justify-center mb-4 group-hover:shadow-neon transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full animate-pulse-glow">
                  {feature.stat}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-all duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;