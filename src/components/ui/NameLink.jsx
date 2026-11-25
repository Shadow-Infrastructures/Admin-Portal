import { agentDirectory } from '@/data';

export function NameLink({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-medium text-brand-charcoal text-left hover:text-brand-teal hover:underline underline-offset-4 transition-colors"
    >
      {name}
    </button>
  );
}

export function AgentCell({ name }) {
  const supervisor = agentDirectory[name]?.supervisor;
  return (
    <div className="min-w-0">
      <p className="text-brand-charcoal truncate">{name}</p>
      {supervisor && <p className="text-xs text-gray-400 truncate">under {supervisor}</p>}
    </div>
  );
}
