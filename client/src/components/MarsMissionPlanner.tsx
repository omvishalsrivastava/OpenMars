import { useState } from "react";
import {
  EngineType,
  PROPULSION_SYSTEMS,
  calculateMarsMission,
  formatTime,
  formatVelocity,
  formatNumber,
} from "@shared/propulsion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Calendar, Zap } from "lucide-react";

interface MarsMissionPlannerProps {
  onPlanMission?: (launchYear: number, transferType: "fast" | "hohmann") => void;
}

export function MarsMissionPlanner({ onPlanMission }: MarsMissionPlannerProps) {
  const [launchYear, setLaunchYear] = useState<number>(2030);
  const [transferType, setTransferType] = useState<"fast" | "hohmann">("hohmann");
  const [engineType, setEngineType] = useState<EngineType>("chemical");
  const [payloadMass, setPayloadMass] = useState<number>(1000);
  const [dryMass, setDryMass] = useState<number>(5000);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear;
  const maxYear = currentYear + 50;

  const results = calculateMarsMission({
    launchYear,
    transferType,
    payloadMass,
    dryMass,
    engineType,
  });

  const system = PROPULSION_SYSTEMS[engineType];

  const transferDetails = {
    hohmann: {
      name: "Hohmann Transfer",
      description: "Fuel-efficient orbital transfer using the minimum energy path",
      advantages: [
        "Most fuel-efficient option",
        "Lower propellant requirements",
        "Well-established trajectory",
      ],
      disadvantages: [
        "Longer transit time (~260 days for chemical)",
        "Limited launch windows",
        "Less flexibility for course corrections",
      ],
      deltaV: 9700,
    },
    fast: {
      name: "Fast Transfer",
      description: "High-energy trajectory for faster Earth-Mars transit",
      advantages: [
        "Significantly shorter travel time",
        "More flexible launch windows",
        "Better for crew missions",
      ],
      disadvantages: [
        "Requires more fuel",
        "Higher propellant mass",
        "More demanding on spacecraft",
      ],
      deltaV: 15500,
    },
  };

  const transferInfo = transferDetails[transferType];

  return (
    <Card className="card-elevated p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Mars Mission Planner</h2>
          </div>
          <p className="text-muted-foreground">
            Plan your Earth-to-Mars mission with customizable parameters
          </p>
        </div>

        {/* Mission Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Launch Year */}
          <div className="space-y-2">
            <Label htmlFor="launch-year" className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Launch Year
            </Label>
            <Input
              id="launch-year"
              type="number"
              value={launchYear}
              onChange={(e) => setLaunchYear(Number(e.target.value))}
              min={minYear}
              max={maxYear}
              className="text-center"
            />
            <p className="text-xs text-muted-foreground/70">
              {launchYear} (in {launchYear - currentYear} years)
            </p>
          </div>

          {/* Transfer Type */}
          <div className="space-y-2">
            <Label htmlFor="transfer-type" className="text-sm font-semibold">
              Transfer Type
            </Label>
            <Select value={transferType} onValueChange={(value) => setTransferType(value as "fast" | "hohmann")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hohmann">Hohmann</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Propulsion System */}
          <div className="space-y-2">
            <Label htmlFor="engine-type" className="text-sm font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Propulsion System
            </Label>
            <Select value={engineType} onValueChange={(value) => setEngineType(value as EngineType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROPULSION_SYSTEMS).map(([key, system]) => (
                  <SelectItem key={key} value={key}>
                    {system.label} (Isp: {system.ispDefault}s)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payload Mass */}
          <div className="space-y-2">
            <Label htmlFor="payload-mass" className="text-sm font-semibold">
              Payload Mass (kg)
            </Label>
            <Input
              id="payload-mass"
              type="number"
              value={payloadMass}
              onChange={(e) => setPayloadMass(Number(e.target.value))}
              min="0"
              step="100"
            />
          </div>

          {/* Dry Mass */}
          <div className="space-y-2">
            <Label htmlFor="dry-mass" className="text-sm font-semibold">
              Dry Mass (kg)
            </Label>
            <Input
              id="dry-mass"
              type="number"
              value={dryMass}
              onChange={(e) => setDryMass(Number(e.target.value))}
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* Transfer Type Details */}
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="font-semibold text-primary mb-2">{transferInfo.name}</p>
          <p className="text-sm text-muted-foreground mb-3">{transferInfo.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Advantages:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {transferInfo.advantages.map((adv, idx) => (
                  <li key={idx}>✓ {adv}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Considerations:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {transferInfo.disadvantages.map((dis, idx) => (
                  <li key={idx}>• {dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mission Results */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Mission Architecture</h3>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-center font-semibold text-primary">
              {results.missionArchitecture}
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground font-medium">Delta-v Requirement</p>
            <p className="text-2xl font-bold text-primary mt-2">
              {formatVelocity(results.deltaVRequirement)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {transferType === "hohmann" ? "Hohmann" : "Fast"} transfer
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground font-medium">Estimated Transit Time</p>
            <p className="text-2xl font-bold text-primary mt-2">
              {formatTime(results.estimatedTransitTime)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {system.label} propulsion
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground font-medium">Initial Mass</p>
            <p className="text-2xl font-bold text-primary mt-2">
              {formatNumber(results.initialMass / 1000, 1)} t
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber((results.propellantFraction * 100), 1)}% propellant
            </p>
          </div>
        </div>

        {/* Mission Summary */}
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="font-semibold text-green-600 mb-2">Mission Summary</p>
          <div className="text-sm text-green-600/90 space-y-1">
            <p>
              • <span className="font-semibold">Launch:</span> {launchYear}
            </p>
            <p>
              • <span className="font-semibold">Transfer:</span> {transferType === "hohmann" ? "Hohmann" : "Fast"} ({formatVelocity(results.deltaVRequirement)})
            </p>
            <p>
              • <span className="font-semibold">Propulsion:</span> {system.name} (Isp: {system.ispDefault}s)
            </p>
            <p>
              • <span className="font-semibold">Transit Time:</span> {formatTime(results.estimatedTransitTime)}
            </p>
            <p>
              • <span className="font-semibold">Total Mass:</span> {formatNumber(results.initialMass / 1000, 1)} tonnes
            </p>
            <p>
              • <span className="font-semibold">Payload Capacity:</span> {formatNumber(payloadMass / 1000, 1)} tonnes
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
