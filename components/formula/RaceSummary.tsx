"use client";
import React from "react";

export default function RaceSummary({ summary }: { summary: any[] | null }) {
  if (!summary)
    return (
      <div className="p-4 rounded-2xl bg-white/5 border border-cyan-300/20">
        <div className="text-cyan-300/70">Race summary will appear here after finish</div>
      </div>
    );

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-cyan-300/20">
      <h3 className="font-semibold text-lg mb-3">Race Summary</h3>

      <div className="space-y-3 text-cyan-200/90">
        {summary.map((d) => (
          <div key={d.id} className="p-3 rounded-xl bg-white/5 border border-cyan-300/10">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">{d.name}</div>
                <div className="text-cyan-300/70 text-sm">Position: {d.finalPosition}</div>
              </div>

              <div className="text-right text-sm">
                <div>Top Speed: {d.topSpeed} km/h</div>
                <div>Reaction: {d.averageReactionTime}s</div>
                <div>Emotion: {d.dominantEmotion}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
