"use server";

import { revalidatePath } from "next/cache";
import { getSupabase, getSupabaseHost } from "@/lib/supabase";
import type { GuestbookEntry } from "@/lib/guestbook";

const MAX_NAME = 40;
const MAX_MESSAGE = 280;
const COLUMNS = "id, name, message, created_at";

function describeError(error: unknown): string {
  if (error instanceof Error) {
    const cause = (error as { cause?: unknown }).cause;
    if (cause instanceof Error) {
      return `${error.message} (cause: ${cause.message})`;
    }
    return error.message;
  }
  return String(error);
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("guestbook")
    .select(COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      `[guestbook] SELECT failed against ${getSupabaseHost()}:`,
      error,
      (error as { cause?: unknown }).cause,
    );
    throw new Error(`Failed to load guestbook: ${describeError(error)}`);
  }

  return (data ?? []) as GuestbookEntry[];
}

export async function addGuestbookEntry(
  formData: FormData,
): Promise<GuestbookEntry> {
  const name = String(formData.get("name") ?? "")
    .trim()
    .slice(0, MAX_NAME);
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MAX_MESSAGE);

  if (!name || !message) {
    throw new Error("Name and message are required.");
  }

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("guestbook")
    .insert({ name, message })
    .select(COLUMNS)
    .single();

  if (error) {
    console.error(
      `[guestbook] INSERT failed against ${getSupabaseHost()}:`,
      error,
      (error as { cause?: unknown }).cause,
    );
    throw new Error(`Failed to save entry: ${describeError(error)}`);
  }

  revalidatePath("/");

  return data as GuestbookEntry;
}
