import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Settings } from "lucide-react";

// Import tab components
import { DoesYourOSNeedAnUpgrade } from './operating-system-tabs/DoesYourOSNeedAnUpgrade';
import { WhatIsAnOperatingSystem } from './operating-system-tabs/WhatIsAnOperatingSystem';
import { UpgradingYourOS3Steps } from './operating-system-tabs/UpgradingYourOS3Steps';
import { DocumentingYourCompanysAlgorithms } from './operating-system-tabs/DocumentingYourCompanysAlgorithms';
import { DefiningYourCommunicationArchitecture } from './operating-system-tabs/DefiningYourCommunicationArchitecture';
import { ClarifyingYourDesiredOutputs } from './operating-system-tabs/ClarifyingYourDesiredOutputs';
import { InstallingYourOS } from './operating-system-tabs/InstallingYourOS';
import { ReadyToLevelUp as ReadyToLevelUpOS } from './operating-system-tabs/ReadyToLevelUp';

export interface OperatingSystemData {
  // Diagnosis
  plansLoose?: boolean;
  workChaotic?: boolean;
  teamNeedsDirection?: boolean;
  meetingsWaste?: boolean;
  lowProfit?: boolean;
  burnedOut?: boolean;
  notes?: string;

  // 3-Step plan progress
  documentedAlgorithms?: boolean;
  definedCommunication?: boolean;
  clarifiedOutputs?: boolean;
  valueEnginesNotes?: string;
  playbookVaultNotes?: string;
  hotCanvasNotes?: string;
  clarityCompassNotes?: string;

  // Core OS model
  algorithms?: string; // processes, SOPs library link/notes
  commonLanguage?: string; // dashboards, scorecards, meeting rhythm
  desiredOutputs?: string; // goals, OKRs, mission/vision

  // Basics to install
  meetingRhythm?: string; // weekly, monthly, quarterly cadence
  scorecards?: string; // list of scorecards/KPIs
  sopBacklog?: string; // list of SOPs to document next

  isCompleted?: boolean;
}

interface Props {
  data: OperatingSystemData;
  onDataChange: (d: OperatingSystemData) => void;
  onComplete: () => void;
  onSave?: () => void;
}

export const OperatingSystemBuilder: React.FC<Props> = ({ data, onDataChange, onComplete, onSave }) => {
  const [activeTab, setActiveTab] = useState('diagnosis');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Level 3: Upgrade Your Operating System
            <Badge variant="outline" className="bg-white">Make the business run without you</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700">
          <Alert className="border-amber-200 bg-white">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              Most companies stall because they run on a "You OS". This step replaces it with a scalable operating system: 
              Algorithms (SOPs), Common Language (dashboards & meetings), Desired Outputs (goals).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8 h-auto">
          <TabsTrigger value="diagnosis" className="text-xs">Diagnosis</TabsTrigger>
          <TabsTrigger value="what-is" className="text-xs">What Is OS?</TabsTrigger>
          <TabsTrigger value="3-steps" className="text-xs">3 Steps</TabsTrigger>
          <TabsTrigger value="algorithms" className="text-xs">Algorithms</TabsTrigger>
          <TabsTrigger value="communication" className="text-xs">Communication</TabsTrigger>
          <TabsTrigger value="outputs" className="text-xs">Outputs</TabsTrigger>
          <TabsTrigger value="installing" className="text-xs">Installing</TabsTrigger>
          <TabsTrigger value="ready" className="text-xs">Ready</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="mt-6">
          <DoesYourOSNeedAnUpgrade />
        </TabsContent>

        <TabsContent value="what-is" className="mt-6">
          <WhatIsAnOperatingSystem />
        </TabsContent>

        <TabsContent value="3-steps" className="mt-6">
          <UpgradingYourOS3Steps />
        </TabsContent>

        <TabsContent value="algorithms" className="mt-6">
          <DocumentingYourCompanysAlgorithms />
        </TabsContent>

        <TabsContent value="communication" className="mt-6">
          <DefiningYourCommunicationArchitecture />
        </TabsContent>

        <TabsContent value="outputs" className="mt-6">
          <ClarifyingYourDesiredOutputs />
        </TabsContent>

        <TabsContent value="installing" className="mt-6">
          <InstallingYourOS />
        </TabsContent>

        <TabsContent value="ready" className="mt-6">
          <ReadyToLevelUpOS />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperatingSystemBuilder;
