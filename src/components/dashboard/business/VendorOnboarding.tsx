import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardVendorMutation } from '@/services/vendorsApi';
import { toast } from '@/components/ui/use-toast';
import {
  BusinessTypeStep,
  BusinessDetailsStep,
  CatalogPricingStep,
  VerificationStep,
  OnboardingSidebar,
  OnboardingHeader,
  OnboardingFooter,
  useFormStep,
  useVendorFormData,
  VENDOR_ONBOARDING_STEPS,
} from './vendor-onboarding';

export const VendorOnboarding: React.FC = () => {
  const [onboardVendor] = useOnboardVendorMutation();
  const { currentStep, goToNextStep, goToPreviousStep, canGoPrevious } = useFormStep(1);
  const { formData, updateField } = useVendorFormData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onboardVendor({
        name: formData.legalName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        cacNumber: formData.cacNumber,
        businessAddress: formData.address,
        specialization: formData.description,
        portfolio: [],
        sendCredentials: true
      }).unwrap();

      toast({
        title: "Registration Submitted!",
        description: "Applications are typically reviewed within 24-48 hours."
      });
      // Navigate after successful submission
      setTimeout(() => {
        window.location.href = '/dashboard/vendor-management';
      }, 1500);
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: "Please check your inputs and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) goToNextStep();
    else handleSubmit();
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
                <BusinessTypeStep
                  selectedType={formData.type}
                  onTypeChange={(type) => updateField('type', type)}
                />
              )}
              {currentStep === 2 && (
                <BusinessDetailsStep
                  formData={formData}
                  onChange={updateField}
                />
              )}
              {currentStep === 3 && (
                <CatalogPricingStep
                  formData={formData}
                  onCategoryChange={(cats) => updateField('categories', cats)}
                  onPricingTypeChange={(type) => updateField('pricingType', type)}
                  onPricingRateChange={(rate) => updateField('pricingRate', rate)}
                />
              )}
              {currentStep === 4 && (
                <VerificationStep
                  idFile={formData.idFile}
                  certFile={formData.certFile}
                  onIdFileChange={(file) => updateField('idFile', file)}
                  onCertFileChange={(file) => updateField('certFile', file)}
                />
              )}
            </CardContent>

            {/* Footer */}
            <OnboardingFooter
              currentStep={currentStep}
              totalSteps={4}
              isSubmitting={isSubmitting}
              onPrevious={goToPreviousStep}
              onNext={handleNext}
              canGoPrevious={canGoPrevious}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

