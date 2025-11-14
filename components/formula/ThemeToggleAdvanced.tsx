"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggleAdvanced() {
  const [mode, setMode] = useState<"dark"|"light">("dark");
  useEffect(()=> {
    const el = document.documentElement;
    if (mode === "dark") el.classList.add("theme-dark"), el.classList.remove("theme-light");
    else el.classList.add("theme-light"), el.classList.remove("theme-dark");
  }, [mode]);
  return (
    <button className="px-3 py-1 rounded bg-white/5" onClick={()=>setMode(m => m==="dark"?"light":"dark")}>
      {mode === "dark" ? "Light UI" : "Dark UI"}
    </button>
  );
}
