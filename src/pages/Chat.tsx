
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Chat with our AI assistant powered by Together AI
        </p>
      </div>
      <ChatInterface />
    </DashboardLayout>
  );
};

export default Chat;
