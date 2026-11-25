const severityStyles = {
  Info:     'bg-sky-100 text-sky-700 border-sky-200',
  Warning:  'bg-amber-100 text-amber-700 border-amber-200',
  Critical: 'bg-red-100 text-red-700 border-red-200',
};

export function SeverityBadge({ severity }) {
  const cls = severityStyles[severity] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {severity}
    </span>
  );
}
