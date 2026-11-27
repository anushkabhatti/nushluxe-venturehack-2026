import { ArrowRight, CalendarDays, Check, Package, Scissors, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  dateLabel,
  daysUntil,
  eventDecision,
  nextDate,
  orderedItems,
  tripForecast,
  money,
  type PlanItem,
  type LifeEvent,
} from "@/lib/planner";
import { destinationVisual } from "./destinations";
import { DecisionList } from "./events-tab";
import foundation from "@/assets/foundation.jpg";
import haircare from "@/assets/haircare.jpg";
import wellness from "@/assets/wellness.jpg";

// Presentation only: imagery and example brand names never feed the planner rules.
function productVisual(item: PlanItem) {
  if (item.name.toLowerCase().includes("foundation"))
    return {
      source: foundation,
      alt: "Illustrative unbranded foundation bottle on a white surface",
      brand: "Chanel",
    };
  if (item.category === "Haircare")
    return {
      source: haircare,
      alt: "Illustrative unbranded salon haircare bottles on a white surface",
      brand: "Kérastase",
    };
  return undefined;
}
const bagEditorial = [
  {
    title: "Wellness",
    brand: "Alo",
    source: wellness,
    alt: "Illustrative unbranded white activewear, yoga mat and water bottle",
    text: "Studio pieces for slower mornings away.",
  },
];

export function ProductPhoto({ item }: { item: PlanItem }) {
  const visual = productVisual(item);
  return (
    <div className="product-photo">
      {visual ? (
        <img src={visual.source} alt={visual.alt} width={900} height={900} loading="lazy" />
      ) : (
        <Package aria-hidden="true" />
      )}
    </div>
  );
}
const decisionOrder = ["Book", "Replenish", "Plan", "Delay", "Skip"];

