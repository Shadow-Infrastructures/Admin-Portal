import { useState } from 'react';
import { ArrowLeft, Plus, Building2, Mail, UserRound } from 'lucide-react';
import { Card, Badge, PrimaryButton, GhostButton } from '@/components/ui';

const emptyForm = { name: '', title: '', email: '', lender: '' };

export function LenderCategoryView({ category, lenders, bankers, onBack, onAddBanker }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, lender: lenders[0]?.name ?? '' });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.lender) {
      setError('Name, email, and bank are required.');
      return;
    }
    onAddBanker({
      id: `BK-${Date.now()}`,
      name: form.name.trim(),
      title: form.title.trim() || 'Banker',
      email: form.email.trim(),
      lender: form.lender,
    });
    setForm({ ...emptyForm, lender: form.lender });
    setError(null);
    setShowForm(false);
  };

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-brand-charcoal focus:border-brand-teal focus:outline-none';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Back to categories">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-brand-charcoal">{category}</h2>
            <p className="text-xs text-gray-500">{lenders.length} banks in this category, each with its own banker team</p>
          </div>
        </div>
        {!showForm && (
          <PrimaryButton onClick={() => setShowForm(true)}>
            <span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Banker</span>
          </PrimaryButton>
        )}
      </div>

      {showForm && (
        <Card className="p-5">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1.5 text-sm">
              <span className="text-gray-600 font-medium">Full name</span>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="text-gray-600 font-medium">Role / title</span>
              <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="text-gray-600 font-medium">Email</span>
              <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="text-gray-600 font-medium">Bank</span>
              <select className={inputClass} value={form.lender} onChange={(e) => setForm({ ...form, lender: e.target.value })}>
                {lenders.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
            </label>
            {error && <p className="md:col-span-2 text-sm text-red-500">{error}</p>}
            <div className="md:col-span-2 flex justify-end gap-2">
              <GhostButton onClick={() => { setShowForm(false); setError(null); }}>Cancel</GhostButton>
              <PrimaryButton>Save Banker</PrimaryButton>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {lenders.map((lender) => {
          const team = bankers.filter((b) => b.lender === lender.name);
          return (
            <Card key={lender.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-dark/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-charcoal">{lender.name}</p>
                    <p className="text-xs text-gray-400">{team.length} {team.length === 1 ? 'banker' : 'bankers'} on team</p>
                  </div>
                </div>
                <Badge status={lender.status} />
              </div>

              {team.length === 0 ? (
                <p className="text-sm text-gray-400 py-4 text-center border border-dashed border-gray-200 rounded-lg">No bankers yet</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {team.map((b) => (
                    <li key={b.id} className="flex items-center gap-3 py-3">
                      <div className="w-9 h-9 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0">
                        <UserRound className="w-4 h-4 text-brand-dark" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-brand-charcoal truncate">{b.name}</p>
                        <p className="text-xs text-gray-500 truncate">{b.title}</p>
                      </div>
                      <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
                        <Mail className="w-3.5 h-3.5" />{b.email}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
