import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface WhyStatement {
  me: {
    personalGoals: string;
    motivation: string;
    skillsDevelopment: string;
    personalWhy: string;
  };
  us: {
    teamVision: string;
    companyMission: string;
    culturalValues: string;
    collectiveWhy: string;
  };
  them: {
    customerImpact: string;
    marketProblem: string;
    socialContribution: string;
    externalWhy: string;
  };
}

interface WhySectionProps {
  whyStatement: WhyStatement;
  setWhyStatement: React.Dispatch<React.SetStateAction<WhyStatement>>;
  onSave: () => void;
}

const WhySection: React.FC<WhySectionProps> = ({
  whyStatement,
  setWhyStatement,
  onSave
}) => {
  return (
    <div className="py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row bg-white border border-gray-300 overflow-hidden" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* WHY Section - Green sidebar */}
        <div className="bg-green-500 flex items-center justify-center p-4 lg:p-6 min-h-[60px] lg:min-h-[300px]">
          <div className="transform lg:-rotate-90 text-white font-bold text-lg lg:text-xl tracking-wider">
            WHY
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 border-l border-gray-300">
          {/* ME Column */}
          <div className="border-r border-gray-300 p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">ME</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <Input
                  value={whyStatement.me.personalGoals}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    me: { ...prev.me, personalGoals: e.target.value }
                  }))}
                  placeholder="Exit the day-to-day"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <Input
                  value={whyStatement.me.motivation}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    me: { ...prev.me, motivation: e.target.value }
                  }))}
                  placeholder="Build dream home"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <Input
                  value={whyStatement.me.skillsDevelopment}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    me: { ...prev.me, skillsDevelopment: e.target.value }
                  }))}
                  placeholder="₦1M in passive investments"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <Input
                  value={whyStatement.me.personalWhy}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    me: { ...prev.me, personalWhy: e.target.value }
                  }))}
                  placeholder="Travel one month every year"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                />
              </div>
            </div>
          </div>

          {/* US Column */}
          <div className="border-r border-gray-300 p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">US</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <Input
                  value={whyStatement.us.teamVision}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    us: { ...prev.us, teamVision: e.target.value }
                  }))}
                  placeholder="Fund kids' college"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 h-auto focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1"
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <textarea
                  value={whyStatement.us.companyMission}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    us: { ...prev.us, companyMission: e.target.value }
                  }))}
                  placeholder="Distribute ₦1M in profit sharing to team"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[60px]"
                  rows={3}
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <textarea
                  value={whyStatement.us.culturalValues}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    us: { ...prev.us, culturalValues: e.target.value }
                  }))}
                  placeholder="Buy a vacation property"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* THEM Column */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">THEM</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <textarea
                  value={whyStatement.them.customerImpact}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    them: { ...prev.them, customerImpact: e.target.value }
                  }))}
                  placeholder="Become a 6-figure donor"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                  rows={2}
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <textarea
                  value={whyStatement.them.marketProblem}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    them: { ...prev.them, marketProblem: e.target.value }
                  }))}
                  placeholder="Volunteer an hour a week"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                  rows={2}
                />
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <textarea
                  value={whyStatement.them.socialContribution}
                  onChange={(e) => setWhyStatement(prev => ({
                    ...prev,
                    them: { ...prev.them, socialContribution: e.target.value }
                  }))}
                  placeholder="Serve on association board"
                  className="border-0 bg-transparent text-blue-600 font-medium p-0 resize-none focus:bg-white focus:border focus:border-blue-300 focus:p-2 flex-1 min-h-[40px]"
                  rows={2}
                />
              </div>
            </div>
            {/* Red underline */}
            <div className="mt-4 relative">
              <div className="h-1 bg-red-500 rounded-full" style={{ width: '80%', margin: '0 auto' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save WHY Statement Button */}
      <div className="flex justify-center mt-6">
        <Button onClick={onSave} size="lg" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4" />
          Save WHY Statement
        </Button>
      </div>
    </div>
  );
};

export default WhySection;