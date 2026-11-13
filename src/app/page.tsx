"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import About from "@/components/About";
import GuestbookSection from "@/components/GuestbookSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ParticleGlobe from "@/components/ParticleGlobe";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-h-dvh">
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar />
          <Hero />
          <About visual={<ParticleGlobe />} />
          <Timeline />
          <Skills />
          <Projects />
          <GuestbookSection />
          <footer className="border-t border-line/60 py-8">
            <div className="mx-auto w-full max-w-6xl px-6">
              <p className="text-xs text-muted">
                © 2026 Brilian Fatih Wicaksono. Built with Next.js &amp;
                Tailwind CSS.
              </p>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
