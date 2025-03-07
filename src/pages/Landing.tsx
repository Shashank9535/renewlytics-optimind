
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import { ArrowRight, BarChart2, Users, LifeBuoy, LineChart, CheckCircle2, ExternalLink } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  
  // Handle scroll to make header sticky
  useState(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isHeaderSticky 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-slate-200' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <RenewlyticsLogo variant="with-tagline" size="md" />
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#solutions" className="font-medium text-slate-600 hover:text-primary transition-colors">Solutions</Link>
              <Link to="#platform" className="font-medium text-slate-600 hover:text-primary transition-colors">Platform</Link>
              <Link to="#about" className="font-medium text-slate-600 hover:text-primary transition-colors">About</Link>
              <Link to="#customers" className="font-medium text-slate-600 hover:text-primary transition-colors">Customers</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="hidden sm:flex"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 enterprise-heading">
              Your AI-Powered Customer Success Platform
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Renewlytics helps you reduce churn, increase retention, and grow your subscription business with powerful AI insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('#demo', '_blank')}
              >
                Request Demo <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative mx-auto max-w-6xl">
            <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-2xl border border-slate-200">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <img 
                  src="placeholder.svg" 
                  alt="Renewlytics Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>
            </div>
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-slate-200 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Churn Reduction</p>
                  <p className="text-xl font-bold text-slate-900">+42%</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-slate-200 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Customer Retention</p>
                  <p className="text-xl font-bold text-slate-900">+31%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {['ACME CORP', 'GLOBEX', 'INITECH', 'UMBRELLA', 'STARK IND', 'WAYNE ENT'].map((company, index) => (
              <div key={index} className="h-12 flex items-center justify-center">
                <span className="text-slate-400 font-semibold text-lg">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="platform" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 enterprise-heading">
              Everything You Need for Customer Success
            </h2>
            <p className="text-lg text-slate-600">
              Our all-in-one platform gives you the tools to understand, engage, and retain your customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="h-6 w-6" />}
              title="Churn Prediction"
              description="Identify at-risk customers before they leave with our AI-powered prediction engine."
            />
            <FeatureCard 
              icon={<LineChart className="h-6 w-6" />}
              title="Customer Analytics"
              description="Get deep insights into customer behavior and engagement patterns."
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Segment Builder"
              description="Create dynamic customer segments based on behavior, usage, and demographics."
            />
            <FeatureCard 
              icon={<LifeBuoy className="h-6 w-6" />}
              title="Proactive Support"
              description="Automate outreach to customers when they need help the most."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Success Playbooks"
              description="Implement proven strategies to increase adoption and satisfaction."
            />
            <FeatureCard 
              icon={<ArrowRight className="h-6 w-6" />}
              title="Integration Ecosystem"
              description="Connect with your existing tech stack for a seamless workflow."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Reduce Churn and Boost Growth?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of subscription businesses that use Renewlytics to transform customer success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth?tab=signup')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open('#contact', '_blank')}
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <RenewlyticsLogo variant="with-tagline" size="md" />
            <p className="mt-4 md:mt-0">© 2025 Renewlytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default Landing;
