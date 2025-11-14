"use client";
import AddonDock from "@/components/ui/AddonDock";

import { useState } from "react";
import useSocket from "@/components/formula/useSocket";

import TrackMap from "@/components/formula/TrackMap";
import DriverSidebar from "@/components/formula/DriverSidebar";
import TrackSelector from "@/components/formula/TrackSelector";
import RaceSummary from "@/components/formula/RaceSummary";
import AICommentaryLive from "@/components/formula/AICommentaryLive";
import CarComparisonAdvanced from "@/components/formula/CarComparisonAdvanced";
import SustainabilityPanel from "@/components/formula/SustainabilityPanel";
import TelemetryPanel from "@/components/formula/TelemetryPanel";

export default function FormulaDashboard() {

  const { drivers, summary, emitSelectRace } = useSocket();
  const [track, setTrack] = useState("las-vegas");
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const selectedDriver =
    drivers.find((d) => d.id === selectedDriverId) || drivers[0];

  return (
    <div className="min-h-screen w-full p-6 blueprint-root text-cyan-200">

      {/* MAIN LAYOUT: BIG MAP LEFT + SIDEBAR RIGHT */}
      <div className="grid grid-cols-[1fr_320px] gap-6 h-[calc(100vh-40px)]">

        {/* LEFT: LARGE TRACK MAP */}
        <div className="rounded-2xl bg-white/5 border border-cyan-300/20 p-3 overflow-hidden">
          <TrackSelector selected={track} onSelect={setTrack} />
          <TrackMap
            track={track}
            drivers={drivers}
            selectedDriver={selectedDriver}
          />
        </div>

        {/* RIGHT: SIDEBAR */}
        <DriverSidebar
          drivers={drivers}
          selectedDriverId={selectedDriverId}
          onSelect={setSelectedDriverId}
          summary={summary}
          onStartRace={() => emitSelectRace("F1")}
        />
<AddonDock
  addons={{
    "Telemetry": <TelemetryPanel driver={selectedDriver} />,
    "Sustainability": <SustainabilityPanel energyUse={1200} />,
    "Car Inspector": <CarComparisonAdvanced />,
    "AI Commentary": <AICommentaryLive />,
    "Track Selector": <TrackSelector selected={track} onSelect={setTrack} />,
    "Race Summary": <RaceSummary summary={summary} />,
  }}
/>


      </div>
    </div>
  );
}
