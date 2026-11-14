import { ArrowDown, ArrowRight, CalendarDays, NotebookPen, Package, Wallet } from 'lucide-react';

const actions = ['Book', 'Replenish', 'Plan', 'Delay', 'Skip'];
const discoveryQuestions = [
  'How do women currently manage recurring beauty and wellness routines?',
  'Where does planning become inconvenient or time-consuming?',
  'How often do people unexpectedly run out of products?',
  'How do trips and events affect maintenance planning?',
  'How much does cost influence scheduling decisions?',
  'Which of these problems is important enough to solve first?',
];
const learningQuestions = [
  'Who should Nushluxe serve first?',
  'Which problem is painful enough to solve?',
  'Which features are essential versus unnecessary?',
  'What should be validated before building further?',
  'What would make this strong enough for beta testing?',
];

export function VentureThesis() {
  return <div className="venture-thesis">
    <section id="problem">
      <p className="eyebrow text-muted-foreground">01 · The Problem</p>
      <h2>What do I actually need to do next?</h2>
      <p>Recurring beauty and wellness maintenance is often spread across calendars, Notes, memory, retailer apps, appointments, and purchase histories.</p>
      <p>That makes it difficult to know what actually needs attention next.</p>
      <div className="thesis-fragments">{['Appointments', 'Products', 'Events', 'Timing', 'Costs'].map(label => <span key={label}>{label}</span>)}<ArrowRight aria-hidden="true" /><strong>Disconnected today</strong></div>
    </section>
    <section id="customer">
      <p className="eyebrow text-muted-foreground">02 · Who We're Building For</p>
      <h2>Who we're building for</h2>
      <p>Women who regularly manage multiple recurring beauty and wellness services and personal-care products — especially around trips, events, and important dates.</p>
      <div className="thesis-examples">{['Hair', 'Nails', 'Brows/lashes', 'Skincare', 'Beauty products', 'Wellness'].map(label => <span key={label}>{label}</span>)}</div>
      <p className="fine-print">Initial customer hypothesis — currently being validated.</p>
    </section>
    <section id="approach">
      <p className="eyebrow text-muted-foreground">03 · The Nushluxe Approach</p>
      <h2>One personal plan for what comes next.</h2>
      <p>Nushluxe brings maintenance, product replenishment, life events, and estimated spending together to help users decide:</p>
      <div className="thesis-actions">{actions.map(action => <strong key={action}>{action}</strong>)}</div>
    </section>
    <section id="difference">
      <p className="eyebrow text-muted-foreground">04 · Why Nushluxe Is Different</p>
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
    <section id="validating">
      <p className="eyebrow text-muted-foreground">Customer discovery · Babson Miami VentureHack</p>
      <h2>Currently validating</h2>
      <p>Nushluxe is conducting customer discovery to determine which customer segment and problem should shape the product first.</p>
      <p className="validating-quote">Build from evidence, not assumptions.</p>
      <div className="founder-note">
        <p className="eyebrow text-muted-foreground">Founder</p>
        <h3>Anushka Bhatti</h3>
        <p>Recent Babson master's graduate exploring consumer technology, beauty, wellness, and personal planning.</p>
      </div>
      <details className="thesis-details">
        <summary>Discovery and learning questions</summary>
        <div className="notes-grid">
          <div><p className="eyebrow text-muted-foreground">Customer discovery</p><ul>{discoveryQuestions.map(q => <li key={q}>{q}</li>)}</ul></div>
          <div><p className="eyebrow text-muted-foreground">What I want to learn today</p><ul>{learningQuestions.map(q => <li key={q}>{q}</li>)}</ul></div>
        </div>
      </details>
    </section>
  </div>;
}
