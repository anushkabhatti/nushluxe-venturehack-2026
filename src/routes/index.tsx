import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, ArrowDown, CalendarDays, Package, Calendar, NotebookPen, Plane, Wallet, Check, RotateCcw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import editorialImage from "@/assets/nushluxe-editorial.jpg";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Nushluxe — Beauty, Wellness & What Comes Next" },
    { name: "description", content: "Meet Nushluxe: an early-stage personal maintenance intelligence platform. Explore the live MVP, the long-term vision, and an evidence-led customer discovery journey for Babson Miami VentureHack." },
    { property: "og:title", content: "Nushluxe — Beauty, Wellness & What Comes Next" },
    { property: "og:description", content: "From recurring maintenance to intelligent planning. Explore the current MVP and the customer discovery shaping what comes next." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const mvpUrl = "https://nushluxe.streamlit.app";
const features = ["Recurring beauty/wellness maintenance tracking", "Product replenishment tracking", "Automatic next-date calculations", "Maintenance and replenishment statuses", "Estimated product cost tracking", "Combined planning overview", "Isolated temporary demo sessions", "Resettable demo data", "Feedback collection"];
const fragments = [{ label: "Appointments", icon: CalendarDays }, { label: "Products", icon: Package }, { label: "Calendar", icon: Calendar }, { label: "Notes", icon: NotebookPen }, { label: "Trips & Events", icon: Plane }, { label: "Spending", icon: Wallet }];
const topics = ["Recurring appointments", "Product replenishment", "Existing tracking methods", "Trips & important events", "Beauty/wellness spending", "Current workarounds", "Time or money lost", "Recurring frustrations"];
const steps = ["Recruit", "Interview", "Identify Patterns", "Define First Customer + Problem", "Build With Evidence", "Prototype Test"];
const futureAreas = ["Financial planning / budgeting", "Trips and life events", "Smarter prioritization", "Personalized forecasting", "AI explanations", "Persistent accounts"];
const learning = ["Which customer segment should Nushluxe investigate first?", "Which recurring problem appears important enough to build around?", "What evidence should I collect before expanding the product?", "How should I think about progressing from customer discovery to beta?", "What milestones would make Nushluxe compelling for accelerators, university programs, and early funding?"];

function MvpLink({ children = "View Live MVP" }: { children?: ReactNode }) {
  return <Button asChild className="editorial-button"><a href={mvpUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight aria-hidden="true" /></a></Button>;
}
function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span className="section-number">{number}</span><span className="eyebrow eyebrow-spaced">{children}</span></div>;
}

function Index() {
  return <>
    <header className="site-header sticky top-0 z-50">
      <div className="header-inner">
        <a href="#top" className="nav-wordmark" aria-label="Nushluxe home">NUSHLUXE</a>
        <nav className="desktop-nav flex items-center gap-8" aria-label="Main navigation">
          <a className="nav-link" href="#vision">The Vision</a><a className="nav-link" href="#mvp">Current MVP</a><a className="nav-link" href="#discovery">Customer Discovery</a><a className="nav-link" href="#founder">Founder</a>
        </nav>
        <MvpLink />
      </div>
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <img src={editorialImage} alt="Beauty essentials, a notebook, and a blush calla lily arranged in an editorial still life" className="hero-photo" width={1920} height={640} fetchPriority="high" />
        <div className="hero-content reveal">
          <p className="eyebrow eyebrow-spaced text-muted-foreground">Personal Maintenance Intelligence</p>
          <h1 id="hero-title" className="hero-wordmark">NUSHLUXE</h1>
          <h2 className="hero-headline">Your beauty and wellness life,<br className="hidden sm:block" /> organized around <em>what comes next.</em></h2>
          <p className="hero-copy">Nushluxe is exploring a smarter way for women to manage recurring beauty and wellness routines — from appointments and product replenishment to the planning that surrounds them.</p>
          <div className="hero-actions flex flex-wrap justify-center gap-3 mt-6"><MvpLink /><Button asChild variant="outline" className="editorial-button"><a href="#vision">Explore the Vision<ArrowDown aria-hidden="true" /></a></Button></div>
          <p className="status-label mt-5"><span className="status-dot" />Early-stage MVP · Currently in Customer Discovery</p>
        </div>
      </section>

      <section id="vision" className="section">
        <div className="section-inner split-section">
          <div><SectionLabel number="01">The Problem We Are Exploring</SectionLabel><h2 className="section-title">Personal maintenance<br />lives <em>everywhere.</em></h2><p className="body-copy">Women may manage recurring appointments, products, reminders, purchases, trips, events, and related spending across memory, calendars, Notes, retailer apps, subscriptions, and other disconnected tools.</p><p className="body-copy mt-4">Nushluxe is currently conducting customer discovery to understand where the most meaningful friction actually exists.</p></div>
          <div aria-label="Exploring how disconnected maintenance tools could come together in Nushluxe"><div className="fragment-grid">{fragments.map(({ label, icon: Icon }) => <div className="fragment" key={label}><Icon aria-hidden="true" /><span>{label}</span></div>)}</div><div className="converge" /><div className="diagram-brand">NUSHLUXE</div><p className="text-center text-muted-foreground text-[10px] mt-2">One possible home. A hypothesis we’re testing.</p></div>
        </div>
      </section>

      <section className="section bg-blush text-center">
        <div className="section-inner"><div className="flex justify-center"><SectionLabel number="02">Long-Term Product Vision</SectionLabel></div><h2 className="vision-statement">What if personal maintenance could become <em>a plan</em> instead of a collection of reminders?</h2>
          <div className="vision-formula"><span>Maintenance</span><span className="text-muted-foreground">+</span><span>Products</span><span className="text-muted-foreground">+</span><span>Timing</span><span className="text-muted-foreground">+</span><span className="vision-context">Eventually: Costs & Life Context</span></div>
          <ArrowDown className="mx-auto size-4 text-muted-foreground" aria-hidden="true" /><p className="vision-output my-4">Nushluxe Intelligence</p><ArrowDown className="mx-auto size-4 text-muted-foreground" aria-hidden="true" /><p className="text-sm mt-4">A clearer view of what needs attention next</p>
          <p className="body-copy max-w-xl mx-auto mt-8">The long-term vision is not simply to remind users that something is due. It is to eventually help answer:</p><div className="question-list">{["What needs attention?", "What needs replenishing?", "What is coming up?", "What should be prioritized?", "What can wait?"].map(q => <span key={q}>{q}</span>)}</div>
        </div>
      </section>

      <section id="mvp" className="section"><div className="section-inner split-section">
        <div><SectionLabel number="03">What Exists Today</SectionLabel><h2 className="section-title">The V1 MVP</h2><p className="body-copy">A working starting point. Intentionally focused.</p><ul className="feature-list">{features.map(feature => <li className="feature-line" key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><MvpLink>Open Live MVP</MvpLink><p className="body-copy mt-5 text-xs">The current version is intentionally simple while customer discovery determines what deserves to be built next.</p></div>
        <div className="product-preview"><div className="preview-header"><span className="nav-wordmark">NUSHLUXE</span><span className="eyebrow text-success">Current V1</span></div><div className="preview-body"><p className="eyebrow text-muted-foreground mb-3">Product Overview</p><h3 className="font-display text-3xl">A little more clarity.</h3><p className="body-copy text-xs mt-2">Maintenance and replenishment, together.</p>{[{ icon: CalendarDays, title: "Beauty & wellness maintenance", detail: "Recurring routines · Automatic next dates" }, { icon: Package, title: "Product replenishment", detail: "Replenishment statuses · Estimated costs" }, { icon: Layers, title: "Combined planning overview", detail: "Maintenance and products in one view" }, { icon: RotateCcw, title: "An easy-to-explore demo", detail: "Temporary sessions · Resettable data · Feedback" }].map(({icon: Icon, title, detail}) => <div className="preview-row" key={title}><Icon aria-hidden="true" /><div><p className="preview-row-title">{title}</p><p className="preview-row-detail">{detail}</p></div><Check className="ml-auto text-success" aria-hidden="true" /></div>)}</div><div className="preview-footer">Illustrative feature overview · Explore the working MVP via the link</div></div>
      </div></section>

      <section id="discovery" className="section bg-paper"><div className="section-inner"><SectionLabel number="04">Customer Discovery</SectionLabel><div className="discovery-top"><div><h2 className="section-title">Building from evidence,<br /><em>not assumptions.</em></h2><blockquote className="discovery-quote">“Don’t assume the problem — discover it.”</blockquote><p className="inline-flex border border-border px-4 py-3 text-[11px]">Target: approximately 15–20 discovery interviews</p></div><div><p className="body-copy">Before adding major new features, Nushluxe is conducting structured customer discovery with women who manage recurring beauty and wellness routines.</p><p className="body-copy mt-3">The research explores current behavior around:</p><div className="research-topics">{topics.map(topic => <span key={topic}>{topic}</span>)}</div></div></div><ol className="process">{steps.map((step, i) => <li key={step} className="process-step"><span className="process-step-number">0{i+1}</span>{step}{i < steps.length-1 && <ArrowRight aria-hidden="true" />}</li>)}</ol></div></section>

      <section className="section"><div className="section-inner split-section"><div><SectionLabel number="05">What We Are Not Doing Yet</SectionLabel><h2 className="section-title">Intentional <em>Restraint</em></h2><p className="body-copy">Nushluxe has a broad long-term vision, but the next product features will be determined by customer evidence.</p><p className="body-copy mt-4">Potential future areas being explored — not features in the current MVP:</p><p className="text-xs text-blush-foreground mt-6">These are hypotheses, not validated product requirements.</p></div><div className="future-list">{futureAreas.map(area => <div className="future-item" key={area}><span>{area}</span><ArrowUpRight aria-hidden="true" /></div>)}</div></div></section>

      <section id="roadmap" className="section bg-paper"><div className="section-inner"><SectionLabel number="06">Current Roadmap</SectionLabel><h2 className="section-title">The next chapter,<br /><em>shaped by evidence.</em></h2><div className="timeline"><div className="timeline-stage"><p className="eyebrow">Now</p><h3>Stable V1 MVP</h3><p>A focused foundation for learning.</p></div><div className="timeline-stage"><p className="eyebrow">November–December 2026</p><h3>Customer Discovery</h3><p>Identify recurring pain + initial customer segment.</p><ArrowDown className="size-3 my-3 text-muted-foreground" aria-hidden="true" /><p>Refine product around evidence.</p></div><div className="timeline-stage"><p className="eyebrow">2027 · Planned</p><h3>Prototype Testing & Beta</h3><p>Measure activation, engagement, retention and willingness to pay.</p></div></div></div></section>

      <section id="founder" className="section"><div className="section-inner founder-grid"><div className="founder-monogram" aria-hidden="true">AB</div><div><SectionLabel number="07">Founder</SectionLabel><h2 className="section-title">Anushka Bhatti</h2><p className="body-copy">Recent Babson master’s graduate exploring the intersection of consumer technology, beauty, wellness, and personal planning.</p><p className="body-copy mt-4">Currently building Nushluxe while conducting structured customer discovery and continuing technical development of the MVP.</p><p className="eyebrow text-muted-foreground mt-6">Babson Miami VentureHack · 2026</p></div></div></section>

      <section className="section bg-paper"><div className="section-inner split-section"><div><SectionLabel number="08">At VentureHack</SectionLabel><h2 className="section-title">What I’m Looking<br /><em>to Learn</em></h2><p className="body-copy max-w-sm">A chance to challenge the assumptions, sharpen the questions, and make the next steps more intentional.</p></div><ol className="learning-list">{learning.map((question, i) => <li className="learning-item" key={question}><span>0{i+1}</span>{question}</li>)}</ol></div></section>

      <section className="closing bg-blush"><p className="eyebrow eyebrow-spaced text-muted-foreground mb-4">A Thoughtful Beginning</p><h2 className="closing-wordmark">NUSHLUXE</h2><h3 className="font-display text-3xl sm:text-4xl">From recurring maintenance<br />to <em>intelligent planning.</em></h3><p className="body-copy max-w-md mx-auto mt-5">Currently validating the problem, defining the first customer, and building the next version from evidence.</p><div className="flex flex-wrap justify-center gap-3 mt-7"><MvpLink /><Button asChild variant="outline" className="editorial-button"><a href="#founder">Connect / Discuss Nushluxe<ArrowUpRight aria-hidden="true" /></a></Button></div></section>
    </main>
    <footer className="footer"><div className="section-inner flex justify-between items-center"><p>© 2026 Nushluxe · Anushka Bhatti</p><p>Early-stage MVP · Customer discovery in progress</p><a href="#top" className="flex items-center gap-2">Back to top<ArrowUpRight className="size-3" aria-hidden="true" /></a></div></footer>
  </>;
}
