"use client";

import { useEffect } from "react";
import { socket } from "@/utils/socket";

export default function ConnectionTest() {
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      if (!socket) return;
      console.log("FRONTEND: Connected to server with ID:", socket.id);
      socket.emit("hello-from-client", "Hi server, this is the client!");
    });

    socket.on("server-response", (msg) => {
      if (!socket) return;
      console.log("FRONTEND RECEIVED:", msg);
    });

    return () => {
      if (!socket) return;
      socket.off("connect");
      socket.off("server-response");
    };
  }, []);

  return <p className="text-green-400">Socket test component loaded.</p>;
}
