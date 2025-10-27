import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Level1Data {
  hasMadeSale: boolean;
  hasDeliveredPromise: boolean;
  hasReached10Customers: boolean;
  hasTestimonials: boolean;
  hasTenPromoters: boolean;
  hasModel10List: boolean;
  promotersCount?: number;
  npsNotes?: string;
  model10List?: string;
  customerList: string;
  salesProof: string;
  testimonialText?: string;
  testimonialFileName?: string;
  isCompleted: boolean;
}

interface GettingYourFirst10Props {
  data: Level1Data;
  onDataChange: (data: Level1Data) => void;
}

export const GettingYourFirst10: React.FC<GettingYourFirst10Props> = ({ data, onDataChange }) => {
  const computeIsCompleted = (d: Level1Data) => {
    const hasTestimonialText = d.testimonialText ? d.testimonialText.trim().length >= 10 : false;
    return (
      d.hasMadeSale &&
      d.hasDeliveredPromise &&
      d.hasReached10Customers &&
      d.hasTestimonials &&
      d.hasTenPromoters &&
      d.hasModel10List &&
      hasTestimonialText
    );
  };

  const handleCheckboxChange = (field: keyof Level1Data, value: boolean) => {
    const newData = {
      ...data,
      [field]: value
    };
    onDataChange({
      ...newData,
      isCompleted: computeIsCompleted(newData)
    });
  };

  const handleTextChange = (field: keyof Level1Data, value: any) => {
    const newData = { ...data, [field]: value } as Level1Data;
    onDataChange({
      ...newData,
      isCompleted: computeIsCompleted(newData)
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Getting Your First 10</CardTitle>
          <p className="text-muted-foreground">
            Complete this checklist to prove you have a viable business. All items are required to proceed.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interactive Checklist */}
          <div className="space-y-4">
            {/* Checklist Item 1 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="made-sale"
                checked={data.hasMadeSale}
                onCheckedChange={(checked) => handleCheckboxChange('hasMadeSale', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="made-sale" className="font-semibold cursor-pointer">
                    I have made at least 1 actual sale
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">A customer paid you real money for your offer (not a free trial or a promise).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Real money exchanged hands. Someone paid you for your product or service.
                </p>
              </div>
            </div>

            {/* Checklist Item 2 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="delivered-promise"
                checked={data.hasDeliveredPromise}
                onCheckedChange={(checked) => handleCheckboxChange('hasDeliveredPromise', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="delivered-promise" className="font-semibold cursor-pointer">
                    I have delivered on my promise and the customer was happy
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">Delivery completed, customer confirmed satisfaction (via message, survey, or rating).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You fulfilled what you promised. The customer got value and was satisfied.
                </p>
              </div>
            </div>

            {/* Checklist Item 3 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="reached-10"
                checked={data.hasReached10Customers}
                onCheckedChange={(checked) => handleCheckboxChange('hasReached10Customers', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reached-10" className="font-semibold cursor-pointer">
                    I have reached 10 paying, satisfied customers
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">10 unique customers (not repeated transactions from the same person).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You've successfully sold to and served 10 different customers.
                </p>
              </div>
            </div>

            {/* Checklist Item 4 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-testimonials"
                checked={data.hasTestimonials}
                onCheckedChange={(checked) => handleCheckboxChange('hasTestimonials', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-testimonials" className="font-semibold cursor-pointer">
                    I have testimonials, referrals, or feedback from actual buyers
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">A sentence from a real buyer, a screenshot, or a public review is sufficient.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You have proof that customers were happy and would recommend you.
                </p>
              </div>
            </div>

            {/* Checklist Item 5 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-ten-promoters"
                checked={data.hasTenPromoters}
                onCheckedChange={(checked) => handleCheckboxChange('hasTenPromoters', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-ten-promoters" className="font-semibold cursor-pointer">
                    I have at least 10 promoters (NPS 9–10)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">Ask every customer: "On a scale of 0–10, how likely are you to recommend us?" Count 9s and 10s as promoters.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <span>Promoters (9–10):</span>
                  <Input
                    type="number"
                    min={0}
                    value={data.promotersCount ?? ''}
                    onChange={(e) => handleTextChange('promotersCount' as any, String(e.target.value))}
                    className="h-8 w-24"
                  />
                </div>
              </div>
            </div>

            {/* Checklist Item 6 */}
            <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="has-model10"
                checked={data.hasModel10List}
                onCheckedChange={(checked) => handleCheckboxChange('hasModel10List', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="has-model10" className="font-semibold cursor-pointer">
                    I have created my "Model 10" list (high LTV + high advocacy)
                  </Label>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Optional: paste names here so you always have them handy.
                </p>
                <Textarea
                  placeholder="List your 10 best customers by name (comma or newline separated)"
                  value={data.model10List || ''}
                  onChange={(e) => handleTextChange('model10List', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Documentation Section */}
          <div className="space-y-4 pt-4 border-t">
            <Label className="text-lg font-bold text-gray-800">
              Document Your Proof (at least one short testimonial is required):
            </Label>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="testimonial-text" className="text-sm font-medium">
                  Short testimonial or proof (required)
                </Label>
                <Textarea
                  id="testimonial-text"
                  placeholder="e.g., 'This saved me 10 hours a week' — Ada, bakery owner"
                  value={data.testimonialText || ''}
                  onChange={(e) => handleTextChange('testimonialText', e.target.value)}
                  className="mt-1"
                />
                {!data.testimonialText || data.testimonialText.trim().length < 10 ? (
                  <p className="text-xs text-red-600 mt-1">Please enter at least 10 characters to proceed.</p>
                ) : (
                  <p className="text-xs text-green-700 mt-1">Looks good.</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="testimonial-file" className="text-sm font-medium">
                  Optional screenshot or file (testimonial, review, etc.)
                </Label>
                <input
                  id="testimonial-file"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleTextChange('testimonialFileName', file ? file.name : '');
                  }}
                  className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {data.testimonialFileName && (
                  <p className="text-xs text-gray-600 mt-1">Selected: {data.testimonialFileName}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="customer-list" className="text-sm font-medium">
                Briefly describe your 10 customers and what you learned (optional)
              </Label>
              <Textarea
                id="customer-list"
                placeholder="Who did you serve, what did you sell, what did you learn?"
                value={data.customerList}
                onChange={(e) => handleTextChange('customerList', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GettingYourFirst10;
