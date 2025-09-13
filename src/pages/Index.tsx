import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState("overview");

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <OwnerDashboard />;
      case "wallet":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Wallet Management</h1>
            <p className="text-muted-foreground">Detailed wallet view coming soon...</p>
          </div>
        );
      case "portfolio":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Portfolio Overview</h1>
            <p className="text-muted-foreground">Investment portfolio tracking coming soon...</p>
          </div>
        );
      case "split-tracker":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">50/30/20 Split Tracker</h1>
            <p className="text-muted-foreground">Detailed budget tracking coming soon...</p>
          </div>
        );
      case "goals":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Financial Goals</h1>
            <p className="text-muted-foreground">Goal tracking and planning coming soon...</p>
          </div>
        );
      case "contacts":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contact Management</h1>
            <p className="text-muted-foreground">CRM for estates, vendors, and customers coming soon...</p>
          </div>
        );
      case "library":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Knowledge Library</h1>
            <p className="text-muted-foreground">Study materials and documentation coming soon...</p>
          </div>
        );
      case "assistant":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Financial assistant and automation coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Account and system preferences coming soon...</p>
          </div>
        );
      default:
        return <OwnerDashboard />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </DashboardLayout>
  );
};

export default Index;