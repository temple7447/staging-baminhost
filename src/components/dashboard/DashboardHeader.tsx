import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FP</span>
            </div>
            <span className="font-bold text-xl text-foreground">FinancePro</span>
            {user && (
              <span className="text-sm text-muted-foreground ml-2">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search transactions, contacts..." 
              className="w-80 pl-10"
            />
          </div>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            {user && (
              <span className="text-sm font-medium">{user.name}</span>
            )}
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};