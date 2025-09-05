import { useEffect, useState, useRef } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

interface RealTimeChartProps {
  type?: 'line' | 'area' | 'bar' | 'pie';
  isVisible: boolean;
  height?: number;
  updateInterval?: number;
}

const RealTimeChart = ({ 
  type = 'area', 
  isVisible, 
  height = 320,
  updateInterval = 2000 
}: RealTimeChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [animationKey, setAnimationKey] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const dataPointsRef = useRef(0);

  // Initialize with base data
  useEffect(() => {
    const initialData = Array.from({ length: 12 }, (_, i) => ({
      name: `Data ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500,
      revenue: Math.floor(Math.random() * 5000) + 2000,
      users: Math.floor(Math.random() * 500) + 200,
      growth: Math.floor(Math.random() * 100) + 50,
      conversion: Math.floor(Math.random() * 10) + 5,
    }));
    setData(initialData);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!isVisible) return;

    const updateData = () => {
      setData(prevData => {
        const newData = prevData.map((item, index) => {
          // Create realistic fluctuations
          const variation = 0.1; // 10% variation
          const trend = Math.sin(dataPointsRef.current * 0.1 + index) * 0.05; // Trending effect
          
          return {
            ...item,
            value: Math.max(100, Math.floor(item.value * (1 + (Math.random() - 0.5) * variation + trend))),
            revenue: Math.max(1000, Math.floor(item.revenue * (1 + (Math.random() - 0.5) * variation + trend))),
            users: Math.max(50, Math.floor(item.users * (1 + (Math.random() - 0.5) * variation + trend))),
            growth: Math.max(10, Math.min(200, Math.floor(item.growth * (1 + (Math.random() - 0.5) * variation)))),
            conversion: Math.max(1, Math.min(20, item.conversion + (Math.random() - 0.5) * 2)),
          };
        });
        
        dataPointsRef.current += 1;
        return newData;
      });

      // Trigger re-animation
      setAnimationKey(prev => prev + 1);
    };

    // Initial update
    updateData();
    
    // Set up interval for continuous updates
    intervalRef.current = setInterval(updateData, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, updateInterval]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-cyber border border-primary/30 animate-fade-in">
          <p className="font-medium text-card-foreground mb-2 text-gradient">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full animate-pulse-glow"
                style={{ backgroundColor: entry.color }} 
              />
              <span className="font-medium">{entry.name}:</span>
              <span className="text-primary font-cyber">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                {entry.name.includes('conversion') && '%'}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-primary/20">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Live Data
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const pieColors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--chrome))'];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart key={animationKey} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6, className: 'animate-pulse-glow' }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart key={animationKey} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              animationDuration={1800}
            />
            <Bar 
              dataKey="growth" 
              fill="hsl(var(--accent))" 
              radius={[4, 4, 0, 0]}
              animationDuration={2200}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart key={animationKey}>
            <Pie
              data={data.slice(0, 4)}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              animationDuration={2000}
              animationEasing="ease-out"
            >
              {data.slice(0, 4).map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]}
                  className="animate-pulse-glow"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      default: // area
        return (
          <AreaChart key={animationKey} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorPrimary)"
              strokeWidth={3}
              animationDuration={1800}
              animationEasing="ease-out"
            />
            
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--accent))"
              fillOpacity={1}
              fill="url(#colorAccent)"
              strokeWidth={2}
              animationDuration={2200}
              animationEasing="ease-out"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="relative">
      {/* Live indicator */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <span className="text-xs font-medium text-card-foreground">LIVE</span>
      </div>
      
      {/* Chart container with glowing border */}
      <div 
        className={`p-6 rounded-lg chart-container transition-all duration-500 ${
          isVisible ? 'glow-primary shadow-cyber' : ''
        }`}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RealTimeChart;