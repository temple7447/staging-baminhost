import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LIBRARY_CONTENT } from "@/data/demoData";
import { useAuth } from "@/contexts/AuthContext";
import { CategoryManager } from "../library/CategoryManager";
import { 
  BookOpen, 
  FileText, 
  Headphones, 
  Video, 
  Image, 
  Link2,
  AlertTriangle,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Target,
  Shield
} from "lucide-react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/services/categoriesApi";
import { useToast } from "@/hooks/use-toast";

export const LibraryDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const library = LIBRARY_CONTENT;

  // Filter content based on user role and access
  const getAccessibleContent = () => {
    return library.filter(content => 
      content.targetAudience.includes(user?.role || 'owner')
    );
  };

  const accessibleContent = getAccessibleContent();

  // Filter content based on search and filters
  const filteredContent = accessibleContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'diagram': return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'technical': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'vendor': return 'bg-green-100 text-green-800';
      case 'customer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateCategory = async (id: string, updates: any) => {
    try {
      await updateCategory({ id, ...updates }).unwrap();
      toast({
        title: "Category updated",
        description: "The category has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Statistics
  const totalContent = accessibleContent.length;
  const contentByType = {
    text: accessibleContent.filter(c => c.type === 'text').length,
    audio: accessibleContent.filter(c => c.type === 'audio').length,
    video: accessibleContent.filter(c => c.type === 'video').length,
    diagram: accessibleContent.filter(c => c.type === 'diagram').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Library</h1>
          <p className="text-muted-foreground">
            Central knowledge hub with cross-referencing - {user?.role} access level
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Add Content</Button>
          <Button>Manage Categories</Button>
        </div>
      </div>

      {/* Library Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContent}</div>
            <div className="text-xs text-muted-foreground">Available to you</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cross References</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accessibleContent.reduce((sum, c) => sum + c.crossReferences.length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Content connections</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contradictions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accessibleContent.reduce((sum, c) => sum + c.contradictions.length, 0)}
            </div>
            <div className="text-xs text-red-600">Flagged for review</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Types</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="text-xs text-muted-foreground">Text, Audio, Video, Diagrams</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Content Distribution
          </CardTitle>
          <CardDescription>Content breakdown by type and category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(contentByType).map(([type, count]) => (
              <Card key={type}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {getContentTypeIcon(type)}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-xs text-muted-foreground">items</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-Based Content Access */}
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Content Access</CardTitle>
          <CardDescription>Content availability by user role</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role-Based Content Access */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Super Admin Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Super Admin Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Strategic Guides</span>
                    <span className="font-medium">
                      {library.filter(c => c.targetAudience.includes('super_admin') && c.category === 'strategic').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Management</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Decision Frameworks</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  4% Rule, 1/3rd Rule, Strategic Decision Making
                </div>
              </CardContent>
            </Card>

            {/* Admin Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Management</span>
                    <span className="font-medium">
                      {library.filter(c => c.targetAudience.includes('admin') && c.category === 'system').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Audit Logs</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Settings</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  User management, system settings, audit trails
                </div>
              </CardContent>
            </Card>

            {/* Manager Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Manager Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Operational Systems</span>
                    <span className="font-medium">
                      {library.filter(c => c.targetAudience.includes('manager') && c.category === 'operational').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Leadership Guides</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Process Documentation</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Hire Like a Boss, Sell Like Crazy, MLAB Leadership
                </div>
              </CardContent>
            </Card>

            {/* Vendor Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Vendor Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technical Guides</span>
                    <span className="font-medium">
                      {library.filter(c => c.targetAudience.includes('vendor') && c.category === 'technical').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Proof of Work</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tutorials</span>
                    <span className="font-medium">15</span>
                  </div>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Upload templates, quality standards, delivery guides
                </div>
              </CardContent>
            </Card>

            {/* Customer Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Customer Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Self-Diagnosis</span>
                    <span className="font-medium">
                      {library.filter(c => c.targetAudience.includes('customer')).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>How-to Guides</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>FAQs</span>
                    <span className="font-medium">25</span>
                  </div>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  System walkthroughs, troubleshooting, support docs
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Content Library */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Browse and manage knowledge base content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="space-y-4">
            <TabsList>
              <TabsTrigger value="browse">Browse Content</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="cross-references">Cross References</TabsTrigger>
              <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
              <TabsTrigger value="management">Content Management</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="text">Text</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="diagram">Diagram</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="strategic">Strategic</option>
                  <option value="operational">Operational</option>
                  <option value="technical">Technical</option>
                  <option value="training">Training</option>
                </select>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((content) => (
                  <Card key={content.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getContentTypeIcon(content.type)}
                          {content.title}
                        </CardTitle>
                        <Badge className={getCategoryColor(content.category)}>
                          {content.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {content.content}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {content.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Target Audience:</div>
                        <div className="flex flex-wrap gap-1">
                          {content.targetAudience.map((audience) => (
                            <Badge key={audience} className={getAudienceColor(audience)}>
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Cross References */}
                      {content.crossReferences.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium flex items-center gap-1">
                            <Link2 className="h-3 w-3" />
                            References ({content.crossReferences.length})
                          </div>
                        </div>
                      )}

                      {/* Contradictions */}
                      {content.contradictions.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            Contradictions ({content.contradictions.length})
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Updated {content.lastUpdated}
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <CategoryManager 
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
              />
            </TabsContent>

            <TabsContent value="cross-references" className="space-y-4">
              <div className="text-center py-8">
                <Link2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Cross-Reference System</h3>
                <p className="text-muted-foreground">
                  Automatic content linking and relationship mapping
                </p>
                <Button className="mt-4">View Connections</Button>
              </div>
            </TabsContent>

            <TabsContent value="contradictions" className="space-y-4">
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Content Contradictions</h3>
                <p className="text-muted-foreground">
                  System-detected conflicts between content pieces
                </p>
                <Button className="mt-4">Review Contradictions</Button>
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Content Upload</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content Type</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="">Select type...</option>
                        <option value="text">Text Document</option>
                        <option value="audio">Audio File</option>
                        <option value="video">Video Content</option>
                        <option value="diagram">Diagram/Image</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="">Select category...</option>
                        <option value="strategic">Strategic</option>
                        <option value="operational">Operational</option>
                        <option value="technical">Technical</option>
                        <option value="training">Training</option>
                      </select>
                    </div>
                    <Button className="w-full">Upload Content</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Auto-Update Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cross-referencing</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Contradiction detection</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Content updates</span>
                        <Badge variant="secondary">Manual</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};