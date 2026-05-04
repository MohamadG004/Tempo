import dayjs from "dayjs";
import type { CalendarEvent } from "@/types/calendar";
import { EventBadge } from "./EventBadge";

interface DayViewProps {
  currentDate: dayjs.Dayjs;
  getEventsForDate: (dateKey: string) => CalendarEvent[];
  onDayClick: (dateKey: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayView({ currentDate, getEventsForDate, onDayClick, onEventClick }: DayViewProps) {
  const dateKey = currentDate.format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");
  const isToday = dateKey === today;
  const allDayEvents = getEventsForDate(dateKey).filter((e) => !e.startTime);

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Day header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-cal-grid-border bg-card sticky top-0 z-10">
        <div className="text-center">
          <span className="text-xs font-semibold text-muted-foreground uppercase">{currentDate.format("ddd")}</span>
          <div className={`text-3xl font-bold ${isToday ? "text-primary" : "text-foreground"}`}>
            {currentDate.date()}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{currentDate.format("MMMM YYYY")}</h2>
          {isToday && <span className="text-xs text-primary font-medium">Today</span>}
        </div>
      </div>

      {/* All day events */}
      {allDayEvents.length > 0 && (
        <div className="px-4 py-2 border-b border-cal-grid-border bg-secondary/30">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">ALL DAY</span>
          {allDayEvents.map((event) => (
            <div key={event.id} className="mt-1">
              <EventBadge event={event} onClick={() => onEventClick(event)} />
            </div>
          ))}
        </div>
      )}

      {/* Time slots */}
      <div className="flex-1">
        {HOURS.map((hour) => {
          const hourStr = String(hour).padStart(2, "0");
          const events = getEventsForDate(dateKey).filter(
            (e) => e.startTime && e.startTime.startsWith(hourStr)
          );

          return (
            <div
              key={hour}
              className="grid grid-cols-[60px_1fr] border-b border-cal-grid-border h-14 cursor-pointer hover:bg-secondary/30 transition-colors"
              onClick={() => onDayClick(dateKey)}
            >
              <div className="text-[10px] text-muted-foreground p-1 text-right flex items-start justify-end">
                {hour === 0 ? "" : dayjs().hour(hour).format("h A")}
              </div>
              <div className="border-l border-cal-grid-border p-0.5">
                {events.map((event) => (
                  <EventBadge key={event.id} event={event} onClick={() => onEventClick(event)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
