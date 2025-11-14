"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ChooseSimulation() {
  const router = useRouter();

  const modes = [
    { title: "Formula Racing", icon: "🏎️", route: "/simulation/formula" },
    { title: "MotoGP", icon: "🏍️", route: "/simulation/motogp" },
    { title: "Drone Arena", icon: "🚁", route: "/simulation/drone" },
    { title: "Supply Chain", icon: "📦", route: "/simulation/supply" },
    { title: "Traffic System", icon: "🚦", route: "/simulation/traffic" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 blueprint-root overflow-hidden">

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold text-cyan-300 drop-shadow-lg">
          Select Simulation Mode
        </h1>
        <p className="text-cyan-400/60 mt-2 tracking-wide">
          Choose your environment to initiate the EagleX simulation
        </p>
      </motion.div>

      {/* Futuristic Glow Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cyan-500/20 blur-3xl -z-10"
      />

      {/* Button Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {modes.map((mode) => (
          <motion.button
            key={mode.title}
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(0,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(mode.route)}
            className="
              p-8 w-[240px] h-[200px]
              flex flex-col items-center justify-center gap-4
              rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-cyan-300/30
              hover:bg-white/10
              transition-all
              text-cyan-200 text-xl font-semibold tracking-wide
            "
          >
            <div className="text-5xl">{mode.icon}</div>
            {mode.title}
          </motion.button>
        ))}
      </motion.div>

    </div>
  );
}
