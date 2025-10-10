import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Target, 
  TrendingUp, 
  Settings,
  DollarSign,
  Users,
  Building,
  Crown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Lightbulb
} from "lucide-react";

interface ScaleLevelConfirmationProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
  onComplete: () => void;
}

const scaleLevels = [
  {
    id: 1,
    title: "Sell & Serve 10 Customers",
    description: "Focus on proving product-market fit by making and fulfilling 10 sales before any scaling—essential for traction.",
    icon: Target,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    requirements: [
      "Have a defined product or service",
      "Identified target customer profile", 
      "Made at least 1-3 sales",
      "Still working directly with every customer"
    ]
  },
  {
    id: 2,
    title: "Build a Growth Flywheel",
    description: "Shift from one-off sales to predictable growth via a 'growth flywheel' (leads → customers → revenue loop).",
    icon: TrendingUp,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    requirements: [
      "Completed Level 1 (served 10+ customers)",
      "Have consistent lead generation",
      "Converting leads at predictable rates",
      "Some repeat customers or referrals"
    ]
  },
  {
    id: 3,
    title: "Upgrade Your Business OS",
    description: "Address operational chaos from growth; upgrade your 'business operating system' to cross the 'Scalable Line'.",
    icon: Settings,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    requirements: [
      "Completed Level 2 (predictable growth)",
      "Have documented key processes",
      "Using business management tools",
      "Can handle growth without breaking"
    ]
  },
  {
    id: 4,
    title: "Double Your Take-Home",
    description: "Make your business a 'cash-generating machine'—pay yourself more consistently to avoid burnout.",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    requirements: [
      "Completed Level 3 (systematic operations)",
      "Consistent positive cash flow",
      "Paying yourself regularly",
      "Building cash reserves"
    ]
  },
  {
    id: 5,
    title: "Build Your Board",
    description: "Assemble an advisory board of mentors/peers for guidance on non-playbook challenges.",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    requirements: [
      "Completed Level 4 (profitable operations)",
      "Have 2-3 active advisors or mentors",
      "Regular strategic discussions",
      "Acting on external guidance"
    ]
  },
  {
    id: 6,
    title: "Expand with Acquisitions",
    description: "Break organic growth ceilings via acquisitions (talent, assets, or full businesses).",
    icon: Building,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    requirements: [
      "Completed Level 5 (advisory support)",
      "Have acquisition financing options",
      "Identified acquisition targets",
      "Completed at least one acquisition"
    ]
  },
  {
    id: 7,
    title: "Hit Your Number (Level 7 Life)",
    description: "Achieve your personal 'number' with true optionality—choose to grow, exit, or enjoy freedom.",
    icon: Crown,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    requirements: [
      "Completed Level 6 (growth through M&A)",
      "Hit your target revenue/profit/valuation",
      "Business runs without you",
      "Multiple exit options available"
    ]
  }
];

export const ScaleLevelConfirmation: React.FC<ScaleLevelConfirmationProps> = ({
  selectedLevel,
  onLevelChange,
  onComplete
}) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const canSelectLevel = (levelId: number) => {
    // Can always select level 1
    if (levelId === 1) return true;
    // For higher levels, must have selected at least the previous level
    return selectedLevel >= levelId - 1;
  };

  const handleLevelSelect = (level: number) => {
    if (canSelectLevel(level)) {
      onLevelChange(level);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
            <Target className="w-6 h-6" />
            Step 1: Confirm Your Scale Level
          </CardTitle>
          <div className="text-slate-600 space-y-2">
            <p className="leading-relaxed">
              <strong>Important:</strong> You don't get to skip steps! Select the highest level you've 
              <em> fully completed</em>. If you haven't finished all requirements for a level, choose the previous one.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong>Not sure?</strong> Be conservative. It's better to start from a solid foundation than 
                  to skip ahead and miss critical steps.
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedLevel.toString()}
            onValueChange={(value) => handleLevelSelect(parseInt(value))}
            className="space-y-3"
          >
            {scaleLevels.map((level) => {
              const IconComponent = level.icon;
              const isSelected = selectedLevel === level.id;
              const isClickable = canSelectLevel(level.id);
              const isHovered = hoveredLevel === level.id;

              return (
                <div
                  key={level.id}
                  className={`
                    relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer
                    ${isSelected 
                      ? `${level.borderColor} ${level.bgColor} shadow-lg ring-2 ring-offset-2 ring-blue-300` 
                      : isClickable 
                        ? 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                    }
                  `}
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  onClick={() => handleLevelSelect(level.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center">
                      <RadioGroupItem
                        value={level.id.toString()}
                        id={`level-${level.id}`}
                        disabled={!isClickable}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${isSelected ? level.bgColor : 'bg-gray-100'}
                        `}>
                          <IconComponent className={`w-5 h-5 ${isSelected ? level.color : 'text-gray-600'}`} />
                        </div>
                        
                        <div>
                          <Label 
                            htmlFor={`level-${level.id}`}
                            className={`font-semibold cursor-pointer ${isSelected ? level.color : 'text-gray-800'}`}
                          >
                            Level {level.id}: {level.title}
                          </Label>
                          <p className={`text-sm mt-1 ${isSelected ? 'text-gray-700' : 'text-gray-600'}`}>
                            {level.description}
                          </p>
                        </div>
                      </div>

                      {(isSelected || isHovered) && (
                        <div className="pl-13 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          <div className="text-sm font-medium text-gray-700">Requirements:</div>
                          <ul className="space-y-1">
                            {level.requirements.map((requirement, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {!isClickable && (
                      <Badge variant="secondary" className="text-xs">
                        Complete Level {level.id - 1} First
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          {selectedLevel > 0 && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                <strong>Great!</strong> You've selected Level {selectedLevel}: {scaleLevels[selectedLevel - 1].title}. 
                This will be your starting point for the planner.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              Selected: <strong>Level {selectedLevel}</strong>
            </div>
            <Button 
              onClick={onComplete} 
              disabled={selectedLevel === 0}
              className="gap-2"
            >
              Continue to Step 2
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScaleLevelConfirmation;