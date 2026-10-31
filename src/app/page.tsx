import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-dvh bg-canvas">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="border-t border-line/60 py-8">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-xs text-muted">
            © 2026 Brilian Fatih Wicaksono. Built with Next.js &amp; Tailwind
            CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
