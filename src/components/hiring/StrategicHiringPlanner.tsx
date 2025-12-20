import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
    Target,
    TrendingDown,
    Users,
    Zap,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    ListChecks,
    Plus,
    Trash2,
    CircleHelp,
    Magnet,
    Filter,
    Mic2,
    Briefcase,
    PlayCircle,
    TrendingUp,
    AlertCircle,
    MessageSquare,
    Search,
    Brain,
    XCircle,
    Eye,
    FileText,
    Activity,
    ShieldAlert,
    Gavel,
    LayoutGrid,
    TableProperties,
    Database,
    BrainCircuit,
    Shield
} from "lucide-react";
import {
    STORAGE_KEYS,
    loadFromStorage,
    saveToStorage,
    analyzeProductivity,
    evaluateHiringTriggers
} from '@/lib/hiringUtils';
import { HiringTrigger, TaskItem, OrgChartRole, JobDescription, DelegationItem } from '@/types/hiring';

const StrategicHiringPlanner: React.FC = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("strategy");

    // --- STATE ---

    // Step 1: Strategy (Big 5 & Below the Line)
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [hourlyRate, setHourlyRate] = useState<number>(100);

    // Step 2: Role Design
    const [orgChart, setOrgChart] = useState<OrgChartRole[]>([]);
    const [selectedRole, setSelectedRole] = useState<Partial<OrgChartRole>>({
        title: '',
        department: '',
        level: 1,
        isVacant: true,
        requiredSkills: [],
        responsibilities: [],
        priority: 'medium'
    });

    // Step 3: Job Description
    const [jd, setJd] = useState<Partial<JobDescription>>({
        title: '',
        type: 'full-time',
        salaryRange: { min: 0, max: 0 },
        responsibilities: [],
        requirements: [],
        workArrangement: 'remote'
    });

    // Step 4: Sourcing (Module 2)
    const [funnelPlan, setFunnelPlan] = useState({
        landingPageUrl: '',
        questionnaireEnabled: true,
        keystoneQuestion: 'How do you know when you\'re doing a good job?',
        filteringCriteria: '',
        shortlistTarget: 3
    });

    // Step 5: Screening (Module 3)
    const [screeningPlan, setScreeningPlan] = useState({
        spreadsheetExported: false,
        visionOfSuccessEstablished: false,
        keystoneFilteringDone: false,
        nonNegotiablesIdentified: false,
        cultureFitChecked: false,
        cvsReviewed: false,
        shortlistCompiled: false,
        interviewsInvited: false
    });

    // Step 5: Interviewing
    const [interviewPlan, setInterviewPlan] = useState({
        style: '1-on-1',
        trialTask: '',
        questionBank: [
            { q: 'What excites you about our company?', type: 'WHY' },
            { q: 'Tell me about a complex project you delivered on time.', type: 'HOW' }
        ]
    });

    // Step 6: Onboarding (Module 5)
    const [onboardingPlan, setOnboardingPlan] = useState({
        offerDetails: '',
        trainingLinks: '',
        checkpoint30Day: '',
        checkpoint60Day: '',
        checkpoint90Day: ''
    });

    // Boss Approvals
    const [approvals, setApprovals] = useState({
        strategy: false,
        role: false,
        sourcing: false,
        screening: false,
        interviewing: false,
        onboarding: false,
        firing: false,
        bonus: false
    });

    const [personalityPlan, setPersonalityPlan] = useState({
        superpowerAllocation: '',
        teamInsight: '',
        alignmentChecked: false
    });

    // --- PERSISTENCE ---

    useEffect(() => {
        // Load data from localStorage
        setTasks(loadFromStorage(STORAGE_KEYS.TASKS, []));
        setOrgChart(loadFromStorage(STORAGE_KEYS.ORG_CHART, []));
        setFunnelPlan(loadFromStorage('hiring_funnel_plan', funnelPlan));
        setScreeningPlan(loadFromStorage('hiring_screening_plan', screeningPlan));
        setInterviewPlan(loadFromStorage('hiring_interview_plan', interviewPlan));
        setOnboardingPlan(loadFromStorage('hiring_onboarding_plan', onboardingPlan));
        setPersonalityPlan(loadFromStorage('hiring_personality_plan', personalityPlan));
        setApprovals(loadFromStorage('hiring_approvals', approvals));
    }, []);

    const saveAll = () => {
        saveToStorage(STORAGE_KEYS.TASKS, tasks);
        saveToStorage(STORAGE_KEYS.ORG_CHART, orgChart);
        saveToStorage('hiring_funnel_plan', funnelPlan);
        saveToStorage('hiring_screening_plan', screeningPlan);
        saveToStorage('hiring_interview_plan', interviewPlan);
        saveToStorage('hiring_onboarding_plan', onboardingPlan);
        saveToStorage('hiring_personality_plan', personalityPlan);
        saveToStorage('hiring_approvals', approvals);

        toast({
            title: "Plan Saved",
            description: "All your hiring information has been saved locally.",
        });
    };

    // --- HANDLERS ---

    const addTask = (category: 'big5' | 'below-the-line') => {
        const newTask: TaskItem = {
            id: `task_${Date.now()}`,
            title: '',
            category,
            isCompleted: false,
            isDelegated: false,
            priority: 'medium',
            createdAt: new Date()
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id: string, title: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const productivity = analyzeProductivity(
        tasks.map(t => ({ ...t, duration: 60, startTime: new Date(), task: t.title })), // Mocking duration for analysis
        hourlyRate
    );

    const triggers = evaluateHiringTriggers([
        { id: '1', name: 'Big 5 Percentage', threshold: 50, currentValue: 0, isTriggered: false, condition: '<=', description: 'You should spend at least 50% of your time on Big 5 tasks.' },
        { id: '2', name: 'Below the Line Hours', threshold: 10, currentValue: 0, isTriggered: false, condition: '>=', description: 'Delegating 10+ hours a week signals a need for a hire.' }
    ], productivity);

    // --- RENDERERS ---

    const renderStrategy = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 1.1</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            The Hiring Strategy
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "Your time is your most valuable asset. Hiring the right person to take 'Below the Line' tasks off your plate is the first step to scaling."
                    </p>
                </CardHeader>
            </Card>

            <section className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900">
                            <Target className="w-5 h-5 text-slate-500" /> Your "Big 5"
                        </CardTitle>
                        <CardDescription className="text-slate-500">The 5 non-negotiable things YOU should be doing.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tasks.filter(t => t.category === 'big5').map((task) => (
                            <div key={task.id} className="flex gap-2">
                                <Input
                                    value={task.title}
                                    onChange={(e) => updateTask(task.id, e.target.value)}
                                    placeholder="e.g. Setting company vision"
                                    className="bg-background border-input text-foreground"
                                />
                                <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                        {tasks.filter(t => t.category === 'big5').length < 5 && (
                            <Button variant="outline" className="w-full border-dashed border-border text-muted-foreground hover:text-foreground" onClick={() => addTask('big5')}>
                                <Plus className="w-4 h-4 mr-2" /> Add Big 5 Task
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-card border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900">
                            <TrendingDown className="w-5 h-5 text-slate-500" /> Below the Line
                        </CardTitle>
                        <CardDescription className="text-slate-500">Tasks that should be delegated to others.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tasks.filter(t => t.category === 'below-the-line').map((task) => (
                            <div key={task.id} className="flex gap-2">
                                <Input
                                    value={task.title}
                                    onChange={(e) => updateTask(task.id, e.target.value)}
                                    placeholder="e.g. Booking travel"
                                    className="bg-background border-input text-foreground"
                                />
                                <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed border-border text-muted-foreground hover:text-foreground" onClick={() => addTask('below-the-line')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Below the Line Task
                        </Button>
                    </CardContent>
                </Card>
            </section>

            <Card className="bg-slate-50 border-slate-200 shadow-none">
                <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-slate-500" /> Who to Hire
                    </CardTitle>
                    <CardDescription className="text-slate-500">Decide if it's time to hire based on your current workload.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className={`p-6 rounded-xl border transition-all ${productivity.belowTheLineHours >= 10 ? 'border-amber-200 bg-amber-50/50 ring-2 ring-amber-500/20' : 'border-slate-200 bg-white'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${productivity.belowTheLineHours >= 10 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">YES: Invest in a Hire</h4>
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider mt-0.5">Threshold: 10+ Hours Below the Line</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "When you're investing too much of your own time on tasks below your Big 5, it's time to duplicate yourself."
                            </p>
                            {productivity.belowTheLineHours >= 10 && (
                                <Badge className="mt-4 bg-amber-600 text-white border-none uppercase text-[8px] font-black tracking-widest px-2 h-5">Action Required</Badge>
                            )}
                        </div>

                        <div className={`p-6 rounded-xl border transition-all ${productivity.belowTheLineHours < 10 ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50/30'}`}>
                            <div className="flex items-center gap-3 mb-4 opacity-70">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-400">
                                    <XCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-slate-600">NO: Focus on the Big 5</h4>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Threshold: Less than 10 Hours</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed italic">
                                "When most if not all of your time is already spent on your Big 5, keep pushing your current momentum."
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-none">
                <CardHeader>
                    <CardTitle className="text-slate-900 uppercase tracking-[0.2em] text-[10px] font-black">Hiring Triggers Deep Dive</CardTitle>
                    <CardDescription className="text-slate-500">Live analytics based on your task inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        {triggers.map(trigger => (
                            <div key={trigger.id} className={`p-4 rounded-lg border ${trigger.isTriggered ? 'border-amber-100 bg-amber-50/20' : 'border-slate-100 bg-slate-50/20'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-xs font-bold text-slate-900">{trigger.name}</h4>
                                    <Badge variant={trigger.isTriggered ? 'default' : 'secondary'} className={trigger.isTriggered ? 'bg-amber-600 text-[8px] h-4' : 'bg-slate-200 text-slate-500 border-none text-[8px] h-4'}>
                                        {trigger.isTriggered ? 'TRIGGERED' : 'STABLE'}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${trigger.isTriggered ? 'bg-slate-900' : 'bg-slate-300'}`}
                                            style={{ width: `${Math.min(100, (trigger.currentValue / trigger.threshold) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">
                                        {Math.round(trigger.currentValue)}{trigger.name.includes('Percentage') ? '%' : 'h'} / {trigger.threshold}{trigger.name.includes('Percentage') ? '%' : 'h'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Boss Input: Strategy Audit */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Strategy Audit</CardTitle>
                        </div>
                        <Button
                            variant={approvals.strategy ? "default" : "outline"}
                            size="sm"
                            className={approvals.strategy ? "bg-slate-900" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, strategy: !approvals.strategy })}
                        >
                            {approvals.strategy ? "Approved ✓" : "Approve Strategy"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Confirm that the "Big 5" truly represent your highest value tasks and that the "Below the Line" tasks are the priority for delegation.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderRoleDesign = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 1.2</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Role Design
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "Your goal is to become the Architect, not the Builder. Designing the role with precision is the only way to ensure the new hire delivers the ROI you need."
                    </p>
                </CardHeader>
            </Card>

            <Card className="bg-card border-slate-200 shadow-none">
                <CardHeader>
                    <CardTitle className="text-slate-900 font-black uppercase tracking-tight italic">Step 1: Role Logistics</CardTitle>
                    <CardDescription className="text-slate-500">Title, Department, and sustainable salary range.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Role Title</Label>
                            <Input
                                value={selectedRole.title}
                                onChange={(e) => setSelectedRole({ ...selectedRole, title: e.target.value })}
                                placeholder="e.g. Executive Assistant"
                                className="bg-background border-slate-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</Label>
                            <Input
                                value={selectedRole.department}
                                onChange={(e) => setSelectedRole({ ...selectedRole, department: e.target.value })}
                                placeholder="e.g. Operations"
                                className="bg-background border-slate-200"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Est. Salary (Annual)</Label>
                            <Input type="number" placeholder="50000" className="bg-background border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hiring Priority</Label>
                            <select className="w-full bg-background border border-slate-200 h-10 rounded-md px-3 text-sm focus:ring-2 focus:ring-slate-900/10 outline-none">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <ListChecks className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Step 2: Responsibilities</h3>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-xl border border-border min-h-[150px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Transfer tasks from "Below the Line":</p>
                        <div className="flex flex-wrap gap-2">
                            {tasks.filter(t => t.category === 'below-the-line').map(task => (
                                <Badge
                                    key={task.id}
                                    variant="outline"
                                    className="cursor-pointer border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
                                    onClick={() => {
                                        if (!selectedRole.responsibilities?.includes(task.title)) {
                                            setSelectedRole({
                                                ...selectedRole,
                                                responsibilities: [...(selectedRole.responsibilities || []), task.title]
                                            });
                                        }
                                    }}
                                >
                                    {task.title} <Plus className="w-3 h-3 ml-1" />
                                </Badge>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border">
                            <ul className="space-y-1.5 focus-within:ring-2 ring-slate-900/10 rounded">
                                {selectedRole.responsibilities?.map((r, i) => (
                                    <li key={i} className="text-xs text-slate-700 font-medium flex justify-between items-center group bg-white p-2 rounded border border-slate-100 shadow-sm">
                                        <span>{r}</span>
                                        <button onClick={() => setSelectedRole({ ...selectedRole, responsibilities: selectedRole.responsibilities?.filter(item => item !== r) })} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-destructive" />
                                        </button>
                                    </li>
                                ))}
                                {selectedRole.responsibilities?.length === 0 && (
                                    <li className="text-[10px] text-slate-400 italic text-center py-4">No responsibilities added yet.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <ShieldAlert className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Step 3: Requirements & Attributes</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Requirements (Skills/Experience)
                            </Label>
                            <Textarea
                                placeholder="e.g. 5+ years in Operations, Proficient in Notion..."
                                className="bg-background border-slate-200 text-xs min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                <Search className="w-3 h-3" /> Attributes (Values/Personality)
                            </Label>
                            <Textarea
                                placeholder="e.g. Highly organized, Direct communicator, Problem-solver..."
                                className="bg-background border-slate-200 text-xs min-h-[80px]"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <Card className="bg-slate-900 border-none shadow-none text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Target className="w-32 h-32" />
                </div>
                <CardHeader className="relative z-10">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Step 4: Vision of Success</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-300">How would you know they are doing a great job?</Label>
                        <Textarea
                            placeholder="e.g. 100% of emails responded to within 4 hours, All travel booked with zero errors..."
                            className="bg-white/5 border-white/10 text-xs min-h-[80px] text-white focus:border-white/20 transition-all outline-none"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card border-slate-200 shadow-none">
                <CardHeader>
                    <CardTitle className="text-slate-900">Magnetic Job Description</CardTitle>
                    <CardDescription className="text-slate-500">Attract the right people by being crystal clear.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-foreground">Working with us means...</Label>
                        <Textarea
                            placeholder="Describe your company culture and why someone would want to work here."
                            className="bg-background border-input min-h-[100px]"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-foreground">Required Skills</Label>
                            <Textarea placeholder="Skill 1&#10;Skill 2" className="bg-background border-input" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-foreground">Benefits & Perks</Label>
                            <Textarea placeholder="Remote work&#10;Health insurance" className="bg-background border-input" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Boss Input: Role Design Audit */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Role Definition</CardTitle>
                        </div>
                        <Button
                            variant={approvals.role ? "default" : "outline"}
                            size="sm"
                            className={approvals.role ? "bg-slate-900" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, role: !approvals.role })}
                        >
                            {approvals.role ? "Approved ✓" : "Finalize Role"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Ensure the responsibilities are realistic for one person and the salary range is competitive yet sustainable.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderSourcing = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 2</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Finding Them (Sourcing)
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "If you aren't attracting A-Players, it's not them, it's your bait. A magnetic landing page is the difference between settling and hiring a Rockstar."
                    </p>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <Magnet className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Step 1: The Landing Page</h3>
                    </div>
                    <Card className="bg-white border-slate-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-[10px] font-black uppercase tracking-wider text-slate-400">Magnetic Job Description URL</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-slate-600">Application Form / Landing Page Link</Label>
                                <Input
                                    value={funnelPlan.landingPageUrl}
                                    onChange={(e) => setFunnelPlan({ ...funnelPlan, landingPageUrl: e.target.value })}
                                    placeholder="https://career.yourcompany.com/role-id"
                                    className="bg-background border-slate-200"
                                />
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Pro Tip:</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                                    "Your landing page is your first impression. Ensure it details the 'Big 5' responsibilities, requirements, and attributes clearly."
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <TrendingUp className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Step 2: Traffic Sources</h3>
                    </div>
                    <Card className="bg-white border-slate-200 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-[10px] font-black uppercase tracking-wider text-slate-400">Where people will find the role</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-slate-600">Primary Channels</Label>
                                <Textarea
                                    placeholder="e.g. ZipRecruiter (Premium), LinkedIn Job Slot, Instagram Story, Weekly Newsletter..."
                                    className="bg-background border-slate-200 text-xs min-h-[100px]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {['ZipRecruiter', 'LinkedIn', 'Indeed', 'Internal List'].map(source => (
                                    <div key={source} className="flex items-center gap-2 p-2 rounded border border-slate-50 bg-slate-50/50 text-[10px] font-bold text-slate-400">
                                        <Badge variant="outline" className="h-4 px-1 rounded-sm text-[8px] bg-white">Check</Badge>
                                        {source}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* Boss Input: Sourcing Audit */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none mt-8">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Sourcing Audit</CardTitle>
                        </div>
                        <Button
                            variant={approvals.sourcing ? "default" : "outline"}
                            size="sm"
                            className={approvals.sourcing ? "bg-slate-900 text-white" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, sourcing: !approvals.sourcing })}
                        >
                            {approvals.sourcing ? "Approved ✓" : "Activate Funnel"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Confirm the landing page reflects the role design accurately and traffic sources are selected to attract A-Players.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderInterviewing = () => (
        <div className="space-y-8 pb-10">
            {/* Module Header */}
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 4</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Interviewing
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "Deciding whether or not you'd like the candidate to perform a specific task(s) that prove they have the skills and experience to fulfill the role."
                    </p>
                </CardHeader>
            </Card>

            {/* Phase 1: Preparation Checklist */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <ListChecks className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Phase 1: Preparation Checklist</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        "Quiet, professional environment identified",
                        "Stable internet connection / phone signal",
                        "Permission to record the call (for review)",
                        "Interview scorecard / Role design open",
                        "Questions prepared based on WHY, HOW, and WHAT"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-300 transition-all cursor-pointer group">
                            <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center">
                                <div className="w-2 h-2 bg-slate-900 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity" />
                            </div>
                            <span className="text-xs font-medium text-slate-500">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Phase 2: Question Preparation */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Phase 2: Question Preparation</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { type: 'WHY (Values)', placeholder: 'e.g. Why does this role interest you beyond the salary?' },
                        { type: 'HOW (Process)', placeholder: 'e.g. How would you handle a conflict in project deadlines?' },
                        { type: 'WHAT (Detail)', placeholder: 'e.g. What specific tools did you use in your last role?' }
                    ].map((q) => (
                        <div key={q.type} className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{q.type}</Label>
                            <Textarea
                                placeholder={q.placeholder}
                                className="bg-background border-slate-200 text-xs min-h-[60px]"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Red Flags & Watchouts */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <Eye className="w-6 h-6 text-slate-400" />
                    <h3 className="text-lg font-bold uppercase tracking-tight text-slate-700">Look Out For</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {['Drama', 'Complaining', 'Blaming Others'].map((item, idx) => (
                        <Card key={idx} className="bg-white border-slate-200 hover:border-slate-400 transition-colors cursor-default shadow-none">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                <XCircle className="w-8 h-8 text-slate-300" />
                                <h4 className="text-sm font-black uppercase tracking-tight text-slate-600">{item}</h4>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Phase 3: Trial Project / Activity */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <Zap className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Phase 3: Trial Project / Activity</h3>
                </div>
                <Card className="bg-white border-slate-200 shadow-none">
                    <CardContent className="p-4 space-y-4">
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                            "Actions speak louder than CVs. Give them a practical task that proves they can fulfill the role's responsibilities."
                        </p>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Describe the Task</Label>
                            <Textarea
                                placeholder="e.g. Draft a sample response to a customer complaint, Create a 5-step SOP for booking travel..."
                                className="bg-background border-slate-200 text-xs min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Boss Input: Interview Quality Control */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Candidate Quality Control</CardTitle>
                        </div>
                        <Button
                            variant={approvals.interviewing ? "default" : "outline"}
                            size="sm"
                            className={approvals.interviewing ? "bg-slate-900" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, interviewing: !approvals.interviewing })}
                        >
                            {approvals.interviewing ? "Approved ✓" : "Unlock Module 5"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Review candidate notes and red flag audits. Are you settling, or have you found a true A-Player?
                    </p>
                </CardContent>
            </Card>

            {/* Summary Checklist */}
            <Card className="bg-slate-50 border-slate-200 shadow-none mt-8">
                <CardHeader className="pb-4">
                    <CardTitle className="uppercase tracking-widest text-[10px] font-black text-slate-600">To Summarize</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                        {[
                            "Decide whether to perform specific task(s)",
                            "Ask open-ended questions & listen",
                            "Match candidate's values to your company's",
                            "Select the interview style that fits best",
                            "Ask the right types of questions",
                            "Select a practical trial task or project"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                                <p className="text-[11px] font-medium text-slate-600">{item}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderOnboarding = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 5</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Onboarding & Integration
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "After screening many candidates and assuming the candidate is a good match, it's now time to onboard!"
                    </p>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <ListChecks className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">6-Step Onboarding Process</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            '1. Extend your detailed offer in writing.',
                            '2. Perform a thorough onboarding.',
                            '3. Give them access to necessary tools & software.',
                            '4. Create a 90-day plan for success.',
                            '5. Introduce them to the rest of the team.',
                            '6. Congratulations, you have a new Rockstar!'
                        ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
                                <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    {idx + 1}
                                </div>
                                <span className="text-xs font-medium text-slate-600">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                            <Brain className="w-5 h-5 text-slate-400" />
                            <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">90-Day Success Roadmap</h3>
                        </div>
                        <Card className="bg-white border-slate-100 shadow-none">
                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offer Details</Label>
                                    <Textarea
                                        placeholder="Salary, benefits, start date..."
                                        className="bg-background border-slate-100 text-xs"
                                        value={onboardingPlan.offerDetails}
                                        onChange={(e) => setOnboardingPlan({ ...onboardingPlan, offerDetails: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">30-Day Checklist (Learning)</Label>
                                    <Textarea
                                        placeholder="Key systems to master..."
                                        className="bg-background border-slate-100 text-xs"
                                        value={onboardingPlan.checkpoint30Day}
                                        onChange={(e) => setOnboardingPlan({ ...onboardingPlan, checkpoint30Day: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">60-Day Checklist (Contribution)</Label>
                                    <Textarea
                                        placeholder="First standalone projects..."
                                        className="bg-background border-slate-100 text-xs"
                                        value={onboardingPlan.checkpoint60Day}
                                        onChange={(e) => setOnboardingPlan({ ...onboardingPlan, checkpoint60Day: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">90-Day Checklist (Impact)</Label>
                                    <Textarea
                                        placeholder="Full ownership of core KPIs..."
                                        className="bg-background border-slate-100 text-xs"
                                        value={onboardingPlan.checkpoint90Day}
                                        onChange={(e) => setOnboardingPlan({ ...onboardingPlan, checkpoint90Day: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>

            {/* Boss Input: Onboarding Readiness */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none mt-8">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Integration Quality</CardTitle>
                        </div>
                        <Button
                            variant={approvals.onboarding ? "default" : "outline"}
                            size="sm"
                            className={approvals.onboarding ? "bg-slate-900 text-white" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, onboarding: !approvals.onboarding })}
                        >
                            {approvals.onboarding ? "Integration Verified ✓" : "Verify Integration"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Confirm that the 90-day roadmap is clear and the candidate has all necessary tools to start delivering value.
                    </p>
                </CardContent>
            </Card>
        </div>
    );


    const renderFiring = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 6</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            The Firing Protocol
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "Sometimes people just aren't a good fit for your company and you'll need to let them go the right way."
                    </p>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <ShieldAlert className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">5-Step Departure Protocol</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            '1. Use the willing & able matrix to measure performance.',
                            '2. Ensure roadmap for improvement has clear deadlines.',
                            '3. Consider options in advance and plan for scenarios.',
                            '4. Decide whether to let them go or keep them onboard.',
                            '5. If letting go, do it in a humane way. Say thank you.'
                        ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
                                <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    {idx + 1}
                                </div>
                                <span className="text-xs font-medium text-slate-600">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                            <Activity className="w-5 h-5 text-slate-400" />
                            <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">The Willing & Able Matrix</h3>
                        </div>
                        <Card className="bg-white border-slate-200 shadow-none overflow-hidden">
                            <div className="grid grid-cols-2">
                                <div className="p-4 border-b border-r border-slate-100 bg-slate-50/50">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Unwilling / Able</p>
                                    <p className="text-[11px] font-medium text-slate-600">The "Terrorist". Fire fast or find the misalignment.</p>
                                </div>
                                <div className="p-4 border-b border-slate-100 bg-green-50/20">
                                    <p className="text-[10px] font-black uppercase text-green-600 mb-1">Willing / Able</p>
                                    <p className="text-[11px] font-medium text-slate-600">The "A-Player". Protect and promote.</p>
                                </div>
                                <div className="p-4 border-r border-slate-100 bg-red-50/20">
                                    <p className="text-[10px] font-black uppercase text-red-600 mb-1">Unwilling / Unable</p>
                                    <p className="text-[11px] font-medium text-slate-600">Immediate Departure. No growth possible.</p>
                                </div>
                                <div className="p-4 border-slate-100 bg-blue-50/20">
                                    <p className="text-[10px] font-black uppercase text-blue-600 mb-1">Willing / Unable</p>
                                    <p className="text-[11px] font-medium text-slate-600">The "B-Player". Needs more training or a new role.</p>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>
            </div>

            {/* Boss Input: Firing Audit */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none mt-8">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Separation Approval</CardTitle>
                        </div>
                        <Button
                            variant={approvals.firing ? "default" : "outline"}
                            size="sm"
                            className={approvals.firing ? "bg-slate-900 text-white" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, firing: !approvals.firing })}
                        >
                            {approvals.firing ? "Departure Approved ✓" : "Activate Protocol"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Confirm that the decision is final and all legal/security precautions are in place. The culture of your company depends on who you allow to stay.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderBonus = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-slate-900 border-none shadow-none overflow-hidden text-white relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />
                <CardHeader className="relative z-10 py-10 md:py-16 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-white/10 text-slate-300 border-white/20 uppercase tracking-widest px-3 py-1 text-xs">Bonus Module</Badge>
                        <CardTitle className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white flex items-center justify-center gap-4">
                            Personality Secrets
                        </CardTitle>
                        <div className="h-1.5 w-32 bg-white rounded-full mt-6 mx-auto shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </div>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mt-8 font-medium leading-relaxed mx-auto">
                        "Understanding personality types is key to unlocking your superpower and that of everyone on your team."
                    </p>
                </CardHeader>
            </Card>

            {/* MBTI Building Blocks */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <LayoutGrid className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">MBTI Building Blocks</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            title: 'Gain or Lose Energy',
                            letters: '(I) OR (E)',
                            desc: 'Introverts (I) recharge alone; Extroverts (E) charge via social interaction.'
                        },
                        {
                            title: 'Take in Information',
                            letters: '(S) OR (N)',
                            desc: 'Sensing (S) focuses on facts/now; Intuitive (N) sees patterns/future.'
                        },
                        {
                            title: 'Make Decisions',
                            letters: '(T) OR (F)',
                            desc: 'Thinking (T) is logic-based/practical; Feeling (F) is values/emotion-based.'
                        },
                        {
                            title: 'Prefer to Live Lives',
                            letters: '(J) OR (P)',
                            desc: 'Judging (J) prefers closed loops/checklists; Prospecting (P) prefers open possibilities.'
                        }
                    ].map((item, idx) => (
                        <Card key={idx} className="bg-white border-slate-100 shadow-none">
                            <CardHeader className="p-4 pb-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</p>
                                <CardTitle className="text-lg font-black text-slate-900">{item.letters}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-[11px] text-slate-500 leading-relaxed italic">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Leveraging Opposites */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <Users className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Leverage Opposites for Effectiveness</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: 'Strong Messaging', pair: '(E) + (I)', desc: '(I) thinks about the world; (E) analyzes impact on people.' },
                            { title: 'Complicated Problems', pair: '(S) + (N)', desc: '(S) focuses on right now; (N) connects dots and anticipates future.' },
                            { title: 'Leadership & Persuasion', pair: '(T) + (F)', desc: 'Combine logic (T) with hearts and minds (F) for perfect persuasion.' },
                            { title: 'Managing Change', pair: '(J) + (P)', desc: '(J) provides structure/clarity; (P) offers flexibility/possibility.' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                                <div className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                                    <span className="text-[10px] font-black text-slate-600">{item.pair}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <TableProperties className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">The 4 Temperaments</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { type: 'SJ', title: 'Traditional', sub: 'Stabilizing', color: 'slate' },
                            { type: 'NF', title: 'Catalyst', sub: 'Energizer', color: 'slate' },
                            { type: 'SP', title: 'Troubleshooter', sub: 'Firefighter', color: 'slate' },
                            { type: 'NT', title: 'Visionary', sub: 'Architect', color: 'slate' }
                        ].map((item) => (
                            <div key={item.type} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <Badge className="bg-slate-900 text-white mb-2">{item.type}</Badge>
                                <h4 className="text-xs font-bold text-slate-900 block">{item.title}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Temperament Matrix Detail */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <Database className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Detailed Temperament Matrix</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest">Type</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest">Seeks</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest">Role</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest">Appreciates</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest">Irritated By</th>
                            </tr>
                        </thead>
                        <tbody className="text-[11px] font-medium text-slate-600">
                            {[
                                { type: 'SJ', seeks: 'Consistency', role: 'Process/Organizer', appreciates: 'Responsibility', irritated: 'Rules not followed' },
                                { type: 'NF', seeks: 'Emotional Consensus', role: 'Motivating/Morale', appreciates: 'High Energy/Others', irritated: 'Criticism/No feedback' },
                                { type: 'SP', seeks: 'Moving Things Along', role: 'Short-term Problems', appreciates: 'Action and Change', irritated: 'Micromanagement' },
                                { type: 'NT', seeks: 'Structure & Definition', role: 'Long-term Planning', appreciates: 'Principles/Intel', irritated: 'Redundancy/"Stupid" mistakes' }
                            ].map((row, idx) => (
                                <tr key={row.type} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                                    <td className="p-4 font-black text-slate-900">{row.type}</td>
                                    <td className="p-4">{row.seeks}</td>
                                    <td className="p-4">{row.role}</td>
                                    <td className="p-4">{row.appreciates}</td>
                                    <td className="p-4 text-slate-400 italic">{row.irritated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Better Decision Making Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <BrainCircuit className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Leveraging Types for Better Decision Making</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: 'Sensing',
                            questions: ['What has past experience shown us?', 'What facts can be verified?', 'What can we see and observe?', 'What is happening right now?']
                        },
                        {
                            label: 'Intuition',
                            questions: ['How do the facts relate to one another?', 'What can we interpret?', 'What patterns exist?', 'What is possible?']
                        },
                        {
                            label: 'Thinking',
                            questions: ['What are logical consequences?', 'What are the pros and cons?', 'What will be most effective?', 'What goal is being optimized for?']
                        },
                        {
                            label: 'Feeling',
                            questions: ['How much do I care?', 'How much do others care?', 'What exceptions need to be made?', 'What are other people feeling?']
                        }
                    ].map((section) => (
                        <div key={section.label} className="space-y-3">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">{section.label}</h4>
                            <div className="space-y-2">
                                {section.questions.map((q, qIdx) => (
                                    <div key={qIdx} className="p-3 bg-white border border-slate-100 rounded text-[10px] text-slate-500 italic leading-snug">
                                        "{q}"
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Summary Checklist */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">In Summary</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {[
                        'MBTI is an INDICATOR - don\'t put people in a box!',
                        'MBTI is a way to put yourself in other\'s shoes.',
                        'Learn to APPRECIATE our differences!',
                        'You\'re the conductor of your business\' symphony.',
                        'Put people in a place where they can shine.',
                        'Check out 16personalities.com for a free test!'
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-[11px] font-medium text-slate-600">{item}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Boss Input footer */}
            <Card className="border-slate-200 bg-slate-50/50 shadow-none mt-8">
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-slate-400" />
                            <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Alignment Audit</CardTitle>
                        </div>
                        <Button
                            variant={approvals.bonus ? "default" : "outline"}
                            size="sm"
                            className={approvals.bonus ? "bg-slate-900 text-white" : "border-slate-200 text-slate-600"}
                            onClick={() => setApprovals({ ...approvals, bonus: !approvals.bonus })}
                        >
                            {approvals.bonus ? "Audit Complete ✓" : "Finalize Audit"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pb-4">
                    <p className="text-xs text-slate-500 font-medium">
                        Ensure every team member is in a role that leverages their natural genius. This is the ultimate "Boss" move for leverage.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const renderScreening = () => (
        <div className="space-y-8 pb-10">
            <Card className="bg-white border-slate-200 shadow-none overflow-hidden text-slate-900 relative">
                <CardHeader className="relative z-10 py-10 md:py-12 text-center">
                    <div className="space-y-2 mx-auto">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-xs">Module 3</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Screening & Recruiting
                        </CardTitle>
                        <div className="h-1 w-24 bg-slate-900 rounded-full mt-4 mx-auto" />
                    </div>
                    <p className="text-slate-500 text-md md:text-lg max-w-2xl mt-6 font-medium leading-relaxed mx-auto italic">
                        "Connect with candidates who speak your language in terms of what's truly important. Systematic filtering saves weeks of wasted time."
                    </p>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <Filter className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">8-Step Screening Process</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { key: 'spreadsheetExported', label: '1. Export applicant answers to a spreadsheet' },
                            { key: 'visionOfSuccessEstablished', label: '2. Establish your vision of success for the role' },
                            { key: 'keystoneFilteringDone', label: '3. Filter using the Keystone question' },
                            { key: 'nonNegotiablesIdentified', label: '4. Identify additional non-negotiable items' },
                            { key: 'cultureFitChecked', label: "5. Remove applicants that don't meet non-negotiables" },
                            { key: 'cvsReviewed', label: '6. Review CVs and resumes for reference' },
                            { key: 'shortlistCompiled', label: '7. Compile a shortlist of 3-5 candidates' },
                            { key: 'interviewsInvited', label: '8. Invite the shortlisted candidates to an interview' }
                        ].map((step) => (
                            <div key={step.key} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-300 transition-all cursor-pointer" onClick={() => setScreeningPlan({ ...screeningPlan, [step.key]: !screeningPlan[step.key as keyof typeof screeningPlan] })}>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${screeningPlan[step.key as keyof typeof screeningPlan] ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200'}`}>
                                    {screeningPlan[step.key as keyof typeof screeningPlan] && <CheckCircle2 className="w-3 h-3" />}
                                </div>
                                <span className={`text-xs font-medium ${screeningPlan[step.key as keyof typeof screeningPlan] ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <Card className="bg-slate-900 border-none shadow-none text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain className="w-32 h-32" />
                        </div>
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Keystone Filter Logic</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-[11px] font-bold text-slate-300 uppercase mb-2">The Question:</p>
                                <p className="text-sm italic font-medium">"{funnelPlan.keystoneQuestion}"</p>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                This question is your primary filter. If their vision of success doesn't align with your core values, they are an automatic "No".
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 bg-slate-50/50 shadow-none">
                        <CardHeader className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PlayCircle className="w-5 h-5 text-slate-400" />
                                    <CardTitle className="text-xs font-bold text-slate-600 uppercase tracking-widest">Boss Input: Screening Audit</CardTitle>
                                </div>
                                <Button
                                    variant={approvals.screening ? "default" : "outline"}
                                    size="sm"
                                    className={approvals.screening ? "bg-slate-900 text-white" : "border-slate-200 text-slate-600"}
                                    onClick={() => setApprovals({ ...approvals, screening: !approvals.screening })}
                                >
                                    {approvals.screening ? "Shortlist Approved ✓" : "Approve Shortlist"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <p className="text-xs text-slate-500 font-medium">
                                Confirm the shortlist consists of 3-5 candidates who passed the Keystone filter and culture check.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Strategic Hiring Planner</h1>
                    <p className="text-muted-foreground text-sm">Systematic approach to building your dream team.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="text-muted-foreground" onClick={() => window.location.href = '/dashboard/overview'}>
                        Exit
                    </Button>
                    <Button variant="default" onClick={saveAll}>
                        Save Plan
                    </Button>
                </div>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="bg-transparent border-border p-0 rounded-none h-12 w-full justify-start border-b gap-8 mb-8 overflow-x-auto no-scrollbar flex flex-nowrap shrink-0">
                    <TabsTrigger value="strategy" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        1. Strategy
                    </TabsTrigger>
                    <TabsTrigger value="role" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        2. Role Design
                    </TabsTrigger>
                    <TabsTrigger value="sourcing" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        3. Sourcing
                    </TabsTrigger>
                    <TabsTrigger value="screening" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        4. Screening
                    </TabsTrigger>
                    <TabsTrigger value="interviewing" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        5. Interviewing
                    </TabsTrigger>
                    <TabsTrigger value="onboarding" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        6. Onboarding
                    </TabsTrigger>
                    <TabsTrigger value="firing" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        7. Firing
                    </TabsTrigger>
                    <TabsTrigger value="bonus" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all shrink-0">
                        8. Bonus
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="strategy" className="mt-0 focus-visible:outline-none">
                    {renderStrategy()}
                </TabsContent>

                <TabsContent value="role" className="mt-0 focus-visible:outline-none">
                    {renderRoleDesign()}
                </TabsContent>

                <TabsContent value="sourcing" className="mt-0 focus-visible:outline-none">
                    {renderSourcing()}
                </TabsContent>

                <TabsContent value="screening" className="mt-0 focus-visible:outline-none">
                    {renderScreening()}
                </TabsContent>

                <TabsContent value="interviewing" className="mt-0 focus-visible:outline-none">
                    {renderInterviewing()}
                </TabsContent>

                <TabsContent value="onboarding" className="mt-0 focus-visible:outline-none">
                    {renderOnboarding()}
                </TabsContent>

                <TabsContent value="firing" className="mt-0 focus-visible:outline-none">
                    {renderFiring()}
                </TabsContent>

                <TabsContent value="bonus" className="mt-0 focus-visible:outline-none">
                    {renderBonus()}
                </TabsContent>
            </Tabs>

            {/* Simple Footer Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border p-4 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-3 w-full md:w-auto ml-auto">
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none h-10 px-6 border-border text-muted-foreground"
                            onClick={() => {
                                if (activeTab === "role") setActiveTab("strategy");
                                if (activeTab === "sourcing") setActiveTab("role");
                                if (activeTab === "screening") setActiveTab("sourcing");
                                if (activeTab === "interviewing") setActiveTab("screening");
                                if (activeTab === "onboarding") setActiveTab("interviewing");
                                if (activeTab === "firing") setActiveTab("onboarding");
                                if (activeTab === "bonus") setActiveTab("firing");
                            }}
                            disabled={activeTab === "strategy"}
                        >
                            Back
                        </Button>
                        <Button
                            className="flex-1 md:flex-none h-10 px-8"
                            onClick={() => {
                                if (activeTab === "strategy") setActiveTab("role");
                                else if (activeTab === "role") setActiveTab("sourcing");
                                else if (activeTab === "sourcing") setActiveTab("screening");
                                else if (activeTab === "screening") setActiveTab("interviewing");
                                else if (activeTab === "interviewing") setActiveTab("onboarding");
                                else if (activeTab === "onboarding") setActiveTab("firing");
                                else if (activeTab === "firing") setActiveTab("bonus");
                                else saveAll();
                            }}
                        >
                            {activeTab === "bonus" ? "Complete" : "Next"}
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StrategicHiringPlanner;
