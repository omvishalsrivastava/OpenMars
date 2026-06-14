import { useState } from "react";
import {
  EngineType,
  PROPULSION_SYSTEMS,
  MissionInputs,
  MissionCalculations,
  calculateMission,
} from "@shared/propulsion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Rocket, Zap, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MissionInputFormProps {
  onCalculate: (inputs: MissionInputs, results: MissionCalculations) => void;
}

export function MissionInputForm({ onCalculate }: MissionInputFormProps) {
  const [payloadMass, setPayloadMass] = useState<number>(1000);
  const [dryMass, setDryMass] = useState<number>(5000);
  const [missionDeltaV, setMissionDeltaV] = useState<number>(9700);
  const [engineType, setEngineType] = useState<EngineType>("chemical");
  const [customIsp, setCustomIsp] = useState<number | undefined>();
  const [useCustomIsp, setUseCustomIsp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (payloadMass <= 0) {
      newErrors.payloadMass = "Payload mass must be greater than 0";
    }
    if (dryMass <= 0) {
      newErrors.dryMass = "Dry mass must be greater than 0";
    }
    if (missionDeltaV <= 0) {
      newErrors.missionDeltaV = "Mission Delta-v must be greater than 0";
    }
    if (useCustomIsp && (!customIsp || customIsp <= 0)) {
      newErrors.customIsp = "Custom Isp must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const inputs: MissionInputs = {
      payloadMass,
      dryMass,
      missionDeltaV,
      engineType,
      customIsp: useCustomIsp ? customIsp : undefined,
    };

    const results = calculateMission(inputs);
    onCalculate(inputs, results);
  };

  const currentIsp = useCustomIsp
    ? (customIsp ?? PROPULSION_SYSTEMS[engineType].ispDefault)
    : PROPULSION_SYSTEMS[engineType].ispDefault;

  return (
    <Card className="card-elevated p-6 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <img src="/mars-v4.png" alt="Mars" className="w-32 h-32 object-contain" />
      </div>

      <div className="space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Mission Configuration</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Define your spacecraft parameters and propulsion system to calculate mission feasibility.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mass Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="payload-mass" className="text-sm font-medium">
                  Payload Mass (kg)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>The useful cargo of your mission.</TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="payload-mass"
                type="number"
                value={payloadMass}
                onChange={(e) => setPayloadMass(Number(e.target.value))}
                className={errors.payloadMass ? "border-destructive focus-visible:ring-destructive" : "bg-muted/30"}
                placeholder="1000"
                min="0"
                step="100"
              />
              {errors.payloadMass && (
                <p className="text-xs text-destructive flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.payloadMass}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dry-mass" className="text-sm font-medium">
                  Dry Mass (kg)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Mass of the spacecraft without propellant.</TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="dry-mass"
                type="number"
                value={dryMass}
                onChange={(e) => setDryMass(Number(e.target.value))}
                className={errors.dryMass ? "border-destructive focus-visible:ring-destructive" : "bg-muted/30"}
                placeholder="5000"
                min="0"
                step="100"
              />
              {errors.dryMass && (
                <p className="text-xs text-destructive flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dryMass}
                </p>
              )}
            </div>
          </div>

          {/* Delta-v Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="mission-deltav" className="text-sm font-medium">
                Mission Delta-v (m/s)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>Total change in velocity required for the mission.</TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="mission-deltav"
              type="number"
              value={missionDeltaV}
              onChange={(e) => setMissionDeltaV(Number(e.target.value))}
              className={errors.missionDeltaV ? "border-destructive focus-visible:ring-destructive" : "bg-muted/30"}
              placeholder="9700"
              min="0"
              step="100"
            />
            {errors.missionDeltaV && (
              <p className="text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.missionDeltaV}
              </p>
            )}
            <div className="flex gap-4 mt-2">
              <button 
                type="button"
                onClick={() => setMissionDeltaV(9700)}
                className="text-[10px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                Hohmann: 9,700 m/s
              </button>
              <button 
                type="button"
                onClick={() => setMissionDeltaV(15500)}
                className="text-[10px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                Fast: 15,500 m/s
              </button>
            </div>
          </div>

          {/* Engine Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Propulsion System</Label>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(PROPULSION_SYSTEMS).map(([key, system]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setEngineType(key as EngineType);
                    setUseCustomIsp(false);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    engineType === key
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm">{system.label}</span>
                    <span className="text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border">
                      Isp: {system.ispDefault}s
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {system.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Isp Option */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="custom-isp" 
                checked={useCustomIsp}
                onCheckedChange={(checked) => setUseCustomIsp(checked as boolean)}
              />
              <Label htmlFor="custom-isp" className="text-sm font-medium cursor-pointer">
                Override Specific Impulse (Isp)
              </Label>
            </div>

            {useCustomIsp && (
              <div className="space-y-2 pt-2 animate-fade-in">
                <Label htmlFor="custom-isp-value" className="text-xs text-muted-foreground">
                  Custom Isp Value (seconds)
                </Label>
                <Input
                  id="custom-isp-value"
                  type="number"
                  value={customIsp || ""}
                  onChange={(e) => setCustomIsp(Number(e.target.value) || undefined)}
                  className={errors.customIsp ? "border-destructive" : "bg-background"}
                  placeholder="Enter custom Isp"
                  min="0"
                  step="10"
                />
                {errors.customIsp && (
                  <p className="text-xs text-destructive flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.customIsp}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
              <span className="text-muted-foreground">Effective Specific Impulse:</span>
              <span className="font-mono font-bold text-primary">{currentIsp}s</span>
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Analyze Mission
          </Button>
        </div>
      </div>
    </Card>
  );
}
