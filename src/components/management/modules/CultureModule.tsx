import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Target, Globe, Building2, Scale, CheckCircle2, CheckCircle,
    ShieldCheck, AlertTriangle, Check
} from "lucide-react";
import { CulturePlan } from './types';

interface CultureModuleProps {
    data: CulturePlan;
    onUpdate: (updated: CulturePlan) => void;
    isApproved: boolean;
    onApprove: () => void;
}

const CultureModule: React.FC<CultureModuleProps> = ({ data, onUpdate, isApproved, onApprove }) => {
    const handleValueChange = (index: number, val: string) => {
        const newValues = [...data.values];
        newValues[index] = val;
        onUpdate({ ...data, values: newValues });
    };

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
            {/* Header section with restricted design */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 1</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Create a Winning Culture
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "No vision is worth the paper it's printed on unless it's communicated constantly and reinforced with rewards." — Jack Welch
                </p>
            </div>

            {/* Vision & Purpose Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Target className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. Vision & Purpose</h3>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    {[
                        {
                            logo: "JPMorganChase",
                            vision: "To be the best financial services company in the world.",
                            color: "bg-slate-50 border-slate-200"
                        },
                        {
                            logo: "LadyBoss",
                            vision: "To help women lose weight and love themselves again.",
                            color: "bg-slate-50 border-slate-200"
                        },
                        {
                            logo: "James P Friel",
                            vision: "To help hustling entrepreneurs become effective CEOs.",
                            color: "bg-slate-50 border-slate-200"
                        }
                    ].map((v, idx) => (
                        <Card key={idx} className={`shadow-none border-t-4 border-t-slate-900 ${v.color} transition-all hover:translate-y-[-2px]`}>
                            <CardContent className="p-6 text-center space-y-4">
                                <div className="text-sm font-black uppercase tracking-widest text-slate-400">{v.logo}</div>
                                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{v.vision}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-slate-50 border-slate-200 shadow-none">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-tight">Boss Input: Core Identity</CardTitle>
                        <CardDescription className="text-xs">Define the vision and purpose for being for your company.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500">Company Vision</Label>
                                <Textarea
                                    className="bg-white border-slate-200 text-sm min-h-[100px]"
                                    placeholder="What do we want to become? (e.g., To be the best...)"
                                    value={data.vision}
                                    onChange={(e) => onUpdate({ ...data, vision: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500">Core Purpose</Label>
                                <Textarea
                                    className="bg-white border-slate-200 text-sm min-h-[100px]"
                                    placeholder="Why do we exist? Who do we help?"
                                    value={data.purpose}
                                    onChange={(e) => onUpdate({ ...data, purpose: e.target.value })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Values Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Globe className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Core Values</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            What do you believe to be true? Values are purposeful and engage us emotionally.
                            It's easy to see what people value based on what they <span className="font-black italic underline">DO</span>, not based on what they say.
                        </p>

                        <Card className="bg-white border-slate-200 shadow-none overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3">
                                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-600">Case Study: Netflix Real Values</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                    {[
                                        "1. Judgement", "6. Selflessness",
                                        "2. Communication", "7. Innovation",
                                        "3. Curiosity", "8. Inclusion",
                                        "4. Courage", "9. Integrity",
                                        "5. Passion", "10. Impact"
                                    ].map((val, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                                            <CheckCircle className="w-3 h-3 text-slate-300" />
                                            {val}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-slate-50 border-slate-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-tight">Boss Input: Top 3-5 Values</CardTitle>
                            <CardDescription className="text-xs">Pick values that are authentic to you. Define your top 3-5.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.values.map((v, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <span className="text-xs font-black text-slate-400 w-4">{i + 1}.</span>
                                    <Input
                                        className="bg-white border-slate-200 text-sm h-9"
                                        placeholder={`Value ${i + 1}`}
                                        value={v}
                                        onChange={(e) => handleValueChange(i, e.target.value)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Standards Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Scale className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Standards of Measurement</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-bold italic border-l-4 border-slate-200 pl-4 py-2">
                            "What will you aspire to and/or tolerate? Standards engage us logically and measure how well we adhere to our values."
                        </p>

                        <div className="relative pt-10 pb-10 px-6 bg-white border border-slate-200 rounded-xl space-y-12">
                            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border-4 border-white">The Standard</div>

                            <div className="text-xl font-black text-slate-900 uppercase italic opacity-80">Acceptable</div>
                            <div className="h-0.5 bg-slate-200 w-full relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-100 border-2 border-slate-300 rounded-full" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full shadow-lg" />
                            </div>
                            <div className="text-xl font-black text-slate-400 uppercase italic">Unacceptable</div>
                        </div>
                    </div>

                    <Card className="bg-slate-50 border-slate-200 shadow-none self-stretch">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-tight">Boss Input: Measurement</CardTitle>
                            <CardDescription className="text-xs">How do you measure adherence to your values? (e.g. Turnaround time)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="bg-white border-slate-200 text-sm min-h-[150px]"
                                placeholder="Describe the standards that represent 'Acceptable' for your team..."
                                value={data.standards}
                                onChange={(e) => onUpdate({ ...data, standards: e.target.value })}
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Culture vs Performance */}
            <section className="grid lg:grid-cols-2 gap-12 pt-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                        <Building2 className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Culture vs. Performance</h3>
                    </div>
                    <div className="prose prose-slate prose-sm max-w-none">
                        <p className="text-sm text-slate-600 leading-relaxed font-bold">
                            "What if someone delivers results and performs their job well but not in alignment with your company culture?"
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Imagine a <span className="font-black italic">rockstar performer</span> who gossip and talk bad behind others' backs, going against values of transparency.
                            Culture alignment is <span className="font-black underline">more important</span> than performance when behavior is detrimental to the fabric of who you are.
                        </p>
                        <div className="bg-slate-900 text-white p-4 rounded-lg text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                            Acknowledge the issue, discuss it openly and try to resolve it. If improvement is not possible, let that person go!
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                        <Globe className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Remote Teams</h3>
                    </div>
                    <Card className="shadow-none border-slate-200 bg-slate-50">
                        <CardContent className="p-6 space-y-4">
                            <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                Can remote and distributed teams have a winning culture?
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed italic">
                                "Of course! Ping pong tables and happy hour drinks are not the only ways of showing your company culture. Reinforcing values and vision is more important than physical proximity."
                            </p>
                        </CardContent>
                    </Card>
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
                        { key: "defineVision", label: "Define the vision and purpose for being of your company." },
                        { key: "listValues", label: "List out the top 3-5 desired values that you believe support your vision." },
                        { key: "establishStandards", label: "Establish the standard that you're going to maintain and uphold for each of your values." },
                        { key: "scheduleTeamReview", label: "Schedule time with your team to review and discuss their input before finalizing." },
                        { key: "communicateRegularly", label: "Communicate your values regularly through team communication so that everyone is clear." }
                    ].map((step) => (
                        <div
                            key={step.key}
                            onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                            className={`p-4 rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center gap-4 ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-900 text-white' : 'bg-white hover:border-slate-400'}`}
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
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Alignment Audit</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Culture Module Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={onApprove}
                            className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {isApproved ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Module Alignment"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isApproved ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {isApproved
                                ? "This strategy has been signed off by the organization owner. Teams can begin alignment on vision, values, and standards."
                                : "Are you playing roulette with your values, or have you clearly articulated who you are as an organization? Sign off here to finalize your culture strategy."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CultureModule;
