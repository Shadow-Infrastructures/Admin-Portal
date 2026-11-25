export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
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
