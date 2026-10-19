import { useState } from 'react';
import { TrendingUp, TrendingDown, Download, MapPin } from 'lucide-react';
import { Card, FilterButton, SearchInput, GhostButton } from '@/components/ui';
import { priceRecords, type PriceRecord } from '@/data';

const areaFilters = ['All', 'Portland', 'Seattle', 'Denver', 'Austin', 'Miami', 'Chicago'] as const;

export function PriceTrackingPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filtered: PriceRecord[] = priceRecords.filter((p) => {
    const matchesSearch =
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.area === filter;
    return matchesSearch && matchesFilter;
  });

  const avgChange = (filtered.filter(p => p.positive).length / Math.max(filtered.length, 1)) * 100;

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs text-gray-500">Tracked Properties</p>
          <p className="text-2xl font-bold text-brand-dark mt-1">{priceRecords.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500">Price Increases</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-brand-teal">{priceRecords.filter(p => p.positive).length}</p>
            <TrendingUp className="w-5 h-5 text-brand-teal" />
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500">Price Decreases</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-red-500">{priceRecords.filter(p => !p.positive).length}</p>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {areaFilters.map((f) => (
              <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</FilterButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={setSearch} placeholder="Search address or area..." />
            <GhostButton onClick={() => {}}><Download className="w-4 h-4" /></GhostButton>
          </div>
        </div>
      </Card>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4 text-brand-teal" />
                <span className="text-xs font-medium">{p.area}</span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.positive ? 'bg-brand-teal/10 text-brand-teal' : 'bg-red-100 text-red-600'}`}>
                {p.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {p.changePct}
              </div>
            </div>
            <p className="text-sm font-medium text-brand-charcoal mb-4 leading-snug">{p.address}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400">Previous</p>
                <p className="text-sm text-gray-500 line-through">{p.lastPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Current</p>
                <p className="text-lg font-bold text-brand-dark">{p.currentPrice}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-sm font-medium ${p.positive ? 'text-brand-teal' : 'text-red-500'}`}>{p.change}</span>
              <span className="text-xs text-gray-400">Updated {p.lastUpdated}</span>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="p-12 text-center text-gray-400 col-span-full">No price records match your filters.</Card>
        )}
      </div>
    </div>
  );
}
