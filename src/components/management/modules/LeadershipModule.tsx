import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
    Users, Shield, Quote, Zap, AlertTriangle,
    CheckCircle2, CheckCircle, ShieldCheck, Check,
    Smile, Frown, TrendingUp, Globe
} from "lucide-react";
import { LeadershipPlan } from './types';
import { LEADERSHIP_QUESTIONS } from './constants';

interface LeadershipModuleProps {
    data: LeadershipPlan;
    onUpdate: (updated: LeadershipPlan) => void;
    isApproved: boolean;
    onApprove: () => void;
}

const LeadershipModule: React.FC<LeadershipModuleProps> = ({ data, onUpdate, isApproved, onApprove }) => {
    const toggleChecklist = (key: keyof typeof data.checklist) => {
        onUpdate({
            ...data,
            checklist: {
                ...data.checklist,
                [key]: !data.checklist[key]
            }
        });
    };

    const handleRating = (questionId: number, rating: number) => {
        onUpdate({
            ...data,
            assessment: {
                ...data.assessment,
                [questionId]: rating
            }
        });
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 2</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Develop Your Leadership Ability
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "Great leaders are made, not necessarily born."
                </p>
            </div>

            {/* Engaged Leader Attributes */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Users className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. Strive to be an Engaged Leader</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            One of the most important things for managing a team and growing an organization is your own leadership ability.
                            A great leader doesn't need to take the credit for everything. They understand that a team wins and loses TOGETHER.
                        </p>
                        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-lg">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">7 Attributes of an Engaged Leader:</h4>
                            <div className="space-y-3">
                                {[
                                    { key: "valuePeople", label: "1. Sincerely values their people" },
                                    { key: "talentDevelopment", label: "2. Focuses on talent development" },
                                    { key: "createConnections", label: "3. Creates connections between team members" },
                                    { key: "createOwnership", label: "4. Creates ownership and delivers on promises" },
                                    { key: "takeResponsibility", label: "5. Takes responsibility for their actions" },
                                    { key: "directCommunication", label: "6. Has direct, open communication" },
                                    { key: "empowerTeam", label: "7. Enables and empowers their team to shine" }
                                ].map((attr) => (
                                    <div
                                        key={attr.key}
                                        onClick={() => toggleChecklist(attr.key as keyof typeof data.checklist)}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${data.checklist[attr.key as keyof typeof data.checklist] ? 'bg-slate-400 border-slate-400' : 'border-slate-700 bg-slate-800'}`}>
                                            {data.checklist[attr.key as keyof typeof data.checklist] && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-[11px] font-bold uppercase tracking-tight transition-colors ${data.checklist[attr.key as keyof typeof data.checklist] ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                            {attr.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-50 border-slate-200 shadow-none h-full">
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Quote className="w-5 h-5 text-slate-300" />
                                    <CardTitle className="text-sm font-black uppercase tracking-tight text-slate-600">Case Study: Sir Richard Branson</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 space-y-4">
                                <div className="text-xs text-slate-500 leading-relaxed font-medium space-y-3">
                                    <p>While exploring a new resort site, Branson overheard two workers demolishing a shack on a scorching hot day.</p>
                                    <p className="italic font-bold text-slate-700">"We are going to build an amazing resort on this island... By demolishing this shack, you're taking the first step we need in order to build our dream. So thank you for performing this hard but important work."</p>
                                    <p>He connected their manual labor to the "Big Picture," demonstrating that he sincerely values his people and empowers them to do their job.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden group">
                            <div className="bg-slate-700 h-1 w-full" />
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-sm font-black uppercase tracking-tight text-slate-200">Case Study: Navy S.E.A.L. "Hell Week"</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 space-y-4">
                                <div className="text-[11px] text-slate-400 leading-relaxed font-medium space-y-3">
                                    <p>Recruits were divided into teams for a grueling boat race. <span className="text-white font-bold italic">Team Alpha</span> kept winning, while <span className="text-white font-bold italic">Team Delta</span> was consistently last.</p>
                                    <p>The leader of Team Delta blamed his men. The instructors swapped the leaders. <span className="text-slate-400 font-bold block mt-2 text-xs uppercase tracking-widest italic animate-pulse">The result?</span></p>
                                    <p className="border-l-2 border-slate-500 pl-3 italic">"Team Delta, with the new leader, won the very next round. Strong leadership turned a losing team into a winning one."</p>
                                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mt-4">
                                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-tighter">"Teams win or lose based on leadership. In business it's no different."</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* The 7 Shifts */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Zap className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Seven Shifts for Becoming an Engaged Leader</h3>
                </div>

                <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Globe className="w-32 h-32 text-slate-900" />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic text-center">
                            Writing for <span className="font-bold border-b-2 border-slate-900">Harvard Business Review</span>, Michael Watkins highlights seven seismic shifts managers must make to become great leaders.
                        </p>

                        <div className="grid gap-4">
                            {[
                                { from: "Specialist", fromDesc: "Understands one function deeply", to: "Generalist", toDesc: "Understands the whole business" },
                                { from: "Analyst", fromDesc: "Manages specific business activities", to: "Integrator", toDesc: "Makes decisions for the good of organization" },
                                { from: "Tactician", fromDesc: "Focuses on details and results", to: "Strategist", toDesc: "Understands the big picture" },
                                { from: "Bricklayer", fromDesc: "Manages distinct elements", to: "Architect", toDesc: "Designs organizational systems" },
                                { from: "Problem Solver", fromDesc: "Masters skills and mobilises talent", to: "Agenda Setter", toDesc: "Defines which challenges to tackle" },
                                { from: "Warrior", fromDesc: "Marshals the troops", to: "Diplomat", toDesc: "Engages external stakeholders" },
                                { from: "Supporting Cast", fromDesc: "Sets a good example", to: "Lead Role", toDesc: "Inspires Everyone" }
                            ].map((shift, idx) => (
                                <div key={idx} className="group flex items-center gap-6 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-300">
                                    <div className="w-1/3 text-right">
                                        <span className="block text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">{shift.from}</span>
                                        <span className="block text-[10px] text-slate-400 italic font-medium">{shift.fromDesc}</span>
                                    </div>
                                    <div className="flex-1 h-0.5 bg-slate-200 relative group-hover:bg-slate-900 transition-colors">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-t-2 border-slate-200 rotate-45 group-hover:border-slate-900 transition-colors" />
                                    </div>
                                    <div className="w-1/3 text-left">
                                        <span className="block text-xs font-black uppercase tracking-widest text-slate-900">{shift.to}</span>
                                        <span className="block text-[10px] text-slate-500 italic font-medium">{shift.toDesc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white p-6 rounded-xl text-center space-y-2">
                            <p className="text-xl font-black uppercase italic tracking-tighter">"To think like a leader, you need to think holistically."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Management Pitfalls Grid */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <AlertTriangle className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Common Management Pitfalls</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Falling on either extreme is uncommon, but every leader has tendencies towards one archetype or another.
                            <span className="font-bold underline block mt-2">Where do you fall on the grid? Strive to be in the middle.</span>
                        </p>

                        <div className="relative aspect-square w-full max-w-sm mx-auto bg-white border-2 border-slate-900 rounded-xl overflow-hidden shadow-2xl">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                                <div className="border-r border-b border-slate-100 flex items-center justify-center p-4">
                                    <div className="text-center">
                                        <span className="block text-xs font-black text-slate-300 uppercase underline decoration-slate-200 decoration-2">The Absentee</span>
                                        <span className="block text-[8px] text-slate-300 mt-1 uppercase font-bold tracking-tighter">No Presence / No Conflict</span>
                                    </div>
                                </div>
                                <div className="border-b border-slate-100 flex items-center justify-center p-4">
                                    <div className="text-center">
                                        <span className="block text-xs font-black text-slate-300 uppercase underline decoration-slate-200 decoration-2">The Micro-manager</span>
                                        <span className="block text-[8px] text-slate-300 mt-1 uppercase font-bold tracking-tighter">Hi Presence / No Conflict</span>
                                    </div>
                                </div>
                                <div className="border-r border-slate-100 flex items-center justify-center p-4">
                                    <div className="text-center">
                                        <span className="block text-xs font-black text-slate-300 uppercase underline decoration-slate-200 decoration-2">The Bully</span>
                                        <span className="block text-[8px] text-slate-300 mt-1 uppercase font-bold tracking-tighter">No Presence / Hi Conflict</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center p-4">
                                    <div className="text-center">
                                        <span className="block text-[10px] font-black text-slate-900 uppercase underline decoration-slate-900 decoration-2">The Engaged Leader</span>
                                        <span className="block text-[8px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Presence / Conflict Balance</span>
                                    </div>
                                </div>
                            </div>

                            {/* Axis Labels */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Conflict Ability</div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Leader Presence</div>

                            {/* The Sweet Spot */}
                            <div className="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Smile className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-50 border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-tight">Archetype Checklist</CardTitle>
                                <CardDescription className="text-xs">Which of these feel like your current default?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "Micro-manager (High presence / No conflict)", desc: "Fear that things won't be done correctly." },
                                    { label: "Absentee (No presence / No conflict)", desc: "Avoiding the team to focus on other work." },
                                    { label: "The Bully (High conflict / No presence)", desc: "Managing through fear and intimidation." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-900 transition-all cursor-pointer group">
                                        <div className="mt-1 w-4 h-4 rounded border border-slate-300 flex items-center justify-center group-hover:border-slate-900 transition-colors shrink-0">
                                            <div className="w-2 h-2 bg-slate-900 opacity-0 group-hover:opacity-10 rounded-sm" />
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-black uppercase text-slate-900">{item.label}</span>
                                            <span className="block text-[10px] text-slate-500 italic mt-1 font-medium">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Strategic/Execution Spectrum */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <TrendingUp className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">4. Values Alignment</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <Card className="bg-slate-900 border-none shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                            <TrendingUp className="w-48 h-48 text-white" />
                        </div>
                        <CardHeader className="relative z-10 p-8 pb-4">
                            <CardTitle className="text-white text-xl font-black uppercase italic tracking-tighter">Strategic vs. Execution</CardTitle>
                            <CardDescription className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Where do your strengths lie?</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 p-8 pt-0 space-y-12">
                            <p className="text-slate-300 text-sm italic leading-relaxed">
                                "The best leaders strike a balance between high-level strategy and ground-level execution. Too much strategy without execution results in no progress. Too much execution without strategy leads to burnout and lack of direction."
                            </p>

                            <div className="space-y-8">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                    <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-slate-400" /> Strategy focus</span>
                                    <span className="flex items-center gap-2">Execution focus <Zap className="w-3 h-3 text-slate-400" /></span>
                                </div>
                                <div className="px-2">
                                    <Slider
                                        defaultValue={[data.strategyExecutionValue]}
                                        max={100}
                                        step={1}
                                        onValueChange={(val) => onUpdate({ ...data, strategyExecutionValue: val[0] })}
                                        className="py-4"
                                    />
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Your Focus Profile:</span>
                                    <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                        {data.strategyExecutionValue < 40 ? "Execution Powerhouse" : data.strategyExecutionValue > 60 ? "Visionary Strategist" : "Balanced Architecture"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Self Reflection Note:</h4>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic border-l-4 border-slate-900 pl-6 py-2">
                                "If you're too focused on execution, look for an 'Architect' to help you design systems. If you're too focused on strategy, you need a 'Bricklayer' to get things done."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comprehensive Assessment */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">5. Leadership Self-Assessment</h3>
                    </div>
                    <Badge variant="outline" className="border-slate-900 text-slate-900 font-black uppercase tracking-widest text-[10px]">12 Attributes</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {LEADERSHIP_QUESTIONS.map((q) => (
                        <Card key={q.id} className="shadow-none border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex gap-4">
                                    <span className="text-xs font-black text-slate-300 shrink-0">{q.id.toString().padStart(2, '0')}</span>
                                    <p className="text-xs font-bold text-slate-700 leading-tight">{q.text}</p>
                                </div>
                                <div className="flex justify-between items-center gap-1 pt-2">
                                    {[
                                        { val: 1, label: "Strongly Disagree", color: "bg-slate-200 text-slate-900 border-slate-300" },
                                        { val: 2, label: "Disagree", color: "bg-slate-100 text-slate-700 border-slate-200" },
                                        { val: 3, label: "Agree", color: "bg-slate-600 text-white border-slate-700" },
                                        { val: 4, label: "Strongly Agree", color: "bg-slate-900 text-white border-slate-900" }
                                    ].map((rating) => (
                                        <button
                                            key={rating.val}
                                            onClick={() => handleRating(q.id, rating.val)}
                                            className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-tighter transition-all border ${data.assessment[q.id] === rating.val ? rating.color.split(' ').slice(0, 2).join(' ') + ' ring-2 ring-slate-900 border-slate-900' : 'bg-transparent text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                                        >
                                            {rating.label}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="space-y-2 text-center md:text-left flex-1">
                            <h4 className="text-lg font-black uppercase italic tracking-tighter">Pick one to improve</h4>
                            <p className="text-xs text-slate-400 font-medium">Select the attribute you will focus on for the next 30 days based on your lowest scores above.</p>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0">
                            <select
                                value={data.improvementFocus}
                                onChange={(e) => onUpdate({ ...data, improvementFocus: e.target.value })}
                                className="w-full md:w-80 bg-white/10 border border-white/20 text-white h-12 rounded-xl px-4 text-xs font-bold focus:bg-white/20 outline-none transition-all"
                            >
                                <option className="text-slate-900" value="">Choose focus area...</option>
                                {LEADERSHIP_QUESTIONS.map(q => (
                                    <option className="text-slate-900" key={q.id} value={q.text}>{q.text}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Steps Section */}
            <section className="space-y-6 pt-12">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Action Steps</h3>
                </div>

                <div className="max-w-2xl mx-auto space-y-3">
                    {[
                        { key: "takeQuestionnaire", label: "How engaged a leader are you? Take the questionnaire." },
                        { key: "pickAttribute", label: "Pick one attribute to focus on for the next 30 days." },
                        { key: "plotGrid", label: "Plot yourself on the conflict vs presence grid." },
                        { key: "plotSpectrum", label: "Where do you fall on the strategy vs execution spectrum?" },
                        { key: "seekFeedback", label: "Seek feedback from your team, friends and family." }
                    ].map((step) => (
                        <div
                            key={step.key}
                            onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 hover:border-slate-400'}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${data.checklist[step.key as keyof typeof data.checklist] ? 'border-white bg-slate-700' : 'border-slate-200'}`}>
                                {data.checklist[step.key as keyof typeof data.checklist] && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-sm font-bold uppercase tracking-tight">{step.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Admin/Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${isApproved ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${isApproved ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Leadership Commitment</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Leadership Module Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={onApprove}
                            className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {isApproved ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Leadership Strategy"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isApproved ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {isApproved
                                ? "This leadership commitment has been finalized. The focus area for the next 30 days is locked."
                                : "Are you committed to developing your leadership ability? Sign off here to finalize your assessments and focus areas."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LeadershipModule;
