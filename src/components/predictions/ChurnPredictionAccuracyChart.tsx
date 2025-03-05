
import { LineChartIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChurnPredictionData {
  name: string;
  actual: number;
  predicted: number;
}

interface AccuracyMetrics {
  accuracy: number;
  improvement: number;
  forecastedReduction: number;
}

interface ChurnPredictionAccuracyChartProps {
  data: ChurnPredictionData[];
  metrics: AccuracyMetrics;
}

export function ChurnPredictionAccuracyChart({ data, metrics }: ChurnPredictionAccuracyChartProps) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <LineChartIcon className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Churn Prediction Accuracy</h3>
          <Button size="sm" variant="outline" className="h-6 px-2 rounded-full text-xs gap-1">
            <InfoIcon className="h-3 w-3" />
            <span>Info</span>
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
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
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              name="Actual Churn" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
              dot={{ r: 4, fill: 'white', stroke: '#0ea5e9', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              name="Predicted Churn" 
              stroke="#f59e0b" 
              strokeWidth={3}
              strokeDasharray={data.length > 0 && data[0].predicted % 1 !== 0 ? "0 0" : "5 5"}
              activeDot={{ r: 6, fill: '#f59e0b', stroke: 'white', strokeWidth: 2 }}
              dot={{ r: 4, fill: 'white', stroke: '#f59e0b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
          <div className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">Prediction Accuracy</div>
          <div className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {metrics.accuracy}%
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">
            Based on historical predictions vs. actual results
          </div>
        </div>
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
          <div className="text-sm text-amber-800 dark:text-amber-300 font-medium">Accuracy Improvement</div>
          <div className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-400">
            +{metrics.improvement}%
          </div>
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-500">
            Compared to previous model version
          </div>
        </div>
        <div className="p-4 rounded-lg bg-renewal-50 dark:bg-renewal-950/30 border border-renewal-100 dark:border-renewal-900/50">
          <div className="text-sm text-renewal-800 dark:text-renewal-300 font-medium">Forecasted Churn Reduction</div>
          <div className="mt-1 text-2xl font-bold text-renewal-700 dark:text-renewal-400">
            {metrics.forecastedReduction}%
          </div>
          <div className="mt-2 text-xs text-renewal-600 dark:text-renewal-500">
            Expected after implementing AI recommendations
          </div>
        </div>
      </div>
    </div>
  );
}
