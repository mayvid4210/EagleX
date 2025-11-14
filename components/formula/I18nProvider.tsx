"use client";
import React, { createContext, useContext, useState } from "react";

const en = {
  chooseTrack: "Choose Track",
  startRace: "Start Race",
  telemetry: "Telemetry",
};

const fr = {
  chooseTrack: "Choisir le circuit",
  startRace: "Démarrer la course",
  telemetry: "Télémétrie",
};

const Catalogs: Record<string, any> = { en, fr };

const I18nContext = createContext<any>({ t: (k:string)=>k, locale: "en", setLocale: (l:string)=>{} });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("en");
  const t = (k:string) => Catalogs[locale][k] ?? k;
  return <I18nContext.Provider value={{ t, locale, setLocale }}>{children}</I18nContext.Provider>;
}

export function useT() { return useContext(I18nContext); }
