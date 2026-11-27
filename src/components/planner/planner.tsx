import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FlaskConical,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ItemEditor } from "./item-editor";
import { EventEditor } from "./event-editor";
import { DestinationCards } from "./events-tab";
import {
  completeItem,
  dateLabel,
  daysUntil,
  exampleData,
  money,
  monthlySpend,
  nextDate,
  orderedItems,
  planGroup,
  status,
  productStatus,
  todayDate,
  type PlanItem,
  type ItemKind,
  type LifeEvent,
} from "@/lib/planner";
import { ProductPhoto, TripExperience } from "./trip-experience";
import { VentureThesis } from "./venture-thesis";

type View = "Dashboard" | "Plan" | "Events" | "About Us";
const views: View[] = ["Dashboard", "Plan", "Events", "About Us"];
function Empty({
  icon,
  title,
  children,
  action,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
function Badge({ item, today }: { item: PlanItem; today: string }) {
  const value = item.kind === "product" ? productStatus(item, today) : status(item, today);
  const urgent = daysUntil(nextDate(item), today) <= 0;
  return (
    <span
      className={`status-badge ${urgent ? "status-overdue" : value === "Delay" ? "status-track" : "status-soon"}`}
    >
      {value}
      {value === "Replenish" ? " · check supply first" : ""}
    </span>
  );
}
function IconAction({
  title,
  children,
  onClick,
}: {
  title: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button variant="ghost" size="icon" title={title} aria-label={title} onClick={onClick}>
      {children}
    </Button>
  );
}

export function Planner() {
  const [items, setItems] = useState<PlanItem[]>(() => exampleData(todayDate()).items);
  const [events, setEvents] = useState<LifeEvent[]>(() => exampleData(todayDate()).events);
  const [view, setView] = useState<View>("Dashboard");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [editor, setEditor] = useState<{ kind: ItemKind; item?: PlanItem } | null>(null);
  const [eventEditor, setEventEditor] = useState<{ event?: LifeEvent } | null>(null);
  const [confirm, setConfirm] = useState<"load" | "reset" | null>(null);
  const [notice, setNotice] = useState("");
  const today = todayDate();
  const ordered = orderedItems(items);
  const spend = monthlySpend(items, today);
  const mainEvent = [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const prepEvent = events.find((e) => e.id === selectedEventId && e.date >= today) ?? mainEvent;
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  function navigate(next: View, anchor = "workspace") {
    setView(next);
    requestAnimationFrame(() =>
      (document.getElementById(anchor) ?? document.getElementById("workspace"))?.scrollIntoView({
        behavior: "instant",
      }),
    );
  }
  function loadExample() {
    const data = exampleData(today);
    setItems(data.items);
    setEvents(data.events);
    setStep(null);
    setConfirm(null);
    setNotice("Example loaded.");
    navigate("Dashboard");
  }
  function requestExample() {
    if (items.length || events.length) setConfirm("load");
    else loadExample();
  }
  function reset() {
    setItems([]);
    setEvents([]);
    setStep(null);
    setConfirm(null);
    setNotice("Cleared. A fresh start.");
    setView("Dashboard");
  }
  function saveItem(item: PlanItem) {
    setItems((current) => [...current.filter((i) => i.id !== item.id), item]);
    setEditor(null);
    setNotice(`${item.name} saved.`);
  }
  function saveEvent(event: LifeEvent) {
    setEvents((current) => [...current.filter((e) => e.id !== event.id), event]);
    setEventEditor(null);
    setNotice(`${event.name} saved. Your plan is ready.`);
    setSelectedEventId(event.id);
    if (step === null) navigate("Plan");
  }
  function finishItem(item: PlanItem) {
    setItems((current) => current.map((i) => (i.id === item.id ? completeItem(i, today) : i)));
    setNotice(
      `${item.name} ${item.kind === "product" ? "replenished" : "completed"}. Next expected ${dateLabel(nextDate(completeItem(item, today)))}.`,
    );
  }
  function itemRows(list: PlanItem[], compact = false) {
    return (
      <div className="item-list">
        {list.map((item) => (
          <article className={`routine-row ${compact ? "compact-row" : ""}`} key={item.id}>
            <div className="item-symbol">
              {item.kind === "maintenance" ? <CalendarDays /> : <ProductPhoto item={item} />}
            </div>
            <div className="item-main">
              <h3>{item.name}</h3>
              <p>
                {item.category}
                {!compact && ` · Every ${item.frequency} days`}
              </p>
              {!compact && (
                <p className="last-date">
                  Last {item.kind === "product" ? "replenished" : "completed"}{" "}
                  {dateLabel(item.lastDate)}
                </p>
              )}
            </div>
            <div className="item-date">
              <span>{dateLabel(nextDate(item))}</span>
              <small>{money(item.cost)}</small>
            </div>
            <Badge item={item} today={today} />
            <div className="row-actions">
              <IconAction
                title={`${item.kind === "product" ? "Mark replenished" : "Mark completed"}: ${item.name}`}
                onClick={() => finishItem(item)}
              >
                <Check />
              </IconAction>
              {!compact && (
                <>
                  <IconAction
                    title={`Edit ${item.name}`}
                    onClick={() => setEditor({ kind: item.kind, item })}
                  >
                    <Pencil />
                  </IconAction>
                  <IconAction
                    title={`Delete ${item.name}`}
                    onClick={() => {
                      setItems((current) => current.filter((i) => i.id !== item.id));
                      setNotice(`${item.name} deleted.`);
                    }}
                  >
                    <Trash2 />
                  </IconAction>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }
  function addButton(kind: ItemKind) {
    return (
      <Button className="editorial-button" onClick={() => setEditor({ kind })}>
        <Plus />
        Add {kind === "maintenance" ? "routine" : "product"}
      </Button>
    );
  }
  function spending() {
    return (
      <section className="spending-section">
        <div className="section-heading">
          <div>
            <h2>Estimated Upcoming Spend</h2>
          </div>
          <Wallet className="text-muted-foreground size-5" />
        </div>
        <div className="spend-totals">
          <div>
            <span>This month · remaining</span>
            <strong>{money(spend.total)}</strong>
          </div>
          <div>
            <span>Maintenance</span>
            <strong>{money(spend.maintenance)}</strong>
          </div>
          <div>
            <span>Products</span>
            <strong>{money(spend.products)}</strong>
          </div>
        </div>
        <div className="expense-list">
          {spend.due.map((i) => (
            <div key={i.id}>
              <span>
                {i.name}
                <small>{dateLabel(nextDate(i))}</small>
              </span>
              <span>{money(i.cost)}</span>
            </div>
          ))}
        </div>
        <p className="fine-print">Estimates from your next expected dates.</p>
      </section>
    );
  }
  return (
    <>
      <header className="prototype-header">
        <div className="prototype-header-inner">
          <a href="#top" className="nav-wordmark">
            NUSHLUXE
          </a>
          <p className="nav-slogan">Know what you need, before you need it.</p>
          <nav aria-label="Product navigation">
            {views.map((v) => (
              <Button
                key={v}
                variant="ghost"
                className={view === v ? "active-nav" : ""}
                onClick={() => navigate(v)}
              >
                {v}
              </Button>
            ))}
          </nav>
        </div>
      </header>
      <main id="top">
        <section
          id="workspace"
          className={`workspace workspace-width${view === "About Us" ? " about-workspace" : ""}`}
        >
          <div className="workspace-topline">
            <div className="demo-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStep(1);
                  navigate("Plan", "manage-maintenance");
                }}
              >
                <Plus />
                Start Planning
              </Button>
              <Button variant="ghost" size="sm" onClick={requestExample}>
                <FlaskConical />
                Load Example
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!items.length && !events.length}
                onClick={() => setConfirm("reset")}
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </div>
          {step !== null && (
            <div className="onboarding">
              <div className="onboarding-top">
                <p className="eyebrow">Your first plan · Step {step} of 4</p>
                <IconAction title="Close onboarding" onClick={() => setStep(null)}>
                  <X />
                </IconAction>
              </div>
              <div className="onboarding-steps">
                {["Maintenance", "Products", "Life event", "Your plan"].map((s, i) => (
                  <span className={i + 1 === step ? "current-step" : ""} key={s}>
                    {i + 1}. {s}
                  </span>
                ))}
              </div>
              <h2>
                {
                  [
                    "Add your recurring maintenance.",
                    "Add products you regularly replenish.",
                    "An upcoming trip or event?",
                    "Your plan, all together.",
                  ][step - 1]
                }
              </h2>
              <div className="flex justify-between items-center flex-wrap gap-3 mt-4">
                {step < 4 ? (
                  <p className="body-copy">{step === 3 ? "Optional." : "Start with just one."}</p>
                ) : (
                  <p className="body-copy">One plan for what comes next.</p>
                )}
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const s = step - 1;
                        setStep(s);
                        if (s === 3) navigate("Events");
                        else navigate("Plan", s === 1 ? "manage-maintenance" : "manage-product");
                      }}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      if (step === 4) {
                        setStep(null);
                        navigate("Plan");
                      } else {
                        const s = step + 1;
                        setStep(s);
                        if (s === 2) navigate("Plan", "manage-product");
                        else navigate(s === 3 ? "Events" : "Plan");
                      }
                    }}
                  >
                    {step === 4 ? "View my plan" : step === 3 ? "View plan" : "Continue"}
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          )}
          {view !== "Dashboard" && !(view === "Plan" && mainEvent) && (
            <div className="workspace-heading">
              <div>
                <p className="eyebrow text-muted-foreground">
                  Your beauty, planned around your life.
                </p>
                <h1>
                  {view === "Plan"
                    ? "Your Maintenance Plan"
                    : view === "About Us"
                      ? "The Vision Behind Nushluxe"
                      : "Life Events"}
                </h1>
                {view !== "Events" && (
                  <p className="body-copy">
                    {view === "Plan"
                      ? "One plan, at your pace."
                      : "A more thoughtful way to manage beauty, wellness, and everything that comes next."}
                  </p>
                )}
              </div>
              {view === "Events" ? (
                <Button className="editorial-button" onClick={() => setEventEditor({})}>
                  <Plus />
                  Add event
                </Button>
              ) : null}
            </div>
          )}
          {notice && (
            <div role="status" className="notice">
              <Check />
              {notice}
              <IconAction title="Dismiss message" onClick={() => setNotice("")}>
                <X />
              </IconAction>
            </div>
          )}
          {view === "Dashboard" && (
            <TripExperience
              items={items}
              event={prepEvent}
              events={events}
              onSelectEvent={setSelectedEventId}
              today={today}
              prep={false}
              onEvents={() => navigate("Events")}
              onMaintenance={() => navigate("Plan", "manage-maintenance")}
              onProducts={() => navigate("Plan", "manage-product")}
              onPlan={() => navigate("Plan")}
            />
          )}
          {view === "Plan" && mainEvent && (
            <TripExperience
              items={items}
              event={prepEvent}
              events={events}
              onSelectEvent={setSelectedEventId}
              today={today}
              prep
              onEvents={() => navigate("Events")}
              onMaintenance={() => navigate("Plan", "manage-maintenance")}
              onProducts={() => navigate("Plan", "manage-product")}
              onPlan={() => navigate("Plan")}
            />
          )}
          {view === "Plan" && !mainEvent && (
            <>
              {items.length ? (
                <div className="plan-groups">
                  {["This Week", "Next 2 Weeks", "Later"].map((group) => {
                    const list = ordered.filter((i) => planGroup(i, today) === group);
                    return (
                      <section key={group}>
                        <div className="plan-group-heading">
                          <span className="plan-dot" />
                          <h2>{group}</h2>
                          <span>
                            {list.length} {list.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                        {list.length ? (
                          itemRows(list, true)
                        ) : (
                          <p className="plan-clear">Nothing expected.</p>
                        )}
                      </section>
                    );
                  })}
                </div>
              ) : null}
              {items.length > 0 && spending()}
            </>
          )}
          {view === "Plan" &&
            (["maintenance", "product"] as ItemKind[]).map((kind) => {
              const list = ordered.filter((i) => i.kind === kind);
              return (
                <section className="manage-section" id={`manage-${kind}`} key={kind}>
                  <div className="consumer-section-heading">
                    <h2>{kind === "maintenance" ? "Your Maintenance" : "Your Products"}</h2>
                    {addButton(kind)}
                  </div>
                  {list.length ? (
                    itemRows(list)
                  ) : (
                    <p className="plan-clear">
                      {kind === "maintenance" ? "No routines yet." : "No products yet."}
                    </p>
                  )}
                </section>
              );
            })}
          {view === "Events" && (
            <>
              {events.length ? (
                <DestinationCards
                  items={items}
                  events={upcomingEvents}
                  today={today}
                  selectedId={prepEvent?.id}
                  onSelect={(event) => setSelectedEventId(event.id)}
                  onEdit={(event) => setEventEditor({ event })}
                  onDelete={(event) => {
                    setEvents((current) => current.filter((e) => e.id !== event.id));
                    setNotice(`${event.name} deleted.`);
                  }}
                  onOpen={(event) => {
                    setSelectedEventId(event.id);
                    navigate("Plan");
                  }}
                />
              ) : (
                <Empty
                  icon={<CalendarDays />}
                  title="Something to look forward to."
                  action={
                    <Button onClick={() => setEventEditor({})}>
                      <Plus />
                      Add event
                    </Button>
                  }
                >
                  A trip, a celebration, or simply a date that matters.
                </Empty>
              )}
            </>
          )}
          {view === "About Us" && <VentureThesis />}
          <p className="session-note">No account required · Changes last for this visit only.</p>
        </section>
      </main>
      {view === "About Us" && (
        <footer className="prototype-footer workspace-width">
          <span className="nav-wordmark">NUSHLUXE</span>
          <p>© 2026 · Anushka Bhatti</p>
          <span>Your beauty, planned around your life.</span>
        </footer>
      )}
      {editor && (
        <ItemEditor
          key={editor.item?.id ?? editor.kind}
          {...editor}
          onSave={saveItem}
          onClose={() => setEditor(null)}
        />
      )}
      {eventEditor && (
        <EventEditor {...eventEditor} onSave={saveEvent} onClose={() => setEventEditor(null)} />
      )}
      <Dialog
        open={confirm !== null}
        onOpenChange={(open) => {
          if (!open) setConfirm(null);
        }}
      >
        <DialogContent className="planner-dialog">
          <DialogTitle className="font-display text-3xl font-normal">
            {confirm === "load" ? "Load example?" : "A fresh start?"}
          </DialogTitle>
          <DialogDescription>
            {confirm === "load"
              ? "This replaces your current routines, products, and events with example data."
              : "This clears all routines, products, and events."}
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirm(null)}>
              Cancel
            </Button>
            <Button onClick={confirm === "load" ? loadExample : reset}>
              {confirm === "load" ? "Load Example" : "Reset"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
