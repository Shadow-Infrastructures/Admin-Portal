import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import type { Page } from '@/data';
import { usePBAC } from './PBAC';

const titles: Record<Page, { title: string; subtitle: string }> = {
  dashboard:     { title: 'Dashboard',       subtitle: 'Overview of platform activity and key metrics' },
  properties:    { title: 'Properties',      subtitle: 'Manage and monitor all registered properties' },
  loans:         { title: 'Loans',           subtitle: 'Refinance and financing applications between banks and owners' },
  priceTracking: { title: 'Price Tracking',  subtitle: 'Monitor property value changes over time' },
  users:         { title: 'Users',           subtitle: 'Manage user accounts and permissions' },
  lenders:       { title: 'Lenders',         subtitle: 'View and manage bank and lending partners' },
  bankAccounts:  { title: 'Bank Accounts',   subtitle: 'Linked bank accounts for owners and lenders' },
  permissions:   { title: 'Permissions',     subtitle: 'PBAC roles and permission tree configuration' },
  auditLogs:     { title: 'Audit Logs',      subtitle: 'Immutable audit trail of all platform actions' },
  reports:       { title: 'Reports',         subtitle: 'Generate and export platform analytics' },
  settings:      { title: 'Settings',        subtitle: 'Configure portal preferences and policies' },
};

interface HeaderProps {
  page: Page;
  onMenuClick: () => void;
}

export function Header({ page, onMenuClick }: HeaderProps) {
  const { admin } = usePBAC();
  const { title, subtitle } = titles[page];
  return (
    <header className="sticky top-0 z-20 bg-brand-white/95 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center px-4 lg:px-8 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu className="w-5 h-5 text-brand-charcoal" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-brand-charcoal truncate">{title}</h1>
        <p className="text-xs text-gray-500 truncate hidden sm:block">{subtitle}</p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-4 py-2 w-56 lg:w-64 rounded-lg bg-gray-100 text-sm text-brand-charcoal placeholder-gray-400 border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Bell className="w-5 h-5 text-brand-charcoal" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-teal rounded-full ring-2 ring-brand-white" />
      </button>

      {/* Profile */}
      <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-brand-teal font-semibold text-xs">
          {admin.avatar}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
      </button>
    </header>
  );
}
