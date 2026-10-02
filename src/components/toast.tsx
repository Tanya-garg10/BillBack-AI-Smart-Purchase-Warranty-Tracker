import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const Icon = toast.type === 'warning' ? AlertTriangle : toast.type === 'info' ? Info : CheckCircle2;
  const iconColor = toast.type === 'warning' ? 'text-amber-600' : toast.type === 'info' ? 'text-blue-600' : 'text-emerald-600';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 text-xs font-medium max-w-md">
        <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
        <span className="flex-1">{toast.message}</span>
      </div>
    </div>
  );
};
