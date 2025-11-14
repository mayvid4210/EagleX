"use client";

import { useState } from "react";
import AddonWidget from "./AddonWidget";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddonDock({ addons }: { addons: any }) {
  const [active, setActive] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function spawnWidget(key: string) {
    setMenuOpen(false); // auto-close menu

    setActive((prev) => {
      // If widget already exists, move it to end (most recent)
      if (prev.includes(key)) {
        return [...prev.filter((w) => w !== key), key];
      }

      // Limit to 3 widgets
      if (prev.length >= 3) {
        const [, ...rest] = prev; // drop the oldest
        return [...rest, key];
      }

      return [...prev, key];
    });
  }

  function removeWidget(key: string) {
    setActive((prev) => prev.filter((w) => w !== key));
  }

  return (
    <>
      {/* Floating "+" BUTTON */}
      <button
        onClick={toggleMenu}
        className="
          fixed bottom-6 right-6 z-40
          bg-cyan-500/60 hover:bg-cyan-400/80
          p-4 rounded-full shadow-xl 
          backdrop-blur-xl border border-cyan-300/40
        "
      >
        <Plus size={28} />
      </button>

      {/* MENU THAT SLIDES UP/DOWN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="
              fixed bottom-20 right-6 z-40
              p-4 rounded-xl bg-white/10 backdrop-blur-xl
              border border-cyan-300/20 
              flex flex-col gap-2 w-48
            "
          >
            {Object.keys(addons).map((key) => (
              <button
                key={key}
                onClick={() => spawnWidget(key)}
                className="
                  px-3 py-2 rounded 
                  bg-white/5 hover:bg-white/15 
                  text-left text-cyan-100
                "
              >
                {key}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WIDGETS */}
      {active.map((key, index) => (
        <AddonWidget
          key={key}
          title={key}
          defaultPos={{ x: 200 + index * 40, y: 200 + index * 40 }}
          onClose={() => removeWidget(key)}
        >
          {addons[key]}
        </AddonWidget>
      ))}
    </>
  );
}
