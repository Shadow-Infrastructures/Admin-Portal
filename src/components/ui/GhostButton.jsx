export function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 hover:text-brand-charcoal transition-all"
    >
      {children}
    </button>
  );
}
