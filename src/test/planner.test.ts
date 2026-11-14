import { describe, expect, it } from 'vitest';
import { beforeEvent, completeItem, exampleData, insights, monthlySpend, nextDate, planGroup, status, validItem, type PlanItem } from '@/lib/planner';

const today = '2026-11-14';
const routine: PlanItem = { id: 'nails', kind: 'maintenance', name: 'Nails', category: 'Nails', lastDate: '2026-10-29', frequency: 21, cost: 55 };
describe('Nushluxe planning rules', () => {
  it('calculates the next date from the last completion plus frequency', () => { expect(nextDate(routine)).toBe('2026-11-19'); });
  it('mark completed recalculates from today', () => { expect(nextDate(completeItem(routine, today))).toBe('2026-12-05'); });
  it('mark replenished recalculates products from today', () => { expect(nextDate(completeItem({ ...routine, kind: 'product', frequency: 30 }, today))).toBe('2026-12-14'); });
  it('marks past dates overdue', () => { expect(status({ ...routine, lastDate: '2026-10-20' }, today)).toBe('Overdue'); });
  it('marks maintenance within seven days due soon', () => { expect(status(routine, today)).toBe('Due Soon'); });
  it('marks products within seven days replenish soon', () => { expect(status({ ...routine, kind: 'product' }, today)).toBe('Replenish Soon'); });
  it('marks dates more than seven days away on track', () => { expect(status({ ...routine, frequency: 30 }, today)).toBe('On Track'); });
  it('groups the next week and next two weeks chronologically', () => { expect(planGroup(routine, today)).toBe('This Week'); expect(planGroup({ ...routine, frequency: 28 }, today)).toBe('Next 2 Weeks'); expect(planGroup({ ...routine, frequency: 42 }, today)).toBe('Later'); });
  it('sums upcoming costs this calendar month, excluding overdue and later months', () => { const spend = monthlySpend(exampleData(today).items, today); expect(spend.maintenance).toBe(145); expect(spend.products).toBe(56); expect(spend.total).toBe(201); });
  it('shows only routines and products expected before or on the event date', () => { const data = exampleData(today); const event = data.events[0]; if (!event) throw new Error('Missing fictional trip'); expect(beforeEvent(data.items, event).map(i => i.id)).toEqual(['brows', 'sunscreen', 'nails']); });
  it('uses event and routine dates in deterministic insights', () => { const data = exampleData(today); const result = insights(data.items, data.events, today); expect(result.find(i => i.type === 'Prioritize')?.text).toContain('overdue, before Weekend Trip'); expect(result.find(i => i.type === 'Replenish')?.text).toContain('Sunscreen'); expect(result.find(i => i.type === 'Delay')?.text).toContain('Facial'); expect(result.find(i => i.type === 'Plan Ahead')?.text).toContain('$201'); });
  it('rejects future completion dates, fractional frequencies and negative costs', () => { expect(validItem(routine, today)).toBe(true); expect(validItem({ ...routine, lastDate: '2026-11-15' }, today)).toBe(false); expect(validItem({ ...routine, frequency: 0 }, today)).toBe(false); expect(validItem({ ...routine, frequency: 1.5 }, today)).toBe(false); expect(validItem({ ...routine, cost: -1 }, today)).toBe(false); });
  it('empty data yields zero spending and no insights', () => { expect(monthlySpend([], today).total).toBe(0); expect(insights([], [], today)).toEqual([]); });
});