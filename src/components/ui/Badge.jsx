const badgeStyles = {
  Active:                'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  Pending:               'bg-amber-100 text-amber-700 border-amber-200',
  Sold:                  'bg-sky-100 text-sky-700 border-sky-200',
  'Under Review':        'bg-purple-100 text-purple-700 border-purple-200',
  Approved:              'bg-green-100 text-green-700 border-green-200',
  Rejected:              'bg-red-100 text-red-700 border-red-200',
  Inactive:              'bg-gray-100 text-gray-500 border-gray-200',
  Suspended:             'bg-red-100 text-red-600 border-red-200',
  Completed:             'bg-green-100 text-green-700 border-green-200',
  Failed:                'bg-red-100 text-red-700 border-red-200',
  Reversed:              'bg-purple-100 text-purple-700 border-purple-200',
  Verified:              'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  'Pending Verification':'bg-amber-100 text-amber-700 border-amber-200',
  Frozen:                'bg-red-100 text-red-600 border-red-200',
};

export function Badge({ status }) {
  const cls = badgeStyles[status] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}
