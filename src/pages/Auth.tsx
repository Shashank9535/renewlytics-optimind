
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, KeyRound, Mail, ArrowRight, Loader2, Brain, Fingerprint, HelpCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AnimatedDataPoints } from '@/components/auth/AnimatedDataPoints';
import { LoginAssistant } from '@/components/auth/LoginAssistant';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  // Initialize Supabase client with project ID
  const supabaseUrl = 'https://guqqljsjqxhxdklufgyg.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cXFsanNqcXhoeGRrbHVmZ3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNTA1OTAsImV4cCI6MjAyMjgyNjU5MH0.OdYDnFbZ6D9ZMm-oMPtK1eA1LqvXYIg7LCKhk7m-lDc';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    // Hide assistant by default
    if (authError) {
      setShowAssistant(true);
    }
  }, [authError]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
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
      if (isSignUp) {
        // Sign up with Supabase
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
        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Signed in successfully",
          description: "Redirecting to dashboard..."
        });
        
        navigate('/');
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Social login failed",
        description: error.message || "Unable to authenticate with provider."
      });
    }
  };

  const handleBiometricAuth = () => {
    toast({
      title: "Biometric authentication",
      description: "This feature is coming soon!"
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 overflow-hidden">
      {/* Animated data points background */}
      <AnimatedDataPoints />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <RenewlyticsLogo variant="with-tagline" size="lg" className="mx-auto mb-2" />
          <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text animate-pulse">
            Unlock AI-Powered Retention. Reduce Churn Effortlessly.
          </h2>
        </div>
        
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-md border shadow-lg shadow-blue-500/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">{isSignUp ? 'Create an account' : 'Welcome back'}</CardTitle>
            <CardDescription className="text-slate-400">
              {isSignUp 
                ? 'Enter your details to create a new account' 
                : 'Sign in to access your AI-powered dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  {!isSignUp && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-xs text-blue-400"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Authenticating...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create account' : 'Sign in'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-700 w-full"></div>
                <span className="bg-slate-800 px-2 text-xs text-slate-400 relative">or continue with</span>
                <div className="border-t border-slate-700 w-full"></div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => handleSocialAuth('google')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path><path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"></path><path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"></path><path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"></path></svg>
                  Google
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={handleBiometricAuth}
                      >
                        <Fingerprint className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700">
                      <p>Biometric login (coming soon)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => setShowAssistant(true)}
                      >
                        <HelpCircle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700">
                      <p>Need help logging in?</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-center text-slate-400">
              {isSignUp 
                ? 'Already have an account?' 
                : 'Don\'t have an account?'}
              <Button 
                variant="link" 
                className="p-0 h-auto ml-1 text-blue-400 hover:text-blue-300"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp ? 'Sign in' : 'Create one'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-700 pt-4">
              <Brain className="h-3 w-3 text-blue-400" />
              <span>
                Powered by AI-driven customer retention technology
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* AI Assistant chatbot */}
      {showAssistant && (
        <LoginAssistant 
          onClose={() => setShowAssistant(false)} 
          error={authError}
        />
      )}
    </div>
  );
};

export default Auth;
