import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Line, Legend } from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, Activity, Zap, Target } from "lucide-react";

const ChartsShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeChart, setActiveChart] = useState("analytics");
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

  const barData = [
    { name: 'Q1', revenue: 4000, profit: 2400, growth: 24 },
    { name: 'Q2', revenue: 3000, profit: 1398, growth: 18 },
    { name: 'Q3', revenue: 6000, profit: 4800, growth: 42 },
    { name: 'Q4', revenue: 8000, profit: 6300, growth: 67 },
  ];

  const pieData = [
    { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Mobile', value: 35, color: 'hsl(var(--accent))' },
    { name: 'Tablet', value: 20, color: 'hsl(var(--chrome))' },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const radarData = [
    { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Scalability', A: 86, B: 130, fullMark: 150 },
    { subject: 'Reliability', A: 99, B: 100, fullMark: 150 },
    { subject: 'Innovation', A: 85, B: 90, fullMark: 150 },
    { subject: 'Cost', A: 65, B: 85, fullMark: 150 },
  ];

  const chartTypes = [
    {
      id: "analytics",
      title: "Revenue Analytics",
      description: "Track your business performance with interactive bar charts showing revenue, profit, and growth trends.",
      icon: BarChart3,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="growth" stroke="hsl(var(--destructive))" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
      )
    },
    {
      id: "distribution",
      title: "Traffic Distribution", 
      description: "Visualize user engagement across different platforms with beautiful pie charts and custom tooltips.",
      icon: PieIcon,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    {
      id: "correlation",
      title: "Performance Correlation",
      description: "Discover relationships between metrics with scatter plots that reveal hidden patterns in your data.",
      icon: Target,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis type="number" dataKey="x" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis type="number" dataKey="y" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter dataKey="z" fill="hsl(var(--primary))" />
          </ScatterChart>
        </ResponsiveContainer>
      )
    },
    {
      id: "comparison",
      title: "Multi-dimensional Analysis",
      description: "Compare multiple metrics simultaneously with radar charts for comprehensive performance evaluation.",
      icon: Activity,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <PolarRadiusAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Radar name="Current" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            <Radar name="Target" dataKey="B" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      )
    }
  ];

  const prompts = [
    "Create a revenue trend analysis for Q4 2024",
    "Show user engagement by demographics",
    "Compare conversion rates across channels", 
    "Visualize product performance metrics",
    "Display customer satisfaction scores",
    "Track marketing campaign effectiveness"
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-dots opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Turn Data into <span className="text-gradient">Stunning Charts</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Instantly create custom charts and diagrams with AI. Transform complex data into 
              beautiful visuals and powerful insights with natural language commands.
            </p>
          </div>
        </div>

        {/* Interactive Chart Generator */}
        <div className={`mb-16 ${isVisible ? 'scale-in animate' : 'scale-in'}`} style={{ animationDelay: '300ms' }}>
          <Card className="p-8 chart-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Natural Language to Charts</h3>
                <p className="text-muted-foreground mb-6">
                  Simply describe what you want to visualize, and CyberG AI will generate 
                  the perfect chart with your data in seconds.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Try these prompts:</div>
                  {prompts.map((prompt, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg text-sm hover:bg-muted transition-colors cursor-pointer group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-muted-foreground">{index + 1}.</span> {prompt}
                      <TrendingUp className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="hero" size="lg" className="flex-1">
                    <Zap className="w-5 h-5" />
                    Generate Chart
                  </Button>
                  <Button variant="glow" size="lg">
                    View Examples
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-glow rounded-xl blur-xl opacity-20" />
                <div className="relative bg-card rounded-xl p-6 border border-primary/20">
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <p>Your AI-generated chart will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart Types Showcase */}
        <div className={`${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`} style={{ animationDelay: '600ms' }}>
          <Tabs value={activeChart} onValueChange={setActiveChart} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-2 rounded-xl">
              {chartTypes.map((chart) => (
                <TabsTrigger 
                  key={chart.id} 
                  value={chart.id}
                  className="flex flex-col gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-cyber"
                >
                  <chart.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{chart.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {chartTypes.map((chart) => (
              <TabsContent key={chart.id} value={chart.id}>
                <Card className="p-8 chart-container">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center">
                          <chart.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{chart.title}</h3>
                          <div className="text-sm text-primary font-medium">Interactive & Animated</div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {chart.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Key Features:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Real-time data updates</li>
                          <li>• Custom color schemes</li>
                          <li>• Interactive tooltips</li>
                          <li>• Export capabilities</li>
                        </ul>
                      </div>
                      
                      <Button variant="cyber" className="w-full">
                        Explore This Chart Type
                      </Button>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevated">
                        {chart.component}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ChartsShowcase;