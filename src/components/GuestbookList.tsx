"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GuestbookEntry } from "@/lib/guestbook";

function formatRelativeTime(input: string): string {
  const then = new Date(input).getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.floor((Date.now() - then) / 1000);

  if (seconds < 45) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(months / 12)}y ago`;
}

export default function GuestbookList({
  entries,
}: {
  entries: GuestbookEntry[];
}) {
  return (
    <ul className="custom-scrollbar flex max-h-[420px] flex-col gap-3 overflow-y-auto pr-2">
      <AnimatePresence initial={false}>
        {entries.length === 0 ? (
          <motion.li
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-black/10 bg-black/[0.02] p-4 text-center text-xs text-muted dark:border-white/10 dark:bg-white/[0.03]"
          >
            No messages yet. Be the first to sign the wall.
          </motion.li>
        ) : (
          entries.map((entry) => (
            <motion.li
              key={entry.id}
              layout
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className={`overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] p-3.5 backdrop-blur-sm transition-opacity dark:border-white/10 dark:bg-white/[0.04] ${
                entry.pending ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-medium text-foreground">
                  {entry.name}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-muted">
                  {entry.pending
                    ? "Sending…"
                    : formatRelativeTime(entry.created_at)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                {entry.message}
              </p>
            </motion.li>
          ))
        )}
      </AnimatePresence>
    </ul>
  );
}
