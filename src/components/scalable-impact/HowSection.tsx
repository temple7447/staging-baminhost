import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface HowStatement {
  action1: string;
  action2: string;
  action3: string;
  action4: string;
  action5: string;
}

interface HowSectionProps {
  howStatement: HowStatement;
  setHowStatement: React.Dispatch<React.SetStateAction<HowStatement>>;
  onSave: () => void;
}

const HowSection: React.FC<HowSectionProps> = ({
  howStatement,
  setHowStatement,
  onSave
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Card className="border bg-card">
        <CardHeader className="bg-muted text-foreground text-center">
          <CardTitle className="text-sm font-semibold tracking-wide">HOW</CardTitle>
          <p className="text-muted-foreground text-xs mt-1">Strategic Action Items</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Numbers Row */}
          <div className="flex justify-center sm:justify-around items-center mb-6 space-x-4 sm:space-x-0">
            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          </div>
          
          {/* Input Fields in Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              value={howStatement.action1}
              onChange={(e) => setHowStatement(prev => ({ ...prev, action1: e.target.value }))}
              placeholder="Test new acquisition funnel"
              className="w-full text-sm"
            />
            <Input
              value={howStatement.action2}
              onChange={(e) => setHowStatement(prev => ({ ...prev, action2: e.target.value }))}
              placeholder="Find a new traffic agency"
              className="w-full text-sm"
            />
            <Input
              value={howStatement.action3}
              onChange={(e) => setHowStatement(prev => ({ ...prev, action3: e.target.value }))}
              placeholder="Hire operations manager"
              className="w-full text-sm"
            />
            <Input
              value={howStatement.action4}
              onChange={(e) => setHowStatement(prev => ({ ...prev, action4: e.target.value }))}
              placeholder="Launch training program"
              className="w-full text-sm"
            />
            <Input
              value={howStatement.action5}
              onChange={(e) => setHowStatement(prev => ({ ...prev, action5: e.target.value }))}
              placeholder="Upgrade tech stack"
              className="w-full text-sm"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Save HOW Statement Button */}
      <div className="flex justify-center mt-6">
        <Button onClick={onSave} size="lg" className="flex items-center gap-2 bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4" />
          Save Action Plan
        </Button>
      </div>
    </div>
  );
};

export default HowSection;