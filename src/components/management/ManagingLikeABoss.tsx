import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Globe,
    Users,
    PieChart,
    MessageSquare,
    Zap
} from "lucide-react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/lib/storage";

// Modular Imports
import {
    CulturePlan,
    LeadershipPlan,
    DelegationPlan,
    MeetingsPlan,
    PerformancePlan
} from './modules/types';
import CultureModule from './modules/CultureModule';
import LeadershipModule from './modules/LeadershipModule';
import DelegationModule from './modules/DelegationModule';
import MeetingsModule from './modules/MeetingsModule';
import PerformanceModule from './modules/PerformanceModule';

const ManagingLikeABoss: React.FC = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("1. Culture");

    // State for Culture Module
    const [culturePlan, setCulturePlan] = useState<CulturePlan>({
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
    const [leadershipPlan, setLeadershipPlan] = useState<LeadershipPlan>({
        archetype: "",
        strengths: "",
        opportunities: "",
        strategyExecutionValue: 50,
        assessment: {},
        improvementFocus: "",
        checklist: {
            valuePeople: false,
            talentDevelopment: false,
            createConnections: false,
            createOwnership: false,
            takeResponsibility: false,
            directCommunication: false,
            empowerTeam: false,
            takeQuestionnaire: false,
            pickAttribute: false,
            plotGrid: false,
            plotSpectrum: false,
            seekFeedback: false
        }
    });

    // State for Delegation Module
    const [delegationPlan, setDelegationPlan] = useState<DelegationPlan>({
        bigFive: ["", "", "", "", ""],
        inventory: Array.from({ length: 10 }, () => ({ task: "", action: "" })),
        automationPlan: Array.from({ length: 10 }, () => ({ task: "", frequency: "", tools: "", who: "", when: "" })),
        delegationPlanRows: Array.from({ length: 5 }, () => ({ task: "", time: "", outcome: "", who: "", ready: "" })),
        big5Commitment: Array.from({ length: 5 }, () => ({ task: "", time: "", outcome: "", commitment: "" })),
        daddTasks: [
            { task: "", category: "" }
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
    const [meetingsPlan, setMeetingsPlan] = useState<MeetingsPlan>({
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
        protocolsData: {
            Annual: { culture: '', works: '', improvement: '', results: '', notAchieved: '', objectives: '', obstacles: '' },
            Quarterly: { culture: '', reconfirm: '', works: '', improvement: '', results: '', notAchieved: '', initiatives: '', obstacles: '' },
            Monthly: { culture: '', reconfirm: '', works: '', improvement: '', results: '', notAchieved: '', initiatives: '', tasks: '', obstacles: '' },
            Weekly: { culture: '', reconfirm: '', works: '', improvement: '', results: '', notAchieved: '', tasks: '', obstacles: '' },
            Dept: { culture: '', reconfirm: '', works: '', improvement: '', results: '', notAchieved: '', deepDive: '', tasks: '', obstacles: '' }
        },
        postMeeting: {
            Annual: { sendNotes: false, followUp: false },
            Quarterly: { sendNotes: false, followUp: false },
            Monthly: { sendNotes: false, followUp: false },
            Weekly: { sendNotes: false, followUp: false },
            Dept: { sendNotes: false, followUp: false }
        },
        audit: {
            focusArea: "",
            improvement: ""
        }
    });

    // State for Performance Module
    const [performancePlan, setPerformancePlan] = useState<PerformancePlan>({
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

        if (savedCulture) setCulturePlan(prev => ({ ...prev, ...savedCulture }));
        if (savedLeadership) setLeadershipPlan(prev => ({
            ...prev,
            ...savedLeadership,
            assessment: savedLeadership.assessment || {}
        }));
        if (savedDelegation) setDelegationPlan(prev => ({
            ...prev,
            ...savedDelegation,
            inventory: savedDelegation.inventory || prev.inventory,
            automationPlan: savedDelegation.automationPlan || prev.automationPlan,
            delegationPlanRows: savedDelegation.delegationPlanRows || prev.delegationPlanRows,
            big5Commitment: savedDelegation.big5Commitment || prev.big5Commitment,
            audit: { ...prev.audit, ...(savedDelegation.audit || {}) }
        }));
        if (savedMeetings) setMeetingsPlan(prev => ({ ...prev, ...savedMeetings }));
        if (savedPerformance) setPerformancePlan(prev => ({ ...prev, ...savedPerformance }));
        if (savedApprovals) setApprovals(prev => ({ ...prev, ...savedApprovals }));
    }, []);

    // Save state helper
    const saveAll = ({
        updatedCulture = culturePlan,
        updatedLeadership = leadershipPlan,
        updatedDelegation = delegationPlan,
        updatedMeetings = meetingsPlan,
        updatedPerformance = performancePlan,
        updatedApprovals = approvals
    }: {
        updatedCulture?: CulturePlan,
        updatedLeadership?: LeadershipPlan,
        updatedDelegation?: DelegationPlan,
        updatedMeetings?: MeetingsPlan,
        updatedPerformance?: PerformancePlan,
        updatedApprovals?: typeof approvals
    } = {}) => {
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_CULTURE, updatedCulture);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_LEADERSHIP, updatedLeadership);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_DELEGATION, updatedDelegation);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_MEETINGS, updatedMeetings);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_PERFORMANCE, updatedPerformance);
        saveToStorage(STORAGE_KEYS.MANAGING_BOSS_APPROVALS, updatedApprovals);
    };

    const syncHiringData = () => {
        const hiringTasks = loadFromStorage(STORAGE_KEYS.HIRING_TASKS, []);
        const hiringOrgChart = loadFromStorage(STORAGE_KEYS.HIRING_ORG_CHART, []);

        if (hiringTasks.length === 0 && hiringOrgChart.length === 0) {
            toast({
                title: "No Data Found",
                description: "Ensure you have saved data in the Strategic Hiring Planner first.",
                variant: "destructive"
            });
            return;
        }

        let delegationUpdated = delegationPlan;
        let performanceUpdated = performancePlan;

        if (hiringTasks.length > 0) {
            const bigFiveTasks = hiringTasks
                .filter((t: any) => t.category === 'big5')
                .map((t: any) => t.title);

            const newBigFive = [...delegationPlan.bigFive];
            bigFiveTasks.forEach((task: string, i: number) => {
                if (i < 5) newBigFive[i] = task;
            });

            const belowTheLineTasks = hiringTasks
                .filter((t: any) => t.category === 'below-the-line');

            const newInventory = [...delegationPlan.inventory];
            belowTheLineTasks.forEach((t: any, i: number) => {
                if (i < 10) {
                    newInventory[i] = { task: t.title, action: 'Delegate' };
                }
            });

            delegationUpdated = {
                ...delegationPlan,
                bigFive: newBigFive,
                inventory: newInventory
            };
        }

        if (hiringOrgChart.length > 0) {
            const rolesList = hiringOrgChart
                .map((r: any) => `${r.title} (${r.department || 'No Dept'})`)
                .join('\n');

            performanceUpdated = {
                ...performancePlan,
                orgChart: {
                    ...performancePlan.orgChart,
                    nextLevel: rolesList
                }
            };
        }

        setDelegationPlan(delegationUpdated);
        setPerformancePlan(performanceUpdated);
        saveAll({
            updatedDelegation: delegationUpdated,
            updatedPerformance: performanceUpdated
        });

        toast({
            title: "Data Synced",
            description: "Successfully pulled strategic data from the Hiring Planner.",
        });
    };

    const handleApproval = (module: keyof typeof approvals) => {
        const updated = { ...approvals, [module]: !approvals[module] };
        setApprovals(updated);
        saveAll({ updatedApprovals: updated });
        if (!approvals[module]) {
            toast({
                title: "Strategy Finalized",
                description: `Modular authorization for ${module} is now active.`,
            });
        }
    };

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
                            return (
                                <TabsTrigger
                                    key={t.value}
                                    value={t.value}
                                    className="flex-1 font-black text-[10px] uppercase tracking-[0.2em] transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                                >
                                    <Icon className="w-3.5 h-3.5 mr-2" />
                                    {t.value}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    <TabsContent value="1. Culture" className="focus-visible:ring-0 outline-none">
                        <CultureModule
                            data={culturePlan}
                            onUpdate={(updated) => { setCulturePlan(updated); saveAll({ updatedCulture: updated }); }}
                            isApproved={approvals.culture}
                            onApprove={() => handleApproval('culture')}
                        />
                    </TabsContent>

                    <TabsContent value="2. Leadership" className="focus-visible:ring-0 outline-none">
                        <LeadershipModule
                            data={leadershipPlan}
                            onUpdate={(updated) => { setLeadershipPlan(updated); saveAll({ updatedLeadership: updated }); }}
                            isApproved={approvals.leadership}
                            onApprove={() => handleApproval('leadership')}
                        />
                    </TabsContent>

                    <TabsContent value="3. Delegation" className="focus-visible:ring-0 outline-none">
                        <DelegationModule
                            data={delegationPlan}
                            onUpdate={(updated) => { setDelegationPlan(updated); saveAll({ updatedDelegation: updated }); }}
                            isApproved={approvals.delegation}
                            onApprove={() => handleApproval('delegation')}
                            onSync={syncHiringData}
                        />
                    </TabsContent>

                    <TabsContent value="4. Meetings" className="focus-visible:ring-0 outline-none">
                        <MeetingsModule
                            data={meetingsPlan}
                            onUpdate={(updated) => { setMeetingsPlan(updated); saveAll({ updatedMeetings: updated }); }}
                            isApproved={approvals.meetings}
                            onApprove={() => handleApproval('meetings')}
                        />
                    </TabsContent>

                    <TabsContent value="5. Performance" className="focus-visible:ring-0 outline-none">
                        <PerformanceModule
                            data={performancePlan}
                            onUpdate={(updated) => { setPerformancePlan(updated); saveAll({ updatedPerformance: updated }); }}
                            isApproved={approvals.performance}
                            onApprove={() => handleApproval('performance')}
                            onSync={syncHiringData}
                        />
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
