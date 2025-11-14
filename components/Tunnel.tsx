// components/Tunnel.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  speed?: number;
  warp?: boolean;
};

export default function Tunnel({ speed = 1, warp = false }: Props) {
  const lines = Array.from({ length: 24 }, (_, i) => (
    <div
      key={i}
      className="speed-line"
      style={{ transform: `rotate(${(i / 24) * 360}deg)` }}
    />
  ));

  return (
    <div className="tunnel" aria-hidden>
      <div className="tunnel-gradient" />
      <motion.div
        className="tunnel-lines"
        data-speed={speed}
        animate={warp ? { filter: ["blur(2px)", "blur(6px)", "blur(1px)"] } : {}}
        transition={{ duration: warp ? 0.8 : 3, ease: "easeInOut", repeat: 0 }}
      >
        {lines}
      </motion.div>
      <div className="tunnel-vignette" />
      {/* fast streak layer for warp effect */}
      <motion.div
        className="tunnel-streaks"
        initial={{ opacity: 0 }}
        animate={warp ? { opacity: 1 } : { opacity: 0.14 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
