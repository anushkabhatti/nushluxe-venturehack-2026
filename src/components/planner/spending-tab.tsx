import { CalendarDays, Check, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dateLabel, daysUntil, money, nextDate, tripForecast, type LifeEvent, type PlanItem } from '@/lib/planner';

export function SpendingTab({ items, event, today, onEvents }: { items: PlanItem[]; event: LifeEvent | undefined; today: string; onEvents: () => void }) {
  const forecast = event ? tripForecast(items, event, today) : undefined;
  if (!event || !forecast) return <div className="no-trip"><CalendarDays /><h2>Spending takes shape with a date.</h2><p>Add a trip or event to see planned, possible, and avoidable costs.</p><Button onClick={onEvents}>Add a life event</Button></div>;
  const away = daysUntil(event.date, today);
  return <div className="spending-tab">
    <section className="spending-section">
      <div className="consumer-section-heading"><div><p className="eyebrow text-muted-foreground">01 · Estimated upcoming spend</p><h2>Planned appointments</h2><p>Services expected to be due by {dateLabel(event.date)}.</p></div><Wallet className="text-muted-foreground size-5" /></div>
      {forecast.book.length ? <>{forecast.book.map(i => <div className="trip-cost" key={i.id}><span>{i.name}<small>{dateLabel(nextDate(i))}</small></span><strong>{money(i.cost)}</strong></div>)}<div className="trip-total"><span>Planned spend</span><strong>{money(forecast.maintenanceCost)}</strong></div></> : <p className="body-copy">No appointments are expected to be due before {event.name}.</p>}
    </section>
    <section className="spending-section">
      <div className="consumer-section-heading"><div><p className="eyebrow text-muted-foreground">02 · Possible additional expenses</p><h2>Only if needed</h2><p>Check your existing supply before purchasing another.</p></div></div>
      {forecast.check.length ? <>{forecast.check.map(i => <div className="trip-cost" key={i.id}><span>{i.name} replenishment<small>Check around {dateLabel(nextDate(i))}</small></span><strong>+{money(i.cost)}</strong></div>)}<p className="fine-print">Optional replenishment is not included in planned spend.</p></> : <p className="body-copy">Nothing in your beauty bag is expected to need replacing before this event.</p>}
    </section>
    <section className="spending-section">
      <div className="consumer-section-heading"><div><p className="eyebrow text-muted-foreground">03 · Potential avoided spend</p><h2>You may avoid {money(forecast.potentialAvoidedCost)} by skipping appointments that aren’t due yet.</h2></div></div>
      {forecast.avoided.length ? <>{forecast.avoided.map(i => <div className="trip-cost" key={i.id}><span>{i.name}<small>Not due yet · next expected {dateLabel(nextDate(i))}</small></span><strong>{money(i.cost)}</strong></div>)}<div className="avoid-cost"><Check /><span>Estimated avoided appointment cost — {money(forecast.potentialAvoidedCost)}.</span></div></> : <p className="body-copy">Every routine is expected to be due before this event, so there is nothing to skip.</p>}
    </section>
    <section className="spending-section">
      <div className="consumer-section-heading"><div><p className="eyebrow text-muted-foreground">04 · Event spending</p><h2>{event.name} {event.type}</h2><p>{dateLabel(event.date)} · {away === 0 ? 'Today' : `${away} days away`}</p></div></div>
      <div className="event-card">
        <div className="trip-cost"><span>Planned before {event.type.toLowerCase()}</span><strong>{money(forecast.maintenanceCost)}</strong></div>
        <div className="trip-cost"><span>Possible additional product cost</span><strong>{money(forecast.possibleProductCost)}</strong></div>
        <p className="spending-close">Plan before you book or buy.</p>
      </div>
      <p className="fine-print">Estimates come from your usual frequencies. Nushluxe does not connect to banks, cards, or financial accounts.</p>
    </section>
  </div>;
}
