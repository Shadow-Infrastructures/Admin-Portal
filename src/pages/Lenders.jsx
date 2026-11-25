import { useState } from 'react';
import { Plus, Building2, Mail, Wallet, ChevronRight, Users } from 'lucide-react';
import { Card, Badge, PrimaryButton } from '@/components/ui';
import { LenderCategoryView } from '@/components/LenderCategoryView';
import { lenders, bankers as seedBankers } from '@/data';

export function LendersPage() {
  const [bankers, setBankers] = useState(seedBankers);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = Array.from(new Set(lenders.map((l) => l.type)));

  if (activeCategory) {
    const categoryLenders = lenders.filter((l) => l.type === activeCategory);
    return (
      <LenderCategoryView
        category={activeCategory}
        lenders={categoryLenders}
        bankers={bankers}
        onBack={() => setActiveCategory(null)}
        onAddBanker={(banker) => setBankers((prev) => [...prev, banker])}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-gray-500">Total Lenders</p>
          <p className="text-2xl font-bold text-brand-dark mt-1">{lenders.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-brand-teal mt-1">{lenders.filter(l => l.status === 'Active').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Total Volume</p>
          <p className="text-2xl font-bold text-brand-dark mt-1">
            ${lenders.reduce((s, l) => s + parseFloat(l.totalVolume.replace(/[$M]/g, '')), 0).toFixed(1)}M
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Active Loans</p>
          <p className="text-2xl font-bold text-brand-teal mt-1">{lenders.reduce((s, l) => s + l.activeLoans, 0)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const inCategory = lenders.filter((l) => l.type === category);
          const bankerCount = bankers.filter((b) => inCategory.some((l) => l.name === b.lender)).length;
          return (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className="group text-left">
              <Card className="p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-brand-teal/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-brand-teal" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal">{category}</p>
                      <p className="text-xs text-gray-500">{inCategory.length} banks · {bankerCount} bankers</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-teal transition-colors" />
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Lender</span></PrimaryButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {lenders.map((l) => (
          <Card key={l.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-dark/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-brand-dark" />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal">{l.name}</p>
                  <p className="text-xs text-gray-400">{l.type}</p>
                </div>
              </div>
              <Badge status={l.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center bg-gray-50 rounded-lg py-3">
                <p className="text-xs text-gray-400">Avg Rate</p>
                <p className="text-base font-bold text-brand-dark mt-0.5">{l.avgRate}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg py-3">
                <p className="text-xs text-gray-400">Loans</p>
                <p className="text-base font-bold text-brand-teal mt-0.5">{l.activeLoans}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg py-3">
                <p className="text-xs text-gray-400">Volume</p>
                <p className="text-base font-bold text-brand-dark mt-0.5">{l.totalVolume}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Mail className="w-3.5 h-3.5" />
                {l.contact}
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono text-gray-600">
                <Wallet className="w-3.5 h-3.5 text-brand-teal" />
                {l.bankAccount}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
