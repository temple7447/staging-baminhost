import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  FileText, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  Mail,
  Phone,
  ExternalLink,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Star,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  Candidate, 
  CandidateNote, 
  HaloResearch, 
  ResearchSource, 
  PowerWord,
  JobDescription,
  HiringMetrics
} from '@/types/hiring';
import {
  getPowerWordsByCategory,
  searchPowerWords,
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS,
  formatDate,
  formatDateTime
} from '@/lib/hiringUtils';

export const CandidateManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('candidates');
  
  // Candidates State
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Halo Research State
  const [haloResearch, setHaloResearch] = useState<HaloResearch[]>([]);
  const [newResearch, setNewResearch] = useState({
    roleId: '',
    painPoint: '',
    customerLanguage: '',
    marketInsight: ''
  });
  
  // Power Words State
  const [powerWords, setPowerWords] = useState<PowerWord[]>([]);
  const [powerWordSearch, setPowerWordSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PowerWord['category']>('action');
  
  // Job Descriptions for dropdown
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);

  // Load data from localStorage
  useEffect(() => {
    setCandidates(loadFromStorage(STORAGE_KEYS.CANDIDATES, []));
    setHaloResearch(loadFromStorage(STORAGE_KEYS.HALO_RESEARCH, []));
    setJobDescriptions(loadFromStorage(STORAGE_KEYS.JOB_DESCRIPTIONS, []));
    
    // Load power words by category
    setPowerWords(getPowerWordsByCategory(selectedCategory));
  }, []);

  // Update power words when category changes
  useEffect(() => {
    if (powerWordSearch.trim()) {
      setPowerWords(searchPowerWords(powerWordSearch));
    } else {
      setPowerWords(getPowerWordsByCategory(selectedCategory));
    }
  }, [selectedCategory, powerWordSearch]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    let filtered = candidates;
    
    if (candidateFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === candidateFilter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.firstName.toLowerCase().includes(query) ||
        candidate.lastName.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [candidates, candidateFilter, searchQuery]);

  // Calculate hiring metrics
  const hiringMetrics = useMemo((): HiringMetrics => {
    if (candidates.length === 0) {
      return {
        timeToHire: 0,
        costPerHire: 0,
        applicantCount: 0,
        interviewToHireRatio: 0,
        sourceEffectiveness: {},
        qualityOfHire: 0,
        retentionRate: 0
      };
    }

    const hiredCandidates = candidates.filter(c => c.status === 'hired');
    const interviewCandidates = candidates.filter(c => c.status === 'interview' || c.status === 'hired');
    
    return {
      timeToHire: 14, // Average days (simplified)
      costPerHire: 250000, // Average cost (simplified)
      applicantCount: candidates.length,
      interviewToHireRatio: interviewCandidates.length > 0 ? hiredCandidates.length / interviewCandidates.length : 0,
      sourceEffectiveness: {}, // Could be expanded
      qualityOfHire: 85, // Simplified metric
      retentionRate: 92 // Simplified metric
    };
  }, [candidates]);

  // Add candidate
  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'appliedAt' | 'lastUpdated' | 'notes'>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: `candidate_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      appliedAt: new Date(),
      lastUpdated: new Date(),
      notes: []
    };
    
    const updatedCandidates = [...candidates, newCandidate];
    setCandidates(updatedCandidates);
    saveToStorage(STORAGE_KEYS.CANDIDATES, updatedCandidates);
  };

  // Update candidate
  const updateCandidate = (candidateId: string, updates: Partial<Candidate>) => {
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, ...updates, lastUpdated: new Date() }
        : candidate
    );
    setCandidates(updatedCandidates);
    saveToStorage(STORAGE_KEYS.CANDIDATES, updatedCandidates);
    
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => prev ? { ...prev, ...updates, lastUpdated: new Date() } : null);
    }
  };

  // Add candidate note
  const addCandidateNote = (candidateId: string, content: string, type: CandidateNote['type'] = 'general') => {
    const newNote: CandidateNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      content,
      type,
      createdAt: new Date(),
      createdBy: 'Current User' // In real app, this would be the logged-in user
    };

    const updatedCandidates = candidates.map(candidate => 
      candidate.id === candidateId 
        ? { 
            ...candidate, 
            notes: [...candidate.notes, newNote],
            lastUpdated: new Date()
          }
        : candidate
    );
    
    setCandidates(updatedCandidates);
    saveToStorage(STORAGE_KEYS.CANDIDATES, updatedCandidates);
    
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => prev ? {
        ...prev,
        notes: [...prev.notes, newNote],
        lastUpdated: new Date()
      } : null);
    }
  };

  // Add halo research
  const addHaloResearch = () => {
    if (!newResearch.roleId) return;

    const research: HaloResearch = {
      id: `research_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      roleId: newResearch.roleId,
      sources: [],
      painPoints: newResearch.painPoint ? [newResearch.painPoint] : [],
      customerLanguage: newResearch.customerLanguage ? [newResearch.customerLanguage] : [],
      marketInsights: newResearch.marketInsight ? [newResearch.marketInsight] : [],
      competitorAnalysis: [],
      createdAt: new Date()
    };

    const updatedResearch = [...haloResearch, research];
    setHaloResearch(updatedResearch);
    saveToStorage(STORAGE_KEYS.HALO_RESEARCH, updatedResearch);

    // Reset form
    setNewResearch({
      roleId: '',
      painPoint: '',
      customerLanguage: '',
      marketInsight: ''
    });
  };

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'hired': return 'bg-green-100 text-green-800';
      case 'offer': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'screening': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Candidate['status']) => {
    switch (status) {
      case 'hired': return <CheckCircle className="w-3 h-3" />;
      case 'offer': return <Star className="w-3 h-3" />;
      case 'interview': return <MessageSquare className="w-3 h-3" />;
      case 'screening': return <Eye className="w-3 h-3" />;
      case 'rejected': return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidate Management</h1>
          <p className="text-sm text-muted-foreground">
            Track applicants, conduct market research, and leverage power words for compelling communications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{candidates.length} Total Candidates</Badge>
          <Badge variant="default">{candidates.filter(c => c.status === 'hired').length} Hired</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="candidates">Applicant Tracking</TabsTrigger>
          <TabsTrigger value="halo-research">Halo Strategy</TabsTrigger>
          <TabsTrigger value="power-words">Power Words</TabsTrigger>
          <TabsTrigger value="metrics">Hiring Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="space-y-6">
          {/* Candidate Overview */}
          <div className="grid md:grid-cols-5 gap-4">
            {(['applied', 'screening', 'interview', 'offer', 'hired'] as const).map(status => (
              <Card key={status}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <div className="text-sm font-medium capitalize">{status}</div>
                  </div>
                  <div className="text-2xl font-bold">
                    {candidates.filter(c => c.status === status).length}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search candidates by name, email, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Select value={candidateFilter} onValueChange={setCandidateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Candidates List */}
          <div className="grid gap-4">
            {filteredCandidates.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground mb-2">
                    {searchQuery.trim() || candidateFilter !== 'all' 
                      ? 'No candidates match your filters' 
                      : 'No candidates yet'
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {!searchQuery.trim() && candidateFilter === 'all' && 
                      'Candidates will appear here as they apply to your job postings'
                    }
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredCandidates.map(candidate => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">
                            {candidate.firstName} {candidate.lastName}
                          </h3>
                          <Badge className={`${getStatusColor(candidate.status)} text-xs flex items-center gap-1`}>
                            {getStatusIcon(candidate.status)}
                            {candidate.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {candidate.email}
                          </div>
                          {candidate.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {candidate.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Applied {formatDate(new Date(candidate.appliedAt))}
                          </div>
                        </div>

                        {candidate.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {candidate.skills.slice(0, 5).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {candidate.experience && (
                          <Badge variant="secondary">
                            {candidate.experience}yr{candidate.experience !== 1 ? 's' : ''} exp
                          </Badge>
                        )}
                        <Select 
                          value={candidate.status} 
                          onValueChange={(value: Candidate['status']) => updateCandidate(candidate.id, { status: value })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="screening">Screening</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    {candidate.notes.length > 0 && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="text-xs font-medium mb-1">Latest Note:</div>
                        <div className="text-xs text-muted-foreground">
                          {candidate.notes[candidate.notes.length - 1].content.slice(0, 100)}
                          {candidate.notes[candidate.notes.length - 1].content.length > 100 ? '...' : ''}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Candidate Detail Modal (simplified) */}
          {selectedCandidate && (
            <Card className="fixed inset-4 z-50 max-h-[90vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </CardTitle>
                    <CardDescription>
                      Applied {formatDate(new Date(selectedCandidate.appliedAt))} • 
                      Last updated {formatDate(new Date(selectedCandidate.lastUpdated))}
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>Email: {selectedCandidate.email}</div>
                    {selectedCandidate.phone && <div>Phone: {selectedCandidate.phone}</div>}
                    {selectedCandidate.linkedinUrl && (
                      <div className="flex items-center gap-1">
                        LinkedIn: 
                        <a href={selectedCandidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Profile <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {selectedCandidate.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div>
                  <h4 className="font-medium mb-3">Notes & Communications</h4>
                  <div className="space-y-3">
                    {selectedCandidate.notes.map(note => (
                      <div key={note.id} className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{note.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(new Date(note.createdAt))} by {note.createdBy}
                          </span>
                        </div>
                        <div className="text-sm">{note.content}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Note Form */}
                  <div className="mt-4 p-4 border rounded-lg">
                    <div className="space-y-3">
                      <Textarea 
                        placeholder="Add a note about this candidate..."
                        rows={3}
                        id={`note-${selectedCandidate.id}`}
                      />
                      <div className="flex gap-2">
                        <Select defaultValue="general">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="screening">Screening</SelectItem>
                            <SelectItem value="reference">Reference</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          size="sm"
                          onClick={() => {
                            const textarea = document.getElementById(`note-${selectedCandidate.id}`) as HTMLTextAreaElement;
                            const select = textarea?.parentElement?.querySelector('select') as HTMLSelectElement;
                            if (textarea?.value.trim()) {
                              addCandidateNote(
                                selectedCandidate.id, 
                                textarea.value.trim(),
                                (select?.value as CandidateNote['type']) || 'general'
                              );
                              textarea.value = '';
                            }
                          }}
                        >
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="halo-research" className="space-y-6">
          {/* Halo Strategy Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base text-blue-800">Halo Strategy Tool</CardTitle>
              <CardDescription className="text-blue-700">
                Research customer pain points and market language to better define roles and attract the right candidates
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Research Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Market Research</CardTitle>
              <CardDescription>
                Gather insights from social media, forums, reviews, and customer interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Role/Position</label>
                <Select value={newResearch.roleId} onValueChange={(value) => setNewResearch({...newResearch, roleId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role to research" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobDescriptions.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Customer Pain Point</label>
                  <Textarea
                    value={newResearch.painPoint}
                    onChange={(e) => setNewResearch({...newResearch, painPoint: e.target.value})}
                    placeholder="e.g., Customers struggle with response times..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Customer Language</label>
                  <Textarea
                    value={newResearch.customerLanguage}
                    onChange={(e) => setNewResearch({...newResearch, customerLanguage: e.target.value})}
                    placeholder="e.g., 'I need someone who gets it' or 'quick turnaround'"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Market Insight</label>
                  <Textarea
                    value={newResearch.marketInsight}
                    onChange={(e) => setNewResearch({...newResearch, marketInsight: e.target.value})}
                    placeholder="e.g., Remote work preference increasing in this role..."
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={addHaloResearch} disabled={!newResearch.roleId} className="gap-2">
                <Plus className="w-4 h-4" /> Add Research
              </Button>
            </CardContent>
          </Card>

          {/* Research Results */}
          <div className="space-y-4">
            {haloResearch.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground mb-2">No market research yet</div>
                  <div className="text-xs text-muted-foreground">
                    Start gathering insights about your target roles and ideal candidates
                  </div>
                </CardContent>
              </Card>
            ) : (
              haloResearch.map(research => (
                <Card key={research.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        Research for {jobDescriptions.find(j => j.id === research.roleId)?.title || 'Unknown Role'}
                      </CardTitle>
                      <Badge variant="outline">
                        {formatDate(new Date(research.createdAt))}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {research.painPoints.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-red-700">Pain Points</h4>
                          <ul className="text-sm space-y-1">
                            {research.painPoints.map((point, idx) => (
                              <li key={idx} className="text-red-600">• {point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {research.customerLanguage.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-blue-700">Customer Language</h4>
                          <ul className="text-sm space-y-1">
                            {research.customerLanguage.map((lang, idx) => (
                              <li key={idx} className="text-blue-600">• "{lang}"</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {research.marketInsights.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-green-700">Market Insights</h4>
                          <ul className="text-sm space-y-1">
                            {research.marketInsights.map((insight, idx) => (
                              <li key={idx} className="text-green-600">• {insight}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="power-words" className="space-y-6">
          {/* Power Words Library */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Power Words Library</CardTitle>
              <CardDescription>
                Compelling words to enhance job descriptions and hiring communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Search power words..."
                  value={powerWordSearch}
                  onChange={(e) => setPowerWordSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={selectedCategory} onValueChange={(value: PowerWord['category']) => setSelectedCategory(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action">Action Words</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft-skill">Soft Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {powerWords.map(word => (
                  <Card key={word.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{word.word}</div>
                        <div className="text-sm text-muted-foreground mb-2">{word.context}</div>
                        <div className="text-xs text-muted-foreground">
                          <strong>Examples:</strong>
                          <ul className="mt-1 space-y-1">
                            {word.examples.slice(0, 2).map((example, idx) => (
                              <li key={idx}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {word.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {powerWords.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground">
                    No power words found for your search
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {/* Hiring Metrics Dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div className="text-sm font-medium">Time to Hire</div>
                </div>
                <div className="text-2xl font-bold">{hiringMetrics.timeToHire} days</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <div className="text-sm font-medium">Interview to Hire</div>
                </div>
                <div className="text-2xl font-bold">{Math.round(hiringMetrics.interviewToHireRatio * 100)}%</div>
                <div className="text-xs text-muted-foreground">Success rate</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div className="text-sm font-medium">Quality of Hire</div>
                </div>
                <div className="text-2xl font-bold">{hiringMetrics.qualityOfHire}%</div>
                <div className="text-xs text-muted-foreground">Performance rating</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <div className="text-sm font-medium">Retention Rate</div>
                </div>
                <div className="text-2xl font-bold">{hiringMetrics.retentionRate}%</div>
                <div className="text-xs text-muted-foreground">12-month</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hiring Pipeline Analysis</CardTitle>
              <CardDescription>Track your recruitment funnel effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(['applied', 'screening', 'interview', 'offer', 'hired'] as const).map((status, index) => {
                  const count = candidates.filter(c => c.status === status).length;
                  const percentage = candidates.length > 0 ? (count / candidates.length) * 100 : 0;
                  
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{status}</span>
                        <span>{count} candidates ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cost Analysis</CardTitle>
              <CardDescription>Hiring investment and ROI metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-medium mb-2">Cost per Hire</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₦{hiringMetrics.costPerHire.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Including advertising, screening, interviews
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Total Investment</div>
                  <div className="text-2xl font-bold text-purple-600">
                    ₦{(hiringMetrics.costPerHire * candidates.filter(c => c.status === 'hired').length).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    This period
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">ROI Estimate</div>
                  <div className="text-2xl font-bold text-green-600">285%</div>
                  <div className="text-xs text-muted-foreground">
                    12-month value creation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateManagement;