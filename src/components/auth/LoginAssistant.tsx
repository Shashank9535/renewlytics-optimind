
import { useState, useEffect } from 'react';
import { X, Bot, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginAssistantProps {
  onClose: () => void;
  error?: string;
}

export const LoginAssistant = ({ onClose, error }: LoginAssistantProps) => {
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Hello! I'm your Renewlytics assistant. How can I help you with logging in today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // If there was an authentication error, add a helpful message
    if (error) {
      const errorResponse = {
        text: `Looks like your credentials don't match. Need help? I'm here to guide you.`,
        isBot: true
      };
      setMessages([...messages, errorResponse]);
    }
  }, [error]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { text: inputValue, isBot: false };
    setMessages([...messages, userMessage]);
    
    // Clear input and show typing indicator
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('forgot') && lowerInput.includes('password')) {
        botResponse = "You can reset your password by clicking on the 'Forgot password?' link just above the sign-in button.";
      } else if (lowerInput.includes('sign up') || lowerInput.includes('register') || lowerInput.includes('create account')) {
        botResponse = "You can create a new account by clicking on 'Create one' at the bottom of the login form.";
      } else if (lowerInput.includes('google') || lowerInput.includes('social')) {
        botResponse = "You can sign in with Google by clicking the Google button below the login form.";
      } else if (lowerInput.includes('error') || lowerInput.includes('wrong') || lowerInput.includes('invalid')) {
        botResponse = "If you're experiencing login issues, double-check your email and password. For persistent problems, try resetting your password or contact support.";
      } else {
        botResponse = "I can help with login issues, account creation, or password recovery. Please let me know what specific assistance you need.";
      }
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleReset = () => {
    setMessages([
      { text: "Hello! I'm your Renewlytics assistant. How can I help you with logging in today?", isBot: true }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-slate-800 rounded-lg shadow-lg shadow-blue-500/10 border border-slate-700 flex flex-col z-50 animate-slide-in-right">
      {/* Header */}
      <div className="p-3 border-b border-slate-700 flex items-center justify-between bg-gradient-to-r from-blue-600 to-teal-500 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-white" />
          <h3 className="text-white font-medium">AI Assistant</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-blue-600/50 text-white"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-blue-600/50 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`rounded-lg p-2 max-w-[85%] ${
                message.isBot 
                  ? 'bg-slate-700 text-slate-200' 
                  : 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-700 rounded-lg p-2 text-slate-200 flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-slate-700 flex gap-2">
        <Input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask for help logging in..."
          className="bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
