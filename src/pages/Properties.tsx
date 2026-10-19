import { useState } from 'react';
import { Plus, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, SectionHeader, FilterButton, SearchInput, PrimaryButton, GhostButton } from '@/components/ui';
import { properties, type Property } from '@/data';

const statusFilters = ['All', 'Active', 'Pending', 'Sold', 'Under Review'] as const;

export function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [page, setPage] = useState(0);
  const perPage = 6;

  const filtered: Property[] = properties.filter((p) => {
    const matchesSearch =
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.owner.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => { setFilter(f); setPage(0); }}>
                {f}
              </FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Search address, owner, ID..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Property</span></PrimaryButton>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">ID</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Address</th>
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">Owner</th>
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
                  <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{p.owner}</td>
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
                <tr>
                  <td colSpan={10} className="px-5 py-12 text-center text-gray-400">No properties match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Showing {current.length} of {filtered.length} properties
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-brand-charcoal" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-7 h-7 rounded-md text-sm font-medium transition-colors ${page === i ? 'bg-brand-dark text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-brand-charcoal" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
