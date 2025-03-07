
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import { ArrowRight, BarChart2, Users, LifeBuoy, LineChart, CheckCircle2, ExternalLink, ChevronRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  
  // Handle scroll to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isHeaderSticky 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <RenewlyticsLogo variant="with-tagline" size="md" />
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#platform" className="font-medium text-slate-600 hover:text-primary transition-colors">Platform</Link>
              <Link to="#solutions" className="font-medium text-slate-600 hover:text-primary transition-colors">Solutions</Link>
              <Link to="#customers" className="font-medium text-slate-600 hover:text-primary transition-colors">Customers</Link>
              <Link to="#resources" className="font-medium text-slate-600 hover:text-primary transition-colors">Resources</Link>
              <Link to="#pricing" className="font-medium text-slate-600 hover:text-primary transition-colors">Pricing</Link>
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
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Customer Success, Automated and Intelligent
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Renewlytics helps subscription businesses increase retention, reduce churn, and drive expansion revenue with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
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
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Renewlytics Dashboard Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
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
      
      {/* Platform Overview */}
      <section id="platform" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              The Complete Customer Success Platform
            </h2>
            <p className="text-lg text-slate-600">
              Our all-in-one platform gives you the tools to understand, engage, and retain your customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="h-6 w-6" />}
              title="AI-Powered Predictions"
              description="Identify at-risk customers before they churn with our machine learning prediction engine."
            />
            <FeatureCard 
              icon={<LineChart className="h-6 w-6" />}
              title="Customer Analytics"
              description="Get deep insights into customer health, behavior, and engagement patterns."
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Segment Builder"
              description="Create dynamic customer segments based on behavior, usage, and value metrics."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Automated Workflows"
              description="Automate outreach and interventions when customers show early warning signs."
            />
            <FeatureCard 
              icon={<Globe className="h-6 w-6" />}
              title="Integration Hub"
              description="Connect with your existing tech stack for a seamless customer data flow."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Enterprise Security"
              description="SOC 2 Type II certified with best-in-class security and compliance features."
            />
          </div>
        </div>
      </section>
      
      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Solutions for Every Business Need
            </h2>
            <p className="text-lg text-slate-600">
              Customized approaches for businesses of all sizes and industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SolutionCard 
              title="SaaS & Subscription"
              description="Reduce churn and increase expansion revenue in your subscription business."
              linkText="Learn More"
            />
            <SolutionCard 
              title="Enterprise B2B"
              description="Manage complex customer relationships and drive account growth."
              linkText="Learn More"
            />
            <SolutionCard 
              title="SMB & Mid-Market"
              description="Scale your customer success operations efficiently with limited resources."
              linkText="Learn More"
            />
            <SolutionCard 
              title="Professional Services"
              description="Deliver exceptional client experiences and increase project profitability."
              linkText="Learn More"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section id="customers" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Trusted by Customer-Centric Teams
            </h2>
            <p className="text-lg text-slate-600">
              See why leading companies choose Renewlytics to power their customer success operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Renewlytics has transformed how we approach customer success. We've reduced churn by 35% in just six months."
              author="Sarah Johnson"
              role="VP of Customer Success"
              company="TechFlow Inc."
            />
            <TestimonialCard 
              quote="The predictive insights have been game-changing. We now proactively address customer needs before they even reach out."
              author="Michael Chen"
              role="Chief Customer Officer"
              company="Datalyze"
            />
            <TestimonialCard 
              quote="Implementation was smooth and the ROI has been incredible. Our team is more efficient and our customers are happier."
              author="Priya Patel"
              role="Customer Success Director"
              company="GrowthMetrics"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Customer Success?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of subscription businesses that use Renewlytics to reduce churn and boost growth.
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const SolutionCard = ({ title, description, linkText }: { title: string, description: string, linkText: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <Link to="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
        {linkText} <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, company }: { quote: string, author: string, role: string, company: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <div className="mb-4 text-yellow-500 flex">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-700 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-slate-600 text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};

export default Landing;
