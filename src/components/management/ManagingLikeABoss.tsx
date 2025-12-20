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
    Shield,
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
        strategyExecutionValue: 50,
        checklist: {
            valuePeople: false,
            talentDevelopment: false,
            createConnections: false,
            createOwnership: false,
            takeResponsibility: false,
            directCommunication: false,
            empowerTeam: false,
            // Action Steps
            takeQuestionnaire: false,
            pickAttribute: false,
            plotGrid: false,
            plotSpectrum: false,
            seekFeedback: false
        }
    });

    // State for Delegation Module
    const [delegationPlan, setDelegationPlan] = useState({
        bigFive: ["", "", "", "", ""],
        daddTasks: [
            { task: "", category: "" as "" | "Delete" | "Automate" | "Delegate" | "Do" }
        ],
        audit: {
            bangForBuck: "",
            timeFreeUp: "",
            costEffectiveness: "",
            eightyPercentChance: ""
        }
    });

    const [approvals, setApprovals] = useState({
        culture: false,
        leadership: false,
        delegation: false,
        review: false,
        meetings: false,
        performance: false
    });

    // Load state
    useEffect(() => {
        const savedCulture = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, null);
        const savedLeadership = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, null);
        const savedDelegation = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_DELEGATION, null);
        const savedApprovals = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, null);

        if (savedCulture) setCulturePlan(savedCulture);
        if (savedLeadership) setLeadershipPlan(savedLeadership);
        if (savedDelegation) setDelegationPlan(savedDelegation);
        if (savedApprovals) setApprovals(savedApprovals);
    }, []);

    // Save state
    const saveAll = (
        updatedCulture = culturePlan,
        updatedLeadership = leadershipPlan,
        updatedDelegation = delegationPlan,
        updatedApprovals = approvals
    ) => {
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, updatedCulture);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, updatedLeadership);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_DELEGATION, updatedDelegation);
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
        saveAll(culturePlan, leadershipPlan, delegationPlan, updated);
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
                            <div className="bg-blue-600 h-1 w-full" />
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-sm font-black uppercase tracking-tight text-slate-200">Case Study: Navy S.E.A.L. "Hell Week"</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 space-y-4">
                                <div className="text-[11px] text-slate-400 leading-relaxed font-medium space-y-3">
                                    <p>Recruits were divided into teams for a grueling boat race. <span className="text-white font-bold italic">Team Alpha</span> kept winning, while <span className="text-white font-bold italic">Team Delta</span> was consistently last.</p>
                                    <p>The leader of Team Delta blamed his men. The instructors swapped the leaders. <span className="text-blue-400 font-bold block mt-2 text-xs uppercase tracking-widest italic animate-pulse">The result?</span></p>
                                    <p className="border-l-2 border-blue-500 pl-3 italic">"Team Delta, with the new leader, won the very next round. Strong leadership turned a losing team into a winning one."</p>
                                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 mt-4">
                                        <p className="text-blue-300 font-black text-[10px] uppercase tracking-tighter">"Teams win or lose based on leadership. In business it's no different."</p>
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

            {/* Strategy vs Execution */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Target className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">4. Strategy vs. Execution</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Most leaders tend to be stronger at either <span className="text-blue-600 font-bold">Strategy</span> (the what and why) or <span className="text-slate-900 font-bold">Execution</span> (the how and when).
                            Only 8% of leaders are effective at both.
                        </p>

                        <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-xl space-y-8">
                            <div className="flex justify-between items-end mb-2">
                                <div className="text-center">
                                    <span className="block text-sm font-black uppercase tracking-tighter text-blue-600">Strategy</span>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Answering the what and why</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-sm font-black uppercase tracking-tighter text-slate-900">Execution</span>
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Answering the how and when</span>
                                </div>
                            </div>

                            <div className="relative h-12 flex items-center group">
                                <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-blue-600" />
                                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-slate-900" />
                                <div className="w-full h-8 bg-gradient-to-r from-blue-600 to-slate-900 rounded-md shadow-inner relative">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={leadershipPlan.strategyExecutionValue}
                                        onChange={(e) => {
                                            const updated = { ...leadershipPlan, strategyExecutionValue: parseInt(e.target.value) };
                                            setLeadershipPlan(updated);
                                            saveAll(culturePlan, updated, approvals);
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-10 bg-white border-2 border-slate-900 rounded shadow-lg flex items-center justify-center pointer-events-none transition-all duration-75"
                                        style={{ left: `calc(${leadershipPlan.strategyExecutionValue}% - 12px)` }}
                                    >
                                        <div className="w-0.5 h-4 bg-slate-900" />
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-500 italic font-medium text-center pt-4">
                                "Developing your potential as a leader means moving across this spectrum. Zoom in to the details and zoom out to the big picture."
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-slate-900" /> Final Commitment & Action Steps
                            </h4>

                            <div className="space-y-4">
                                {[
                                    { key: "takeQuestionnaire", label: "How engaged a leader are you? Take the questionnaire." },
                                    { key: "pickAttribute", label: "Pick one attribute to focus on for the next 30 days." },
                                    { key: "plotGrid", label: "Plot yourself on the conflict vs presence grid." },
                                    { key: "plotSpectrum", label: "Where do you fall on the strategy vs execution spectrum?" },
                                    { key: "seekFeedback", label: "Seek feedback from your team, friends and family." }
                                ].map((step) => (
                                    <div
                                        key={step.key}
                                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${leadershipPlan.checklist[step.key as keyof typeof leadershipPlan.checklist] ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-slate-900'}`}
                                        onClick={() => toggleLeadershipChecklist(step.key as keyof typeof leadershipPlan.checklist)}
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${leadershipPlan.checklist[step.key as keyof typeof leadershipPlan.checklist] ? 'bg-green-600 border-green-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                            {leadershipPlan.checklist[step.key as keyof typeof leadershipPlan.checklist] && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className={`text-xs font-bold leading-tight ${leadershipPlan.checklist[step.key as keyof typeof leadershipPlan.checklist] ? 'text-green-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 italic">Parting Shots:</p>
                                <p className="text-sm text-slate-600 italic leading-relaxed">
                                    "Becoming a great leader is a process without a finish line. Practicing leadership needs to be part of who you are, day in and day out."
                                </p>
                            </div>
                        </div>
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

    const renderDelegation = () => (
        <div className="space-y-12 pb-20">
            {/* Header section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 3</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Delegate with Confidence
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "Knowing what should be delegated and what shouldn't is critical to your leadership ability."
                </p>
            </div>

            {/* DADD Framework */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <LayoutGrid className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. The DADD Framework</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Determine what's on your plate using this framework. Stop doing everything and start leading.
                        </p>
                        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-xl space-y-4">
                            {[
                                { question: "Does it need to be done? No?", action: "Delete it" },
                                { question: "Is it a recurring task? Yes?", action: "Automate it" },
                                { question: "Can someone else do it? Yes?", action: "Delegate it" },
                                { question: "Are you the best person for it? Yes?", action: "Do it" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="flex-1 text-xs font-bold text-slate-500">{item.question}</div>
                                    <div className="h-0.5 bg-slate-100 flex-1 relative group-hover:bg-slate-900 transition-colors">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-t border-slate-300 rotate-45 group-hover:border-slate-900" />
                                    </div>
                                    <div className="w-24 text-right">
                                        <Badge className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-2">{item.action}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="bg-slate-50 border-slate-200 shadow-none">
                        <CardHeader className="p-6">
                            <CardTitle className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-slate-400" /> Reality Check
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                                "Too many entrepreneurs struggle with perfectionism. They expect delegated tasks to get done in the exact same way as they would do them. Reality check: that's not going to happen!"
                            </p>
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Barriers to Delegation:</p>
                                <ul className="space-y-2">
                                    {["Fear of losing control", "Repeating past bad experiences", "Afraid of spending money", "Misunderstanding what delegation is"].map((b, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[10px] font-extrabold text-slate-600 uppercase">
                                            <div className="w-1 h-1 bg-slate-400 rounded-full" /> {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* The Big 5 */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <PieChart className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">2. Focus on Your Highest Level Activities (The Big 5)</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Your Big 5 are the five non-negotiable things that you know <span className="font-black underline italic uppercase">YOU</span> should be doing. These activities are the highest and best use of your time.
                        </p>
                        <div className="bg-blue-600 p-8 rounded-2xl text-white space-y-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10">
                                <PieChart className="w-48 h-48 -mr-12 -mt-12" />
                            </div>
                            <h4 className="text-5xl font-black italic tracking-tighter opacity-20">BIG 5</h4>
                            <div className="space-y-3 relative z-10">
                                {delegationPlan.bigFive.map((v, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <span className="text-xl font-black opacity-40">{i + 1}</span>
                                        <Input
                                            value={v}
                                            onChange={(e) => {
                                                const newBigFive = [...delegationPlan.bigFive];
                                                newBigFive[i] = e.target.value;
                                                const updated = { ...delegationPlan, bigFive: newBigFive };
                                                setDelegationPlan(updated);
                                                saveAll(culturePlan, leadershipPlan, updated, approvals);
                                            }}
                                            className="bg-blue-500/50 border-blue-400 text-white placeholder:text-blue-200 font-bold"
                                            placeholder={`Activity ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-blue-400">
                                <p className="text-xs font-black uppercase tracking-widest text-blue-200">Everything else is a "Below the line task"</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-900 border-slate-800 text-white overflow-hidden shadow-2xl">
                            <CardHeader className="bg-slate-800 border-b border-white/5">
                                <CardTitle className="text-sm font-black uppercase tracking-widest italic text-blue-400">The 6-Inch Putt Philosophy</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/50">
                                        <CheckCircle2 className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                                        "In golf, the heavy lifting is getting the ball close to the cup. The easy part is tapping it in once it's within 6 inches. Your job is to ensure delegated tasks reach the cup."
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    {[
                                        { title: "Who", desc: "Explicit accountability" },
                                        { title: "What", desc: "Detailed set of instructions" },
                                        { title: "When", desc: "Clear milestones & checkpoints" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                                            <span className="text-xs font-black uppercase tracking-widest text-blue-400">{item.title}</span>
                                            <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Delegation Audit */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Quote className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Delegation Audit</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { key: "bangForBuck", label: "Which tasks give you the biggest bang for your buck?", placeholder: "Identify high-value tasks..." },
                        { key: "timeFreeUp", label: "How much of your own time would you free up?", placeholder: "Calculate hours saved..." },
                        { key: "costEffectiveness", label: "How cost effectively can these be delegated?", placeholder: "Estimate delegation cost vs your rate..." },
                        { key: "eightyPercentChance", label: "Can someone else perform at 80% effectiveness?", placeholder: "Identify potential delegates..." }
                    ].map((idx) => (
                        <div key={idx.key} className="space-y-2">
                            <Label className="text-xs font-black uppercase text-slate-500">{idx.label}</Label>
                            <Textarea
                                value={delegationPlan.audit[idx.key as keyof typeof delegationPlan.audit]}
                                onChange={(e) => {
                                    const updated = {
                                        ...delegationPlan,
                                        audit: {
                                            ...delegationPlan.audit,
                                            [idx.key]: e.target.value
                                        }
                                    };
                                    setDelegationPlan(updated);
                                    saveAll(culturePlan, leadershipPlan, updated, approvals);
                                }}
                                className="bg-white border-slate-200 text-sm min-h-[80px]"
                                placeholder={idx.placeholder}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${approvals.delegation ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${approvals.delegation ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Delegation Audit</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Delegation Module Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleApproval('delegation')}
                            className={`${approvals.delegation ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {approvals.delegation ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Delegation Alignment"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${approvals.delegation ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {approvals.delegation
                                ? "This delegation strategy has been signed off. You're now focused on your high-level activities (The Big 5)."
                                : "Are you delegating with confidence, or are you stuck doing work that others should be handling? Sign off to finalize your delegation plan."
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
                            { value: "3. Delegation", icon: PieChart },
                            { value: "4. Meetings", icon: MessageSquare },
                            { value: "5. Performance", icon: Zap }
                        ].map((t) => {
                            const Icon = t.icon;
                            const isEnabled = t.value === "1. Culture" || t.value === "2. Leadership" || t.value === "3. Delegation";
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

                    <TabsContent value="3. Delegation" className="focus-visible:ring-0 outline-none">
                        {renderDelegation()}
                    </TabsContent>

                    {["4. Meetings", "5. Performance"].map(tab => (
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
                        onClick={() => {
                            if (activeTab === "2. Leadership") setActiveTab("1. Culture");
                            if (activeTab === "3. Delegation") setActiveTab("2. Leadership");
                        }}
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
                        disabled={activeTab === "3. Delegation" || activeTab === "5. Performance"}
                        onClick={() => {
                            if (activeTab === "1. Culture") setActiveTab("2. Leadership");
                            else if (activeTab === "2. Leadership") setActiveTab("3. Delegation");
                        }}
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
