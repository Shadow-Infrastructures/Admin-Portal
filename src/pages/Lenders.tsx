import { Plus, Building2, Mail, TrendingUp, Wallet } from 'lucide-react';
import { Card, Badge, PrimaryButton } from '@/components/ui';
import { lenders } from '@/data';

export function LendersPage() {
  return (
    <div className="space-y-5">
      {/* Summary */}
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

      {/* Toolbar */}
      <div className="flex justify-end">
        <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Lender</span></PrimaryButton>
      </div>

      {/* Cards grid */}
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
