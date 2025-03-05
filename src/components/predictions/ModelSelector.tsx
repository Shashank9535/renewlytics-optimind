
import { Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModelSelectorProps {
  modelVersion: string;
  setModelVersion: (version: string) => void;
}

export function ModelSelector({ modelVersion, setModelVersion }: ModelSelectorProps) {
  return (
    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
        <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">AI Model Version</div>
        <div className="flex items-center gap-2">
          <Select value={modelVersion} onValueChange={setModelVersion}>
            <SelectTrigger className="w-[120px] h-7 text-xs border-blue-200 dark:border-blue-800">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">Version 1.0</SelectItem>
              <SelectItem value="v2">Version 2.0 (Latest)</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 h-5 text-xs">
            {modelVersion === 'v2' ? 'Enhanced ML' : 'Base ML'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
