import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw, Plus, Trash2, ArrowUp, ArrowDown, Clock, Play, Square, TrendingUp, DollarSign, Target } from "lucide-react";
import { 
  TimeEntry, 
  TaskItem, 
  DelegationItem, 
  HourlyRateConfig, 
  ProductivityAnalysis 
} from '@/types/hiring';
import {
  calculateDuration,
  formatDuration,
  calculateTimeValue,
  updateHourlyRateConfig,
  analyzeProductivity,
  createTask,
  createDelegationItem,
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS,
  formatDate
} from '@/lib/hiringUtils';
import WhatsYourNumber from './WhatsYourNumber';
import Level7LifeMotivation from './Level7LifeMotivation';

interface BigItem {
  id: string;
  title: string;
  description?: string;
}

const STORAGE_KEY = "big5_items_v2";

const createItem = (): BigItem => ({
  id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  title: "",
  description: "",
});

export const Big5Dashboard: React.FC = () => {
  // Existing Big5 state
  const [items, setItems] = useState<BigItem[]>([
    createItem(),
    createItem(),
    createItem(),
    createItem(),
    createItem(),
  ]);

  // User's target number for Level 7 Life integration
  const [userTargetAmount, setUserTargetAmount] = useState<string>('');

  // King's Audit Dashboard state - start with 'number' tab to encourage setting target first
  const [activeTab, setActiveTab] = useState('number');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [delegationItems, setDelegationItems] = useState<DelegationItem[]>([]);
  const [hourlyRateConfig, setHourlyRateConfig] = useState<HourlyRateConfig>({
    weeklyIncome: 50000,
    workHoursPerWeek: 40,
    calculatedRate: 1250,
    lastUpdated: new Date()
  });
  const [currentTimeEntry, setCurrentTimeEntry] = useState<TimeEntry | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'big5' | 'below-the-line'>('big5');
  const [weeklyIncomeInput, setWeeklyIncomeInput] = useState('50000');
  const [workHoursInput, setWorkHoursInput] = useState('40');

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load Big 5 from storage", e);
    }

    // Load King's Audit data
    setTimeEntries(loadFromStorage(STORAGE_KEYS.TIME_ENTRIES, []));
    setTasks(loadFromStorage(STORAGE_KEYS.TASKS, []));
    setDelegationItems(loadFromStorage(STORAGE_KEYS.DELEGATION_ITEMS, []));
    const savedConfig = loadFromStorage(STORAGE_KEYS.HOURLY_RATE_CONFIG, null);
    if (savedConfig) {
      setHourlyRateConfig(savedConfig);
      setWeeklyIncomeInput(savedConfig.weeklyIncome.toString());
      setWorkHoursInput(savedConfig.workHoursPerWeek.toString());
    }

    // Load user's target number
    try {
      const targetNumber = localStorage.getItem(`user_target_number_v1_${user?.id}`);
      if (targetNumber) {
        const parsed = JSON.parse(targetNumber);
        setUserTargetAmount(parsed.targetAmount || '');
      }
    } catch (error) {
      console.warn('Failed to load user target number', error);
    }
  }, []);

  const itemsCount = items.length;
  const filledCount = useMemo(() => items.filter(i => i.title?.trim()).length, [items]);

  // Calculate productivity analytics
  const productivityAnalysis = useMemo(() => {
    return analyzeProductivity(timeEntries, hourlyRateConfig.calculatedRate);
  }, [timeEntries, hourlyRateConfig.calculatedRate]);

  const completedTasks = useMemo(() => tasks.filter(t => t.isCompleted), [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(t => !t.isCompleted), [tasks]);
  const big5Tasks = useMemo(() => tasks.filter(t => t.category === 'big5'), [tasks]);
  const belowTheLineTasks = useMemo(() => tasks.filter(t => t.category === 'below-the-line'), [tasks]);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const reset = () => {
    setItems([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  // King's Audit functions
  const startTimeTracking = (task: string, category: 'big5' | 'below-the-line') => {
    if (currentTimeEntry) {
      stopTimeTracking();
    }

    const newEntry: TimeEntry = {
      id: `time_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      task,
      category,
      startTime: new Date(),
      hourlyRate: hourlyRateConfig.calculatedRate
    };
    
    setCurrentTimeEntry(newEntry);
  };

  const stopTimeTracking = () => {
    if (!currentTimeEntry) return;

    const endTime = new Date();
    const duration = calculateDuration(currentTimeEntry.startTime, endTime);
    const value = calculateTimeValue(duration, hourlyRateConfig.calculatedRate);

    const completedEntry: TimeEntry = {
      ...currentTimeEntry,
      endTime,
      duration,
      value
    };

    const updatedEntries = [...timeEntries, completedEntry];
    setTimeEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.TIME_ENTRIES, updatedEntries);
    setCurrentTimeEntry(null);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const task = createTask(newTaskTitle, newTaskCategory);
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted, completedAt: !task.isCompleted ? new Date() : undefined }
        : task
    );
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  };

  const moveTaskToDelegation = (task: TaskItem) => {
    const delegationItem = createDelegationItem(
      task.title,
      hourlyRateConfig.calculatedRate * 2, // estimated 2 hours
      'within-week'
    );
    
    const updatedDelegation = [...delegationItems, delegationItem];
    setDelegationItems(updatedDelegation);
    saveToStorage(STORAGE_KEYS.DELEGATION_ITEMS, updatedDelegation);

    // Mark task as delegated
    const updatedTasks = tasks.map(t => 
      t.id === task.id ? { ...t, isDelegated: true } : t
    );
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  };

  const updateHourlyRate = () => {
    const weeklyIncome = parseFloat(weeklyIncomeInput) || 0;
    const workHours = parseFloat(workHoursInput) || 0;
    
    const newConfig = updateHourlyRateConfig(weeklyIncome, workHours);
    setHourlyRateConfig(newConfig);
    saveToStorage(STORAGE_KEYS.HOURLY_RATE_CONFIG, newConfig);
  };

  const addItem = () => setItems(prev => [...prev, createItem()]);
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const moveItem = (index: number, dir: -1 | 1) => {
    setItems(prev => {
      const next = [...prev];
      const newIndex = index + dir;
      if (newIndex < 0 || newIndex >= next.length) return prev;
      const [spliced] = next.splice(index, 1);
      next.splice(newIndex, 0, spliced);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Level 7 Life Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Define your number, focus on your Big 5, and systematically scale to your Level 7 Life
          </p>
        </div>
        <div className="flex items-center gap-2">
          {userTargetAmount && (
            <Badge variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200">
              <Target className="w-3 h-3" />
              Target: {userTargetAmount}
            </Badge>
          )}
          {currentTimeEntry && (
            <Badge variant="destructive" className="gap-2">
              <Clock className="w-3 h-3" />
              Tracking: {currentTimeEntry.task}
            </Badge>
          )}
          <Badge variant="secondary">₦{hourlyRateConfig.calculatedRate.toLocaleString()}/hr</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="number">Your Number</TabsTrigger>
          <TabsTrigger value="big5">Big 5 Items</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="delegation">Delegation List</TabsTrigger>
        </TabsList>

        <TabsContent value="number" className="space-y-6">
          {/* What's Your Number Section */}
          <WhatsYourNumber />
          
          {/* Level 7 Life Motivation */}
          <Level7LifeMotivation 
            userTargetAmount={userTargetAmount}
            currentLevel={2} // You can make this dynamic based on user progress
          />
        </TabsContent>

        <TabsContent value="big5" className="space-y-6">

          {/* Big 5 Overview with Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <div className="text-sm font-medium">Big 5 Items</div>
                </div>
                <div className="text-2xl font-bold">{filledCount}/{itemsCount}</div>
                <div className="text-xs text-muted-foreground">completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <div className="text-sm font-medium">Big 5 Focus</div>
                </div>
                <div className="text-2xl font-bold">{Math.round(productivityAnalysis.big5Percentage)}%</div>
                <div className="text-xs text-muted-foreground">of tracked time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-yellow-500" />
                  <div className="text-sm font-medium">Potential Savings</div>
                </div>
                <div className="text-2xl font-bold">₦{Math.round(productivityAnalysis.potentialSavings).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">delegation opportunity</div>
              </CardContent>
            </Card>
          </div>

          {/* Display grid similar to the image */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Your Big Items</CardTitle>
                  <CardDescription>Keep each item crisp and action-oriented.</CardDescription>
                </div>
                <Button size="sm" onClick={addItem} className="gap-2">
                  <Plus className="w-4 h-4" /> Add item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No items yet. Click "Add item" to get started.</div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {items.map((item, i) => (
                    <div key={item.id} className="rounded-lg border bg-card p-4">
                      <div className="text-sm font-medium mb-2">{i + 1}. {item.title?.trim() || "Add a title"}</div>
                      <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {item.description?.trim() || "Optional description"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Edit your list</CardTitle>
              <CardDescription>Write what you own and will focus on. Add, remove, and reorder freely.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {items.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Your list is empty.
                  <Button size="sm" variant="outline" onClick={addItem} className="gap-2">
                    <Plus className="w-4 h-4" /> Add first item
                  </Button>
                </div>
              )}

              {items.map((item, idx) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{idx + 1}. Title</div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => moveItem(idx, -1)} disabled={idx === 0} title="Move up">
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} title="Move down">
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} title="Remove">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    placeholder="e.g. Create and publish content & be the face of the business"
                    value={item.title}
                    onChange={(e) => {
                      const next = [...items];
                      next[idx] = { ...item, title: e.target.value };
                      setItems(next);
                    }}
                  />
                  <div className="text-xs text-muted-foreground">Optional note</div>
                  <Textarea
                    placeholder="Add details if helpful (e.g., frequency, scope, ownership)"
                    value={item.description}
                    onChange={(e) => {
                      const next = [...items];
                      next[idx] = { ...item, description: e.target.value };
                      setItems(next);
                    }}
                  />
                  {idx < items.length - 1 && <Separator className="my-4" />}
                </div>
              ))}

              <div className="flex flex-wrap gap-2">
                <Button onClick={save} className="gap-2">
                  <Save className="w-4 h-4" /> Save
                </Button>
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RefreshCw className="w-4 h-4" /> Clear all
                </Button>
                <Button variant="outline" onClick={addItem} className="gap-2">
                  <Plus className="w-4 h-4" /> Add another
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-tracking" className="space-y-6">
          {/* Hourly Rate Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hourly Rate Calculator</CardTitle>
              <CardDescription>Configure your hourly rate for accurate time tracking value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Weekly Income (₦)</label>
                  <Input
                    type="number"
                    value={weeklyIncomeInput}
                    onChange={(e) => setWeeklyIncomeInput(e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Work Hours/Week</label>
                  <Input
                    type="number"
                    value={workHoursInput}
                    onChange={(e) => setWorkHoursInput(e.target.value)}
                    placeholder="40"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <Button onClick={updateHourlyRate} className="gap-2">
                    <Save className="w-4 h-4" /> Update Rate
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium">Current Hourly Rate: ₦{hourlyRateConfig.calculatedRate.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Last updated: {formatDate(new Date(hourlyRateConfig.lastUpdated))}</div>
              </div>
            </CardContent>
          </Card>

          {/* Active Time Tracking */}
          {currentTimeEntry && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Active Time Entry</CardTitle>
                <CardDescription>Currently tracking: {currentTimeEntry.task}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Task: {currentTimeEntry.task}</div>
                    <div className="text-xs text-muted-foreground">
                      Category: {currentTimeEntry.category === 'big5' ? 'Big 5' : 'Below the Line'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Started: {new Date(currentTimeEntry.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                  <Button onClick={stopTimeTracking} variant="destructive" className="gap-2">
                    <Square className="w-4 h-4" /> Stop Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Time Entry Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Start Time Tracking</CardTitle>
              <CardDescription>Track your activities to analyze productivity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => startTimeTracking('Big 5 Activity', 'big5')}
                  disabled={!!currentTimeEntry}
                  className="gap-2 h-20 flex-col"
                  variant="outline"
                >
                  <Target className="w-6 h-6 text-blue-500" />
                  <div className="text-center">
                    <div className="font-medium">Track Big 5 Activity</div>
                    <div className="text-xs text-muted-foreground">High-value strategic work</div>
                  </div>
                </Button>
                <Button
                  onClick={() => startTimeTracking('Below the Line Task', 'below-the-line')}
                  disabled={!!currentTimeEntry}
                  className="gap-2 h-20 flex-col"
                  variant="outline"
                >
                  <Clock className="w-6 h-6 text-orange-500" />
                  <div className="text-center">
                    <div className="font-medium">Track Below the Line</div>
                    <div className="text-xs text-muted-foreground">Delegatable tasks</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Time Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Time Entries</CardTitle>
              <CardDescription>Your tracked activities and their value</CardDescription>
            </CardHeader>
            <CardContent>
              {timeEntries.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No time entries yet. Start tracking your activities above.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {timeEntries.slice(-10).reverse().map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="text-sm font-medium">{entry.task}</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.category === 'big5' ? '🎯 Big 5' : '⏰ Below the Line'} • 
                          {formatDuration(entry.duration || 0)} • 
                          {formatDate(new Date(entry.startTime))}
                        </div>
                      </div>
                      <div className="text-sm font-medium">₦{(entry.value || 0).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          {/* Task Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add New Task</CardTitle>
              <CardDescription>Categorize tasks as Big 5 (strategic) or Below the Line (delegatable)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task description..."
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <Select value={newTaskCategory} onValueChange={(value: 'big5' | 'below-the-line') => setNewTaskCategory(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="big5">🎯 Big 5</SelectItem>
                    <SelectItem value="below-the-line">⏰ Below the Line</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addTask} disabled={!newTaskTitle.trim()} className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Task Overview */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Big 5 Tasks ({big5Tasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                {big5Tasks.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No Big 5 tasks yet</div>
                ) : (
                  big5Tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="rounded"
                        />
                        <span className={`text-sm ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Below the Line Tasks ({belowTheLineTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                {belowTheLineTasks.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No delegation candidates yet</div>
                ) : (
                  belowTheLineTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="rounded"
                        />
                        <span className={`text-sm ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                      {!task.isDelegated && !task.isCompleted && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveTaskToDelegation(task)}
                          className="gap-1"
                        >
                          <ArrowUp className="w-3 h-3" /> Delegate
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delegation" className="space-y-6">
          {/* Delegation Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delegation List</CardTitle>
              <CardDescription>
                Tasks ready for delegation or outsourcing. Total estimated cost: ₦{delegationItems.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {delegationItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-sm text-muted-foreground mb-4">
                    No items in delegation list yet.
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Move "Below the Line" tasks here to prepare for delegation.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {delegationItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.task}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Estimated Cost: ₦{item.estimatedCost.toLocaleString()}</span>
                            <span>Urgency: {item.urgency.replace('-', ' ')}</span>
                            <span>Added: {formatDate(new Date(item.createdAt))}</span>
                          </div>
                          {item.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.requiredSkills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant={item.urgency === 'immediate' ? 'destructive' : item.urgency === 'within-week' ? 'default' : 'secondary'}
                        >
                          {item.urgency}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hiring Recommendation */}
          {delegationItems.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base text-blue-800">Hiring Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-700">
                  <strong>Analysis:</strong> You have {delegationItems.length} tasks ready for delegation with 
                  estimated total cost of ₦{delegationItems.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString()}.
                </div>
                <div className="text-sm text-blue-700 mt-2">
                  <strong>Recommendation:</strong> {productivityAnalysis.recommendedAction.replace('-', ' ').toUpperCase()}
                </div>
                <div className="text-sm text-blue-700 mt-2">
                  <strong>Potential Monthly Savings:</strong> ₦{Math.round(productivityAnalysis.potentialSavings * 4.33).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Big5Dashboard;
