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
    CheckCircle,
    ChevronUp,
    ChevronDown,
    Clock,
    Calendar,
    BarChart3,
    Smile,
    Frown,
    UserPlus,
    Map,
    GraduationCap,
    HeartPulse,
    AlertCircle,
    Gavel,
    ScrollText,
    PenTool
} from "lucide-react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/lib/storage";

const ManagingLikeABoss: React.FC = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("1. Culture");
    const [activeMeetingType, setActiveMeetingType] = useState("Annual");

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
        },
        checklist: {
            listBigFive: false,
            delegateThirtyDays: false,
            useDadd: false,
            useTriangle: false,
            selectMechanisms: false
        }
    });

    // State for Meetings Module
    const [meetingsPlan, setMeetingsPlan] = useState({
        checklist: {
            needMeeting: false,
            whoRunning: false,
            whoFacilitating: false,
            whoContributing: false,
            whoRecording: false,
            opinionVoice: false,
            captureTopics: false,
            decideActions: false,
            accountableActions: false
        },
        actionSteps: {
            checkRequired: false,
            useChecklist: false,
            implementFramework: false
        },
        audit: {
            focusArea: "",
            improvement: ""
        }
    });

    // State for Performance Module
    const [performancePlan, setPerformancePlan] = useState({
        orgChart: {
            today: "",
            nextLevel: ""
        },
        pillars: {
            marketing: "",
            sales: "",
            delivery: "",
            operations: "",
            finance: ""
        },
        coaching: {
            reflection: ""
        },
        goals: {
            results: "",
            process: "",
            commitment: ""
        },
        talent: {
            willingAbleNotes: "",
            temperamentNotes: ""
        },
        compensation: {
            notes: ""
        },
        toughConversations: {
            notes: "",
            outcomesNotes: "",
            improvementPlanNotes: ""
        },
        partingShots: {
            notes: ""
        },
        checklist: {
            rolesBeforePeople: false,
            defineResponsibilities: false,
            embraceCoaching: false,
            distinguishGoals: false,
            createOrgChart: false,
            printMatrix: false,
            scheduleReviews: false,
            establishPaths: false,
            evaluateComp: false
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
        const savedMeetings = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_MEETINGS, null);
        const savedPerformance = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_PERFORMANCE, null);
        const savedApprovals = loadFromStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, null);

        if (savedCulture) setCulturePlan(savedCulture);
        if (savedLeadership) setLeadershipPlan(savedLeadership);
        if (savedDelegation) setDelegationPlan(savedDelegation);
        if (savedMeetings) setMeetingsPlan(savedMeetings);
        if (savedPerformance) setPerformancePlan(savedPerformance);
        if (savedApprovals) setApprovals(savedApprovals);
    }, []);

    // Save state
    const saveAll = ({
        updatedCulture = culturePlan,
        updatedLeadership = leadershipPlan,
        updatedDelegation = delegationPlan,
        updatedMeetings = meetingsPlan,
        updatedPerformance = performancePlan,
        updatedApprovals = approvals
    }: {
        updatedCulture?: typeof culturePlan,
        updatedLeadership?: typeof leadershipPlan,
        updatedDelegation?: typeof delegationPlan,
        updatedMeetings?: typeof meetingsPlan,
        updatedPerformance?: typeof performancePlan,
        updatedApprovals?: typeof approvals
    } = {}) => {
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, updatedCulture);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, updatedLeadership);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_DELEGATION, updatedDelegation);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_MEETINGS, updatedMeetings);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_PERFORMANCE, updatedPerformance);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, updatedApprovals);
    };

    const handleValueChange = (index: number, val: string) => {
        const newValues = [...culturePlan.values];
        newValues[index] = val;
        const updated = { ...culturePlan, values: newValues };
        setCulturePlan(updated);
        saveAll({ updatedCulture: updated });
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
        saveAll({ updatedCulture: updated });
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
        saveAll({ updatedLeadership: updated });
    };

    const toggleDelegationChecklist = (key: keyof typeof delegationPlan.checklist) => {
        const updated = {
            ...delegationPlan,
            checklist: {
                ...delegationPlan.checklist,
                [key]: !delegationPlan.checklist[key]
            }
        };
        setDelegationPlan(updated);
        saveAll({ updatedDelegation: updated });
    };

    const toggleMeetingChecklist = (key: keyof typeof meetingsPlan.checklist) => {
        const updated = {
            ...meetingsPlan,
            checklist: {
                ...meetingsPlan.checklist,
                [key]: !meetingsPlan.checklist[key]
            }
        };
        setMeetingsPlan(updated);
        saveAll({ updatedMeetings: updated });
    };

    const toggleMeetingActionStep = (key: keyof typeof meetingsPlan.actionSteps) => {
        const updated = {
            ...meetingsPlan,
            actionSteps: {
                ...meetingsPlan.actionSteps,
                [key]: !meetingsPlan.actionSteps[key]
            }
        };
        setMeetingsPlan(updated);
        saveAll({ updatedMeetings: updated });
    };

    const handleApproval = (module: keyof typeof approvals) => {
        const updated = { ...approvals, [module]: !approvals[module] };
        setApprovals(updated);
        saveAll({ updatedApprovals: updated });
        toast({
            title: updated[module] ? "Module Approved" : "Approval Reset",
            description: updated[module] ? "The boss has authorized this module's strategy." : "Approval signature removed.",
        });
    };

    const togglePerformanceChecklist = (key: keyof typeof performancePlan.checklist) => {
        const updated = {
            ...performancePlan,
            checklist: {
                ...performancePlan.checklist,
                [key]: !performancePlan.checklist[key]
            }
        };
        setPerformancePlan(updated);
        saveAll({ updatedPerformance: updated });
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
                                        saveAll({ updatedCulture: updated });
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
                                        saveAll({ updatedCulture: updated });
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
                                    saveAll({ updatedCulture: updated });
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
                                        saveAll({ updatedLeadership: updated });
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
                                            saveAll({ updatedLeadership: updated });
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
                                            saveAll({ updatedLeadership: updated });
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
                                            saveAll({ updatedLeadership: updated });
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
                                                saveAll({ updatedDelegation: updated });
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
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 italic">"The heavy lifting is getting the ball close to the cup. The easy part is tapping it in."</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">Ask your team to follow these steps before approaching you for feedback:</p>
                                    <div className="space-y-3">
                                        {[
                                            "Frame the problem into a clear, specific question.",
                                            "Provide 2-3 options on what they think should be done.",
                                            "Propose the specific way they would do it.",
                                            "Ask if you agree or disagree with their proposal."
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-[11px] font-bold text-slate-200 leading-tight">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Who", "What", "When"].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10 text-center group hover:bg-blue-500/20 transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Progress & Mechanisms */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Target className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">3. Tracking Progress & Course Correction</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-4 text-center">
                            <p className="text-2xl font-black uppercase tracking-tighter italic">"Begin with the end in mind"</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">— STEPHEN COVEY</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                In delegation, the "end" is knowing that the outcome will be achieved. Establish a mechanism for tracking progress:
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {["Weekly Catch-ups", "Detailed Reports", "Status Meetings", "Project Boards"].map((m, i) => (
                                    <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg text-center font-black uppercase text-[10px] text-slate-800 shadow-sm">{m}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full border-8 border-slate-900 flex items-center justify-center relative">
                            <div className="absolute inset-0 border-t-8 border-blue-500 rounded-full animate-spin-slow opacity-20" />
                            <Target className="w-12 h-12 text-slate-900" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                            "A plane flying anywhere corrects its course as necessary to make sure it arrives on time. As the pilot, you are in charge of navigating and course-correcting when needed."
                        </p>
                    </div>
                </div>
            </section>

            {/* Delegation Audit */}
            <section className="space-y-8 pt-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Quote className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">4. Delegation Audit</h3>
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
                                    saveAll({ updatedDelegation: updated });
                                }}
                                className="bg-white border-slate-200 text-sm min-h-[80px]"
                                placeholder={idx.placeholder}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Action Steps */}
            <section className="space-y-8 pt-12">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Final Action Steps</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="relative p-12 bg-white border border-slate-200 rounded-2xl shadow-xl text-center group">
                            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full border-4 border-white tracking-widest">Parting Shots</div>
                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                "Clarity on who, what, and when increases the chances of achieving the desired outcome. Set the conditions for success from the very start. Strive to become an effective delegator!"
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { key: "listBigFive", label: "List your Big 5 non-negotiable activities." },
                            { key: "delegateThirtyDays", label: "Identify 2-3 things to delegate in the next 30 days." },
                            { key: "useDadd", label: "Use the DADD framework to categorize your tasks." },
                            { key: "useTriangle", label: "Apply the Delegation Triangle roadmap (Who, What, When)." },
                            { key: "selectMechanisms", label: "Select the reporting mechanisms for your team." }
                        ].map((step) => (
                            <div
                                key={step.key}
                                onClick={() => toggleDelegationChecklist(step.key as keyof typeof delegationPlan.checklist)}
                                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${delegationPlan.checklist[step.key as keyof typeof delegationPlan.checklist] ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-slate-900'}`}
                            >
                                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${delegationPlan.checklist[step.key as keyof typeof delegationPlan.checklist] ? 'bg-green-600 border-green-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                    {delegationPlan.checklist[step.key as keyof typeof delegationPlan.checklist] && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className={`text-xs font-bold leading-tight ${delegationPlan.checklist[step.key as keyof typeof delegationPlan.checklist] ? 'text-green-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
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

    const MEETING_PROTOCOLS = [
        {
            id: "Annual",
            title: "Annual OKRs",
            subtitle: "Annual Planning - Top 3-5 objectives",
            intro: "Define the highest level things that will push your company to the next level",
            icon: Target,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            meta: [
                { label: "Who", value: "Executive Team / Core Team", icon: Users },
                { label: "Duration", value: "120 minutes", icon: Clock },
                { label: "When", value: "Every 12 months (Year-end)", icon: Calendar }
            ],
            agenda: [
                "Reinvigorate and realign on your culture - Vision, Purpose and Values",
                "Prior Year in review: What worked? What needs improvement? Measure Key Results. What OKRs were not achieved?",
                "Define the highest level 3-5 objectives and key results (OKRs) for the current year. Assign a single owner to each.",
                "Remember the OKR formula: \"I will [objective] as measured by this [key result]\"",
                "Discuss what would prevent you from achieving those OKRs: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
            ]
        },
        {
            id: "Quarterly",
            title: "Quarterly OKRs",
            subtitle: "Quarterly Planning - Supporting Annual OKRs",
            intro: "Explore initiatives that'll help us achieve our key result and objective",
            icon: LayoutGrid,
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100",
            meta: [
                { label: "Who", value: "Executive Team / Core Team", icon: Users },
                { label: "Duration", value: "60-90 minutes", icon: Clock },
                { label: "When", value: "Every 3 months (Quarter-end)", icon: Calendar }
            ],
            agenda: [
                "Reinvigorate and realign on your culture - Vision, Purpose and Values",
                "Reconfirm Annual OKRs. Adjust if strategically necessary.",
                "Prior Quarter in review: What worked? What needs improvement? Measure Key Results. What initiatives were not achieved?",
                "Brainstorm initiatives for the next quarter that help advance Annual OKRs. Narrow down and prioritize. Assign a owner to each.",
                "Discuss what would prevent you from achieving those initiatives: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
            ]
        },
        {
            id: "Monthly",
            title: "Monthly OKRs",
            subtitle: "Monthly Execution - Supporting Quarterly OKRs",
            intro: "Explore initiatives that'll help us achieve our key result and objective",
            icon: BarChart3,
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-100",
            meta: [
                { label: "Who", value: "Department Teams / Core Team", icon: Users },
                { label: "Duration", value: "60 minutes", icon: Clock },
                { label: "When", value: "Every month (Month-end)", icon: Calendar }
            ],
            agenda: [
                "Reinvigorate and realign on your culture - Vision, Purpose and Values",
                "Reconfirm Annual OKRs and confidence in achieving Quarterly Initiatives.",
                "Prior Month in review: What worked? What needs improvement? Measure Key Results. What actions were not completed?",
                "Brainstorm actions for the next month to advance quarterly initiatives. Narrow down and prioritize. Assign a owner to each.",
                "Breakdown actions into tasks that can be completed in a weekly timeframe. Assign a owner to each task.",
                "Discuss what would prevent you from achieving those actions: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
            ]
        },
        {
            id: "Weekly",
            title: "Weekly Sprint",
            subtitle: "Weekly Sync - Confidence & Roadblocks",
            intro: "Breaking down our objectives into smaller, bite-sized pieces",
            icon: Zap,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-100",
            meta: [
                { label: "Who", value: "Department Teams / Core Team", icon: Users },
                { label: "Duration", value: "60 minutes", icon: Clock },
                { label: "When", value: "Every week (Week-start)", icon: Calendar }
            ],
            agenda: [
                "Reinvigorate and realign on your culture - Vision, Purpose and Values",
                "Reconfirm Annual OKRs and confidence in achieving Monthly Actions.",
                "Prior Week in review: What worked? What needs improvement? Measure Key Results. What tasks were not completed?",
                "Commit to tasks to be completed during the next weekly sprint. Ensure a single owner is assigned to each task.",
                "Discuss what would prevent you from completing those tasks: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
            ]
        },
        {
            id: "Dept",
            title: "Department Specific",
            subtitle: "Functional Execution - Deep Dives",
            intro: "Optional execution meeting for specialized departments",
            icon: Globe,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100",
            meta: [
                { label: "Who", value: "Department Teams", icon: Users },
                { label: "Duration", value: "30-60 minutes", icon: Clock },
                { label: "When", value: "Every week (Week-start/mid)", icon: Calendar }
            ],
            agenda: [
                "Reinvigorate and realign on your culture - Vision, Purpose and Values",
                "Reconfirm OKRs that are departmental responsibility.",
                "Deep dive into Marketing, Sales, Delivery, Operations and Finance specifics.",
                "Prior Week in review: What worked? What needs improvement? Measure Key Results. What actions were not completed?",
                "Collaborate and deep dive into any specific tasks or issues that need focused attention.",
                "Commit to tasks to be completed by the next weekly sprint. Ensure a owner is assigned to each task.",
                "Discuss what would prevent you from completing those tasks: Insufficient bandwidth, Unrealistic, Competing priorities, Inadequate resources"
            ]
        },
        {
            id: "1:1s",
            title: "1:1 Meetings",
            subtitle: "Mentorship & Alignment",
            intro: "Open conversations with direct reports to build and sustain healthy relationships, exchange constructive feedback, ensure roles and responsibilities are clear and keep employees engaged.",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-50/50",
            border: "border-blue-100",
            meta: [
                { label: "Who", value: "Manager & Direct Report", icon: Users },
                { label: "Duration", value: "30-60 minutes", icon: Clock },
                { label: "When", value: "Bi-weekly (Rec) / Monthly (Min)", icon: Calendar }
            ],
            agenda: [
                "Build strong individual relationships",
                "Create an opportunity for two-way positive feedback",
                "Review and/or ask questions related to roles and responsibilities",
                "Stay on the same page with career aspirations and goals",
                "Review KPIs and Critical Drivers related to the specific department",
                "Share 6-inch putt feedback, especially for non-urgent but important things",
                "Analyze and access where someone is in the Willing and Able matrix"
            ]
        },
        {
            id: "Standup",
            title: "Standup Meetings",
            subtitle: "Daily Realignment",
            intro: "Daily touch point to realign on vision. Works (or doesn't) depending on team culture. Focus on strategy, not problem solving.",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50/50",
            border: "border-amber-100",
            meta: [
                { label: "Who", value: "Department Teams / Core Team", icon: Users },
                { label: "Duration", value: "15 minutes or less", icon: Clock },
                { label: "When", value: "Daily (Week-start)", icon: Calendar }
            ],
            agenda: [
                "15 minutes or less (strictly enforced)",
                "Focus on vision and strategy, not problem solving or detailed status reporting",
                "Review only the highest level reporting",
                "This isn't an avenue for everyone to speak; it's an alignment conversation"
            ]
        }
    ];

    const renderMeetings = () => (
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
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-400">Meeting Mission</CardTitle>
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
                                        onClick={() => toggleMeetingChecklist(step.key as keyof typeof meetingsPlan.checklist)}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${meetingsPlan.checklist[step.key as keyof typeof meetingsPlan.checklist] ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${meetingsPlan.checklist[step.key as keyof typeof meetingsPlan.checklist] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                            {meetingsPlan.checklist[step.key as keyof typeof meetingsPlan.checklist] && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold leading-tight ${meetingsPlan.checklist[step.key as keyof typeof meetingsPlan.checklist] ? 'text-blue-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
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
                                    <Badge className="bg-blue-500 text-white font-black uppercase text-[10px]">No PowerPoint</Badge>
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
                        <div className="flex gap-4 p-8 bg-blue-600 rounded-3xl text-white shadow-2xl relative overflow-hidden">
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
                                        <div className="text-[10px] font-medium text-blue-100">{step.desc}</div>
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
                                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
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
                                { quadrant: "High Skill / High Will", label: "Delegate", color: "bg-green-500", text: "The Rockstar - Empower and give ownership." },
                                { quadrant: "Low Skill / High Will", label: "Guide", color: "bg-blue-500", text: "The Student - Train and mentor closely." },
                                { quadrant: "High Skill / Low Will", label: "Excite", color: "bg-orange-500", text: "The Grump - Re-engage and find the 'Why'." },
                                { quadrant: "Low Skill / Low Will", label: "Direct", color: "bg-red-500", text: "The Liability - Close supervision or transition out." }
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
                            <div className="border-r border-b border-slate-200 flex items-center justify-center bg-blue-50 text-blue-600 p-2 text-center">Guide<br />(Train)</div>
                            <div className="border-b border-slate-200 flex items-center justify-center bg-green-50 text-green-600 p-2 text-center">Delegate<br />(Empower)</div>
                            <div className="border-r border-slate-200 flex items-center justify-center bg-red-50 text-red-600 p-2 text-center">Direct<br />(Supervise)</div>
                            <div className="flex items-center justify-center bg-orange-50 text-orange-600 p-2 text-center">Excite<br />(Re-engage)</div>
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
                <div className="bg-blue-600 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
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
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <CheckCircle2 className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">7. Action Steps</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Your team meetings, no matter the length or format, are meant to keep your company on track. Craft every agenda carefully and spend your team's time wisely!
                        </p>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Parting Shots</h4>
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
                                    onClick={() => toggleMeetingActionStep(step.key as keyof typeof meetingsPlan.actionSteps)}
                                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${meetingsPlan.actionSteps[step.key as keyof typeof meetingsPlan.actionSteps] ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                >
                                    <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${meetingsPlan.actionSteps[step.key as keyof typeof meetingsPlan.actionSteps] ? 'bg-green-600 border-green-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                        {meetingsPlan.actionSteps[step.key as keyof typeof meetingsPlan.actionSteps] && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-xs font-bold leading-relaxed ${meetingsPlan.actionSteps[step.key as keyof typeof meetingsPlan.actionSteps] ? 'text-green-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
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
                    <Scale className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">8. Meeting Quality Audit</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { key: "focusArea", label: "What is your primary focus area for improving meeting efficiency?", placeholder: "e.g. implementing no-PP policy, better agendas..." },
                        { key: "improvement", label: "What specific change will you implement in the next 7 days?", placeholder: "Detailed commitment..." }
                    ].map((idx) => (
                        <div key={idx.key} className="space-y-2">
                            <Label className="text-xs font-black uppercase text-slate-500">{idx.label}</Label>
                            <Textarea
                                value={meetingsPlan.audit[idx.key as keyof typeof meetingsPlan.audit]}
                                onChange={(e) => {
                                    const updated = {
                                        ...meetingsPlan,
                                        audit: {
                                            ...meetingsPlan.audit,
                                            [idx.key]: e.target.value
                                        }
                                    };
                                    setMeetingsPlan(updated);
                                    saveAll({ updatedMeetings: updated });
                                }}
                                className="bg-white border-slate-200 text-sm min-h-[100px]"
                                placeholder={idx.placeholder}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Boss Input Approval */}
            <Card className={`border-2 transition-all duration-500 ${approvals.meetings ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${approvals.meetings ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Meeting Alignment</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Meeting Strategy Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleApproval('meetings')}
                            className={`${approvals.meetings ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {approvals.meetings ? (
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

    const renderPerformance = () => (
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
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <LayoutGrid className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">1. Create an Org Chart</h3>
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
                                        value={performancePlan.orgChart.today}
                                        onChange={(e) => {
                                            const updated = { ...performancePlan, orgChart: { ...performancePlan.orgChart, today: e.target.value } };
                                            setPerformancePlan(updated);
                                            saveAll({ updatedPerformance: updated });
                                        }}
                                        className="min-h-[100px] border-slate-200 resize-none text-sm font-medium"
                                        placeholder="Describe your current structure and roles..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Next Level Organization</Label>
                                    <Textarea
                                        value={performancePlan.orgChart.nextLevel}
                                        onChange={(e) => {
                                            const updated = { ...performancePlan, orgChart: { ...performancePlan.orgChart, nextLevel: e.target.value } };
                                            setPerformancePlan(updated);
                                            saveAll({ updatedPerformance: updated });
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
                                    value={performancePlan.pillars[pillar.id as keyof typeof performancePlan.pillars]}
                                    onChange={(e) => {
                                        const updated = {
                                            ...performancePlan,
                                            pillars: { ...performancePlan.pillars, [pillar.id]: e.target.value }
                                        };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
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
                                value={performancePlan.coaching.reflection}
                                onChange={(e) => {
                                    const updated = { ...performancePlan, coaching: { reflection: e.target.value } };
                                    setPerformancePlan(updated);
                                    saveAll({ updatedPerformance: updated });
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
                                        onClick={() => togglePerformanceChecklist(step.key as keyof typeof performancePlan.checklist)}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                            {performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className={`text-[10px] font-bold leading-tight ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'text-blue-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
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
                                    value={performancePlan.goals.results}
                                    onChange={(e) => {
                                        const updated = { ...performancePlan, goals: { ...performancePlan.goals, results: e.target.value } };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
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
                                    value={performancePlan.goals.process}
                                    onChange={(e) => {
                                        const updated = { ...performancePlan, goals: { ...performancePlan.goals, process: e.target.value } };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
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
                            value={performancePlan.goals.commitment}
                            onChange={(e) => {
                                const updated = { ...performancePlan, goals: { ...performancePlan.goals, commitment: e.target.value } };
                                setPerformancePlan(updated);
                                saveAll({ updatedPerformance: updated });
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
                                value={performancePlan.talent.willingAbleNotes}
                                onChange={(e) => {
                                    const updated = { ...performancePlan, talent: { ...performancePlan.talent, willingAbleNotes: e.target.value } };
                                    setPerformancePlan(updated);
                                    saveAll({ updatedPerformance: updated });
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
                                value={performancePlan.talent.temperamentNotes}
                                onChange={(e) => {
                                    const updated = { ...performancePlan, talent: { ...performancePlan.talent, temperamentNotes: e.target.value } };
                                    setPerformancePlan(updated);
                                    saveAll({ updatedPerformance: updated });
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
                                <h5 className="font-black uppercase italic tracking-tighter text-xl">Today's Organization</h5>
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
                                    value={performancePlan.compensation.notes}
                                    onChange={(e) => {
                                        const updated = { ...performancePlan, compensation: { notes: e.target.value } };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
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
                                    value={performancePlan.toughConversations.notes}
                                    onChange={(e) => {
                                        const updated = { ...performancePlan, toughConversations: { ...performancePlan.toughConversations, notes: e.target.value } };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
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
                                value={performancePlan.toughConversations.outcomesNotes}
                                onChange={(e) => {
                                    const updated = { ...performancePlan, toughConversations: { ...performancePlan.toughConversations, outcomesNotes: e.target.value } };
                                    setPerformancePlan(updated);
                                    saveAll({ updatedPerformance: updated });
                                }}
                                className="min-h-[80px] bg-slate-800 border-slate-700 text-slate-200 text-xs font-medium resize-none"
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
                                value={performancePlan.toughConversations.improvementPlanNotes}
                                onChange={(e) => {
                                    const updated = { ...performancePlan, toughConversations: { ...performancePlan.toughConversations, improvementPlanNotes: e.target.value } };
                                    setPerformancePlan(updated);
                                    saveAll({ updatedPerformance: updated });
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
                                    value={performancePlan.partingShots.notes}
                                    onChange={(e) => {
                                        const updated = { ...performancePlan, partingShots: { notes: e.target.value } };
                                        setPerformancePlan(updated);
                                        saveAll({ updatedPerformance: updated });
                                    }}
                                    className="min-h-[150px] border-slate-200 text-sm font-medium resize-none"
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
                            <h4 className="text-2xl md:text-3xl font-black uppercase italic italic tracking-tighter text-slate-900 leading-none">Final Commitment</h4>
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
                                    onClick={() => togglePerformanceChecklist(step.key as keyof typeof performancePlan.checklist)}
                                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer group ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'bg-green-50 border-green-500 shadow-sm' : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'bg-green-600 border-green-600 scale-110' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                        {performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-tight italic ${performancePlan.checklist[step.key as keyof typeof performancePlan.checklist] ? 'text-green-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
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
            <Card className={`border-2 transition-all duration-500 ${approvals.performance ? 'border-green-500 bg-green-50/50' : 'border-slate-900 bg-slate-50/50'} shadow-xl mt-12`}>
                <CardHeader className="py-6 border-b border-slate-200/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${approvals.performance ? 'bg-green-500' : 'bg-slate-900'}`}>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Performance Clarity</CardTitle>
                                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Org & Performance Authorization</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleApproval('performance')}
                            className={`${approvals.performance ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                        >
                            {approvals.performance ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                            ) : (
                                "Confirm Performance Strategy"
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${approvals.performance ? 'text-green-600' : 'text-slate-400'}`} />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            {approvals.performance
                                ? "Performance pillars and organizational accountability have been activated. Results goals are now clear."
                                : "Are your roles clearly defined and your goals architectures set for success? Sign off to finalize your performance framework."
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
                            const isEnabled = t.value === "1. Culture" || t.value === "2. Leadership" || t.value === "3. Delegation" || t.value === "4. Meetings" || t.value === "5. Performance";
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

                    <TabsContent value="4. Meetings" className="focus-visible:ring-0 outline-none">
                        {renderMeetings()}
                    </TabsContent>

                    <TabsContent value="5. Performance" className="focus-visible:ring-0 outline-none">
                        {renderPerformance()}
                    </TabsContent>
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
                            if (activeTab === "4. Meetings") setActiveTab("3. Delegation");
                            if (activeTab === "5. Performance") setActiveTab("4. Meetings");
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
                        disabled={activeTab === "5. Performance"}
                        onClick={() => {
                            if (activeTab === "1. Culture") setActiveTab("2. Leadership");
                            else if (activeTab === "2. Leadership") setActiveTab("3. Delegation");
                            else if (activeTab === "3. Delegation") setActiveTab("4. Meetings");
                            else if (activeTab === "4. Meetings") setActiveTab("5. Performance");
                        }}
                    >
                        Next Module
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            {/* module 5 spacer */}
            {activeTab === "5. Performance" && <div className="h-20" />}
        </div>
    );
};

export default ManagingLikeABoss;
