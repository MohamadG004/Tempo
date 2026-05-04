import dayjs from "dayjs";
import type { CalendarEvent, DayInfo } from "@/types/calendar";
import { EventBadge } from "./EventBadge";

interface MonthViewProps {
  currentDate: dayjs.Dayjs;
  getEventsForDate: (dateKey: string) => CalendarEvent[];
  onDayClick: (dateKey: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDays(currentDate: dayjs.Dayjs): DayInfo[] {
  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();
  const prevMonth = currentDate.subtract(1, "month");
  const nextMonth = currentDate.add(1, "month");
  const daysInPrevMonth = prevMonth.daysInMonth();

  const days: DayInfo[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateObj = prevMonth.date(d);
    days.push({ day: d, isCurrentMonth: false, dateObj, dateKey: dateObj.format("YYYY-MM-DD") });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = currentDate.date(i);
    days.push({ day: i, isCurrentMonth: true, dateObj, dateKey: dateObj.format("YYYY-MM-DD") });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const dateObj = nextMonth.date(i);
    days.push({ day: i, isCurrentMonth: false, dateObj, dateKey: dateObj.format("YYYY-MM-DD") });
  }

  return days;
}

export function MonthView({ currentDate, getEventsForDate, onDayClick, onEventClick }: MonthViewProps) {
  const days = getDays(currentDate);
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-7 border-b border-cal-grid-border">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {d}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1">
        {days.map((dayObj, idx) => {
          const events = getEventsForDate(dayObj.dateKey);
          const isToday = dayObj.dateKey === today;
          const isWeekend = dayObj.dateObj.day() === 0 || dayObj.dateObj.day() === 6;

          return (
            <div
              key={idx}
              onClick={() => onDayClick(dayObj.dateKey)}
              className={`border-b border-r border-cal-grid-border p-1.5 min-h-[90px] cursor-pointer transition-colors hover:bg-secondary/50 ${
                isWeekend && dayObj.isCurrentMonth ? "bg-cal-weekend/30" : ""
              } ${!dayObj.isCurrentMonth ? "opacity-40" : ""}`}
            >
              <span
                className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                  isToday ? "bg-cal-today text-cal-today-foreground" : ""
                }`}
              >
                {dayObj.day}
              </span>
              <div className="mt-0.5 space-y-0.5">
                {events.slice(0, 3).map((event) => (
                  <EventBadge key={event.id} event={event} compact onClick={() => onEventClick(event)} />
                ))}
                {events.length > 3 && (
                  <p className="text-[10px] text-muted-foreground pl-1">+{events.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
