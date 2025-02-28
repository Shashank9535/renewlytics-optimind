
import { UsersIcon, AlertTriangleIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  churnRisk: 'high' | 'medium' | 'low';
  churnReason: string;
  lastActive: string;
}

interface AtRiskCustomersTableProps {
  customers: Customer[];
  className?: string;
}

export function AtRiskCustomersTable({ customers, className }: AtRiskCustomersTableProps) {
  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-rose-600 bg-rose-50 dark:bg-rose-950 dark:text-rose-300';
      case 'medium':
        return 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-300';
      case 'low':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300';
      default:
        return 'text-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-slate-300';
    }
  };

  return (
    <div className={cn("overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800", className)}>
      <div className="p-6 pb-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <h3 className="font-medium">At-Risk Customers</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 p-4">Customer</th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 p-4">Risk Level</th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 p-4">Risk Reason</th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 p-4">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{customer.email}</div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getChurnRiskColor(customer.churnRisk))}>
                    {customer.churnRisk === 'high' && <AlertTriangleIcon className="h-3 w-3 mr-1" />}
                    {customer.churnRisk.charAt(0).toUpperCase() + customer.churnRisk.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-sm">{customer.churnReason}</td>
                <td className="p-4 text-sm whitespace-nowrap">
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {customer.lastActive}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
