export function FilterButton({ active, onClick, children }) {
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
