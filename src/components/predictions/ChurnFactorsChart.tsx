
import { PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ChurnFactor {
  subject: string;
  A: number;
  fullMark: number;
}

interface ChurnFactorsChartProps {
  data: ChurnFactor[];
  modelVersion: string;
}

export function ChurnFactorsChart({ data, modelVersion }: ChurnFactorsChartProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <PieChart className="h-5 w-5 text-purple-500" />
          <h3 className="font-medium">Top Churn Factors</h3>
        </div>
        <Badge variant={modelVersion === 'v2' ? "default" : "outline"} className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800/50">
          {modelVersion === 'v2' ? "8 factors" : "6 factors"}
        </Badge>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              tick={{ fill: '#64748b', fontSize: 10 }}
              domain={[0, 100]}
            />
            <Radar
              name="Impact Score"
              dataKey="A"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [`${value}%`, 'Impact Score']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {modelVersion === 'v2' 
            ? "Enhanced model identifies additional factors like competitor activity and industry changes that affect churn."
            : "These factors have the strongest correlation with customer churn based on our predictive model analysis."
          }
        </p>
      </div>
    </div>
  );
}
