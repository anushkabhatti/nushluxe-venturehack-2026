import { addDays, differenceInCalendarDays, format, parseISO, isValid } from 'date-fns';

export type ItemKind = 'maintenance' | 'product';
export type PlanItem = { id: string; kind: ItemKind; name: string; category: string; lastDate: string; frequency: number; cost: number };
export type LifeEvent = { id: string; name: string; date: string; type: string };
export const categories = { maintenance: ['Hair', 'Nails', 'Brows', 'Lashes', 'Skincare', 'Facial', 'Massage', 'Fitness', 'Wellness', 'Other'], product: ['Skincare', 'Haircare', 'Makeup', 'Bodycare', 'Wellness', 'Other'] };
export const eventTypes = ['Vacation', 'Wedding', 'Birthday', 'Work Event', 'Trip', 'Other'];
export const todayDate = () => format(new Date(), 'yyyy-MM-dd');
export const shiftDate = (date: string, days: number) => format(addDays(parseISO(date), days), 'yyyy-MM-dd');
export const nextDate = (item: PlanItem) => shiftDate(item.lastDate, item.frequency);
export const daysUntil = (date: string, today: string) => differenceInCalendarDays(parseISO(date), parseISO(today));
export const dateLabel = (date: string) => format(parseISO(date), 'MMM d');
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export function status(item: PlanItem, today: string) {
  const days = daysUntil(nextDate(item), today);
  return days <= 7 ? (item.kind === 'product' ? 'Replenish' : 'Book') : days <= 14 ? 'Plan' : 'Delay';
}
export function completeItem(item: PlanItem, today: string): PlanItem { return { ...item, lastDate: today }; }
export function orderedItems(items: PlanItem[]) { return [...items].sort((a, b) => nextDate(a).localeCompare(nextDate(b)) || a.name.localeCompare(b.name)); }
export function planGroup(item: PlanItem, today: string) {
  const days = daysUntil(nextDate(item), today);
  return days <= 7 ? 'This Week' : days <= 14 ? 'Next 2 Weeks' : 'Later';
}
export function monthlySpend(items: PlanItem[], today: string) {
  const due = orderedItems(items).filter(item => nextDate(item).slice(0, 7) === today.slice(0, 7) && nextDate(item) >= today);
  const maintenance = due.filter(i => i.kind === 'maintenance').reduce((sum, i) => sum + i.cost, 0);
  const products = due.filter(i => i.kind === 'product').reduce((sum, i) => sum + i.cost, 0);
  return { maintenance, products, total: maintenance + products, due };
}
export function beforeEvent(items: PlanItem[], event: LifeEvent) { return orderedItems(items).filter(item => nextDate(item) <= event.date); }
export function validItem(item: Pick<PlanItem, 'name' | 'lastDate' | 'frequency' | 'cost'>, today: string) {
  return item.name.trim().length > 0 && isValid(parseISO(item.lastDate)) && item.lastDate <= today && Number.isInteger(item.frequency) && item.frequency >= 1 && Number.isFinite(item.cost) && item.cost >= 0;
}
export function exampleData(today: string): { items: PlanItem[]; events: LifeEvent[] } {
  const item = (id: string, kind: ItemKind, name: string, category: string, frequency: number, dueIn: number, cost: number): PlanItem => ({ id, kind, name, category, frequency, lastDate: shiftDate(today, dueIn - frequency), cost });
  return { items: [item('nails', 'maintenance', 'Nails', 'Nails', 14, 0, 60), item('brows', 'maintenance', 'Eyebrows', 'Brows', 35, 7, 35), item('hair', 'maintenance', 'Hair', 'Hair', 42, 19, 90), item('foundation', 'product', 'Foundation', 'Makeup', 45, 5, 48), item('haircare', 'product', 'Haircare', 'Haircare', 60, 25, 28)], events: [{ id: 'trip', name: 'New York City', date: shiftDate(today, 7), type: 'Trip' }] };
}
export function insights(items: PlanItem[], events: LifeEvent[], today: string) {
  const result: { type: string; text: string }[] = [];
  const ordered = orderedItems(items);
  const upcomingEvent = [...events].filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
  const priority = ordered.find(i => i.kind === 'maintenance' && daysUntil(nextDate(i), today) <= 7);
  if (priority) result.push({ type: 'Book', text: `${priority.name} ${daysUntil(nextDate(priority), today) < 0 ? 'is overdue' : `is due ${dateLabel(nextDate(priority))}`}${upcomingEvent && nextDate(priority) <= upcomingEvent.date ? `, before ${upcomingEvent.name} on ${dateLabel(upcomingEvent.date)}` : ''}.` });
  const replenish = ordered.find(i => i.kind === 'product' && (daysUntil(nextDate(i), today) <= 7 || (upcomingEvent && nextDate(i) <= upcomingEvent.date)));
  if (replenish) result.push({ type: 'Replenish', text: `Check ${replenish.name} supply around ${dateLabel(nextDate(replenish))}${upcomingEvent && nextDate(replenish) <= upcomingEvent.date ? `, before ${upcomingEvent.name}` : ''}. Replenish only if needed.` });
  const delay = ordered.find(i => i.kind === 'maintenance' && daysUntil(nextDate(i), today) > 14);
  if (delay) result.push({ type: 'Delay', text: `${delay.name} is on track and can wait until ${dateLabel(nextDate(delay))}, based on your usual frequency.` });
  const spend = monthlySpend(items, today);
  if (spend.due.length) result.push({ type: 'Plan', text: `Approximately ${money(spend.total)} in maintenance and products is expected for the rest of ${format(parseISO(today), 'MMMM')}.` });
  return result;
}

