// utils/socket.js
"use client";

import { io } from "socket.io-client";

// Create socket connection
export const socket = io("http://localhost:5001", {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Debug logs
if (typeof window !== "undefined") {
  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", reason);
  });
}