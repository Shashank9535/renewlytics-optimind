
import React, { useState } from 'react';
import { Code, Copy, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export function TrackingSDK() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
    
    toast({
      title: "Code copied to clipboard",
      description: `${type} integration code is now in your clipboard.`
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  const sdkCodeJS = `// Renewlytics Tracking SDK - v1.0.0
import { createClient } from '@renewlytics/sdk';

// Initialize the client with your API key
const analytics = createClient({
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://api.renewlytics.com/v1/events',
  
  // Optional configuration
  debug: false, // Set to true for verbose console logs
  batchSize: 10, // Number of events to batch before sending
  flushInterval: 5000, // Time in ms between batch sends
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
});`;

  const sdkCodeReact = `// Renewlytics React Hooks - v1.0.0
import { useRenewlytics, RenewlyticsProvider } from '@renewlytics/react';

// In your app root
function App() {
  return (
    <RenewlyticsProvider 
      apiKey="YOUR_API_KEY"
      options={{ debug: false, batchSize: 10 }}
    >
      <YourApp />
    </RenewlyticsProvider>
  );
}

// In your components
function FeatureComponent() {
  const { track, identify } = useRenewlytics();
  
  const handleFeatureUse = () => {
    // Track the feature usage
    track('feature_used', {
      featureName: 'data_export',
      exportFormat: 'csv'
    });
  };
  
  return (
    <button onClick={handleFeatureUse}>
      Export Data
    </button>
  );
}`;

  const sdkCodePython = `# Renewlytics Server SDK - v1.0.0
from renewlytics import RenewlyticsClient

# Initialize the client
client = RenewlyticsClient(
    api_key="YOUR_API_KEY",
    endpoint="https://api.renewlytics.com/v1/events",
    batch_size=10,
    debug=False
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
        "next_renewal_date": "2024-07-15T00:00:00Z"
    }
)

# Batch track multiple events
events = [
    {
        "event_name": "email_sent",
        "properties": {"user_id": "user-123", "template": "welcome"}
    },
    {
        "event_name": "notification_sent",
        "properties": {"user_id": "user-123", "channel": "sms"}
    }
]

client.batch_track(events)

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
                v1.0.0
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time behavior tracking for advanced AI predictions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-4">
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
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
