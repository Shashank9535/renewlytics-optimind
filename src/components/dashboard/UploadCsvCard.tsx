
import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface UploadCsvCardProps {
  className?: string;
}

export function UploadCsvCard({ className }: UploadCsvCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      handleFileSelection(droppedFile);
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsUploading(false);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been processed.`,
    });
  };

  return (
    <div 
      className={cn(
        "rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        <h3 className="font-medium">Import Customer Data</h3>
      </div>
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all",
          isDragging ? "border-renewal-500 bg-renewal-50 dark:bg-renewal-950/20" : "border-slate-200 dark:border-slate-700",
          file ? "bg-slate-50 dark:bg-slate-800/50" : ""
        )}
      >
        {!file ? (
          <>
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
              CSV files only (max 10MB)
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="hidden"
              id="csv-upload"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('csv-upload')?.click()}
            >
              Browse files
            </Button>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                className="flex-1"
                disabled={isUploading}
                onClick={handleUpload}
              >
                {isUploading ? "Uploading..." : "Upload & Process Data"}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setFile(null)}
                disabled={isUploading}
              >
                <AlertCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">CSV Format Requirements</h4>
        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 ml-5 list-disc">
          <li>Include customer ID, name, email</li>
          <li>Usage data (login frequency, feature usage)</li>
          <li>Subscription data (plan, billing cycle)</li>
          <li>Historical engagement metrics</li>
        </ul>
      </div>
    </div>
  );
}
