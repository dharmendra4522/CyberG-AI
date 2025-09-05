import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Cloud, Code, Zap, ArrowRight, CheckCircle } from "lucide-react";

const Integration = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("databases");
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

  const integrations = {
    databases: [
      { name: "PostgreSQL", icon: "🐘", description: "Connect to your PostgreSQL databases", status: "Live" },
      { name: "MySQL", icon: "🐬", description: "Real-time MySQL data integration", status: "Live" },
      { name: "MongoDB", icon: "🍃", description: "NoSQL document database support", status: "Live" },
      { name: "Redis", icon: "🔴", description: "In-memory data structure store", status: "Beta" },
      { name: "Elasticsearch", icon: "🔍", description: "Search and analytics engine", status: "Live" },
      { name: "ClickHouse", icon: "🏠", description: "Columnar database management", status: "Coming Soon" }
    ],
    cloud: [
      { name: "AWS S3", icon: "☁️", description: "Amazon cloud storage integration", status: "Live" },
      { name: "Google Cloud", icon: "🌩️", description: "Google Cloud Platform services", status: "Live" },
      { name: "Azure", icon: "🔷", description: "Microsoft Azure cloud services", status: "Live" },
      { name: "Snowflake", icon: "❄️", description: "Cloud data warehouse platform", status: "Live" },
      { name: "BigQuery", icon: "🔢", description: "Google's serverless data warehouse", status: "Beta" },
      { name: "Databricks", icon: "🧱", description: "Unified analytics platform", status: "Beta" }
    ],
    apis: [
      { name: "REST APIs", icon: "🔗", description: "Connect any REST API endpoint", status: "Live" },
      { name: "GraphQL", icon: "🎯", description: "Query language for APIs", status: "Live" },
      { name: "Stripe", icon: "💳", description: "Payment processing data", status: "Live" },
      { name: "HubSpot", icon: "🎪", description: "CRM and marketing automation", status: "Live" },
      { name: "Salesforce", icon: "☁️", description: "Customer relationship management", status: "Beta" },
      { name: "Slack", icon: "💬", description: "Team communication data", status: "Coming Soon" }
    ],
    files: [
      { name: "CSV/Excel", icon: "📊", description: "Spreadsheet file formats", status: "Live" },
      { name: "JSON", icon: "📋", description: "JavaScript Object Notation", status: "Live" },
      { name: "Parquet", icon: "📦", description: "Columnar storage format", status: "Live" },
      { name: "Avro", icon: "🥑", description: "Data serialization system", status: "Beta" },
      { name: "XML", icon: "📄", description: "Extensible Markup Language", status: "Live" },
      { name: "Apache Kafka", icon: "🚀", description: "Distributed streaming platform", status: "Beta" }
    ]
  };

  const categories = [
    { id: "databases", name: "Databases", icon: Database, count: integrations.databases.length },
    { id: "cloud", name: "Cloud Services", icon: Cloud, count: integrations.cloud.length },
    { id: "apis", name: "APIs & SaaS", icon: Code, count: integrations.apis.length },
    { id: "files", name: "File Formats", icon: Zap, count: integrations.files.length }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Live": "bg-green-500/10 text-green-600 border-green-500/20",
      "Beta": "bg-blue-500/10 text-blue-600 border-blue-500/20", 
      "Coming Soon": "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status === "Live" && <CheckCircle className="w-3 h-3 mr-1" />}
        {status}
      </Badge>
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Universal <span className="text-gradient">Data Connections</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Connect CyberG AI to any data source in minutes. Our comprehensive integration ecosystem 
              supports databases, cloud services, APIs, and file formats with real-time synchronization.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span>100+ Integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span>Real-time Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '300ms' }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "hero" : "glow"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-3 px-6 py-3"
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations[activeCategory as keyof typeof integrations].map((integration, index) => (
            <Card 
              key={index}
              className={`p-6 chart-container group hover:shadow-cyber transition-all duration-500 ${
                isVisible ? 'scale-in animate' : 'scale-in'
              }`}
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {integration.name}
                    </h3>
                    {getStatusBadge(integration.status)}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {integration.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {integration.status === "Live" && "✓ Production Ready"}
                  {integration.status === "Beta" && "🚧 Beta Testing"}
                  {integration.status === "Coming Soon" && "⏳ In Development"}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary p-2"
                  disabled={integration.status === "Coming Soon"}
                >
                  {integration.status === "Coming Soon" ? "Notify Me" : "Connect"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Setup Process */}
        <div className={`${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`} style={{ animationDelay: '800ms' }}>
          <Card className="p-8 lg:p-12 chart-container">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Connect in 3 Simple Steps</h3>
              <p className="text-muted-foreground">
                Setting up data connections with CyberG AI is designed to be fast and secure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto shadow-neon">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold">Choose Your Source</h4>
                <p className="text-sm text-muted-foreground">
                  Select from 100+ pre-built connectors or use our universal API
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto shadow-neon">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold">Authenticate Securely</h4>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with encrypted credentials and OAuth
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto shadow-neon">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold">Start Analyzing</h4>
                <p className="text-sm text-muted-foreground">
                  Instant data sync with real-time updates and AI-powered insights
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="hero" size="lg">
                <Database className="w-5 h-5" />
                Browse All Integrations
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Integration;