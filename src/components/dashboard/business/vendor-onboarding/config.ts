import { UserPlus } from 'lucide-react';
import type { StepConfig } from './types';

export const VENDOR_ONBOARDING_STEPS: StepConfig[] = [
  { id: 1, label: 'Basic Information', icon: UserPlus },
];

export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  position: '',
  sendCredentials: true
};

export const SUPPORT_MESSAGE = {
  title: 'Need Assistance?',
  description: 'Our onboarding team is available 24/7 to help you with the vendor registration process.'
};
