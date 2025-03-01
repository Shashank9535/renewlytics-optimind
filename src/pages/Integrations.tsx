
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  PlusCircle,
  CreditCard,
  Users,
  Mail,
  MessageSquare,
  Link as LinkIcon,
  Zap,
  RefreshCw
} from 'lucide-react';

const Integrations = () => {
  const [activeCrmTab, setActiveCrmTab] = useState("salesforce");
  const [activePaymentTab, setActivePaymentTab] = useState("stripe");
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectIntegration = (type: string, provider: string) => {
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Integration connected",
        description: `${provider} has been successfully connected.`,
      });
    }, 1500);
  };

  const handleTestIntegration = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API test
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Integration tested",
        description: `${provider} integration is working correctly.`,
      });
    }, 1500);
  };

  const handleDisconnect = (provider: string) => {
    toast({
      title: "Integration disconnected",
      description: `${provider} has been successfully disconnected.`,
    });
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API save
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Webhook saved",
        description: "Your webhook URL has been saved successfully.",
      });
    }, 1000);
  };

  const handleTriggerZapier = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API trigger
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Webhook triggered",
        description: "Your Zapier webhook has been triggered successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Connect your CRM and payment systems to enhance Renewlytics capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-up">
        {/* CRM Integrations */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 rounded-t-lg border-b border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>CRM Integrations</CardTitle>
                  <CardDescription>Connect your customer relationship management platforms</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeCrmTab} onValueChange={setActiveCrmTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="salesforce">Salesforce</TabsTrigger>
                <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
                <TabsTrigger value="zoho">Zoho</TabsTrigger>
              </TabsList>
              
              <TabsContent value="salesforce" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" 
                      alt="Salesforce" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">Salesforce</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Sync customer data and activities</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleTestIntegration("Salesforce")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect("Salesforce")}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-900 dark:hover:bg-rose-950/50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="hubspot" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" 
                      alt="HubSpot" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">HubSpot</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Connect your marketing automation</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("crm", "HubSpot")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="zoho" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/zoho-2.svg" 
                      alt="Zoho" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">Zoho CRM</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Integrate your Zoho customer data</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("crm", "Zoho")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Integrations */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-renewal-50 to-renewal-100 dark:from-renewal-950/40 dark:to-renewal-900/20 rounded-t-lg border-b border-renewal-100 dark:border-renewal-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-renewal-100 dark:bg-renewal-900/50 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-renewal-600 dark:text-renewal-400" />
                </div>
                <div>
                  <CardTitle>Payment Integrations</CardTitle>
                  <CardDescription>Connect your billing and payment processors</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activePaymentTab} onValueChange={setActivePaymentTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="stripe">Stripe</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="square">Square</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stripe" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" 
                      alt="Stripe" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Process payments and monitor subscriptions</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleTestIntegration("Stripe")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect("Stripe")}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-900 dark:hover:bg-rose-950/50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" 
                      alt="PayPal" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Accept PayPal payments</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("payment", "PayPal")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="square" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/square-2.svg" 
                      alt="Square" 
                      className="h-8 w-8 rounded bg-white p-1" 
                    />
                    <div>
                      <h3 className="font-medium">Square</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Process payments with Square</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("payment", "Square")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
        {/* Webhook & API Integrations */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20 rounded-t-lg border-b border-violet-100 dark:border-violet-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle>Webhooks & API</CardTitle>
                  <CardDescription>Connect with Zapier, Make, and custom systems</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Zapier Integration</h3>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/zapier-1.svg" 
                  alt="Zapier" 
                  className="h-8 w-8 rounded bg-white p-1" 
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Connect Renewlytics to 5,000+ apps with Zapier
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="zapier-webhook" className="text-sm font-medium">
                  Zapier Webhook URL
                </label>
                <Input
                  id="zapier-webhook"
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleSaveWebhook}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <LinkIcon className="h-4 w-4 mr-2" />
                  )}
                  Save Webhook
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleTriggerZapier}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4 mr-2" />
                  )}
                  Test Trigger
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">API Access</h3>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Access the Renewlytics API to build custom integrations
                </p>
                <Button variant="outline">
                  View API Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Integrations */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 rounded-t-lg border-b border-amber-100 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle>Marketing Integrations</CardTitle>
                  <CardDescription>Connect your email and marketing tools</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-1.svg" 
                    alt="Mailchimp" 
                    className="h-8 w-8 rounded bg-white p-1" 
                  />
                  <div>
                    <h3 className="font-medium">Mailchimp</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email marketing automation</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleConnectIntegration("marketing", "Mailchimp")}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <PlusCircle className="h-4 w-4 mr-2" />
                  )}
                  Connect
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg" 
                    alt="SendGrid" 
                    className="h-8 w-8 rounded bg-white p-1" 
                  />
                  <div>
                    <h3 className="font-medium">SendGrid</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Transactional emails and campaigns</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/intercom-1.svg" 
                    alt="Intercom" 
                    className="h-8 w-8 rounded bg-white p-1" 
                  />
                  <div>
                    <h3 className="font-medium">Intercom</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Customer messaging platform</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleConnectIntegration("marketing", "Intercom")}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <PlusCircle className="h-4 w-4 mr-2" />
                  )}
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
