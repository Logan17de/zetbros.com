// These are deliberately small, *illustrative* epicenter pulses, NOT areas
// of shaking or predicted propagation. The data feed does not contain
// station observations or wave arrival times.
const MIN_PULSE_MAG = 4.0;

export function waveRadiusForMagnitude(magnitude) {
  if (!Number.isFinite(magnitude) || magnitude < MIN_PULSE_MAG) return 0;
  return Math.min(9, 1.13 * Math.pow(1.61, magnitude - MIN_PULSE_MAG));
}

export function waveSpeedForMagnitude(magnitude) {
  const radius = waveRadiusForMagnitude(magnitude);
  return radius === 0 ? 0 : radius / (magnitude >= 6 ? 4.4 : 4.9);
}

export function waveRepeatForMagnitude(magnitude) {
  return magnitude >= 6 ? 6600 : magnitude >= 5 ? 7900 : 9300;
}

export function angularDistanceDegrees(a, b) {
  const radians = Math.PI / 180;
  const aLat = a.lat * radians;
  const bLat = b.lat * radians;
  const latDelta = (b.lat - a.lat) * radians;
  const lngDelta = (b.lng - a.lng) * radians;
  const h = Math.sin(latDelta / 2) ** 2
    + Math.cos(aLat) * Math.cos(bLat) * Math.sin(lngDelta / 2) ** 2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(h))) / radians;
}

export function selectWaveEvents(events, now = Date.now(), selectedId = null) {
  if (!Array.isArray(events)) return [];
  // Older epicenters remain visible as dots. Pulses are only recent, clearly
  // localized illustrations; less significant events do not create rings.
  const eligible = events.filter(event => {
    if (!Number.isFinite(event.mag) || event.mag < MIN_PULSE_MAG) return false;
    if (!Number.isFinite(event.lat) || !Number.isFinite(event.lng)) return false;
    const age = now - event.time;
    const horizon = event.mag >= 6 ? 24 : event.mag >= 5 ? 24 : 12;
    const fresh = Number.isFinite(age) && age >= -300000 && age <= horizon * 3600000;
    return fresh || event.id === selectedId;
  });
  eligible.sort((a,b) => (a.id === selectedId ? -1 : 0)
    - (b.id === selectedId ? -1 : 0) || b.mag - a.mag);

  const visible = [];
  for (const candidate of eligible) {
    const radius = waveRadiusForMagnitude(candidate.mag);
    // Suppress overlapping halos from nearby epicenters, not their dots.
    // This prevents a tight swarm from falsely looking like widespread shaking.
    if (visible.some(existing =>
      angularDistanceDegrees(existing, candidate)
      < Math.max(1.8, .75 * (radius + waveRadiusForMagnitude(existing.mag))))) continue;
    visible.push(candidate);
    if (visible.length >= 32) break;
  }
  return visible;
}
