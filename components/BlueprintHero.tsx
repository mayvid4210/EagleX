// components/BlueprintHero.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  imagePath?: string;
  onBegin?: () => void;
};

export default function BlueprintHero({ imagePath = "/blueprint-car.png", onBegin }: Props) {
  return (
    <div className="blueprint-stage">
      {/* Center Title */}
      <motion.div
        className="bp-title-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bp-title">EagleX</div>
        <div className="bp-subtitle">Race Mobility Simulator</div>
      </motion.div>

      {/* Blueprint Car Container */}
      <div className="blueprint-viewport">
        <div className="blueprint-frame">

          {/* Glow behind car */}
          <div className="bp-glow-behind"></div>

          {/* Scanline */}
          <motion.div
            className="bp-scanline"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
          />

          {/* Car Image (float + rotate) */}
          <motion.img
            src={imagePath}
            alt="Blueprint Car"
            className="blueprint-image"
            initial={{ opacity: 0, y: 20, rotateY: 5 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              rotateY: [3, -3, 3],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            draggable={false}
          />

          {/* Corner Markers */}
          <div className="bp-corner tl"></div>
          <div className="bp-corner tr"></div>
          <div className="bp-corner bl"></div>
          <div className="bp-corner br"></div>

        </div>
      </div>

      {/* CTA */}
      <motion.button
        className="bp-cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBegin}
      >
        BEGIN SIMULATION
      </motion.button>

      {/* Footer */}
      <div className="bp-footer-center">
        Prototype • Engineering Blueprint • EagleX
      </div>
    </div>
  );
}
