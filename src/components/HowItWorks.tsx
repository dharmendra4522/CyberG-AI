import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Database, Brain, BarChart3, Rocket } from "lucide-react";

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: Database,
      title: "Data Integration",
      description: "Connect your data sources seamlessly with our universal API connectors and real-time sync capabilities.",
      details: "Support for 100+ data sources including databases, APIs, cloud services, and file formats."
    },
    {
      icon: Brain,
      title: "AI Processing",
      description: "Our advanced neural networks analyze patterns, anomalies, and trends in your data with unprecedented accuracy.",
      details: "Machine learning algorithms process millions of data points per second with 99.9% accuracy."
    },
    {
      icon: BarChart3,
      title: "Smart Insights",
      description: "Generate actionable insights with interactive visualizations and predictive analytics dashboards.",
      details: "Real-time dashboards with 50+ chart types and customizable KPI tracking."
    },
    {
      icon: Rocket,
      title: "Action & Scale",
      description: "Implement AI-driven decisions and scale your operations with automated workflows and alerts.",
      details: "Automated decision-making with 80% process automation and intelligent alert systems."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-dots opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              How <span className="text-gradient">CyberG AI</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your data into intelligent insights with our streamlined 4-step process 
              designed for maximum efficiency and accuracy.
            </p>
          </div>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className={`p-8 chart-container transition-all duration-700 cursor-pointer ${
                  activeStep === index ? 'shadow-neon scale-105' : 'hover:shadow-cyber'
                } ${isVisible ? 'scale-in animate' : 'scale-in'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-cyber rounded-full flex items-center justify-center text-white font-bold text-sm shadow-neon">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-cyber shadow-neon' 
                    : 'bg-primary/10 hover:bg-primary/20'
                }`}>
                  <step.icon className={`w-8 h-8 ${
                    activeStep === index ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold transition-colors ${
                    activeStep === index ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Detailed Info - Shows on Active */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeStep === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-cyber transition-all duration-1000"
                     style={{ 
                       width: activeStep === index ? '100%' : '0%',
                       transitionDelay: activeStep === index ? '0ms' : '0ms'
                     }} 
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;