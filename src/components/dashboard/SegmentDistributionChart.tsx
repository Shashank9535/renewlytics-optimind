
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface SegmentData {
  name: string;
  value: number;
  color: string;
}

interface SegmentDistributionChartProps {
  data: SegmentData[];
  className?: string;
}

export function SegmentDistributionChart({ data, className }: SegmentDistributionChartProps) {
  return (
    <div className={cn("h-72", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="name" 
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`${value} users`, null]}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
