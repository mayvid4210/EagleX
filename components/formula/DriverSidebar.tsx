"use client";

import React from "react";
import LiveDriverTable from "./LiveDriverTable";
import TelemetryPanel from "./TelemetryPanel";
import RaceSummary from "./RaceSummary";
import { Driver } from "./useSocket";

export default function DriverSidebar({
  drivers,
  selectedDriverId,
  onSelect,
  summary,
  onStartRace,
}: {
  drivers: Driver[];
  selectedDriverId: number | null;
  onSelect: (id: number) => void;
  summary: any[] | null;
  onStartRace: () => void;
}) {
  const selected = drivers.find((d) => d.id === selectedDriverId) || drivers[0];

  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white/5 p-3 border border-cyan-300/10">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Live</div>
          <button onClick={onStartRace} className="px-3 py-1 rounded bg-cyan-700/30">Start</button>
        </div>

        <div className="h-52 overflow-auto">
          <LiveDriverTable drivers={drivers} onSelect={(id) => onSelect(id)} />
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 p-3 border border-cyan-300/10">
        <div className="font-semibold mb-2">Selected Telemetry</div>
        <TelemetryPanel driver={selected} />
      </div>

      <div className="rounded-2xl bg-white/5 p-3 border border-cyan-300/10">
        <div className="font-semibold mb-2">Race Summary</div>
        <RaceSummary summary={summary} />
      </div>
    </aside>
  );
}
