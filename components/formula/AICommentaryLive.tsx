"use client";
import React, { useEffect, useState } from "react";

export default function AICommentaryLive({ source } : { source?: string }) {
  const [lines, setLines] = useState<string[]>(["AI ready..."]);
  useEffect(()=> {
    // placeholder: realistically you'll push messages into this via sockets or an API stream
    const id = setInterval(()=> {
      setLines(l => {
        const next = [...l, `Commentary ${l.length+1}: wheel-to-wheel action`];
        return next.slice(-8);
      });
    }, 6000);
    return ()=> clearInterval(id);
  }, []);
  return (
    <div className="p-3 rounded-2xl bg-white/4 h-36 overflow-auto">
      <h5 className="font-semibold mb-2">AI Commentary</h5>
      <div className="text-sm text-cyan-300/70 space-y-1">
        {lines.map((ln,i) => <div key={i}>{ln}</div>)}
      </div>
    </div>
  );
}
