
import React from 'react';
import { CircleCheck, AlertCircle, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface SecurityCheckItem {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

interface SecurityOverviewProps {
  securityScore: number;
  securityChecks: SecurityCheckItem[];
}

export function SecurityOverview({ securityScore, securityChecks }: SecurityOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={securityScore >= 90 ? "#10b981" : securityScore >= 70 ? "#f59e0b" : "#ef4444"}
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 45 * securityScore / 100} ${2 * Math.PI * 45 * (1 - securityScore / 100)}`}
              strokeDashoffset={2 * Math.PI * 45 * 0.25}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{securityScore}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Security Score</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-medium">Enterprise Ready</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your system meets enterprise security standards
          </p>
        </div>
      </div>
      
      <div className="col-span-2">
        <h3 className="font-medium mb-4">Security Checks</h3>
        <div className="space-y-3">
          {securityChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {check.status === 'passed' ? (
                  <CircleCheck className="h-5 w-5 text-green-500" />
                ) : check.status === 'warning' ? (
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-500" />
                )}
                <span className="text-sm font-medium">{check.name}</span>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{check.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {check.details}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
