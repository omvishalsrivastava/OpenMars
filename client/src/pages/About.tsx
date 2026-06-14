import { Globe, Rocket, Zap, Shield, Info, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <img src="/mars-ultra.png" alt="Mars" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenMars</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-primary transition-colors">About</Link>
            <Link href="/advanced" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Advanced</Link>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="container py-6 flex flex-col gap-4">
              <Link href="/about" className="text-lg font-medium py-2 text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/advanced" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>Advanced</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="container py-16 max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About OpenMars</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A high-fidelity aerospace mission planning and propulsion analysis platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Mission Architecture</h3>
              <p className="text-muted-foreground">
                Evaluate Earth-to-Mars missions by calculating mass ratios, propellant requirements, 
                and payload fractions using real aerospace engineering principles.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Propulsion Comparison</h3>
              <p className="text-muted-foreground">
                Compare multiple propulsion technologies, including Chemical, Nuclear Thermal (NTP), 
                and Nuclear Electric Propulsion (NEP), to understand their impact on mission design.
              </p>
            </div>
          </div>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold">The Mission</h2>
            <p className="text-lg leading-relaxed">
              OpenMars was developed to help students, enthusiasts, and aspiring engineers explore the 
              complex challenges of interplanetary travel. By providing a suite of analysis tools 
              grounded in the Tsiolkovsky Rocket Equation, the platform makes mission planning 
              accessible and educational.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you're analyzing delta-v requirements for a crewed mission or estimating 
              the propellant mass for a cargo haul, OpenMars provides the data-driven insights 
              needed to understand the engineering trade-offs of reaching the Red Planet.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Future Roadmap</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                <div>
                  <h4 className="font-bold">Version 1.1</h4>
                  <p className="text-muted-foreground">Dark Mode Support, Enhanced Documentation, and Advanced Launch Vehicle Selection.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary/50" />
                <div>
                  <h4 className="font-bold">Version 1.2</h4>
                  <p className="text-muted-foreground">Crewed Mission Planning, Habitat Mass Calculations, and Life Support Requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary/30" />
                <div>
                  <h4 className="font-bold">Version 2.0</h4>
                  <p className="text-muted-foreground">Orbital Visualization, Transfer Window Planning, and PDF Mission Reports.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
