
import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChurnProjectionData {
  month: string;
  rate: number | null;
  projected: number;
  confidenceLow?: number;
  confidenceHigh?: number;
}

interface FutureChurnProjectionChartProps {
  data: ChurnProjectionData[];
  modelVersion: string;
  confidenceLevel: string;
}

export function FutureChurnProjectionChart({ data, modelVersion, confidenceLevel }: FutureChurnProjectionChartProps) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">Future Churn Projection</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FilterX className="h-4 w-4" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
              </linearGradient>
              {modelVersion === 'v2' && (
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.05}/>
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
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
              formatter={(value: number) => [`${value}%`, null]}
            />
            {modelVersion === 'v2' && confidenceLevel !== 'low' && (
              <Area 
                type="monotone" 
                dataKey="confidenceHigh"
                strokeWidth={0}
                fillOpacity={0.2}
                stroke="transparent" 
                fill="url(#colorConfidence)" 
                name="Confidence Upper"
              />
            )}
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke="#64748b" 
              strokeWidth={2}
              fill="#e2e8f0"
              name="Historical Rate"
            />
            <Area 
              type="monotone" 
              dataKey="projected" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              fill="url(#colorProjected)" 
              fillOpacity={1}
              name="Projected Rate"
            />
            {modelVersion === 'v2' && confidenceLevel !== 'low' && (
              <Area 
                type="monotone" 
                dataKey="confidenceLow"
                strokeWidth={0}
                fillOpacity={0}
                stroke="transparent" 
                fill="url(#colorConfidence)" 
                name="Confidence Lower"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {modelVersion === 'v2' && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 w-3 bg-blue-500/20 rounded"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400">
            {confidenceLevel === 'high' 
              ? '95% confidence interval' 
              : confidenceLevel === 'medium' 
                ? '80% confidence interval' 
                : 'Confidence interval hidden'}
          </span>
        </div>
      )}
    </div>
  );
}
