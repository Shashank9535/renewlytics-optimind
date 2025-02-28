
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { Filter, Users, DownloadCloud, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

const Segments = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample user segments
  const userSegments = [
    { id: 1, name: 'Active Power Users', count: 245, color: '#10b981', tag: 'active' },
    { id: 2, name: 'At-Risk (Payment Issues)', count: 68, color: '#f59e0b', tag: 'at-risk' },
    { id: 3, name: 'At-Risk (Low Engagement)', count: 57, color: '#f59e0b', tag: 'at-risk' },
    { id: 4, name: 'Churned Last Month', count: 32, color: '#f43f5e', tag: 'churned' },
    { id: 5, name: 'New Signups (< 30 days)', count: 105, color: '#0ea5e9', tag: 'new' },
    { id: 6, name: 'Premium Plan', count: 186, color: '#10b981', tag: 'active' },
    { id: 7, name: 'Basic Plan', count: 243, color: '#10b981', tag: 'active' }
  ];

  const filteredSegments = activeTab === 'all' 
    ? userSegments 
    : userSegments.filter(segment => segment.tag === activeTab);

  // Sample users data
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', plan: 'Premium', status: 'active', activity: 'High', risk: 'Low' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Basic', status: 'at-risk', activity: 'Low', risk: 'High' },
    { id: 3, name: 'Michael Williams', email: 'michael@example.com', plan: 'Premium', status: 'active', activity: 'Medium', risk: 'Low' },
    { id: 4, name: 'Emma Brown', email: 'emma@example.com', plan: 'Basic', status: 'churned', activity: 'None', risk: 'High' },
    { id: 5, name: 'James Davis', email: 'james@example.com', plan: 'Premium', status: 'active', activity: 'High', risk: 'Low' },
    { id: 6, name: 'Jessica Miller', email: 'jessica@example.com', plan: 'Basic', status: 'at-risk', activity: 'Low', risk: 'Medium' },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', plan: 'Premium', status: 'active', activity: 'Medium', risk: 'Low' },
    { id: 8, name: 'Linda Moore', email: 'linda@example.com', plan: 'Basic', status: 'new', activity: 'Medium', risk: 'Low' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'at-risk':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'churned':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'new':
        return 'bg-renewal-100 text-renewal-800 dark:bg-renewal-950 dark:text-renewal-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'Medium':
        return 'text-amber-600 dark:text-amber-400';
      case 'High':
        return 'text-rose-600 dark:text-rose-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Customer Segments</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Create and manage audience segments based on behavior and risk
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up">
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium">Segment Distribution</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <DownloadCloud className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Segments</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="at-risk">At Risk</TabsTrigger>
              <TabsTrigger value="churned">Churned</TabsTrigger>
              <TabsTrigger value="new">New Users</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {filteredSegments.map((segment) => (
                  <div key={segment.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{segment.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-500 dark:text-slate-400">{segment.count} users</span>
                      </div>
                    </div>
                    <div 
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <h3 className="font-medium mb-4">Segment Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                  label={false}
                >
                  {userSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
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
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <Button variant="default" className="w-full">Create New Segment</Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-medium">User List</h3>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="active">Active Users</SelectItem>
                <SelectItem value="at-risk">At-Risk Users</SelectItem>
                <SelectItem value="churned">Churned Users</SelectItem>
                <SelectItem value="new">New Users</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <DownloadCloud className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Churn Risk</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.plan}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(user.status)}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.activity}</TableCell>
                  <TableCell className={getRiskColor(user.risk)}>{user.risk}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Segments;
