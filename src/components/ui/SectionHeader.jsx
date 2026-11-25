export function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold text-brand-charcoal">{title}</h2>
      {action}
    </div>
  );
}
