import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eventTypes, todayDate, type LifeEvent } from "@/lib/planner";
export function EventEditor({
  event,
  onSave,
  onClose,
}: {
  event?: LifeEvent;
  onSave: (event: LifeEvent) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(event?.name ?? "");
  const [date, setDate] = useState(event?.date ?? todayDate());
  const [type, setType] = useState(event?.type ?? "Trip");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || date < todayDate()) return;
    onSave({ id: event?.id ?? crypto.randomUUID(), name: name.trim(), date, type });
  }
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="planner-dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-normal">
            {event ? "Edit" : "Add"} life event
          </DialogTitle>
          <DialogDescription>Make room for what’s coming up.</DialogDescription>
        </DialogHeader>
        <form className="editor-form" onSubmit={submit}>
          <label>
            Event name
            <Input
              autoFocus
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Miami Trip"
            />
          </label>
          <label>
            Event date
            <Input
              required
              type="date"
              min={todayDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Event type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end gap-2 mt-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{event ? "Save changes" : "Add event"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
