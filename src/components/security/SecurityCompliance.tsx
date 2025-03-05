
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecurityTabWrapper } from './components/SecurityTabWrapper';
import { SecurityCheckItem, ComplianceItem, DataPrivacyControl } from './components/types';

export function SecurityCompliance() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const securityScore = 92;
  
  const complianceItems: ComplianceItem[] = [
    { name: 'GDPR', status: 'compliant', score: 98 },
    { name: 'HIPAA', status: 'compliant', score: 96 },
    { name: 'SOC 2', status: 'compliant', score: 94 },
    { name: 'ISO 27001', status: 'compliant', score: 95 },
    { name: 'CCPA', status: 'compliant', score: 97 },
  ];
  
  const securityChecks: SecurityCheckItem[] = [
    { name: 'Data Encryption at Rest', status: 'passed', details: 'AES-256 encryption for all stored data' },
    { name: 'Data Encryption in Transit', status: 'passed', details: 'TLS 1.3 for all data transfers' },
    { name: 'Authentication', status: 'passed', details: 'Multi-factor authentication enabled' },
    { name: 'Access Controls', status: 'passed', details: 'Role-based access control implemented' },
    { name: 'Vulnerability Scanning', status: 'passed', details: 'Daily automated scans' },
    { name: 'Audit Logging', status: 'warning', details: 'Retention period below recommendation' },
    { name: 'Intrusion Detection', status: 'passed', details: 'Real-time monitoring active' },
    { name: 'Backup & Recovery', status: 'passed', details: 'Hourly backups with 99.99% recovery SLA' },
  ];
  
  const dataPrivacyControls: DataPrivacyControl[] = [
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
        <SecurityTabWrapper
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          securityScore={securityScore}
          securityChecks={securityChecks}
          complianceItems={complianceItems}
          dataPrivacyControls={dataPrivacyControls}
        />
      </CardContent>
    </Card>
  );
}
