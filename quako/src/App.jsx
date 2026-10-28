import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, ArrowUpRight, BarChart3, Check, ChevronDown,
  CircleHelp, Clock3, Crosshair, ExternalLink, Globe2, Info, Layers3,
  List, Map, MapPin, Menu, Minus, Plus, Radio, RefreshCw,
  RotateCcw, Search, Settings2, SlidersHorizontal, Waves, X
} from 'lucide-react';
import GlobeView from './GlobeView.jsx';
import WorldMap from './WorldMap.jsx';
import {
  USGS_FEEDS, ago, coordinates, formatMagnitude,
  magnitudeColor, magnitudeLabel, normalizeEarthquakes, timelineData
} from './data.js';

const navItems = [
  { id: 'live', label: 'Live', icon: Radio },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'list', label: 'List', icon: List },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

const legend = [
  {label:'7.0+',color:'#fa3654'},
  {label:'6.0 – 6.9',color:'#ff7b42'},
  {label:'5.0 – 5.9',color:'#f3b94d'},
  {label:'4.0 – 4.9',color:'#b0df45'},
  {label:'3.0 – 3.9',color:'#30cbd1'},
  {label:'< 3.0',color:'#8c72e4'},
];
function displayLegendColor(mag) {
  if (mag >= 7) return legend[0].color;
  if (mag >= 6) return legend[1].color;
  if (mag >= 5) return legend[2].color;
  if (mag >= 4) return legend[3].color;
  if (mag >= 3) return legend[4].color;
  return legend[5].color;
}
const timeFormat = (ts, zone = 'Asia/Tokyo') => new Date(ts).toLocaleString('en-CA', {
  timeZone: zone, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',
  second:'2-digit', hour12:false
}).replace(',', '');
const countLabel = n => Number(n).toLocaleString('en-US');

