
export interface SecurityCheckItem {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

export interface ComplianceItem {
  name: string;
  status: string;
  score: number;
}

export interface DataPrivacyControl {
  name: string;
  enabled: boolean;
}
