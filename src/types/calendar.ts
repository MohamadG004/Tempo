import dayjs from "dayjs";

export type CalendarView = "month" | "week" | "day";

export type EventColor = "purple" | "green" | "amber" | "rose" | "sky";

export type RecurrenceType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  color: EventColor;
  description?: string;
  recurrence: RecurrenceType;
}

export interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  dateObj: dayjs.Dayjs;
  dateKey: string;
}

export const EVENT_COLORS: { value: EventColor; label: string; className: string }[] = [
  { value: "purple", label: "Purple", className: "bg-cal-event" },
  { value: "green", label: "Green", className: "bg-cal-event-green" },
  { value: "amber", label: "Amber", className: "bg-cal-event-amber" },
  { value: "rose", label: "Rose", className: "bg-cal-event-rose" },
  { value: "sky", label: "Sky", className: "bg-cal-event-sky" },
];

export function getEventColorClass(color: EventColor): string {
  return EVENT_COLORS.find((c) => c.value === color)?.className ?? "bg-cal-event";
}
