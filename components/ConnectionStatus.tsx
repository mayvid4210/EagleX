"use client";

import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) return;
    // when connected
    socket.on("connect", () => {
      if (!socket) return;
      console.log("FRONTEND: Connected:", socket.id);
      setIsConnected(true);
    });

    // when disconnected
    socket.on("disconnect", () => {
      if (!socket) return;
      console.log("FRONTEND: Disconnected");
      setIsConnected(false);
    });

    return () => {
      if (!socket) return;
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="p-3 mt-5 text-center text-lg">
      {isConnected ? (
        <p className="text-green-400 font-semibold">
          🟢 Connected to Server
        </p>
      ) : (
        <p className="text-red-400 font-semibold">
          🔴 Not Connected
        </p>
      )}
    </div>
  );
}
