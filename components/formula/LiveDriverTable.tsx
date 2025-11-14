"use client";
import React from "react";
import { motion } from "framer-motion";
import { Driver } from "./useSocket";

export default function LiveDriverTable({
  drivers,
  onSelect
}: {
  drivers: Driver[];
  onSelect: (id: number) => void;
}) {
  const sorted = [...drivers].sort((a, b) => a.position - b.position);

  const emoji = (e: string) => {
    switch (e) {
      case "focused": return "🎯";
      case "calm": return "😌";
      case "aggressive": return "😤";
      case "stressed": return "😰";
      case "confident": return "😎";
      default: return "⚡";
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-cyan-300/20">
      <h3 className="font-semibold text-lg mb-3">Driver Standings</h3>

      <table className="w-full text-left">
        <thead className="text-cyan-300/70 text-sm">
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th className="text-right">Speed</th>
            <th className="text-right">Progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((d) => (
            <motion.tr
              key={d.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="cursor-pointer text-cyan-200/90"
              onClick={() => onSelect(d.id)}
            >
              <td className="py-2">{d.position}</td>

              <td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center">
                    {d.name[0]}
                  </div>
                  {d.name}
                </div>
              </td>

              <td className="text-right">{Math.round(d.speed)} km/h</td>
              <td className="text-right">
                {(d.progress % 100).toFixed(1)}%
              </td>

              <td className="text-right">{emoji(d.emotion)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
