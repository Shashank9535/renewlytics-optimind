
import React from 'react';
import { CircleCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ComplianceItem {
  name: string;
  status: string;
  score: number;
}

interface ComplianceTabProps {
  complianceItems: ComplianceItem[];
}

export function ComplianceTab({ complianceItems }: ComplianceTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-4">Compliance Certifications</h3>
        <div className="space-y-4">
          {complianceItems.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <Badge 
                    variant="outline" 
                    className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  >
                    Compliant
                  </Badge>
                </div>
                <span className="text-sm font-medium">{item.score}%</span>
              </div>
              <Progress value={item.score} className="h-2" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
        <h3 className="font-medium mb-4">Compliance Benefits</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Risk Mitigation</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Reduces legal and financial risks associated with data breaches
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Customer Trust</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Builds trust with customers by demonstrating commitment to data protection
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Market Access</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enables operation in regulated markets and industries
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Competitive Advantage</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Provides edge over competitors without robust compliance programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
