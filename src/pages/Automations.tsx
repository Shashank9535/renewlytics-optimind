
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { 
  Mail, 
  Tag, 
  MessageSquare, 
  Bell, 
  Calendar, 
  Percent, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  Users
} from 'lucide-react';

interface AutomationCard {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'draft';
  triggers: string[];
  segment: string;
  lastRun?: string;
  nextRun?: string;
  performance?: {
    sent: number;
    opened: number;
    converted: number;
  };
  icon: React.ReactNode;
}

const Automations = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newAutomationName, setNewAutomationName] = useState('');
  const [newAutomationType, setNewAutomationType] = useState('email');
  const [newAutomationSegment, setNewAutomationSegment] = useState('at-risk');
  
  const automations: AutomationCard[] = [
    {
      id: "1",
      title: "30-Day Inactive Customer Email",
      description: "Send a personalized email to customers who haven't logged in for 30 days",
      type: "email",
      status: "active",
      triggers: ["30 days inactive"],
      segment: "at-risk",
      lastRun: "2 days ago",
      nextRun: "Tomorrow, 9:00 AM",
      performance: {
        sent: 156,
        opened: 89,
        converted: 23,
      },
      icon: <Mail className="h-5 w-5 text-blue-500" />
    },
    {
      id: "2",
      title: "Renewal Discount Offer",
      description: "Offer a 15% discount to customers approaching their renewal date",
      type: "discount",
      status: "active",
      triggers: ["15 days before renewal"],
      segment: "near-renewal",
      lastRun: "5 days ago",
      nextRun: "Today, 3:00 PM",
      performance: {
        sent: 42,
        opened: 37,
        converted: 28,
      },
      icon: <Percent className="h-5 w-5 text-green-500" />
    },
    {
      id: "3",
      title: "Feature Usage Prompt",
      description: "In-app prompt showing new features to users who haven't explored them",
      type: "in-app",
      status: "active",
      triggers: ["Login", "7 days after feature release"],
      segment: "low-engagement",
      lastRun: "Yesterday",
      nextRun: "Every login",
      performance: {
        sent: 312,
        opened: 189,
        converted: 76,
      },
      icon: <Bell className="h-5 w-5 text-purple-500" />
    },
    {
      id: "4",
      title: "Payment Failure Recovery",
      description: "Multi-step email sequence when a payment fails to recover subscription",
      type: "email",
      status: "draft",
      triggers: ["Payment failure"],
      segment: "payment-issues",
      icon: <Mail className="h-5 w-5 text-blue-500" />
    },
    {
      id: "5",
      title: "Quarterly Business Review",
      description: "Schedule a QBR call with enterprise customers",
      type: "calendar",
      status: "inactive",
      triggers: ["90 days after signup", "90 days after last QBR"],
      segment: "enterprise",
      icon: <Calendar className="h-5 w-5 text-orange-500" />
    }
  ];

  const filteredAutomations = activeTab === "all" 
    ? automations 
    : automations.filter(a => a.status === activeTab);

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: `Automation ${newStatus}`,
      description: `The automation has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleCreateAutomation = () => {
    if (!newAutomationName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your automation",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would create a new automation via API
    toast({
      title: "Automation created",
      description: "Your new automation has been created as a draft.",
    });
    
    setIsCreating(false);
    setNewAutomationName('');
  };

  const handleDeleteAutomation = (id: string) => {
    toast({
      title: "Automation deleted",
      description: "The automation has been permanently deleted.",
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case 'inactive':
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case 'draft':
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'email':
        return "Email";
      case 'in-app':
        return "In-App Prompt";
      case 'discount':
        return "Discount";
      case 'calendar':
        return "Calendar Invite";
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Automated Retention Actions</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Create and manage automated actions to improve customer retention
        </p>
      </div>

      <div className="flex justify-between items-center mb-6 animate-fade-up">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center w-full">
            <TabsList>
              <TabsTrigger value="all">All Automations</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <Button onClick={() => setIsCreating(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </div>
        </Tabs>
      </div>

      {isCreating && (
        <Card className="mb-6 border-blue-200 dark:border-blue-800 shadow-md animate-fade-down">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20">
            <CardTitle>Create New Automation</CardTitle>
            <CardDescription>Set up a new automated retention action</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Automation Name</Label>
                <Input 
                  id="automation-name" 
                  placeholder="e.g., Re-engagement Email"
                  value={newAutomationName}
                  onChange={(e) => setNewAutomationName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="automation-type">Type</Label>
                <Select value={newAutomationType} onValueChange={setNewAutomationType}>
                  <SelectTrigger id="automation-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="in-app">In-App Prompt</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="calendar">Calendar Invite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-segment">Customer Segment</Label>
                <Select value={newAutomationSegment} onValueChange={setNewAutomationSegment}>
                  <SelectTrigger id="customer-segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="low-engagement">Low Engagement</SelectItem>
                    <SelectItem value="near-renewal">Near Renewal</SelectItem>
                    <SelectItem value="payment-issues">Payment Issues</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="all">All Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 py-3">
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAutomation}>
              Create Automation
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4 animate-fade-up">
        {filteredAutomations.map((automation) => (
          <Card 
            key={automation.id} 
            className="hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 order-2 md:order-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {automation.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{automation.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {automation.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(automation.status)}>
                      {automation.status.charAt(0).toUpperCase() + automation.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {getTypeLabel(automation.type)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Triggers
                    </h4>
                    <div className="space-y-1">
                      {automation.triggers.map((trigger, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-sm">{trigger}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Customer Segment
                    </h4>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm">
                        {automation.segment.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </div>
                  </div>
                  
                  {automation.performance && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Performance
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-1 rounded bg-slate-50 dark:bg-slate-800">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Sent</p>
                          <p className="font-semibold">{automation.performance.sent}</p>
                        </div>
                        <div className="text-center p-1 rounded bg-slate-50 dark:bg-slate-800">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Opened</p>
                          <p className="font-semibold">{automation.performance.opened}</p>
                        </div>
                        <div className="text-center p-1 rounded bg-slate-50 dark:bg-slate-800">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Converted</p>
                          <p className="font-semibold">{automation.performance.converted}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {(automation.lastRun || automation.nextRun) && (
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    {automation.lastRun && (
                      <span>Last run: {automation.lastRun}</span>
                    )}
                    {automation.nextRun && (
                      <span>Next run: {automation.nextRun}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="border-b md:border-b-0 md:border-l border-slate-100 dark:border-slate-800 p-3 flex md:flex-col justify-between md:justify-start items-center gap-2 order-1 md:order-2 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={automation.status === 'active'} 
                    onCheckedChange={() => handleToggleStatus(automation.id, automation.status)}
                    disabled={automation.status === 'draft'}
                  />
                  <span className="text-sm font-medium">
                    {automation.status === 'active' ? 'On' : 'Off'}
                  </span>
                </div>
                
                <div className="flex md:flex-col gap-2 justify-end">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleDeleteAutomation(automation.id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Automations;
