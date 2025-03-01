
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FilterX, RefreshCw, Calendar, TrendingDown, TrendingUp, Brain, InfoIcon, LineChart as LineChartIcon, PieChart, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ActionableInsightsCard } from '@/components/dashboard/ActionableInsightsCard';

const Predictions = () => {
  const [timeFrame, setTimeFrame] = useState('30');
  const [modelVersion, setModelVersion] = useState('v2');
  const [confidenceLevel, setConfidenceLevel] = useState('high');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample prediction data
  const churnPredictionData = {
    v1: [
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
    ],
    v2: [
      { name: 'Week 1', actual: 12, predicted: 12.2 },
      { name: 'Week 2', actual: 15, predicted: 15.1 },
      { name: 'Week 3', actual: 18, predicted: 17.8 },
      { name: 'Week 4', actual: 14, predicted: 14.3 },
      { name: 'Week 5', actual: 21, predicted: 20.8 },
      { name: 'Week 6', actual: 25, predicted: 24.9 },
      { name: 'Week 7', actual: 22, predicted: 22.1 },
      { name: 'Week 8', actual: 19, predicted: 19.2 },
      { name: 'Week 9', actual: 17, predicted: 16.9 },
      { name: 'Week 10', actual: 16, predicted: 16.2 },
      { name: 'Week 11', actual: 15, predicted: 15.0 },
      { name: 'Week 12', actual: 14, predicted: 13.9 },
    ]
  };

  const churnFactorsData = {
    v1: [
      { subject: 'Inactivity', A: 85, fullMark: 100 },
      { subject: 'Payment Issues', A: 65, fullMark: 100 },
      { subject: 'Support Tickets', A: 42, fullMark: 100 },
      { subject: 'Feature Usage', A: 35, fullMark: 100 },
      { subject: 'Seasonality', A: 25, fullMark: 100 },
      { subject: 'Price Sensitivity', A: 58, fullMark: 100 },
    ],
    v2: [
      { subject: 'Inactivity', A: 87, fullMark: 100 },
      { subject: 'Payment Issues', A: 72, fullMark: 100 },
      { subject: 'Support Tickets', A: 53, fullMark: 100 },
      { subject: 'Feature Usage', A: 41, fullMark: 100 },
      { subject: 'Seasonality', A: 38, fullMark: 100 },
      { subject: 'Price Sensitivity', A: 64, fullMark: 100 },
      { subject: 'Competitor Activity', A: 59, fullMark: 100 },
      { subject: 'Industry Changes', A: 47, fullMark: 100 },
    ]
  };

  const futureChurnData = {
    v1: [
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
    ],
    v2: [
      { month: 'Jan', rate: 3.2, projected: 3.2, confidenceLow: 3.1, confidenceHigh: 3.3 },
      { month: 'Feb', rate: 3.4, projected: 3.4, confidenceLow: 3.3, confidenceHigh: 3.5 },
      { month: 'Mar', rate: 3.1, projected: 3.1, confidenceLow: 3.0, confidenceHigh: 3.2 },
      { month: 'Apr', rate: 2.9, projected: 2.9, confidenceLow: 2.8, confidenceHigh: 3.0 },
      { month: 'May', rate: 3.0, projected: 3.0, confidenceLow: 2.9, confidenceHigh: 3.1 },
      { month: 'Jun', rate: 3.2, projected: 3.2, confidenceLow: 3.1, confidenceHigh: 3.3 },
      { month: 'Jul', rate: null, projected: 2.9, confidenceLow: 2.7, confidenceHigh: 3.1 },
      { month: 'Aug', rate: null, projected: 2.7, confidenceLow: 2.5, confidenceHigh: 2.9 },
      { month: 'Sep', rate: null, projected: 2.5, confidenceLow: 2.3, confidenceHigh: 2.7 },
      { month: 'Oct', rate: null, projected: 2.4, confidenceLow: 2.2, confidenceHigh: 2.6 },
      { month: 'Nov', rate: null, projected: 2.6, confidenceLow: 2.4, confidenceHigh: 2.8 },
      { month: 'Dec', rate: null, projected: 2.8, confidenceLow: 2.6, confidenceHigh: 3.0 },
    ]
  };

  const customerSegmentForecast = {
    v1: [
      { segment: 'New Users', current: 120, forecast30: 140, forecast60: 160, forecast90: 175 },
      { segment: 'Active Users', current: 450, forecast30: 460, forecast60: 475, forecast90: 490 },
      { segment: 'At Risk', current: 85, forecast30: 75, forecast60: 65, forecast90: 60 },
      { segment: 'Churned', current: 65, forecast30: 70, forecast60: 75, forecast90: 80 },
    ],
    v2: [
      { segment: 'New Users', current: 120, forecast30: 146, forecast60: 168, forecast90: 185 },
      { segment: 'Active Users', current: 450, forecast30: 473, forecast60: 492, forecast90: 512 },
      { segment: 'At Risk', current: 85, forecast30: 68, forecast60: 57, forecast90: 51 },
      { segment: 'Churned', current: 65, forecast30: 63, forecast60: 61, forecast90: 59 },
      { segment: 'Champions', current: 42, forecast30: 48, forecast60: 54, forecast90: 61 },
      { segment: 'Need Attention', current: 78, forecast30: 72, forecast60: 66, forecast90: 59 },
    ]
  };

  const selectedForecast = customerSegmentForecast[modelVersion].map(item => ({
    segment: item.segment,
    current: item.current,
    forecast: timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90,
    change: ((timeFrame === '30' ? item.forecast30 : timeFrame === '60' ? item.forecast60 : item.forecast90) - item.current) / item.current * 100
  }));

  const accuracyMetrics = {
    v1: {
      accuracy: 92.4,
      improvement: 0,
      forecastedReduction: 15.2
    },
    v2: {
      accuracy: 97.8,
      improvement: 5.4,
      forecastedReduction: 21.7
    }
  };

  const actionableInsights = [
    {
      id: "1",
      title: "Offer discounts to at-risk enterprise customers",
      description: "15 enterprise customers are showing early churn signals based on decreased feature usage.",
      priority: "high" as "high",
      action: "Create Targeted Campaign"
    },
    {
      id: "2",
      title: "Improve onboarding for new mobile app users",
      description: "Mobile app users are 3.2x more likely to churn in the first 30 days due to incomplete onboarding.",
      priority: "medium" as "medium",
      action: "Review Onboarding Flow"
    },
    {
      id: "3",
      title: "Schedule QBRs with customers approaching renewal",
      description: "64 customers have renewal dates within the next 45 days with no scheduled reviews.",
      priority: "medium" as "medium",
      action: "Plan QBR Schedule"
    }
  ];

  const handleRefreshPredictions = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh predictions
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Predictions refreshed",
        description: "AI models have been retrained with latest data.",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">AI Predictions</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Forward-looking analysis based on our machine learning models
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">AI Model Version</div>
            <div className="flex items-center gap-2">
              <Select value={modelVersion} onValueChange={setModelVersion}>
                <SelectTrigger className="w-[120px] h-7 text-xs border-blue-200 dark:border-blue-800">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Version 1.0</SelectItem>
                  <SelectItem value="v2">Version 2.0 (Latest)</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 h-5 text-xs">
                {modelVersion === 'v2' ? 'Enhanced ML' : 'Base ML'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Confidence level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Confidence</SelectItem>
              <SelectItem value="medium">Medium Confidence</SelectItem>
              <SelectItem value="high">High Confidence</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleRefreshPredictions} disabled={isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>Refresh Predictions</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Last 90 Days</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up">
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
                data={churnPredictionData[modelVersion]}
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
                  strokeDasharray={modelVersion === 'v1' ? "5 5" : "0 0"}
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
                {accuracyMetrics[modelVersion].accuracy}%
              </div>
              <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">
                Based on historical predictions vs. actual results
              </div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
              <div className="text-sm text-amber-800 dark:text-amber-300 font-medium">Accuracy Improvement</div>
              <div className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-400">
                +{accuracyMetrics[modelVersion].improvement}%
              </div>
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-500">
                Compared to previous model version
              </div>
            </div>
            <div className="p-4 rounded-lg bg-renewal-50 dark:bg-renewal-950/30 border border-renewal-100 dark:border-renewal-900/50">
              <div className="text-sm text-renewal-800 dark:text-renewal-300 font-medium">Forecasted Churn Reduction</div>
              <div className="mt-1 text-2xl font-bold text-renewal-700 dark:text-renewal-400">
                {accuracyMetrics[modelVersion].forecastedReduction}%
              </div>
              <div className="mt-2 text-xs text-renewal-600 dark:text-renewal-500">
                Expected after implementing AI recommendations
              </div>
            </div>
          </div>
        </div>

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
              <RadarChart outerRadius={90} data={churnFactorsData[modelVersion]}>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
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
                data={futureChurnData[modelVersion]}
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
        
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <ActionableInsightsCard insights={actionableInsights} className="border-0 shadow-none p-0" />
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
            {modelVersion === 'v2' && ' with enhanced accuracy'}
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
    </DashboardLayout>
  );
};

export default Predictions;
