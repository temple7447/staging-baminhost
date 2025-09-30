import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { Navigate } from "react-router-dom";
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
import { LibraryDashboard } from "@/components/dashboard/LibraryDashboardStub";
import { AssistantDashboard } from "@/components/dashboard/AssistantDashboard";
import { ReportsDashboard } from "@/components/dashboard/ReportsDashboard";
import { GreenThemeShowcase } from "@/components/GreenThemeShowcase";
import { ProtectedComponent } from "@/components/auth/ProtectedComponent";
import { SettingsPage } from "@/components/auth/SettingsPage";
import { PortfolioDashboard, PersonalLifePortfolios } from "@/components/portfolio";
import { SplitTracker } from "@/components/budget/SplitTracker";
import { GoalsDashboard } from "@/components/goals/GoalsDashboard";
import { Big5Dashboard } from "@/components/big5/Big5Dashboard";
import StrategicHiringPlanner from "@/components/hiring/StrategicHiringPlanner";
import CandidateManagement from "@/components/hiring/CandidateManagement";
import { AdminPeople } from "@/components/dashboard/AdminPeople";
import { SuperAdminTransactions } from "@/components/dashboard/SuperAdminTransactions";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { canAccessNavigation, hasPermission } = usePermissions();
  const [currentView, setCurrentView] = useState("overview");

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    console.log('Rendering dashboard for user:', user);
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
        return <CustomerDashboard />;
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
          <div className="text-center p-4">
            <h2 className="text-lg font-semibold text-destructive">Access Restricted</h2>
            <p className="text-muted-foreground">You don't have permission to access this feature.</p>
          </div>
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
      case "big5":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_big5']}
            feature="My Big 5"
            showUpgradePrompt={false}
          >
            <Big5Dashboard />
          </ProtectedComponent>
        );
      case "strategic-hiring-planner":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_strategic_hiring', 'view_hiring_triggers']}
            feature="Strategic Hiring Planner"
            showUpgradePrompt={false}
          >
            <StrategicHiringPlanner />
          </ProtectedComponent>
        );
      case "candidate-management":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_strategic_hiring', 'manage_candidates']}
            feature="Candidate Management"
            showUpgradePrompt={false}
          >
            <CandidateManagement />
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
      case "transactions":
        return (
          <ProtectedComponent 
            requiredPermissions={['view_all_data']}
            feature="Transactions"
            showUpgradePrompt={false}
          >
            <SuperAdminTransactions />
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
      case "people":
        return <AdminPeople />;
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