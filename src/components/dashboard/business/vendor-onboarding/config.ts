import { Building2, FileText, DollarSign, ShieldCheck } from 'lucide-react';
import type { StepConfig } from './types';

export const VENDOR_ONBOARDING_STEPS: StepConfig[] = [
  { id: 1, label: 'Business Type', icon: Building2 },
  { id: 2, label: 'Business Details', icon: FileText },
  { id: 3, label: 'Catalog & Pricing', icon: DollarSign },
  { id: 4, label: 'Verification', icon: ShieldCheck },
];

export const BUSINESS_CATEGORIES = [
  'Cleaning Services',
  'Electrical',
  'Retail Inventory',
  'Facility Management',
  'Logistics'
];

export const PRICING_TYPES = [
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'unit', label: 'Per Unit' },
  { value: 'project', label: 'Fixed Price' }
] as const;

export const INITIAL_FORM_DATA = {
  type: 'service' as const,
  businessName: '',
  legalName: '',
  cacNumber: '',
  email: '',
  phone: '',
  address: '',
  categories: [] as string[],
  pricingType: 'hourly' as const,
  pricingRate: '',
  description: '',
  idFile: null as File | null,
  certFile: null as File | null
};

export const SUPPORT_MESSAGE = {
  title: 'Need Assistance?',
  description: 'Our onboarding specialized team is available 24/7 to help you with the registration process.'
};

export const VERIFICATION_DOCS = {
  id: {
    title: 'Government Issued ID',
    description: "Passport, Driver's license or NIN of primary business owner.",
    types: ['PDF', 'JPG']
  },
  cert: {
    title: 'Certifications',
    description: 'Professional certifications (e.g., HSE, COREN, Health & Safety).',
    types: ['PDF', 'JPG']
  }
};
