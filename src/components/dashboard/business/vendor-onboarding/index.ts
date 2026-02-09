// Components
export { BusinessTypeStep } from './BusinessTypeStep';
export { BusinessDetailsStep } from './BusinessDetailsStep';
export { CatalogPricingStep } from './CatalogPricingStep';
export { VerificationStep } from './VerificationStep';
export { OnboardingSidebar } from './OnboardingSidebar';
export { OnboardingHeader } from './OnboardingHeader';
export { OnboardingFooter } from './OnboardingFooter';

// Sub-components
export { BusinessTypeSelector } from './BusinessTypeSelector';
export { DocumentUploadCard } from './DocumentUploadCard';
export { StepIndicator } from './StepIndicator';
export { SupportCard } from './SupportCard';
export { CategoryBadges } from './CategoryBadges';
export { FormInputField } from './FormInputField';

// Hooks
export { useFormStep, useVendorFormData } from './hooks';

// Types
export type { Step, VendorType, PricingType, VendorFormData, StepConfig } from './types';

// Config
export { VENDOR_ONBOARDING_STEPS, BUSINESS_CATEGORIES, PRICING_TYPES, INITIAL_FORM_DATA } from './config';
