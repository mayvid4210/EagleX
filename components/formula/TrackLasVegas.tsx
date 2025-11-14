"use client";
import React from "react";

export default function TrackLasVegas({ small=false }: { small?: boolean }) {
  // simplified stylized track outline — replace with real SVG later
  const width = small ? 150 : 600;
  const height = small ? 70 : 300;
  return (
    <svg viewBox="0 0 400 200" width={width} height={height} preserveAspectRatio="xMidYMid meet">
      <path d="M30,100 C60,20 140,20 180,60 C215,95 300,110 360,80 C380,70 380,140 340,150 C300,160 220,120 160,150 C120,170 70,170 40,140 C20,120 10,105 30,100 Z"
        fill="none" stroke="rgba(0,255,255,0.12)" strokeWidth="6" strokeLinecap="round" />
      <g transform="translate(0,0)">
        <circle cx="200" cy="100" r="6" fill="rgba(0,255,255,0.6)"/>
      </g>
    </svg>
  );
}
