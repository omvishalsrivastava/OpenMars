import {
  MissionInputs,
  MissionCalculations,
  PROPULSION_SYSTEMS,
  formatMass,
  formatPercent,
} from "@shared/propulsion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

interface MissionVisualizationsProps {
  inputs: MissionInputs;
  results: MissionCalculations;
}

export function MissionVisualizations({
  inputs,
  results,
}: MissionVisualizationsProps) {
  // Data for pie chart: Propellant vs Dry Mass vs Payload
  const massCompositionData = [
    {
      name: "Propellant",
      value: results.propellantMass,
      percentage: results.propellantFraction,
    },
    {
      name: "Dry Mass",
      value: inputs.dryMass,
      percentage: results.dryMassFraction,
    },
    {
      name: "Payload",
      value: inputs.payloadMass,
      percentage: results.payloadFraction,
    },
  ];

  const COLORS = ["#3b82f6", "#f97316", "#10b981"];

  // Data for engine comparison (comparing the three engines for the same mission)
  const getEngineComparison = () => {
    const engines = ["chemical", "ntp", "nep"] as const;
    return engines.map((engine) => {
      const system = PROPULSION_SYSTEMS[engine];
      const calc = {
        payloadMass: inputs.payloadMass,
        dryMass: inputs.dryMass,
        missionDeltaV: inputs.missionDeltaV,
        engineType: engine,
      };
      // Simplified calculation for comparison
      const exponent = calc.missionDeltaV / (system.ispDefault * 9.81);
      const massRatio = Math.exp(exponent);
      const finalMass = calc.dryMass + calc.payloadMass;
      const initialMass = finalMass * massRatio;
      const propellantMass = initialMass - finalMass;

      return {
        engine: system.label,
        "Initial Mass": Math.round(initialMass),
        "Propellant Mass": Math.round(propellantMass),
        "Final Mass": Math.round(finalMass),
        Isp: system.ispDefault,
      };
    });
  };

  const engineComparisonData = getEngineComparison();

  // Data for mass fraction graph showing how fractions change
  const massFractionData = [
    {
      name: "Propellant",
      percentage: results.propellantFraction * 100,
      mass: results.propellantMass,
    },
    {
      name: "Dry Mass",
      percentage: results.dryMassFraction * 100,
      mass: inputs.dryMass,
    },
    {
      name: "Payload",
      percentage: results.payloadFraction * 100,
      mass: inputs.payloadMass,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="card-elevated p-6 md:p-8">
        <Tabs defaultValue="composition" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="composition" className="flex items-center gap-2">
              <PieChartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Composition</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Engines</span>
            </TabsTrigger>
            <TabsTrigger value="fractions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Fractions</span>
            </TabsTrigger>
          </TabsList>

          {/* Mass Composition Pie Chart */}
          <TabsContent value="composition" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={massCompositionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) =>
                        `${name} ${formatPercent(percentage)}`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {massCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatMass(value as number)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {massCompositionData.map((item, idx) => (
                  <div key={item.name} className="text-center p-3 bg-muted/50 rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-lg font-bold text-primary">
                      {formatPercent(item.percentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatMass(item.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Engine Comparison Bar Chart */}
          <TabsContent value="comparison" className="mt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Comparison of all three propulsion systems for the same mission
                parameters
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engineComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="engine" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatMass(value as number)}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend />
                  <Bar dataKey="Initial Mass" fill="#3b82f6" />
                  <Bar dataKey="Propellant Mass" fill="#f97316" />
                  <Bar dataKey="Final Mass" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {engineComparisonData.map((item) => (
                  <div key={item.engine} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">{item.engine}</p>
                    <p className="text-xs text-muted-foreground mt-1">Isp: {item.Isp}s</p>
                    <p className="text-lg font-bold text-primary mt-2">
                      {formatMass(item["Initial Mass"])}
                    </p>
                    <p className="text-xs text-muted-foreground">Initial Mass</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Mass Fraction Bar Chart */}
          <TabsContent value="fractions" className="mt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Percentage breakdown of total spacecraft mass
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={massFractionData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip
                    formatter={(value) => `${(value as number).toFixed(1)}%`}
                  />
                  <Bar dataKey="percentage" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {massFractionData.map((item, idx) => (
                  <div key={item.name} className="p-3 bg-muted/50 rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full mb-2"
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-lg font-bold text-primary">
                      {item.percentage.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">{formatMass(item.mass)}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
