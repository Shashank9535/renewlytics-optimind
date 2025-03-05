
import React, { useState } from 'react';
import { Code, Copy, CheckCircle2, Download, ExternalLink, GitFork, Laptop, Server, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function TrackingSDK() {
  const [copied, setCopied] = useState<string | null>(null);
  const [sdkVersion, setSdkVersion] = useState<string>("1.2.0");

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
    
    toast({
      title: "Code copied to clipboard",
      description: `${type} integration code is now in your clipboard.`
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  const sdkCodeJS = `// Renewlytics Tracking SDK - v${sdkVersion}
import { createClient } from '@renewlytics/sdk';

// Initialize the client with your API key
const analytics = createClient({
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://api.renewlytics.com/v1/events',
  
  // Optional configuration
  debug: false, // Set to true for verbose console logs
  batchSize: 10, // Number of events to batch before sending
  flushInterval: 5000, // Time in ms between batch sends
  autoCapture: {
    pageViews: true,
    clicks: true,
    formSubmissions: true,
    errors: true
  },
  privacy: {
    anonymizeIp: true,
    respectDnd: true
  }
});

// Track user behavior
analytics.track('user_action', {
  userId: 'user-123',
  action: 'feature_used',
  featureName: 'advanced_search',
  duration: 45,
  timestamp: new Date().toISOString()
});

// Identify users
analytics.identify('user-123', {
  email: 'user@example.com',
  plan: 'enterprise',
  companyId: 'company-456',
  firstSeen: new Date().toISOString()
});

// Track page views
analytics.pageView('/dashboard', {
  referrer: document.referrer,
  title: document.title
});

// Session recording (heatmaps, click paths)
analytics.startSession({
  recordScrollDepth: true,
  sampleRate: 0.5 // Record 50% of sessions
});`;

  const sdkCodeReact = `// Renewlytics React Hooks - v${sdkVersion}
import { useRenewlytics, RenewlyticsProvider } from '@renewlytics/react';

// In your app root
function App() {
  return (
    <RenewlyticsProvider 
      apiKey="YOUR_API_KEY"
      options={{ 
        debug: false, 
        batchSize: 10,
        autoCapture: {
          pageViews: true,
          clicks: true,
          formSubmissions: true
        },
        privacy: {
          anonymizeIp: true,
          respectDnd: true
        }
      }}
    >
      <YourApp />
    </RenewlyticsProvider>
  );
}

// In your components
function FeatureComponent() {
  const { track, identify, startSession } = useRenewlytics();
  
  const handleFeatureUse = () => {
    // Track the feature usage
    track('feature_used', {
      featureName: 'data_export',
      exportFormat: 'csv',
      itemCount: 157
    });
  };
  
  useEffect(() => {
    // Start session recording when component mounts
    startSession({
      recordScrollDepth: true,
      sampleRate: 1.0 // Record all sessions
    });
  }, []);
  
  return (
    <button onClick={handleFeatureUse}>
      Export Data
    </button>
  );
}`;

  const sdkCodePython = `# Renewlytics Server SDK - v${sdkVersion}
from renewlytics import RenewlyticsClient

# Initialize the client
client = RenewlyticsClient(
    api_key="YOUR_API_KEY",
    endpoint="https://api.renewlytics.com/v1/events",
    batch_size=10,
    debug=False,
    privacy={
        "anonymize_ip": True,
        "encrypt_pii": True
    }
)

# Track server-side events
client.track(
    event_name="subscription_renewed",
    properties={
        "user_id": "user-123",
        "plan": "enterprise",
        "amount": 299.00,
        "currency": "USD",
        "renewal_date": "2023-07-15T00:00:00Z",
        "next_renewal_date": "2024-07-15T00:00:00Z",
        "payment_method": "credit_card",
        "is_auto_renewal": True,
        "discount_applied": False
    }
)

# Batch track multiple events
events = [
    {
        "event_name": "email_sent",
        "properties": {
            "user_id": "user-123", 
            "template": "welcome",
            "delivered": True,
            "open_rate_cohort": "high"
        }
    },
    {
        "event_name": "notification_sent",
        "properties": {
            "user_id": "user-123", 
            "channel": "sms",
            "category": "account_update",
            "priority": "high"
        }
    }
]

client.batch_track(events)

# Track user identification
client.identify(
    user_id="user-456",
    traits={
        "email": "enterprise@example.com",
        "name": "Enterprise User",
        "plan": "enterprise_plus",
        "employees": 1250,
        "industry": "healthcare",
        "region": "north_america"
    }
)

# Flush events manually
client.flush()`;

  return (
    <Card className="w-full shadow-md border border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Renewlytics Tracking SDK
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                v{sdkVersion}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time behavior tracking for advanced AI predictions
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Event notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Shield className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Privacy settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-4">
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="javascript" className="flex items-center gap-1">
              <Laptop className="h-3 w-3" />
              <span>JavaScript</span>
            </TabsTrigger>
            <TabsTrigger value="react" className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>React</span>
            </TabsTrigger>
            <TabsTrigger value="python" className="flex items-center gap-1">
              <Server className="h-3 w-3" />
              <span>Python</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="javascript" className="w-full">
            <div className="relative">
              <div className="bg-slate-950 rounded-md p-4 overflow-auto max-h-96">
                <pre className="text-slate-50 text-sm font-mono">
                  <code>{sdkCodeJS}</code>
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-slate-800/50 hover:bg-slate-700"
                onClick={() => handleCopy(sdkCodeJS, 'JavaScript')}
              >
                {copied === 'JavaScript' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-slate-300" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="react" className="w-full">
            <div className="relative">
              <div className="bg-slate-950 rounded-md p-4 overflow-auto max-h-96">
                <pre className="text-slate-50 text-sm font-mono">
                  <code>{sdkCodeReact}</code>
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-slate-800/50 hover:bg-slate-700"
                onClick={() => handleCopy(sdkCodeReact, 'React')}
              >
                {copied === 'React' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-slate-300" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="python" className="w-full">
            <div className="relative">
              <div className="bg-slate-950 rounded-md p-4 overflow-auto max-h-96">
                <pre className="text-slate-50 text-sm font-mono">
                  <code>{sdkCodePython}</code>
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-slate-800/50 hover:bg-slate-700"
                onClick={() => handleCopy(sdkCodePython, 'Python')}
              >
                {copied === 'Python' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-slate-300" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">SDK for enterprise monitoring</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
          <Button variant="default" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>Documentation</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
