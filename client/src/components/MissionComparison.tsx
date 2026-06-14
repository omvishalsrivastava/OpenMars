import { useState } from "react";
import {
  EngineType,
  PROPULSION_SYSTEMS,
  MissionInputs,
  calculateMission,
  formatMass,
  formatVelocity,
  formatTime,
  formatPercent,
  formatNumber,
} from "@shared/propulsion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRightLeft } from "lucide-react";

interface MissionComparisonProps {
  baseInputs: MissionInputs;
}

type ComparisonPair = "chemical-ntp" | "chemical-nep" | "ntp-nep";

export function MissionComparison({ baseInputs }: MissionComparisonProps) {
  const [comparisonPair, setComparisonPair] = useState<ComparisonPair>(
    "chemical-ntp"
  );

  const getEngineTypesForPair = (pair: ComparisonPair): [EngineType, EngineType] => {
    const pairs: Record<ComparisonPair, [EngineType, EngineType]> = {
      "chemical-ntp": ["chemical", "ntp"],
      "chemical-nep": ["chemical", "nep"],
      "ntp-nep": ["ntp", "nep"],
    };
    return pairs[pair];
  };

  const [engine1Type, engine2Type] = getEngineTypesForPair(comparisonPair);

  const engine1 = PROPULSION_SYSTEMS[engine1Type];
  const engine2 = PROPULSION_SYSTEMS[engine2Type];

  const results1 = calculateMission({
    payloadMass: baseInputs.payloadMass,
    dryMass: baseInputs.dryMass,
    missionDeltaV: baseInputs.missionDeltaV,
    engineType: engine1Type,
  });
  const results2 = calculateMission({
    payloadMass: baseInputs.payloadMass,
    dryMass: baseInputs.dryMass,
    missionDeltaV: baseInputs.missionDeltaV,
    engineType: engine2Type,
  });

  const comparisonData = [
    {
      metric: "Initial Mass",
      [engine1.label]: Math.round(results1.initialMass),
      [engine2.label]: Math.round(results2.initialMass),
    },
    {
      metric: "Propellant Mass",
      [engine1.label]: Math.round(results1.propellantMass),
      [engine2.label]: Math.round(results2.propellantMass),
    },
    {
      metric: "Final Mass",
      [engine1.label]: Math.round(results1.finalMass),
      [engine2.label]: Math.round(results2.finalMass),
    },
  ];

  const comparisonDetails = [
    {
      label: "Specific Impulse (Isp)",
      value1: `${formatNumber(results1.isp, 0)}s`,
      value2: `${formatNumber(results2.isp, 0)}s`,
      advantage: results2.isp > results1.isp ? engine2.label : engine1.label,
    },
    {
      label: "Mass Ratio",
      value1: formatNumber(results1.massRatio, 2),
      value2: formatNumber(results2.massRatio, 2),
      advantage: results2.massRatio < results1.massRatio ? engine2.label : engine1.label,
    },
    {
      label: "Initial Mass",
      value1: formatMass(results1.initialMass),
      value2: formatMass(results2.initialMass),
      advantage: results2.initialMass < results1.initialMass ? engine2.label : engine1.label,
    },
    {
      label: "Propellant Mass",
      value1: formatMass(results1.propellantMass),
      value2: formatMass(results2.propellantMass),
      advantage: results2.propellantMass < results1.propellantMass ? engine2.label : engine1.label,
    },
    {
      label: "Propellant Fraction",
      value1: formatPercent(results1.propellantFraction),
      value2: formatPercent(results2.propellantFraction),
      advantage: results2.propellantFraction < results1.propellantFraction ? engine2.label : engine1.label,
    },
    {
      label: "Payload Fraction",
      value1: formatPercent(results1.payloadFraction),
      value2: formatPercent(results2.payloadFraction),
      advantage: results2.payloadFraction > results1.payloadFraction ? engine2.label : engine1.label,
    },
    {
      label: "Estimated Transit Time",
      value1: formatTime(results1.estimatedTransitTime),
      value2: formatTime(results2.estimatedTransitTime),
      advantage: results2.estimatedTransitTime < results1.estimatedTransitTime ? engine2.label : engine1.label,
    },
  ];

  const massDifference = results1.initialMass - results2.initialMass;
  const massDifferencePercent = (massDifference / results1.initialMass) * 100;

  return (
    <Card className="card-elevated p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            <h3 className="text-2xl font-bold">Mission Comparison</h3>
          </div>
          <p className="text-muted-foreground">
            Compare two propulsion systems for the same mission parameters
          </p>
        </div>

        {/* Comparison Pair Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Select Comparison</label>
          <Select value={comparisonPair} onValueChange={(value) => setComparisonPair(value as ComparisonPair)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chemical-ntp">Chemical vs NTP</SelectItem>
              <SelectItem value="chemical-nep">Chemical vs NEP</SelectItem>
              <SelectItem value="ntp-nep">NTP vs NEP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comparison Chart */}
        <div className="space-y-4">
          <h4 className="font-semibold">Mass Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip formatter={(value) => formatMass(value as number)} />
              <Legend />
              <Bar dataKey={engine1.label} fill="#3b82f6" />
              <Bar dataKey={engine2.label} fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Comparison Table */}
        <div className="space-y-4">
          <h4 className="font-semibold">Detailed Metrics</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold">Metric</th>
                  <th className="text-center py-2 px-3 font-semibold">{engine1.label}</th>
                  <th className="text-center py-2 px-3 font-semibold">{engine2.label}</th>
                  <th className="text-center py-2 px-3 font-semibold">Better</th>
                </tr>
              </thead>
              <tbody>
                {comparisonDetails.map((detail, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-3 font-medium">{detail.label}</td>
                    <td className="text-center py-3 px-3">{detail.value1}</td>
                    <td className="text-center py-3 px-3">{detail.value2}</td>
                    <td className="text-center py-3 px-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {detail.advantage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insight */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">Key Insight</p>
          <p className="text-sm text-blue-800">
            {massDifference > 0
              ? `${engine1.label} requires ${formatMass(Math.abs(massDifference))} more initial mass (${Math.abs(massDifferencePercent).toFixed(1)}% heavier) than ${engine2.label} for the same mission.`
              : `${engine2.label} requires ${formatMass(Math.abs(massDifference))} more initial mass (${Math.abs(massDifferencePercent).toFixed(1)}% heavier) than ${engine1.label} for the same mission.`}
          </p>
        </div>

        {/* System Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-semibold mb-2">{engine1.name}</p>
            <p className="text-sm text-muted-foreground">{engine1.description}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Default Isp: {engine1.ispDefault}s</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-semibold mb-2">{engine2.name}</p>
            <p className="text-sm text-muted-foreground">{engine2.description}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Default Isp: {engine2.ispDefault}s</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
