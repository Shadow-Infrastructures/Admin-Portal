export function Card({ children, className = '' }) {
  return (
    <div className={`bg-brand-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
