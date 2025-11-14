// app/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BlueprintHero from "@/components/BlueprintHero";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Page() {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "loading" | "redirecting">("idle");

  // Prevent double-trigger (very common when clicking animated buttons)
  const handleBegin = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("loading");
  }, [phase]);

  // LoadingOverlay triggers this when animation ends
  const handleLoadingFinished = useCallback(() => {
    if (phase !== "loading") return;

    // Cinematic micro-fade before redirect
    setPhase("redirecting");

    // Small timeout gives a clean exit before navigation
    setTimeout(() => {
      router.push("/simulation/choose");
    }, 250); // you can tweak this if needed
  }, [phase, router]);

  return (
    <div className="root blueprint-root overflow-hidden">
      {/* LANDING SCREEN */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.992 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="hero-wrap"
          >
            <BlueprintHero
              imagePath="/blueprint-car.png"
              onBegin={handleBegin}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING SCREEN */}
      <AnimatePresence>
        {phase === "loading" && (
          <LoadingOverlay key="loading" onComplete={handleLoadingFinished} />
        )}
      </AnimatePresence>

      {/* OPTIONAL TINY FADE-TO-BLACK BEFORE REDIRECT */}
      <AnimatePresence>
        {phase === "redirecting" && (
          <motion.div
            key="fadeout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
