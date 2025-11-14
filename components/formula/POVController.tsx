"use client";
import React from "react";

export default function POVController({ pov, onChange }: { pov: string; onChange: (p:string)=>void }) {
  const modes = ["1st", "2nd", "3rd"];
  return (
    <div className="p-2 rounded-2xl bg-white/4 inline-flex gap-2">
      {modes.map(m => (
        <button
          key={m}
          className={`px-3 py-1 rounded ${pov===m ? "bg-cyan-600/30" : "bg-white/5"}`}
          onClick={()=>onChange(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
