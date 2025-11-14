"use client";

import React from "react";
import TrackLasVegas from "./TrackLasVegas";
import TrackMonaco from "./TrackMonaco";

export default function TrackSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (t: "las-vegas" | "monaco" | "silverstone") => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onSelect("las-vegas")}
        className={`px-3 py-1 rounded ${selected === "las-vegas" ? "bg-cyan-600/30" : "bg-white/5"}`}
      >
        Las Vegas
      </button>
      <button
        onClick={() => onSelect("monaco")}
        className={`px-3 py-1 rounded ${selected === "monaco" ? "bg-cyan-600/30" : "bg-white/5"}`}
      >
        Monaco
      </button>
      <button
        onClick={() => onSelect("silverstone")}
        className={`px-3 py-1 rounded ${selected === "silverstone" ? "bg-cyan-600/30" : "bg-white/5"}`}
      >
        Silverstone
      </button>
    </div>
  );
}
