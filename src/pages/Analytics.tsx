
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';

const Analytics = () => {
  // Sample data for charts
  const monthlyChurnData = [
    { month: 'Jan', rate: 3.1, industry: 4.5 },
    { month: 'Feb', rate: 3.4, industry: 4.4 },
    { month: 'Mar', rate: 3.2, industry: 4.3 },
    { month: 'Apr', rate: 2.9, industry: 4.4 },
    { month: 'May', rate: 3.0, industry: 4.2 },
    { month: 'Jun', rate: 3.2, industry: 4.3 },
    { month: 'Jul', rate: 3.1, industry: 4.2 },
    { month: 'Aug', rate: 2.8, industry: 4.1 },
    { month: 'Sep', rate: 2.7, industry: 4.0 },
    { month: 'Oct', rate: 2.5, industry: 4.0 },
    { month: 'Nov', rate: 2.7, industry: 3.9 },
    { month: 'Dec', rate: 2.8, industry: 3.9 },
  ];

  const retentionCohortData = [
    { month: 'Month 0', cohort1: 100, cohort2: 100, cohort3: 100 },
    { month: 'Month 1', cohort1: 85, cohort2: 87, cohort3: 92 },
    { month: 'Month 2', cohort1: 74, cohort2: 78, cohort3: 86 },
    { month: 'Month 3', cohort1: 65, cohort2: 70, cohort3: 81 },
    { month: 'Month 4', cohort1: 60, cohort2: 64, cohort3: 77 },
    { month: 'Month 5', cohort1: 55, cohort2: 59, cohort3: 74 },
    { month: 'Month 6', cohort1: 53, cohort2: 56, cohort3: 71 },
  ];

  const engagementData = [
    { category: 'Feature A', usage: 82 },
    { category: 'Feature B', usage: 65 },
    { category: 'Feature C', usage: 47 },
    { category: 'Feature D', usage: 53 },
    { category: 'Feature E', usage: 38 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Detailed analysis of retention metrics and customer behavior
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-up">
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-4">Monthly Churn Rate vs. Industry Average</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyChurnData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  name="Your Churn Rate" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="industry" 
                  name="Industry Average" 
                  stroke="#94a3b8" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-4">Cohort Retention Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={retentionCohortData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cohort1" 
                  name="Q1 2023 Cohort" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: 'white', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cohort2" 
                  name="Q2 2023 Cohort" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cohort3" 
                  name="Q3 2023 Cohort" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-4">Feature Usage by Retained vs. Churned Users</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  type="number"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  dataKey="category"
                  type="category"
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
                  formatter={(value: number) => [`${value}%`, 'Usage Rate']}
                />
                <Bar 
                  dataKey="usage" 
                  fill="#0ea5e9" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-4">Customer Lifetime Journey</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyChurnData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
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
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                  name="Engagement Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
