export function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-brand-teal text-brand-dark font-medium text-sm hover:bg-brand-teal/90 active:scale-[.98] transition-all"
    >
      {children}
    </button>
  );
}
