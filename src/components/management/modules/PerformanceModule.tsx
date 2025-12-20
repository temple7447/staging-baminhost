import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    LayoutGrid, Users, Zap, Target, Scale, Shield,
    TrendingUp, ShieldCheck, CheckCircle, CheckCircle2,
    Check, AlertTriangle, UserPlus, Map, HeartPulse,
    ArrowRight, GraduationCap, MessageSquare, AlertCircle,
    PenTool, Gavel, ScrollText, PieChart, Clock
} from "lucide-react";
import { PerformancePlan } from './types';

interface PerformanceModuleProps {
    data: PerformancePlan;
    onUpdate: (updated: PerformancePlan) => void;
    isApproved: boolean;
    onApprove: () => void;
    onSync?: () => void;
}

const PerformanceModule: React.FC<PerformanceModuleProps> = ({ data, onUpdate, isApproved, onApprove, onSync }) => {
    const toggleChecklist = (key: keyof typeof data.checklist) => {
        onUpdate({
            ...data,
            checklist: {
                ...data.checklist,
                [key]: !data.checklist[key]
            }
        });
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 5</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Performance Management
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "Managing performance is about creating an environment where people can flourish and results are inevitable."
                </p>
            </div>

            {/* 1. Organizational Foundation: Create an Org Chart */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                    <div className="flex items-center gap-3 w-fit">
                        <LayoutGrid className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. Create an Org Chart</h3>
                    </div>
                    {onSync && (
                        <Button
                            onClick={onSync}
                            variant="ghost"
                            size="sm"
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2"
                        >
                            <Zap className="w-3 h-3" /> Sync from Hiring Planner
                        </Button>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Regardless of how big or small your company is, everyone should have an org chart. Roles, not people, are the foundation of your organization.
                        </p>

                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Users className="w-24 h-24" />
                            </div>
                            <p className="text-lg font-black uppercase italic tracking-tighter relative z-10 leading-tight">
                                "An org. chart is a visual representation of the roles, not the people, throughout your organization."
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                "Establishes accountability",
                                "Depicts lines of communication and reporting",
                                "Provides a sense of security in knowing where people fit",
                                "Highlights how people make a difference"
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-xs font-bold text-slate-700">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Org Chart Strategy</h4>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Today's Organization</Label>
                                    <Textarea
                                        value={data.orgChart.today}
                                        onChange={(e) => {
                                            onUpdate({ ...data, orgChart: { ...data.orgChart, today: e.target.value } });
                                        }}
                                        className="min-h-[100px] border-slate-200 resize-none text-sm font-medium"
                                        placeholder="Describe your current structure and roles..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Next Level Organization</Label>
                                    <Textarea
                                        value={data.orgChart.nextLevel}
                                        onChange={(e) => {
                                            onUpdate({ ...data, orgChart: { ...data.orgChart, nextLevel: e.target.value } });
                                        }}
                                        className="min-h-[100px] border-slate-200 resize-none text-sm font-medium"
                                        placeholder="What does the next level of your business look like?"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Roles Before People: The 5 Core Pillars */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <PieChart className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Roles Come Before People</h3>
                </div>

                <div className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-3xl">
                        There are five core pillars in every company, regardless of size. Structure your org chart around these functions and determine what success looks like for each.
                    </p>

                    <div className="grid md:grid-cols-5 gap-4">
                        {[
                            { id: 'marketing', label: 'Marketing', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                            { id: 'sales', label: 'Sales', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { id: 'delivery', label: 'Delivery', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
                            { id: 'operations', label: 'Operations', icon: LayoutGrid, color: 'text-purple-500', bg: 'bg-purple-50' },
                            { id: 'finance', label: 'Finance', icon: Scale, color: 'text-slate-500', bg: 'bg-slate-50' }
                        ].map((pillar) => (
                            <div key={pillar.id} className="space-y-3">
                                <div className={`p-4 rounded-2xl border-2 border-slate-100 ${pillar.bg} flex flex-col items-center gap-2 group hover:border-slate-900 transition-all cursor-default h-24 justify-center`}>
                                    <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{pillar.label}</span>
                                </div>
                                <Textarea
                                    value={data.pillars[pillar.id as keyof typeof data.pillars]}
                                    onChange={(e) => {
                                        onUpdate({
                                            ...data,
                                            pillars: { ...data.pillars, [pillar.id]: e.target.value }
                                        });
                                    }}
                                    className="min-h-[100px] text-[10px] font-bold border-slate-200 p-2 resize-none"
                                    placeholder={`What does success look like for ${pillar.label}?`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Responsibilities & Coaching Mastery */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Shield className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Responsibilities & Coaching</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Embrace Coaching</h4>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                                "Think about your favorite sports team. What kind of coach do they have? How well would they perform if the coach was never around? Or if the coach flew into a screaming rage whenever a mistake was made?"
                            </p>
                            <p className="text-xs text-blue-300 font-bold uppercase tracking-widest border-t border-slate-800 pt-4">
                                Part of your job as a leader is to coach your team to better performance.
                            </p>
                        </div>
                        <div className="p-6 bg-white border-2 border-slate-900 rounded-2xl shadow-lg space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Coaching Reflection</h5>
                            <Textarea
                                value={data.coaching.reflection}
                                onChange={(e) => {
                                    onUpdate({ ...data, coaching: { reflection: e.target.value } });
                                }}
                                className="min-h-[120px] text-sm font-medium border-slate-200 p-4"
                                placeholder="How can you adjust your behavior to be the best coach for your team?"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Action: Define Key Roles</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Every role has responsibilities—specific tasks and deliverables. The better these are documented, the easier it is to hold them accountable.
                            </p>
                            <div className="grid gap-3">
                                {[
                                    { key: "rolesBeforePeople", label: "Acknowledge that roles come before people" },
                                    { key: "defineResponsibilities", label: "Clearly define responsibilities for every role" },
                                    { key: "embraceCoaching", label: "Embrace the coaching aspect of your role" }
                                ].map((step) => (
                                    <div
                                        key={step.key}
                                        onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                            {data.checklist[step.key as keyof typeof data.checklist] && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold leading-tight ${data.checklist[step.key as keyof typeof data.checklist] ? 'text-blue-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Results vs Process Goals */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <TrendingUp className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">4. Results vs Process Goals</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Results Goals */}
                    <Card className="border-2 border-slate-100 bg-slate-50/30 overflow-hidden relative group hover:border-slate-900 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="w-24 h-24" />
                        </div>
                        <CardHeader className="bg-slate-900 p-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Results Goals (Outcomes)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <p className="text-xs text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-200 pl-4">
                                "Outcomes that you don't have direct control over. These are usually set by the CEO."
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white border border-slate-100 rounded-lg">
                                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Examples:</div>
                                    <div className="text-[10px] font-bold text-slate-900 leading-tight">
                                        • Win 1,000 new clients<br />
                                        • Lose 50 pounds<br />
                                        • Earn first place
                                    </div>
                                </div>
                                <Textarea
                                    value={data.goals.results}
                                    onChange={(e) => {
                                        onUpdate({ ...data, goals: { ...data.goals, results: e.target.value } });
                                    }}
                                    className="min-h-[100px] text-[10px] font-bold border-slate-200 p-2 resize-none"
                                    placeholder="Your Results Goals..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Process Goals */}
                    <Card className="border-2 border-slate-100 bg-slate-50/30 overflow-hidden relative group hover:border-slate-900 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap className="w-24 h-24" />
                        </div>
                        <CardHeader className="bg-blue-600 p-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Process Goals (Regular Basics)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <p className="text-xs text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-200 pl-4">
                                "Things we do on a regular basis to help us achieve our goals. These are things we have direct control over."
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white border border-slate-100 rounded-lg">
                                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Examples:</div>
                                    <div className="text-[10px] font-bold text-slate-900 leading-tight">
                                        • Make 30 sales calls/week<br />
                                        • Follow a diet plan<br />
                                        • Run 10 miles every day
                                    </div>
                                </div>
                                <Textarea
                                    value={data.goals.process}
                                    onChange={(e) => {
                                        onUpdate({ ...data, goals: { ...data.goals, process: e.target.value } });
                                    }}
                                    className="min-h-[100px] text-[10px] font-bold border-slate-200 p-2 resize-none"
                                    placeholder="Your Process Goals..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Jason Selk's 90% Rule */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-black uppercase tracking-widest text-blue-900">Jason Selk's 90% Rule</h4>
                            <p className="text-sm text-blue-800 font-medium leading-relaxed italic">
                                "If you commit to achieving your process goals at 90% or more over a 30 day period, you will see positive trends towards reaching your result goals."
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase text-blue-900 tracking-widest">Process Goal Commitment</Label>
                        <Textarea
                            value={data.goals.commitment}
                            onChange={(e) => {
                                onUpdate({ ...data, goals: { ...data.goals, commitment: e.target.value } });
                            }}
                            className="min-h-[100px] border-blue-200 bg-white/50 focus:bg-white transition-all text-sm font-medium resize-none shadow-sm"
                            placeholder="What process goals will you achieve at 90% or more this month? Define your daily/weekly habits."
                        />
                    </div>
                </div>
            </section>

            {/* 5. Talent Development: Willing & Able Matrix + Temperaments */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <UserPlus className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">5. Talent Development</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Willing & Able Matrix (Personnel Version) */}
                    <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Willing & Able Matrix</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                "The goal is to push your people into and help them remain in the willing and able quadrant."
                            </p>
                        </div>

                        <div className="aspect-square relative border-2 border-slate-900 rounded-2xl p-8 bg-slate-50/50">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[85%] h-px bg-slate-900/10" />
                                <div className="h-[85%] w-px bg-slate-900/10" />
                            </div>

                            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-blue-600">High Ability</div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-slate-400">Low Ability</div>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase tracking-widest text-slate-400">Low Willingness</div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-black uppercase tracking-widest text-blue-600">High Willingness</div>

                            <div className="grid grid-cols-2 grid-rows-2 h-full gap-4 relative z-10">
                                <div className="flex flex-col items-center justify-center p-4 bg-white/80 border border-slate-200 rounded-xl shadow-sm text-center">
                                    <span className="text-[10px] font-black uppercase text-slate-900 leading-tight">Unwilling<br />Able</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-blue-600 border border-blue-600 rounded-xl shadow-lg text-center transform scale-105">
                                    <span className="text-[10px] font-black uppercase text-white leading-tight">Willing<br />Able</span>
                                    <CheckCircle2 className="w-3 h-3 text-white mt-1" />
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-white/80 border border-slate-200 rounded-xl shadow-sm text-center">
                                    <span className="text-[10px] font-black uppercase text-slate-900 leading-tight">Unwilling<br />Unable</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-white/80 border border-slate-200 rounded-xl shadow-sm text-center">
                                    <span className="text-[10px] font-black uppercase text-slate-900 leading-tight">Willing<br />Unable</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Willing & Able Reflections</Label>
                            <Textarea
                                value={data.talent.willingAbleNotes}
                                onChange={(e) => {
                                    onUpdate({ ...data, talent: { ...data.talent, willingAbleNotes: e.target.value } });
                                }}
                                className="min-h-[100px] text-xs font-medium border-slate-200 resize-none shadow-sm"
                                placeholder="Plot your team. Who needs development? Who is a rockstar? What's your plan to push them into the 'Willing Able' quadrant?"
                            />
                        </div>
                    </div>

                    {/* Personality Temperaments Grid */}
                    <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Personality Secrets</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                "Ask questions during performance reviews to find where someone lands in the temperament grid."
                            </p>
                        </div>

                        <div className="aspect-square grid grid-cols-2 grid-rows-2 gap-px bg-slate-900 border-2 border-slate-900 rounded-2xl overflow-hidden shadow-inner">
                            {[
                                { id: 'catalyst', label: 'Catalyst/ Energizer', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                                { id: 'visionary', label: 'Visionary/ Architect', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { id: 'troubleshooter', label: 'Troubleshooter/ Firefighter', icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
                                { id: 'traditional', label: 'Traditional/ Stabilizer', icon: Scale, color: 'text-slate-500', bg: 'bg-slate-50' }
                            ].map((temp) => (
                                <div key={temp.id} className={`${temp.bg} p-6 flex flex-col items-center justify-center text-center gap-3 hover:brightness-95 transition-all cursor-default`}>
                                    <temp.icon className={`w-6 h-6 ${temp.color}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter leading-tight text-slate-900">{temp.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Temperament Notes</Label>
                            <Textarea
                                value={data.talent.temperamentNotes}
                                onChange={(e) => {
                                    onUpdate({ ...data, talent: { ...data.talent, temperamentNotes: e.target.value } });
                                }}
                                className="min-h-[100px] text-xs font-medium border-slate-200 resize-none shadow-sm"
                                placeholder="Note the temperaments of your direct reports. What do they seek/appreciate? What irritates them?"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Career Paths: Org Chart Evolution */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Map className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">6. Career Paths</h3>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl space-y-12">
                    <div className="max-w-2xl">
                        <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">Establish Career Paths</h4>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                            "Let people know what is required to reach the next level of their role and how they can get there. Continuous definition of success allows your team to know what to strive for."
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 relative">
                        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
                            <div className="p-4 bg-slate-800 rounded-full border-4 border-slate-900 shadow-xl">
                                <ArrowRight className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-6">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <h5 className="font-black uppercase italic tracking-tighter text-xl text-white">Today's Organization</h5>
                            </div>
                            <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm space-y-4">
                                <div className="flex flex-col items-center gap-2 mb-8">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/40">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">CEO</span>
                                </div>
                                <div className="grid grid-cols-5 gap-2 opacity-50">
                                    {['MKT', 'SLS', 'DEL', 'FIN', 'OPS'].map(p => (
                                        <div key={p} className="h-4 bg-slate-700 rounded-full" />
                                    ))}
                                </div>
                                <div className="pt-4 text-center">
                                    <p className="text-[10px] font-bold text-slate-500 italic">Static structure & defined roles</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 border-l-4 border-green-500 pl-6">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <h5 className="font-black uppercase italic tracking-tighter text-xl text-white">Tomorrow's Organization</h5>
                            </div>
                            <div className="p-8 bg-slate-800 rounded-3xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] space-y-4">
                                <div className="flex flex-col items-center gap-2 mb-8">
                                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">CEO</span>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {['MKT', 'SLS', 'DEL', 'FIN', 'OPS'].map(p => (
                                        <div key={p} className="space-y-1">
                                            <div className="h-4 bg-blue-600/30 border border-blue-500/50 rounded-full" />
                                            <div className="h-2 bg-slate-600 rounded-full w-2/3 mx-auto" />
                                            <div className="h-2 bg-slate-700 rounded-full w-1/2 mx-auto opacity-50" />
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 text-center">
                                    <p className="text-[10px] font-bold text-blue-400 italic">Advanced roles & growth paths</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Compensation & Generosity */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <HeartPulse className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">7. Compensation & Generosity</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Evaluate Compensation Fairly</h4>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                Compensation depends primarily on the role. Set a baseline by researching what other companies offer. One-time bonuses are appropriate for significant effort above and beyond.
                            </p>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Compensation Philosophy & Notes</Label>
                                <Textarea
                                    value={data.compensation.notes}
                                    onChange={(e) => {
                                        onUpdate({ ...data, compensation: { notes: e.target.value } });
                                    }}
                                    className="min-h-[120px] border-slate-200 resize-none text-sm font-medium"
                                    placeholder="Outline your compensation ranges, research findings, and bonus structures..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <Quote className="w-32 h-32" />
                            </div>
                            <p className="text-xl font-black uppercase italic tracking-tighter mb-6 relative z-10 leading-tight">
                                "Pay people so well that if they quit, it wasn't because of the money."
                            </p>
                            <p className="text-xs text-blue-400 font-black uppercase tracking-widest relative z-10">
                                — A former mentor
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Tough Conversations */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <GraduationCap className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">8. Tough Conversations</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 mb-4">Core Philosophy</p>
                            <p className="text-lg font-black uppercase italic tracking-tighter leading-tight mb-6">
                                "Tough conversations are only tough when there are things left unspoken."
                            </p>
                            <p className="text-xs font-bold italic text-blue-100">
                                "Seek first to understand, then to be understood." — Stephen Covey
                            </p>
                        </div>

                        {/* Conversation Flow Visual */}
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Conversation Flow</h4>
                            <div className="flex items-center justify-between gap-2">
                                {[
                                    { label: 'Identify Tendency', icon: Zap },
                                    { label: 'Ask and Listen', icon: MessageSquare },
                                    { label: 'Communicate Expectations', icon: CheckCircle2 }
                                ].map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-2 text-center flex-1">
                                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                                <step.icon className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-[8px] font-black uppercase leading-tight text-slate-600">{step.label}</span>
                                        </div>
                                        {i < 2 && <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Communication Clarity</h4>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Things Left Unspoken (Current Gaps)</Label>
                                <Textarea
                                    value={data.toughConversations.notes}
                                    onChange={(e) => {
                                        onUpdate({ ...data, toughConversations: { ...data.toughConversations, notes: e.target.value } });
                                    }}
                                    className="min-h-[100px] border-slate-200 resize-none text-sm font-medium"
                                    placeholder="What issues are currently bubbling under the surface?"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <h4 className="text-sm font-black uppercase tracking-tighter italic text-white leading-none">Conversation Outcomes</h4>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: "1. Benefit of the doubt", color: "bg-blue-900/50 border-blue-800" },
                                    { label: "2. On notice", color: "bg-orange-900/50 border-orange-800" },
                                    { label: "3. Do something", color: "bg-red-900/50 border-red-800" }
                                ].map((outcome, i) => (
                                    <div key={i} className={`p-3 rounded-xl border ${outcome.color} text-center`}>
                                        <span className="text-[8px] font-black uppercase leading-tight block">{outcome.label}</span>
                                    </div>
                                ))}
                            </div>
                            <Textarea
                                value={data.toughConversations.outcomesNotes}
                                onChange={(e) => {
                                    onUpdate({ ...data, toughConversations: { ...data.toughConversations, outcomesNotes: e.target.value } });
                                }}
                                className="min-h-[80px] bg-slate-800 border-slate-700 text-slate-200 text-xs font-medium resize-none shadow-inner"
                                placeholder="Reflect on recent tough decisions or needed changes..."
                            />
                        </div>
                    </div>
                </div>

                {/* Improvement Plan Section */}
                <div className="bg-white border-2 border-slate-900 rounded-[2.5rem] p-10 shadow-2xl space-y-8 mt-12">
                    <div className="max-w-3xl space-y-4">
                        <div className="flex items-center gap-3">
                            <PenTool className="w-6 h-6 text-slate-900" />
                            <h4 className="text-xl font-black uppercase italic tracking-tighter">Performance Improvement Plans</h4>
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                            "How quickly someone needs to improve should depend on the severity or frequency of the problem. Higher severity needs shorter timelines."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden group hover:border-slate-900 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Clock className="w-12 h-12" />
                                </div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Improvement Timeline Logic</h5>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                        <span className="text-red-600 uppercase italic">Severe/Frequent</span>
                                        <span className="text-slate-400">|</span>
                                        <span className="text-blue-600 uppercase italic">Mild/Occasional</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-red-500 w-1/3" />
                                        <div className="h-full bg-orange-400 w-1/3" />
                                        <div className="h-full bg-blue-500 w-1/3" />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase">
                                        <span>Short Burst (2-4 weeks)</span>
                                        <span>Standard (30-60 days)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Improvement Plans & Metrics</Label>
                            <Textarea
                                value={data.toughConversations.improvementPlanNotes}
                                onChange={(e) => {
                                    onUpdate({ ...data, toughConversations: { ...data.toughConversations, improvementPlanNotes: e.target.value } });
                                }}
                                className="min-h-[120px] border-slate-200 text-sm font-medium resize-none shadow-sm"
                                placeholder="Detail the 'what, how, and when' components of current performance plans..."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Parting Shots */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Gavel className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">9. Parting Shots</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <AlertTriangle className="w-32 h-32" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Non-Negotiables & Separation</h4>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed italic mb-8 relative z-10">
                                "Make your non-negotiables known by every single person on your team. They get let go as quickly as possible for having abused the most basic trust agreement."
                            </p>
                            <div className="p-6 bg-slate-800/80 border border-slate-700/50 rounded-2xl space-y-4 relative z-10">
                                <div className="flex items-start gap-4">
                                    <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                        Always consult legal counsel first in sensitive cases. Not doing things correctly can open your company to serious legal issues.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-2 border-slate-900 bg-white shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Separation Notes & Policy</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <Textarea
                                    value={data.partingShots.notes}
                                    onChange={(e) => {
                                        onUpdate({ ...data, partingShots: { notes: e.target.value } });
                                    }}
                                    className="min-h-[150px] border-slate-200 text-sm font-medium resize-none shadow-sm"
                                    placeholder="Outline your team's non-negotiables and current separation protocols..."
                                />
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-blue-600 rounded-3xl shadow-xl text-white transform hover:scale-[1.02] transition-all">
                            <p className="text-xl font-black uppercase italic tracking-tighter leading-tight mb-4 text-center">
                                "Intellectuals solve problems, geniuses prevent them."
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 text-center">
                                — Albert Einstein
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Actions Steps Checklist */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <ScrollText className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">10. Performance Action Steps</h3>
                </div>

                <div className="bg-white border-2 border-slate-900 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <CheckCircle2 className="w-64 h-64" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">Final Commitment</h4>
                            <p className="text-sm text-slate-500 font-medium">Complete these core actions to finalize your performance architecture.</p>
                        </div>

                        <div className="grid gap-3">
                            {[
                                { key: "createOrgChart", label: "Create a current and future-facing org. chart" },
                                { key: "rolesBeforePeople", label: "Acknowledge that roles come before people" },
                                { key: "printMatrix", label: "Print out the Willing and Able Matrix" },
                                { key: "scheduleReviews", label: "Schedule performance reviews with your team" },
                                { key: "establishPaths", label: "Establish career paths within your company" },
                                { key: "evaluateComp", label: "Evaluate compensation fairly and be generous" }
                            ].map((step) => (
                                <div
                                    key={step.key}
                                    onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer group ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-green-50 border-green-500 shadow-sm' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-green-600 border-green-600 scale-110' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                        {data.checklist[step.key as keyof typeof data.checklist] && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-tight italic ${data.checklist[step.key as keyof typeof data.checklist] ? 'text-green-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. Afterword */}
            <section className="space-y-8 pt-12 text-center max-w-4xl mx-auto">
                <div className="h-1 w-24 bg-slate-200 mx-auto mb-12" />
                <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic mb-8">Afterword</h3>
                <div className="space-y-6 text-slate-600 font-medium leading-relaxed italic text-sm md:text-base px-8">
                    <p>
                        "There are hundreds of outstanding books on management that'll help take your leadership skills to the next level but you'd have to dedicate hundreds or even thousands of hours to reading all of them."
                    </p>
                    <p>
                        "In this course I've shared with you not only the important nuggets of wisdom that I've learned from reading these books throughout the last 20 years but also from years of working with my clients to help them become better leaders and managers..."
                    </p>
                    <p className="text-slate-900 font-black not-italic uppercase tracking-widest text-xs border-y border-slate-100 py-6 my-12">
                        The key to becoming a better leader, as with anything else, is to commit to making this a part of your identity.
                    </p>
                    <div className="pt-8">
                        <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-8">All the best,</p>
                        <div className="relative inline-block">
                            <h4 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">James Friel</h4>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-slate-900" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${isApproved ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${isApproved ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Performance Clarity</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Org & Performance Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={onApprove}
                            className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {isApproved ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Performance Strategy"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isApproved ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {isApproved
                                ? "Performance pillars and organizational accountability have been activated. Results goals are now clear."
                                : "Are your roles clearly defined and your goals architectures set for success? Sign off to finalize your performance framework."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PerformanceModule;
