import { useState } from 'react';
import { navItems, pagePermissions, roleMatrix, adminProfiles, type Page, type AdminRole } from '@/data';
import { Icon } from './Icon';
import { usePBAC } from './PBAC';
import { ChevronDown, Check } from 'lucide-react';

interface SidebarProps {
  active: Page;
  onNavigate: (page: Page) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  const { admin, role, canAccess, switchRole } = usePBAC();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const visibleNavItems = navItems.filter((item) => canAccess(pagePermissions[item.id]));

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-brand-charcoal/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-screen w-64 shrink-0
          bg-brand-dark text-brand-cream
          flex flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10 shrink-0">
          <img src="/images/TreeHouse_2.svg" alt="Treehouse" className="w-8 h-8" />
          <div>
            <span className="text-lg font-bold tracking-tight text-white">Treehouse</span>
            <span className="block text-[10px] uppercase tracking-widest text-brand-teal -mt-1">Admin Portal</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {visibleNavItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-brand-teal text-brand-dark shadow-sm'
                    : 'text-brand-cream/70 hover:bg-white/10 hover:text-white'}
                `}
              >
                <Icon name={item.icon} className="w-[18px] h-[18px] shrink-0" />
                {item.label}
              </button>
            );
          })}
          {visibleNavItems.length === 0 && (
            <p className="text-xs text-brand-cream/40 px-3 py-4">No accessible pages for this role.</p>
          )}
        </nav>

        {/* User card with role switcher */}
        <div className="p-3 border-t border-white/10 shrink-0 relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal font-semibold text-sm shrink-0">
              {admin.avatar}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-white truncate">{admin.name}</p>
              <p className="text-xs text-brand-cream/50 truncate">{role}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-brand-cream/40 transition-transform ${roleMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {roleMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-brand-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">Switch Role (PBAC Demo)</p>
              {(Object.keys(adminProfiles) as AdminRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { switchRole(r); setRoleMenuOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">{adminProfiles[r].name}</p>
                    <p className="text-xs text-gray-400">{r}</p>
                  </div>
                  {role === r && <Check className="w-4 h-4 text-brand-teal" />}
                </button>
              ))}
              <p className="px-3 py-2 text-xs text-gray-300 border-t border-gray-100">
                {roleMatrix.find(rm => rm.role === role)?.description}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
