import { useMemo } from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json';
import { magnitudeColor } from './data.js';

const countries = feature(atlas,atlas.objects.countries).features;
const graticule = geoGraticule10();

export default function WorldMap({ events = [], selected = null, onSelect = null, compact = false }) {
  const W = 1000, H = compact ? 370 : 465;
  const projection = useMemo(() => geoNaturalEarth1().translate([W/2,H/2]).scale(compact ? 184 : 191),[compact]);
  const path = useMemo(() => geoPath(projection),[projection]);

  const dots = useMemo(() => {
    return events.slice(0,2500).map(q => {
      const point = projection([q.lng,q.lat]);
      return point ? {...q,x:point[0],y:point[1]} : null;
    }).filter(Boolean);
  },[events,projection]);

  const currentPoint = selected ? projection([selected.lng,selected.lat]) : null;

  return <div className={'world-map ' + (compact ? 'mini-world-map' : '')}>
    <svg viewBox={'0 0 '+W+' '+H} preserveAspectRatio="xMidYMid meet" role="img"
      aria-label={compact ? 'World map showing selected earthquake position' : 'World map displaying recent earthquake epicenters'}>
      <defs>
        <radialGradient id={compact ? 'ocean-mini' : 'ocean-large'}><stop stopColor="#09243d"/><stop offset="1" stopColor="#06111f"/></radialGradient>
        <filter id={compact ? 'quake-halo-mini' : 'quake-halo-large'} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <path d={path({type:'Sphere'})} fill={'url(#'+(compact ? 'ocean-mini':'ocean-large')+')'} stroke="#285c83" strokeWidth="1.3"/>
      <path d={path(graticule)} fill="none" stroke="#154160" strokeWidth=".55" opacity=".7"/>
      {countries.map((land,i) => <path key={i} d={path(land) || ''} fill="#143149" stroke="#235277" strokeWidth=".60" opacity=".86"/>)}
      {dots.map(q => <g key={q.id} className={onSelect ? 'map-dot-action' : ''} onClick={() => onSelect?.(q)}>
        <circle cx={q.x} cy={q.y} r={Math.max(1.6,q.mag*1.05)} fill={magnitudeColor(q.mag)} opacity=".19" filter={'url(#'+(compact ? 'quake-halo-mini':'quake-halo-large')+')'} />
        <circle cx={q.x} cy={q.y} r={compact ? 1.6 : Math.max(1.5,q.mag*.6)} fill={magnitudeColor(q.mag)} opacity=".88"/>
        <title>{'M '+q.mag.toFixed(1)+' — '+q.title}</title>
      </g>)}
      {currentPoint && <g className="map-current">
        <circle cx={currentPoint[0]} cy={currentPoint[1]} r="10" fill="none" stroke="#ebac72" strokeWidth="1.3" opacity=".8"/>
        <circle cx={currentPoint[0]} cy={currentPoint[1]} r="5" fill="#fff4e3" stroke="#f66f53" strokeWidth="2"/>
      </g>}
    </svg>
    {!compact && <div className="map-side-badge"><span className="live-blip" /> WORLDWIDE EARTHQUAKE ACTIVITY</div>}
  </div>;
}
