export type Step = 1;

export interface VendorFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  sendCredentials: boolean;
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
  position: string;
  sendCredentials: boolean;
}
