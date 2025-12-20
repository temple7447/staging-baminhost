import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import tab components
import DoThisFirst from './tabs/DoThisFirst';
import TheProblemWithProductMarketFit from './tabs/TheProblemWithProductMarketFit';
import GettingYourFirst10 from './tabs/GettingYourFirst10';
import TheOneQuestionSurvey from './tabs/TheOneQuestionSurvey';
import YourModel10 from './tabs/YourModel10';
import ReadyToLevelUp from './tabs/ReadyToLevelUp';

export interface Level1Data {
  hasMadeSale: boolean;
  hasDeliveredPromise: boolean;
  hasReached10Customers: boolean;
  hasTestimonials: boolean;
  // New: NPS promoters and Model 10 gating
  hasTenPromoters: boolean;
  hasModel10List: boolean;
  promotersCount?: number; // count of NPS 9-10
  npsNotes?: string; // optional notes
  model10List?: string; // comma or newline separated names
  customerList: string;
  salesProof: string; // short proof/summary or testimonial
  testimonialText?: string; // required short text proof
  testimonialFileName?: string; // optional uploaded filename for UI display
  isCompleted: boolean;
}

interface Level1FirstTenCustomersProps {
  data: Level1Data;
  onDataChange: (data: Level1Data) => void;
  onComplete: () => void;
}

export const Level1FirstTenCustomers: React.FC<Level1FirstTenCustomersProps> = ({
  data,
  onDataChange,
  onComplete
}) => {
  return (
    <div className="space-y-4">
      {/* Main Header */}
      <Card className="border border-slate-200 bg-slate-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl text-slate-900">
            <Target className="w-7 h-7 md:w-8 md:h-8 text-slate-700" />
            Level 1: Get Your First 10 Customers
            <Badge className="bg-slate-600 text-white text-xs md:text-sm">MANDATORY</Badge>
          </CardTitle>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Navigate through the tabs below to understand, complete, and verify Level 1 requirements.
          </p>
        </CardHeader>
      </Card>

      {/* Tabs Navigation */}
      <Tabs defaultValue="do-this-first" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
          <TabsTrigger value="do-this-first" className="text-xs md:text-sm py-2 px-2">
            Do This First
          </TabsTrigger>
          <TabsTrigger value="problem" className="text-xs md:text-sm py-2 px-2">
            Product-Market Fit
          </TabsTrigger>
          <TabsTrigger value="first-10" className="text-xs md:text-sm py-2 px-2">
            Getting First 10
          </TabsTrigger>
          <TabsTrigger value="survey" className="text-xs md:text-sm py-2 px-2">
            One Question Survey
          </TabsTrigger>
          <TabsTrigger value="model-10" className="text-xs md:text-sm py-2 px-2">
            Your Model 10
          </TabsTrigger>
          <TabsTrigger value="ready" className="text-xs md:text-sm py-2 px-2">
            Ready to Level Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="do-this-first" className="mt-4">
          <DoThisFirst />
        </TabsContent>

        <TabsContent value="problem" className="mt-4">
          <TheProblemWithProductMarketFit />
        </TabsContent>

        <TabsContent value="first-10" className="mt-4">
          <GettingYourFirst10 data={data} onDataChange={onDataChange} />
        </TabsContent>

        <TabsContent value="survey" className="mt-4">
          <TheOneQuestionSurvey />
        </TabsContent>

        <TabsContent value="model-10" className="mt-4">
          <YourModel10 />
        </TabsContent>

        <TabsContent value="ready" className="mt-4">
          <ReadyToLevelUp data={data} onComplete={onComplete} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Level1FirstTenCustomers;
