
import { useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface SegmentForecast {
  segment: string;
  current: number;
  forecast30: number;
  forecast60: number;
  forecast90: number;
}

interface CustomerSegmentForecastProps {
  data: SegmentForecast[];
  timeFrame: string;
  setTimeFrame: (timeFrame: string) => void;
}

export function CustomerSegmentForecast({ data, timeFrame, setTimeFrame }: CustomerSegmentForecastProps) {
  const selectedForecast = data.map(item => ({
    segment: item.segment,
    current: item.current,
    forecast: timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90,
    change: ((timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90) - item.current) / item.current * 100
  }));

  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Customer Segment Forecast</h3>
          <Tabs defaultValue="30" value={timeFrame} onValueChange={setTimeFrame}>
            <TabsList>
              <TabsTrigger value="30">30 Days</TabsTrigger>
              <TabsTrigger value="60">60 Days</TabsTrigger>
              <TabsTrigger value="90">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          How your customer segments are predicted to change over the next {timeFrame} days
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedForecast.map((item) => (
          <div key={item.segment} className="border border-slate-100 dark:border-slate-800 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{item.segment}</h4>
              <Badge 
                variant="outline" 
                className={item.change > 0 
                  ? (item.segment === 'At Risk' || item.segment === 'Churned' || item.segment === 'Need Attention'
                    ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300'
                    : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300')
                  : (item.segment === 'At Risk' || item.segment === 'Churned' || item.segment === 'Need Attention'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300')}
              >
                {item.change > 0 
                  ? <TrendingUp className="h-3 w-3 mr-1 inline-block" /> 
                  : <TrendingDown className="h-3 w-3 mr-1 inline-block" />}
                {Math.abs(item.change).toFixed(1)}%
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Current</div>
                <div className="text-xl font-bold">{item.current}</div>
              </div>
              <div className="text-slate-300 dark:text-slate-700">→</div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Forecast</div>
                <div className="text-xl font-bold">{item.forecast}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
