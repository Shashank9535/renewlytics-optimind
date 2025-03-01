
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Insight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

interface ActionableInsightsCardProps {
  insights: Insight[];
  className?: string;
}

export function ActionableInsightsCard({ insights, className }: ActionableInsightsCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
      case 'medium':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className={cn("rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800", className)}>
      <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          <h3 className="font-medium">AI-Powered Insights</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
          >
            <div className="flex items-start gap-3">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getPriorityColor(insight.priority))}>
                {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)}
              </span>
              <h4 className="text-sm font-medium flex-1">{insight.title}</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {insight.description}
            </p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between group"
              >
                <span>{insight.action}</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