export function productStatus(item: PlanItem, today: string) {
  const days = daysUntil(nextDate(item), today);
  return days <= 7 ? 'Replenish' : days <= 14 ? 'Plan' : 'Delay';
}
export function tripForecast(items: PlanItem[], event: LifeEvent, today: string) {
  const book = orderedItems(items).filter(i => i.kind === 'maintenance' && nextDate(i) <= event.date);
  const skip = orderedItems(items).filter(i => i.kind === 'maintenance' && nextDate(i) > event.date);
  const check = orderedItems(items).filter(i => i.kind === 'product' && nextDate(i) <= event.date);
  // Only routines whose decision is Skip count as avoided; Plan items are still coming up soon.
  const avoided = skip.filter(i => eventDecision(i, event, today) === 'Skip');
  return { book, skip, avoided, check, maintenanceCost: book.reduce((s,i) => s+i.cost, 0), possibleProductCost: check.reduce((s,i) => s+i.cost, 0), total: [...book, ...check].reduce((s,i) => s+i.cost, 0), potentialAvoidedCost: avoided.reduce((s,i) => s+i.cost, 0), daysAway: daysUntil(event.date, today) };
}
export function eventDecision(item: PlanItem, event: LifeEvent, today: string) {
  const due = nextDate(item);
  if (due <= event.date) return item.kind === 'product' ? 'Replenish' : 'Book';
  const days = daysUntil(due, today);
  if (days <= 14) return 'Plan';
  return 'Skip';
}
export function tripRecommendation(items: PlanItem[], event: LifeEvent, today: string) {
  const { book, skip, check } = tripForecast(items,event,today);
  const parts: string[] = [];
  if (book.length) parts.push(`${book.map(i => i.name).join(' and ')} ${book.length === 1 ? 'is' : 'are'} expected to be due by ${dateLabel(event.date)}. Consider scheduling before ${event.name}.`);
  if (check.length) parts.push(`Check your ${check.map(i => i.name.toLowerCase()).join(' and ')} supply before packing; replenish only if needed.`);
  if (skip.length) parts.push(`${skip.map(i => i.name).join(' and ')} maintenance isn’t due yet, so there’s no need to book another appointment solely for this event.`);
  return parts.join(' ') || 'Add your routines and products to shape a plan around this event.';
}
