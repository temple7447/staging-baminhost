import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Settings, 
  Database, 
  Search, 
  User, 
  Download,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Import all our material components
import { 
  MaterialsManagementDashboard,
  MaterialsList,
  MaterialDetail,
  UpdateMaterialModal,
  AddMaterialModal
} from '@/components/materials';
import { YouTubePlayer } from '@/components/materials/YouTubePlayer';

// Import hooks for direct demonstration
import {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useGetMaterialsByFolderQuery,
  useSearchMaterialsQuery,
  useGetMyMaterialsQuery,
} from '@/services/materialsApi';

export const MaterialsDemo: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [materialToUpdate, setMaterialToUpdate] = useState(null);

  // Demonstrate hooks usage
  const { data: materialsResponse, isLoading: isLoadingMaterials } = useGetMaterialsQuery({
    limit: 6
  });

  const { data: materialResponse } = useGetMaterialQuery(
    selectedMaterialId || '',
    { skip: !selectedMaterialId }
  );

  const { data: searchResponse } = useSearchMaterialsQuery('strategy', {
    skip: false // Always search for demo
  });

  const { data: myMaterialsResponse } = useGetMyMaterialsQuery();

  const materials = materialsResponse?.data || [];
  const searchResults = searchResponse?.data || [];
  const myMaterials = myMaterialsResponse?.data || [];
  const selectedMaterial = materialResponse?.data;

  const handleMaterialSelect = (materialId: string) => {
    setSelectedMaterialId(materialId);
  };

  const handleEditMaterial = (material: any) => {
    setMaterialToUpdate(material);
    setShowUpdateModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Materials Management System</h1>
          <p className="text-xl text-gray-600">
            Complete demonstration of all 10 material API hooks and components
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              10 API Hooks
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Settings className="h-4 w-4 mr-2" />
              5+ Components
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Full CRUD
            </Badge>
          </div>
        </div>

        {/* API Hooks Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Live API Hooks Status
            </CardTitle>
            <CardDescription>
              Real-time status of all material API hooks currently active on this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-semibold text-green-800">useGetMaterialsQuery</div>
                <div className="text-sm text-green-600">
                  {isLoadingMaterials ? 'Loading...' : `${materials.length} materials loaded`}
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-800">useGetMaterialQuery</div>
                <div className="text-sm text-blue-600">
                  {selectedMaterial ? `Material "${selectedMaterial.title}" loaded` : 'Ready (select material)'}
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-800">useSearchMaterialsQuery</div>
                <div className="text-sm text-purple-600">
                  {searchResults.length} results for "strategy"
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-semibold text-orange-800">useGetMyMaterialsQuery</div>
                <div className="text-sm text-orange-600">
                  {myMaterials.length} personal materials
                </div>
              </div>
              
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="font-semibold text-teal-800">Mutation Hooks</div>
                <div className="text-sm text-teal-600">
                  Ready for Create/Update/Delete
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          <Button onClick={() => setShowAddModal(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add New Material
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
            <Search className="h-5 w-5 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Main Demo Tabs */}
        <Tabs defaultValue="complete-dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="complete-dashboard">Complete Dashboard</TabsTrigger>
            <TabsTrigger value="materials-list">Materials List</TabsTrigger>
            <TabsTrigger value="material-detail">Material Detail</TabsTrigger>
            <TabsTrigger value="youtube-player">YouTube Player</TabsTrigger>
            <TabsTrigger value="search-demo">Search Demo</TabsTrigger>
            <TabsTrigger value="my-materials">My Materials</TabsTrigger>
          </TabsList>

          {/* Complete Dashboard - Shows ALL hooks working together */}
          <TabsContent value="complete-dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Complete Materials Management Dashboard</CardTitle>
                <CardDescription>
                  This single component demonstrates ALL 10 material API hooks working together in a real-world interface.
                  It includes filtering, search, pagination, CRUD operations, analytics, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MaterialsManagementDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials List Demo */}
          <TabsContent value="materials-list">
            <Card>
              <CardHeader>
                <CardTitle>MaterialsList Component</CardTitle>
                <CardDescription>
                  Demonstrates useGetMaterialsQuery with advanced filtering, search, and pagination.
                  Click on any material to see the detail view.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MaterialsList
                  onMaterialSelect={handleMaterialSelect}
                  onMaterialEdit={handleEditMaterial}
                  onMaterialDelete={(id) => alert(`Delete material ${id}`)}
                  onMaterialDownload={(id) => alert(`Download material ${id}`)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Material Detail Demo */}
          <TabsContent value="material-detail">
            <Card>
              <CardHeader>
                <CardTitle>MaterialDetail Component</CardTitle>
                <CardDescription>
                  Demonstrates useGetMaterialQuery, useUpdateMaterialViewMutation, and useDownloadMaterialMutation.
                  {selectedMaterialId ? ` Currently showing material: ${selectedMaterial?.title}` : ' Select a material from the list first.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedMaterialId ? (
                  <MaterialDetail
                    materialId={selectedMaterialId}
                    onEdit={(id) => alert(`Edit material ${id}`)}
                    onDelete={(id) => alert(`Delete material ${id}`)}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Eye className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Material Selected</h3>
                    <p className="text-gray-500 mb-4">
                      Go to the Materials List tab and click on any material to view its details here.
                    </p>
                    <Button variant="outline" onClick={() => {
                      if (materials.length > 0) {
                        handleMaterialSelect(materials[0]._id);
                      }
                    }}>
                      View First Material
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* YouTube Player Demo */}
          <TabsContent value="youtube-player">
            <Card>
              <CardHeader>
                <CardTitle>YouTube Player Component</CardTitle>
                <CardDescription>
                  Inline YouTube video player that displays videos within your platform instead of opening externally.
                  Supports all YouTube URL formats and provides custom controls.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Demo Video 1 */}
                <div>
                  <h4 className="font-semibold mb-3">Example 1: Standard YouTube URL</h4>
                  <YouTubePlayer
                    videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    title="Sample YouTube Video"
                    height="300px"
                    showControls={true}
                    onPlay={() => console.log('Video 1 played')}
                  />
                </div>

                {/* Demo Video 2 */}
                <div>
                  <h4 className="font-semibold mb-3">Example 2: Short YouTube URL (youtu.be)</h4>
                  <YouTubePlayer
                    videoUrl="https://youtu.be/dQw4w9WgXcQ"
                    title="Another Sample Video"
                    height="250px"
                    showControls={true}
                    autoplay={false}
                  />
                </div>

                {/* Demo Video 3 - Error handling */}
                <div>
                  <h4 className="font-semibold mb-3">Example 3: Invalid URL (Error Handling)</h4>
                  <YouTubePlayer
                    videoUrl="https://invalid-youtube-url.com/watch?v=invalid"
                    title="Invalid Video URL Demo"
                    height="200px"
                    onError={(error) => console.error('Demo error:', error)}
                  />
                </div>

                {/* Features List */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">YouTube Player Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">📺 Video Features:</h5>
                        <ul className="text-sm space-y-1 text-gray-700">
                          <li>• Inline YouTube video embedding</li>
                          <li>• Automatic thumbnail loading</li>
                          <li>• Click-to-play functionality</li>
                          <li>• Fullscreen support</li>
                          <li>• Mobile responsive</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">⚙️ Technical Features:</h5>
                        <ul className="text-sm space-y-1 text-gray-700">
                          <li>• URL format validation</li>
                          <li>• Error handling & fallbacks</li>
                          <li>• Custom controls</li>
                          <li>• Loading states</li>
                          <li>• No external redirects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Instructions */}
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold">1. Import the component:</h5>
                        <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                          import {'{ YouTubePlayer }'} from '@/components/materials/YouTubePlayer';
                        </code>
                      </div>
                      <div>
                        <h5 className="font-semibold">2. Use in your component:</h5>
                        <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                          {'<YouTubePlayer videoUrl="https://youtube.com/watch?v=..." title="My Video" />'}
                        </code>
                      </div>
                      <div>
                        <h5 className="font-semibold">3. Supported URL formats:</h5>
                        <ul className="text-sm text-gray-700 mt-1 space-y-1">
                          <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                          <li>• https://youtu.be/VIDEO_ID</li>
                          <li>• https://youtube.com/embed/VIDEO_ID</li>
                          <li>• https://m.youtube.com/watch?v=VIDEO_ID</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Demo */}
          <TabsContent value="search-demo">
            <Card>
              <CardHeader>
                <CardTitle>Search Materials (useSearchMaterialsQuery)</CardTitle>
                <CardDescription>
                  Demonstrates useSearchMaterialsQuery. Currently searching for "strategy".
                  Found {searchResults.length} results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((material) => (
                      <Card key={material._id} className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleMaterialSelect(material._id)}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{material.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="outline">{material.materialType}</Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Eye className="h-3 w-3" />
                              {material.viewCount}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {material.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {material.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {material.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Search Results</h3>
                    <p className="text-gray-500">No materials found for the search term "strategy".</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Materials Demo */}
          <TabsContent value="my-materials">
            <Card>
              <CardHeader>
                <CardTitle>My Materials (useGetMyMaterialsQuery)</CardTitle>
                <CardDescription>
                  Demonstrates useGetMyMaterialsQuery to show materials created by the current user.
                  Found {myMaterials.length} personal materials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myMaterials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myMaterials.map((material) => (
                      <Card key={material._id} className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleMaterialSelect(material._id)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{material.title}</CardTitle>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline">{material.materialType}</Badge>
                                <Badge variant="secondary">Mine</Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditMaterial(material);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Eye className="h-3 w-3" />
                              {material.viewCount} views
                            </div>
                            <div className="flex items-center gap-2">
                              <Download className="h-3 w-3" />
                              {material.downloadCount} downloads
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Personal Materials</h3>
                    <p className="text-gray-500 mb-4">You haven't created any materials yet.</p>
                    <Button onClick={() => setShowAddModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Material
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Hook Usage Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center">🎉 All Material API Hooks Successfully Demonstrated!</CardTitle>
            <CardDescription className="text-center">
              This page showcases all 10 material hooks working in real-world scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-800">✅ Query Hooks Active:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-700">useGetMaterialsQuery</Badge>
                    <span className="text-gray-600">Loading materials list</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-700">useGetMaterialQuery</Badge>
                    <span className="text-gray-600">Selected material details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-purple-700">useSearchMaterialsQuery</Badge>
                    <span className="text-gray-600">Search results for "strategy"</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-orange-700">useGetMyMaterialsQuery</Badge>
                    <span className="text-gray-600">Personal materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-indigo-700">useGetMaterialsByFolderQuery</Badge>
                    <span className="text-gray-600">Available in dashboard</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-800">✅ Mutation Hooks Available:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-700">useCreateMaterialMutation</Badge>
                    <span className="text-gray-600">Add Material button</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-700">useUpdateMaterialMutation</Badge>
                    <span className="text-gray-600">Edit material modal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-red-700">useDeleteMaterialMutation</Badge>
                    <span className="text-gray-600">Delete confirmations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-yellow-700">useUpdateMaterialViewMutation</Badge>
                    <span className="text-gray-600">Auto-triggered on view</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="text-teal-700">useDownloadMaterialMutation</Badge>
                    <span className="text-gray-600">Download buttons</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <AddMaterialModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSuccess={() => {
            setShowAddModal(false);
            window.location.reload(); // Refresh to show new material
          }}
        />

        <UpdateMaterialModal
          material={materialToUpdate}
          open={showUpdateModal}
          onOpenChange={setShowUpdateModal}
          onSuccess={() => {
            setShowUpdateModal(false);
            setMaterialToUpdate(null);
            window.location.reload(); // Refresh to show updated material
          }}
        />
      </div>
    </div>
  );
};