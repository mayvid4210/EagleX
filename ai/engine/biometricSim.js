// ai/engine/biometricSim.js
// Simulates heart rate (HR), HR variability (HRV proxy), reaction time, adrenaline spikes.
// This module exposes a simple stateful driver simulator object you can run every tick.

const { clamp01 } = require("./emotionEngine");

function defaultDriverState() {
  return {
    hr: 70,          // current heart rate (bpm)
    hrv: 50,         // HRV proxy ms
    fatigueAccum: 0, // internal fatigue accumulation 0..1
    lastAdrenalineAt: 0 // timestamp ms of last adrenaline event
  };
}

/**
 * updateBiometrics(driverState, telemetry, dtMs)
 * - driverState: state object returned from defaultDriverState()
 * - telemetry: { speed, gforce, stress, focus }
 * - dtMs: milliseconds elapsed since last update
 *
 * returns updated state plus output metrics { heartRate, hrv, reactionTime, adrenaline }
 */
function updateBiometrics(state, telemetry, dtMs = 1000) {
  const now = Date.now();
  const { speed = 0, gforce = 0, stress = 0, focus = 0 } = telemetry;

  // 1) Heart Rate target: baseline + speed factor + stress factor + gforce factor
  const baseline = 60; // relaxed baseline
  const speedHR = (speed / 320) * 80; // up to +80 bpm at very high speed
  const stressHR = stress * 45;       // stress adds bpm
  const gforceHR = clamp01(gforce / 6) * 18; // cornering effect

  const targetHR = baseline + speedHR + stressHR + gforceHR;

  // Smooth the HR
  const smoothing = 0.08; // small number => smooth slower
  state.hr += (targetHR - state.hr) * smoothing;

  // 2) HRV: inversely related to stress; lower HRV -> more stress
  const targetHRV = clamp01(1 - stress) * 80 + 20; // HRV ms ~ 20..100
  state.hrv += (targetHRV - state.hrv) * 0.05;

  // 3) Fatigue accumulates slowly by stress and cabin factors (we'll use stress)
  const fatigueGainPerMs = 0.00001; // small
  state.fatigueAccum = clamp01(state.fatigueAccum + stress * fatigueGainPerMs * dtMs);

  // 4) Reaction time: Yerkes-Dodson inspired curve
  // best RT near medium stress ~0.55; slower when too calm or too stressed
  const optimal = 0.55;
  const baseRT = 0.09; // 90 ms best
  const worstRT = 0.28; // 280 ms worst
  // inverted-U factor (0..1), where 1 at optimal
  const perfFactor = 1 - Math.abs(stress - optimal) * 1.8;
  const perfClamped = clamp01(perfFactor);
  const reactionTime = worstRT - perfClamped * (worstRT - baseRT);

  // 5) Adrenaline spikes: random events when stress high or gforce high
  let adrenaline = 0;
  if (stress > 0.7 && Math.random() < 0.08) {
    adrenaline = 0.6 + Math.random() * 0.4;
    state.lastAdrenalineAt = now;
  } else if (gforce > 3 && Math.random() < 0.04) {
    adrenaline = 0.4 + Math.random() * 0.3;
    state.lastAdrenalineAt = now;
  } else {
    // small decay if recently had adrenaline
    const since = (now - (state.lastAdrenalineAt || 0)) / 1000;
    if (since < 6) adrenaline = Math.max(0, 0.5 - since * 0.06);
  }

  // Adrenaline temporarily raises hr
  state.hr += adrenaline * 12;

  // final outputs
  return {
    state,
    heartRate: Math.round(state.hr),
    hrv: Math.round(state.hrv),
    reactionTime: Math.round(reactionTime * 1000), // ms
    adrenaline,
    fatigue: state.fatigueAccum
  };
}

module.exports = { defaultDriverState, updateBiometrics };