function Logo({ compact = false }) {
  return <div className={'logo-lockup' + (compact ? ' logo-small' : '')}>
    <div className="logo-orb"><Activity size={compact ? 22 : 25} strokeWidth={1.6} /></div>
    <div className="logo-type"><strong>Quako</strong>{!compact && <span>Live Earthquake Viewer</span>}</div>
  </div>;
}
function LiveBadge({ status, compact = false }) {
  const active = status === 'live';
  return <span className={'live-indicator '+(active ? 'is-live':'is-stale')}>
    <span className="live-blip" />{active ? 'Live' : status === 'connecting' ? 'Connecting' : status === 'stale' ? 'Delayed' : 'Offline'}
    {!compact && active ? null : null}
  </span>;
}
function Legend({ compact = false }) {
  return <div className={'magnitude-legend '+(compact ? 'compact-legend':'')}>
    <div className="legend-heading">Magnitude (M)</div>
    {legend.map(item => <div className="legend-row" key={item.label}><span className="legend-swatch" style={{background:item.color,boxShadow:'0 0 12px '+item.color+'80'}} />{item.label}</div>)}
  </div>;
}
function FilterSelect({ period, setPeriod, minMag, setMinMag, includeMagnitude = false }) {
  return <div className="filter-selects">
    <label className="select-shell"><select aria-label="Earthquake time period" value={period} onChange={e=>setPeriod(e.target.value)}>
      <option value="1H">Last Hour</option><option value="24H">Last 24 Hours</option><option value="7D">Last 7 Days (M2.5+)</option>
      <option value="30D">Last 30 Days (M4.5+)</option>
    </select><ChevronDown size={14} /></label>
    {includeMagnitude && <label className="select-shell"><select aria-label="Minimum earthquake magnitude" value={minMag} onChange={e=>setMinMag(e.target.value)}>
      <option value="all">All magnitudes</option><option value="2.5">M 2.5+</option><option value="3">M 3.0+</option><option value="4">M 4.0+</option><option value="5">M 5.0+</option><option value="6">M 6.0+</option>
    </select><ChevronDown size={14} /></label>}
  </div>;
}
function EventRow({ q, now, onClick }) {
  return <button type="button" className="event-row" onClick={()=>onClick(q)} title={'View '+q.title}>
    <span className="row-mag" style={{background:displayLegendColor(q.mag)}}>{formatMagnitude(q.mag)}</span>
    <span className="row-location">{q.title}</span>
    <span className="row-age">{ago(q.time,now)}</span>
    <span className="row-depth">{q.depth.toFixed(0)} km</span>
    <ArrowUpRight size={14} className="row-arrow" />
  </button>;
}
function WaveGradient() {
  return <div className="attenuation">
    <div className="attenuation-label">Wave attenuation <span>(illustration)</span></div>
    <div className="attenuation-bar"/>
    <div className="attenuation-captions"><span>Higher</span><span>Fading</span></div>
  </div>;
}
function DetailView({ quake, events, now, onClose }) {
  if (!quake) return null;
  return <div className="details-card glass">
    <button className="detail-back" type="button" onClick={onClose}><ArrowLeft size={15}/> BACK TO GLOBE</button>
    <div className="detail-event-title"><span className="large-mag" style={{background:displayLegendColor(quake.mag)}}><small>M</small> {formatMagnitude(quake.mag)}</span>
      <div><strong>{quake.title}</strong><span>{magnitudeLabel(quake.mag)} magnitude</span></div>
    </div>
    <div className="detail-datagrid">
      <div><span>Occurred</span><strong>{timeFormat(quake.time)} (JST)</strong></div>
      <div><span>Depth</span><strong>{quake.depth.toFixed(1)} km</strong></div>
      <div><span>Location</span><strong>{coordinates(quake.lat,quake.lng)}</strong></div>
      <div><span>Status</span><strong className="detail-status">{quake.status || 'Recorded'} (USGS)</strong></div>
      <div><span>Wave type</span><strong>Illustrative rings</strong></div>
    </div>
    <div className="detail-mini-map"><WorldMap events={events.slice(0,250)} selected={quake} compact /></div>
    <WaveGradient />
    <div className="detail-footer">
      {quake.url && <a target="_blank" rel="noreferrer" href={quake.url}>USGS event record <ExternalLink size={13}/></a>}
      <span className="detail-disclaimer">Rings are not measured shaking.</span>
    </div>
  </div>;
}
function StatisticsView({ events, now, period, setPeriod, minMag, setMinMag, onSelect }) {
  const strongest = events.length ? events.reduce((best,q)=>q.mag>best.mag?q:best,events[0]) : null;
  const bins = useMemo(()=>timelineData(events, period==='1H'?1:period==='7D'?168:period==='30D'?720:24,now),[events,period,now]);
  const max = Math.max(1,...bins);
  const labelStart = period==='1H'?'60m ago':period==='7D'?'7d ago':period==='30D'?'30d ago':'24h ago';
  return <div className="stats-screen">
    <div className="content-page-heading"><div><span className="small-kicker">OBSERVATORY / STATISTICS</span><h1>Global activity<span>.</span></h1><p>Seismic events around the world, at a glance.</p></div>
      <FilterSelect period={period} setPeriod={setPeriod} minMag={minMag} setMinMag={setMinMag} includeMagnitude/></div>
    <div className="stats-map-card glass"><WorldMap events={events} onSelect={onSelect}/></div>
    <div className="stats-lower">
      <section className="stats-timeline glass">
        <div className="stats-card-header"><strong><Activity size={15}/> Seismic frequency</strong><span>{countLabel(events.length)} events</span></div>
        <div className="frequency-bars">{bins.map((v,i)=><div key={i} className="frequency-bar-wrap" title={v+' earthquakes'}>
          <span style={{height:Math.max(3,v/max*100)+'%',background:'hsl('+(200-i*5.4)+' 92% 56%)'}} /></div>)}</div>
        <div className="frequency-axis"><span>{labelStart}</span><span>{period==='1H'?'30m':period==='7D'?'3.5d':period==='30D'?'15d':'12h'}</span><span>Now</span></div>
      </section>
      <section className="stats-summary glass"><div className="stats-card-header"><strong><Globe2 size={15}/> At a glance</strong></div>
        <div className="summary-line"><span>Earthquakes recorded</span><strong>{countLabel(events.length)}</strong></div>
        <div className="summary-line"><span>Strongest magnitude</span><strong style={{color:'#ffb160'}}>{strongest?'M '+formatMagnitude(strongest.mag):'—'}</strong></div>
        <div className="summary-line"><span>M 4.5+ events</span><strong>{events.filter(q=>q.mag>=4.5).length}</strong></div>
        <div className="summary-source">SOURCE: USGS GEOJSON · 60 SEC UPDATES</div>
      </section>
    </div>
  </div>;
}
function Toggle({checked,onChange,label,description}) {
  return <div className="setting-row"><div className="setting-text"><strong>{label}</strong><span>{description}</span></div>
    <button type="button" aria-label={'Toggle '+label} aria-pressed={checked} className={'pill-toggle '+(checked?'on':'')} onClick={()=>onChange(!checked)}><i /></button></div>;
}
function SettingsView({waves,setWaves,rotating,setRotating,plates,setPlates,night,setNight,grid,setGrid,
  minMag,setMinMag,period,setPeriod,onClose}) {
  return <div className="settings-screen">
    <div className="settings-head"><div><span className="small-kicker">PREFERENCES</span><h2>Display settings</h2></div>
      <button type="button" className="close-button" onClick={onClose} aria-label="Close settings"><X size={18}/></button></div>
    <div className="settings-block"><span className="settings-caption">DISPLAY OPTIONS</span>
      <Toggle checked={waves} onChange={setWaves} label="Earthquakes & waves" description="Show magnitude markers and illustrative ripples"/>
      <Toggle checked={rotating} onChange={setRotating} label="Auto rotation" description="Gently spin the globe"/>
      <Toggle checked={plates} onChange={setPlates} label="Tectonic plates" description="Show PB2002 plate boundaries"/>
      <Toggle checked={night} onChange={setNight} label="Night-only imagery" description="Switch between a blue Earth composite and city lights"/>
      <div className="setting-row"><div className="setting-text"><strong>Coordinate grid</strong><span>Hidden by default, optional for close inspection</span></div><div className="option-pills">{[['off','Off'],['standard','10°'],['fine','3°']].map(([value,label])=><button key={value} type="button" className={grid===value?'selected':''} onClick={()=>setGrid(value)}>{label}</button>)}</div></div>
    </div>
    <div className="settings-block"><span className="settings-caption">EARTHQUAKE FILTER</span>
      <div className="slider-caption"><span>Minimum magnitude</span><strong>{minMag==='all'?'All':Number(minMag).toFixed(1)+'+'}</strong></div>
      <div className="magnitude-chip-row">{[['all','All'],['2.5','2.5+'],['3','3.0+'],['4','4.0+'],['5','5.0+'],['6','6.0+']].map(([value,label])=><button key={value} type="button" onClick={()=>setMinMag(value)} className={minMag===value?'chosen':''}>{label}</button>)}</div>
      <div className="settings-range"><span>Time window</span><FilterSelect period={period} setPeriod={setPeriod} minMag={minMag} setMinMag={setMinMag}/></div>
    </div>
    <div className="settings-block last"><span className="settings-caption">DATA SOURCE</span>
      <div className="source-item chosen"><span className="source-radio" /><span>USGS (Global)</span><span className="source-live">CONNECTED</span></div>
      <div className="source-item unavailable" title="Integration not available yet"><span className="source-radio" /><span>JMA (Japan)</span><small>Not connected</small></div>
      <div className="source-item unavailable" title="Integration not available yet"><span className="source-radio" /><span>EMSC (Europe)</span><small>Not connected</small></div>
    </div>
    <div className="settings-footer"><Info size={14}/> Quako is a visual observatory, not an early-warning system.</div>
  </div>;
}
function InfoModal({ close }) {
  return <div className="modal-backdrop" onClick={close}><div className="info-modal glass" role="dialog" aria-modal="true" aria-label="About earthquake data" onClick={e=>e.stopPropagation()}>
    <button className="close-button modal-x" type="button" onClick={close} aria-label="Close"><X size={19}/></button>
    <Globe2 size={30} color="#7bc4ed"/><h2>Live data. Illustrated waves.</h2>
    <p>Quako reads recorded earthquake locations, magnitudes, depths, and event times from the USGS GeoJSON feed, refreshed every 60 seconds.</p>
    <p>The expanding colored circles are <strong>artistic propagation and fading animations</strong>, not a physical simulation of P-waves, S-waves, surface shaking or ground intensity. Magnitude does not by itself determine the intensity at a given location.</p>
    <p>The seven-day window uses the USGS M2.5+ feed. For emergency alerts or safety decisions, consult official warning services in your area.</p>
    <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" target="_blank" rel="noreferrer">USGS data documentation <ExternalLink size={14}/></a>
  </div></div>;
}

