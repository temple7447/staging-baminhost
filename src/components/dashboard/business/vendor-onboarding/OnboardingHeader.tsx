import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OnboardingHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        className="gap-2 text-slate-500 hover:text-slate-900 font-bold"
        onClick={() => navigate('/dashboard/vendor-management')}
      >
        <ChevronLeft className="w-4 h-4" /> Exit
      </Button>
      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        <span>Vendor Portal</span>
        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
        <span>Help Center</span>
      </div>
    </div>
  );
};
