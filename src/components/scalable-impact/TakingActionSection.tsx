import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface TakingActionItems {
  currentAction1: string;
  currentAction2: string;
  currentAction3: string;
}

interface TakingActionSectionProps {
  takingActionItems: TakingActionItems;
  setTakingActionItems: React.Dispatch<React.SetStateAction<TakingActionItems>>;
  onSave: () => void;
}

const TakingActionSection: React.FC<TakingActionSectionProps> = ({
  takingActionItems,
  setTakingActionItems,
  onSave
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Card className="border bg-card">
        <CardHeader className="bg-muted text-foreground text-center">
          <CardTitle className="text-sm font-semibold tracking-wide">TAKING ACTION</CardTitle>
          <p className="text-muted-foreground text-xs mt-1">Current Active Initiatives</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Numbers Row with Labels */}
          <div className="flex justify-center lg:justify-around items-center mb-6 space-x-6 lg:space-x-0">
            <div className="flex flex-col items-center space-y-2">
              <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <Label className="text-xs text-gray-600 text-center">Priority Action 1</Label>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <Label className="text-xs text-gray-600 text-center">Priority Action 2</Label>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <Label className="text-xs text-gray-600 text-center">Priority Action 3</Label>
            </div>
          </div>
          
          {/* Input Fields in Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Input
              value={takingActionItems.currentAction1}
              onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction1: e.target.value }))}
              placeholder="What are you actively working on right now?"
              className="w-full text-sm"
            />
            <Input
              value={takingActionItems.currentAction2}
              onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction2: e.target.value }))}
              placeholder="What's your second priority this week?"
              className="w-full text-sm"
            />
            <Input
              value={takingActionItems.currentAction3}
              onChange={(e) => setTakingActionItems(prev => ({ ...prev, currentAction3: e.target.value }))}
              placeholder="What else are you focusing on this week?"
              className="w-full text-sm"
            />
          </div>
          
          {/* Save Taking Action Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={onSave} size="lg" className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4" />
              Save Current Actions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakingActionSection;