export type Step = 1 | 2 | 3 | 4;

export type VendorType = 'service' | 'product';
export type PricingType = 'hourly' | 'unit' | 'project';

export interface VendorFormData {
  type: VendorType;
  businessName: string;
  legalName: string;
  cacNumber: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  pricingType: PricingType;
  pricingRate: string;
  description: string;
  idFile: File | null;
  certFile: File | null;
}

export interface StepConfig {
  id: Step;
  label: string;
  icon: any;
}

export interface StepProgressProps {
  currentStep: Step;
  steps: StepConfig[];
}

export interface OnboardVendorPayload {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  cacNumber: string;
  businessAddress: string;
  specialization: string;
  portfolio: string[];
  sendCredentials: boolean;
}
