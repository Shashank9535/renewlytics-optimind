
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, KeyRound, Loader2, ArrowRight, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup' || tabParam === 'login') {
      setActiveTab(tabParam);
    }
    
    // Check for Supabase auth session on component mount
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [location, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter both email and password."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (activeTab === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account."
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Signed in successfully",
          description: "Redirecting to dashboard..."
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      setAuthError(error.message || "Authentication failed");
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google') => {
    try {
      setAuthError(null);
      setGoogleLoading(true);
      
      console.log('Attempting to sign in with Google...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        console.error('Google auth error:', error);
        throw error;
      }
      
      console.log('SignInWithOAuth response:', data);
      
      // No need to navigate here as the onAuthStateChange handler will do that
    } catch (error: any) {
      console.error('Google auth error:', error);
      setAuthError(error.message || "Unable to authenticate with Google");
      toast({
        variant: "destructive",
        title: "Social login failed",
        description: error.message || "Unable to authenticate with Google. Please try again."
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            &larr; Back to Home
          </Button>
          <div className="mt-4">
            <RenewlyticsLogo variant="with-tagline" size="lg" className="mx-auto" />
          </div>
        </div>
        
        <Card className="border-slate-700 bg-slate-800/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">
              {activeTab === 'login' ? 'Sign in' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {activeTab === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Enter your details to create a new account'}
            </CardDescription>
          </CardHeader>
          
          {authError && (
            <div className="px-6">
              <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-red-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {authError === "provider is not enabled" 
                    ? "Google login is not enabled. Please contact the administrator."
                    : authError}
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mx-6 bg-slate-700">
              <TabsTrigger value="login" className="data-[state=active]:bg-blue-600">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <CardContent className="pt-4">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <KeyRound className="h-4 w-4" />
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-slate-700 w-full"></div>
                    <span className="bg-slate-800 px-2 text-xs text-slate-400 relative">or</span>
                    <div className="border-t border-slate-700 w-full"></div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => handleSocialAuth('google')}
                    disabled={googleLoading}
                  >
                    {googleLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path><path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"></path><path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"></path><path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"></path></svg>
                        Sign in with Google
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-0">
              <CardContent className="pt-4">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="name@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <KeyRound className="h-4 w-4" />
                      </div>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-slate-700 w-full"></div>
                    <span className="bg-slate-800 px-2 text-xs text-slate-400 relative">or</span>
                    <div className="border-t border-slate-700 w-full"></div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => handleSocialAuth('google')}
                    disabled={googleLoading}
                  >
                    {googleLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path><path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"></path><path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"></path><path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"></path></svg>
                        Sign up with Google
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center border-t border-slate-700 pt-4">
            <p className="text-xs text-slate-500">
              Powered by AI-driven customer retention technology
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
