import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PBACProvider, usePBAC } from '@/components/PBAC';
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
import { pagePermissions, type Page } from '@/data';
import { ShieldAlert } from 'lucide-react';

function PortalContent() {
  const [page, setPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { canAccess } = usePBAC();

  const requiredPerm = pagePermissions[page];
  const hasAccess = canAccess(requiredPerm);

  return (
    <div className="flex min-h-screen bg-brand-cream">
      <Sidebar
        active={page}
        onNavigate={setPage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header page={page} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {!hasAccess ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-brand-charcoal mb-2">Access Restricted</h2>
              <p className="text-sm text-gray-500 max-w-sm">
                You do not have permission to view this page. Contact a Super Admin if you believe this is an error.
              </p>
            </div>
          ) : (
            <>
              {page === 'dashboard'     && <DashboardPage />}
              {page === 'properties'    && <PropertiesPage />}
              {page === 'loans'         && <LoansPage />}
              {page === 'priceTracking' && <PriceTrackingPage />}
              {page === 'users'         && <UsersPage />}
              {page === 'lenders'       && <LendersPage />}
              {page === 'bankAccounts'  && <BankAccountsPage />}
              {page === 'permissions'   && <PermissionsPage />}
              {page === 'auditLogs'     && <AuditLogsPage />}
              {page === 'reports'       && <ReportsPage />}
              {page === 'settings'      && <SettingsPage />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <PBACProvider>
      <PortalContent />
    </PBACProvider>
  );
}

export default App;
