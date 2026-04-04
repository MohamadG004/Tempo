import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { CalendarView } from "@/types/calendar";
import { useAuth } from "@/contexts/AuthContext";
import dayjs from "dayjs";

interface CalendarHeaderProps {
  currentDate: dayjs.Dayjs;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onNavigate: (direction: number) => void;
  onToday: () => void;
  onAddEvent: () => void;
}

const viewLabels: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

function getTitle(date: dayjs.Dayjs, view: CalendarView): string {
  if (view === "day") return date.format("dddd, MMMM D, YYYY");
  if (view === "week") {
    const start = date.startOf("week");
    const end = date.endOf("week");
    if (start.month() === end.month()) return `${start.format("MMMM D")} – ${end.format("D, YYYY")}`;
    return `${start.format("MMM D")} – ${end.format("MMM D, YYYY")}`;
  }
  return date.format("MMMM YYYY");
}

export function CalendarHeader({ currentDate, view, onViewChange, onNavigate, onToday, onAddEvent }: CalendarHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to home page after logout
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Tempo</h1>
        </Link>

        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold min-w-[180px] text-center">{getTitle(currentDate, view)}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-secondary rounded-lg p-0.5">
          {viewLabels.map((v) => (
            <button
              key={v.value}
              onClick={() => onViewChange(v.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                view === v.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <Button size="sm" onClick={onAddEvent} className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-1" />
          Event
        </Button>

        {user ? (
          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        ) : (
          <Link to="/signin">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-1" />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}