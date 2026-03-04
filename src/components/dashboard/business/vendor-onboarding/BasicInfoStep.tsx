import React from 'react';
import { Mail, Phone, User, Briefcase, Send } from 'lucide-react';
import { FormInputField } from './FormInputField';
import type { VendorFormData } from './types';

interface BasicInfoStepProps {
  formData: VendorFormData;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, onChange }) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must not exceed 50 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.position && formData.position.length > 100) {
      newErrors.position = 'Position must not exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Onboard a Vendor</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Create a new vendor account by providing their basic information. 
          Business details can be configured later by the admin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Full Name *
            </div>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            maxLength={50}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">2-50 characters</p>
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Email Address *
            </div>
          </label>
          <input
            id="email"
            type="email"
            placeholder="vendor@example.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">Valid email address required</p>
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              Phone Number
            </div>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+234 800 0000000"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">Optional</p>
        </div>

        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-slate-900 mb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Position/Role
            </div>
          </label>
          <input
            id="position"
            type="text"
            placeholder="e.g. Service Provider, Electrician"
            value={formData.position}
            onChange={(e) => onChange('position', e.target.value)}
            maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">Max 100 characters</p>
          {errors.position && <p className="text-xs text-red-600 mt-1">{errors.position}</p>}
        </div>

        {/* Send Credentials */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.sendCredentials}
              onChange={(e) => onChange('sendCredentials', e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-900">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                Send login credentials via email
              </div>
            </span>
          </label>
          <p className="text-xs text-slate-500 mt-2 ml-8">
            If enabled, the vendor will receive their login credentials via email
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">📝 Note:</span> Business details such as specialization, 
          categories, and other information can be configured later by the admin through the vendor management dashboard.
        </p>
      </div>
    </div>
  );
};
