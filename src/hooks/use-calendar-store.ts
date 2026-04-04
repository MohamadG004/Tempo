import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import type { CalendarEvent, CalendarView } from "@/types/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { fetchEvents, createEvent, updateEventApi, deleteEventApi } from "@/services/events-api";

const STORAGE_KEY = "tempo-events";

function loadLocalEvents(): CalendarEvent[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalEvents(events: CalendarEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function isRecurrenceMatch(event: CalendarEvent, dateKey: string): boolean {
  const eventDate = dayjs(event.date);
  const target = dayjs(dateKey);
  if (target.isBefore(eventDate, "day")) return false;

  switch (event.recurrence) {
    case "daily":
      return true;
    case "weekly":
      return eventDate.day() === target.day();
    case "monthly":
      return eventDate.date() === target.date();
    case "yearly":
      return eventDate.month() === target.month() && eventDate.date() === target.date();
    default:
      return event.date === dateKey;
  }
}

export function useCalendarStore() {
  const [events, setEvents] = useState<CalendarEvent[]>(loadLocalEvents);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEvents()
        .then(setEvents)
        .catch(() => setEvents(loadLocalEvents()));
    } else {
      setEvents(loadLocalEvents());
    }
  }, [user?.userId]);

  const addEvent = useCallback(
    async (event: Omit<CalendarEvent, "id">) => {
      if (user) {
        try {
          const created = await createEvent(event, user.userId);
          setEvents((prev) => [...prev, created]);
        } catch {
          const newEvent: CalendarEvent = { ...event, id: crypto.randomUUID() };
          setEvents((prev) => {
            const next = [...prev, newEvent];
            saveLocalEvents(next);
            return next;
          });
        }
      } else {
        const newEvent: CalendarEvent = { ...event, id: crypto.randomUUID() };
        setEvents((prev) => {
          const next = [...prev, newEvent];
          saveLocalEvents(next);
          return next;
        });
      }
    },
    [user]
  );

  const updateEvent = useCallback(
    async (id: string, updates: Partial<CalendarEvent>) => {
      if (user) {
        try {
          const updated = await updateEventApi(id, updates);
          setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
        } catch {
          setEvents((prev) => {
            const next = prev.map((e) => (e.id === id ? { ...e, ...updates } : e));
            saveLocalEvents(next);
            return next;
          });
        }
      } else {
        setEvents((prev) => {
          const next = prev.map((e) => (e.id === id ? { ...e, ...updates } : e));
          saveLocalEvents(next);
          return next;
        });
      }
    },
    [user]
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      if (user) {
        try {
          await deleteEventApi(id);
          setEvents((prev) => prev.filter((e) => e.id !== id));
        } catch {
          setEvents((prev) => {
            const next = prev.filter((e) => e.id !== id);
            saveLocalEvents(next);
            return next;
          });
        }
      } else {
        setEvents((prev) => {
          const next = prev.filter((e) => e.id !== id);
          saveLocalEvents(next);
          return next;
        });
      }
    },
    [user]
  );

  const getEventsForDate = useCallback(
    (dateKey: string): CalendarEvent[] => {
      return events.filter((e) => isRecurrenceMatch(e, dateKey));
    },
    [events]
  );

  const navigateMonth = useCallback((direction: number) => {
    setCurrentDate((prev) => prev.add(direction, "month"));
  }, []);

  const navigateWeek = useCallback((direction: number) => {
    setCurrentDate((prev) => prev.add(direction, "week"));
  }, []);

  const navigateDay = useCallback((direction: number) => {
    setCurrentDate((prev) => prev.add(direction, "day"));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(dayjs());
  }, []);

  return {
    events,
    currentDate,
    view,
    selectedDate,
    setView,
    setSelectedDate,
    setCurrentDate,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    navigateMonth,
    navigateWeek,
    navigateDay,
    goToToday,
  };
}
