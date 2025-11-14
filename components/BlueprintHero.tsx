// components/BlueprintHero.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  imagePath?: string;
  onBegin?: () => void;
};

export default function BlueprintHero({
  imagePath = "/blueprint-car.png",
  onBegin,
}: Props) {
  // Car animation — float + yaw + z-pulse
  const carAnim = {
    animate: {
      y: [0, -16, 0],
      rotateY: [4, -4, 4],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 6.2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <div
      className="blueprint-stage w-full flex flex-col items-center"
      aria-hidden={false}
    >
      {/* CENTER TITLE */}
      <div className="bp-title-center" role="heading" aria-level={1}>
        <div className="bp-title">EagleX</div>
        <div className="bp-subtitle">Race Mobility Simulator</div>
      </div>

      {/* BLUEPRINT DISPLAY */}
      <div className="blueprint-viewport">
        <div className="blueprint-frame">
          <div className="bp-glow-behind" />

          {/* scanline */}
          <motion.div
            className="bp-scanline"
            initial={{ y: "-120%" }}
            animate={{ y: "220%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
            aria-hidden
          />

          {/* floating car */}
          <motion.img
            src={imagePath}
            alt="Blueprint car"
            className="blueprint-image"
            {...carAnim}
            draggable={false}
            loading="eager"
          />

          {/* corners */}
          <div className="bp-corner tl" />
          <div className="bp-corner tr" />
          <div className="bp-corner bl" />
          <div className="bp-corner br" />

          {/* blueprint grid */}
          <div className="bp-grid-overlay" />
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* CTA BUTTON (WRAPPED — FIXES LAYOUT SHIFT) */}
      {/* ---------------------------------------------------------- */}

      <div className="w-full flex justify-center mt-8">
        <div className="w-[260px] flex justify-center">
          <motion.button
            className="bp-cta"
            whileHover={{ scale: 1.12, boxShadow: "0 0 24px rgba(0,255,255,0.4)" }}
            whileTap={{ scale: 0.92 }}
            onClick={onBegin}
            aria-label="Begin Simulation"
          >
            <span className="bp-cta-inner">BEGIN SIMULATION</span>
            <span className="bp-cta-glow" aria-hidden />
          </motion.button>
        </div>
      </div>

      {/* footer */}
      <div className="bp-footer-center mt-6">
        Prototype • Engineering Blueprint • EagleX
      </div>
    </div>
  );
}
