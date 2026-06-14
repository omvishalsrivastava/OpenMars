import { useState } from "react";
import { MissionInputs, MissionCalculations } from "@shared/propulsion";
import { MissionInputForm } from "@/components/MissionInputForm";
import { MissionComparison } from "@/components/MissionComparison";
import { MarsMissionPlanner } from "@/components/MarsMissionPlanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Zap, Globe, Menu, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Advanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [missionData, setMissionData] = useState<{
    inputs: MissionInputs;
    results: MissionCalculations;
  } | null>(null);

  const handleCalculate = (
    inputs: MissionInputs,
    results: MissionCalculations
  ) => {
    setMissionData({ inputs, results });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-primary/20">
              <img src="/mars-ultra.png" alt="Mars" className="w-full h-full object-cover" />
            </div>
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-lg md:text-2xl font-bold tracking-tight">OpenMars</h1>
                <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  Advanced Planner
                </p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/advanced" className="text-sm font-medium text-primary transition-colors">Advanced</Link>
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
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md animate-in slide-in-from-top duration-200">
            <div className="container py-6 flex flex-col gap-4">
              <Link href="/about" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/advanced" className="text-lg font-medium py-2 text-primary" onClick={() => setIsMenuOpen(false)}>Advanced</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12 flex-grow max-w-6xl mx-auto">
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comparison" className="flex items-center gap-2 cursor-pointer">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2 cursor-pointer">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Mars Planner</span>
            </TabsTrigger>
          </TabsList>

          {/* Mission Comparison Tab */}
          <TabsContent value="comparison" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Form */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <MissionInputForm onCalculate={handleCalculate} />
                </div>
              </div>

              {/* Comparison Results */}
              <div className="lg:col-span-2">
                {missionData ? (
                  <div className="animate-fade-in">
                    <MissionComparison baseInputs={missionData.inputs} />
                  </div>
                ) : (
                  <div className="card-elevated p-12 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-lg bg-muted">
                        <Zap className="w-12 h-12 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">No Comparison Yet</h3>
                    <p className="text-muted-foreground">
                      Enter mission parameters on the left to compare propulsion
                      systems side-by-side.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Mars Mission Planner Tab */}
          <TabsContent value="planner" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <MarsMissionPlanner />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
