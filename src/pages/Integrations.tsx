
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
      {/* Hero section with Gainsight-style gradient header */}
      <div className="relative overflow-hidden rounded-xl mb-10 py-10 px-8 bg-gradient-to-r from-blue-700 via-purple-600 to-violet-600 text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.gainsight.com/wp-content/themes/gainsight/assets/images/banner-bg-pattern.png')] bg-cover opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Connect Your Tech Stack</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Seamlessly integrate with the tools you already use to enhance your customer retention strategy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* CRM Integrations */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 pb-8 border-b border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shadow-md">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">CRM Integrations</CardTitle>
                  <CardDescription className="text-base mt-1">Connect your customer relationship management platforms</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Tabs value={activeCrmTab} onValueChange={setActiveCrmTab}>
              <TabsList className="grid grid-cols-3 mb-8 w-full">
                <TabsTrigger value="salesforce" className="py-3">Salesforce</TabsTrigger>
                <TabsTrigger value="hubspot" className="py-3">HubSpot</TabsTrigger>
                <TabsTrigger value="zoho" className="py-3">Zoho</TabsTrigger>
              </TabsList>
              
              <TabsContent value="salesforce" className="space-y-6">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" 
                      alt="Salesforce" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">Salesforce</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sync customer data and activities</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 py-1.5 px-3">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                    Connected
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleTestIntegration("Salesforce")}
                    disabled={isLoading}
                    className="py-6 text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-5 w-5 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect("Salesforce")}
                    className="py-6 text-base text-rose-600 border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-900 dark:hover:bg-rose-950/50"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="hubspot" className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" 
                      alt="HubSpot" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">HubSpot</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Connect your marketing automation</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("crm", "HubSpot")}
                    disabled={isConnecting}
                    className="py-6 px-6 text-base"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="zoho" className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/zoho-2.svg" 
                      alt="Zoho" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">Zoho CRM</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Integrate your Zoho customer data</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("crm", "Zoho")}
                    disabled={isConnecting}
                    className="py-6 px-6 text-base"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Integrations */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-renewal-50 to-renewal-100 dark:from-renewal-950/40 dark:to-renewal-900/20 pb-8 border-b border-renewal-100 dark:border-renewal-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-renewal-100 dark:bg-renewal-900/50 flex items-center justify-center shadow-md">
                  <CreditCard className="h-6 w-6 text-renewal-600 dark:text-renewal-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Payment Integrations</CardTitle>
                  <CardDescription className="text-base mt-1">Connect your billing and payment processors</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Tabs value={activePaymentTab} onValueChange={setActivePaymentTab}>
              <TabsList className="grid grid-cols-3 mb-8 w-full">
                <TabsTrigger value="stripe" className="py-3">Stripe</TabsTrigger>
                <TabsTrigger value="paypal" className="py-3">PayPal</TabsTrigger>
                <TabsTrigger value="square" className="py-3">Square</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stripe" className="space-y-6">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" 
                      alt="Stripe" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">Stripe</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Process payments and monitor subscriptions</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 py-1.5 px-3">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                    Connected
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleTestIntegration("Stripe")}
                    disabled={isLoading}
                    className="py-6 text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-5 w-5 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect("Stripe")}
                    className="py-6 text-base text-rose-600 border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-900 dark:hover:bg-rose-950/50"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" 
                      alt="PayPal" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">PayPal</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Accept PayPal payments</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("payment", "PayPal")}
                    disabled={isConnecting}
                    className="py-6 px-6 text-base"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="square" className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/square-2.svg" 
                      alt="Square" 
                      className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">Square</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Process payments with Square</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleConnectIntegration("payment", "Square")}
                    disabled={isConnecting}
                    className="py-6 px-6 text-base"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Connect
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Webhook & API Integrations */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20 pb-8 border-b border-violet-100 dark:border-violet-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shadow-md">
                  <Zap className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Webhooks & API</CardTitle>
                  <CardDescription className="text-base mt-1">Connect with Zapier, Make, and custom systems</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/zapier-1.svg" 
                  alt="Zapier" 
                  className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                />
                <div>
                  <h3 className="font-medium text-lg">Zapier Integration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Connect Renewlytics to 5,000+ apps with Zapier
                  </p>
                </div>
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
                  className="py-6 text-base"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleSaveWebhook}
                  disabled={isLoading}
                  className="py-6 text-base"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <LinkIcon className="h-5 w-5 mr-2" />
                  )}
                  Save Webhook
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleTriggerZapier}
                  disabled={isLoading}
                  className="py-6 text-base"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5 mr-2" />
                  )}
                  Test Trigger
                </Button>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h3 className="font-medium text-lg mb-4">API Access</h3>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                  Access the Renewlytics API to build custom integrations
                </p>
                <Button variant="outline" className="py-6 px-6 text-base">
                  View API Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Integrations */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 pb-8 border-b border-amber-100 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shadow-md">
                  <MessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Marketing Integrations</CardTitle>
                  <CardDescription className="text-base mt-1">Connect your email and marketing tools</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-1.svg" 
                    alt="Mailchimp" 
                    className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-medium text-lg">Mailchimp</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Email marketing automation</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleConnectIntegration("marketing", "Mailchimp")}
                  disabled={isConnecting}
                  className="py-6 px-6 text-base"
                >
                  {isConnecting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <PlusCircle className="h-5 w-5 mr-2" />
                  )}
                  Connect
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg" 
                    alt="SendGrid" 
                    className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-medium text-lg">SendGrid</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Transactional emails and campaigns</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 py-1.5 px-3">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Connected
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/intercom-1.svg" 
                    alt="Intercom" 
                    className="h-10 w-10 rounded bg-white p-1 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-medium text-lg">Intercom</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Customer messaging platform</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleConnectIntegration("marketing", "Intercom")}
                  disabled={isConnecting}
                  className="py-6 px-6 text-base"
                >
                  {isConnecting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <PlusCircle className="h-5 w-5 mr-2" />
                  )}
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Partners Banner - Similar to Gainsight style */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Trusted by Leading Business Tools</h2>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 hover:opacity-100 transition-opacity py-6">
          <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" alt="Slack" className="h-8 grayscale hover:grayscale-0 transition-all" />
          <img src="https://cdn.worldvectorlogo.com/logos/google-2015.svg" alt="Google" className="h-8 grayscale hover:grayscale-0 transition-all" />
          <img src="https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" alt="Microsoft" className="h-8 grayscale hover:grayscale-0 transition-all" />
          <img src="https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg" alt="AWS" className="h-8 grayscale hover:grayscale-0 transition-all" />
          <img src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" alt="Salesforce" className="h-8 grayscale hover:grayscale-0 transition-all" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
