import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ESTATE_PROPERTIES } from "@/data/demoData";
import { Building, Users, DollarSign, AlertCircle, TrendingUp } from "lucide-react";

export const EstateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const properties = ESTATE_PROPERTIES;
  
  // Calculate metrics
  const totalUnits = properties.length;
  const occupiedUnits = properties.filter(p => p.status === 'occupied').length;
  const occupancyRate = (occupiedUnits / totalUnits) * 100;
  const monthlyRental = properties.reduce((sum, p) => sum + (p.status === 'occupied' ? p.rentAmount : 0), 0);
  const yearlyRental = monthlyRental * 12;
  
  // Group by location
  const locationStats = {
    balado: properties.filter(p => p.location.includes('Balado')),
    oke: properties.filter(p => p.location.includes('Oke')),
    itskiri: properties.filter(p => p.location.includes('Itskiri')),
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || 
                           property.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-500';
      case 'vacant': return 'bg-yellow-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estate Management</h1>
          <p className="text-muted-foreground">Managing 38 units across 3 locations - ₦18M yearly revenue</p>
        </div>
        <Button>Add New Property</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <div className="text-xs text-muted-foreground">
              {occupiedUnits} occupied, {totalUnits - occupiedUnits} vacant
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
            <Progress value={occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{monthlyRental.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              ₦{yearlyRental.toLocaleString()} yearly
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-xs text-green-600">+2.3% from last month</div>
          </CardContent>
        </Card>
      </div>

      {/* Location Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balado Estate</CardTitle>
            <CardDescription>32 units - Primary location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Occupied</span>
                <span>{locationStats.balado.filter(p => p.status === 'occupied').length}/32</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rent</span>
                <span>₦{(locationStats.balado.filter(p => p.status === 'occupied').length * 45000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Old Tenants</span>
                <span>{locationStats.balado.filter(p => p.tenantType === 'old').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oke Street</CardTitle>
            <CardDescription>2 units - Premium location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Occupied</span>
                <span>{locationStats.oke.filter(p => p.status === 'occupied').length}/2</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rent</span>
                <span>₦{(locationStats.oke.filter(p => p.status === 'occupied').length * 65000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Old Tenants</span>
                <span>{locationStats.oke.filter(p => p.tenantType === 'old').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itskiri</CardTitle>
            <CardDescription>4 units - Growing location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Occupied</span>
                <span>{locationStats.itskiri.filter(p => p.status === 'occupied').length}/4</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rent</span>
                <span>₦{(locationStats.itskiri.filter(p => p.status === 'occupied').length * 55000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Old Tenants</span>
                <span>{locationStats.itskiri.filter(p => p.tenantType === 'old').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Management */}
      <Card>
        <CardHeader>
          <CardTitle>Property Management</CardTitle>
          <CardDescription>Manage all properties, tenants, and rent collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-properties" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all-properties">All Properties</TabsTrigger>
              <TabsTrigger value="rent-collection">Rent Collection</TabsTrigger>
              <TabsTrigger value="tenant-management">Tenant Management</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="all-properties">
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                  <Input
                    placeholder="Search properties or tenants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md"
                  >
                    <option value="all">All Locations</option>
                    <option value="balado">Balado Estate</option>
                    <option value="oke">Oke Street</option>
                    <option value="itskiri">Itskiri</option>
                  </select>
                </div>

                {/* Properties Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProperties.slice(0, 10).map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">
                            {property.location}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{property.tenantName}</div>
                              <Badge variant={property.tenantType === 'old' ? 'default' : 'secondary'}>
                                {property.tenantType}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell>₦{property.rentAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(property.status)}`} />
                              {property.status}
                            </div>
                          </TableCell>
                          <TableCell>{property.nextDue}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rent-collection">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">₦{monthlyRental.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Collected from {occupiedUnits} units</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Outstanding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">₦{(totalUnits - occupiedUnits) * 50000}</div>
                      <div className="text-sm text-muted-foreground">From {totalUnits - occupiedUnits} vacant units</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Overdue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">₦0</div>
                      <div className="text-sm text-muted-foreground">All rents up to date</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenant-management">
              <div className="space-y-4">
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Tenant Management</h3>
                  <p className="text-muted-foreground">Comprehensive tenant profiles, contracts, and communication history</p>
                  <Button className="mt-4">Add New Tenant</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maintenance">
              <div className="space-y-4">
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Maintenance Requests</h3>
                  <p className="text-muted-foreground">Track and manage property maintenance requests</p>
                  <Button className="mt-4">New Request</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};