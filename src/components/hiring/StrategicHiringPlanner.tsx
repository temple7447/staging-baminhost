import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  DollarSign,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Building
} from 'lucide-react';
import { 
  HiringTrigger, 
  OrgChartRole, 
  JobDescription, 
  ProductivityAnalysis,
  TimeEntry,
  DelegationItem
} from '@/types/hiring';
import {
  evaluateHiringTriggers,
  generateJobDescriptionFromTasks,
  calculateHiringROI,
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS,
  formatDate
} from '@/lib/hiringUtils';

export const StrategicHiringPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('triggers');
  
  // Hiring Triggers State
  const [hiringTriggers, setHiringTriggers] = useState<HiringTrigger[]>([
    {
      id: '1',
      name: 'Below the Line Hours',
      condition: 'Weekly hours spent on delegatable tasks',
      threshold: 20,
      currentValue: 0,
      isTriggered: false,
      description: 'When you spend more than 20 hours per week on below-the-line tasks'
    },
    {
      id: '2', 
      name: 'Big 5 Percentage',
      condition: 'Percentage of time spent on Big 5 activities',
      threshold: 50,
      currentValue: 0,
      isTriggered: false,
      description: 'When Big 5 focus drops below 50% of your time'
    },
    {
      id: '3',
      name: 'Potential Savings',
      condition: 'Weekly potential savings from delegation',
      threshold: 100000,
      currentValue: 0,
      isTriggered: false,
      description: 'When potential weekly savings exceed ₦100,000'
    }
  ]);

  // Org Chart State
  const [orgChart, setOrgChart] = useState<OrgChartRole[]>([
    {
      id: '1',
      title: 'CEO/Owner',
      department: 'Executive',
      level: 1,
      isVacant: false,
      estimatedSalary: 2000000,
      requiredSkills: ['Leadership', 'Strategy', 'Vision'],
      responsibilities: ['Strategic planning', 'Vision setting', 'Key decisions'],
      priority: 'high'
    }
  ]);

  // Job Descriptions State
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    department: '',
    type: 'full-time' as JobDescription['type'],
    salaryMin: '',
    salaryMax: '',
    workArrangement: 'hybrid' as JobDescription['workArrangement']
  });

  // Load data from localStorage
  useEffect(() => {
    const savedTriggers = loadFromStorage(STORAGE_KEYS.HOURLY_RATE_CONFIG, null);
    if (savedTriggers) {
      // Update triggers with current productivity data if available
      const timeEntries = loadFromStorage<TimeEntry[]>(STORAGE_KEYS.TIME_ENTRIES, []);
      const hourlyRate = savedTriggers.calculatedRate || 1250;
      
      // Calculate current week's productivity
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const thisWeekEntries = timeEntries.filter(entry => 
        new Date(entry.startTime) >= weekStart
      );

      if (thisWeekEntries.length > 0) {
        const totalMinutes = thisWeekEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
        const belowTheLineMinutes = thisWeekEntries
          .filter(entry => entry.category === 'below-the-line')
          .reduce((sum, entry) => sum + (entry.duration || 0), 0);
        const big5Minutes = thisWeekEntries
          .filter(entry => entry.category === 'big5')
          .reduce((sum, entry) => sum + (entry.duration || 0), 0);

        const belowTheLineHours = belowTheLineMinutes / 60;
        const big5Percentage = totalMinutes > 0 ? (big5Minutes / totalMinutes) * 100 : 0;
        const potentialSavings = belowTheLineHours * hourlyRate;

        const updatedTriggers = hiringTriggers.map(trigger => {
          switch (trigger.name) {
            case 'Below the Line Hours':
              return { ...trigger, currentValue: belowTheLineHours, isTriggered: belowTheLineHours >= trigger.threshold };
            case 'Big 5 Percentage':
              return { ...trigger, currentValue: big5Percentage, isTriggered: big5Percentage <= trigger.threshold };
            case 'Potential Savings':
              return { ...trigger, currentValue: potentialSavings, isTriggered: potentialSavings >= trigger.threshold };
            default:
              return trigger;
          }
        });

        setHiringTriggers(updatedTriggers);
      }
    }

    setOrgChart(loadFromStorage(STORAGE_KEYS.ORG_CHART, orgChart));
    setJobDescriptions(loadFromStorage(STORAGE_KEYS.JOB_DESCRIPTIONS, []));
  }, []);

  const triggeredAlerts = useMemo(() => {
    return hiringTriggers.filter(trigger => trigger.isTriggered);
  }, [hiringTriggers]);

  const addOrgRole = () => {
    const newRole: OrgChartRole = {
      id: `role_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title: 'New Role',
      department: 'Operations',
      level: 2,
      isVacant: true,
      estimatedSalary: 500000,
      requiredSkills: [],
      responsibilities: [],
      priority: 'medium'
    };
    
    const updatedChart = [...orgChart, newRole];
    setOrgChart(updatedChart);
    saveToStorage(STORAGE_KEYS.ORG_CHART, updatedChart);
  };

  const updateOrgRole = (roleId: string, updates: Partial<OrgChartRole>) => {
    const updatedChart = orgChart.map(role => 
      role.id === roleId ? { ...role, ...updates } : role
    );
    setOrgChart(updatedChart);
    saveToStorage(STORAGE_KEYS.ORG_CHART, updatedChart);
  };

  const removeOrgRole = (roleId: string) => {
    const updatedChart = orgChart.filter(role => role.id !== roleId);
    setOrgChart(updatedChart);
    saveToStorage(STORAGE_KEYS.ORG_CHART, updatedChart);
  };

  const createJobDescription = () => {
    if (!newJobForm.title.trim()) return;

    const newJob: JobDescription = {
      id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      roleId: '',
      title: newJobForm.title,
      department: newJobForm.department,
      type: newJobForm.type,
      salaryRange: {
        min: parseInt(newJobForm.salaryMin) || 0,
        max: parseInt(newJobForm.salaryMax) || 0
      },
      responsibilities: [],
      requirements: [],
      preferredQualifications: [],
      culturalAttributes: [],
      benefits: [],
      workArrangement: newJobForm.workArrangement,
      createdAt: new Date(),
      isPublished: false
    };

    // Auto-populate from delegation items if available
    const delegationItems = loadFromStorage<DelegationItem[]>(STORAGE_KEYS.DELEGATION_ITEMS, []);
    if (delegationItems.length > 0) {
      const generated = generateJobDescriptionFromTasks(delegationItems, newJob.title, newJob.department);
      newJob.responsibilities = generated.responsibilities;
      newJob.requirements = generated.requiredSkills;
    }

    const updatedJobs = [...jobDescriptions, newJob];
    setJobDescriptions(updatedJobs);
    saveToStorage(STORAGE_KEYS.JOB_DESCRIPTIONS, updatedJobs);

    // Reset form
    setNewJobForm({
      title: '',
      department: '',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      workArrangement: 'hybrid'
    });
  };

  const updateJobDescription = (jobId: string, updates: Partial<JobDescription>) => {
    const updatedJobs = jobDescriptions.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    );
    setJobDescriptions(updatedJobs);
    saveToStorage(STORAGE_KEYS.JOB_DESCRIPTIONS, updatedJobs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Strategic Hiring Planner</h1>
          <p className="text-sm text-muted-foreground">
            Analyze hiring triggers, build org structure, and create magnetic job descriptions
          </p>
        </div>
        <div className="flex items-center gap-2">
          {triggeredAlerts.length > 0 && (
            <Badge variant="destructive" className="gap-2">
              <AlertTriangle className="w-3 h-3" />
              {triggeredAlerts.length} Alert{triggeredAlerts.length > 1 ? 's' : ''}
            </Badge>
          )}
          <Badge variant="secondary">
            {orgChart.filter(role => role.isVacant).length} Open Role{orgChart.filter(role => role.isVacant).length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="triggers">Hiring Triggers</TabsTrigger>
          <TabsTrigger value="org-chart">Org Chart Builder</TabsTrigger>
          <TabsTrigger value="job-descriptions">Job Descriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="triggers" className="space-y-6">
          {/* Alert Summary */}
          {triggeredAlerts.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-base text-orange-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Hiring Triggers Activated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {triggeredAlerts.map(trigger => (
                    <div key={trigger.id} className="text-sm text-orange-700">
                      <strong>{trigger.name}:</strong> Current value {Math.round(trigger.currentValue).toLocaleString()} 
                      {trigger.name === 'Big 5 Percentage' ? '%' : trigger.name === 'Potential Savings' ? ' ₦' : ' hours'} 
                      (Threshold: {trigger.threshold.toLocaleString()})
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trigger Analysis Cards */}
          <div className="grid gap-4">
            {hiringTriggers.map(trigger => (
              <Card key={trigger.id} className={trigger.isTriggered ? 'border-orange-200' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {trigger.isTriggered ? (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {trigger.name}
                    </CardTitle>
                    <Badge variant={trigger.isTriggered ? 'destructive' : 'secondary'}>
                      {trigger.isTriggered ? 'TRIGGERED' : 'OK'}
                    </Badge>
                  </div>
                  <CardDescription>{trigger.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current: {Math.round(trigger.currentValue).toLocaleString()}
                        {trigger.name === 'Big 5 Percentage' ? '%' : trigger.name === 'Potential Savings' ? ' ₦' : ' hours'}
                      </span>
                      <span>Threshold: {trigger.threshold.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={trigger.name === 'Big 5 Percentage' 
                        ? 100 - (trigger.currentValue / trigger.threshold) * 100 
                        : Math.min((trigger.currentValue / trigger.threshold) * 100, 100)
                      } 
                      className="h-2"
                    />
                  </div>
                  
                  {trigger.isTriggered && (
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-sm font-medium text-orange-800">Recommendation</div>
                      <div className="text-xs text-orange-700 mt-1">
                        {trigger.name === 'Below the Line Hours' && 
                          'Consider hiring an assistant or delegating routine tasks to free up your strategic time.'
                        }
                        {trigger.name === 'Big 5 Percentage' && 
                          'Your focus on strategic Big 5 activities is too low. Delegate more operational tasks.'
                        }
                        {trigger.name === 'Potential Savings' && 
                          'The cost of delegation is now justified. Hiring will provide positive ROI.'
                        }
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ROI Calculator */}
          {triggeredAlerts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hiring ROI Analysis</CardTitle>
                <CardDescription>Financial impact of hiring to address triggered alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium">Weekly Time Savings</div>
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(hiringTriggers.find(t => t.name === 'Below the Line Hours')?.currentValue || 0)}h
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Weekly Value Recovery</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₦{Math.round(hiringTriggers.find(t => t.name === 'Potential Savings')?.currentValue || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Monthly ROI Potential</div>
                    <div className="text-2xl font-bold text-purple-600">
                      ₦{Math.round((hiringTriggers.find(t => t.name === 'Potential Savings')?.currentValue || 0) * 4.33).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="org-chart" className="space-y-6">
          {/* Org Chart Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-500" />
                  <div className="text-sm font-medium">Total Roles</div>
                </div>
                <div className="text-2xl font-bold">{orgChart.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <div className="text-sm font-medium">Filled Positions</div>
                </div>
                <div className="text-2xl font-bold">{orgChart.filter(role => !role.isVacant).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <div className="text-sm font-medium">Open Positions</div>
                </div>
                <div className="text-2xl font-bold">{orgChart.filter(role => role.isVacant).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-500" />
                  <div className="text-sm font-medium">Total Salary Budget</div>
                </div>
                <div className="text-lg font-bold">
                  ₦{Math.round(orgChart.reduce((sum, role) => sum + (role.estimatedSalary || 0), 0) / 12).toLocaleString()}/mo
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Role */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add New Role</CardTitle>
              <CardDescription>Define a new position in your organization structure</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={addOrgRole} className="gap-2">
                <Plus className="w-4 h-4" /> Add Role
              </Button>
            </CardContent>
          </Card>

          {/* Org Chart Display */}
          <div className="space-y-4">
            {orgChart.map(role => (
              <Card key={role.id} className={role.isVacant ? 'border-orange-200' : 'border-green-200'}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={role.isVacant ? 'secondary' : 'default'}>
                        {role.isVacant ? 'VACANT' : 'FILLED'}
                      </Badge>
                      <Badge variant="outline">{role.department}</Badge>
                      <Badge variant="outline">Level {role.level}</Badge>
                    </div>
                    <Button
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeOrgRole(role.id)}
                      title="Remove role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Role Title</label>
                      <Input
                        value={role.title}
                        onChange={(e) => updateOrgRole(role.id, { title: e.target.value })}
                        placeholder="e.g., Operations Manager"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        value={role.department}
                        onChange={(e) => updateOrgRole(role.id, { department: e.target.value })}
                        placeholder="e.g., Operations"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Level</label>
                      <Select 
                        value={role.level.toString()} 
                        onValueChange={(value) => updateOrgRole(role.id, { level: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 (Executive)</SelectItem>
                          <SelectItem value="2">Level 2 (Manager)</SelectItem>
                          <SelectItem value="3">Level 3 (Senior)</SelectItem>
                          <SelectItem value="4">Level 4 (Junior)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select 
                        value={role.priority} 
                        onValueChange={(value: 'high' | 'medium' | 'low') => updateOrgRole(role.id, { priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Annual Salary (₦)</label>
                      <Input
                        type="number"
                        value={role.estimatedSalary?.toString() || ''}
                        onChange={(e) => updateOrgRole(role.id, { estimatedSalary: parseInt(e.target.value) || 0 })}
                        placeholder="500000"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={role.isVacant}
                        onChange={(e) => updateOrgRole(role.id, { isVacant: e.target.checked })}
                        className="rounded"
                      />
                      <label className="text-sm font-medium">Position is vacant</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="job-descriptions" className="space-y-6">
          {/* Job Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Job Description</CardTitle>
              <CardDescription>Generate magnetic job descriptions from your delegation list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Job Title</label>
                  <Input
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({...newJobForm, title: e.target.value})}
                    placeholder="e.g., Executive Assistant"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    value={newJobForm.department}
                    onChange={(e) => setNewJobForm({...newJobForm, department: e.target.value})}
                    placeholder="e.g., Operations"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Employment Type</label>
                  <Select 
                    value={newJobForm.type} 
                    onValueChange={(value: JobDescription['type']) => setNewJobForm({...newJobForm, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Work Arrangement</label>
                  <Select 
                    value={newJobForm.workArrangement} 
                    onValueChange={(value: JobDescription['workArrangement']) => setNewJobForm({...newJobForm, workArrangement: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button onClick={createJobDescription} disabled={!newJobForm.title.trim()} className="gap-2 mt-6">
                    <Plus className="w-4 h-4" /> Create Job Description
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Salary Range - Min (₦)</label>
                  <Input
                    type="number"
                    value={newJobForm.salaryMin}
                    onChange={(e) => setNewJobForm({...newJobForm, salaryMin: e.target.value})}
                    placeholder="300000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Salary Range - Max (₦)</label>
                  <Input
                    type="number"
                    value={newJobForm.salaryMax}
                    onChange={(e) => setNewJobForm({...newJobForm, salaryMax: e.target.value})}
                    placeholder="500000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Descriptions List */}
          <div className="space-y-4">
            {jobDescriptions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground mb-2">No job descriptions created yet</div>
                  <div className="text-xs text-muted-foreground">
                    Create your first job description above to get started
                  </div>
                </CardContent>
              </Card>
            ) : (
              jobDescriptions.map(job => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{job.title}</CardTitle>
                        <CardDescription>
                          {job.department} • {job.type} • {job.workArrangement}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.isPublished ? 'default' : 'secondary'}>
                          {job.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateJobDescription(job.id, { isPublished: !job.isPublished })}
                        >
                          {job.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Salary Range</div>
                      <div className="text-sm text-muted-foreground">
                        ₦{job.salaryRange.min.toLocaleString()} - ₦{job.salaryRange.max.toLocaleString()} annually
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Key Responsibilities</div>
                      <div className="text-sm text-muted-foreground">
                        {job.responsibilities.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {job.responsibilities.slice(0, 3).map((responsibility, idx) => (
                              <li key={idx}>{responsibility}</li>
                            ))}
                            {job.responsibilities.length > 3 && (
                              <li className="text-xs">... and {job.responsibilities.length - 3} more</li>
                            )}
                          </ul>
                        ) : (
                          <div className="text-xs">No responsibilities defined yet</div>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Created: {formatDate(new Date(job.createdAt))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategicHiringPlanner;