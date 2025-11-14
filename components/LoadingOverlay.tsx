// components/LoadingOverlay.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onComplete?: () => void;
};

const messages = [
  "Loading Modules…",
  "Calibrating Drive Systems…",
  "Initializing Telemetry…",
  "Applying Blueprint Parameters…",
  "Finalizing Environment…",
];

export default function LoadingOverlay({ onComplete }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 900);

    // simulate loading duration (adjust as needed)
    const finishTimeout = setTimeout(() => {
      clearInterval(interval);
      onComplete?.();
    }, 5000); // 5 seconds total loading simulation

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-panel">
        <div className="loading-title">Simulation Loading</div>

        <div className="loading-msg-area" aria-live="polite">
          <div className="loading-msg">{messages[index]}</div>
          <div className="loading-bar-wrap">
            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{ width: `${((index + 1) / messages.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
