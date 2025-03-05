
import React from 'react';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DataPrivacyControl {
  name: string;
  enabled: boolean;
}

interface DataPrivacyTabProps {
  dataPrivacyControls: DataPrivacyControl[];
}

export function DataPrivacyTab({ dataPrivacyControls }: DataPrivacyTabProps) {
  return (
    <>
      <h3 className="font-medium mb-4">Data Privacy Controls</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dataPrivacyControls.map((control, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 rounded-lg border ${
              control.enabled 
                ? 'border-green-200 bg-green-50 dark:border-green-800/50 dark:bg-green-900/20' 
                : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50'
            }`}
          >
            <span className="font-medium text-sm">{control.name}</span>
            {control.enabled ? (
              <Badge variant="outline" className="bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50">
                Enabled
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Disabled
              </Badge>
            )}
          </div>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4">
        <h3 className="font-medium flex items-center gap-2 text-blue-800 dark:text-blue-300">
          <Info className="h-5 w-5" />
          Data Processing Information
        </h3>
        <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">
          All data processing activities are documented according to regulatory requirements. Our platform provides 
          automated tools for generating data processing records, managing consent, and fulfilling data subject 
          requests in compliance with global privacy regulations.
        </p>
      </div>
    </>
  );
}
