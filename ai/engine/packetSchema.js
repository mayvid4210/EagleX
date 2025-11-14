// ai/engine/packetSchema.js
// Single place defining the real-time telemetry packet that backend emits.

function makePacket(driverId, telemetry, emotions, biometrics) {
  // telemetry: { speed, x, y, lap, etc }
  // emotions: { stress, stressLabel, focus, focusLabel, aggression, fatigue }
  // biometrics: { heartRate, hrv, reactionTime, adrenaline, fatigue }

  return {
    timestamp: Date.now(),
    driverId,
    telemetry,
    emotions: {
      stress: emotions.stress,
      stressLabel: emotions.stressLabel,
      focus: emotions.focus,
      focusLabel: emotions.focusLabel,
      aggression: emotions.aggression,
      aggressionLabel: emotions.aggressionLabel,
      fatigue: emotions.fatigue
    },
    biometrics: {
      heartRate: biometrics.heartRate,
      hrv: biometrics.hrv,
      reactionTimeMs: biometrics.reactionTime,
      adrenaline: biometrics.adrenaline,
      fatigue: biometrics.fatigue
    }
  };
}

module.exports = { makePacket };
