import { CalendarClock, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, SectionHeader } from '@/components/ui';
import { loans } from '@/data';
import { daysBetween, parseDisplayDate, startOfDay } from '@/lib/dates';

const LOCK_OUT_WINDOW_DAYS = 14;
const ADVISORY_OPEN_STATUSES = ['Pending', 'Under Review'];

export function TodoChecklist({ onNavigate }) {
  const today = startOfDay(new Date());

  const advisoryItems = loans
    .filter((l) => ADVISORY_OPEN_STATUSES.includes(l.status) && parseDisplayDate(l.advisoryDate) <= today)
    .map((l) => ({
      id: `advisory-${l.id}`,
      title: `Advisory call: ${l.borrower}`,
      detail: `${l.property} · handled by ${l.agent}`,
      date: l.advisoryDate,
      icon: CalendarClock,
      tone: 'bg-amber-100 text-amber-600',
    }));

  const lockOutItems = loans
    .filter((l) => l.status !== 'Active' && l.status !== 'Rejected')
    .filter((l) => {
      const days = daysBetween(today, parseDisplayDate(l.lockOutDate));
      return days >= 0 && days <= LOCK_OUT_WINDOW_DAYS;
    })
    .map((l) => ({
      id: `lockout-${l.id}`,
      title: `Nearing lock-out: ${l.borrower}`,
      detail: `${l.property} · handled by ${l.agent}`,
      date: l.lockOutDate,
      icon: Lock,
      tone: 'bg-red-100 text-red-600',
    }));

  const items = [...advisoryItems, ...lockOutItems];

  return (
    <Card className="p-5">
      <SectionHeader title="To-do Checklist" action={<span className="text-xs text-gray-400">{items.length} open</span>} />
      {items.length === 0 ? (
        <div className="flex items-center gap-3 px-3 py-6 text-sm text-gray-500">
          <CheckCircle2 className="w-5 h-5 text-brand-teal" />
          You are all caught up. No advisory calls or lock-outs are due.
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate({ page: 'loans' })}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${item.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-charcoal truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-teal transition-colors shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </Card>
  );
}
