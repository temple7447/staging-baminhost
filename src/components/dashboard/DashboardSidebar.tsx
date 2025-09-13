import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  PieChart,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "portfolio", label: "Portfolio", icon: TrendingUp },
  { id: "split-tracker", label: "50/30/20 Split", icon: PieChart },
  { id: "goals", label: "Goals", icon: Target },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "library", label: "Library", icon: FileText },
  { id: "assistant", label: "Assistant", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export const DashboardSidebar = ({ currentView, onViewChange }: DashboardSidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  currentView === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};