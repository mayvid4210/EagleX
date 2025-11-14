"use client";
import React, { useState } from "react";

type Hot = { id: string; name: string; desc: string; x:number; y:number };
const HOTSPOTS: Hot[] = [
  { id: "front", name: "Front Wing", desc: "Adjusts downforce and balance.", x: 62, y: 38 },
  { id: "cockpit", name: "Cockpit", desc: "Driver controls & HUD.", x: 150, y: 44 },
  { id: "rear", name: "Rear Wing", desc: "Major downforce element.", x: 240, y: 38 },
  { id: "susp", name: "Suspension", desc: "Active damper system.", x: 150, y: 82 },
];

export default function CarComparisonAdvanced() {
  const [hot, setHot] = useState<Hot | null>(null);

  return (
    <div className="p-4 rounded-2xl bg-white/4 border border-cyan-300/15">
      <h4 className="font-semibold mb-3">Car Inspector</h4>
      <div className="relative">
        <svg viewBox="0 0 300 120" width="100%" height="220">
          <rect x="10" y="30" rx="12" ry="12" width="280" height="60" fill="rgba(0,255,255,0.04)" stroke="rgba(0,255,255,0.08)"/>
          {/* hotspots */}
          {HOTSPOTS.map(h => (
            <g key={h.id} transform={`translate(${h.x},${h.y})`}>
              <circle
                cx={0}
                cy={0}
                r={10}
                fill={hot?.id === h.id ? "rgba(0,255,255,0.35)" : "rgba(0,255,255,0.12)"}
                stroke="rgba(0,255,255,0.18)"
                onMouseEnter={()=>setHot(h)}
                onMouseLeave={()=>setHot(null)}
                style={{ cursor: "pointer" }}
              />
            </g>
          ))}
        </svg>

        {/* Hover info */}
        {hot && (
          <div className="absolute right-3 top-3 p-3 rounded bg-white/6 border border-cyan-300/10 w-44">
            <div className="font-semibold">{hot.name}</div>
            <div className="text-sm text-cyan-300/70 mt-1">{hot.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}
