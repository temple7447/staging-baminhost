import { Bell, Search, Settings, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export const DashboardHeader = ({ onMenuClick, sidebarOpen }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={onMenuClick}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LR</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-foreground">Ledgerly Roots</span>
            {user && (
              <span className="hidden sm:block text-sm text-muted-foreground ml-2">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search - Hidden on Mobile */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search transactions, contacts..." 
              className="w-64 xl:w-80 pl-10"
            />
          </div>
          
          {/* Search Button for Mobile */}
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Search className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            {user && (
              <span className="text-sm font-medium hidden md:block">{user.name}</span>
            )}
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={logout} className="hidden sm:flex">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};