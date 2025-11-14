// app/page.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BlueprintHero from "@/components/BlueprintHero";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Page() {
  const router = useRouter();   // ✅ FIXED — must be inside component
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  const handleBegin = () => {
    setPhase("loading");        // show loading overlay
  };

  const handleLoadingFinished = () => {
    router.push("/simulation/choose");   // redirect to mode selection page
  };

  return (
    <div className="root blueprint-root">
      {/* HERO (floating car screen) */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hero-wrap"
          >
            <BlueprintHero
              imagePath="/blueprint-car.png"
              onBegin={handleBegin}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {phase === "loading" && (
          <LoadingOverlay
            key="loading"
            onComplete={handleLoadingFinished}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
