import type { ReactNode } from 'react';

// ── Badge ───────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  Active:               'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  Pending:              'bg-amber-100 text-amber-700 border-amber-200',
  Sold:                 'bg-sky-100 text-sky-700 border-sky-200',
  'Under Review':       'bg-purple-100 text-purple-700 border-purple-200',
  Approved:             'bg-green-100 text-green-700 border-green-200',
  Rejected:             'bg-red-100 text-red-700 border-red-200',
  Inactive:             'bg-gray-100 text-gray-500 border-gray-200',
  Suspended:            'bg-red-100 text-red-600 border-red-200',
  Completed:            'bg-green-100 text-green-700 border-green-200',
  Failed:               'bg-red-100 text-red-700 border-red-200',
  Reversed:             'bg-purple-100 text-purple-700 border-purple-200',
  Verified:             'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  'Pending Verification':'bg-amber-100 text-amber-700 border-amber-200',
  Frozen:               'bg-red-100 text-red-600 border-red-200',
};

export function Badge({ status }: { status: string }) {
  const cls = badgeStyles[status] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

// ── Card ────────────────────────────────────────────────────
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-brand-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ── Section header ──────────────────────────────────────────
export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold text-brand-charcoal">{title}</h2>
      {action}
    </div>
  );
}

// ── Filter button ───────────────────────────────────────────
export function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-brand-dark text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
      `}
    >
      {children}
    </button>
  );
}

// ── Search input ────────────────────────────────────────────
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-3 pr-4 py-2 w-full sm:w-56 rounded-lg bg-gray-100 text-sm text-brand-charcoal placeholder-gray-400 border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all"
    />
  );
}

// ── Severity badge ─────────────────────────────────────────
const severityStyles: Record<string, string> = {
  Info:     'bg-sky-100 text-sky-700 border-sky-200',
  Warning:  'bg-amber-100 text-amber-700 border-amber-200',
  Critical: 'bg-red-100 text-red-700 border-red-200',
};

export function SeverityBadge({ severity }: { severity: string }) {
  const cls = severityStyles[severity] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {severity}
    </span>
  );
}

// ── Primary button ──────────────────────────────────────────
export function PrimaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-brand-teal text-brand-dark font-medium text-sm hover:bg-brand-teal/90 active:scale-[.98] transition-all"
    >
      {children}
    </button>
  );
}

// ── Ghost button ────────────────────────────────────────────
export function GhostButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 hover:text-brand-charcoal transition-all"
    >
      {children}
    </button>
  );
}
