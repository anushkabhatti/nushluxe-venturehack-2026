import { ArrowDown, ArrowRight, CalendarDays, NotebookPen, Package, Wallet } from 'lucide-react';
import founderPhoto from '@/assets/founder-anushka.png.asset.json';

const actions = ['Book', 'Replenish', 'Plan', 'Delay', 'Skip'];
const discoveryIntro = 'Our early conversations are helping us understand the everyday challenges of managing beauty and wellness routines—and where more thoughtful planning could make a meaningful difference.';
const researchThemes = [
  { title: 'Fragmented routines', text: 'Appointments, products, and upcoming commitments can be difficult to coordinate when information is spread across multiple places.' },
  { title: 'Unplanned replenishment', text: "Knowing when to replace everyday products is an area we're exploring, particularly when several purchases overlap." },
  { title: 'Deciding what matters next', text: "We're investigating whether a single, personalized plan could reduce the effort of deciding what needs attention and what can wait." },
];
const stillValidatingIntro = 'Nushluxe is still in the early validation stage. We are continuing to test which problems are most frequent, which use cases feel most urgent, and whether women would pay for a product that helps them decide what to do next.';
const stillValidating = [
  'Problem frequency — How often do these planning and replenishment challenges occur?',
  'Most urgent use case — Which problem is most important to solve first?',
  'Willingness to pay — Would women pay for this convenience, and under what conditions?',
];

export function VentureThesis() {
  return <div className="venture-thesis">
    <section id="founder">
      <div className="founder-layout">
        <div>
          <p className="eyebrow text-muted-foreground">Founder</p>
          <h2>Anushka Bhatti</h2>
          <p>Originally from Miami, Anushka Bhatti studied at Northeastern University before earning her master's degree in Entrepreneurial Leadership from Babson College.</p>
          <p>As the founder of Nushluxe, she is exploring how consumer technology can simplify the planning and decision-making behind recurring beauty and wellness maintenance.</p>
          <p>Her vision is to bring appointments, product replenishment, upcoming events, and expected spending into one thoughtful experience—helping women understand what needs attention, what can wait, and how to plan their personal-care budgets with greater intention.</p>
        </div>
        <img className="founder-photo" src={founderPhoto.url} alt="Anushka Bhatti, founder of Nushluxe" />
      </div>
    </section>
    <section id="problem">
      <p className="eyebrow text-muted-foreground">The Problem</p>
      <h2>What do I actually need to do next?</h2>
      <p>Recurring beauty and wellness maintenance is often spread across calendars, Notes, memory, retailer apps, appointments, and purchase histories.</p>
      <p>That makes it difficult to know what actually needs attention next.</p>
      <div className="thesis-fragments">{['Appointments', 'Products', 'Events', 'Timing', 'Costs'].map(label => <span key={label}>{label}</span>)}<ArrowRight aria-hidden="true" /><strong>Disconnected today</strong></div>
    </section>
    <section id="customer">
      <p className="eyebrow text-muted-foreground">Who We're Building For</p>
      <h2>Who we're building for</h2>
      <p>Women who regularly manage multiple recurring beauty and wellness services and personal-care products — especially around trips, events, and important dates.</p>
      <div className="thesis-examples">{['Hair', 'Nails', 'Brows/lashes', 'Skincare', 'Beauty products', 'Wellness'].map(label => <span key={label}>{label}</span>)}</div>
      <p className="fine-print">Initial customer hypothesis — currently being validated.</p>
    </section>
    <section id="approach">
      <p className="eyebrow text-muted-foreground">The Nushluxe Approach</p>
      <h2>One personal plan for what comes next.</h2>
      <p>Nushluxe brings maintenance, product replenishment, life events, and estimated spending together to help users decide:</p>
      <div className="thesis-actions">{actions.map(action => <strong key={action}>{action}</strong>)}</div>
    </section>
    <section id="difference">
      <h2>Why Nushluxe Is Different</h2>
      <ul className="thesis-lines">{['Calendars store appointments.', 'Notes store lists.', 'Retailers help reorder products.', 'Budgeting tools track spending.'].map(line => <li key={line}>{line}</li>)}</ul>
      <p>Nushluxe is exploring the decision layer between them.</p>
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
      <p className="eyebrow text-muted-foreground">Customer discovery · Babson Miami VentureHack</p>
      <h2>What we're learning</h2>
      <p>{discoveryIntro}</p>
      <ul className="research-themes">{researchThemes.map(theme => <li key={theme.title}><strong>{theme.title}</strong><p>{theme.text}</p></li>)}</ul>
      <p className="fine-print">Early research themes under investigation, not confirmed findings across all participants.</p>
    </section>
    <section id="still-validating">
      <p className="eyebrow text-muted-foreground">Still validating</p>
      <h2>Still validating</h2>
      <p>{stillValidatingIntro}</p>
      <ul className="thesis-lines">{stillValidating.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
  </div>;
}
