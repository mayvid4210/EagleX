"use client";
import React from "react";

export default function SustainabilityPanel({ energyUse = 1234 }: { energyUse?: number }) {
  const avoided = Math.round(energyUse * 0.12);
  return (
    <div className="p-3 rounded-2xl bg-white/4">
      <h4 className="font-semibold">Sustainability</h4>
      <div className="text-sm text-cyan-300/70 mt-2">Estimated energy use: {energyUse} kWh</div>
      <div className="text-sm text-cyan-300/70">Emissions avoided (est): {avoided} kg CO₂</div>
    </div>
  );
}
