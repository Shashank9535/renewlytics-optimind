
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RenewlyticsLogo } from '@/components/branding/RenewlyticsLogo';
import { 
  ArrowRight, 
  BarChart2, 
  Users, 
  Brain, 
  Zap, 
  Globe, 
  ShieldCheck, 
  LineChart, 
  AlertTriangle,
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  MessageCircle, 
  Calendar, 
  Rocket
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Handle scroll to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 10);
      
      // Animate elements when they come into view
      const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
      };
      
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      };
      
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      
      // Observe feature cards
      featureRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      return () => {
        featureRefs.current.forEach(ref => {
          if (ref) observer.unobserve(ref);
        });
      };
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isHeaderSticky 
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-purple-900/30' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <RenewlyticsLogo variant="with-tagline" size="md" />
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="font-medium text-gray-300 hover:text-blue-400 transition-colors">Features</Link>
              <Link to="#solutions" className="font-medium text-gray-300 hover:text-blue-400 transition-colors">Solutions</Link>
              <Link to="#testimonials" className="font-medium text-gray-300 hover:text-blue-400 transition-colors">Testimonials</Link>
              <Link to="#pricing" className="font-medium text-gray-300 hover:text-blue-400 transition-colors">Pricing</Link>
              <Link to="#demo" className="font-medium text-gray-300 hover:text-blue-400 transition-colors">Request Demo</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="hidden sm:flex border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/20"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section ref={heroSectionRef} className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-gray-900 z-0"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Stop Customer Churn Before It Happens
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Predict churn, automate retention, and boost customer loyalty with cutting-edge AI insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('#demo')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-600/20 animate-pulse-glow"
              >
                Book a Free Demo <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/auth?tab=signup')}
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              >
                Try for Free <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Hero Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl animate-fade-in">
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-purple-900/50 relative bg-gray-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              
              {/* Dashboard Preview Image */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Renewlytics AI Dashboard Preview" 
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Overlay UI elements to make it look like a dashboard */}
              <div className="absolute inset-0 flex flex-col p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 text-blue-400 font-semibold border border-blue-500/30">
                    AI-Powered Dashboard
                  </div>
                  <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg p-2 text-purple-300 border border-purple-500/30">
                    <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    Real-time Analytics
                  </div>
                </div>
                
                {/* Floating stats and alerts */}
                <div className="absolute top-20 left-10 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-blue-500/30 p-4 w-60 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold text-white">Churn Risk Alert</h3>
                  </div>
                  <p className="text-sm text-gray-300">Enterprise client showing signs of disengagement.</p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="absolute bottom-20 right-10 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-purple-500/30 p-4 w-64 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold text-white">AI Recommendation</h3>
                  </div>
                  <p className="text-sm text-gray-300">Schedule executive check-in for high-value accounts at risk.</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-xs text-gray-400">Priority: High</span>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                      Automate <Zap className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg p-4 border border-blue-600/30 hidden md:block animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Churn Reduction</p>
                  <p className="text-xl font-bold text-white">+42%</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg p-4 border border-purple-600/30 hidden md:block animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Customer Retention</p>
                  <p className="text-xl font-bold text-white">+31%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Renewlytics Section */}
      <section id="why-renewlytics" className="py-20 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Why Renewlytics?
            </h2>
            <p className="text-lg text-gray-300">
              Proactive, not reactive. Stop churn before it happens.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-6 w-6" />,
                title: "AI-Powered Insights",
                description: "Predict and stop customer churn before it's too late with machine learning algorithms."
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Boost Retention Effortlessly",
                description: "Automate engagement and reactivation campaigns to keep customers loyal."
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Seamless Integrations",
                description: "Works with your CRM, marketing tools, and support platforms out of the box."
              },
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: "Proactive, Not Reactive",
                description: "Renewlytics doesn't just analyze churn—it prevents it with actionable data."
              }
            ].map((item, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i] = el}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center mb-4 text-blue-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              onClick={() => navigate('#how-it-works')}
            >
              See How It Works <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gray-800/30 relative z-10">
        {/* Background accents */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Key Features
            </h2>
            <p className="text-lg text-gray-300">
              Everything you need to predict, prevent, and reduce customer churn.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-6 w-6" />,
                title: "AI-Powered Churn Prediction",
                description: "Identify at-risk customers before they leave using machine learning algorithms."
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Automated Retention Campaigns",
                description: "Create smart workflows that automatically engage customers before they churn."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Deep Customer Insights",
                description: "Understand user behavior and identify patterns that lead to customer churn."
              },
              {
                icon: <MessageCircle className="h-6 w-6" />,
                title: "Multi-Channel Engagement",
                description: "Trigger email, SMS, and in-app nudges based on customer behavior."
              },
              {
                icon: <LineChart className="h-6 w-6" />,
                title: "Real-Time Analytics",
                description: "Stay ahead with actionable data and real-time monitoring of customer health."
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Enterprise-Grade Security",
                description: "Your data is safe with SOC 2 compliance and enterprise-grade security."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i + 4] = el}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center mb-4 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button 
              onClick={() => navigate('#demo')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-600/20"
            >
              See the Full Feature List <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Who Is It For Section */}
      <section id="solutions" className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Who Is It For?
            </h2>
            <p className="text-lg text-gray-300">
              Tailored solutions for businesses that value customer retention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "SaaS Businesses & Startups",
                description: "Reduce churn and increase LTV for your subscription-based products.",
                icon: <Rocket className="h-6 w-6" />
              },
              {
                title: "Subscription-Based Services",
                description: "Keep subscribers engaged and reduce cancellations with predictive analytics.",
                icon: <Calendar className="h-6 w-6" />
              },
              {
                title: "Customer Success Teams",
                description: "Empower your team with AI-driven insights to focus on high-risk accounts.",
                icon: <Users className="h-6 w-6" />
              }
            ].map((item, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i + 10] = el}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center mb-4 text-blue-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <Button 
                  variant="ghost" 
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                >
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800/30 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300">
              Hear from businesses that transformed their customer retention with Renewlytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Renewlytics helped us reduce churn by 30% in just 3 months. The AI predictions are incredibly accurate.",
                author: "Sarah Johnson",
                role: "VP of Customer Success",
                company: "TechFlow Inc."
              },
              {
                quote: "The automated workflows saved us countless hours. We now focus on strategy instead of manually tracking at-risk customers.",
                author: "Michael Chen",
                role: "Chief Customer Officer",
                company: "Datalyze"
              },
              {
                quote: "Implementation was smooth and the ROI has been incredible. Our LTV increased by 24% in the first quarter.",
                author: "Priya Patel",
                role: "Customer Success Director",
                company: "GrowthMetrics"
              }
            ].map((testimonial, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i + 13] = el}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 opacity-0"
              >
                <div className="mb-4 text-yellow-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-300">
              Choose the plan that fits your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "/month",
                description: "Perfect for small teams and startups",
                features: [
                  "Up to 1,000 customers",
                  "Basic churn prediction",
                  "Email notifications",
                  "Standard support"
                ]
              },
              {
                name: "Growth",
                price: "$299",
                period: "/month",
                description: "For scaling businesses with growing customer bases",
                features: [
                  "Up to 10,000 customers",
                  "Advanced AI predictions",
                  "Automated workflows",
                  "Multi-channel engagement",
                  "Priority support"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "Tailored solutions for large organizations",
                features: [
                  "Unlimited customers",
                  "Custom AI models",
                  "Advanced integrations",
                  "Dedicated account manager",
                  "24/7 premium support",
                  "Custom reporting"
                ]
              }
            ].map((plan, i) => (
              <div 
                key={i}
                ref={el => featureRefs.current[i + 16] = el}
                className={`${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-blue-900/60 to-purple-900/60 border-blue-500/50 transform scale-105 z-10' 
                    : 'bg-gray-800/50 border-purple-900/30'
                } backdrop-blur-sm p-6 rounded-xl shadow-lg border transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl opacity-0`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300">{plan.period}</span>
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => navigate('/auth?tab=signup')}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white relative z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Customers Deserve the Best. <br/>So Does Your Retention Strategy.
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            AI-powered retention, automated engagement, and seamless insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('#demo')}
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 shadow-lg shadow-purple-500/30"
            >
              Book a Free Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/auth?tab=signup')}
            >
              Try for Free
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link to="#solutions" className="hover:text-blue-400 transition-colors">Solutions</Link></li>
                <li><Link to="#pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link to="#demo" className="hover:text-blue-400 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-blue-400 transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Community</Link></li>
                <li><Link to="#" className="hover:text-blue-400 transition-colors">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="hover:text-blue-400 transition-colors">
                  <a href="mailto:shashankhiremath343@gmail.com">shashankhiremath343@gmail.com</a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/shashank-hiremath-64032324a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <RenewlyticsLogo variant="with-tagline" size="md" />
            </div>
            <div className="flex flex-col text-center md:text-right">
              <p className="mb-2">© 2025 Renewlytics. All rights reserved.</p>
              <p>Built by <span className="text-blue-400">Product Wizard Shashank</span></p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Animated chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-14 w-14 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 transition-all duration-300 animate-pulse-glow"
          onClick={() => alert('Chat functionality would be implemented here!')}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Landing;
