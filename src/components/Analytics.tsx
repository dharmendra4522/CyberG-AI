import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ChartComponent from "./ChartComponent";

const Analytics = () => {
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

  const metrics = [
    {
      icon: TrendingUp,
      label: "Revenue Growth",
      value: 234,
      suffix: "%",
      color: "text-primary"
    },
    {
      icon: Users,
      label: "Active Users",
      value: 12540,
      suffix: "+",
      color: "text-accent"
    },
    {
      icon: DollarSign,
      label: "Cost Savings",
      value: 890,
      suffix: "K",
      color: "text-green-500"
    },
    {
      icon: Activity,
      label: "Data Points",
      value: 2.4,
      suffix: "M",
      color: "text-purple-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real-time <span className="text-gradient">Analytics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Watch your business metrics come alive with interactive dashboards 
              and real-time data visualization powered by CyberG AI.
            </p>
            <Button variant="cyber" size="lg">
              Explore Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className={`p-6 chart-container group hover:shadow-neon transition-all duration-500 ${
                isVisible ? 'scale-in animate' : 'scale-in'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <div className="space-y-2">
                <div className={`text-2xl md:text-3xl font-bold ${metric.color}`}>
                  {isVisible && (
                    <AnimatedCounter 
                      end={metric.value} 
                      suffix={metric.suffix}
                      duration={2000}
                      delay={index * 200}
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Interactive Chart */}
        <div className={`${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`} style={{ animationDelay: '600ms' }}>
          <Card className="p-8 chart-container">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Performance Overview</h3>
              <p className="text-muted-foreground">
                AI-powered insights showing key performance indicators across all metrics
              </p>
            </div>
            
            <ChartComponent isVisible={isVisible} />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Analytics;