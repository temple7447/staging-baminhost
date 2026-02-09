import React from 'react';
import { FormInputField } from './FormInputField';
import type { VendorFormData } from './types';

interface BusinessDetailsStepProps {
  formData: VendorFormData;
  onChange: (field: keyof VendorFormData, value: string) => void;
}

export const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Business Details</h2>
        <p className="text-slate-500 mt-2">Basic information to identify your business entity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputField
          label="Contact Person (Full Name)"
          id="legalName"
          placeholder="e.g. John Doe"
          value={formData.legalName}
          onChange={(value) => onChange('legalName', value)}
          required
          fullWidth
        />
        <FormInputField
          label="Display Trading Name"
          id="businessName"
          placeholder="e.g. Apex Industrial Solutions Ltd"
          value={formData.businessName}
          onChange={(value) => onChange('businessName', value)}
        />
        <FormInputField
          label="CAC Registration Number"
          id="cacNumber"
          placeholder="RC-1234567"
          value={formData.cacNumber}
          onChange={(value) => onChange('cacNumber', value)}
        />
        <FormInputField
          label="Business Email Address"
          id="email"
          type="email"
          placeholder="contact@business.com"
          value={formData.email}
          onChange={(value) => onChange('email', value)}
        />
        <FormInputField
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="+234 ..."
          value={formData.phone}
          onChange={(value) => onChange('phone', value)}
        />
        <FormInputField
          label="Registered Office Address"
          id="address"
          type="textarea"
          placeholder="Full physical address..."
          value={formData.address}
          onChange={(value) => onChange('address', value)}
          fullWidth
        />
      </div>
    </div>
  );
};
