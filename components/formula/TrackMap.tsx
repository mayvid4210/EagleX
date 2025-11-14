"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Driver } from "./useSocket";

type Props = {
  track: "las-vegas" | "monaco" | "silverstone" | string;
  drivers: Driver[];
  selectedDriver?: Driver | undefined;
  width?: number | string;
  height?: number | string;
};

type Pos = { x: number; y: number; angle: number };

const DRIVER_COLORS = [
  "#00FFFF", "#FFB86B", "#7CFFB2", "#FFD6E0",
  "#C0B6FF", "#FF8B8B", "#8BE9FD", "#F9E79F",
];

export default function TrackMap({ track, drivers, selectedDriver, width = "100%", height = "100%" }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [pathLen, setPathLen] = useState<number>(0);

  // Use a stylized Las Vegas path (placeholder outline). Replace with real SVG as needed.
  const lasVegasPath = "M30,100 C60,20 140,20 180,60 C215,95 300,110 360,80 C380,70 380,140 340,150 C300,160 220,120 160,150 C120,170 70,170 40,140 C20,120 10,105 30,100 Z";

  // compute path length on mount & when svg available
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLen(len);
    // prepare initial positions
    const initial: Record<number, Pos> = {};
    drivers.forEach((d, i) => {
      const pct = normalizeProgress(d.progress);
      const pt = path.getPointAtLength(pct * len);
      const pt2 = path.getPointAtLength((pct * len + 5) % len); // small offset to compute angle
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      initial[d.id] = { x: pt.x, y: pt.y, angle };
    });
    setPositions(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  // update positions when drivers change
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLen(len);

    const next: Record<number, Pos> = {};
    drivers.forEach((d) => {
      // Normalization: assume backend progress is in arbitrary units; normalize to 0..1
      const pct = normalizeProgress(d.progress);
      const targetLen = (pct % 1) * len;
      const pt = path.getPointAtLength(targetLen);
      // small lookahead for angle
      const lookLen = (targetLen + Math.min(10, len * 0.01)) % len;
      const pt2 = path.getPointAtLength(lookLen);
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      next[d.id] = { x: pt.x, y: pt.y, angle };
    });

    // Smoothly tween positions using framer automation below by updating state
    setPositions((prev) => ({ ...prev, ...next }));
  }, [drivers]);

  // normalize progress to [0,1]
  function normalizeProgress(progress: number) {
    // handle both lap% style (0-100) and absolute progress
    // if progress looks like percentage (< 1000), map accordingly.
    if (progress <= 1000) {
      // If it's percentage style (0-100), convert:
      if (progress <= 100) return (progress / 100) % 1;
      // else use 0..1000 normalization
      return (progress % 1000) / 1000;
    }
    // fallback
    return (progress % 1000) / 1000;
  }

  const renderCar = (d: Driver, idx: number) => {
    const pos = positions[d.id] || { x: 0, y: 0, angle: 0 };
    const color = DRIVER_COLORS[idx % DRIVER_COLORS.length];
    const isSelected = selectedDriver && selectedDriver.id === d.id;

    return (
      <motion.g
        key={d.id}
        initial={{ opacity: 0.001, scale: 0.6 }}
        animate={{ opacity: 1, scale: isSelected ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 24 }}
        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
      >
        {/* car group positioned by transform */}
        <motion.g
          style={{ cursor: "pointer" }}
          animate={{
            translateX: pos.x,
            translateY: pos.y,
            rotate: pos.angle,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onMouseEnter={() => {/* optional hover callbacks */}}
        >
          {/* car body (small rectangle) */}
          <rect x={-10} y={-6} width={20} height={12} rx={3} fill={color} stroke="#001" strokeWidth={0.8} opacity={0.98} />
          {/* spoiler */}
          <rect x={-8} y={-10} width={16} height={3} rx={1} fill={shade(color, -12)} opacity={0.95} />
          {/* driver id bubble */}
          <circle cx={8} cy={-8} r={6} fill="#000" opacity={0.5} />
          <text x={8} y={-5} fontSize={6} fill="#fff" textAnchor="middle" dominantBaseline="middle">{d.position}</text>
        </motion.g>

        {/* emotion badge */}
        <motion.text
          x={pos.x + 14}
          y={pos.y - 14}
          fontSize={10}
          fill={isSelected ? "#fff" : "#bfefff"}
          stroke={isSelected ? "rgba(0,0,0,0.25)" : "transparent"}
          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.2)" }}
        >
          {emotionToEmoji(d.emotion)}
        </motion.text>
      </motion.g>
    );
  };

  return (
    <div className="w-full h-full" style={{ width, height }}>
      <svg ref={svgRef} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        <defs>
          <linearGradient id="trackGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#b8ffb0" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* background grid / subtle */}
        <rect width="100%" height="100%" fill="transparent" />

        {/* the track path */}
        <path
          ref={pathRef}
          d={track === "las-vegas" ? lasVegasPath : lasVegasPath}
          fill="none"
          stroke="rgba(0,255,255,0.08)"
          strokeWidth={8}
          strokeLinecap="round"
        />

        {/* inner line for contrast */}
        <path
          d={track === "las-vegas" ? lasVegasPath : lasVegasPath}
          fill="none"
          stroke="rgba(0,255,255,0.14)"
          strokeWidth={2}
          strokeDasharray="6 6"
        />

        {/* placed car icons */}
        <g>
          {drivers.map((d, i) => renderCar(d, i))}
        </g>
      </svg>
    </div>
  );
}

/* simple helper to map emotion to emoji */
function emotionToEmoji(e: string | undefined) {
  if (!e) return "🎯";
  switch (e) {
    case "focused": return "🎯";
    case "stressed": return "😰";
    case "calm": return "😌";
    case "aggressive": return "😤";
    case "confident": return "😎";
    default: return "⚡";
  }
}

/* lighten/darken hex color (small utility) */
function shade(hex: string, percent: number) {
  // hex like "#rrggbb"
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (clamp(R, 0, 255) << 16) +
      (clamp(G, 0, 255) << 8) +
      clamp(B, 0, 255)
    )
      .toString(16)
      .slice(1)
  );
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
