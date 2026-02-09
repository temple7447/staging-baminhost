import React from 'react';
import { Upload } from 'lucide-react';
import { DocumentUploadCard } from './DocumentUploadCard';

interface VerificationStepProps {
  idFile: File | null;
  certFile: File | null;
  onIdFileChange: (file: File | null) => void;
  onCertFileChange: (file: File | null) => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  idFile,
  certFile,
  onIdFileChange,
  onCertFileChange
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Verification</h2>
        <p className="text-slate-500 mt-2">Upload documents to verify your business legitimacy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUploadCard type="id" file={idFile} onChange={onIdFileChange} />
        <DocumentUploadCard type="cert" file={certFile} onChange={onCertFileChange} />
      </div>

      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3">
        <Upload className="w-5 h-5 text-blue-600 shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          By submitting this form, you agree to BusinessHub's <span className="text-blue-600 font-bold underline cursor-pointer">Vendor Terms of Engagement</span> and background verification process.
        </p>
      </div>
    </div>
  );
};
