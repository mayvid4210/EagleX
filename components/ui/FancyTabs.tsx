"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FancyTabs({
  tabs,
  children,
}: {
  tabs: string[];
  children: (active: string) => React.ReactNode;
}) {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="w-full">
      {/* TAB HEADER */}
      <div className="flex gap-6 border-b border-cyan-300/20 mb-6 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-3 text-lg transition ${
              active === tab
                ? "text-cyan-200"
                : "text-cyan-300/50 hover:text-cyan-200/70"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* ANIMATED UNDERLINE */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-cyan-400"
          layoutId="underline"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(tabs.indexOf(active) * 100) / tabs.length}%`,
          }}
        />
      </div>

      {/* TAB CONTENT */}
      <div>{children(active)}</div>
    </div>
  );
}
