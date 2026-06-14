import { useState } from "react";
import { MissionInputs, MissionCalculations } from "@shared/propulsion";
import { MissionInputForm } from "@/components/MissionInputForm";
import { MissionComparison } from "@/components/MissionComparison";
import { MarsMissionPlanner } from "@/components/MarsMissionPlanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Zap, Globe } from "lucide-react";

export default function Advanced() {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
              <img src="/mars-ultra.png" alt="Mars" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">OpenMars Advanced</h1>
              <p className="text-sm text-gray-600">
                Mission Comparison & Mars Mission Planner
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
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
                      <div className="p-4 rounded-lg bg-gray-100">
                        <Zap className="w-12 h-12 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">No Comparison Yet</h3>
                    <p className="text-gray-600">
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
    </div>
  );
}
