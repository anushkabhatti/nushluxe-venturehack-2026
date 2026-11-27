import founderPhoto from "@/assets/founder-anushka.png.asset.json";

const actions = ["Book", "Replenish", "Plan", "Delay", "Skip"];

export function VentureThesis() {
  return (
    <div className="venture-thesis">
      <section id="founder">
        <div className="founder-layout">
          <div>
            <p className="eyebrow text-muted-foreground">Founder</p>
            <h2>Anushka Bhatti</h2>
            <p>
              {
                "Anushka Bhatti's background sits at the intersection of business, technology, and entrepreneurship. After studying at Northeastern University, she completed her master's at Babson College and continued developing her technical foundation through AI and machine learning coursework at the University of Miami."
              }
            </p>
            <p>
              {
                "She originally expected to follow a more traditional business and consulting path, but became increasingly interested in technology, product building, and entrepreneurship."
              }
            </p>
            <p>{"Nushluxe grew out of that intersection."}</p>
            <p>
              {
                "What began as a personal Python and AI-focused project became an exploration of a problem Anushka understood firsthand: women often manage recurring beauty and wellness routines, products, appointments, trips, and related spending across separate tools, memory, and reminders."
              }
            </p>
            <p>
              {
                "Rather than immediately building a large product around that assumption, she began treating Nushluxe as an early-stage venture — conducting customer discovery, building and testing prototypes, and using real evidence to determine what the product should become."
              }
            </p>
            <p>{"Her approach is simple:"}</p>
            <p>
              {
                "Build enough to test. Learn from real behavior. Then decide what deserves to become the real product."
              }
            </p>
          </div>
          <img
            className="founder-photo"
            src={founderPhoto.url}
            alt="Anushka Bhatti, founder of Nushluxe"
          />
        </div>
      </section>
      <section id="problem">
        <p className="eyebrow text-muted-foreground">The Problem</p>
        <h2>Too many places. No clear next step.</h2>
        <p>Beauty and wellness routines are managed across memory, calendars, apps, and notes.</p>
      </section>
      <section id="approach">
        <p className="eyebrow text-muted-foreground">The Approach</p>
        <h2>Know what you need — and what can wait.</h2>
        <div className="thesis-actions">
          {actions.map((action) => (
            <strong key={action}>{action}</strong>
          ))}
        </div>
      </section>
      <section id="customer">
        <p className="eyebrow text-muted-foreground">Who It's For</p>
        <h2>Women managing recurring beauty and wellness routines around real life.</h2>
      </section>
      <section id="learned">
        <p className="eyebrow text-muted-foreground">What We're Exploring</p>
        <h2>Which problem matters most — and for whom.</h2>
      </section>
    </div>
  );
}
