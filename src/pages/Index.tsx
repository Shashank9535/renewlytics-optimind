
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChurnRiskChart } from '@/components/dashboard/ChurnRiskChart';
import { CircularProgress } from '@/components/dashboard/CircularProgress';
import { CustomerRetentionChart } from '@/components/dashboard/CustomerRetentionChart';
import { SegmentDistributionChart } from '@/components/dashboard/SegmentDistributionChart';
import { AtRiskCustomersTable } from '@/components/dashboard/AtRiskCustomersTable';
import { UploadCsvCard } from '@/components/dashboard/UploadCsvCard';
import { ActionableInsightsCard } from '@/components/dashboard/ActionableInsightsCard';
import { 
  BadgeCheck, 
  Users, 
  AlertTriangle, 
  Zap, 
  Brain, 
  Target, 
  Activity,
  Gauge,
  LineChart,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Sample data for charts and tables
  const churnRiskData = [
    { name: 'High Risk', value: 15, color: '#f43f5e' },
    { name: 'Medium Risk', value: 30, color: '#f59e0b' },
    { name: 'Low Risk', value: 55, color: '#10b981' },
  ];

  const retentionData = [
    { date: '2023-05-01', value: 97 },
    { date: '2023-05-08', value: 96 },
    { date: '2023-05-15', value: 95 },
    { date: '2023-05-22', value: 93 },
    { date: '2023-05-29', value: 94 },
    { date: '2023-06-05', value: 92 },
    { date: '2023-06-12', value: 90 },
    { date: '2023-06-19', value: 91 },
    { date: '2023-06-26', value: 89 },
    { date: '2023-07-03', value: 90 },
  ];

  const segmentData = [
    { name: 'Active', value: 450, color: '#10b981' },
    { name: 'At Risk', value: 120, color: '#f59e0b' },
    { name: 'Churned', value: 85, color: '#f43f5e' },
    { name: 'New Users', value: 165, color: '#0ea5e9' },
  ];

  const atRiskCustomers = [
    {
      id: '1',
      name: 'Jane Cooper',
      email: 'jane@example.com',
      churnRisk: 'high' as 'high',
      churnReason: 'Payment failures, low usage',
      lastActive: '2 days ago',
    },
    {
      id: '2',
      name: 'Alex Morgan',
      email: 'alex@example.com',
      churnRisk: 'high' as 'high',
      churnReason: 'Feature complaints, support tickets',
      lastActive: '4 days ago',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael@example.com',
      churnRisk: 'medium' as 'medium',
      churnReason: 'Decreasing usage, missed payments',
      lastActive: '1 day ago',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      churnRisk: 'medium' as 'medium',
      churnReason: 'Engagement drop, negative feedback',
      lastActive: '3 days ago',
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert@example.com',
      churnRisk: 'low' as 'low',
      churnReason: 'Slight engagement drop',
      lastActive: 'Today',
    },
  ];

  const insights = [
    {
      id: '1',
      title: 'Payment Failure Patterns Detected',
      description: 'Users with payment failures have a 68% higher churn rate. Consider implementing pre-dunning notifications.',
      priority: 'high' as 'high',
      action: 'Setup Payment Reminders',
    },
    {
      id: '2',
      title: 'Feature Adoption Gap Identified',
      description: 'Customers aren\'t using key features that increase retention. Implement onboarding improvements.',
      priority: 'medium' as 'medium',
      action: 'Launch Feature Tutorials',
    },
    {
      id: '3',
      title: 'Pricing Tier Optimization',
      description: 'Mid-tier plan shows highest retention. Consider adjusting features in lower tier plans.',
      priority: 'low' as 'low',
      action: 'View Pricing Analysis',
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="enterprise-heading">Customer Retention Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              AI-powered insights to help you reduce churn and increase retention
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <LineChart className="h-4 w-4" />
              Reports
            </Button>
            <Button className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Take Action
            </Button>
          </div>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Customers"
          value="820"
          icon={Users}
          trend={5.2}
          trendLabel="vs last month"
          className="enterprise-card"
        />
        <StatCard
          title="Retention Rate"
          value="89%"
          icon={BadgeCheck}
          trend={-2.1}
          trendLabel="vs last month"
          valueClassName="text-primary"
          className="enterprise-card"
        >
          <CustomerRetentionChart 
            data={retentionData.slice(-5)} 
            className="h-14 mt-2" 
          />
        </StatCard>
        <StatCard
          title="At-Risk Customers"
          value="45"
          icon={AlertTriangle}
          trend={12.8}
          trendLabel="vs last month"
          valueClassName="text-amber-600 dark:text-amber-500"
          className="enterprise-card"
        />
        <StatCard
          title="Churn Rate"
          value="3.2%"
          icon={Zap}
          trend={-0.8}
          trendLabel="vs last month"
          valueClassName="text-emerald-600 dark:text-emerald-500"
          className="enterprise-card"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* First column */}
        <div className="space-y-8">
          <div className="enterprise-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-slate-900 dark:text-white">Churn Risk Distribution</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
            <ChurnRiskChart data={churnRiskData} />
            <div className="grid grid-cols-3 gap-2 mt-6">
              {churnRiskData.map((item) => (
                <div key={item.name} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-400">{item.name}</p>
                  <p className="text-sm font-medium">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
          <UploadCsvCard className="enterprise-card" />
        </div>

        {/* Second column */}
        <div className="space-y-8">
          <div className="enterprise-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-slate-900 dark:text-white">Customer Retention Trend</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">Last 90 Days</Button>
            </div>
            <CustomerRetentionChart data={retentionData} />
          </div>
          <div className="enterprise-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-slate-900 dark:text-white">Customer Segments</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
            </div>
            <SegmentDistributionChart data={segmentData} />
          </div>
        </div>

        {/* Third column */}
        <div className="space-y-8">
          <div className="enterprise-card p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-slate-900 dark:text-white">AI Prediction Accuracy</h3>
            </div>
            <div className="flex justify-center mb-4">
              <CircularProgress 
                value={92} 
                label="Accuracy" 
                color="stroke-primary" 
                size={120} 
                className="transform transition-all hover:scale-105"
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Based on historical churn predictions vs. actual results
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full">View Prediction History</Button>
          </div>
          <ActionableInsightsCard insights={insights} className="enterprise-card" />
        </div>
      </div>

      {/* At-risk customers table */}
      <div className="mt-8">
        <AtRiskCustomersTable customers={atRiskCustomers} className="enterprise-card" />
      </div>
      
      {/* Success stories section */}
      <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Customer Success Stories</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Acme Corp</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
              Reduced churn by 63% in just 3 months using Renewlytics predictive analytics.
            </p>
            <Button variant="link" className="p-0 h-auto justify-start text-primary">Read Case Study →</Button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">TechGiant Inc</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
              Improved customer lifetime value by 47% with automated retention campaigns.
            </p>
            <Button variant="link" className="p-0 h-auto justify-start text-primary">Read Case Study →</Button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">StartupHQ</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
              Saved $250K in annual revenue by identifying high-risk customers early.
            </p>
            <Button variant="link" className="p-0 h-auto justify-start text-primary">Read Case Study →</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
