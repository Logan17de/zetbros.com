export const USGS_FEEDS = {
  '1H': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
  '24H': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  '7D': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson',
  '30D': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson',
};

export function normalizeEarthquakes(json) {
  if (!Array.isArray(json?.features)) throw new Error('Unexpected earthquake feed format');
  return json.features.map(feature => {
    const p = feature.properties || {};
    const coords = feature.geometry?.coordinates || [];
    return {
      id: String(feature.id || p.code || ''),
      title: p.place || 'Unknown location',
      mag: typeof p.mag === 'number' ? p.mag : null,
      lat: Number(coords[1]),
      lng: Number(coords[0]),
      depth: Number(coords[2]),
      time: Number(p.time),
      url: typeof p.url === 'string' && p.url.startsWith('https://earthquake.usgs.gov/') ? p.url : null,
      tsunami: Boolean(p.tsunami),
      felt: Number(p.felt) || 0,
      status: p.status || 'reviewed'
    };
  }).filter(d => d.id && Number.isFinite(d.lat) && Number.isFinite(d.lng) && Number.isFinite(d.time) && d.mag !== null)
    .sort((a, b) => b.time - a.time);
}

export function magnitudeColor(mag) {
  if (mag >= 7) return '#fa3654';
  if (mag >= 6) return '#ff7b42';
  if (mag >= 5) return '#f3b94d';
  if (mag >= 4) return '#b0df45';
  if (mag >= 3) return '#30cbd1';
  return '#8c72e4';
}

export function magnitudeLabel(mag) {
  if (mag >= 6) return 'Severe';
  if (mag >= 5) return 'Strong';
  if (mag >= 4) return 'Moderate';
  if (mag >= 2.5) return 'Light';
  return 'Minor';
}

export function formatMagnitude(mag) { return Number(mag).toFixed(1); }

export function ago(timestamp, now = Date.now()) {
  const minutes = Math.max(0, Math.floor((now - timestamp) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return minutes + 'm ago';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  return Math.floor(hours / 24) + 'd ago';
}

export function coordinates(lat, lng) {
  return Math.abs(lat).toFixed(2) + '° ' + (lat >= 0 ? 'N' : 'S') + ', ' +
    Math.abs(lng).toFixed(2) + '° ' + (lng >= 0 ? 'E' : 'W');
}

export function timelineData(events, hours = 24, now = Date.now()) {
  const bins = Array(30).fill(0);
  const range = hours * 3600000;
  events.forEach(e => {
    const position = (e.time - (now - range)) / range;
    if (position >= 0 && position <= 1) {
      const i = Math.min(bins.length - 1, Math.floor(position * bins.length));
      bins[i] += 1;
    }
  });
  return bins;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}
