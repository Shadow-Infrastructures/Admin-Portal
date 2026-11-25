import { useState } from 'react';
import {
  Download, Search, AlertTriangle, Info, ShieldAlert,
} from 'lucide-react';
import { Card, SeverityBadge, FilterButton, SearchInput, GhostButton, Pagination } from '@/components/ui';
import { useFilteredPagination } from '@/hooks/usePagination';
import { auditLogs } from '@/data';

const categoryFilters = ['All', 'Property', 'Loan', 'User', 'Lender', 'Bank Account', 'Permission', 'Auth', 'Settings'];

const severityIcon = {
  Info: Info,
  Warning: AlertTriangle,
  Critical: ShieldAlert,
};

const severityColor = {
  Info: 'text-sky-500',
  Warning: 'text-amber-500',
  Critical: 'text-red-500',
};

const categoryColor = {
  Property:       'bg-brand-teal/10 text-brand-teal',
  Loan:           'bg-brand-dark/10 text-brand-dark',
  User:           'bg-sky-100 text-sky-700',
  Lender:         'bg-amber-100 text-amber-700',
  'Bank Account': 'bg-purple-100 text-purple-700',
  Permission:     'bg-indigo-100 text-indigo-700',
  Auth:           'bg-red-100 text-red-600',
  Settings:       'bg-gray-200 text-gray-600',
};

export function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filterFn = () => auditLogs.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.actor.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.target.toLowerCase().includes(q) ||
      l.detail.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' || l.category === filter;
    const matchesSeverity = severityFilter === 'All' || l.severity === severityFilter;
    return matchesSearch && matchesFilter && matchesSeverity;
  });

  const { page, setPage, totalPages, current, reset } = useFilteredPagination(filterFn, 8);

  const counts = {
    info:     auditLogs.filter(l => l.severity === 'Info').length,
    warning:  auditLogs.filter(l => l.severity === 'Warning').length,
    critical: auditLogs.filter(l => l.severity === 'Critical').length,
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Info className="w-5 h-5 text-sky-500" /></div>
            <div><p className="text-xs text-gray-500">Info</p><p className="text-2xl font-bold text-brand-charcoal">{counts.info}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-gray-500">Warnings</p><p className="text-2xl font-bold text-brand-charcoal">{counts.warning}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-red-500" /></div>
            <div><p className="text-xs text-gray-500">Critical</p><p className="text-2xl font-bold text-brand-charcoal">{counts.critical}</p></div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              {['All', 'Info', 'Warning', 'Critical'].map((f) => (
                <FilterButton key={f} active={severityFilter === f} onClick={() => { setSeverityFilter(f); reset(); }}>{f}</FilterButton>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SearchInput value={search} onChange={(v) => { setSearch(v); reset(); }} placeholder="Search actor, action, target, detail..." />
              <GhostButton onClick={() => {}}><span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> Export</span></GhostButton>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); reset(); }}>{f}</FilterButton>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Actor</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Role</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Action</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Category</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Target</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Severity</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Timestamp</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((l) => {
                const SIcon = severityIcon[l.severity] ?? Info;
                return (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-brand-dark font-mono text-xs">{l.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <SIcon className={`w-4 h-4 shrink-0 ${severityColor[l.severity]}`} />
                        <span className="font-medium text-brand-charcoal">{l.actor}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell text-xs">{l.actorRole}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-brand-charcoal">{l.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-[280px] truncate">{l.detail}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColor[l.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {l.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell font-mono text-xs">{l.target}</td>
                    <td className="px-5 py-3.5"><SeverityBadge severity={l.severity} /></td>
                    <td className="px-5 py-3.5 text-gray-500 hidden xl:table-cell text-xs whitespace-nowrap">{l.timestamp}</td>
                    <td className="px-5 py-3.5 text-gray-400 hidden xl:table-cell font-mono text-xs">{l.ip}</td>
                  </tr>
                );
              })}
              {current.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">No audit logs match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} total={current.length} label={`${filterFn().length} log entries`} />
      </Card>
    </div>
  );
}
