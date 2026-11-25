import { useState } from 'react';
import { Plus, Download, Eye, Snowflake, ShieldCheck, Wallet, Building2, User as UserIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, FilterButton, SearchInput, PrimaryButton, GhostButton, Pagination } from '@/components/ui';
import { useFilteredPagination } from '@/hooks/usePagination';
import { bankAccounts } from '@/data';

const typeFilters = ['All', 'Treehouse Operating', 'Property Owner', 'Lender'];

const holderIcon = {
  'Treehouse Operating': Wallet,
  'Property Owner': UserIcon,
  'Lender': Building2,
};

export function BankAccountsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filterFn = () => bankAccounts.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      a.holder.toLowerCase().includes(q) ||
      a.bank.toLowerCase().includes(q) ||
      a.accountNumber.includes(search) ||
      a.id.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' || a.holderType === filter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, current, reset } = useFilteredPagination(filterFn);

  const totalBalance = bankAccounts.reduce((s, a) => s + parseFloat(a.balance.replace(/[$,]/g, '')), 0);
  const verifiedCount = bankAccounts.filter(a => a.status === 'Verified').length;
  const frozenCount = bankAccounts.filter(a => a.status === 'Frozen').length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-brand-teal" /></div>
            <div><p className="text-xs text-gray-500">Total Accounts</p><p className="text-2xl font-bold text-brand-charcoal">{bankAccounts.length}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-dark/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-brand-dark" /></div>
            <div><p className="text-xs text-gray-500">Verified</p><p className="text-2xl font-bold text-brand-teal">{verifiedCount}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><Snowflake className="w-5 h-5 text-red-500" /></div>
            <div><p className="text-xs text-gray-500">Frozen</p><p className="text-2xl font-bold text-red-500">{frozenCount}</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-brand-teal" /></div>
            <div><p className="text-xs text-gray-500">Total Balance</p><p className="text-2xl font-bold text-brand-charcoal">${(totalBalance / 1000000).toFixed(1)}M</p></div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); reset(); }}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); reset(); }} placeholder="Search holder, bank, account..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Link Account</span></PrimaryButton>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Holder</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Type</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Bank</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Account #</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">Routing</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Balance</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((a) => {
                const HIcon = holderIcon[a.holderType] ?? Wallet;
                return (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-brand-dark">{a.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <HIcon className="w-4 h-4 text-brand-dark" />
                        </div>
                        <span className="font-medium text-brand-charcoal">{a.holder}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{a.holderType}</td>
                    <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{a.bank}</td>
                    <td className="px-5 py-3.5 font-mono text-gray-700">{a.accountNumber}</td>
                    <td className="px-5 py-3.5 font-mono text-gray-500 hidden xl:table-cell">{a.routing}</td>
                    <td className="px-5 py-3.5 font-medium text-brand-charcoal">{a.balance}</td>
                    <td className="px-5 py-3.5"><Badge status={a.status} /></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-brand-teal/10 text-gray-400 hover:text-brand-teal transition-colors"><Eye className="w-4 h-4" /></button>
                        {a.status === 'Frozen' ? (
                          <button className="p-1.5 rounded-md hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"><ShieldCheck className="w-4 h-4" /></button>
                        ) : (
                          <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Snowflake className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {current.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">No bank accounts match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} total={current.length} label={`${filterFn().length} accounts`} />
      </Card>
    </div>
  );
}
