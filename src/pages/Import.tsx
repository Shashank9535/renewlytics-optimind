
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UploadCsvCard } from '@/components/dashboard/UploadCsvCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Database, FileQuestion, ArrowRight } from 'lucide-react';

const Import = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Import Data</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Upload customer data to analyze and predict churn risk
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-renewal-500" />
                <span>Data Import Options</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to import your customer data into Renewlytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-renewal-100 dark:bg-renewal-900/30 flex items-center justify-center text-renewal-600 dark:text-renewal-400">
                        <FileUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">CSV Upload</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Upload data from a CSV file
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Active <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Database Connection</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Connect directly to your database
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <FileQuestion className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">API Integration</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Fetch data from your existing tools
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Template</CardTitle>
              <CardDescription>
                Download our template to ensure your data is formatted correctly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Download Template CSV</Button>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Our template includes all required fields and formatting guidelines to ensure successful data processing.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <UploadCsvCard className="h-full" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Import;
