"use client";

import { useState } from "react";
import Draggable from "react-draggable";
import { X, Move, Pin, PinOff } from "lucide-react";

export default function AddonWidget({
  title,
  children,
  defaultPos = { x: 200, y: 200 },
  onClose,
}: {
  title: string;
  children: any;
  defaultPos?: { x: number; y: number };
  onClose: () => void;
}) {
  const [locked, setLocked] = useState(false);

  return (
    <Draggable disabled={locked} defaultPosition={defaultPos}>
      <div
        className="
          fixed z-50 p-3 w-72 
          rounded-2xl shadow-xl 
          bg-white/10 backdrop-blur-xl
          border border-cyan-300/30 text-cyan-100
        "
        style={{ userSelect: "none" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold flex items-center gap-2">
            <Move size={16} />
            {title}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocked(!locked)}
              className="p-1 hover:bg-white/10 rounded"
            >
              {locked ? <Pin size={16} /> : <PinOff size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-1 hover:bg-red-400/30 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-h-60 overflow-auto">{children}</div>
      </div>
    </Draggable>
  );
}
