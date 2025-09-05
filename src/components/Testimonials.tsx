import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Data Director",
      company: "TechCorp Analytics",
      image: "/lovable-uploads/placeholder-avatar-1.jpg",
      rating: 5,
      quote: "CyberG AI transformed our data analysis workflow completely. What used to take hours now happens in minutes, with insights we never would have discovered manually.",
      metrics: "300% faster analysis",
      initials: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Strategy", 
      company: "InnovateLabs",
      image: "/lovable-uploads/placeholder-avatar-2.jpg",
      rating: 5,
      quote: "The predictive capabilities are incredible. We've increased our forecast accuracy by 40% and identified market opportunities weeks ahead of competitors.",
      metrics: "40% better forecasting",
      initials: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Lead",
      company: "BioMed Solutions",
      image: "/lovable-uploads/placeholder-avatar-3.jpg", 
      rating: 5,
      quote: "CyberG AI's ability to find patterns in complex medical data has accelerated our research timeline by months. The visualizations help us communicate findings clearly.",
      metrics: "6 months ahead of schedule",
      initials: "EW"
    },
    {
      name: "James Park",
      role: "CFO",
      company: "RetailNext",
      image: "/lovable-uploads/placeholder-avatar-4.jpg",
      rating: 5,
      quote: "The real-time analytics dashboard gives us instant visibility into our business performance. Decision-making has never been this data-driven and confident.",
      metrics: "Real-time visibility",
      initials: "JP"
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "99.9%", label: "Uptime" },
    { value: "2.4s", label: "Avg Response" },
    { value: "50M+", label: "Data Points Processed" }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of organizations worldwide who rely on CyberG AI 
              to transform their data into competitive advantages.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center ${isVisible ? 'scale-in animate' : 'scale-in'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-16 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`} style={{ animationDelay: '400ms' }}>
          <Card className="p-8 lg:p-12 chart-container relative overflow-hidden">
            <div className="absolute top-4 right-4 text-primary/20">
              <Quote className="w-16 h-16" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed text-foreground">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-primary">
                    {testimonials[currentTestimonial].metrics}
                  </span>
                </div>
              </div>
              
              <div className="text-center lg:text-left space-y-4">
                <Avatar className="w-20 h-20 mx-auto lg:mx-0 ring-4 ring-primary/20">
                  <AvatarImage src={testimonials[currentTestimonial].image} />
                  <AvatarFallback className="bg-gradient-cyber text-white text-xl">
                    {testimonials[currentTestimonial].initials}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-primary font-medium">{testimonials[currentTestimonial].role}</div>
                  <div className="text-muted-foreground">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`p-6 chart-container group hover:shadow-cyber transition-all duration-500 ${
                isVisible ? 'scale-in animate' : 'scale-in'
              }`}
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                  <AvatarImage src={testimonial.image} />
                  <AvatarFallback className="bg-gradient-cyber text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="text-sm font-medium text-primary">{testimonial.metrics}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;