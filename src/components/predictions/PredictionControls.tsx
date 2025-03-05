
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Calendar, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface PredictionControlsProps {
  confidenceLevel: string;
  setConfidenceLevel: (level: string) => void;
}

export function PredictionControls({ confidenceLevel, setConfidenceLevel }: PredictionControlsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshPredictions = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh predictions
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Predictions refreshed",
        description: "AI models have been retrained with latest data.",
      });
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Confidence level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low Confidence</SelectItem>
          <SelectItem value="medium">Medium Confidence</SelectItem>
          <SelectItem value="high">High Confidence</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="gap-2" onClick={handleRefreshPredictions} disabled={isRefreshing}>
        {isRefreshing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        <span>Refresh Predictions</span>
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <Calendar className="h-4 w-4" />
        <span>Last 90 Days</span>
      </Button>
    </div>
  );
}
