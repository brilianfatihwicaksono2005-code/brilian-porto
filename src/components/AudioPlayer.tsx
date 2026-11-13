"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.volume = 0;
      audio.play().catch(() => setIsPlaying(false));

      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.05;
          audio.volume = Math.min(vol, 1);
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      let vol = audio.volume;
      const interval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = Math.max(vol, 0);
        } else {
          audio.pause();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/audio/interstellar.mp3"
        loop
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-canvas/80 backdrop-blur-md shadow-lg text-foreground transition-colors hover:bg-elevated"
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
