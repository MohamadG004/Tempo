import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Repeat } from "lucide-react";
import type { CalendarEvent, EventColor, RecurrenceType } from "@/types/calendar";
import { EVENT_COLORS, getEventColorClass } from "@/types/calendar";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onDelete?: (id: string) => void;
  editEvent?: CalendarEvent | null;
  defaultDate?: string;
}

const RECURRENCE_OPTIONS: { value: RecurrenceType; label: string }[] = [
  { value: "none", label: "No repeat" },
  { value: "daily", label: "Every day" },
  { value: "weekly", label: "Every week" },
  { value: "monthly", label: "Every month" },
  { value: "yearly", label: "Every year" },
];

export function EventModal({ open, onClose, onSave, onUpdate, onDelete, editEvent, defaultDate }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState<EventColor>("purple");
  const [description, setDescription] = useState("");
  const [recurrence, setRecurrence] = useState<RecurrenceType>("none");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setDate(editEvent.date);
      setStartTime(editEvent.startTime || "");
      setEndTime(editEvent.endTime || "");
      setColor(editEvent.color);
      setDescription(editEvent.description || "");
      setRecurrence(editEvent.recurrence);
    } else {
      setTitle("");
      setDate(defaultDate || "");
      setStartTime("");
      setEndTime("");
      setColor("purple");
      setDescription("");
      setRecurrence("none");
    }
  }, [editEvent, defaultDate, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const eventData = {
      title: title.trim(),
      date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      color,
      description: description.trim() || undefined,
      recurrence,
    };

    if (editEvent && onUpdate) {
      onUpdate(editEvent.id, eventData);
    } else {
      onSave(eventData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editEvent ? "Edit Event" : "New Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event name" autoFocus />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>Start</Label>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
              <Label>End</Label>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Color</Label>
            <div className="flex gap-2 mt-1">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-6 h-6 rounded-full ${getEventColorClass(c.value)} ${
                    color === c.value ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <Label>Repeat</Label>
            <Select value={recurrence} onValueChange={(v) => setRecurrence(v as RecurrenceType)}>
              <SelectTrigger>
                <Repeat className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RECURRENCE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional notes..." rows={2} />
          </div>

          <div className="flex justify-between">
            {editEvent && onDelete ? (
              <Button type="button" variant="destructive" size="sm" onClick={() => { onDelete(editEvent.id); onClose(); }}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="gradient-primary text-primary-foreground">
                {editEvent ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
