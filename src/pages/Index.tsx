import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { LoginPage } from "@/components/auth/LoginPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { Big7Dashboard } from "@/components/dashboard/Big7Dashboard";
import { ManagerDashboard } from "@/components/dashboard/ManagerDashboard";
import { VendorDashboard } from "@/components/dashboard/VendorDashboard";
import { CustomerDashboard } from "@/components/dashboard/CustomerDashboard";
import { WalletDashboard } from "@/components/dashboard/WalletDashboard";
import { EstateManagement } from "@/components/dashboard/business/EstateManagement";
import { FillingStationManagement } from "@/components/dashboard/business/FillingStationManagement";
import { EquipmentManagement } from "@/components/dashboard/business/EquipmentManagement";
import { CRMDashboard } from "@/components/dashboard/CRMDashboard";
import { LibraryDashboard } from "@/components/dashboard/LibraryDashboard";
import { AssistantDashboard } from "@/components/dashboard/AssistantDashboard";
import { ReportsDashboard } from "@/components/dashboard/ReportsDashboard";
import { GreenThemeShowcase } from "@/components/GreenThemeShowcase";
import { ProtectedComponent } from "@/components/auth/ProtectedComponent";
import { SettingsPage } from "@/components/auth/SettingsPage";
import { PortfolioDashboard, PersonalLifePortfolios } from "@/components/portfolio";
import { SplitTracker } from "@/components/budget/SplitTracker";
import { GoalsDashboard } from "@/components/goals/GoalsDashboard";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { canAccessNavigation, hasPermission } = usePermissions();
  const [currentView, setCurrentView] = useState("overview");

  // Show login page if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Render different dashboards based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'owner':
        return <OwnerDashboard />;
      case 'big7':
        return <Big7Dashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <OwnerDashboard />;
    }
  };

  const renderCurrentView = () => {
    // Check if user has permission to access current view
    if (!canAccessNavigation(currentView)) {
      return (
        <ProtectedComponent
          feature={`${currentView} page`}
          showUpgradePrompt={true}
          className="max-w-2xl mx-auto mt-8"
        >
          <div>This content should not be visible</div>
        </ProtectedComponent>
      );
    }

    switch (currentView) {
      case "overview":
        return renderDashboard();
      case "wallet":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_wallet']}
            feature="Wallet Dashboard"
            showUpgradePrompt={true}
          >
            <WalletDashboard />
          </ProtectedComponent>
        );
      case "portfolio":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_portfolio']}
            feature="Investment Portfolio"
            showUpgradePrompt={true}
          >
            <PortfolioDashboard />
          </ProtectedComponent>
        );
      case "split-tracker":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_split_tracker']}
            feature="50/30/20 Split Tracker"
            showUpgradePrompt={true}
          >
            <SplitTracker />
          </ProtectedComponent>
        );
      case "estate":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_estate']}
            feature="Estate Management"
            showUpgradePrompt={true}
          >
            <EstateManagement />
          </ProtectedComponent>
        );
      case "filling-station":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_filling_station']}
            feature="Filling Station Management"
            showUpgradePrompt={true}
          >
            <FillingStationManagement />
          </ProtectedComponent>
        );
      case "equipment":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_equipment']}
            feature="Equipment Management"
            showUpgradePrompt={true}
          >
            <EquipmentManagement />
          </ProtectedComponent>
        );
      case "personal-portfolios":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_personal_portfolios']}
            feature="Personal Life Portfolios"
            showUpgradePrompt={true}
          >
            <PersonalLifePortfolios />
          </ProtectedComponent>
        );
      case "goals":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_goals']}
            feature="Financial Goals"
            showUpgradePrompt={true}
          >
            <GoalsDashboard />
          </ProtectedComponent>
        );
      case "contacts":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_contacts']}
            feature="CRM Dashboard"
          >
            <CRMDashboard />
          </ProtectedComponent>
        );
      case "library":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_library']}
            feature="Library Dashboard"
          >
            <LibraryDashboard />
          </ProtectedComponent>
        );
      case "assistant":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_assistant']}
            feature="AI Assistant"
          >
            <AssistantDashboard />
          </ProtectedComponent>
        );
      case "reports":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_reports']}
            feature="Reports Dashboard"
            showUpgradePrompt={true}
          >
            <ReportsDashboard />
          </ProtectedComponent>
        );
      case "settings":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_settings']}
            feature="Settings"
          >
            <SettingsPage />
          </ProtectedComponent>
        );
      case "theme-showcase":
        return <GreenThemeShowcase />;
      default:
        return renderDashboard();
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </DashboardLayout>
  );
};

export default Index;