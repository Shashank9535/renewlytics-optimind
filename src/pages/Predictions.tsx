
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { SelfLearningAI } from '@/components/ai/SelfLearningAI';
import { TrackingSDK } from '@/components/sdk/TrackingSDK';
import { SecurityCompliance } from '@/components/security/SecurityCompliance';
import { ActionableInsightsCard } from '@/components/dashboard/ActionableInsightsCard';
import { ModelSelector } from '@/components/predictions/ModelSelector';
import { PredictionControls } from '@/components/predictions/PredictionControls';
import { ChurnPredictionAccuracyChart } from '@/components/predictions/ChurnPredictionAccuracyChart';
import { ChurnFactorsChart } from '@/components/predictions/ChurnFactorsChart';
import { FutureChurnProjectionChart } from '@/components/predictions/FutureChurnProjectionChart';
import { CustomerSegmentForecast } from '@/components/predictions/CustomerSegmentForecast';

const Predictions = () => {
  const [timeFrame, setTimeFrame] = useState('30');
  const [modelVersion, setModelVersion] = useState('v2');
  const [confidenceLevel, setConfidenceLevel] = useState('high');

  // Sample prediction data
  const churnPredictionData = {
    v1: [
      { name: 'Week 1', actual: 12, predicted: 14 },
      { name: 'Week 2', actual: 15, predicted: 16 },
      { name: 'Week 3', actual: 18, predicted: 19 },
      { name: 'Week 4', actual: 14, predicted: 15 },
      { name: 'Week 5', actual: 21, predicted: 20 },
      { name: 'Week 6', actual: 25, predicted: 24 },
      { name: 'Week 7', actual: 22, predicted: 21 },
      { name: 'Week 8', actual: 19, predicted: 20 },
      { name: 'Week 9', actual: 17, predicted: 18 },
      { name: 'Week 10', actual: 16, predicted: 17 },
      { name: 'Week 11', actual: 15, predicted: 15 },
      { name: 'Week 12', actual: 14, predicted: 13 },
    ],
    v2: [
      { name: 'Week 1', actual: 12, predicted: 12.2 },
      { name: 'Week 2', actual: 15, predicted: 15.1 },
      { name: 'Week 3', actual: 18, predicted: 17.8 },
      { name: 'Week 4', actual: 14, predicted: 14.3 },
      { name: 'Week 5', actual: 21, predicted: 20.8 },
      { name: 'Week 6', actual: 25, predicted: 24.9 },
      { name: 'Week 7', actual: 22, predicted: 22.1 },
      { name: 'Week 8', actual: 19, predicted: 19.2 },
      { name: 'Week 9', actual: 17, predicted: 16.9 },
      { name: 'Week 10', actual: 16, predicted: 16.2 },
      { name: 'Week 11', actual: 15, predicted: 15.0 },
      { name: 'Week 12', actual: 14, predicted: 13.9 },
    ]
  };

  const churnFactorsData = {
    v1: [
      { subject: 'Inactivity', A: 85, fullMark: 100 },
      { subject: 'Payment Issues', A: 65, fullMark: 100 },
      { subject: 'Support Tickets', A: 42, fullMark: 100 },
      { subject: 'Feature Usage', A: 35, fullMark: 100 },
      { subject: 'Seasonality', A: 25, fullMark: 100 },
      { subject: 'Price Sensitivity', A: 58, fullMark: 100 },
    ],
    v2: [
      { subject: 'Inactivity', A: 87, fullMark: 100 },
      { subject: 'Payment Issues', A: 72, fullMark: 100 },
      { subject: 'Support Tickets', A: 53, fullMark: 100 },
      { subject: 'Feature Usage', A: 41, fullMark: 100 },
      { subject: 'Seasonality', A: 38, fullMark: 100 },
      { subject: 'Price Sensitivity', A: 64, fullMark: 100 },
      { subject: 'Competitor Activity', A: 59, fullMark: 100 },
      { subject: 'Industry Changes', A: 47, fullMark: 100 },
    ]
  };

  const futureChurnData = {
    v1: [
      { month: 'Jan', rate: 3.2, projected: 3.2 },
      { month: 'Feb', rate: 3.4, projected: 3.4 },
      { month: 'Mar', rate: 3.1, projected: 3.1 },
      { month: 'Apr', rate: 2.9, projected: 2.9 },
      { month: 'May', rate: 3.0, projected: 3.0 },
      { month: 'Jun', rate: 3.2, projected: 3.2 },
      { month: 'Jul', rate: null, projected: 3.0 },
      { month: 'Aug', rate: null, projected: 2.8 },
      { month: 'Sep', rate: null, projected: 2.7 },
      { month: 'Oct', rate: null, projected: 2.6 },
      { month: 'Nov', rate: null, projected: 2.8 },
      { month: 'Dec', rate: null, projected: 3.0 },
    ],
    v2: [
      { month: 'Jan', rate: 3.2, projected: 3.2, confidenceLow: 3.1, confidenceHigh: 3.3 },
      { month: 'Feb', rate: 3.4, projected: 3.4, confidenceLow: 3.3, confidenceHigh: 3.5 },
      { month: 'Mar', rate: 3.1, projected: 3.1, confidenceLow: 3.0, confidenceHigh: 3.2 },
      { month: 'Apr', rate: 2.9, projected: 2.9, confidenceLow: 2.8, confidenceHigh: 3.0 },
      { month: 'May', rate: 3.0, projected: 3.0, confidenceLow: 2.9, confidenceHigh: 3.1 },
      { month: 'Jun', rate: 3.2, projected: 3.2, confidenceLow: 3.1, confidenceHigh: 3.3 },
      { month: 'Jul', rate: null, projected: 2.9, confidenceLow: 2.7, confidenceHigh: 3.1 },
      { month: 'Aug', rate: null, projected: 2.7, confidenceLow: 2.5, confidenceHigh: 2.9 },
      { month: 'Sep', rate: null, projected: 2.5, confidenceLow: 2.3, confidenceHigh: 2.7 },
      { month: 'Oct', rate: null, projected: 2.4, confidenceLow: 2.2, confidenceHigh: 2.6 },
      { month: 'Nov', rate: null, projected: 2.6, confidenceLow: 2.4, confidenceHigh: 2.8 },
      { month: 'Dec', rate: null, projected: 2.8, confidenceLow: 2.6, confidenceHigh: 3.0 },
    ]
  };

  const customerSegmentForecast = {
    v1: [
      { segment: 'New Users', current: 120, forecast30: 140, forecast60: 160, forecast90: 175 },
      { segment: 'Active Users', current: 450, forecast30: 460, forecast60: 475, forecast90: 490 },
      { segment: 'At Risk', current: 85, forecast30: 75, forecast60: 65, forecast90: 60 },
      { segment: 'Churned', current: 65, forecast30: 70, forecast60: 75, forecast90: 80 },
    ],
    v2: [
      { segment: 'New Users', current: 120, forecast30: 146, forecast60: 168, forecast90: 185 },
      { segment: 'Active Users', current: 450, forecast30: 473, forecast60: 492, forecast90: 512 },
      { segment: 'At Risk', current: 85, forecast30: 68, forecast60: 57, forecast90: 51 },
      { segment: 'Churned', current: 65, forecast30: 63, forecast60: 61, forecast90: 59 },
      { segment: 'Champions', current: 42, forecast30: 48, forecast60: 54, forecast90: 61 },
      { segment: 'Need Attention', current: 78, forecast30: 72, forecast60: 66, forecast90: 59 },
    ]
  };

  const accuracyMetrics = {
    v1: {
      accuracy: 92.4,
      improvement: 0,
      forecastedReduction: 15.2
    },
    v2: {
      accuracy: 97.8,
      improvement: 5.4,
      forecastedReduction: 21.7
    }
  };

  const actionableInsights = [
    {
      id: "1",
      title: "Offer discounts to at-risk enterprise customers",
      description: "15 enterprise customers are showing early churn signals based on decreased feature usage.",
      priority: "high" as "high",
      action: "Create Targeted Campaign"
    },
    {
      id: "2",
      title: "Improve onboarding for new mobile app users",
      description: "Mobile app users are 3.2x more likely to churn in the first 30 days due to incomplete onboarding.",
      priority: "medium" as "medium",
      action: "Review Onboarding Flow"
    },
    {
      id: "3",
      title: "Schedule QBRs with customers approaching renewal",
      description: "64 customers have renewal dates within the next 45 days with no scheduled reviews.",
      priority: "medium" as "medium",
      action: "Plan QBR Schedule"
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">AI Predictions</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Forward-looking analysis based on our machine learning models
        </p>
      </div>

      <div className="mb-6 animate-fade-up">
        <SelfLearningAI />
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
        <ModelSelector modelVersion={modelVersion} setModelVersion={setModelVersion} />
        <PredictionControls confidenceLevel={confidenceLevel} setConfidenceLevel={setConfidenceLevel} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up">
        <ChurnPredictionAccuracyChart 
          data={churnPredictionData[modelVersion]} 
          metrics={accuracyMetrics[modelVersion]} 
        />
        <ChurnFactorsChart 
          data={churnFactorsData[modelVersion]} 
          modelVersion={modelVersion} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <FutureChurnProjectionChart 
          data={futureChurnData[modelVersion]} 
          modelVersion={modelVersion} 
          confidenceLevel={confidenceLevel} 
        />
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-6">
          <ActionableInsightsCard insights={actionableInsights} className="border-0 shadow-none p-0" />
        </div>
      </div>

      <div className="mb-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <TrackingSDK />
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
        <CustomerSegmentForecast 
          data={customerSegmentForecast[modelVersion]} 
          timeFrame={timeFrame} 
          setTimeFrame={setTimeFrame} 
        />
      </div>

      <div className="mt-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
        <SecurityCompliance />
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
