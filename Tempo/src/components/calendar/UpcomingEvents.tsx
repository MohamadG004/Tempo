import dayjs from "dayjs";
import type { CalendarEvent } from "@/types/calendar";
import { getEventColorClass } from "@/types/calendar";
import { Clock } from "lucide-react";

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function UpcomingEvents({ events, onEventClick }: UpcomingEventsProps) {
  const today = dayjs().format("YYYY-MM-DD");
  const upcoming = events
    .filter((e) => e.date >= today && e.recurrence === "none")
    .sort((a, b) => {
      const dateDiff = a.date.localeCompare(b.date);
      if (dateDiff !== 0) return dateDiff;
      return (a.startTime || "").localeCompare(b.startTime || "");
    })
    .slice(0, 5);

  return (
    <div className="p-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Upcoming</h3>
      {upcoming.length === 0 ? (
        <p className="text-xs text-muted-foreground py-4 text-center">No upcoming events</p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventClick(event)}
              className="w-full text-left flex items-start gap-2 group"
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventColorClass(event.color)}`} />
              <div>
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{event.title}</p>
                <p className="text-[10px] text-muted-foreground">
                  {dayjs(event.date).format("MMM D")}
                  {event.startTime && ` · ${dayjs(`2000-01-01 ${event.startTime}`).format("h:mm A")}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
