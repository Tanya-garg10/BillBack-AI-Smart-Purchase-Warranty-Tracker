import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppSidebar } from './components/app-sidebar';
import { TopHeader } from './components/top-header';
import { Toast } from './components/toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { PurchaseDetailsPage } from './pages/PurchaseDetailsPage';
import { ExpiringPage } from './pages/ExpiringPage';
import { WarrantiesPage } from './pages/WarrantiesPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ClaimReadyPage } from './pages/ClaimReadyPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AskBillBackPage } from './pages/AskBillBackPage';

function MainRouter() {
  const { currentPath, isSidebarCollapsed } = useApp();

  // Root landing page
  if (currentPath === '/' || currentPath === '') {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  // Determine active view and metadata
  let pageComponent = <DashboardPage />;
  let pageTitle = 'Dashboard';
  let pageSubtitle = 'Purchase & warranty command center';
  let showGreeting = false;

  if (currentPath === '/dashboard') {
    pageComponent = <DashboardPage />;
    showGreeting = true;
  } else if (currentPath === '/upload') {
    pageComponent = <UploadPage />;
    pageTitle = 'Add a Purchase';
    pageSubtitle = 'Upload an invoice to extract purchase intelligence';
  } else if (currentPath === '/purchases') {
    pageComponent = <PurchasesPage />;
    pageTitle = 'My Purchases';
    pageSubtitle = 'Every purchase, organized in one place';
  } else if (currentPath.startsWith('/purchases/')) {
    const purchaseId = currentPath.replace('/purchases/', '');
    pageComponent = <PurchaseDetailsPage purchaseId={purchaseId} />;
    pageTitle = 'Purchase Details';
    pageSubtitle = 'Verified purchase record and tax invoice';
  } else if (currentPath === '/expiring') {
    pageComponent = <ExpiringPage />;
    pageTitle = 'Expiring Soon';
    pageSubtitle = "Don't miss an important purchase deadline";
  } else if (currentPath === '/warranties') {
    pageComponent = <WarrantiesPage />;
    pageTitle = 'Warranty Vault';
    pageSubtitle = 'Your active product protection, organized';
  } else if (currentPath === '/claims') {
    pageComponent = <ClaimsPage />;
    pageTitle = 'Warranty Claims';
    pageSubtitle = 'Claim dossiers, tracking, and warranty resolutions';
  } else if (currentPath.startsWith('/claims/')) {
    const claimId = currentPath.replace('/claims/', '');
    pageComponent = <ClaimReadyPage claimIdOrPurchaseId={claimId} />;
    pageTitle = 'ClaimReady Dossier';
    pageSubtitle = 'Everything you need for your warranty claim';
  } else if (currentPath === '/analytics') {
    pageComponent = <AnalyticsPage />;
    pageTitle = 'Purchase Analytics';
    pageSubtitle = 'Spending velocity, categories, and warranty depth';
  } else if (currentPath === '/settings') {
    pageComponent = <SettingsPage />;
    pageTitle = 'Settings';
    pageSubtitle = 'Profile, reminders, notifications, and preferences';
  } else if (currentPath === '/ask-billback') {
    pageComponent = <AskBillBackPage />;
    pageTitle = 'Ask BillBack';
    pageSubtitle = 'Conversational purchase intelligence and warranty lookups';
  }

  return (
    <div className="min-h-screen bg-[#101310] text-[#F4F1E8] flex flex-col font-sans selection:bg-[#B7F36B] selection:text-[#101310]">
      <AppSidebar />

      {/* Main shell offset for sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isSidebarCollapsed ? 'md:pl-18' : 'md:pl-60'
        }`}
      >
        <TopHeader
          title={pageTitle}
          subtitle={pageSubtitle}
          showGreeting={showGreeting}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {pageComponent}
        </main>
      </div>

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
