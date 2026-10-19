import { useState } from 'react';
import { Plus, Download, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, FilterButton, SearchInput, PrimaryButton, GhostButton } from '@/components/ui';
import { loans, type Loan } from '@/data';

const statusFilters = ['All', 'Pending', 'Under Review', 'Approved', 'Active', 'Rejected'] as const;

export function LoansPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [page, setPage] = useState(0);
  const perPage = 6;

  const filtered: Loan[] = loans.filter((l) => {
    const matchesSearch =
      l.borrower.toLowerCase().includes(search.toLowerCase()) ||
      l.property.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.lender.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || l.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice(page * perPage, page * perPage + perPage);

  // Summary cards
  const summary = [
    { label: 'Total Applications', value: loans.length.toString(),            color: 'dark' },
    { label: 'Pending Review',     value: loans.filter(l => l.status === 'Under Review').length.toString(), color: 'teal' },
    { label: 'Approved',           value: loans.filter(l => l.status === 'Approved').length.toString(),     color: 'teal' },
    { label: 'Active Loans',       value: loans.filter(l => l.status === 'Active').length.toString(),       color: 'dark' },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color === 'teal' ? 'text-brand-teal' : 'text-brand-dark'}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); setPage(0); }}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Search borrower, property, lender..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Loan</span></PrimaryButton>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Loan ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Borrower</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Property</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Amount</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Rate</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Term</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">LTV</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Lender</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Submitted</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-brand-dark">{l.id}</td>
                  <td className="px-5 py-3.5 text-brand-charcoal">{l.borrower}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{l.property}</td>
                  <td className="px-5 py-3.5 font-medium text-brand-charcoal">{l.amount}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{l.rate}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{l.term}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-medium ${parseFloat(l.ltv) > 65 ? 'text-amber-600' : 'text-brand-teal'}`}>{l.ltv}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 hidden xl:table-cell">{l.lender}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden xl:table-cell">{l.submitted}</td>
                  <td className="px-5 py-3.5"><Badge status={l.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-brand-teal/10 text-gray-400 hover:text-brand-teal transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-md hover:bg-brand-dark/10 text-gray-400 hover:text-brand-dark transition-colors"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr><td colSpan={11} className="px-5 py-12 text-center text-gray-400">No loans match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing {current.length} of {filtered.length} loans</span>
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
