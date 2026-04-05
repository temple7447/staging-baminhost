import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, X, MapPin, Clock, Award, FileText, Building2 } from 'lucide-react';
import type { Vendor, VendorServiceItem, VendorOperationalHours } from '@/services/vendorsApi';

interface VendorEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: Vendor | null;
  businessTypes: { _id: string; name: string }[];
  onSave: (id: string, data: VendorEditData) => Promise<void>;
  isLoading?: boolean;
}

export interface VendorEditData {
  name: string;
  email: string;
  phone: string;
  businessTypeId?: string;
  businessName?: string;
  specialization?: string;
  bio?: string;
  cacNumber?: string;
  govId?: string;
  certification?: string;
  isVerifiedPro?: boolean;
  businessAddress?: string;
  location?: string;
  operationalHours?: VendorOperationalHours;
  portfolio?: string[];
  services?: VendorServiceItem[];
}

export const VendorEditDialog: React.FC<VendorEditDialogProps> = ({
  open,
  onOpenChange,
  vendor,
  businessTypes = [],
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<VendorEditData>({
    name: '',
    email: '',
    phone: '',
    businessTypeId: '',
    businessName: '',
    specialization: '',
    bio: '',
    cacNumber: '',
    govId: '',
    certification: '',
    isVerifiedPro: false,
    businessAddress: '',
    location: '',
    operationalHours: {},
    portfolio: [],
    services: [],
  });

  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    if (vendor) {
      let vendorServices: VendorServiceItem[] = [];
      if (Array.isArray(vendor.services)) {
        vendorServices = vendor.services as VendorServiceItem[];
      } else if (typeof vendor.services === 'string' && vendor.services) {
        try {
          vendorServices = JSON.parse(vendor.services);
        } catch {
          vendorServices = [];
        }
      }

      let vendorOperationalHours: VendorOperationalHours = {};
      if (typeof vendor.operationalHours === 'object' && vendor.operationalHours !== null) {
        vendorOperationalHours = vendor.operationalHours as VendorOperationalHours;
      } else if (typeof vendor.operationalHours === 'string' && vendor.operationalHours) {
        try {
          vendorOperationalHours = JSON.parse(vendor.operationalHours);
        } catch {
          vendorOperationalHours = {};
        }
      }

      setFormData({
        name: vendor.name || '',
        email: vendor.email || '',
        phone: vendor.phone || '',
        businessTypeId: vendor.businessTypeId || '',
        businessName: vendor.businessName || '',
        specialization: vendor.specialization || '',
        bio: vendor.bio || '',
        cacNumber: vendor.cacNumber || '',
        govId: vendor.govId || '',
        certification: vendor.certification || '',
        isVerifiedPro: vendor.isVerifiedPro || false,
        businessAddress: vendor.businessAddress || '',
        location: typeof vendor.location === 'object' ? (vendor.location as any)?.address || '' : (vendor.location as string) || '',
        operationalHours: vendorOperationalHours,
        portfolio: Array.isArray(vendor.portfolio) ? vendor.portfolio : [],
        services: vendorServices,
      });
    }
  }, [vendor, open]);

  const addService = () => {
    if (serviceName.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...(prev.services || []), { name: serviceName.trim(), price: servicePrice ? Number(servicePrice) : undefined }],
      }));
      setServiceName('');
      setServicePrice('');
    }
  };

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: (prev.services || []).filter((_, i) => i !== index),
    }));
  };

  const addPortfolioUrl = () => {
    if (portfolioUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        portfolio: [...(prev.portfolio || []), portfolioUrl.trim()],
      }));
      setPortfolioUrl('');
    }
  };

  const removePortfolioUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: (prev.portfolio || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!vendor) return;
    try {
      await onSave(vendor._id, formData);
      onOpenChange(false);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vendor</DialogTitle>
          <DialogDescription>Update vendor information, business details, and services</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Details */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Contact Details
            </h4>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 0000000"
                />
              </div>
            </div>
          </div>

          {/* Business Profile */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium">Business Profile</h4>
            <div className="grid gap-2">
              <Label htmlFor="businessTypeId">Business Type</Label>
              <Select 
                value={formData.businessTypeId || ''} 
                onValueChange={(value) => setFormData({ ...formData, businessTypeId: value })}
              >
                <SelectTrigger id="businessTypeId">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Business name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g. Electrical, Plumbing"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio (up to 1000 characters)</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 1000) })}
                placeholder="Description of services..."
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                maxLength={1000}
              />
            </div>
          </div>

          {/* Legal & Verification */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Legal & Verification
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cacNumber">CAC Number</Label>
                <Input
                  id="cacNumber"
                  value={formData.cacNumber}
                  onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                  placeholder="RC-XXXXXX"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="govId">Government ID URL</Label>
                <Input
                  id="govId"
                  value={formData.govId}
                  onChange={(e) => setFormData({ ...formData, govId: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="certification">Certification URL</Label>
                <Input
                  id="certification"
                  value={formData.certification}
                  onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Checkbox
                  id="isVerifiedPro"
                  checked={formData.isVerifiedPro}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVerifiedPro: checked as boolean })}
                />
                <Label htmlFor="isVerifiedPro" className="cursor-pointer">
                  Mark as Verified Professional
                </Label>
              </div>
            </div>
          </div>

          {/* Storefront & Logistics */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Storefront & Logistics
            </h4>
            <div className="grid gap-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                placeholder="Full business address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location (address/coordinates)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Location details"
              />
            </div>
          </div>

          {/* Operational Hours */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Operational Hours
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {days.map((day) => (
                <div key={day} className="grid gap-1">
                  <Label className="capitalize text-xs">{day}</Label>
                  <Input
                    value={formData.operationalHours?.[day] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      operationalHours: {
                        ...formData.operationalHours,
                        [day]: e.target.value,
                      },
                    })}
                    placeholder="e.g. 9 AM - 5 PM"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Portfolio (up to 5 images)
            </h4>
            <div className="flex gap-2">
              <Input
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="Image URL"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addPortfolioUrl} disabled={(formData.portfolio?.length || 0) >= 5}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.portfolio || []).map((url, index) => (
                <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                  <span className="truncate max-w-[150px]">{url}</span>
                  <button type="button" onClick={() => removePortfolioUrl(index)} className="text-destructive hover:text-destructive/80">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Services Menu */}
          <div className="grid gap-4">
            <h4 className="text-sm font-medium">Services Menu</h4>
            <div className="flex gap-2">
              <Input
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Service name"
                className="flex-1"
              />
              <Input
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                placeholder="Price (optional)"
                type="number"
                className="w-32"
              />
              <Button type="button" variant="outline" onClick={addService}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.services || []).map((service, index) => (
                <div key={index} className="flex items-center justify-between bg-muted px-3 py-2 rounded">
                  <span>{service.name}</span>
                  {service.price !== undefined && <span className="text-muted-foreground">₦{service.price.toLocaleString()}</span>}
                  <button type="button" onClick={() => removeService(index)} className="text-destructive hover:text-destructive/80">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};