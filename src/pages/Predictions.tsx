
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FilterX, RefreshCw, Calendar, TrendingDown, TrendingUp } from 'lucide-react';

const Predictions = () => {
  const [timeFrame, setTimeFrame] = useState('30');

  // Sample prediction data
  const churnPredictionData = [
    { name: 'Week 1', actual: 12, predicted: 14 },
    { name: 'Week 2', actual: 15, predicted: 16 },
    { name: 'Week 3', actual: 18, predicted: 19 },
    { name: 'Week 4', actual: 14, predicted: 15 },
    { name: 'Week 5', actual: 21, predicted: 20 },
    { name: 'Week 6', actual: 25, predicted: 24 },
    { name: 'Week 7', actual: 22, predicted: 21 },
    { name: 'Week 8', actual: 19, predicted: 20 },
    { name: 'Week 9', actual: 17, predicted: 18 },
    { name: 'Week 10', actual: 16, predicted: 17 },
    { name: 'Week 11', actual: 15, predicted: 15 },
    { name: 'Week 12', actual: 14, predicted: 13 },
  ];

  const churnFactorsData = [
    { subject: 'Inactivity', A: 85, fullMark: 100 },
    { subject: 'Payment Issues', A: 65, fullMark: 100 },
    { subject: 'Support Tickets', A: 42, fullMark: 100 },
    { subject: 'Feature Usage', A: 35, fullMark: 100 },
    { subject: 'Seasonality', A: 25, fullMark: 100 },
    { subject: 'Price Sensitivity', A: 58, fullMark: 100 },
  ];

  const futureChurnData = [
    { month: 'Jan', rate: 3.2, projected: 3.2 },
    { month: 'Feb', rate: 3.4, projected: 3.4 },
    { month: 'Mar', rate: 3.1, projected: 3.1 },
    { month: 'Apr', rate: 2.9, projected: 2.9 },
    { month: 'May', rate: 3.0, projected: 3.0 },
    { month: 'Jun', rate: 3.2, projected: 3.2 },
    { month: 'Jul', rate: null, projected: 3.0 },
    { month: 'Aug', rate: null, projected: 2.8 },
    { month: 'Sep', rate: null, projected: 2.7 },
    { month: 'Oct', rate: null, projected: 2.6 },
    { month: 'Nov', rate: null, projected: 2.8 },
    { month: 'Dec', rate: null, projected: 3.0 },
  ];

  const customerSegmentForecast = [
    { segment: 'New Users', current: 120, forecast30: 140, forecast60: 160, forecast90: 175 },
    { segment: 'Active Users', current: 450, forecast30: 460, forecast60: 475, forecast90: 490 },
    { segment: 'At Risk', current: 85, forecast30: 75, forecast60: 65, forecast90: 60 },
    { segment: 'Churned', current: 65, forecast30: 70, forecast60: 75, forecast90: 80 },
  ];

  const selectedForecast = customerSegmentForecast.map(item => ({
    segment: item.segment,
    current: item.current,
    forecast: timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90,
    change: ((timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90) - item.current) / item.current * 100
  }));

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">AI Predictions</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Forward-looking analysis based on our machine learning models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up">
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium">Churn Prediction Accuracy</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last 90 Days</span>
              </Button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={churnPredictionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
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
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Churn" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Predicted Churn" 
                  stroke="#f59e0b" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <div className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">Prediction Accuracy</div>
              <div className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">92.4%</div>
              <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">Based on historical predictions vs. actual results</div>
            </div>
            <div className="p-4 rounded-lg bg-renewal-50 dark:bg-renewal-950/30 border border-renewal-100 dark:border-renewal-900/50">
              <div className="text-sm text-renewal-800 dark:text-renewal-300 font-medium">Forecasted Churn Reduction</div>
              <div className="mt-1 text-2xl font-bold text-renewal-700 dark:text-renewal-400">15.2%</div>
              <div className="mt-2 text-xs text-renewal-600 dark:text-renewal-500">Expected after implementing AI recommendations</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-6">Top Churn Factors</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={churnFactorsData}>
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
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
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
              These factors have the strongest correlation with customer churn based on our predictive model analysis.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
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
                data={futureChurnData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                  </linearGradient>
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
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 animate-fade-up" style={{ animationDelay: '300ms' }}>
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
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {selectedForecast.map((item) => (
            <div key={item.segment} className="border border-slate-100 dark:border-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{item.segment}</h4>
                <Badge 
                  variant="outline" 
                  className={item.change > 0 
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' 
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300'}
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
    </DashboardLayout>
  );
};

export default Predictions;
