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
    AlertCircle
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

    // Step 4: Execution Plan (Sourcing & Screening)
    const [funnelPlan, setFunnelPlan] = useState({
        landingPageUrl: '',
        questionnaireEnabled: true,
        keystoneQuestion: 'How do you know when you\'re doing a good job?',
        filteringCriteria: '',
        shortlistTarget: 3
    });

    // Step 5: Finalize (Interviewing)
    const [interviewPlan, setInterviewPlan] = useState({
        style: '1-on-1',
        trialTask: '',
        questionBank: [
            { q: 'What excites you about our company?', type: 'WHY' },
            { q: 'Tell me about a complex project you delivered on time.', type: 'HOW' }
        ]
    });

    // --- PERSISTENCE ---

    useEffect(() => {
        // Load data from localStorage
        const savedTasks = loadFromStorage(STORAGE_KEYS.TASKS, []);
        const savedOrg = loadFromStorage(STORAGE_KEYS.ORG_CHART, []);
        // ... load others if needed
        setTasks(savedTasks);
        setOrgChart(savedOrg);
    }, []);

    const saveAll = () => {
        saveToStorage(STORAGE_KEYS.TASKS, tasks);
        saveToStorage(STORAGE_KEYS.ORG_CHART, orgChart);
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
        tasks.map(t => ({ ...t, duration: 60, startTime: new Date() })), // Mocking duration for analysis
        hourlyRate
    );

    const triggers = evaluateHiringTriggers([
        { id: '1', name: 'Big 5 Percentage', threshold: 50, currentValue: 0, isTriggered: false, condition: '<=', description: 'You should spend at least 50% of your time on Big 5 tasks.' },
        { id: '2', name: 'Below the Line Hours', threshold: 10, currentValue: 0, isTriggered: false, condition: '>=', description: 'Delegating 10+ hours a week signals a need for a hire.' }
    ], productivity);

    // --- RENDERERS ---

    const renderStrategy = () => (
        <div className="space-y-8">
            <section className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Target className="w-5 h-5" /> Your "Big 5"
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">The 5 non-negotiable things YOU should be doing.</CardDescription>
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

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <TrendingDown className="w-5 h-5" /> Below the Line
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">Tasks that should be delegated to others.</CardDescription>
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

            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-foreground">Hiring Triggers</CardTitle>
                    <CardDescription className="text-muted-foreground">Based on your tasks above, should you hire now?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        {triggers.map(trigger => (
                            <div key={trigger.id} className={`p-6 rounded-2xl border ${trigger.isTriggered ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/30'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-foreground">{trigger.name}</h4>
                                    <Badge variant={trigger.isTriggered ? 'default' : 'secondary'} className={trigger.isTriggered ? '' : 'text-muted-foreground'}>
                                        {trigger.isTriggered ? 'Triggered' : 'Healthy'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">{trigger.description}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-muted h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${trigger.isTriggered ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                                            style={{ width: `${Math.min(100, (trigger.currentValue / trigger.threshold) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {Math.round(trigger.currentValue)}{trigger.name.includes('Percentage') ? '%' : 'h'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderRoleDesign = () => (
        <div className="space-y-8">
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-foreground">Define the Role</CardTitle>
                    <CardDescription className="text-muted-foreground">What is the title and focus of this new position?</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-foreground">Role Title</Label>
                            <Input
                                value={selectedRole.title}
                                onChange={(e) => setSelectedRole({ ...selectedRole, title: e.target.value })}
                                placeholder="e.g. Executive Assistant"
                                className="bg-background border-input"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-foreground">Department</Label>
                            <Input
                                value={selectedRole.department}
                                onChange={(e) => setSelectedRole({ ...selectedRole, department: e.target.value })}
                                placeholder="e.g. Operations"
                                className="bg-background border-input"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-foreground">Estimated Salary (Annual)</Label>
                                <Input type="number" placeholder="50000" className="bg-background border-input" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-foreground">Priority</Label>
                                <select className="w-full bg-background border border-input h-10 rounded-md px-3 text-sm">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="text-foreground">Top Responsibilities</Label>
                        <div className="bg-muted/30 p-4 rounded-xl border border-border min-h-[150px]">
                            <p className="text-xs text-muted-foreground mb-4">Select tasks to move to this role:</p>
                            <div className="flex flex-wrap gap-2">
                                {tasks.filter(t => t.category === 'below-the-line').map(task => (
                                    <Badge
                                        key={task.id}
                                        variant="outline"
                                        className="cursor-pointer border-border text-muted-foreground hover:bg-muted hover:text-foreground"
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
                                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Role's Responsibilities:</h5>
                                <ul className="space-y-1">
                                    {selectedRole.responsibilities?.map((r, i) => (
                                        <li key={i} className="text-xs text-foreground flex justify-between items-center group bg-muted/50 p-1.5 rounded">
                                            <span>{r}</span>
                                            <button onClick={() => setSelectedRole({ ...selectedRole, responsibilities: selectedRole.responsibilities?.filter(item => item !== r) })} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-foreground">Magnetic Job Description</CardTitle>
                    <CardDescription className="text-muted-foreground">Attract the right people by being crystal clear.</CardDescription>
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
        </div>
    );

    const renderExecution = () => (
        <div className="space-y-8">
            <section className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Magnet className="w-5 h-5 text-muted-foreground" /> Sourcing Strategy
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">Where will you find your candidate?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-foreground">Traffic Sources</Label>
                            <Textarea placeholder="ZipRecruiter, LinkedIn, My Email List..." className="bg-background border-input" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-foreground">Application Form URL</Label>
                            <Input placeholder="https://forms.gle/..." className="bg-background border-input" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Filter className="w-5 h-5 text-muted-foreground" /> Screening System
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">Identify the best fit systematically.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 bg-muted/50 p-4 rounded-xl border border-border">
                            <Label className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">The Keystone Question</Label>
                            <div className="text-lg font-bold text-foreground mb-2 italic">"{funnelPlan.keystoneQuestion}"</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Identify if the applicant’s vision of success matches yours.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-foreground">Ideal Answer Perspective</Label>
                            <Textarea
                                placeholder="e.g. When measurable results are met and projects delivered on time."
                                className="bg-background border-input"
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-foreground">Interview Framework</CardTitle>
                    <CardDescription className="text-muted-foreground">Define your process and evaluation criteria.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                            <h5 className="font-bold text-muted-foreground flex items-center gap-2 uppercase text-[10px] tracking-wider">
                                <Mic2 className="w-3 h-3" /> Question Bank
                            </h5>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                                <li>• Role alignment</li>
                                <li>• Problem solving</li>
                                <li>• Cultural fit</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                            <h5 className="font-bold text-muted-foreground flex items-center gap-2 uppercase text-[10px] tracking-wider">
                                <AlertCircle className="w-3 h-3" /> Red Flags
                            </h5>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                                <li>• Lack of research</li>
                                <li>• Blame culture</li>
                                <li>• Inconsistency</li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                            <h5 className="font-bold text-muted-foreground flex items-center gap-2 uppercase text-[10px] tracking-wider">
                                <Zap className="w-3 h-3" /> Trial Task
                            </h5>
                            <Textarea
                                placeholder="Define action-based test..."
                                className="bg-background border-input text-xs min-h-[60px]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
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
                <TabsList className="bg-transparent border-border p-0 rounded-none h-12 w-full justify-start border-b gap-8">
                    <TabsTrigger value="strategy" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all">
                        1. Strategy
                    </TabsTrigger>
                    <TabsTrigger value="role" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all">
                        2. Role
                    </TabsTrigger>
                    <TabsTrigger value="execution" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary px-0 h-12 text-muted-foreground font-medium transition-all">
                        3. Execution
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="strategy" className="mt-0 focus-visible:outline-none">
                    {renderStrategy()}
                </TabsContent>

                <TabsContent value="role" className="mt-0 focus-visible:outline-none">
                    {renderRoleDesign()}
                </TabsContent>

                <TabsContent value="execution" className="mt-0 focus-visible:outline-none">
                    {renderExecution()}
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
                                if (activeTab === "execution") setActiveTab("role");
                            }}
                            disabled={activeTab === "strategy"}
                        >
                            Back
                        </Button>
                        <Button
                            className="flex-1 md:flex-none h-10 px-8"
                            onClick={() => {
                                if (activeTab === "strategy") setActiveTab("role");
                                else if (activeTab === "role") setActiveTab("execution");
                                else saveAll();
                            }}
                        >
                            {activeTab === "execution" ? "Complete" : "Next"}
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StrategicHiringPlanner;
