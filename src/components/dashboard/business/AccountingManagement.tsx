import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Fuel, 
  Sprout, 
  Store, 
  Search, 
  Settings, 
  Bell, 
  CircleDollarSign, 
  TrendingUp, 
  LayoutDashboard, 
  Combine, 
  LibraryBig, 
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  History
} from 'lucide-react';

export const AccountingManagement = () => {
  const [taxRate, setTaxRate] = useState([25]);
  const [commissionRate, setCommissionRate] = useState([7.5]);
  const [payoutFrequency, setPayoutFrequency] = useState('weekly');

  return (
    <div className="flex flex-col gap-6 p-1 md:p-1">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Combine className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Group Accounting Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            <Input 
              placeholder="Search accounts ..." 
              className="pl-10 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 w-64 focus-visible:ring-blue-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
            <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer relative">
              <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">
              <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-blue-500/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Total Assets <Building className="w-3 h-3 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-900 dark:text-white">$42.5M</div>
                <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +5.2% <span className="text-slate-400 dark:text-slate-500 font-normal">vs LY</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-blue-500/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Consolidated Revenue <CircleDollarSign className="w-3 h-3 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-900 dark:text-white">$12.8M</div>
                <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +12.4% <span className="text-slate-400 dark:text-slate-500 font-normal">vs LY</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-500/20 shadow-sm overflow-hidden group hover:border-blue-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  Group Net Profit <TrendingUp className="w-3 h-3 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-slate-900 dark:text-white">$3.2M</div>
                <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +8.1% <span className="text-slate-500 dark:text-slate-500 font-normal">vs target</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Unit Performance Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight underline decoration-blue-500/30 underline-offset-8">Business Unit Performance</h2>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">FY 2024</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sector Cards with Unified Visuals */}
              {[
                { name: 'Estate & Rentals', desc: 'Real Estate Holding', pnl: '$450k', stat: '94%', statLabel: 'Occupancy', icon: Building, color: 'blue' },
                { name: 'Filling Stations', desc: 'Retail Fuel', pnl: '$890k', stat: '12%', statLabel: 'Margin', icon: Fuel, color: 'amber' },
                { name: 'Farm Lands', desc: 'Agri-production', pnl: '$150k', stat: '+4%', statLabel: 'Yield', icon: Sprout, color: 'emerald' },
                { name: 'Vendor Marketplace', desc: 'Digital Commerce', pnl: '$560k', stat: '$2.1M', statLabel: 'GMV', icon: Store, color: 'purple' },
              ].map((sector) => (
                <Card key={sector.name} className="bg-white dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-${sector.color}-600/10 rounded-xl`}>
                        <sector.icon className={`w-6 h-6 text-${sector.color}-500`} />
                      </div>
                      <div>
                        <CardTitle className="text-md font-bold text-slate-900 dark:text-white">{sector.name}</CardTitle>
                        <CardDescription className="text-xs text-slate-500">{sector.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">P&L</div>
                        <div className="text-lg font-black text-slate-900 dark:text-white">{sector.pnl}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{sector.statLabel}</div>
                        <div className="text-lg font-black text-blue-600 dark:text-blue-400">{sector.stat}</div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 font-bold rounded-lg transition-all border-none shadow-none">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Global Controls & Audit */}
        <div className="flex flex-col gap-6">
          <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <CardTitle className="text-sm font-black tracking-widest uppercase text-slate-900 dark:text-white">Global Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-4 text-slate-900 dark:text-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Tax Rate</Label>
                  <span className="text-sm font-black text-blue-600 dark:text-white px-2 py-0.5 bg-blue-50 dark:bg-slate-800 rounded-md ring-1 ring-blue-100 dark:ring-slate-700">{taxRate}%</span>
                </div>
                <Slider 
                  value={taxRate} 
                  onValueChange={setTaxRate} 
                  max={50} 
                  step={0.5} 
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Commission</Label>
                  <span className="text-sm font-black text-blue-600 dark:text-white px-2 py-0.5 bg-blue-50 dark:bg-slate-800 rounded-md ring-1 ring-blue-100 dark:ring-slate-700">{commissionRate}%</span>
                </div>
                <Slider 
                  value={commissionRate} 
                  onValueChange={setCommissionRate} 
                  max={25} 
                  step={0.1} 
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                <Label className="text-[10px] text-slate-500 uppercase font-black block mb-4">Payout Frequency</Label>
                <RadioGroup value={payoutFrequency} onValueChange={setPayoutFrequency} className="gap-2">
                  <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${payoutFrequency === 'weekly' ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-500/50 text-blue-700 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="font-bold cursor-pointer text-sm">Weekly</Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${payoutFrequency === 'bi-monthly' ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-500/50 text-blue-700 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                    <RadioGroupItem value="bi-monthly" id="bi-monthly" />
                    <Label htmlFor="bi-monthly" className="font-bold cursor-pointer text-sm">Bi-Monthly</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                Update Rules
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/60 pb-3 border-b border-slate-100 dark:border-slate-800/50 px-4">
              <CardTitle className="text-xs font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">Financial Audit Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {[
                  { msg: 'Commission Alert', sub: 'Admin_Mark • 2h', color: 'bg-blue-500' },
                  { msg: 'Consolidated Q3', sub: 'System • 5h', color: 'bg-emerald-500' },
                  { msg: 'Failed Payout', sub: 'Automator • 12h', color: 'bg-rose-500' },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer text-slate-900 dark:text-white">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{item.msg}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-500">{item.sub}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
