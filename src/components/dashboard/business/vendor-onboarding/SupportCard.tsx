import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SUPPORT_MESSAGE } from './config';

export const SupportCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none p-5 rounded-3xl overflow-hidden relative group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
      <div className="relative z-10 space-y-3">
        <h4 className="text-sm font-bold text-white">{SUPPORT_MESSAGE.title}</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          {SUPPORT_MESSAGE.description}
        </p>
        <Button 
          variant="outline" 
          className="w-full h-8 text-[11px] font-bold bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-all"
        >
          Contact Support
        </Button>
      </div>
    </Card>
  );
};
