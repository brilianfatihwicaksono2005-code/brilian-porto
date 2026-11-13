"use client";

import { useEffect, useOptimistic, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  addGuestbookEntry,
  getGuestbookEntries,
} from "@/app/actions/guestbook";
import type { GuestbookEntry } from "@/lib/guestbook";
import GuestbookList from "./GuestbookList";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          Sending...
        </>
      ) : (
        "Sign the wall"
      )}
    </button>
  );
}

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  const [optimisticEntries, addOptimisticEntry] = useOptimistic(
    entries,
    (state, entry: GuestbookEntry) => [entry, ...state],
  );

  useEffect(() => {
    let active = true;

    getGuestbookEntries()
      .then((data) => {
        if (active) setEntries(data);
      })
      .catch((error) => {
        console.error("Failed to load guestbook entries:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !message) return;

    const optimisticEntry: GuestbookEntry = {
      id: `optimistic-${Date.now()}`,
      name,
      message,
      created_at: new Date().toISOString(),
      pending: true,
    };

    addOptimisticEntry(optimisticEntry);

    try {
      const created = await addGuestbookEntry(formData);
      setEntries((previous) => [created, ...previous]);
      formRef.current?.reset();
    } catch (error) {
      console.error("Failed to add guestbook entry:", error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          required
          maxLength={40}
          autoComplete="off"
          placeholder="Your Name"
          className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 text-sm text-foreground transition-colors placeholder:text-muted focus:border-violet-500 focus:outline-none dark:border-white/10 dark:bg-white/5"
        />
        <textarea
          name="message"
          required
          maxLength={280}
          rows={3}
          placeholder="Your Message"
          className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.03] p-3 text-sm text-foreground transition-colors placeholder:text-muted focus:border-violet-500 focus:outline-none dark:border-white/10 dark:bg-white/5"
        />
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>

      <GuestbookList entries={optimisticEntries} />
    </div>
  );
}
