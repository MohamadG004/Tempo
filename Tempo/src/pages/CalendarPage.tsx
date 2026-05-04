import { useState } from "react";
import dayjs from "dayjs";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { MonthView } from "@/components/calendar/MonthView";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { EventModal } from "@/components/calendar/EventModal";
import { MiniCalendar } from "@/components/calendar/MiniCalendar";
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents";
import { useCalendarStore } from "@/hooks/use-calendar-store";
import type { CalendarEvent } from "@/types/calendar";

const CalendarPage = () => {
  const store = useCalendarStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState("");

  const handleDayClick = (dateKey: string) => {
    setEditEvent(null);
    setDefaultDate(dateKey);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditEvent(event);
    setDefaultDate("");
    setModalOpen(true);
  };

  const handleAddEvent = () => {
    setEditEvent(null);
    setDefaultDate(dayjs().format("YYYY-MM-DD"));
    setModalOpen(true);
  };

  const handleNavigate = (direction: number) => {
    if (store.view === "month") store.navigateMonth(direction);
    else if (store.view === "week") store.navigateWeek(direction);
    else store.navigateDay(direction);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <CalendarHeader
        currentDate={store.currentDate}
        view={store.view}
        onViewChange={store.setView}
        onNavigate={handleNavigate}
        onToday={store.goToToday}
        onAddEvent={handleAddEvent}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card">
          <MiniCalendar
            currentDate={store.currentDate}
            onDateSelect={(d) => {
              store.setCurrentDate(d);
              if (store.view === "month") store.setView("day");
            }}
          />
          <UpcomingEvents events={store.events} onEventClick={handleEventClick} />
        </aside>

        {/* Main calendar view */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {store.view === "month" && (
            <MonthView
              currentDate={store.currentDate}
              getEventsForDate={store.getEventsForDate}
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          )}
          {store.view === "week" && (
            <WeekView
              currentDate={store.currentDate}
              getEventsForDate={store.getEventsForDate}
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          )}
          {store.view === "day" && (
            <DayView
              currentDate={store.currentDate}
              getEventsForDate={store.getEventsForDate}
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          )}
        </main>
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditEvent(null); }}
        onSave={store.addEvent}
        onUpdate={store.updateEvent}
        onDelete={store.deleteEvent}
        editEvent={editEvent}
        defaultDate={defaultDate}
      />
    </div>
  );
};

export default CalendarPage;