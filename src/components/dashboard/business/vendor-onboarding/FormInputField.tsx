import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormInputFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  fullWidth?: boolean;
}

export const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  fullWidth = false
}) => {
  const containerClass = fullWidth ? 'md:col-span-2' : '';

  return (
    <div className={`space-y-2 ${containerClass}`}>
      <Label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          className="bg-slate-50/50 rounded-xl resize-none min-h-[100px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-12 bg-slate-50/50 rounded-xl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  );
};
