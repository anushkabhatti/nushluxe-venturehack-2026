import { ArrowRight, CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  dateLabel,
  daysUntil,
  eventDecision,
  orderedItems,
  type LifeEvent,
  type PlanItem,
} from "@/lib/planner";
import { destinationVisual } from "./destinations";
import haircare from "@/assets/haircare.jpg";
import wellness from "@/assets/wellness.jpg";
import skincare from "@/assets/skincare.jpg";

const decisionLabels: string[] = ["Book", "Replenish", "Plan", "Delay", "Skip"];

function awayLabel(event: LifeEvent, today: string) {
  const days = daysUntil(event.date, today);
  if (days < 0) return "Past event";
  if (days === 0) return "Today";
  return `${days} days away`;
}

export function DestinationCards({
  items,
  events,
  today,
  onEdit,
  onDelete,
  onOpen,
}: {
  items: PlanItem[];
  events: LifeEvent[];
  today: string;
  onEdit: (event: LifeEvent) => void;
  onDelete: (event: LifeEvent) => void;
  onOpen: (event: LifeEvent) => void;
}) {
  const ordered = orderedItems(items);
  return (
    <div className="destination-grid">
      {events.map((event, index) => {
        const visual = destinationVisual(event.name);
        return (
          <article className="destination-card" key={event.id}>
            <div className="destination-image">
              {visual ? (
                <img
                  src={visual.source}
                  alt={visual.alt}
                  width={1440}
                  height={960}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              ) : (
                <div className="event-placeholder">
                  <CalendarDays />
                  <span>{event.name}</span>
                </div>
              )}
              <span className="photo-note">{visual ? visual.note : event.type.toUpperCase()}</span>
            </div>
            <div className="destination-head">
              <p className="eyebrow">
                {event.type}
                {visual ? ` · ${visual.context}` : ""}
              </p>
              <div className="destination-actions">
                <Button
                  variant="ghost"
                  size="icon"
                  title={`Edit ${event.name}`}
                  aria-label={`Edit ${event.name}`}
                  onClick={() => onEdit(event)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title={`Delete ${event.name}`}
                  aria-label={`Delete ${event.name}`}
                  onClick={() => onDelete(event)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
            <h2>{event.name}</h2>
            <p className="destination-date">
              {dateLabel(event.date)} · {new Date(`${event.date}T12:00:00`).getFullYear()} ·{" "}
              {awayLabel(event, today)}
            </p>
            <h3>Beauty &amp; Wellness Plan</h3>
            <dl className="decision-list">
              {decisionLabels.map((label) => {
                const names = ordered
                  .filter((item) => eventDecision(item, event, today) === label)
                  .map((item) => item.name);
                return (
                  <div key={label} className={names.length ? "" : "decision-empty"}>
                    <dt>{label}</dt>
                    <dd>
                      {names.length
                        ? `${names.join(", ")}${label === "Replenish" ? " · check supply first" : ""}`
                        : "—"}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className="destination-foot">
              <p className="fine-print">Based on your usual frequencies, not exact inventory.</p>
              <Button
                variant="outline"
                size="icon"
                className="destination-open"
                title={`Open ${event.name} plan`}
                aria-label={`Open ${event.name} plan`}
                disabled={event.date < today}
                onClick={() => onOpen(event)}
              >
                <ArrowRight />
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// Presentation only: example brand names and imagery, nothing is sold or tracked here.
const travelEdit = [
  {
    title: "Haircare",
    brand: "Kérastase",
    source: haircare,
    alt: "Illustrative unbranded salon haircare bottles on a white surface",
    text: "Check travel sizes before you pack.",
  },
  {
    title: "Wellness & activewear",
    brand: "Alo",
    source: wellness,
    alt: "Illustrative unbranded white activewear, yoga mat and water bottle",
    text: "Pack what keeps your routine going away from home.",
  },
  {
    title: "Skincare & wellness",
    brand: "Sanctuary",
    source: skincare,
    alt: "Illustrative unbranded skincare jar, serum and towel on a white surface",
    text: "Check your supply first; replenish only if needed.",
  },
];

export function TravelEdit() {
  return (
    <section className="travel-edit">
      <p className="eyebrow">The edit</p>
      <h2>Travel Beauty &amp; Wellness Edit</h2>
      <p className="travel-edit-intro">
        What to look over before you pack — part of your plan, not a shop.
      </p>
      <div className="travel-edit-grid">
        {travelEdit.map((card) => (
          <article className="bag-card" key={card.title}>
            <div className="bag-card-image">
              <img src={card.source} alt={card.alt} width={900} height={900} loading="lazy" />
            </div>
            <p className="bag-eyebrow">Illustrative · e.g. {card.brand}</p>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
      <p className="bag-note">
        Brand names are illustrative examples · No affiliation · Nothing is sold here
      </p>
    </section>
  );
}
