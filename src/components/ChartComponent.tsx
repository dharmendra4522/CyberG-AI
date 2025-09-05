import { useEffect, useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface ChartComponentProps {
  isVisible: boolean;
}

const ChartComponent = ({ isVisible }: ChartComponentProps) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isVisible]);

  const data = [
    { name: 'Jan', value: 400, revenue: 2400, users: 240 },
    { name: 'Feb', value: 300, revenue: 1398, users: 221 },
    { name: 'Mar', value: 600, revenue: 9800, users: 290 },
    { name: 'Apr', value: 800, revenue: 3908, users: 320 },
    { name: 'May', value: 700, revenue: 4800, users: 350 },
    { name: 'Jun', value: 900, revenue: 3800, users: 380 },
    { name: 'Jul', value: 1200, revenue: 4300, users: 410 },
    { name: 'Aug', value: 1400, revenue: 5200, users: 450 },
    { name: 'Sep', value: 1100, revenue: 4900, users: 430 },
    { name: 'Oct', value: 1600, revenue: 6100, users: 480 },
    { name: 'Nov', value: 1800, revenue: 7200, users: 520 },
    { name: 'Dec', value: 2000, revenue: 8500, users: 550 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-4 rounded-lg shadow-cyber border border-primary/20 backdrop-blur-sm">
          <p className="font-medium text-card-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart key={animationKey} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
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
            animationDuration={2000}
          />
          
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
            animationDuration={2500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;