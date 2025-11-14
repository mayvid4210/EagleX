"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type Driver = {
  id: number;
  name: string;
  position: number;
  speed: number;
  progress: number;
  emotion: string;
  telemetry: {
    gear: number;
    rpm: number;
    ers: number;
    engineTemp: number;
    tyreTempFL: number;
    tyreTempFR: number;
    tyreTempRL: number;
    tyreTempRR: number;
    brakeTemp: number;
  };
};

export default function useSocket(url = "") {
  const socketRef = useRef<Socket | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [summary, setSummary] = useState<any[] | null>(null);

  useEffect(() => {
    const socket = io(url || window.location.origin);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // MAIN LIVE FEED
    socket.on("race-update", (payload: Driver[]) => {
      setDrivers(payload);
    });

    // END OF RACE
    socket.on("race-summary", (payload: any[]) => {
      setSummary(payload);
    });

    socket.on("driver-update", (driver: Driver) => {
      setDrivers(prev => {
        const idx = prev.findIndex(d => d.id === driver.id);
        if (idx === -1) return [...prev, driver];
        const updated = [...prev];
        updated[idx] = driver;
        return updated;
      });
    });

    socket.on("mode-confirmed", (msg) => {
      console.log("Mode confirmed:", msg);
    });

    return () => socket.disconnect();
  }, [url]);

  const emitSelectRace = (mode: string) => {
    socketRef.current?.emit("select-race", mode);
  };

  return {
    socket: socketRef.current,
    drivers,
    summary,
    emitSelectRace,
  };
}