function BeautyBag({ products, onProducts }: { products: PlanItem[]; onProducts: () => void }) {
  return (
    <section className="beauty-bag">
      <div className="consumer-section-heading">
        <h2>Your beauty bag</h2>
        <Button
          variant="ghost"
          size="icon"
          title="Manage products"
          aria-label="Manage products"
          onClick={onProducts}
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="bag-features">
        {[...products]
          .sort((x, y) => Number(y.category === "Haircare") - Number(x.category === "Haircare"))
          .map((item) => {
            const visual = productVisual(item);
            return (
              <article className="bag-card bag-feature" key={item.id}>
                <div className="bag-card-image">
                  {visual ? (
                    <img
                      src={visual.source}
                      alt={visual.alt}
                      width={900}
                      height={900}
                      loading="lazy"
                    />
                  ) : (
                    <Package aria-hidden="true" />
                  )}
                </div>
                <div className="bag-feature-body">
                  <p className="bag-eyebrow">
                    {visual
                      ? item.category === item.name
                        ? visual.brand
                        : `${item.category} · ${visual.brand}`
                      : item.category}
                  </p>
                  <h3>{item.name}</h3>
                  <p>
                    {item.category === "Haircare"
                      ? "Pack what you already have."
                      : "Check supply. Replenish only if needed."}
                  </p>
                </div>
              </article>
            );
          })}
        {bagEditorial.map((card) => (
          <article className="bag-card bag-feature" key={card.title}>
            <div className="bag-card-image">
              <img src={card.source} alt={card.alt} width={900} height={900} loading="lazy" />
            </div>
            <div className="bag-feature-body">
              <p className="bag-eyebrow">{card.brand}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
      {!products.length && <p className="body-copy py-6">Your essentials belong here.</p>}
      <p className="bag-note">Illustrative examples · No affiliation</p>
    </section>
  );
}

// Dashboard: what needs attention, what can wait, what it costs — each shown once.
function DashboardHome({
  items,
  event,
  today,
  onEvents,
  onMaintenance,
  onProducts,
  onPlan,
}: {
  items: PlanItem[];
  event: LifeEvent | undefined;
  today: string;
  onEvents: () => void;
  onMaintenance: () => void;
  onProducts: () => void;
  onPlan: () => void;
}) {
  const forecast = event ? tripForecast(items, event, today) : undefined;
  const routines = items.filter((i) => i.kind === "maintenance");
  const products = items.filter((i) => i.kind === "product");
  const destination = destinationVisual(event?.name);
  const away = event ? daysUntil(event.date, today) : 0;
  const groups = event
    ? decisionOrder
        .map((label) => ({
          label,
          list: orderedItems(items).filter((i) => eventDecision(i, event, today) === label),
        }))
        .filter((group) => group.list.length)
    : [];
  function reason(label: string, item: PlanItem) {
    if (label === "Book") return nextDate(item) <= today ? "due now" : "before your trip";
    if (label === "Replenish") return "check supply first";
    if (label === "Plan") return "soon after your trip";
    if (label === "Delay") return "can wait";
    return "not needed for this trip";
  }
  // One-sentence summary of the decisions above, worded from the same groups.
  const names = (list: PlanItem[]) => {
    const all = list.map((i) => i.name.toLowerCase());
    return all.length > 1 ? `${all.slice(0, -1).join(", ")} and ${all[all.length - 1]}` : all[0];
  };
  const inGroup = (label: string) => groups.find((g) => g.label === label)?.list ?? [];
  const skipped = inGroup("Skip");
  const skippedRoutines = skipped.filter((i) => i.kind === "maintenance");
  const skipList = skippedRoutines.length ? skippedRoutines : skipped;
  const clauses = event
    ? [
        inGroup("Book").length ? `book ${names(inGroup("Book"))} before ${event.name}` : "",
        inGroup("Replenish").length
          ? `check ${names(inGroup("Replenish"))} before buying more`
          : "",
        skipList.length ? `skip ${names(skipList)} for this trip` : "",
      ].filter(Boolean)
    : [];
  const joined =
    clauses.length > 2
      ? `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`
      : clauses.join(" and ");
  const recommendation = joined ? `${joined.charAt(0).toUpperCase()}${joined.slice(1)}.` : "";
  return (
    <div className="trip-experience dashboard-home">
      <div className="personal-greeting">
        <div>
          <h1>Your Plan</h1>
          {event && (
            <p className="dashboard-event">
              {event.name} · {away === 0 ? "Today" : `${away} days away`}
            </p>
          )}
        </div>
        {event && (
          <Button
            variant="ghost"
            size="icon"
            title="Open your plan"
            aria-label="Open your plan"
            onClick={onPlan}
          >
            <ArrowRight />
          </Button>
        )}
      </div>
      {event ? (
        <div className="travel-photo">
          {destination ? (
            <img
              src={destination.source}
              alt={destination.alt}
              width={1440}
              height={960}
              fetchPriority="high"
            />
          ) : (
            <div className="event-placeholder">
              <CalendarDays />
              <span>{event.name}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="no-trip">
          <CalendarDays />
          <h2>Your next chapter starts here.</h2>
          <p>Add a date to bring your plan into focus.</p>
          <Button onClick={onEvents}>
            Add a life event
            <ArrowRight />
          </Button>
        </div>
      )}
      {event ? (
        <section className="plan-summary" aria-label="Your decisions">
          {groups.map((group) => (
            <div className="plan-summary-group" key={group.label}>
              <h2>{group.label}</h2>
              <ul>
                {group.list.map((item) => (
                  <li key={item.id}>
                    {item.name} <span>— {reason(group.label, item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!items.length && (
            <p className="body-copy py-6">Add a routine or product to shape this plan.</p>
          )}
        </section>
      ) : (
        <section className="forecast-section">
          <div className="consumer-section-heading">
            <h2>Your maintenance forecast</h2>
            <Button
              variant="ghost"
              size="icon"
              title="Manage maintenance"
              aria-label="Manage maintenance"
              onClick={onMaintenance}
            >
              <ArrowRight />
            </Button>
          </div>
          {routines.map((item) => (
            <div className="forecast-row" key={item.id}>
              <div className="forecast-icon">
                <Scissors />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>Next expected {dateLabel(nextDate(item))}</p>
              </div>
              <span className="neutral-pill">
                {daysUntil(nextDate(item), today) <= 0 ? "Due now" : dateLabel(nextDate(item))}
              </span>
            </div>
          ))}
        </section>
      )}
      {forecast && (
        <section className="spend-summary" aria-label="Spending">
          <dl>
            <div>
              <dt>Expected spend</dt>
              <dd>{money(forecast.maintenanceCost)}</dd>
            </div>
            {forecast.check.length > 0 && (
              <div>
                <dt>Possible additional</dt>
                <dd>
                  +{money(forecast.possibleProductCost)}
                  <small>
                    if {forecast.check.map((i) => i.name.toLowerCase()).join(" or ")}{" "}
                    {forecast.check.length === 1 ? "is" : "are"} needed
                  </small>
                </dd>
              </div>
            )}
            {forecast.potentialAvoidedCost > 0 && (
              <div>
                <dt>Potential avoided spend</dt>
                <dd>{money(forecast.potentialAvoidedCost)}</dd>
              </div>
            )}
          </dl>
          <p className="fine-print">Estimates from your usual frequencies, not exact inventory.</p>
        </section>
      )}
      {recommendation && (
        <section className="nushluxe-recommendation" aria-label="Nushluxe Recommendation">
          <h2>Nushluxe Recommendation</h2>
          <p>{recommendation}</p>
        </section>
      )}
      <BeautyBag products={products} onProducts={onProducts} />
    </div>
  );
}

export function TripExperience({
  items,
  event,
  events,
  today,
  prep,
  onEvents,
  onSelectEvent,
  onMaintenance,
  onProducts,
  onPlan,
}: {
  items: PlanItem[];
  event: LifeEvent | undefined;
  events: LifeEvent[];
  onSelectEvent: (id: string) => void;
  today: string;
  prep: boolean;
  onEvents: () => void;
  onMaintenance: () => void;
  onProducts: () => void;
  onPlan: () => void;
}) {
  const forecast = event ? tripForecast(items, event, today) : undefined;
  const routines = items.filter((i) => i.kind === "maintenance");
  if (!prep)
    return (
      <DashboardHome
        items={items}
        event={event}
        today={today}
        onEvents={onEvents}
        onMaintenance={onMaintenance}
        onProducts={onProducts}
        onPlan={onPlan}
      />
    );
  return (
    <div className="trip-experience">
      <div className="event-plan-controls">
        <label>
          Plan around
          <select
            aria-label="Select upcoming event"
            value={event?.id ?? ""}
            onChange={(e) => onSelectEvent(e.target.value)}
          >
            <option value="" disabled>
              Select an upcoming event
            </option>
            {events
              .filter((e) => e.date >= today)
              .map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} · {dateLabel(e.date)}
                </option>
              ))}
          </select>
        </label>
      </div>
      {event ? (
        <>
          <div className="trip-title">
            <div>
              <p className="eyebrow">UPCOMING {event.type.toUpperCase()}</p>
              <h2>{event.name}</h2>
              <p>
                {dateLabel(event.date)} · {new Date(`${event.date}T12:00:00`).getFullYear()}
              </p>
            </div>
            <span className="neutral-pill">
              {daysUntil(event.date, today) === 0
                ? "Today"
                : `${daysUntil(event.date, today)} days away`}
            </span>
          </div>
        </>
      ) : (
        <div className="no-trip">
          <CalendarDays />
          <h2>Your next chapter starts here.</h2>
          <p>Add a date to bring your plan into focus.</p>
          <Button onClick={onEvents}>
            Add a life event
            <ArrowRight />
          </Button>
        </div>
      )}
      {event && forecast ? (
        <section className="event-action-plan">
          {prep ? (
            <div className="consumer-section-heading">
              <div>
                <h2>A little preparation. A lot more ease.</h2>
                <p>Book · Replenish · Plan · Delay · Skip</p>
              </div>
            </div>
          ) : (
            <div className="consumer-section-heading">
              <h2>Your Pre-Trip Plan</h2>
              <Button
                variant="ghost"
                size="icon"
                title="Open your plan"
                aria-label="Open your plan"
                onClick={onPlan}
              >
                <ArrowRight />
              </Button>
            </div>
          )}
          {!prep && items.length > 0 && <DecisionList items={items} event={event} today={today} />}
          {prep &&
            [
              ...forecast.book,
              ...forecast.check,
              ...forecast.skip,
              ...items.filter(
                (i) => ![...forecast.book, ...forecast.check, ...forecast.skip].includes(i),
              ),
            ].map((item) => {
              const action = eventDecision(item, event, today);
              const dueNow = action === "Book" && nextDate(item) <= today;
              return (
                <article className="event-action-row" key={item.id}>
                  <div className="forecast-icon">
                    {item.kind === "product" ? (
                      <Package />
                    ) : action === "Skip" ? (
                      <Check />
                    ) : (
                      <Scissors />
                    )}
                  </div>
                  <div>
                    <p
                      className={`action-eyebrow ${dueNow ? "action-urgent" : action === "Skip" ? "action-skip" : ""}`}
                    >
                      {action}
                    </p>
                    <h3>{item.name}</h3>
                    <p className="action-evidence">
                      {item.kind === "maintenance" ? "Next expected" : "Check around"}{" "}
                      {dateLabel(nextDate(item))}
                    </p>
                  </div>
                  <span
                    className={
                      dueNow ? "due-pill" : action === "Skip" ? "positive-pill" : "neutral-pill"
                    }
                  >
                    {action === "Skip"
                      ? "On track"
                      : action === "Replenish"
                        ? "Check supply first"
                        : nextDate(item) <= today
                          ? "Due now"
                          : action === "Plan"
                            ? "After your trip"
                            : "Before your trip"}
                  </span>
                </article>
              );
            })}
          {!items.length && (
            <p className="body-copy py-6">Add a routine or product to shape this plan.</p>
          )}
        </section>
      ) : (
        <section className="forecast-section">
          <div className="consumer-section-heading">
            <h2>Your maintenance forecast</h2>
            <Button
              variant="ghost"
              size="icon"
              title="Manage maintenance"
              aria-label="Manage maintenance"
              onClick={onMaintenance}
            >
              <ArrowRight />
            </Button>
          </div>
          {routines.map((item) => (
            <div className="forecast-row" key={item.id}>
              <div className="forecast-icon">
                <Scissors />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>Next expected {dateLabel(nextDate(item))}</p>
              </div>
              <span className="neutral-pill">
                {daysUntil(nextDate(item), today) <= 0 ? "Due now" : dateLabel(nextDate(item))}
              </span>
            </div>
          ))}
        </section>
      )}
      {forecast && (
        <section className="trip-spending">
          <div className="consumer-section-heading">
            <h2>Estimated Upcoming Spend</h2>
          </div>
          {prep &&
            forecast.book.map((i) => (
              <div className="trip-cost" key={i.id}>
                <span>{i.name}</span>
                <strong>{money(i.cost)}</strong>
              </div>
            ))}
          <div className="trip-total">
            <span>Planned</span>
            <strong>{money(forecast.maintenanceCost)}</strong>
          </div>
          {forecast.check.length > 0 && (
            <div className="optional-expenses">
              <p className="eyebrow">Only if needed</p>
              {prep ? (
                forecast.check.map((i) => (
                  <div className="trip-cost" key={i.id}>
                    <span>{i.name}</span>
                    <strong>+{money(i.cost)}</strong>
                  </div>
                ))
              ) : (
                <div className="trip-cost">
                  <span>Products</span>
                  <strong>+{money(forecast.possibleProductCost)}</strong>
                </div>
              )}
            </div>
          )}
          {forecast.avoided.length > 0 && (
            <div className="avoid-lines">
              <p className="eyebrow">Potential avoided spend</p>
              {forecast.avoided.map((i) => (
                <div className="trip-cost" key={i.id}>
                  <span>
                    {i.name}
                    <small>Not needed for this trip</small>
                  </span>
                  <strong>{money(i.cost)}</strong>
                </div>
              ))}
            </div>
          )}
          {forecast.potentialAvoidedCost > 0 && (
            <div className="avoid-cost">
              <Check />
              <span>You may avoid {money(forecast.potentialAvoidedCost)}.</span>
            </div>
          )}
          <p className="fine-print">Estimates from your usual frequencies, not exact inventory.</p>
        </section>
      )}
    </div>
  );
}
export function Ecosystem() {
  return (
    <section className="ecosystem">
      <p className="eyebrow">THE BIGGER PICTURE · CONCEPT</p>
      <h2>The Nushluxe ecosystem</h2>
      <div className="ecosystem-center">
        <span>NUSHLUXE</span>
        <p>Your personal self-care operating system</p>
      </div>
      <div className="ecosystem-modules">
        {[
          {
            icon: CalendarDays,
            title: "Nushluxe Maintenance",
            copy: "Your appointments and recurring beauty services.",
          },
          {
            icon: Package,
            title: "Nushluxe Replenish",
            copy: "Your beauty inventory, product usage and repurchase planning.",
          },
          {
            icon: Sparkles,
            title: "Wellness Intelligence",
            copy: "Optional future wellness and personal-context planning. Non-medical.",
          },
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
