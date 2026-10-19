import { useState } from 'react';
import {
  Download, Search, AlertTriangle, Info, ShieldAlert,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Card, SeverityBadge, FilterButton, SearchInput, GhostButton } from '@/components/ui';
import { auditLogs, type AuditLog } from '@/data';

const categoryFilters = ['All', 'Property', 'Loan', 'User', 'Lender', 'Bank Account', 'Permission', 'Auth', 'Settings'] as const;

const severityIcon: Record<string, typeof Info> = {
  Info:     Info,
  Warning:  AlertTriangle,
  Critical: ShieldAlert,
};

const severityColor: Record<string, string> = {
  Info:     'text-sky-500',
  Warning:  'text-amber-500',
  Critical: 'text-red-500',
};

const categoryColor: Record<string, string> = {
  Property:      'bg-brand-teal/10 text-brand-teal',
  Loan:          'bg-brand-dark/10 text-brand-dark',
  User:          'bg-sky-100 text-sky-700',
  Lender:        'bg-amber-100 text-amber-700',
  'Bank Account':'bg-purple-100 text-purple-700',
  Permission:    'bg-indigo-100 text-indigo-700',
  Auth:          'bg-red-100 text-red-600',
  Settings:      'bg-gray-200 text-gray-600',
};

export function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [page, setPage] = useState(0);
  const perPage = 8;

  const filtered: AuditLog[] = auditLogs.filter((l) => {
    const matchesSearch =
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.detail.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || l.category === filter;
    const matchesSeverity = severityFilter === 'All' || l.severity === severityFilter;
    return matchesSearch && matchesFilter && matchesSeverity;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice(page * perPage, page * perPage + perPage);

  const counts = {
    info:     auditLogs.filter(l => l.severity === 'Info').length,
    warning:  auditLogs.filter(l => l.severity === 'Warning').length,
    critical: auditLogs.filter(l => l.severity === 'Critical').length,
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
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

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              {['All', 'Info', 'Warning', 'Critical'].map((f) => (
                <FilterButton key={f} active={severityFilter === f} onClick={() => { setSeverityFilter(f); setPage(0); }}>{f}</FilterButton>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Search actor, action, target, detail..." />
              <GhostButton onClick={() => {}}><span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> Export</span></GhostButton>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); setPage(0); }}>{f}</FilterButton>
            ))}
          </div>
        </div>
      </Card>

      {/* Logs table */}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing {current.length} of {filtered.length} log entries</span>
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
