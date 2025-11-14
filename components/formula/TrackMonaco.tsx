"use client";
import React from "react";

export default function TrackMonaco({ small=false }: { small?: boolean }) {
  const width = small ? 150 : 600;
  const height = small ? 70 : 300;
  return (
    <svg viewBox="0 0 400 200" width={width} height={height} preserveAspectRatio="xMidYMid meet">
      <path d="M60,40 C140,10 260,10 320,40 C360,60 350,120 300,140 C240,170 140,170 80,140 C40,120 30,80 60,40 Z"
        fill="none" stroke="rgba(0,255,255,0.12)" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}
