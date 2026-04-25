import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BUSINESSES } from "@/data/demoData";
import { Fuel, Car, Building2, Wrench, TrendingUp, AlertTriangle } from "lucide-react";

export const FillingStationManagement = () => {
  const fillingStation = BUSINESSES.find(b => b.id === 'filling_station');
  const assets = fillingStation?.assets || [];
  
  // Filter assets by type
  const fuelTanks = assets.filter(a => a.type === 'fuel_tank');
  const officeSpaces = assets.filter(a => a.type === 'office_space');
  const carwash = assets.find(a => a.type === 'carwash');
  const gasStation = assets.find(a => a.type === 'gas_station');

  const getTankLevelColor = (currentLevel: number, capacity: number) => {
    const percentage = (currentLevel / capacity) * 100;
    if (percentage > 70) return 'text-green-600';
    if (percentage > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTankLevelStatus = (currentLevel: number, capacity: number) => {
    const percentage = (currentLevel / capacity) * 100;
    if (percentage > 70) return 'Full';
    if (percentage > 30) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Filling Station Management</h1>
          <p className="text-muted-foreground">4 tanks, offices, carwash & gas station operations</p>
        </div>
        <Button>Schedule Refill</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{fillingStation?.monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600">+8.7% growth rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{fillingStation?.netProfit.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              ROI: {fillingStation?.performance.roi}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tank Capacity</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132,000L</div>
            <div className="text-xs text-muted-foreground">Total across 4 tanks</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fillingStation?.performance.efficiency}%</div>
            <Progress value={fillingStation?.performance.efficiency} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tank Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            Fuel Tank Monitoring
          </CardTitle>
          <CardDescription>Real-time fuel levels and refill schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fuelTanks.map((tank) => {
              const percentage = (tank.currentLevel / tank.capacity) * 100;
              return (
                <Card key={tank.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      {tank.fuelType}
                      <Badge variant={percentage > 70 ? 'default' : percentage > 30 ? 'secondary' : 'destructive'}>
                        {getTankLevelStatus(tank.currentLevel, tank.capacity)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Current Level</span>
                      <span className={getTankLevelColor(tank.currentLevel, tank.capacity)}>
                        {tank.currentLevel.toLocaleString()}L
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{percentage.toFixed(1)}%</span>
                      <span>Capacity: {tank.capacity.toLocaleString()}L</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last Refill: {tank.lastRefill}
                    </div>
                    {percentage < 30 && (
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        Refill Required
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Business Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Office Rentals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Office Rentals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {officeSpaces.map((office, index) => (
              <div key={office.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Office Space {index + 1}</span>
                  <Badge variant="default">Occupied</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>Tenant: {office.tenant}</div>
                  <div>Monthly Rent: ₦{office.monthlyRent.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Carwash Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Carwash Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Daily Revenue</span>
                <span className="font-medium">₦{carwash?.dailyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Revenue</span>
                <span className="font-medium">₦{carwash?.monthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge variant="default">{carwash?.status}</Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Average cars per day: ~30
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gas Station */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              Gas Station
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Revenue</span>
                <span className="font-medium">₦{gasStation?.monthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Cylinders in Stock</span>
                <span className="font-medium">{gasStation?.cylindersInStock}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge variant="default">{gasStation?.status}</Badge>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Refill schedule: Weekly
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Management */}
      <Card>
        <CardHeader>
          <CardTitle>Operations Management</CardTitle>
          <CardDescription>Detailed management of all filling station operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fuel-management" className="space-y-4">
            <TabsList className="dashboard-tabs-list">
              <TabsTrigger value="fuel-management">Fuel Management</TabsTrigger>
              <TabsTrigger value="revenue-tracking">Revenue Tracking</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="staff-management">Staff Management</TabsTrigger>
            </TabsList>

            <TabsContent value="fuel-management" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fuel Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {fuelTanks.map((tank) => (
                        <div key={tank.id} className="flex justify-between items-center">
                          <span>{tank.fuelType}</span>
                          <div className="text-right">
                            <div className="font-medium">{tank.currentLevel.toLocaleString()}L</div>
                            <div className="text-sm text-muted-foreground">
                              {((tank.currentLevel / tank.capacity) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Refill Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Kerosene Tank</span>
                        <Badge variant="destructive">Due Now</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Premium Tank</span>
                        <Badge variant="secondary">Due in 3 days</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>Petrol Tank</span>
                        <Badge variant="default">Due in 5 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue-tracking" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Fuel Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦580,000</div>
                    <div className="text-sm text-muted-foreground">68% of total revenue</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Carwash</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦255,000</div>
                    <div className="text-sm text-muted-foreground">30% of total revenue</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Gas & Others</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦170,000</div>
                    <div className="text-sm text-muted-foreground">20% of total revenue</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <div className="text-center py-8">
                <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Maintenance Schedule</h3>
                <p className="text-muted-foreground">Track equipment maintenance and repairs</p>
                <Button className="mt-4">Schedule Maintenance</Button>
              </div>
            </TabsContent>

            <TabsContent value="staff-management" className="space-y-4">
              <div className="text-center py-8">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Staff Management</h3>
                <p className="text-muted-foreground">Manage attendants, supervisors, and shift schedules</p>
                <Button className="mt-4">View Staff</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};