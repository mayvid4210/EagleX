"use client";
import React from "react";
import { Driver } from "./useSocket";

export default function TelemetryPanel({ driver }: { driver?: Driver }) {
  if (!driver)
    return (
      <div className="p-4 rounded-2xl bg-white/5 border border-cyan-300/20">
        <div className="text-cyan-300/70">Select a driver to view telemetry</div>
      </div>
    );

  const t = driver.telemetry;

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-cyan-300/20">
      <h3 className="font-semibold text-lg mb-3">Telemetry — {driver.name}</h3>

      <div className="grid grid-cols-2 gap-3 text-sm text-cyan-200/90">
        <div>Gear: <span className="font-bold">{t.gear}</span></div>
        <div>RPM: <span className="font-bold">{t.rpm}</span></div>
        <div>ERS: <span className="font-bold">{t.ers}%</span></div>
        <div>Engine Temp: <span className="font-bold">{t.engineTemp}°C</span></div>
        <div>Brake Temp: <span className="font-bold">{t.brakeTemp}°C</span></div>
        <div>Speed: <span className="font-bold">{Math.round(driver.speed)} km/h</span></div>

        <div className="col-span-2 pt-2">
          <div className="text-cyan-300/70 pb-1">Tyres (FL / FR / RL / RR)</div>
          <div className="flex gap-2 text-center">
            <div className="flex-1 p-2 rounded bg-white/10">{t.tyreTempFL}°</div>
            <div className="flex-1 p-2 rounded bg-white/10">{t.tyreTempFR}°</div>
            <div className="flex-1 p-2 rounded bg-white/10">{t.tyreTempRL}°</div>
            <div className="flex-1 p-2 rounded bg-white/10">{t.tyreTempRR}°</div>
          </div>
        </div>
      </div>
    </div>
  );
}
