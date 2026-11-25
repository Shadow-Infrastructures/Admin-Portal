import { useState } from 'react';
import { Plus, Download, Eye, FileText, AlertCircle } from 'lucide-react';
import { Card, Badge, FilterButton, SearchInput, PrimaryButton, GhostButton, NameLink, AgentCell, Pagination } from '@/components/ui';
import { UserProfileDrawer } from '@/components/UserProfileDrawer';
import { useFilteredPagination } from '@/hooks/usePagination';
import { loans } from '@/data';
import { parseDisplayDate, startOfDay } from '@/lib/dates';

const statusFilters = ['All', 'Pending', 'Under Review', 'Approved', 'Active', 'Rejected'];
const ADVISORY_OPEN = ['Pending', 'Under Review'];

export function LoansPage({ initialFilter }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(
    initialFilter && statusFilters.includes(initialFilter) ? initialFilter : 'All',
  );
  const [profileName, setProfileName] = useState(null);
  const today = startOfDay(new Date());

  const filterFn = () => loans.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.borrower.toLowerCase().includes(q) ||
      l.property.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      l.lender.toLowerCase().includes(q) ||
      l.agent.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' || l.status === filter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, current, reset } = useFilteredPagination(filterFn);

  const summary = [
    { label: 'Total Applications', value: loans.length.toString(), color: 'dark' },
    { label: 'Pending Review',     value: loans.filter(l => l.status === 'Under Review').length.toString(), color: 'teal' },
    { label: 'Approved',           value: loans.filter(l => l.status === 'Approved').length.toString(), color: 'teal' },
    { label: 'Active Loans',       value: loans.filter(l => l.status === 'Active').length.toString(), color: 'dark' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color === 'teal' ? 'text-brand-teal' : 'text-brand-dark'}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); reset(); }}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); reset(); }} placeholder="Search borrower, agent, property..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Loan</span></PrimaryButton>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Loan ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Borrower</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Agent</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Property</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Amount</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Rate</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Term</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">LTV</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Lender</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Submitted</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Advisory Date</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Lock-out Date</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((l) => {
                const advisoryDue = ADVISORY_OPEN.includes(l.status) && parseDisplayDate(l.advisoryDate) <= today;
                return (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-brand-dark">{l.id}</td>
                    <td className="px-5 py-3.5"><NameLink name={l.borrower} onClick={() => setProfileName(l.borrower)} /></td>
                    <td className="px-5 py-3.5 hidden md:table-cell"><AgentCell name={l.agent} /></td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{l.property}</td>
                    <td className="px-5 py-3.5 font-medium text-brand-charcoal">{l.amount}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{l.rate}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{l.term}</td>
                    <td className="px-5 py-3.5">
                      <span className={`font-medium ${parseFloat(l.ltv) > 65 ? 'text-amber-600' : 'text-brand-teal'}`}>{l.ltv}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden xl:table-cell">{l.lender}</td>
                    <td className="px-5 py-3.5 text-gray-500 hidden xl:table-cell">{l.submitted}</td>
                    <td className="px-5 py-3.5 hidden xl:table-cell">
                      <span className={`inline-flex items-center gap-1.5 ${advisoryDue ? 'font-medium text-amber-600' : 'text-gray-500'}`}>
                        {advisoryDue && <AlertCircle className="w-3.5 h-3.5" />}
                        {l.advisoryDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden xl:table-cell">{l.lockOutDate}</td>
                    <td className="px-5 py-3.5"><Badge status={l.status} /></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-brand-teal/10 text-gray-400 hover:text-brand-teal transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-md hover:bg-brand-dark/10 text-gray-400 hover:text-brand-dark transition-colors"><FileText className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {current.length === 0 && (
                <tr><td colSpan={14} className="px-5 py-12 text-center text-gray-400">No loans match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} total={current.length} label={`${filterFn().length} loans`} />
      </Card>

      {profileName && <UserProfileDrawer name={profileName} onClose={() => setProfileName(null)} />}
    </div>
  );
}
