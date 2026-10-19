import { useState } from 'react';
import { Plus, Download, Eye, Edit, Ban, CheckCircle, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, FilterButton, SearchInput, PrimaryButton, GhostButton } from '@/components/ui';
import { users, type User } from '@/data';

const roleFilters = ['All', 'Admin', 'Agent', 'Borrower', 'Lender', 'Property Owner'] as const;

const roleColors: Record<string, string> = {
  Admin:           'bg-brand-dark/10 text-brand-dark',
  Agent:           'bg-brand-teal/10 text-brand-teal',
  Borrower:        'bg-sky-100 text-sky-700',
  Lender:          'bg-amber-100 text-amber-700',
  'Property Owner':'bg-purple-100 text-purple-700',
};

export function UsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [page, setPage] = useState(0);
  const perPage = 6;

  const filtered: User[] = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice(page * perPage, page * perPage + perPage);

  const initials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {roleFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); setPage(0); }}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Search name, email, ID..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add User</span></PrimaryButton>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">User</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Role</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Joined</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Last Login</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Properties</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Bank Account</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-dark font-semibold text-xs shrink-0">
                        {initials(u.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-brand-charcoal truncate">{u.name}</p>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-brand-dark hidden md:table-cell">{u.id}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><Badge status={u.status} /></td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">{u.joined}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">{u.lastLogin}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden xl:table-cell">{u.properties}</td>
                  <td className="px-5 py-3.5 hidden xl:table-cell">{u.linkedAccount ? <span className="flex items-center gap-1.5 font-mono text-xs text-gray-600"><Wallet className="w-3.5 h-3.5 text-brand-teal" />{u.linkedAccount}</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-brand-teal/10 text-gray-400 hover:text-brand-teal transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-md hover:bg-brand-dark/10 text-gray-400 hover:text-brand-dark transition-colors"><Edit className="w-4 h-4" /></button>
                      {u.status === 'Active' ? (
                        <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Ban className="w-4 h-4" /></button>
                      ) : (
                        <button className="p-1.5 rounded-md hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">No users match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing {current.length} of {filtered.length} users</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4 text-brand-charcoal" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-md text-sm font-medium transition-colors ${page === i ? 'bg-brand-dark text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-4 h-4 text-brand-charcoal" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
