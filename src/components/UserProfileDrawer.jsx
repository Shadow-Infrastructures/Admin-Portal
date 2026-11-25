import { X, Mail, Calendar, Wallet, Home } from 'lucide-react';
import { Badge } from '@/components/ui';
import { users, EMPLOYEE_ROLES, agentDirectory } from '@/data';

export function UserProfileDrawer({ name, onClose }) {
  const user = users.find((u) => u.name === name);
  const agent = agentDirectory[name];
  const isEmployee = user ? EMPLOYEE_ROLES.includes(user.role) : false;
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <aside className="relative w-full max-w-md h-full bg-brand-white shadow-2xl overflow-y-auto animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-brand-charcoal">User Profile</h2>
          <button onClick={onClose} className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-brand-charcoal transition-colors" aria-label="Close profile">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-dark font-bold text-lg">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-brand-charcoal truncate">{name}</p>
              <p className="text-sm text-gray-500">{user?.role ?? agent?.role ?? 'Client'}</p>
              {user && <div className="mt-1.5"><Badge status={user.status} /></div>}
            </div>
          </div>

          {user ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-sm font-semibold text-brand-dark mt-1">{user.id}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Properties</p>
                <p className="text-sm font-semibold text-brand-dark mt-1">{user.properties}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-semibold text-brand-charcoal mt-1">{user.joined}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Last login</p>
                <p className="text-sm font-semibold text-brand-charcoal mt-1">{user.lastLogin}</p>
              </div>
            </div>
          ) : null}

          <div className="space-y-3 text-sm">
            {user && (
              <p className="flex items-center gap-2 text-gray-600"><Mail className="w-4 h-4 text-gray-400" />{user.email}</p>
            )}
            {agent && (
              <p className="flex items-center gap-2 text-gray-600">
                <Home className="w-4 h-4 text-gray-400" />
                Reports to {agent.supervisor ?? 'no one (top of the team)'}
              </p>
            )}
            {user && !user.linkedAccount && !isEmployee && (
              <p className="flex items-center gap-2 text-gray-400"><Calendar className="w-4 h-4" />No additional details on file</p>
            )}
            {isEmployee && user?.linkedAccount && (
              <p className="flex items-center gap-2 font-mono text-gray-600"><Wallet className="w-4 h-4 text-brand-teal" />{user.linkedAccount}</p>
            )}
          </div>

          {!user && (
            <p className="text-sm text-gray-400">No account record is linked to this name yet.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
