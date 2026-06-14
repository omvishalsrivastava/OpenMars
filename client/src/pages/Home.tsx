import { useState } from "react";
import { MissionInputs, MissionCalculations } from "@shared/propulsion";
import { MissionInputForm } from "@/components/MissionInputForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { MissionVisualizations } from "@/components/MissionVisualizations";
import { Rocket, Globe, ChevronRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const [missionData, setMissionData] = useState<{
    inputs: MissionInputs;
    results: MissionCalculations;
  } | null>(null);

  const handleCalculate = (
    inputs: MissionInputs,
    results: MissionCalculations
  ) => {
    setMissionData({ inputs, results });
    // Smooth scroll to results on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenMars</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/advanced" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Advanced Planner
            </Link>
            <a href="https://github.com/omvishalsrivastava/open-mars" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-muted transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute top-[-50px] right-[-100px] w-[500px] h-[500px] animate-pulse-slow opacity-20">
            <img src="/mars.webp?v=1" alt="Mars" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] animate-pulse-slow opacity-10" style={{ animationDelay: '2s' }}>
            <img src="/mars.webp?v=1" alt="Mars" className="w-full h-full object-contain rotate-180" />
          </div>
        </div>
        
        <div className="container text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider animate-fade-in">
            <Globe className="w-3.5 h-3.5" />
            Next-Gen Mission Design
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] animate-fade-in">
            Engineer Your Journey to the <span className="text-primary">Red Planet</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A high-fidelity aerospace mission planning platform for calculating propulsion requirements, mass fractions, and transit trajectories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="h-12 px-8 font-bold" onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Planning <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/advanced">
              <Button variant="outline" size="lg" className="h-12 px-8 font-bold">
                Advanced Mode
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="planner" className="container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Input Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24">
              <MissionInputForm onCalculate={handleCalculate} />
            </div>
          </div>

          {/* Results Area */}
          <div id="results-section" className="lg:col-span-7 xl:col-span-8 min-h-[600px]">
            {missionData ? (
              <div className="space-y-8 animate-fade-in">
                <ResultsDashboard
                  inputs={missionData.inputs}
                  results={missionData.results}
                />
                <div className="p-6 rounded-xl border border-border/50 bg-card/30">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Visual Analytics
                  </h3>
                  <MissionVisualizations
                    inputs={missionData.inputs}
                    results={missionData.results}
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6 rounded-2xl border-2 border-dashed border-border/50 bg-muted/20">
                <div className="p-6 rounded-2xl bg-background shadow-sm">
                  <Rocket className="w-16 h-16 text-muted-foreground/40" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Awaiting Mission Parameters</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Configure your spacecraft's mass and propulsion system on the left to generate a comprehensive mission analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight">OpenMars</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 OpenMars Aerospace. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PieChart({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
