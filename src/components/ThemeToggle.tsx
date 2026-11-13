"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}
