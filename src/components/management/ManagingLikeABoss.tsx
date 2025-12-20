import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
    ShieldCheck,
    MessageSquare,
    Zap,
    CheckCircle2,
    LayoutGrid,
    PieChart,
    TrendingUp,
    Users,
    ArrowLeft,
    ArrowRight,
    CircleDashed,
    Target,
    Quote,
    Check,
    Globe,
    Building2,
    Scale,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/lib/storage";

const ManagingLikeABoss: React.FC = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("1. Culture");

    // State for Culture Module
    const [culturePlan, setCulturePlan] = useState({
        vision: "",
        purpose: "",
        values: ["", "", "", "", ""],
        standards: "",
        checklist: {
            defineVision: false,
            listValues: false,
            establishStandards: false,
            scheduleTeamReview: false,
            communicateRegularly: false
        }
    });

    // State for Leadership Module
    const [leadershipPlan, setLeadershipPlan] = useState({
        archetype: "",
        strengths: "",
        opportunities: "",
        checklist: {
            valuePeople: false,
            talentDevelopment: false,
            createConnections: false,
            createOwnership: false,
            takeResponsibility: false,
            directCommunication: false,
            empowerTeam: false
        }
    });

    const [approvals, setApprovals] = useState({
        culture: false,
        leadership: false,
        feedback: false,
        review: false,
        meetings: false,
        performance: false
    });

    // Load state
    useEffect(() => {
        const savedCulture = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, null);
        const savedLeadership = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, null);
        const savedApprovals = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, null);

        if (savedCulture) setCulturePlan(savedCulture);
        if (savedLeadership) setLeadershipPlan(savedLeadership);
        if (savedApprovals) setApprovals(savedApprovals);
    }, []);

    // Save state
    const saveAll = (
        updatedCulture = culturePlan,
        updatedLeadership = leadershipPlan,
        updatedApprovals = approvals
    ) => {
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, updatedCulture);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, updatedLeadership);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, updatedApprovals);
    };

    const handleValueChange = (index: number, val: string) => {
        const newValues = [...culturePlan.values];
        newValues[index] = val;
        const updated = { ...culturePlan, values: newValues };
        setCulturePlan(updated);
        saveAll(updated, leadershipPlan, approvals);
    };

    const toggleChecklist = (key: keyof typeof culturePlan.checklist) => {
        const updated = {
            ...culturePlan,
            checklist: {
                ...culturePlan.checklist,
                [key]: !culturePlan.checklist[key]
            }
        };
        setCulturePlan(updated);
        saveAll(updated, leadershipPlan, approvals);
    };

    const toggleLeadershipChecklist = (key: keyof typeof leadershipPlan.checklist) => {
        const updated = {
            ...leadershipPlan,
            checklist: {
                ...leadershipPlan.checklist,
                [key]: !leadershipPlan.checklist[key]
            }
        };
        setLeadershipPlan(updated);
        saveAll(culturePlan, updated, approvals);
    };

    const handleApproval = (module: keyof typeof approvals) => {
        const updated = { ...approvals, [module]: !approvals[module] };
        setApprovals(updated);
        saveAll(culturePlan, leadershipPlan, updated);
        toast({
            title: updated[module] ? "Module Approved" : "Approval Reset",
            description: updated[module] ? "The boss has authorized this module's strategy." : "Approval signature removed.",
        });
    };

    const renderCulture = () => (
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
                            color: "bg-[#0b6623]/5 border-[#0b6623]/20"
                        },
                        {
                            logo: "LadyBoss",
                            vision: "To help women lose weight and love themselves again.",
                            color: "bg-[#e91e63]/5 border-[#e91e63]/20"
                        },
                        {
                            logo: "James P Friel",
                            vision: "To help hustling entrepreneurs become effective CEOs.",
                            color: "bg-slate-100 border-slate-200"
                        }
                    ].map((v, idx) => (
                        <Card key={idx} className={`shadow-none border-t-4 ${v.color} transition-all hover:translate-y-[-2px]`}>
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
                                    value={culturePlan.vision}
                                    onChange={(e) => {
                                        const updated = { ...culturePlan, vision: e.target.value };
                                        setCulturePlan(updated);
                                        saveAll(updated);
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500">Core Purpose</Label>
                                <Textarea
                                    className="bg-white border-slate-200 text-sm min-h-[100px]"
                                    placeholder="Why do we exist? Who do we help?"
                                    value={culturePlan.purpose}
                                    onChange={(e) => {
                                        const updated = { ...culturePlan, purpose: e.target.value };
                                        setCulturePlan(updated);
                                        saveAll(updated);
                                    }}
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
                            {culturePlan.values.map((v, i) => (
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
                                value={culturePlan.standards}
                                onChange={(e) => {
                                    const updated = { ...culturePlan, standards: e.target.value };
                                    setCulturePlan(updated);
                                    saveAll(updated);
                                }}
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
                            onClick={() => toggleChecklist(step.key as keyof typeof culturePlan.checklist)}
                            className={`p-4 rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center gap-4 ${culturePlan.checklist[step.key as keyof typeof culturePlan.checklist] ? 'bg-slate-900 text-white' : 'bg-white hover:border-slate-400'}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${culturePlan.checklist[step.key as keyof typeof culturePlan.checklist] ? 'border-white bg-slate-700' : 'border-slate-200'}`}>
                                {culturePlan.checklist[step.key as keyof typeof culturePlan.checklist] && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-sm font-bold uppercase tracking-tight">{step.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Admin/Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${approvals.culture ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${approvals.culture ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Alignment Audit</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Culture Module Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleApproval('culture')}
                            className={`${approvals.culture ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {approvals.culture ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Module Alignment"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${approvals.culture ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {approvals.culture
                                ? "This strategy has been signed off by the organization owner. Teams can begin alignment on vision, values, and standards."
                                : "Are you playing roulette with your values, or have you clearly articulated who you are as an organization? Sign off here to finalize your culture strategy."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderLeadership = () => (
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
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">7 Attributes of an Engaged Leader:</h4>
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
                                        onClick={() => toggleLeadershipChecklist(attr.key as keyof typeof leadershipPlan.checklist)}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${leadershipPlan.checklist[attr.key as keyof typeof leadershipPlan.checklist] ? 'bg-blue-500 border-blue-500' : 'border-slate-700 bg-slate-800'}`}>
                                            {leadershipPlan.checklist[attr.key as keyof typeof leadershipPlan.checklist] && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-[11px] font-bold uppercase tracking-tight transition-colors ${leadershipPlan.checklist[attr.key as keyof typeof leadershipPlan.checklist] ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                            {attr.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card className="bg-slate-50 border-slate-200 shadow-none">
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
                </div>
            </section>

            {/* Management Pitfalls Grid */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <AlertTriangle className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Common Management Pitfalls</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Falling on either extreme is uncommon, but every leader has tendencies towards one archetype or another.
                            <span className="font-bold underline block mt-2">Where do you fall on the grid? Strive to be in the middle.</span>
                        </p>

                        <div className="grid grid-cols-2 gap-px bg-slate-200 border-2 border-slate-900 rounded-xl overflow-hidden shadow-2xl relative">
                            {/* Grid Labels */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-2 border-slate-900 rounded-full text-[10px] font-black uppercase z-20">More Presence</div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-3 py-1 border-2 border-slate-900 rounded-full text-[10px] font-black uppercase z-20">Less Presence</div>
                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-2 border-slate-900 rounded-full text-[10px] font-black uppercase z-20 rotate-[-90deg]">Less Conflict</div>
                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-2 border-slate-900 rounded-full text-[10px] font-black uppercase z-20 rotate-[90deg]">More Conflict</div>

                            {[
                                { id: 'people-pleaser', title: 'People Pleaser', desc: 'Needs to be well-liked. Aviods conflict at all costs.', color: 'hover:bg-blue-50' },
                                { id: 'hyper-critical', title: 'Hyper-Critical', desc: 'Needs to be right. Judgmental. Driven by anger.', color: 'hover:bg-red-50' },
                                { id: 'absentee', title: 'Absentee', desc: 'Apathy. Bothered when needed. Premature ownership.', color: 'hover:bg-slate-100' },
                                { id: 'helicopter', title: 'Helicopter', desc: 'Micro-manager. Fearing loss of control.', color: 'hover:bg-amber-50' }
                            ].map((q) => (
                                <div
                                    key={q.id}
                                    onClick={() => {
                                        const updated = { ...leadershipPlan, archetype: q.id };
                                        setLeadershipPlan(updated);
                                        saveAll(culturePlan, updated, approvals);
                                    }}
                                    className={`bg-white p-8 h-48 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all relative group ${q.color}`}
                                >
                                    {leadershipPlan.archetype === q.id && (
                                        <div className="absolute inset-0 bg-slate-900/5 border-4 border-slate-900 z-10 flex items-center justify-center">
                                            <div className="bg-slate-900 text-white p-1 rounded-full font-black text-[8px] uppercase">My Tendency</div>
                                        </div>
                                    )}
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-800">{q.title}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-[120px]">{q.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-50 border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-tight">Boss Input: Leadership Audit</CardTitle>
                                <CardDescription className="text-xs">Reflect on your tendencies and identifying areas for growth.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500">My Leadership Strengths</Label>
                                    <Textarea
                                        className="bg-white border-slate-200 text-sm min-h-[100px]"
                                        placeholder="What are the 7 attributes you excel at?"
                                        value={leadershipPlan.strengths}
                                        onChange={(e) => {
                                            const updated = { ...leadershipPlan, strengths: e.target.value };
                                            setLeadershipPlan(updated);
                                            saveAll(culturePlan, updated, approvals);
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500">Growth Opportunities</Label>
                                    <Textarea
                                        className="bg-white border-slate-200 text-sm min-h-[100px]"
                                        placeholder="Which pitfalls do you need to move toward the middle on?"
                                        value={leadershipPlan.opportunities}
                                        onChange={(e) => {
                                            const updated = { ...leadershipPlan, opportunities: e.target.value };
                                            setLeadershipPlan(updated);
                                            saveAll(culturePlan, updated, approvals);
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Admin/Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${approvals.leadership ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${approvals.leadership ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Leadership Audit</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Leadership Module Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleApproval('leadership')}
                            className={`${approvals.leadership ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {approvals.leadership ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Leadership Alignment"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${approvals.leadership ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {approvals.leadership
                                ? "This leadership strategy has been signed off. Strive to be an engaged leader by valuing people and empowering your team."
                                : "Are you an engaged leader, or are you stuck in one of the common management pitfalls? Sign off here to finalize your leadership commitment."
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/30 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-slate-900" />
                            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                                Managing Like a Boss
                            </h1>
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-11">
                            Team Management Systems & High-Performance Culture
                        </p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-white border border-slate-200 p-1 h-14 mb-8 hidden md:flex items-stretch gap-1">
                        {[
                            { value: "1. Culture", icon: Globe },
                            { value: "2. Leadership", icon: Users },
                            { value: "3. Review", icon: TrendingUp },
                            { value: "4. Meetings", icon: MessageSquare },
                            { value: "5. Performance", icon: Zap }
                        ].map((t) => {
                            const Icon = t.icon;
                            const isEnabled = t.value === "1. Culture" || t.value === "2. Leadership";
                            return (
                                <TabsTrigger
                                    key={t.value}
                                    value={t.value}
                                    className={`flex-1 font-black text-[10px] uppercase tracking-[0.2em] transition-all
                                        ${isEnabled ? 'data-[state=active]:bg-slate-900 data-[state=active]:text-white' : 'opacity-40'}
                                    `}
                                    disabled={!isEnabled}
                                >
                                    <Icon className="w-3.5 h-3.5 mr-2" />
                                    {t.value}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    <TabsContent value="1. Culture" className="focus-visible:ring-0 outline-none">
                        {renderCulture()}
                    </TabsContent>

                    <TabsContent value="2. Leadership" className="focus-visible:ring-0 outline-none">
                        {renderLeadership()}
                    </TabsContent>

                    {["3. Review", "4. Meetings", "5. Performance"].map(tab => (
                        <TabsContent key={tab} value={tab} className="mt-20 text-center space-y-4">
                            <CircleDashed className="w-12 h-12 text-slate-300 mx-auto animate-spin-slow" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Section Under Construction</h3>
                            <p className="text-xs text-slate-400 font-medium italic">Detailed management framework coming soon.</p>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Footer Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-200">
                    <Button
                        variant="ghost"
                        className="text-slate-400 font-black uppercase tracking-widest text-[10px]"
                        disabled={activeTab === "1. Culture"}
                        onClick={() => setActiveTab("1. Culture")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous Module
                    </Button>
                    <div className="flex gap-3">
                        {["1", "2", "3", "4", "5"].map((dot) => (
                            <div
                                key={dot}
                                className={`h-2 transition-all duration-300 rounded-full ${dot === activeTab.split('.')[0] ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        className="text-slate-900 font-black uppercase tracking-widest text-[10px]"
                        disabled={activeTab === "2. Leadership" || activeTab === "5. Performance"}
                        onClick={() => setActiveTab("2. Leadership")}
                    >
                        Next Module
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ManagingLikeABoss;
