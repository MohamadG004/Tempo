import type { CalendarEvent } from "@/types/calendar";
import { getEventColorClass } from "@/types/calendar";

interface EventBadgeProps {
  event: CalendarEvent;
  compact?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function EventBadge({ event, compact, onClick }: EventBadgeProps) {
  const colorClass = getEventColorClass(event.color);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`${colorClass} text-primary-foreground rounded-md px-1.5 text-left w-full truncate transition-all hover:opacity-80 ${
        compact ? "py-0 text-[10px] leading-4" : "py-0.5 text-xs leading-4"
      }`}
    >
      {event.startTime && <span>{event.startTime} </span>}
      {event.title}
    </button>
  );
}
