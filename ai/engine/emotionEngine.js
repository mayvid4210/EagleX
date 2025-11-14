// ai/engine/emotionEngine.js
// Simple emotion engine: inputs telemetry, outputs stress/focus/aggression/fatigue (0..1)

function clamp01(v) {
  if (!isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

/**
 * computeEmotions
 * inputs:
 *   telemetry: {
 *     speed: number (km/h),
 *     slip: number (0..1), // wheel slip / instability
 *     gforce: number, // g units (0..6)
 *     opponentsNearby: number (0..1),
 *     mistakes: number (0..1)
 *   }
 * returns:
 *   { stress, focus, aggression, fatigue } values 0..1 and labels
 */
function computeEmotions(telemetry) {
  const { speed = 0, slip = 0, gforce = 0, opponentsNearby = 0, mistakes = 0 } = telemetry;

  // 1) stress: more speed, more slip, more opponents, more mistakes => higher stress
  let stressRaw =
    0.35 * (speed / 320) +    // speed factor, normalized (0..1)
    0.30 * slip +             // traction instability
    0.20 * opponentsNearby +  // racing pressure
    0.15 * mistakes;          // driver error spikes
  const stress = clamp01(stressRaw);

  // 2) arousal: quick proxy for physiological activation (speed + gforce)
  let arousal = clamp01(0.2 + 0.45 * (speed / 320) + 0.35 * clamp01(gforce / 6));

  // 3) focus: best when arousal is near optimal (approx 0.6). use inverted-U (Yerkes-Dodson)
  const opt = 0.6;
  const focusRaw = 1 - Math.abs(arousal - opt) * 1.6; // tune factor visually
  let focus = clamp01(focusRaw);
  // reduce focus a bit when slip or mistakes happen
  focus = clamp01(focus - 0.15 * slip - 0.1 * mistakes);

  // 4) aggression: increases with opponents nearby and high speed and mistakes (risk-taking)
  let aggressionRaw = 0.25 * (speed / 320) + 0.5 * opponentsNearby + 0.25 * mistakes;
  let aggression = clamp01(aggressionRaw);

  // 5) fatigue: simple integrator placeholder (should be updated over time by biometricSim)
  // here we give a small baseline that grows with time-based stress proxy:
  let fatigue = clamp01(0.05 + 0.3 * stress + 0.05 * (gforce / 6));

  // Map to labels
  const focusLabel = focus > 0.75 ? "Peak Focus" : focus > 0.5 ? "Focused" : focus > 0.3 ? "Distracted" : "Low Focus";
  const stressLabel = stress > 0.75 ? "High Stress" : stress > 0.4 ? "Moderate Stress" : "Calm";
  const aggressionLabel = aggression > 0.7 ? "Very Aggressive" : aggression > 0.45 ? "Aggressive" : "Controlled";

  return {
    stress,
    stressLabel,
    focus,
    focusLabel,
    aggression,
    aggressionLabel,
    fatigue
  };
}

module.exports = { computeEmotions, clamp01 };
