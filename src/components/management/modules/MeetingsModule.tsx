import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Clock, TrendingUp, LayoutGrid, Target, ChevronUp,
    ChevronDown, Calendar, AlertTriangle, PenTool,
    Check, ShieldCheck, CheckCircle, CheckCircle2,
    Zap, Quote, Globe, BarChart3, Users
} from "lucide-react";
import { ModuleProps, MeetingsPlan, ProtocolData } from './types';
import { MEETING_PROTOCOLS } from './constants';

const MeetingsModule: React.FC<ModuleProps<MeetingsPlan>> = ({
    data,
    onUpdate,
    isApproved,
    onApprove
}) => {
    const [activeMeetingType, setActiveMeetingType] = useState(MEETING_PROTOCOLS[0].id);

    const toggleChecklist = (key: keyof typeof data.checklist) => {
        onUpdate({
            ...data,
            checklist: {
                ...data.checklist,
                [key]: !data.checklist[key]
            }
        });
    };

    const toggleActionStep = (key: keyof typeof data.actionSteps) => {
        onUpdate({
            ...data,
            actionSteps: {
                ...data.actionSteps,
                [key]: !data.actionSteps[key]
            }
        });
    };

    const handleProtocolDataChange = (protocolId: string, fieldId: string, value: string) => {
        onUpdate({
            ...data,
            protocolsData: {
                ...data.protocolsData,
                [protocolId]: {
                    ...(data.protocolsData[protocolId] || {}),
                    [fieldId]: value
                }
            }
        });
    };

    const togglePostMeetingChecklist = (protocolId: string, key: 'sendNotes' | 'followUp') => {
        onUpdate({
            ...data,
            postMeeting: {
                ...data.postMeeting,
                [protocolId]: {
                    ...(data.postMeeting[protocolId] || { sendNotes: false, followUp: false }),
                    [key]: !data.postMeeting[protocolId]?.[key]
                }
            }
        });
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 4</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Run Outcome Based Meetings
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "Meetings are only necessary when they help keep your company on track to hitting its goals."
                </p>
            </div>

            {/* Introduction & Meeting Dynamics */}
            <section className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                            <Clock className="w-6 h-6 text-slate-900" />
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. Understanding Meeting Dynamics</h3>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            According to the research team at Lucid Meetings, there are somewhere between 36 and 56 million meetings in the US everyday, costing over $37 billion spent on ineffective meetings!
                        </p>
                        <Card className="bg-slate-900 text-white overflow-hidden shadow-2xl">
                            <CardHeader className="bg-slate-800 border-b border-white/5">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Meeting Mission</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                                    Before any meeting starts, each participant should have a clear understanding of what their expected contribution is and what the desired outcome is. Starting without framing the conversation allows meetings to deviate from their intended purpose and take on a life of their own.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-xl space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Establish Roles & Parameters:</p>
                            <div className="grid gap-3">
                                {[
                                    { key: "needMeeting", label: "Do we really need this meeting? Why?" },
                                    { key: "whoRunning", label: "Who is running the meeting?" },
                                    { key: "whoFacilitating", label: "Who is facilitating?" },
                                    { key: "whoContributing", label: "Who is expected to contribute and in what way?" },
                                    { key: "whoRecording", label: "Who is recording what is discussed?" },
                                    { key: "opinionVoice", label: "How and when can people voice their opinions?" },
                                    { key: "captureTopics", label: "How will you capture important topics that arise but are irrelevant?" },
                                    { key: "decideActions", label: "Who will decide the next action items?" },
                                    { key: "accountableActions", label: "Who is accountable for delivering those action items?" }
                                ].map((step) => (
                                    <div
                                        key={step.key}
                                        onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-400 border-slate-400' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                            {data.checklist[step.key as keyof typeof data.checklist] && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold leading-tight ${data.checklist[step.key as keyof typeof data.checklist] ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <TrendingUp className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Real World Examples</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Jeff Bezos Example */}
                    <Card className="border-2 border-slate-900 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Quote className="w-24 h-24" />
                        </div>
                        <CardHeader className="bg-slate-800 border-b border-slate-700 p-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Jeff Bezos (Amazon)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Badge className="bg-slate-900 text-white font-black uppercase text-[10px]">No PowerPoint</Badge>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">Instead, somebody prepares a six page, narratively structured memo. It's real sentences, not just bullet points.</p>
                                </div>
                                <div className="space-y-2">
                                    <Badge className="bg-blue-500 text-white font-black uppercase text-[10px]">Two-Pizza Teams</Badge>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">No meeting should be larger than what can be fed by two pizzas.</p>
                                </div>
                                <div className="space-y-2">
                                    <Badge className="bg-blue-500 text-white font-black uppercase text-[10px]">Start with Silence</Badge>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">Before every meeting begins, take time to read the memos prepared for the meeting. This ensures everyone is educated.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Saul Colt Example */}
                    <Card className="border-2 border-slate-900 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap className="w-24 h-24" />
                        </div>
                        <CardHeader className="bg-slate-800 border-b border-slate-700 p-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Saul Colt (Idea Integration Co.)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <p className="text-xs text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-200 pl-4">
                                "The goal is to make meetings a little inconvenient so the number of unnecessary meeting requests would be cut in half."
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "10-Minute", detail: "Done on the floor while doing crunches" },
                                    { label: "Half-Hour", detail: "Done in the back seat of a car" },
                                    { label: "Longer", detail: "Walking through art galleries" }
                                ].map((item, i) => (
                                    <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                                        <div className="text-[10px] font-black uppercase text-slate-400 mb-1">{item.label}</div>
                                        <div className="text-[10px] font-bold text-slate-900">{item.detail}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 3. Strategic Meetings Framework */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <LayoutGrid className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Strategic Meetings Framework</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Developing your potential as a leader means recognizing the importance of zooming in and out. The Strategic Meeting Framework will help you make sure you have the right attention on both ends of the spectrum.
                        </p>
                        <div className="flex gap-4 p-8 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                            <div className="flex flex-col items-center justify-between py-4">
                                <div className="flex flex-col items-center">
                                    <ChevronUp className="w-6 h-6 animate-bounce" />
                                    <span className="text-[10px] font-black uppercase tracking-widest vertical-text pt-2">Strategic</span>
                                </div>
                                <div className="h-40 w-1 bg-white/20 rounded-full relative">
                                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest vertical-text pb-2">Execution</span>
                                    <ChevronDown className="w-6 h-6 animate-bounce" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                {[
                                    { level: "Annual Planning", desc: "Top 3-5 OKRs" },
                                    { level: "Quarterly Planning", desc: "Top 3-5 OKRs that support annual" },
                                    { level: "Monthly Planning", desc: "Key initiatives supporting quarterly" },
                                    { level: "Weekly Sprint", desc: "Check in on progress & roadblocks" },
                                    { level: "Department Specific", desc: "KPI review and collaboration" }
                                ].map((step, i) => (
                                    <div key={i} className="p-4 bg-white/10 border border-white/20 rounded-xl group hover:bg-white/20 transition-all">
                                        <div className="text-xs font-black uppercase tracking-widest mb-1">{step.level}</div>
                                        <div className="text-[10px] font-medium text-slate-400">{step.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 border-2 border-slate-900 p-8 rounded-3xl space-y-6">
                            <div className="flex items-center gap-4">
                                <Target className="w-8 h-8 text-slate-900" />
                                <h4 className="text-xl font-black uppercase italic tracking-tighter">OKR Keywords</h4>
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">Objective</Badge>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>
                                    <p className="text-xs text-slate-500 italic">"Description of what you want to achieve"</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">Key Result</Badge>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>
                                    <p className="text-xs text-slate-500 italic">"What will be measured"</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">Initiatives</Badge>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>
                                    <p className="text-xs text-slate-500 italic">"What tasks, projects or activities will be executed"</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center pt-8">
                                OKRs pioneered by John Doerr in the late 90s
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Strategic Meeting Cadence */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Calendar className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">4. The Strategic Meeting Cadence</h3>
                </div>

                <div className="space-y-8">
                    {/* Switcher */}
                    <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl w-fit">
                        {MEETING_PROTOCOLS.map((protocol) => (
                            <button
                                key={protocol.id}
                                onClick={() => setActiveMeetingType(protocol.id)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                                    ${activeMeetingType === protocol.id
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}
                            >
                                {protocol.id}
                            </button>
                        ))}
                    </div>

                    {/* Protocol Card */}
                    {MEETING_PROTOCOLS.map((p) => (
                        activeMeetingType === p.id && (
                            <div key={p.id} className="grid lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Left Side: Visual & Meta */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className={`p-8 rounded-3xl border-2 ${p.border} ${p.bg} space-y-6`}>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                                                    <p.icon className={`w-5 h-5 ${p.color}`} />
                                                </div>
                                                <Badge variant="outline" className="bg-white border-slate-200 text-[10px] font-black uppercase tracking-tighter">Protocol</Badge>
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none pt-2">{p.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{p.subtitle}</p>
                                        </div>

                                        <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                                            "{p.intro}"
                                        </p>

                                        <div className="grid gap-4 pt-4">
                                            {p.meta.map((m, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100">
                                                        <m.icon className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase text-slate-400 leading-none">{m.label}</p>
                                                        <p className="text-[10px] font-bold text-slate-900">{m.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Obstacle Check */}
                                    <div className="p-6 bg-slate-900 rounded-3xl shadow-xl border border-slate-800">
                                        <div className="flex items-center gap-3 mb-4">
                                            <AlertTriangle className="w-5 h-5 text-slate-400" />
                                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Obstacle Check</h5>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-4 italic">
                                            Discuss what would prevent you from achieving these objectives/actions:
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Insufficient Bandwidth", "Unrealistic", "Competing Priorities", "Inadequate Resources"].map((obs) => (
                                                <div key={obs} className="text-[9px] font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                                    {obs}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Agenda */}
                                <div className="lg:col-span-3 space-y-6">
                                    <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                            <p.icon className="w-48 h-48" />
                                        </div>

                                        <div className="relative z-10 space-y-8">
                                            <div className="flex items-center justify-between">
                                                <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                    <LayoutGrid className="w-4 h-4 text-slate-400" />
                                                    Meeting Agenda
                                                </h5>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.agenda.length} Key Steps</span>
                                            </div>

                                            <div className="space-y-8">
                                                {p.formFields ? (
                                                    <div className="space-y-8">
                                                        {p.formFields.map((field, fIdx) => (
                                                            <div key={field.id} className="space-y-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                                                        {fIdx + 1}
                                                                    </div>
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">
                                                                        {field.label}
                                                                    </Label>
                                                                </div>
                                                                <Textarea
                                                                    placeholder={field.placeholder}
                                                                    value={data.protocolsData[p.id]?.[field.id] || ''}
                                                                    onChange={(e) => handleProtocolDataChange(p.id, field.id, e.target.value)}
                                                                    className="bg-slate-50 border-slate-200 text-xs min-h-[80px] focus:border-slate-900 transition-all resize-none rounded-xl"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="space-y-6">
                                                        {p.agenda.map((step, idx) => (
                                                            <div key={idx} className="flex gap-4 group">
                                                                <div className="flex flex-col items-center">
                                                                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                                        {idx + 1}
                                                                    </div>
                                                                    {idx < p.agenda.length - 1 && (
                                                                        <div className="w-px h-full bg-slate-200 mt-2" />
                                                                    )}
                                                                </div>
                                                                <div className="pb-4">
                                                                    <p className="text-sm text-slate-700 font-medium leading-relaxed pt-0.5">
                                                                        {step}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Post Meeting Section */}
                                                {p.formFields && (
                                                    <div className="pt-8 border-t border-slate-100 space-y-4">
                                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                            <PenTool className="w-3 h-3" />
                                                            Post-Meeting Actions
                                                        </h5>
                                                        <div className="grid sm:grid-cols-2 gap-4">
                                                            {[
                                                                { key: 'sendNotes', label: 'Send meeting notes & next steps' },
                                                                { key: 'followUp', label: 'Follow-up on next steps' }
                                                            ].map((item) => (
                                                                <div
                                                                    key={item.key}
                                                                    onClick={() => togglePostMeetingChecklist(p.id, item.key as 'sendNotes' | 'followUp')}
                                                                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${data.postMeeting[p.id]?.[item.key as 'sendNotes' | 'followUp']
                                                                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                                                        : 'bg-slate-50 border-slate-100 hover:border-slate-900'
                                                                        }`}
                                                                >
                                                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${data.postMeeting[p.id]?.[item.key as 'sendNotes' | 'followUp']
                                                                        ? 'bg-slate-400 border-slate-400'
                                                                        : 'border-slate-300 bg-white'
                                                                        }`}>
                                                                        {data.postMeeting[p.id]?.[item.key as 'sendNotes' | 'followUp'] && <Check className="w-3 h-3 text-white" />}
                                                                    </div>
                                                                    <span className={`text-[10px] font-bold tracking-tight ${data.postMeeting[p.id]?.[item.key as 'sendNotes' | 'followUp'] ? 'text-white' : 'text-slate-600'
                                                                        }`}>
                                                                        {item.label}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* 5. The Willing & Able Matrix (Skill vs Will) */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <PieChart className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">5. The Willing & Able Matrix</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            A critical part of management is assessing where your team members sit in terms of their <strong>Will</strong> (motivation and attitude) and their <strong>Skill</strong> (competence and knowledge). This matrix dictates how you should manage them.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { quadrant: "High Skill / High Will", label: "Delegate", color: "bg-slate-900", text: "The Rockstar - Empower and give ownership." },
                                { quadrant: "Low Skill / High Will", label: "Guide", color: "bg-slate-400", text: "The Student - Train and mentor closely." },
                                { quadrant: "High Skill / Low Will", label: "Excite", color: "bg-slate-200", text: "The Grump - Re-engage and find the 'Why'." },
                                { quadrant: "Low Skill / Low Will", label: "Direct", color: "bg-slate-100 border border-slate-200", text: "The Liability - Close supervision or transition out." }
                            ].map((q, i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${q.color}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{q.label}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{q.quadrant}</p>
                                    <p className="text-[10px] text-slate-600 font-medium leading-tight">{q.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Matrix Visual */}
                    <div className="relative aspect-square bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 font-black uppercase text-[10px] tracking-widest pointer-events-none opacity-50">
                            <div className="border-r border-b border-slate-200 flex items-center justify-center bg-slate-100 text-slate-600 p-2 text-center">Guide<br />(Train)</div>
                            <div className="border-b border-slate-200 flex items-center justify-center bg-slate-900 text-white p-2 text-center">Delegate<br />(Empower)</div>
                            <div className="border-r border-slate-200 flex items-center justify-center bg-slate-50 text-slate-400 p-2 text-center">Direct<br />(Supervise)</div>
                            <div className="flex items-center justify-center bg-slate-200 text-slate-800 p-2 text-center">Excite<br />(Re-engage)</div>
                        </div>
                        {/* Axes */}
                        <div className="absolute left-8 bottom-8 right-8 h-0.5 bg-slate-900">
                            <div className="absolute right-0 translate-x-full -translate-y-1/2 text-[10px] font-black uppercase tracking-widest ml-2">Will →</div>
                        </div>
                        <div className="absolute left-8 bottom-8 top-8 w-0.5 bg-slate-900">
                            <div className="absolute top-0 -translate-y-full -translate-x-1/2 text-[10px] font-black uppercase tracking-widest mb-2 rotate-[-90deg] origin-bottom">Skill ↑</div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Users className="w-12 h-12 text-slate-900/10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Mentorship & Direct Reports (1:1s) */}
            <section className="space-y-8 pt-8">
                <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <Quote className="absolute top-[-20px] right-[-20px] w-64 h-64 text-white/10" />
                    <div className="relative z-10 max-w-3xl space-y-6">
                        <p className="text-xl md:text-2xl font-black italic leading-tight tracking-tighter">
                            "The most meaningful relationships are achieved when you and others can speak openly to each other about everything that's important, learn together, and understand the need to hold each other accountable to be as excellent as you can be."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12 bg-white/40" />
                            <p className="text-xs font-black uppercase tracking-widest text-white/60">- Ray Dalio</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Final Action Steps */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">7. Action Steps</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Your team meetings, no matter the length or format, are meant to keep your company on track. Craft every agenda carefully and spend your team's time wisely!
                        </p>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Parting Shots</h4>
                            <p className="text-xs text-slate-400 font-medium italic leading-relaxed">
                                Don't let meetings become a habit that replaces actual execution. If the meeting doesn't serve the goal, cancel it.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Final Module Actions:</p>
                        <div className="space-y-4">
                            {[
                                { key: "checkRequired", label: "Before scheduling a meeting, make sure that it's actually required and that your time will be spent productively." },
                                { key: "useChecklist", label: "Use the Effective Meeting checklist to help run your next meetings." },
                                { key: "implementFramework", label: "Implement the Strategic Meeting Framework to ensure you have clearly defined Objectives and Key Results." }
                            ].map((step) => (
                                <div
                                    key={step.key}
                                    onClick={() => toggleActionStep(step.key as keyof typeof data.actionSteps)}
                                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${data.actionSteps[step.key as keyof typeof data.actionSteps] ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                >
                                    <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${data.actionSteps[step.key as keyof typeof data.actionSteps] ? 'bg-slate-400 border-slate-400' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                        {data.actionSteps[step.key as keyof typeof data.actionSteps] && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-xs font-bold leading-relaxed ${data.actionSteps[step.key as keyof typeof data.actionSteps] ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Meeting Quality Audit (Boss Input) */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <TrendingUp className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">8. Meeting Quality Audit</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { key: "focusArea", label: "What is your primary focus area for improving meeting efficiency?", placeholder: "e.g. implementing no-PP policy, better agendas..." },
                        { key: "improvement", label: "What specific change will you implement in the next 7 days?", placeholder: "Detailed commitment..." }
                    ].map((item) => (
                        <div key={item.key} className="space-y-2">
                            <Label className="text-xs font-black uppercase text-slate-500">{item.label}</Label>
                            <Textarea
                                value={data.audit[item.key as keyof typeof data.audit]}
                                onChange={(e) => {
                                    onUpdate({
                                        ...data,
                                        audit: {
                                            ...data.audit,
                                            [item.key]: e.target.value
                                        }
                                    });
                                }}
                                className="bg-white border-slate-200 text-sm min-h-[100px]"
                                placeholder={item.placeholder}
                            />
                        </div>
                    ))}
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
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Meeting Alignment</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Meeting Strategy Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={onApprove}
                            className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {isApproved ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Meeting Protocol"
                            )}
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default MeetingsModule;
