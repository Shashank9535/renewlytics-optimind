
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface RetentionData {
  date: string;
  value: number;
}

interface CustomerRetentionChartProps {
  data: RetentionData[];
  className?: string;
}

export function CustomerRetentionChart({ data, className }: CustomerRetentionChartProps) {
  const formatXAxis = (value: string) => {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className={cn("h-72", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`${value}%`, 'Retention Rate']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              });
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0ea5e9" 
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
            dot={{ r: 3, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
