import { useState, useCallback } from 'react';
import type { Step, VendorFormData } from './types';

export const useFormStep = (initialStep: Step = 1) => {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => ((prev + 1) as unknown as Step));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => ((prev - 1) as unknown as Step));
  }, []);

  const canGoPrevious = currentStep > 1;
  const canGoNext = currentStep < 4;

  return {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    canGoPrevious,
    canGoNext
  };
};

export const useVendorFormData = (initialData?: Partial<VendorFormData>) => {
  const defaultData: VendorFormData = {
    type: 'service',
    businessName: '',
    legalName: '',
    cacNumber: '',
    email: '',
    phone: '',
    address: '',
    categories: [],
    pricingType: 'hourly',
    pricingRate: '',
    description: '',
    idFile: null,
    certFile: null,
    ...initialData
  };

  const [formData, setFormData] = useState<VendorFormData>(defaultData);

  const updateField = useCallback((field: keyof VendorFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateMultipleFields = useCallback((updates: Partial<VendorFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(defaultData);
  }, []);

  return {
    formData,
    updateField,
    updateMultipleFields,
    resetForm,
    setFormData
  };
};
