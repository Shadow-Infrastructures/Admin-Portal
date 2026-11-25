import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { PBACProvider, usePBAC } from '@/context/pbac';
import { MainLayout } from '@/layout/MainLayout';
import { pagePermissions } from '@/data';
import { navigateTo } from '@/lib/navigation';

import { DashboardPage } from '@/pages/Dashboard';
import { PropertiesPage } from '@/pages/Properties';
import { LoansPage } from '@/pages/Loans';
import { PriceTrackingPage } from '@/pages/PriceTracking';
import { UsersPage } from '@/pages/Users';
import { LendersPage } from '@/pages/Lenders';
import { BankAccountsPage } from '@/pages/BankAccounts';
import { PermissionsPage } from '@/pages/Permissions';
import { AuditLogsPage } from '@/pages/AuditLogs';
import { ReportsPage } from '@/pages/Reports';
import { SettingsPage } from '@/pages/Settings';

const pageRegistry = {
  dashboard:     DashboardPage,
  properties:    PropertiesPage,
  loans:         LoansPage,
  priceTracking: PriceTrackingPage,
  users:         UsersPage,
  lenders:       LendersPage,
  bankAccounts:  BankAccountsPage,
  permissions:   PermissionsPage,
  auditLogs:     AuditLogsPage,
  reports:       ReportsPage,
  settings:      SettingsPage,
};

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <ShieldAlert className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-brand-charcoal mb-2">Access Restricted</h2>
      <p className="text-sm text-gray-500 max-w-sm">
        You do not have permission to view this page. Contact a Super Admin if you believe this is an error.
      </p>
    </div>
  );
}

function PortalContent() {
  const [page, setPage] = useState('dashboard');
  const [pageFilter, setPageFilter] = useState(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { canAccess } = usePBAC();

  const navigate = navigateTo(setPage, setPageFilter);
  const requiredPerm = pagePermissions[page];
  const hasAccess = canAccess(requiredPerm);

  const PageComponent = pageRegistry[page];

  return (
    <MainLayout
      active={page}
      onNavigate={navigate}
      sidebarOpen={sidebarOpen}
      onMenuClick={() => setSidebarOpen(true)}
      onCloseSidebar={() => setSidebarOpen(false)}
    >
      {!hasAccess ? (
        <AccessDenied />
      ) : page === 'dashboard' ? (
        <DashboardPage onNavigate={navigate} />
      ) : page === 'loans' ? (
        <LoansPage initialFilter={pageFilter} />
      ) : (
        <PageComponent />
      )}
    </MainLayout>
  );
}

export default function App() {
  return (
    <PBACProvider>
      <PortalContent />
    </PBACProvider>
  );
}
