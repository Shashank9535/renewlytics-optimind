
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Calendar, RefreshCw, BarChart3, LineChart as LineChartIcon, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

export function SelfLearningAI() {
  const [timeframe, setTimeframe] = useState('90');
  const [isLoading, setIsLoading] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState('high');
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "AI model retrained",
        description: "Models have been updated with the latest data patterns.",
      });
    }, 2000);
  };
  
  // Sample data for demonstration
  const modelImprovementData = [
    { month: 'Jan', accuracy: 85, baseline: 85 },
    { month: 'Feb', accuracy: 86, baseline: 85 },
    { month: 'Mar', accuracy: 89, baseline: 84 },
    { month: 'Apr', accuracy: 91, baseline: 85 },
    { month: 'May', accuracy: 93, baseline: 85 },
    { month: 'Jun', accuracy: 94, baseline: 86 },
  ];
  
  const predictionCategoriesData = [
    { category: 'Churn Risk', accuracy: 94, sampleSize: 1250 },
    { category: 'Renewal Likelihood', accuracy: 91, sampleSize: 980 },
    { category: 'Upsell Potential', accuracy: 89, sampleSize: 720 },
    { category: 'Support Demand', accuracy: 87, sampleSize: 550 },
    { category: 'Feature Adoption', accuracy: 92, sampleSize: 840 },
  ];
  
  const featureImportanceData = [
    { name: 'Usage Frequency', value: 92 },
    { name: 'Payment History', value: 87 },
    { name: 'Support Tickets', value: 75 },
    { name: 'Time Since Last Login', value: 89 },
    { name: 'Feature Engagement', value: 93 },
    { name: 'Account Age', value: 64 },
  ];

  return (
    <Card className="shadow-md border border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Self-Learning AI Models
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                Enterprise
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              AI models that improve predictions by learning from new data patterns
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">6 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>Retrain Models</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="model-improvement" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="model-improvement" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Accuracy Improvement</span>
            </TabsTrigger>
            <TabsTrigger value="prediction-categories" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span>Prediction Categories</span>
            </TabsTrigger>
            <TabsTrigger value="feature-importance" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Feature Importance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="model-improvement" className="mt-0">
            <div className="h-80">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={modelImprovementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      domain={[80, 100]}
                      tick={{ fill: '#64748b', fontSize: 12 }}
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
                      }}
                      formatter={(value: number) => [`${value}%`, null]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="baseline" 
                      stroke="#94a3b8" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      name="Baseline Model" 
                      dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Self-learning Model" 
                      dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      activeDot={{ r: 6, fill: '#8b5cf6', stroke: 'white', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
              <span>Self-learning models show {timeframe === '90' ? '9%' : timeframe === '180' ? '11%' : '7%'} improvement in prediction accuracy over static models</span>
            </div>
          </TabsContent>
          
          <TabsContent value="prediction-categories" className="mt-0">
            <div className="h-80">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={predictionCategoriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="category" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      domain={[50, 100]}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                      domain={[0, 'dataMax + 200']}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'accuracy' ? `${value}%` : value, 
                        name === 'accuracy' ? 'Accuracy' : 'Sample Size'
                      ]}
                    />
                    <Bar 
                      dataKey="accuracy" 
                      yAxisId="left"
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]}
                      name="Accuracy"
                    />
                    <Bar 
                      dataKey="sampleSize" 
                      yAxisId="right"
                      fill="#c4b5fd" 
                      radius={[4, 4, 0, 0]}
                      name="Sample Size"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="feature-importance" className="mt-0">
            <div className="h-80">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={featureImportanceData}
                    margin={{ top: 20, right: 30, left: 100, bottom: 10 }}
                    barSize={24}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      type="number"
                      domain={[0, 100]}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Importance']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#8b5cf6" 
                      radius={[0, 4, 4, 0]}
                      name="Importance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Feature importance shows which data points have the strongest impact on prediction accuracy. 
              These weights are automatically adjusted as the model learns from new data.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
