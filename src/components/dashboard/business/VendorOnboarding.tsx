import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardVendorMutation } from '@/services/vendorsApi';
import { toast } from '@/components/ui/use-toast';
import {
  BasicInfoStep,
  OnboardingSidebar,
  OnboardingHeader,
  OnboardingFooter,
  useFormStep,
  useVendorFormData,
  VENDOR_ONBOARDING_STEPS,
} from './vendor-onboarding';

export const VendorOnboarding: React.FC = () => {
  const [onboardVendor] = useOnboardVendorMutation();
  const { currentStep, goToPreviousStep, canGoPrevious } = useFormStep(1);
  const { formData, updateField } = useVendorFormData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      toast({
        title: "Validation Error",
        description: "Name must be at least 2 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.name.length > 50) {
      toast({
        title: "Validation Error",
        description: "Name must not exceed 50 characters.",
        variant: "destructive"
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      toast({
        title: "Validation Error",
        description: "Email address is required.",
        variant: "destructive"
      });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    // Position validation
    if (formData.position && formData.position.length > 100) {
      toast({
        title: "Validation Error",
        description: "Position must not exceed 100 characters.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onboardVendor({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        sendCredentials: formData.sendCredentials
      }).unwrap();

      toast({
        title: "Vendor Onboarded Successfully! ✓",
        description: "The vendor has been added to the system. Business details can be configured in the vendor management dashboard."
      });
      
      // Navigate after successful submission
      setTimeout(() => {
        window.location.href = '/dashboard/vendor-management';
      }, 1500);
    } catch (err: any) {
      toast({
        title: "Onboarding Failed",
        description: err?.data?.message || "Please check your inputs and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <OnboardingHeader />

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <OnboardingSidebar currentStep={currentStep} steps={VENDOR_ONBOARDING_STEPS} />

        {/* Form Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
            <CardContent className="p-8 md:p-12 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-hide">
              {currentStep === 1 && (
                <BasicInfoStep
                  formData={formData}
                  onChange={updateField}
                />
              )}
            </CardContent>

            {/* Footer */}
            <OnboardingFooter
              currentStep={currentStep}
              totalSteps={1}
              isSubmitting={isSubmitting}
              onPrevious={goToPreviousStep}
              onNext={handleSubmit}
              canGoPrevious={canGoPrevious}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

