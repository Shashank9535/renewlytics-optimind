
import React, { useState } from 'react';
import { ShieldCheck, Lock, FileCheck, BarChart3, CircleCheck, XCircle, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function SecurityCompliance() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const securityScore = 92;
  
  const complianceItems = [
    { name: 'GDPR', status: 'compliant', score: 98 },
    { name: 'HIPAA', status: 'compliant', score: 96 },
    { name: 'SOC 2', status: 'compliant', score: 94 },
    { name: 'ISO 27001', status: 'compliant', score: 95 },
    { name: 'CCPA', status: 'compliant', score: 97 },
  ];
  
  const securityChecks = [
    { name: 'Data Encryption at Rest', status: 'passed', details: 'AES-256 encryption for all stored data' },
    { name: 'Data Encryption in Transit', status: 'passed', details: 'TLS 1.3 for all data transfers' },
    { name: 'Authentication', status: 'passed', details: 'Multi-factor authentication enabled' },
    { name: 'Access Controls', status: 'passed', details: 'Role-based access control implemented' },
    { name: 'Vulnerability Scanning', status: 'passed', details: 'Daily automated scans' },
    { name: 'Audit Logging', status: 'warning', details: 'Retention period below recommendation' },
    { name: 'Intrusion Detection', status: 'passed', details: 'Real-time monitoring active' },
    { name: 'Backup & Recovery', status: 'passed', details: 'Hourly backups with 99.99% recovery SLA' },
  ];
  
  const dataPrivacyControls = [
    { name: 'User Data Anonymization', enabled: true },
    { name: 'Consent Management', enabled: true },
    { name: 'Data Subject Access Requests', enabled: true },
    { name: 'Data Retention Policies', enabled: true },
    { name: 'PII Data Masking', enabled: true },
    { name: 'Right to be Forgotten', enabled: true },
    { name: 'Cross-border Data Transfer', enabled: false },
    { name: 'Third-party Data Sharing', enabled: true },
  ];

  return (
    <Card className="shadow-md border border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Security & Compliance
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Enterprise
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Enterprise-scale security features and compliance certifications
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-0">
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
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