export default function App() {
  const [view,setView] = useState('live');
  const [period,setPeriod] = useState('24H');
  const [events,setEvents] = useState([]);
  const [selected,setSelected] = useState(null);
  const [status,setStatus] = useState('connecting');
  const [error,setError] = useState('');
  const [lastUpdated,setLastUpdated] = useState(0);
  const [refreshKey,setRefreshKey] = useState(0);
  const [loading,setLoading] = useState(false);
  const [minMag,setMinMag] = useState('all');
  const [search,setSearch] = useState('');
  const [rotating,setRotating] = useState(true);
  const [waves,setWaves] = useState(true);
  const [plates,setPlates] = useState(false);
  const [night,setNight] = useState(true);
  const [grid,setGrid] = useState('off');
  const [listExpanded,setListExpanded] = useState(false);
  const [showInfo,setShowInfo] = useState(false);
  const [mobileNav,setMobileNav] = useState(false);
  const [ready,setReady] = useState(false);
  const [zoomSignal,setZoomSignal] = useState(null);
  const [focusTarget,setFocusTarget] = useState(null);
  const [now,setNow] = useState(Date.now());

  useEffect(()=>{
    const id=setInterval(()=>setNow(Date.now()),1000);
    return ()=>clearInterval(id);
  },[]);

  useEffect(()=>{
    let cancelled=false;
    let controller=null;
    async function load() {
      controller?.abort();
      controller = new AbortController();
      const currentController = controller;
      setLoading(true);
      const timeout=setTimeout(()=>currentController.abort(),18000);
      try {
        const response=await fetch(USGS_FEEDS[period],{cache:'no-store',signal:currentController.signal});
        if (!response.ok) throw Error('USGS HTTP '+response.status);
        const json=await response.json();
        const normalized=normalizeEarthquakes(json);
        if(cancelled || controller!==currentController)return;
        setEvents(normalized);
        setSelected(previous=>previous ? normalized.find(q=>q.id===previous.id)||previous : null);
        setLastUpdated(Date.now());
        setError('');
        setStatus('live');
      } catch(err) {
        if(cancelled || controller!==currentController)return;
        if(err?.name==='AbortError' && controller!==currentController)return;
        setError(err?.message||'Unable to contact earthquake feed');
        setStatus(previous=>previous==='live'||previous==='stale'?'stale':'error');
      } finally {
        clearTimeout(timeout);
        if(!cancelled && controller===currentController)setLoading(false);
      }
    }
    load();
    const timer=setInterval(load,60000);
    return ()=>{cancelled=true;controller?.abort();clearInterval(timer);};
  },[period,refreshKey]);

  const filtered=useMemo(()=>events.filter(q=>(minMag==='all'||q.mag>=Number(minMag)) &&
    (!search.trim()||q.title.toLowerCase().includes(search.trim().toLowerCase()))),[events,minMag,search]);

  const openEvent=useCallback(q=>{setSelected(q);setView('detail');setMobileNav(false);},[]);
  const navigate=useCallback(id=>{
    setView(id);setMobileNav(false);
    if(id==='map')setFocusTarget({lat:12,lng:-165,altitude:1.8,nonce:Date.now()});
    if(id==='live')setFocusTarget({lat:8,lng:137,altitude:1.75,nonce:Date.now()});
  },[]);
  const globeVisible=view!=='statistics';
  const label=view==='detail'?'EARTHQUAKE DETAILS':view==='map'?'TECTONIC PLATES':view==='list'?'RECENT EARTHQUAKES':
    view==='statistics'?'GLOBAL STATISTICS':view==='settings'?'DISPLAY OPTIONS':'LIVE EARTHQUAKE VIEWER';

  return <div className="quako-shell">
    <div className={'mobile-scrim '+(mobileNav?'visible':'')} onClick={()=>setMobileNav(false)} />
    <aside className={'navigation '+(mobileNav?'mobile-open':'')}>
      <div className="nav-brand"><Logo /><a className="zetbros-return" href="/" aria-label="Return to Zetbros website">← Zetbros</a></div>
      <nav aria-label="Main navigation" className="nav-links">
        {navItems.map(item=><button key={item.id} className={'nav-link '+((view===item.id||(view==='detail'&&item.id==='live'))?'active':'')}
          type="button" onClick={()=>navigate(item.id)}><item.icon size={18} strokeWidth={2}/><span>{item.label}</span></button>)}
      </nav>
      <div className="nav-bottom"><div className="nav-clock">{new Date(now).toLocaleTimeString('en-GB',{timeZone:'Asia/Tokyo',hour12:false})} JST</div>
        <span className="nav-data-status"><i className={status==="live"?"":"offline"}/> {status==="live"?"Live Data":status==="stale"?"Delayed Data":"Feed Offline"}</span></div>
    </aside>
    <main className={'observatory '+(view==='detail'?'with-details ':'')+(view==='settings'?'with-settings ':'')+(view==='statistics'?'with-statistics ':'')+(view==='list'?'with-list ':'')}>
      <div className="space-field"/><div className="ambient-light"/>
      <header className="observatory-header">
        <div className="header-left"><button className="mobile-menu" type="button" onClick={()=>setMobileNav(true)} aria-label="Open navigation"><Menu size={19}/></button>
          <span className="header-section">{label}</span></div>
        <div className="header-actions">
          {view==='list' && <label className="top-search"><Search size={15}/><input aria-label="Search earthquake locations" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search location..."/>{search && <button type="button" onClick={()=>setSearch('')} aria-label="Clear search"><X size={12}/></button>}</label>}
          <span className="time-badge">{timeFormat(now)} (JST)<LiveBadge status={status} compact/></span>
        </div>
      </header>

      {globeVisible && <div className={'earth-scene '+(view==='detail'?'earth-detail ':'')+(view==='list'?'earth-list ':'')}>
        {/* Grid is optional in Settings; no large decorative orbital wireframes. */}
        <GlobeView events={filtered} selected={selected} onSelect={openEvent} view={view}
          rotating={rotating} waves={waves} grid={grid} night={night}
          showPlates={view==='map'||plates} onReady={setReady}
          zoomSignal={zoomSignal} focusTarget={focusTarget}/>
        {!ready && <div className="earth-loader"><RefreshCw size={17} className="spin"/> Rendering earth...</div>}
      </div>}

      {(view==='live'||view==='map') && <>
        <Legend />
        {view==='map' && <div className="plate-key glass"><span className="plate-line"/> PB2002 TECTONIC BOUNDARIES <small>Drag globe to explore plate margins</small></div>}
        {view==='live' && <div className="minimal-caption"><span className="caption-live"><i/> {status==='live'?'LIVE USGS DATA':status==='stale'?'DATA MAY BE DELAYED':'DATA UNAVAILABLE'}</span>
          <span>Illustrative pulses, not observed shaking · USGS refreshes every 60s</span></div>}
        <div className="globe-actions" role="group" aria-label="Globe controls">
          <button type="button" title="Center on the western Pacific" aria-label="Reset globe view" onClick={()=>setFocusTarget({lat:8,lng:135,altitude:1.65,nonce:Date.now()})}><Crosshair size={18}/></button>
          <button type="button" title="Zoom in" aria-label="Zoom in" onClick={()=>setZoomSignal({direction:'in',nonce:Date.now()})}><Plus size={20}/></button>
          <button type="button" title="Zoom out" aria-label="Zoom out" onClick={()=>setZoomSignal({direction:'out',nonce:Date.now()})}><Minus size={20}/></button>
        </div>
      </>}

      {view==='detail' && <>
        <div className="detail-headline"><div><span className="small-kicker">SEISMIC EVENT / LIVE RECORD</span><h1>Earthquake <em>focus.</em></h1></div></div>
        <DetailView quake={selected} events={filtered} now={now} onClose={()=>navigate('live')}/>
        <div className="detail-focus-hint"><span className="live-blip"/> Epicenter highlighted on globe · Scroll to zoom</div>
      </>}

      {view==='list' && <>
        <div className="list-topline"><span className="small-kicker">WORLDWIDE SEISMIC ACTIVITY</span><strong>{countLabel(filtered.length)} EVENTS</strong></div>
        <section className={'recent-panel glass '+(listExpanded?'expanded':'')}>
          <div className="recent-header"><div><strong>Recent earthquakes</strong><span>{period==='1H'?'Past hour':period==='24H'?'Past 24 hours':'Past seven days'}</span></div>
            <div className="recent-actions"><FilterSelect period={period} setPeriod={setPeriod} minMag={minMag} setMinMag={setMinMag}/><button onClick={()=>setListExpanded(!listExpanded)}>{listExpanded?'Less':'See all'}</button></div></div>
          <div className="recent-columns"><span>MAG</span><span>LOCATION</span><span>TIME</span><span>DEPTH</span></div>
          <div className="recent-rows">
            {filtered.slice(0,listExpanded?100:6).map(q=><EventRow key={q.id} q={q} now={now} onClick={openEvent}/>)}
            {!filtered.length && <div className="no-events">No events match your selection.</div>}
          </div>
          <div className="recent-bottom"><span><i/> USGS REAL-TIME FEED</span><span>Select an earthquake for its details <ArrowUpRight size={13}/></span></div>
        </section>
      </>}

      {view==='statistics' && <StatisticsView events={filtered} now={now} period={period} setPeriod={setPeriod}
        minMag={minMag} setMinMag={setMinMag} onSelect={openEvent}/>}

      {view==='settings' && <SettingsView waves={waves} setWaves={setWaves} rotating={rotating} setRotating={setRotating}
        plates={plates} setPlates={setPlates} night={night} setNight={setNight} grid={grid} setGrid={setGrid}
        minMag={minMag} setMinMag={setMinMag} period={period} setPeriod={setPeriod} onClose={()=>navigate('live')}/>}

      <div className="right-bottom-meta">
        <button type="button" aria-label="Refresh earthquake data" title="Refresh earthquake feed" onClick={()=>setRefreshKey(n=>n+1)}><RefreshCw size={16} className={loading?'spin':''}/></button>
        <button type="button" aria-label="About data and wave visualization" title="About Quako and the seismic wave illustration" onClick={()=>setShowInfo(true)}><CircleHelp size={17}/></button>
      </div>
      {error && <div className="network-warning">{'USGS feed: '+error}{status==='stale'?' · Showing last loaded records':''}</div>}
    </main>
    {showInfo && <InfoModal close={()=>setShowInfo(false)} />}
  </div>;
}
