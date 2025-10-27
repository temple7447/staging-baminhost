import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Cpu, MessageSquare, Target, ArrowRight, Wrench, Users, HelpCircle } from "lucide-react";

export const UpgradingYourOS3Steps: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wrench className="w-6 h-6 text-indigo-600" />
            Upgrading Your OS: The 3 Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-lg leading-relaxed">
            There are three overarching steps to building and upgrading a business operating system, and they align directly to the three components that make up the definition of an operating system that we just talked about.
          </p>
        </CardContent>
      </Card>

      {/* The Three Steps Overview */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl">The Three Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-6 h-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-purple-900">Document Your Algorithms</h3>
                </div>
                <p className="text-base leading-relaxed text-slate-700 mb-2">
                  Document the set of algorithms that make the business run. What are the algorithms? What is the source code that makes up the company?
                </p>
                <Badge variant="outline" className="bg-white text-purple-700 border-purple-300">
                  Processes & Standard Operating Procedures
                </Badge>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-slate-400" />
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-900">Define Communication Architecture</h3>
                </div>
                <p className="text-base leading-relaxed text-slate-700 mb-2">
                  Define and develop your company's communication architecture. These are all your scorecards, dashboards, and meeting rhythms.
                </p>
                <Badge variant="outline" className="bg-white text-blue-700 border-blue-300">
                  Dashboards, Scorecards & Meeting Rhythms
                </Badge>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-slate-400" />
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-green-900">Clarify Desired Outputs</h3>
                </div>
                <p className="text-base leading-relaxed text-slate-700 mb-2">
                  Clarify the company's desired outputs so that your people and systems are all aligned.
                </p>
                <Badge variant="outline" className="bg-white text-green-700 border-green-300">
                  Goals, Mission, Vision & Objectives
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Order? */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="w-6 h-6 text-amber-600" />
            Why This Order? (Goals Come Last!)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <Alert className="border-amber-300 bg-white">
            <HelpCircle className="h-5 w-5 text-amber-600" />
            <AlertDescription>
              In many respects, these steps may seem <strong>out of sequence</strong>. If you take a lot of other courses on strategic planning and building operating systems, they're going to have you start with goals. <strong>We actually do that part last.</strong>
            </AlertDescription>
          </Alert>

          <div className="bg-white p-6 rounded-lg border-2 border-amber-300">
            <p className="text-lg font-semibold text-amber-900 mb-3">Here's Why:</p>
            <p className="text-base leading-relaxed">
              What we found is that once you build out your source code and once you're clear on your communication architecture and all these other components, businesses instantly get <strong>a lot more efficient</strong> and <strong>a lot more scalable</strong>.
            </p>
            <p className="text-base leading-relaxed mt-3">
              When that happens, the desired outputs—the goals that we set for our company—<strong>go up</strong>. That's why we actually do goal setting last.
            </p>
          </div>

          <Alert className="border-green-200 bg-green-50">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-base">
              It seems a little bit counterintuitive. <strong>I would argue that is exactly why it works.</strong>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* The Tools & Frameworks */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl">The Tools & Frameworks</CardTitle>
          <p className="text-sm text-slate-600 mt-2">Proprietary models to build out each component</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-base leading-relaxed text-slate-700">
            If we take these three steps and the three components, we can look at what are the different elements that make up each of these components. Here at The Scalable Company, we have developed proprietary tools, models, and frameworks to flesh out and build each of these three elements:
          </p>

          {/* Algorithms Tools */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-6 h-6 text-purple-600" />
              <h4 className="text-xl font-bold text-purple-900">1. Algorithms (Source Code)</h4>
            </div>
            <div className="space-y-2 ml-8">
              <div className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-purple-800">Value Engines</p>
                  <p className="text-sm text-slate-600">Core value-creation processes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-purple-800">Company Playbooks & Playbook Vault</p>
                  <p className="text-sm text-slate-600">Repository of documented procedures</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-purple-800">High Output Team Canvas</p>
                  <p className="text-sm text-slate-600">Team structure and accountability</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-purple-700">
              These three tools and models combined form the set of algorithms of a company.
            </p>
          </div>

          {/* Common Language Tools */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h4 className="text-xl font-bold text-blue-900">2. Common Language</h4>
            </div>
            <div className="space-y-2 ml-8">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-blue-800">Scorecards</p>
                  <p className="text-sm text-slate-600">The user interface, the data everyone agrees on</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-blue-800">Meeting Rhythm</p>
                  <p className="text-sm text-slate-600">How we generally communicate as a company</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-blue-700">
              It really comes down to these two things: scorecards and meeting rhythm.
            </p>
          </div>

          {/* Desired Outputs Tools */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-6 h-6 text-green-600" />
              <h4 className="text-xl font-bold text-green-900">3. Desired Outputs</h4>
            </div>
            <div className="space-y-2 ml-8">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <p className="font-semibold text-green-800">Clarity Compass</p>
                  <p className="text-sm text-slate-600">Long-term goals, company purpose, broader vision, values, strategic anchors</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-green-700">
              A proprietary tool that brings everything together into a framework that provides clarity.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6 text-blue-600" />
            Need Help? Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p className="text-base leading-relaxed">
            We're going to be walking through each of these three core steps and touching on each of the tools. This is a big program—I'm not going to lie, it's a fair bit of work. It's important work.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-lg text-purple-900 mb-2">📚 Full Program Access</h4>
              <p className="text-sm leading-relaxed mb-3">
                If you want direct access to all of these different tools, those are available in our high-level program: <strong>The Scalable Operating System Accelerator</strong>.
              </p>
              <p className="text-xs text-slate-600 italic">
                Consider upgrading if you really want to go deep and get access to the exact tools we use.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-lg text-blue-900 mb-2">🤝 One-on-One Support</h4>
              <p className="text-sm leading-relaxed mb-3">
                Often times we hear folks say, "Hey, I'd like to get a little bit of help." We have a network of <strong>Scalable Business Advisors</strong> who are trained and licensed to provide direct support.
              </p>
              <p className="text-xs text-slate-600 italic">
                If you want specific one-on-one help building this out, we can connect you with an advisor.
              </p>
            </div>
          </div>

          <Alert className="border-indigo-200 bg-white">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
            <AlertDescription>
              The link should be available on this page to access these resources and connect with support.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-8">
          <p className="text-xl font-bold text-green-800 text-center mb-3">
            Now that you understand the broader framework, let's dig in!
          </p>
          <p className="text-lg text-center text-slate-700">
            Let's start building out the foundation of your operating system, which are your <strong className="text-purple-700">set of algorithms</strong>. →
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradingYourOS3Steps;
