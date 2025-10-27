import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  StickyNote,
  Square,
  Diamond,
  Circle,
  ArrowRight,
  Users,
  Target
} from "lucide-react";

export const MappingYourGrowthEngine: React.FC = () => {
  const [flagshipOffers, setFlagshipOffers] = useState('');
  const [awarenessChannels, setAwarenessChannels] = useState('');
  const [engageContent, setEngageContent] = useState('');
  const [leadMagnets, setLeadMagnets] = useState('');
  const [microCommitments, setMicroCommitments] = useState('');
  const [ahaMoments, setAhaMoments] = useState('');
  const [focusFlagship, setFocusFlagship] = useState('');
  const [triggeringEvents, setTriggeringEvents] = useState('');
  const [endingEvent, setEndingEvent] = useState('');
  const [stepsOutline, setStepsOutline] = useState('');

  const symbols = [
    {
      icon: Circle,
      name: 'Terminus (Pill Shape)',
      description: 'Defines the start and the end of a process',
      color: 'purple'
    },
    {
      icon: Square,
      name: 'Rectangle',
      description: 'Denotes a task or activity - something is happening',
      color: 'blue'
    },
    {
      icon: Diamond,
      name: 'Diamond',
      description: 'Decision point or gateway - could go multiple directions (yes/no, good/bad)',
      color: 'orange'
    },
    {
      icon: Square,
      name: 'Parallelogram',
      description: 'Data input or output (reports, lead lists, etc.)',
      color: 'green'
    },
    {
      icon: ArrowRight,
      name: 'Arrow',
      description: 'Denotes the process flow - connect the dots',
      color: 'gray'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-900">Map Your First Growth Engine</CardTitle>
          <p className="text-indigo-700 text-base mt-2">
            Use business process mapping to visualize how customers happen.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            What we're going through is called <strong>business process mapping</strong>. You could pay consultants hundreds of thousands 
            of dollars to do this, or you can follow this process, do it yourself, get much better results much faster, and save a couple hundred grand.
          </p>
          <Alert className="border-blue-300 bg-blue-50">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900 text-sm">
              <strong>Why sticky notes?</strong> They're cheap, easy to move around, and naturally square (but can be turned into diamonds for decision points). 
              Keep it analog in the beginning—don't use fancy flowchart software yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The 5 Symbols */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">The 5 Symbols You Need to Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {symbols.map((symbol, idx) => {
              const Icon = symbol.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-purple-200">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-${symbol.color}-100`}>
                    <Icon className={`w-6 h-6 text-${symbol.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-purple-900 mb-1">{symbol.name}</h3>
                    <p className="text-sm text-gray-700">{symbol.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Alert className="border-green-300 bg-green-50 mt-4">
            <StickyNote className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-900 text-sm">
              <strong>Pro tip:</strong> Use sticky notes on a whiteboard. Turn them on their side to create diamonds for decision points. 
              You can even tape down corners to make parallelograms!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* Pre-Work: The 6 Questions */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Pre-Work: Build Your Asset Inventory</CardTitle>
          <p className="text-sm text-orange-700 mt-2">
            Answer these 6 questions to create an inventory of assets that will form your growth engine.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-900 text-sm">
              <strong>IMPORTANT:</strong> Don't answer based on what you wish you had. Answer based on what you're <strong>actually doing today</strong>. 
              Not brainstorming ideas—document what exists right now.
            </AlertDescription>
          </Alert>

          {/* Question 1 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">1</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  What is our core flagship offer?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  How do we continue to deliver value after the first sale is made? List your main products/services and any upsells.
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: Pet sitting service, Plant watering service, Weekly check-in package...&#10;&#10;Don't list hundreds—focus on core flagship offerings and key upsells."
              value={flagshipOffers}
              onChange={(e) => setFlagshipOffers(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Question 2 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">2</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  How do qualified prospects find out about our brand?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  What channels do we leverage to create initial awareness? (What you're actually doing today)
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: Facebook and Instagram ads, Affiliate partners, Radio spots, Wholesalers, SEO/organic search, Referrals..."
              value={awarenessChannels}
              onChange={(e) => setAwarenessChannels(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Question 3 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">3</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  How do we leverage content and follow-up marketing?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  To engage new prospects and re-engage existing ones. Be specific—not just "blog" but actual pieces of content.
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: 7-part email follow-up series, Indoctrination sequence, Facebook retargeting campaign, Pillar post on '10 Ways to...', YouTube video series..."
              value={engageContent}
              onChange={(e) => setEngageContent(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-600 mt-2">
              💡 Generally ungated content—stuff that's just out there, anyone can access.
            </p>
          </div>

          {/* Question 4 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">4</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  What lead magnets do we offer?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Valuable content in exchange for contact information and permission to follow up.
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: Special report 'The 5 Mistakes...', White paper on industry trends, Webinar 'How to...', Calculator tool, Free guide PDF..."
              value={leadMagnets}
              onChange={(e) => setLeadMagnets(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Question 5 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">5</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  How do we get prospects to make a micro-commitment?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Small investment of time and/or money (demos, consultative sessions, loss leaders).
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: Free first visit/consultation, Discovery call (30 min), Low-ticket book ($7), Demo session, Trial period, Assessment call..."
              value={microCommitments}
              onChange={(e) => setMicroCommitments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Question 6 */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-orange-600">6</Badge>
              <div className="flex-1">
                <Label className="text-base font-bold text-orange-900">
                  What are the "aha moments"? (Optional)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  What transforms your product from nice-to-have to must-have? Signals that they're ready to buy.
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Example: Downloads 4+ reports within 7 days, Asks specific pricing question during demo, Uses feature X during trial, Responds 'yes' to certain qualifying question..."
              value={ahaMoments}
              onChange={(e) => setAhaMoments(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-600 mt-2">
              💡 Talk to your sales reps—they'll know what signals mean someone is excited and ready to convert.
            </p>
          </div>

          <Alert className="border-green-300 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-900">
              <strong>Great!</strong> You've now taken inventory of all the gears and cogs that will form your growth engine. 
              These are your Lego blocks—time to start building.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Separator />

      {/* Mapping Steps */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Now Let's Build: 4 Steps to Map Your Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white border-l-4 border-blue-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 text-lg mb-2">Pick Your Focus</h3>
                <p className="text-gray-700 text-sm mb-3">
                  What core flagship product or service are we focusing on for this exercise? Pick ONE from your list above.
                </p>
                <Label className="text-sm font-medium">Flagship to focus on:</Label>
                <Input
                  placeholder="Example: Pet sitting premium package"
                  value={focusFlagship}
                  onChange={(e) => setFocusFlagship(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-600 mt-2">
                  💡 Pick the one you want to be responsible for $1M+ in annual revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-l-4 border-green-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 text-lg mb-2">Define Triggering & Ending Events</h3>
                <p className="text-gray-700 text-sm mb-4">
                  What is the beginning and what is the end? This defines scope.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Triggering event(s) - How does this start?</Label>
                    <p className="text-xs text-gray-600 mb-2">
                      Pick awareness channels from your list that drive people into THIS specific product's engine.
                    </p>
                    <Textarea
                      placeholder="Example: Facebook ad click → Landing page, Referral from existing customer, SEO organic search..."
                      value={triggeringEvents}
                      onChange={(e) => setTriggeringEvents(e.target.value)}
                      className="mt-2 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Ending event - How does this conclude?</Label>
                    <Input
                      placeholder="Example: Purchase: Premium pet sitting package"
                      value={endingEvent}
                      onChange={(e) => setEndingEvent(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-l-4 border-purple-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 text-lg mb-2">Then What Happens?</h3>
                <p className="text-gray-700 text-sm mb-4">
                  This is the fun part! Start with the first sticky note and ask: <strong>"Then what happens?"</strong> Keep asking until you reach the end.
                </p>
                
                <Label className="text-sm font-medium">Outline all the steps and decision points:</Label>
                <p className="text-xs text-gray-600 mb-2">
                  Document what IS happening today (not what should happen). Use your inventory—grab those sticky notes!
                </p>
                <Textarea
                  placeholder="Example:&#10;1. See Facebook ad → Click&#10;2. Land on page with video&#10;3. Watch video (or don't - decision point)&#10;4. If yes: Opt in for free guide&#10;5. If no: Retargeting pixel fires&#10;6. Email sequence begins (7 emails)&#10;7. Email 3: Book free consultation&#10;8. Consultation happens&#10;9. If interested: Send proposal&#10;10. If not: Back to nurture sequence&#10;11. Proposal accepted → Purchase!"
                  value={stepsOutline}
                  onChange={(e) => setStepsOutline(e.target.value)}
                  className="mt-2 min-h-[200px] font-mono text-xs"
                  rows={12}
                />
                
                <Alert className="border-amber-300 bg-amber-50 mt-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-amber-900 text-sm">
                    <strong>When you hear "it depends":</strong> That's a signal to create a decision diamond. 
                    Turn your sticky note diagonal and mark yes/no paths.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border-l-4 border-orange-500 p-5 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 text-lg mb-2">Stakeholder Review</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Don't skip this!</strong> Bring in your team and ask: "What are you currently doing that isn't represented on this flowchart?"
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <p className="text-sm text-orange-900 mb-2"><strong>Why this matters:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Catch any major steps you missed</li>
                    <li>Educate your team on how their role fits into the broader value creation process</li>
                    <li>Get buy-in and alignment across the team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Message */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Congratulations! You've Mapped Your First Growth Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            You now have a <strong>visual representation of the customer acquisition process</strong>. You know how customers happen!
          </p>
          
          <Alert className="border-blue-300 bg-blue-50">
            <Users className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900 text-sm">
              <strong>Next step:</strong> Once you're done with your whiteboard version, you can turn it into a prettier version using tools like 
              Lucidchart, Whimsical, or even just a napkin. But a growth engine alone doesn't make a growth flywheel—we need to get it spinning faster!
            </AlertDescription>
          </Alert>

          <div className="bg-white border-2 border-green-300 rounded-lg p-5">
            <p className="text-green-900 font-semibold mb-2">
              What we've done: Visualized what IS.
            </p>
            <p className="text-gray-700 text-sm">
              What we need to do next: Get the flywheel spinning faster and faster, cranking out customer after customer. 
              That's what optimization is all about.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MappingYourGrowthEngine;
