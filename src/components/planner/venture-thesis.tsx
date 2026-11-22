import { ArrowDown, ArrowRight, CalendarDays, NotebookPen, Package, Wallet } from 'lucide-react';

const actions = ['Book', 'Replenish', 'Plan', 'Delay', 'Skip'];
const interviewCount = '20+';
const topPain = 'Running out unexpectedly';
const quotes = [
  { text: 'Recently I had to repurchase a bunch of makeup in bulk bc everything runs out at the same time hair products', label: 'P03' },
  { text: 'When beauty products run out I forget and by time I want to buy it or go to friends', label: 'P0X' },
];
const stillValidating = ['Willingness to pay', 'How often the problem happens'];

export function VentureThesis() {
  return <div className="venture-thesis">
    <section id="founder">
      <p className="eyebrow text-muted-foreground">01 · Founder</p>
      <h2>Anushka Bhatti</h2>
      <p>Recent Babson master's graduate exploring consumer technology, beauty, wellness, and personal planning.</p>
    </section>
    <section id="problem">
      <p className="eyebrow text-muted-foreground">02 · The Problem</p>
      <h2>What do I actually need to do next?</h2>
      <p>Recurring beauty and wellness maintenance is often spread across calendars, Notes, memory, retailer apps, appointments, and purchase histories.</p>
      <p>That makes it difficult to know what actually needs attention next.</p>
      <div className="thesis-fragments">{['Appointments', 'Products', 'Events', 'Timing', 'Costs'].map(label => <span key={label}>{label}</span>)}<ArrowRight aria-hidden="true" /><strong>Disconnected today</strong></div>
    </section>
    <section id="customer">
      <p className="eyebrow text-muted-foreground">03 · Who We're Building For</p>
      <h2>Who we're building for</h2>
      <p>Women who regularly manage multiple recurring beauty and wellness services and personal-care products — especially around trips, events, and important dates.</p>
      <div className="thesis-examples">{['Hair', 'Nails', 'Brows/lashes', 'Skincare', 'Beauty products', 'Wellness'].map(label => <span key={label}>{label}</span>)}</div>
      <p className="fine-print">Initial customer hypothesis — currently being validated.</p>
    </section>
    <section id="approach">
      <p className="eyebrow text-muted-foreground">04 · The Nushluxe Approach</p>
      <h2>One personal plan for what comes next.</h2>
      <p>Nushluxe brings maintenance, product replenishment, life events, and estimated spending together to help users decide:</p>
      <div className="thesis-actions">{actions.map(action => <strong key={action}>{action}</strong>)}</div>
    </section>
    <section id="difference">
      <p className="eyebrow text-muted-foreground">05 · Why Nushluxe Is Different</p>
      <ul className="thesis-lines">{['Calendars store appointments.', 'Notes store lists.', 'Retailers help reorder products.', 'Budgeting tools track spending.'].map(line => <li key={line}>{line}</li>)}</ul>
      <h2>Nushluxe is exploring the decision layer between them.</h2>
      <div className="decision-diagram">
        <div className="decision-inputs">{[{ label: 'Calendar', icon: CalendarDays }, { label: 'Notes', icon: NotebookPen }, { label: 'Retail apps', icon: Package }, { label: 'Spending', icon: Wallet }].map(({ label, icon: Icon }) => <span key={label}><Icon aria-hidden="true" />{label}</span>)}</div>
        <ArrowDown aria-hidden="true" />
        <span className="nav-wordmark">NUSHLUXE</span>
        <ArrowDown aria-hidden="true" />
        <h3>What should I do next — and what can wait?</h3>
      </div>
      <p className="fine-print">A product thesis being tested, not a proven moat.</p>
    </section>
    <section id="learned">
      <p className="eyebrow text-muted-foreground">06 · Customer discovery · Babson Miami VentureHack</p>
      <h2>What we've learned</h2>
      <div className="learned-facts">
        <p><strong>{interviewCount}</strong> customer interviews</p>
        <p>Top pain: <strong>{topPain}</strong></p>
      </div>
      <ul className="learned-quotes">{quotes.map(quote => <li key={quote.text}><p className="validating-quote">"{quote.text}"</p><span className="fine-print">{quote.label}</span></li>)}</ul>
    </section>
    <section id="still-validating">
      <p className="eyebrow text-muted-foreground">07 · Still validating</p>
      <h2>Still validating</h2>
      <ul className="thesis-lines">{stillValidating.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
  </div>;
}
