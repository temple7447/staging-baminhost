import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  Zap, 
  Users,
  Building,
  DollarSign,
  CheckCircle2
} from "lucide-react";

interface Level7LifeMotivationProps {
  userTargetAmount?: string;
  currentLevel?: number;
}

export const Level7LifeMotivation: React.FC<Level7LifeMotivationProps> = ({ 
  userTargetAmount, 
  currentLevel = 1 
}) => {
  const levels = [
    { 
      id: 1, 
      title: "Sell & Serve 10 Customers", 
      icon: Target, 
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Prove product-market fit"
    },
    { 
      id: 2, 
      title: "Build Growth Flywheel", 
      icon: TrendingUp, 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Predictable revenue systems"
    },
    { 
      id: 3, 
      title: "Upgrade Business OS", 
      icon: Building, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Cross the scalable line"
    },
    { 
      id: 4, 
      title: "Double Take-Home", 
      icon: DollarSign, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Cash-generating machine"
    },
    { 
      id: 5, 
      title: "Build Your Board", 
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Advisory support"
    },
    { 
      id: 6, 
      title: "Expand with Acquisitions", 
      icon: Building, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Break growth ceilings"
    },
    { 
      id: 7, 
      title: "Level 7 Life", 
      icon: Crown, 
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      description: "Hit your number - live with optionality"
    }
  ];

  const overallProgress = Math.round((currentLevel - 1) / 6 * 100);
  const completedLevels = currentLevel - 1;

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-6 h-6 text-purple-600" />
          <CardTitle className="text-xl text-purple-900">Your Journey to Level 7 Life</CardTitle>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Level {currentLevel}/7
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-purple-600">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="text-xs text-slate-500 text-center">
            {completedLevels} of 7 levels completed
          </div>
        </div>

        {/* Current Target Display */}
        {userTargetAmount && (
          <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <div className="text-sm font-medium text-purple-800">Your Level 7 Target</div>
            </div>
            <div className="text-2xl font-bold text-purple-900 mb-1">
              {userTargetAmount}
            </div>
            <div className="text-xs text-slate-600">
              Once achieved, this gives you true optionality - grow, exit, or enjoy the freedom you've built.
            </div>
          </div>
        )}

        {/* Level Progress Visual */}
        <div className="grid grid-cols-7 gap-1">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const isCompleted = level.id < currentLevel;
            const isCurrent = level.id === currentLevel;
            
            return (
              <div key={level.id} className="text-center">
                <div
                  className={`w-full aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-1 transition-all ${
                    isCompleted
                      ? 'bg-green-100 border-green-300'
                      : isCurrent
                      ? 'bg-blue-100 border-blue-400 animate-pulse'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <IconComponent 
                      className={`w-4 h-4 ${
                        isCurrent ? 'text-blue-600' : 'text-gray-400'
                      }`} 
                    />
                  )}
                </div>
                <div className="text-xs font-medium mt-1 text-center">
                  {level.id}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Level Focus */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <div className="font-semibold text-slate-800">Current Focus: Level {currentLevel}</div>
          </div>
          
          {currentLevel <= 7 && (
            <div className="space-y-2">
              <div className="font-medium text-slate-700">
                {levels[currentLevel - 1].title}
              </div>
              <div className="text-sm text-slate-600">
                {levels[currentLevel - 1].description}
              </div>
              
              {currentLevel < 7 && (
                <div className="mt-4">
                  <Button 
                    size="sm" 
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.location.href = '/app?view=seven-levels-scale'}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Work on Level {currentLevel}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Level 7 Life Description */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-yellow-600" />
            <div className="font-semibold text-yellow-800">The Level 7 Life</div>
          </div>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>
              When you reach Level 7, you've hit your "number" and achieved true <strong>optionality</strong>:
            </p>
            <ul className="text-xs space-y-1 ml-4">
              <li>• <strong>Freedom to choose:</strong> Keep growing, sell the business, or just enjoy the life you built</li>
              <li>• <strong>No external threats:</strong> Your business is strong enough to weather any storm</li>
              <li>• <strong>Systems that work without you:</strong> The business runs while you focus on what matters</li>
              <li>• <strong>Financial independence:</strong> Your target number gives you complete security</li>
            </ul>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center py-3 border-t border-purple-200">
          <p className="text-sm font-medium text-purple-800 mb-1">
            "Scale yourself to scale your company"
          </p>
          <p className="text-xs text-slate-600 italic">
            Every Big 5 action should move you closer to your Level 7 Life
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Level7LifeMotivation;