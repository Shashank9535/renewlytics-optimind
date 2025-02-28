
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, KeyRound, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Initialize Supabase client with project ID
  const supabaseUrl = 'https://guqqljsjqxhxdklufgyg.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cXFsanNqcXhoeGRrbHVmZ3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNTA1OTAsImV4cCI6MjAyMjgyNjU5MH0.OdYDnFbZ6D9ZMm-oMPtK1eA1LqvXYIg7LCKhk7m-lDc';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <RenewlyticsLogo size="lg" className="mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            AI-powered customer retention platform
          </p>
        </div>
        
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create an account' : 'Sign in to your account'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Enter your details to create a new account' 
                : 'Enter your credentials to access your dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-xs text-renewal-600 dark:text-renewal-400"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create account' : 'Sign in'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-center text-slate-500 dark:text-slate-400">
              {isSignUp 
                ? 'Already have an account?' 
                : 'Don\'t have an account?'}
              <Button 
                variant="link" 
                className="p-0 h-auto ml-1 text-renewal-600 dark:text-renewal-400"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp ? 'Sign in' : 'Create one'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
              <AlertCircle className="h-3 w-3" />
              <span>
                This is a demo application. Please don't use real credentials.
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
