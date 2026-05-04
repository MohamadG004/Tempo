import dayjs from "dayjs";
import type { CalendarEvent } from "@/types/calendar";
import { EventBadge } from "./EventBadge";

interface WeekViewProps {
  currentDate: dayjs.Dayjs;
  getEventsForDate: (dateKey: string) => CalendarEvent[];
  onDayClick: (dateKey: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function WeekView({ currentDate, getEventsForDate, onDayClick, onEventClick }: WeekViewProps) {
  const weekStart = currentDate.startOf("week");
  const days = Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day"));
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Day headers */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-cal-grid-border sticky top-0 bg-card z-10">
        <div />
        {days.map((d) => {
          const key = d.format("YYYY-MM-DD");
          const isToday = key === today;
          return (
            <div key={key} className="py-2 text-center border-l border-cal-grid-border">
              <span className="text-xs font-semibold text-muted-foreground uppercase">{d.format("ddd")}</span>
              <div className={`text-lg font-bold ${isToday ? "text-primary" : "text-foreground"}`}>
                {d.date()}
              </div>
            </div>
          );
        })}
      </div>

      {/* All-day events row */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-cal-grid-border">
        <div className="text-[10px] text-muted-foreground p-1 text-right">all-day</div>
        {days.map((d) => {
          const key = d.format("YYYY-MM-DD");
          const events = getEventsForDate(key).filter((e) => !e.startTime);
          return (
            <div key={key} className="border-l border-cal-grid-border p-0.5 min-h-[28px]">
              <div className="cursor-pointer" onClick={() => onDayClick(key)}>
                {events.slice(0, 2).map((event) => (
                  <EventBadge key={event.id} event={event} compact onClick={() => onEventClick(event)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1">
        {HOURS.map((hour) => (
          <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-cal-grid-border">
            <div className="text-[10px] text-muted-foreground p-1 text-right h-12 flex items-start justify-end">
              {hour === 0 ? "" : dayjs().hour(hour).format("h A")}
            </div>
            {days.map((d) => {
              const key = d.format("YYYY-MM-DD");
              const hourStr = String(hour).padStart(2, "0");
              const events = getEventsForDate(key).filter(
                (e) => e.startTime && e.startTime.startsWith(hourStr)
              );
              return (
                <div
                  key={key}
                  className="border-l border-cal-grid-border h-12 p-0.5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => onDayClick(key)}
                >
                  {events.map((event) => (
                    <div key={event.id} className="mb-0.5">
                      <EventBadge event={event} compact onClick={() => onEventClick(event)} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
