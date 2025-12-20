import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    ListTodo, Zap, Users, PieChart, Quote, CheckCircle2,
    Check, ShieldCheck, CheckCircle, AlertTriangle
} from "lucide-react";
import { DelegationPlan } from './types';

interface DelegationModuleProps {
    data: DelegationPlan;
    onUpdate: (updated: DelegationPlan) => void;
    isApproved: boolean;
    onApprove: () => void;
    onSync: () => void;
}

const DelegationModule: React.FC<DelegationModuleProps> = ({ data, onUpdate, isApproved, onApprove, onSync }) => {
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
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest px-3 py-1 text-[10px] font-black">Module 3</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
                    Delegate with Confidence
                </h2>
                <div className="h-1.5 w-24 bg-slate-900 mx-auto" />
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic pt-2">
                    "Knowing what should be delegated and what shouldn't is critical to your leadership ability."
                </p>
            </div>

            {/* Step 1: DADD Inventory */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                    <div className="flex items-center gap-3">
                        <ListTodo className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Step 1: The DADD Task Inventory</h3>
                    </div>
                    <Button
                        onClick={onSync}
                        variant="ghost"
                        size="sm"
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2"
                    >
                        <Zap className="w-3 h-3" /> Sync from Hiring Planner
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
                        <p className="text-xs font-bold leading-relaxed italic opacity-80">
                            "List the top 10 things on your plate right now—tasks taking up most of your time and energy."
                        </p>
                        <div className="grid grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-white/10">
                            <div className="col-span-2">Task / Activity</div>
                            <div className="text-center">Action Framework</div>
                        </div>
                        <div className="space-y-3">
                            {data.inventory.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-4 gap-4 items-center group">
                                    <div className="col-span-2 flex gap-3 items-center">
                                        <span className="text-xs font-black opacity-30">{idx + 1}</span>
                                        <Input
                                            value={row.task}
                                            onChange={(e) => {
                                                const newInventory = [...data.inventory];
                                                newInventory[idx] = { ...newInventory[idx], task: e.target.value };
                                                onUpdate({ ...data, inventory: newInventory });
                                            }}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-xs h-9 focus:bg-white/10 transition-all"
                                            placeholder="Enter task name..."
                                        />
                                    </div>
                                    <div className="col-span-2 flex gap-1">
                                        {['Delete', 'Automate', 'Delegate', 'Do'].map((action) => (
                                            <button
                                                key={action}
                                                onClick={() => {
                                                    const newInventory = [...data.inventory];
                                                    newInventory[idx] = { ...newInventory[idx], action: action === row.action ? '' : action };
                                                    onUpdate({ ...data, inventory: newInventory });
                                                }}
                                                className={`flex-1 py-1 px-1 rounded text-[7px] font-black uppercase tracking-tighter transition-all border
                                                    ${row.action === action
                                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg scale-105 z-10'
                                                        : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 2: Automation Plan */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Zap className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Step 2: The Automation Plan</h3>
                </div>

                <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest italic">
                                <th className="p-4 border-r border-slate-800 w-8 text-center pt-5">#</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Task to Automate</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Frequency</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Tools Needed</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Who's Involved</th>
                                <th className="p-4 pt-5">Deadline</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.automationPlan.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                    <td className="p-2 border-r border-slate-100 text-center text-xs font-black text-slate-300 group-hover:text-slate-900">{idx + 1}</td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.task}
                                            onChange={(e) => {
                                                const newPlan = [...data.automationPlan];
                                                newPlan[idx] = { ...newPlan[idx], task: e.target.value };
                                                onUpdate({ ...data, automationPlan: newPlan });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Task..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.frequency}
                                            onChange={(e) => {
                                                const newPlan = [...data.automationPlan];
                                                newPlan[idx] = { ...newPlan[idx], frequency: e.target.value };
                                                onUpdate({ ...data, automationPlan: newPlan });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Daily/Weekly..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.tools}
                                            onChange={(e) => {
                                                const newPlan = [...data.automationPlan];
                                                newPlan[idx] = { ...newPlan[idx], tools: e.target.value };
                                                onUpdate({ ...data, automationPlan: newPlan });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Zapier/AI..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.who}
                                            onChange={(e) => {
                                                const newPlan = [...data.automationPlan];
                                                newPlan[idx] = { ...newPlan[idx], who: e.target.value };
                                                onUpdate({ ...data, automationPlan: newPlan });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Name..."
                                        />
                                    </td>
                                    <td className="p-2">
                                        <Input
                                            value={row.when}
                                            onChange={(e) => {
                                                const newPlan = [...data.automationPlan];
                                                newPlan[idx] = { ...newPlan[idx], when: e.target.value };
                                                onUpdate({ ...data, automationPlan: newPlan });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Target Date..."
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Step 3: Delegation Plan */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <Users className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Step 3: What Will Be Delegated</h3>
                </div>

                <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest italic">
                                <th className="p-4 border-r border-slate-800 w-8 text-center pt-5">#</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Task to Delegate</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Time Spent (Hrs)</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Expected Outcome</th>
                                <th className="p-4 border-r border-slate-800 pt-5">Willing & Able Person</th>
                                <th className="p-4 pt-5">Ready?</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.delegationPlanRows.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                    <td className="p-2 border-r border-slate-100 text-center text-xs font-black text-slate-300 group-hover:text-slate-900">{idx + 1}</td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.task}
                                            onChange={(e) => {
                                                const newRows = [...data.delegationPlanRows];
                                                newRows[idx] = { ...newRows[idx], task: e.target.value };
                                                onUpdate({ ...data, delegationPlanRows: newRows });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Task..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.time}
                                            onChange={(e) => {
                                                const newRows = [...data.delegationPlanRows];
                                                newRows[idx] = { ...newRows[idx], time: e.target.value };
                                                onUpdate({ ...data, delegationPlanRows: newRows });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Hrs..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.outcome}
                                            onChange={(e) => {
                                                const newRows = [...data.delegationPlanRows];
                                                newRows[idx] = { ...newRows[idx], outcome: e.target.value };
                                                onUpdate({ ...data, delegationPlanRows: newRows });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Specify quality..."
                                        />
                                    </td>
                                    <td className="p-2 border-r border-slate-100">
                                        <Input
                                            value={row.who}
                                            onChange={(e) => {
                                                const newRows = [...data.delegationPlanRows];
                                                newRows[idx] = { ...newRows[idx], who: e.target.value };
                                                onUpdate({ ...data, delegationPlanRows: newRows });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Who excels?"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <Input
                                            value={row.ready}
                                            onChange={(e) => {
                                                const newRows = [...data.delegationPlanRows];
                                                newRows[idx] = { ...newRows[idx], ready: e.target.value };
                                                onUpdate({ ...data, delegationPlanRows: newRows });
                                            }}
                                            className="border-none bg-transparent shadow-none text-xs h-8 p-1 focus:ring-0"
                                            placeholder="Yes/No..."
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Step 4: Big 5 Commitment */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                    <PieChart className="w-6 h-6 text-slate-900" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Step 4: Your Big 5 Commitment</h3>
                </div>

                <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10">
                        <PieChart className="w-64 h-64 -mr-16 -mt-16" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <p className="text-sm font-bold italic opacity-90 max-w-2xl">
                            "These are the things you SHOULD be spending your time on. Everything else belongs on the Delete, Automate, or Delegate lists."
                        </p>
                        <div className="bg-white/10 rounded-xl overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-white/10">
                                        <th className="p-4 border-r border-white/10">#</th>
                                        <th className="p-4 border-r border-white/10">"DO IT" Activity</th>
                                        <th className="p-4 border-r border-white/10">Time Required</th>
                                        <th className="p-4 border-r border-white/10">Expected Outcome</th>
                                        <th className="p-4">My Commitment (When)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.big5Commitment.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="p-3 border-r border-white/10 text-xs font-black opacity-40">{idx + 1}</td>
                                            <td className="p-3 border-r border-white/10">
                                                <Input
                                                    value={row.task}
                                                    onChange={(e) => {
                                                        const newCommit = [...data.big5Commitment];
                                                        newCommit[idx] = { ...newCommit[idx], task: e.target.value };
                                                        onUpdate({ ...data, big5Commitment: newCommit });
                                                    }}
                                                    className="bg-transparent border-none text-white placeholder:text-slate-500 text-xs shadow-none h-8 p-0 focus:ring-0"
                                                    placeholder="Focus activity..."
                                                />
                                            </td>
                                            <td className="p-3 border-r border-white/10">
                                                <Input
                                                    value={row.time}
                                                    onChange={(e) => {
                                                        const newCommit = [...data.big5Commitment];
                                                        newCommit[idx] = { ...newCommit[idx], time: e.target.value };
                                                        onUpdate({ ...data, big5Commitment: newCommit });
                                                    }}
                                                    className="bg-transparent border-none text-white placeholder:text-slate-500 text-xs shadow-none h-8 p-0 focus:ring-0"
                                                    placeholder="Hrs..."
                                                />
                                            </td>
                                            <td className="p-3 border-r border-white/10">
                                                <Input
                                                    value={row.outcome}
                                                    onChange={(e) => {
                                                        const newCommit = [...data.big5Commitment];
                                                        newCommit[idx] = { ...newCommit[idx], outcome: e.target.value };
                                                        onUpdate({ ...data, big5Commitment: newCommit });
                                                    }}
                                                    className="bg-transparent border-none text-white placeholder:text-slate-500 text-xs shadow-none h-8 p-0 focus:ring-0"
                                                    placeholder="Value created..."
                                                />
                                            </td>
                                            <td className="p-3">
                                                <Input
                                                    value={row.commitment}
                                                    onChange={(e) => {
                                                        const newCommit = [...data.big5Commitment];
                                                        newCommit[idx] = { ...newCommit[idx], commitment: e.target.value };
                                                        onUpdate({ ...data, big5Commitment: newCommit });
                                                    }}
                                                    className="bg-transparent border-none text-white placeholder:text-slate-500 text-xs shadow-none h-8 p-0 focus:ring-0"
                                                    placeholder="Date/Time..."
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audit & Action steps */}
            <div className="pt-12 space-y-12">
                <section className="space-y-8">
                    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 w-fit">
                        <Quote className="w-6 h-6 text-slate-900" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Delegation Audit</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { key: "bangForBuck", label: "Which tasks give you the biggest bang for your buck?", placeholder: "Identify high-value tasks..." },
                            { key: "timeFreeUp", label: "How much of your own time would you free up?", placeholder: "Calculate hours saved..." },
                            { key: "costEffectiveness", label: "How cost effectively can these be delegated?", placeholder: "Estimate delegation cost vs your rate..." },
                            { key: "eightyPercentChance", label: "Can someone else perform at 80% effectiveness?", placeholder: "Identify potential delegates..." }
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
                                    className="bg-white border-slate-200 text-sm min-h-[80px]"
                                    placeholder={item.placeholder}
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
                                    onClick={() => toggleChecklist(step.key as keyof typeof data.checklist)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white border-slate-200 hover:border-slate-400'}`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${data.checklist[step.key as keyof typeof data.checklist] ? 'bg-slate-400 border-slate-400' : 'border-slate-300 bg-white group-hover:border-slate-900'}`}>
                                        {data.checklist[step.key as keyof typeof data.checklist] && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className={`text-xs font-bold leading-tight ${data.checklist[step.key as keyof typeof data.checklist] ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
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
                                    <CardTitle className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Boss Input: Delegation Audit</CardTitle>
                                    <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-500">Delegation Module Authorization</CardDescription>
                                </div>
                            </div>
                            <Button
                                onClick={onApprove}
                                className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-lg hover:translate-y-[-2px] transition-all`}
                            >
                                {isApproved ? (
                                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Finalized</span>
                                ) : (
                                    "Confirm Delegation Alignment"
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="py-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isApproved ? 'text-green-600' : 'text-slate-400'}`} />
                            <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                                {isApproved
                                    ? "This delegation strategy has been signed off. You're now focused on your high-level activities (The Big 5)."
                                    : "Are you delegating with confidence, or are you stuck doing work that others should be handling? Sign off to finalize your delegation plan."
                                }
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DelegationModule;
