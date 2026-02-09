import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface DocumentUploadCardProps {
  type: 'id' | 'cert';
  file: File | null;
  onChange: (file: File | null) => void;
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({ type, file, onChange }) => {
  const inputId = `${type}-upload`;
  const isId = type === 'id';

  return (
    <div className="p-6 border border-slate-200 rounded-3xl bg-white space-y-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isId ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
        }`}>
          {isId ? <FileText className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </div>
        {file ? (
          <Badge className="bg-green-100 text-green-700 border-0">Selected</Badge>
        ) : (
          <Button variant="link" className="text-xs text-blue-600 font-bold p-0">Upload</Button>
        )}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">
          {isId ? 'Government Issued ID' : 'Certifications'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {isId 
            ? "Passport, Driver's license or NIN of primary business owner."
            : 'Professional certifications (e.g., HSE, COREN, Health & Safety).'
          }
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        id={inputId}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <Label htmlFor={inputId} className="w-full block">
        <div className="h-10 w-full border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
          {file ? file.name : 'Select PDF or JPG'}
        </div>
      </Label>
    </div>
  );
};
