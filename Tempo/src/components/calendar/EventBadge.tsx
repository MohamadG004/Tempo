import type { CalendarEvent } from "@/types/calendar";
import { getEventColorClass } from "@/types/calendar";
import dayjs from "dayjs";

interface EventBadgeProps {
  event: CalendarEvent;
  compact?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function EventBadge({ event, compact, onClick }: EventBadgeProps) {
  const colorClass = getEventColorClass(event.color);

  const formatTime = (timeStr: string) => {
    return dayjs(`2000-01-01 ${timeStr}`).format("h:mm A");
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`flex items-center ${colorClass} text-primary-foreground rounded-md px-2 text-left w-full truncate transition-all hover:opacity-80 ${
        compact ? "py-1 text-xs leading-5 gap-2" : "py-1.5 text-sm leading-5 gap-3"
      }`}
    >
      {event.startTime && <span className="font-medium">{formatTime(event.startTime)} </span>}
      {event.title}
    </button>
  );
}