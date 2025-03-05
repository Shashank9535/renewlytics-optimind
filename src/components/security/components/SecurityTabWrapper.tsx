
import React from 'react';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurityOverview } from './SecurityOverview';
import { ComplianceTab } from './ComplianceTab';
import { DataPrivacyTab } from './DataPrivacyTab';

interface SecurityCheckItem {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

interface ComplianceItem {
  name: string;
  status: string;
  score: number;
}

interface DataPrivacyControl {
  name: string;
  enabled: boolean;
}

interface SecurityTabWrapperProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  securityScore: number;
  securityChecks: SecurityCheckItem[];
  complianceItems: ComplianceItem[];
  dataPrivacyControls: DataPrivacyControl[];
}

export function SecurityTabWrapper({
  activeTab,
  setActiveTab,
  securityScore,
  securityChecks,
  complianceItems,
  dataPrivacyControls
}: SecurityTabWrapperProps) {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4" />
          <span>Security Overview</span>
        </TabsTrigger>
        <TabsTrigger value="compliance" className="flex items-center gap-1">
          <FileCheck className="h-4 w-4" />
          <span>Compliance</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-1">
          <Lock className="h-4 w-4" />
          <span>Data Privacy</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <SecurityOverview 
          securityScore={securityScore} 
          securityChecks={securityChecks} 
        />
      </TabsContent>
      
      <TabsContent value="compliance" className="mt-0">
        <ComplianceTab 
          complianceItems={complianceItems} 
        />
      </TabsContent>
      
      <TabsContent value="privacy" className="mt-0">
        <DataPrivacyTab 
          dataPrivacyControls={dataPrivacyControls} 
        />
      </TabsContent>
    </Tabs>
  );
}
