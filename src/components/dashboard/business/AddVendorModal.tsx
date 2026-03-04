import React, { useState } from 'react';
import { Mail, Phone, User, Briefcase, Send, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboardVendorMutation } from '@/services/vendorsApi';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface AddVendorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddVendorModal: React.FC<AddVendorModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    sendCredentials: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardVendor] = useOnboardVendorMutation();

  const validateForm = (): boolean => {
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
      newErrors.email = 'Invalid email address';
    }

    if (formData.position && formData.position.length > 100) {
      newErrors.position = 'Position must not exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onboardVendor({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        position: formData.position || undefined,
        sendCredentials: formData.sendCredentials
      }).unwrap();

      toast({
        title: "Vendor Added Successfully! ✓",
        description: "The vendor has been onboarded and will appear in your vendor list."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        sendCredentials: true
      });
      setErrors({});

      // Close modal
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Failed to Add Vendor",
        description: err?.data?.message || "Please check your inputs and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Vendor</DialogTitle>
          <DialogDescription>
            Enter the vendor's basic information. You can configure business details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Full Name *
              </div>
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
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
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
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
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
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
              onChange={(e) => handleInputChange('position', e.target.value)}
              maxLength={100}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
            {errors.position && <p className="text-xs text-red-600 mt-1">{errors.position}</p>}
          </div>

          {/* Send Credentials */}
          <label className="flex items-center gap-3 cursor-pointer bg-blue-50 p-3 rounded-lg border border-blue-200">
            <input
              type="checkbox"
              checked={formData.sendCredentials}
              onChange={(e) => handleInputChange('sendCredentials', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-900">
              Send login credentials via email
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Add Vendor
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
