import { useState } from "react";
import dayjs from "dayjs";

interface MiniCalendarProps {
  currentDate: dayjs.Dayjs;
  onDateSelect: (date: dayjs.Dayjs) => void;
}

export function MiniCalendar({ currentDate, onDateSelect }: MiniCalendarProps) {
  const [viewDate, setViewDate] = useState(currentDate);
  const startOfMonth = viewDate.startOf("month");
  const daysInMonth = viewDate.daysInMonth();
  const startDay = startOfMonth.day();
  const today = dayjs().format("YYYY-MM-DD");

  const days: (dayjs.Dayjs | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(viewDate.date(i));

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setViewDate(viewDate.subtract(1, "month"))} className="text-muted-foreground hover:text-foreground text-sm px-1">‹</button>
        <span className="text-xs font-semibold text-foreground">{viewDate.format("MMMM YYYY")}</span>
        <button onClick={() => setViewDate(viewDate.add(1, "month"))} className="text-muted-foreground hover:text-foreground text-sm px-1">›</button>
      </div>
      <div className="grid grid-cols-7 gap-0">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] text-muted-foreground font-medium py-1">
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const isToday = d.format("YYYY-MM-DD") === today;
          const isSelected = d.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD");
          return (
            <button
              key={i}
              onClick={() => onDateSelect(d)}
              className={`text-[11px] w-7 h-7 mx-auto rounded-full flex items-center justify-center transition-colors ${
                isSelected ? "gradient-primary text-primary-foreground font-bold" : isToday ? "bg-secondary font-bold text-foreground" : "text-foreground hover:bg-secondary"
              }`}
            >
              {d.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
