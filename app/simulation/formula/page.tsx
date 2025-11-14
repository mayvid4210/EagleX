"use client";

import { motion } from "framer-motion";

export default function FormulaRacing() {
  return (
    <div className="min-h-screen blueprint-root px-6 py-10 text-cyan-200">
      
      {/* PAGE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">Formula Racing Simulator</h1>
        <p className="text-cyan-400/70 mt-2 tracking-wide">
          High-precision vehicle telemetry & aero-dynamic analysis
        </p>
      </motion.div>

      {/* BLUEPRINT BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cyan-500/20 blur-3xl -z-10"
      />

      {/*  GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* Speed Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">Speed</h2>
          <p className="text-cyan-300/80">Current velocity: <span className="text-cyan-200 font-bold">312 km/h</span></p>
          <p className="text-cyan-300/40 mt-1 text-sm">Aero-optimized DRS enabled</p>
        </motion.div>

        {/* Engine Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">Engine Temp</h2>
          <p className="text-cyan-300/80">Temperature: <span className="text-cyan-200 font-bold">732°C</span></p>
          <p className="text-cyan-300/40 mt-1 text-sm">MGU-H recovering energy</p>
        </motion.div>

        {/* Tire Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">Tire Wear</h2>
          <p className="text-cyan-300/80">Front Left: <span className="text-cyan-200 font-bold">42%</span></p>
          <p className="text-cyan-300/80">Front Right: <span className="text-cyan-200 font-bold">38%</span></p>
          <p className="text-cyan-300/80">Rear Tires: <span className="text-cyan-200 font-bold">33%</span></p>
        </motion.div>

        {/* Suspension Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">Suspension</h2>
          <p className="text-cyan-300/80">Downforce: <span className="text-cyan-200 font-bold">82%</span></p>
          <p className="text-cyan-300/40 mt-1 text-sm">Dynamic ride height active</p>
        </motion.div>

        {/* Telemetry Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">Telemetry Feed</h2>
          <p className="text-cyan-300/80">Live position tracking online</p>
          <p className="text-cyan-300/40 mt-1 text-sm">Updating every 20ms</p>
        </motion.div>

        {/* AI Driver Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="
            p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-cyan-300/30
            shadow-lg shadow-cyan-500/10
          "
        >
          <h2 className="text-2xl font-semibold mb-2">AI Driver Status</h2>
          <p className="text-cyan-300/80">Driver Profile: <span className="text-cyan-200 font-bold">Aero-Max</span></p>
          <p className="text-cyan-300/40 mt-1 text-sm">Adaptive racing line enabled</p>
        </motion.div>

      </div>
    </div>
  );
}
