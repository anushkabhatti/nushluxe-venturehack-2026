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
  return days < 0 ? 'Overdue' : days <= 7 ? (item.kind === 'product' ? 'Replenish Soon' : 'Due Soon') : 'On Track';
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
  return { items: [item('nails', 'maintenance', 'Nail appointment', 'Nails', 21, 5, 55), item('hair', 'maintenance', 'Hair appointment', 'Hair', 42, 12, 90), item('brows', 'maintenance', 'Brow shaping', 'Brows', 28, -2, 25), item('facial', 'maintenance', 'Facial', 'Facial', 42, 21, 80), item('sunscreen', 'product', 'Sunscreen', 'Skincare', 30, 3, 24), item('moisturizer', 'product', 'Moisturizer', 'Skincare', 45, 10, 32), item('shampoo', 'product', 'Shampoo', 'Haircare', 60, 28, 28)], events: [{ id: 'trip', name: 'Weekend Trip', date: shiftDate(today, 8), type: 'Trip' }] };
}
export function insights(items: PlanItem[], events: LifeEvent[], today: string) {
  const result: { type: string; text: string }[] = [];
  const ordered = orderedItems(items);
  const upcomingEvent = [...events].filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
  const priority = ordered.find(i => i.kind === 'maintenance' && daysUntil(nextDate(i), today) <= 7);
  if (priority) result.push({ type: 'Prioritize', text: `${priority.name} ${status(priority, today) === 'Overdue' ? 'is overdue' : `is due ${dateLabel(nextDate(priority))}`}${upcomingEvent && nextDate(priority) <= upcomingEvent.date ? `, before ${upcomingEvent.name} on ${dateLabel(upcomingEvent.date)}` : ''}.` });
  const replenish = ordered.find(i => i.kind === 'product' && (daysUntil(nextDate(i), today) <= 7 || (upcomingEvent && nextDate(i) <= upcomingEvent.date)));
  if (replenish) result.push({ type: 'Replenish', text: `${replenish.name} is expected to need replenishing ${dateLabel(nextDate(replenish))}${upcomingEvent && nextDate(replenish) <= upcomingEvent.date ? `, before ${upcomingEvent.name}` : ''}.` });
  const delay = ordered.find(i => i.kind === 'maintenance' && daysUntil(nextDate(i), today) > 14);
  if (delay) result.push({ type: 'Delay', text: `${delay.name} is on track and can wait until ${dateLabel(nextDate(delay))}, based on your usual frequency.` });
  const spend = monthlySpend(items, today);
  if (spend.due.length) result.push({ type: 'Plan Ahead', text: `Approximately ${money(spend.total)} in maintenance and products is expected for the rest of ${format(parseISO(today), 'MMMM')}.` });
  return result;
}
