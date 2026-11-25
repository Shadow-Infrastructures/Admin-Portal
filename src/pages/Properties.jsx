import { useState } from 'react';
import { Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, Badge, FilterButton, SearchInput, PrimaryButton, GhostButton, NameLink, AgentCell, Pagination } from '@/components/ui';
import { UserProfileDrawer } from '@/components/UserProfileDrawer';
import { useFilteredPagination } from '@/hooks/usePagination';
import { properties } from '@/data';

const statusFilters = ['All', 'Active', 'Pending', 'Sold', 'Under Review'];

export function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [profileName, setProfileName] = useState(null);

  const filterFn = () => properties.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.address.toLowerCase().includes(q) ||
      p.owner.toLowerCase().includes(q) ||
      p.agent.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const { page, setPage, totalPages, current, reset } = useFilteredPagination(filterFn);

  return (
    <div className="space-y-5">
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); reset(); }}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); reset(); }} placeholder="Search address, owner, agent, ID..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Property</span></PrimaryButton>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Address</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Owner</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Agent</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Type</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden lg:table-cell">Beds/Baths</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden xl:table-cell">SqFt</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Value</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">LTV</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-brand-dark">{p.id}</td>
                  <td className="px-5 py-3.5 text-brand-charcoal">{p.address}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell"><NameLink name={p.owner} onClick={() => setProfileName(p.owner)} /></td>
                  <td className="px-5 py-3.5 hidden lg:table-cell"><AgentCell name={p.agent} /></td>
                  <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{p.type}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{p.bedrooms}bd / {p.bathrooms}ba</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden xl:table-cell">{p.sqft.toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-medium text-brand-charcoal">{p.estimatedValue}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-medium ${parseFloat(p.ltv) > 65 ? 'text-amber-600' : 'text-brand-teal'}`}>{p.ltv}</span>
                  </td>
                  <td className="px-5 py-3.5"><Badge status={p.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-brand-teal/10 text-gray-400 hover:text-brand-teal transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-md hover:bg-brand-dark/10 text-gray-400 hover:text-brand-dark transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr><td colSpan={11} className="px-5 py-12 text-center text-gray-400">No properties match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} total={current.length} label={`${filterFn().length} properties`} />
      </Card>

      {profileName && <UserProfileDrawer name={profileName} onClose={() => setProfileName(null)} />}
    </div>
  );
}
