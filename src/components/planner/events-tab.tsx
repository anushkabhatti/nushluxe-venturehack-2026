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

const decisionLabels: string[] = ["Book", "Replenish", "Plan", "Delay", "Skip"];

function awayLabel(event: LifeEvent, today: string) {
  const days = daysUntil(event.date, today);
  if (days < 0) return "Past event";
  if (days === 0) return "Today";
  return `${days} days away`;
}

// One row per decision label, shared by the dashboard and the Events tab.
export function DecisionList({
  items,
  event,
  today,
}: {
  items: PlanItem[];
  event: LifeEvent;
  today: string;
}) {
  const ordered = orderedItems(items);
  return (
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
  );
}

export function DestinationCards({
  items,
  events,
  today,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onOpen,
}: {
  items: PlanItem[];
  events: LifeEvent[];
  today: string;
  selectedId: string | undefined;
  onSelect: (event: LifeEvent) => void;
  onEdit: (event: LifeEvent) => void;
  onDelete: (event: LifeEvent) => void;
  onOpen: (event: LifeEvent) => void;
}) {
  const selected = events.find((event) => event.id === selectedId);
  return (
    <>
      <div className="destination-grid">
        {events.map((event, index) => {
          const visual = destinationVisual(event.name);
          const active = event.id === selectedId;
          const past = event.date < today;
          return (
            <article
              className={`destination-card${active ? " destination-selected" : ""}`}
              key={event.id}
            >
              <div className="destination-image" onClick={past ? undefined : () => onSelect(event)}>
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
              </div>
              <div className="destination-row">
                <div>
                  <h2>{event.name}</h2>
                  <p className="destination-date">
                    {dateLabel(event.date)} · {new Date(`${event.date}T12:00:00`).getFullYear()}
                  </p>
                </div>
                <Button
                  variant={active ? "default" : "outline"}
                  size="icon"
                  className="destination-open"
                  title={`Select ${event.name}`}
                  aria-label={`Select ${event.name}`}
                  aria-pressed={active}
                  disabled={past}
                  onClick={() => onSelect(event)}
                >
                  <ArrowRight />
                </Button>
              </div>
            </article>
          );
        })}
      </div>
      {selected && (
        <section className="destination-plan" aria-live="polite">
          <div className="destination-head">
            <p className="eyebrow">
              {selected.type} · {awayLabel(selected, today)}
            </p>
            <div className="destination-actions">
              <Button
                variant="ghost"
                size="icon"
                title={`Edit ${selected.name}`}
                aria-label={`Edit ${selected.name}`}
                onClick={() => onEdit(selected)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title={`Delete ${selected.name}`}
                aria-label={`Delete ${selected.name}`}
                onClick={() => onDelete(selected)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <h2>Your {selected.name} plan</h2>
          <DecisionList items={items} event={selected} today={today} />
          <div className="destination-foot">
            <p className="fine-print">Based on your usual frequencies, not exact inventory.</p>
            <Button
              variant="outline"
              size="icon"
              className="destination-open"
              title={`Open ${selected.name} plan`}
              aria-label={`Open ${selected.name} plan`}
              onClick={() => onOpen(selected)}
            >
              <ArrowRight />
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
