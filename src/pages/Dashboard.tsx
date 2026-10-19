import {
  Home, Landmark, DollarSign, Percent, Users as UsersIcon, Clock,
  Wallet, Building2, FileText,
  TrendingUp, TrendingDown, ArrowRight,
} from 'lucide-react';
import { Card, SectionHeader } from '@/components/ui';
import { Icon } from '@/components/Icon';
import {
  dashboardKPIs, recentActivity, loanVolumeData, propertyStatusData,
  financialSummary,
} from '@/data';

const kpiIcons: Record<string, typeof Home> = {
  Home, Landmark, DollarSign, Percent, Users: UsersIcon, Clock,
};

const finIcons: Record<string, typeof Home> = {
  Landmark, DollarSign, Building2, FileText,
};

export function DashboardPage() {
  const maxBar = Math.max(...loanVolumeData.map((d) => d.value));
  const donutTotal = propertyStatusData.reduce((s, d) => s + d.count, 0);
  let cumulative = 0;
  const segments = propertyStatusData.map((d) => {
    const start = (cumulative / donutTotal) * 360;
    cumulative += d.count;
    const end = (cumulative / donutTotal) * 360;
    return { ...d, start, end };
  });

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financialSummary.map((f) => {
          const FIcon = finIcons[f.icon] ?? Wallet;
          const isTeal = f.color === 'teal';
          return (
            <Card key={f.label} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isTeal ? 'bg-brand-teal/10' : 'bg-brand-dark/10'}`}>
                  <FIcon className={`w-5 h-5 ${isTeal ? 'text-brand-teal' : 'text-brand-dark'}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{f.label}</p>
                  <p className="text-xl font-bold text-brand-charcoal mt-0.5">{f.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {dashboardKPIs.map((kpi) => {
          const KIcon = kpiIcons[kpi.icon] ?? Home;
          const isTeal = kpi.color === 'teal';
          return (
            <Card key={kpi.label} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <p className="text-2xl font-bold text-brand-charcoal mt-1">{kpi.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${isTeal ? 'bg-brand-teal/10' : 'bg-brand-dark/10'}`}>
                  <KIcon className={`w-5 h-5 ${isTeal ? 'text-brand-teal' : 'text-brand-dark'}`} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {kpi.positive ? (
                  <TrendingUp className="w-4 h-4 text-brand-teal" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${kpi.positive ? 'text-brand-teal' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <Card className="lg:col-span-2 p-5">
          <SectionHeader
            title="Loan Volume (last 6 months)"
            action={<span className="text-xs text-gray-400">in millions</span>}
          />
          <div className="flex items-end justify-between gap-4 h-56 px-2">
            {loanVolumeData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end justify-center h-44 relative">
                  <div
                    className="w-full max-w-[48px] rounded-t-md bg-gradient-to-t from-brand-dark to-brand-teal transition-all duration-300 group-hover:opacity-80 cursor-pointer"
                    style={{ height: `${(d.value / maxBar) * 100}%` }}
                  >
                    <span className="absolute -translate-y-6 text-xs font-semibold text-brand-charcoal">
                      ${d.value}M
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut chart */}
        <Card className="p-5">
          <SectionHeader title="Property Status" />
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-40 h-40">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: segments
                    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
                    .join(', '),
                  WebkitMask: 'radial-gradient(transparent 52%, black 53%)',
                  mask: 'radial-gradient(transparent 52%, black 53%)',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-brand-charcoal">{donutTotal.toLocaleString()}</span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              {propertyStatusData.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                    <span className="text-gray-600">{d.label}</span>
                  </div>
                  <span className="font-medium text-brand-charcoal">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card className="p-5">
        <SectionHeader
          title="Recent Activity"
          action={
            <button className="text-sm text-brand-teal font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          }
        />
        <div className="space-y-1">
          {recentActivity.map((act) => {
            const iconBg =
              act.type === 'loan'     ? 'bg-brand-teal/10 text-brand-teal' :
              act.type === 'property' ? 'bg-brand-dark/10 text-brand-dark' :
              act.type === 'price'    ? 'bg-amber-100 text-amber-600' :
              act.type === 'bank'     ? 'bg-purple-100 text-purple-600' :
                                        'bg-sky-100 text-sky-600';
            return (
              <div
                key={act.id}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon
                    name={
                      act.type === 'loan'     ? 'Landmark' :
                      act.type === 'property' ? 'Home' :
                      act.type === 'price'    ? 'TrendingUp' :
                      act.type === 'bank'     ? 'Wallet' :
                                                'Building2'
                    }
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-charcoal">
                    <span className="font-medium">{act.user}</span>{' '}
                    <span className="text-gray-500">{act.action}</span>{' '}
                    {act.property !== '—' && <span className="font-medium">{act.property}</span>}
                  </p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{act.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
