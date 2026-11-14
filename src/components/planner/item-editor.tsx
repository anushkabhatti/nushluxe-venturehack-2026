import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { categories, todayDate, validItem, type PlanItem, type ItemKind } from '@/lib/planner';

export function ItemEditor({ kind, item, onSave, onClose }: { kind: ItemKind; item?: PlanItem; onSave: (item: PlanItem) => void; onClose: () => void }) {
  const today = todayDate();
  const [name, setName] = useState(item?.name ?? '');
  const [category, setCategory] = useState(item?.category ?? categories[kind][0] ?? 'Other');
  const [date, setDate] = useState(item?.lastDate ?? today);
  const [frequency, setFrequency] = useState(String(item?.frequency ?? 30));
  const [cost, setCost] = useState(String(item?.cost ?? 0));
  const [error, setError] = useState('');
  const label = kind === 'maintenance' ? 'routine' : 'product';
  function submit(e: FormEvent) {
    e.preventDefault();
    const value: PlanItem = { id: item?.id ?? crypto.randomUUID(), kind, name: name.trim(), category, lastDate: date, frequency: Number(frequency), cost: Number(cost) };
    if (!validItem(value, today)) { setError('Enter a name, a past or current date, a whole-day frequency, and a non-negative cost.'); return; }
    onSave(value);
  }
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="planner-dialog"><DialogHeader><DialogTitle className="font-display text-3xl font-normal">{item ? 'Edit' : 'Add'} {label}</DialogTitle><DialogDescription>{kind === 'maintenance' ? 'A little care, on your schedule.' : 'Keep your everyday essentials in rhythm.'}</DialogDescription></DialogHeader><form onSubmit={submit} className="editor-form">
    <label>{kind === 'maintenance' ? 'Service name' : 'Product name'}<Input autoFocus required maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder={kind === 'maintenance' ? 'e.g. Nail appointment' : 'e.g. Sunscreen'} /></label>
    <label>Category<select value={category} onChange={e => setCategory(e.target.value)}>{categories[kind].map(c => <option key={c}>{c}</option>)}</select></label>
    <label>{kind === 'maintenance' ? 'Last completed date' : 'Last purchased / replenished date'}<Input required type="date" max={today} value={date} onChange={e => setDate(e.target.value)} /></label>
    <div className="form-pair"><label>Frequency (days)<Input required type="number" min={1} max={3650} step={1} value={frequency} onChange={e => setFrequency(e.target.value)} /></label><label>Estimated cost ($)<Input required type="number" min={0} max={100000} step="0.01" value={cost} onChange={e => setCost(e.target.value)} /></label></div>
    {error && <p role="alert" className="text-destructive text-sm">{error}</p>}<div className="flex justify-end gap-2 mt-3"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit">{item ? 'Save changes' : `Add ${label}`}</Button></div>
  </form></DialogContent></Dialog>;
}
