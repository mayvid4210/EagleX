// ai/engine/runTest.js
// Run a simulated driver and print packets every second.
// Usage: node ai/engine/runTest.js

const { computeEmotions } = require("./emotionEngine");
const { defaultDriverState, updateBiometrics } = require("./biometricSim");
const { makePacket } = require("./packetSchema");

let driverState = defaultDriverState();
let tick = 0;

// Simulated telemetry generator (makes telemetry change to mimic real racing)
function fakeTelemetry(tick) {
  // tick increases 0,1,2...
  // Create a lap-based pattern: speed rises on straight, drops on corners
  const baseSpeed = 220 + 30 * Math.sin(tick / 6); // 190..250-ish
  const cornering = Math.max(0, Math.sin((tick + 1) / 3)); // 0..1
  const slip = 0.03 + 0.35 * cornering * Math.random(); // more slip in corners
  const gforce = 1 + 3 * cornering; // 1..4 g
  const opponentsNearby = Math.random() < 0.25 ? Math.random() : 0; // occasional pressure
  const mistakes = Math.random() < 0.05 ? Math.random() : 0; // rare mistakes

  return {
    speed: Math.round(baseSpeed + (Math.random() * 10 - 5)),
    slip: clamp01(slip),
    gforce: Math.round(gforce * 10) / 10,
    opponentsNearby: clamp01(opponentsNearby),
    mistakes: clamp01(mistakes),
    lap: Math.floor(tick / 12) + 1
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// Run loop
console.log("Starting simulated driver run. Ctrl+C to stop.");
setInterval(() => {
  tick++;
  const telemetry = fakeTelemetry(tick);
  const emotions = computeEmotions(telemetry);
  const biometricsResult = updateBiometrics(driverState, {
    speed: telemetry.speed,
    gforce: telemetry.gforce,
    stress: emotions.stress,
    focus: emotions.focus
  }, 1000);

  const packet = makePacket("driver_d_demo", telemetry, emotions, biometricsResult);
  console.log(JSON.stringify(packet, null, 2));
}, 1000);
