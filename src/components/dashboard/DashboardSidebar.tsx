import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  PieChart,
  Target,
  Building,
  Crown,
  Lock,
  Eye,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePermissions, useFilteredNavigation } from "@/hooks/usePermissions";

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  requiredPermissions?: string[];
  category?: 'core' | 'business' | 'financial' | 'system';
  isPremium?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { 
    id: "overview", 
    label: "Overview", 
    icon: LayoutDashboard,
    category: 'core',
    requiredPermissions: ['view_overview']
  },
  { 
    id: "wallet", 
    label: "Wallet", 
    icon: Wallet,
    category: 'financial',
    requiredPermissions: ['view_wallet'],
    isPremium: true
  },
  { 
    id: "portfolio", 
    label: "Investment Portfolio", 
    icon: TrendingUp,
    category: 'financial',
    requiredPermissions: ['view_portfolio'],
    isPremium: true
  },
  { 
    id: "split-tracker", 
    label: "50/30/20 Split", 
    icon: PieChart,
    category: 'financial',
    requiredPermissions: ['view_split_tracker'],
    isPremium: true
  },
  { 
    id: "goals", 
    label: "Financial Goals", 
    icon: Target,
    category: 'financial',
    requiredPermissions: ['view_goals'],
    isPremium: true
  },
  { 
    id: "contacts", 
    label: "Contacts", 
    icon: Users,
    category: 'system',
    requiredPermissions: ['view_contacts']
  },
  { 
    id: "library", 
    label: "Library", 
    icon: FileText,
    category: 'system',
    requiredPermissions: ['view_library']
  },
  { 
    id: "assistant", 
    label: "Assistant", 
    icon: MessageSquare,
    category: 'system',
    requiredPermissions: ['view_assistant']
  },
  { 
    id: "settings", 
    label: "Settings", 
    icon: Settings,
    category: 'core',
    requiredPermissions: ['view_settings']
  },
  // Business Operations - Only for Manager+ roles
  {
    id: "estate",
    label: "Estate Management",
    icon: Building,
    category: 'business',
    requiredPermissions: ['view_estate'],
    isPremium: true
  },
  {
    id: "filling-station",
    label: "Filling Station",
    icon: Building,
    category: 'business',
    requiredPermissions: ['view_filling_station'],
    isPremium: true
  },
  {
    id: "equipment",
    label: "Equipment Rental",
    icon: Building,
    category: 'business',
    requiredPermissions: ['view_equipment'],
    isPremium: true
  },
  {
    id: "personal-portfolios",
    label: "Personal Life",
    icon: Crown,
    category: 'financial',
    requiredPermissions: ['view_personal_portfolios'],
    isPremium: true
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    category: 'financial',
    requiredPermissions: ['view_reports'],
    isPremium: true
  }
];

export const DashboardSidebar = ({ currentView, onViewChange, isOpen = true, onClose }: DashboardSidebarProps) => {
  const { userRole, hasPermission, canAccessNavigation, rolePriority } = usePermissions();
  
  // Filter sidebar items based on user permissions
  const filteredItems = useFilteredNavigation(sidebarItems);
  
  // Group items by category for better organization
  const groupedItems = {
    core: filteredItems.filter(item => item.category === 'core'),
    financial: filteredItems.filter(item => item.category === 'financial'),
    business: filteredItems.filter(item => item.category === 'business'),
    system: filteredItems.filter(item => item.category === 'system')
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const Icon = item.icon;
    const hasAccess = canAccessNavigation(item.id);
    const isActive = currentView === item.id;
    
    const button = (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-left relative transition-all duration-200 group mb-1",
          "hover:bg-slate-700/50 hover:text-slate-100 hover:border-l-2 hover:border-l-blue-500",
          isActive && "bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white border-l-2 border-l-blue-400 shadow-md",
          !hasAccess && "opacity-60 cursor-not-allowed hover:bg-transparent",
          hasAccess && !isActive && "text-slate-300 hover:text-white"
        )}
        onClick={() => hasAccess && onViewChange(item.id)}
        disabled={!hasAccess}
      >
        <Icon className={cn(
          "w-4 h-4 transition-transform duration-200",
          isActive && "text-blue-400 scale-110",
          !hasAccess && "text-slate-500",
          hasAccess && !isActive && "group-hover:text-blue-400 group-hover:scale-105"
        )} />
        <span className="flex-1 font-medium">{item.label}</span>
        
        {/* Access indicators */}
        {!hasAccess && <Lock className="w-3 h-3 text-slate-500" />}
        {item.isPremium && hasAccess && rolePriority >= 60 && (
          <Crown className="w-3 h-3 text-yellow-400 animate-pulse" />
        )}
        {hasAccess && rolePriority < 40 && (
          <Eye className="w-3 h-3 text-blue-400" />
        )}
        {isActive && (
          <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        )}
      </Button>
    );

    // Show tooltip for restricted items
    if (!hasAccess) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Access restricted for {userRole} role</p>
              {item.requiredPermissions && (
                <p className="text-xs opacity-75">
                  Required: {item.requiredPermissions.join(', ')}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  const renderSection = (title: string, items: SidebarItem[]) => {
    if (items.length === 0) return null;
    
    return (
      <div className="space-y-3 mb-6">
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="h-px bg-gradient-to-r from-slate-600 to-transparent flex-1" />
          <div className="text-xs font-bold text-slate-300 uppercase tracking-widest px-2">
            {title}
          </div>
          <div className="h-px bg-gradient-to-l from-slate-600 to-transparent flex-1" />
        </div>
        <div className="space-y-1 px-2">
          {items.map(renderSidebarItem)}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 overflow-y-auto transition-transform duration-300 ease-in-out z-50",
        "md:relative md:translate-x-0 shadow-xl",
        "fixed left-0 top-16 h-[calc(100vh-4rem)]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4">
        {/* Mobile Close Button */}
        <div className="md:hidden mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* User Role Badge */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-slate-100">Access Level</span>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 font-medium">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Badge>
        </div>

        <nav className="space-y-4">
          {renderSection("Dashboard", groupedItems.core)}
          {renderSection("Financial Management", groupedItems.financial)}
          {renderSection("Business Operations", groupedItems.business)}
          {renderSection("System Tools", groupedItems.system)}
        </nav>

        {/* Access Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Available Features</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold text-green-400">{filteredItems.length} / {sidebarItems.length}</span>
            </div>
          </div>
          <div className="mt-2 w-full bg-slate-600 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(filteredItems.length / sidebarItems.length) * 100}%` }}
            />
          </div>
        </div>
        </div>
      </aside>
    </>
    );
};
