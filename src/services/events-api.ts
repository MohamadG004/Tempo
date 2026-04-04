import { supabase } from "@/integrations/supabase/client";
import type { CalendarEvent } from "@/types/calendar";

export async function fetchEvents(): Promise<CalendarEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    date: row.date,
    startTime: row.start_time || undefined,
    endTime: row.end_time || undefined,
    color: row.color as CalendarEvent["color"],
    recurrence: row.recurrence as CalendarEvent["recurrence"],
    description: row.description || undefined,
  }));
}

export async function createEvent(event: Omit<CalendarEvent, "id">, userId: string): Promise<CalendarEvent> {
  const { data, error } = await supabase
    .from("events")
    .insert({
      user_id: userId,
      title: event.title,
      date: event.date,
      start_time: event.startTime || null,
      end_time: event.endTime || null,
      color: event.color,
      recurrence: event.recurrence,
      description: event.description || null,
    })
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    startTime: data.start_time || undefined,
    endTime: data.end_time || undefined,
    color: data.color as CalendarEvent["color"],
    recurrence: data.recurrence as CalendarEvent["recurrence"],
    description: data.description || undefined,
  };
}

export async function updateEventApi(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> {
  const dbUpdates: Record<string, any> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.date !== undefined) dbUpdates.date = updates.date;
  if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
  if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
  if (updates.color !== undefined) dbUpdates.color = updates.color;
  if (updates.recurrence !== undefined) dbUpdates.recurrence = updates.recurrence;
  if (updates.description !== undefined) dbUpdates.description = updates.description;

  const { data, error } = await supabase
    .from("events")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    startTime: data.start_time || undefined,
    endTime: data.end_time || undefined,
    color: data.color as CalendarEvent["color"],
    recurrence: data.recurrence as CalendarEvent["recurrence"],
    description: data.description || undefined,
  };
}

export async function deleteEventApi(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}