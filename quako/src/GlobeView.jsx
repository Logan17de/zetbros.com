import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import countriesAtlas from 'world-atlas/countries-110m.json';
import { escapeHtml, formatMagnitude, magnitudeColor } from './data.js';
import { waveRadiusForMagnitude, waveSpeedForMagnitude, waveRepeatForMagnitude, selectWaveEvents } from './seismicVisuals.js';
import { createSeismicWaveLayer } from './SeismicWaveLayer.js';
import { markerPixelDiameter, markerWorldDiameter } from './markerSizing.js';

const countries = feature(countriesAtlas, countriesAtlas.objects.countries).features;
const plateLabels = [
  { lat: 46, lng: 90, name: 'EURASIAN PLATE' },
  { lat: 41, lng: -107, name: 'NORTH AMERICAN PLATE' },
  { lat: -14, lng: -111, name: 'PACIFIC PLATE' },
  { lat: -28, lng: 132, name: 'AUSTRALIAN PLATE' },
  { lat: 12, lng: 76, name: 'INDIAN PLATE' },
  { lat: -19, lng: -55, name: 'SOUTH AMERICAN PLATE' },
  { lat: 5, lng: 20, name: 'AFRICAN PLATE' },
  { lat: 15, lng: 123, name: 'PHILIPPINE SEA PLATE' },
  { lat: -72, lng: 0, name: 'ANTARCTIC PLATE' },
];

function makeDiscTextures() {
  const draw = (glow) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 96;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(48,48,glow ? 1 : 3,48,48,47);
    if(glow) {
      grad.addColorStop(0,'rgba(255,255,255,0.55)');
      grad.addColorStop(.18,'rgba(255,255,255,0.22)');
      grad.addColorStop(.45,'rgba(255,255,255,0.07)');
      grad.addColorStop(1,'rgba(255,255,255,0)');
    } else {
      grad.addColorStop(0,'rgba(255,255,255,1)');
      grad.addColorStop(.36,'rgba(255,255,255,1)');
      grad.addColorStop(.55,'rgba(255,255,255,.92)');
      grad.addColorStop(.8,'rgba(255,255,255,.20)');
      grad.addColorStop(1,'rgba(255,255,255,0)');
    }
    ctx.fillStyle=grad;
    ctx.fillRect(0,0,96,96);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };
  return { core:draw(false), glow:draw(true) };
}
// A small radial marker drawn in the tangent plane of the geographical surface.
 // Unlike THREE.Sprite, this stays facing outward from Earth, not the camera.
function makeSurfaceDot(event, isSelected, cache, textures, markerGeometry) {
  const color = isSelected ? '#fffbee' : magnitudeColor(event.mag);
  let materialPair=cache.get(color);
  if (!materialPair) {
    materialPair={
      glow:new THREE.MeshBasicMaterial({
        map:textures.glow, color, transparent:true, opacity:.36,
        depthWrite:false, depthTest:true, side:THREE.DoubleSide
      }),
      core:new THREE.MeshBasicMaterial({
        map:textures.core, color, transparent:true, opacity:1,
        depthWrite:false, depthTest:true, side:THREE.DoubleSide
      })
    };
    cache.set(color,materialPair);
  }
  const group=new THREE.Group();
  // Camera-aware, capped screen diameter. Small when zoomed out, modestly
  // larger when zoomed in; coordinates stay anchored to the globe.
  group.userData.magnitude=event.mag;
  group.userData.selected=Boolean(isSelected);
  const halo=new THREE.Mesh(markerGeometry,materialPair.glow);
  const dot=new THREE.Mesh(markerGeometry,materialPair.core);
  halo.scale.set(1.40,1.40,1);
  dot.scale.set(1,1,1);
  group.userData.quakeId=event.id;
  halo.position.z=.0015;
  dot.position.z=.003;
  halo.renderOrder=5;
  dot.renderOrder=6;
  group.add(halo,dot);
  return group;
}

function createAtmosphericRim(globe) {
  const radius = globe.getGlobeRadius();
  const geometry = new THREE.SphereGeometry(radius * 1.008, 96, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vViewNormal = normalize(normalMatrix * normal);
        vViewDirection = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }`,
    fragmentShader: `
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;
      void main() {
        float facing = max(0.0, dot(normalize(vViewNormal), normalize(vViewDirection)));
        float rim = pow(1.0 - facing, 5.6);
        vec3 color = vec3(0.28, 0.62, 0.98);
        gl_FragColor = vec4(color, clamp(rim * 0.43, 0.0, 0.46));
      }`,
    transparent:true,
    blending:THREE.AdditiveBlending,
    depthTest:true,
    depthWrite:false,
    side:THREE.FrontSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name='Quako thin atmospheric edge only';
  mesh.renderOrder=2;
  mesh.raycast=()=>{};
  globe.scene().add(mesh);
  return () => {
    globe.scene().remove(mesh);
    geometry.dispose();
    material.dispose();
  };
}


function createEarthCloudLayer(globe) {
  // A low-opacity cloud veil gives depth without hiding epicenters.
  // Kept under surface markers/ripple wavefronts, independent of zoom.
  const texture = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'earth-clouds-soft.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.SphereGeometry(globe.getGlobeRadius() * 1.0014,96,64);
  const material = new THREE.MeshBasicMaterial({
    map:texture,transparent:true,opacity:.34,alphaTest:.003,
    depthTest:true,depthWrite:false,side:THREE.FrontSide,
    color:'#c7deef',polygonOffset:true,polygonOffsetFactor:-1
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.name='Quako Earth cloud haze';
  mesh.renderOrder=1;
  mesh.raycast=()=>{};
  globe.scene().add(mesh);
  return () => {
    globe.scene().remove(mesh);
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}

function createGrid(globe, grid) {
  if (grid === 'off') return null;
  const group = new THREE.Group();
  group.userData.fine = grid === 'fine';
  // Major meridians remain visible at wide zoom. Minute-scale graticules
  // only emerge while zooming in, avoiding the cage-like wireframe effect.
  const make = (spacing, tier) => {
    const positions = [];
    for (let lat = -90 + spacing; lat < 90; lat += spacing) {
      for (let lng = -180; lng < 180; lng += 3) {
        const a = globe.getCoords(lat, lng, .0017);
        const b = globe.getCoords(lat, lng + 3, .0017);
        positions.push(a.x,a.y,a.z,b.x,b.y,b.z);
      }
    }
    for (let lng = -180; lng < 180; lng += spacing) {
      for (let lat = -90; lat < 90; lat += 3) {
        const a = globe.getCoords(lat, lng, .0017);
        const b = globe.getCoords(lat + 3, lng, .0017);
        positions.push(a.x,a.y,a.z,b.x,b.y,b.z);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const material = new THREE.LineBasicMaterial({
      color: tier === 'major' ? '#56a2c4' : '#4088a8',
      transparent:true,opacity:tier === 'major' ? .10 : .012,
      depthWrite:false, depthTest:true
    });
    const lines = new THREE.LineSegments(geometry,material);
    lines.userData.tier = tier;
    group.add(lines);
  };
  make(10,'major');
  if (grid === 'fine') make(3,'minor');
  return group;
}

function fadingRing(event, t) {
  const base = new THREE.Color(magnitudeColor(event.mag));
  const cold = new THREE.Color('#38b8e3');
  base.lerp(cold, Math.pow(t,.82));
  const alpha = Math.pow(1-t,.84) * (event.mag >= 5 ? 1 : .87);
  return 'rgba(' + Math.round(base.r * 255) + ',' + Math.round(base.g * 255) + ',' +
    Math.round(base.b * 255) + ',' + alpha.toFixed(3) + ')';
}

function simplifyPlateLines(features) {
  return features.flatMap((item,i) => {
    const geom = item.geometry;
    if (!geom) return [];
    const segments = geom.type === 'LineString' ? [geom.coordinates] :
      geom.type === 'MultiLineString' ? geom.coordinates : [];
    return segments.filter(line => line.length > 1).map((coordinates,j) => ({
      id:i+'-'+j,coordinates
    }));
  });
}

export default function GlobeView({
  events, selected, onSelect, view = 'live', rotating = true,
  waves = true, grid = 'off', showPlates = false, night = true,
  focusTarget = null, zoomSignal = null, onReady
}) {
  const mount = useRef(null);
  const globeRef = useRef(null);
  const gridRef = useRef(null);
  const markersRef = useRef(new Set());
  const waveLayerRef = useRef(null);
  const plateRef = useRef([]);
  const platesVisibleRef = useRef(showPlates);
  platesVisibleRef.current = showPlates;
  const onSelectRef = useRef(onSelect);
  const onReadyRef = useRef(onReady);
  const spriteTexturesRef = useRef(null);
  const spriteMaterialsRef = useRef(null);
  onSelectRef.current = onSelect;
  onReadyRef.current = onReady;

  useEffect(() => {
    let isCurrent = true;
    fetch(import.meta.env.BASE_URL + 'tectonic-boundaries.json')
      .then(res => { if (!res.ok) throw new Error('Plate boundary file unavailable'); return res.json(); })
      .then(json => {
        if (!isCurrent) return;
        plateRef.current = simplifyPlateLines(json.features || []);
        if (globeRef.current && platesVisibleRef.current) globeRef.current.pathsData(plateRef.current);
      })
      .catch(() => {});
    if (!mount.current) return;

    const textures = makeDiscTextures();
    const spriteMaterials = new Map();
    const markerGeometry = new THREE.PlaneGeometry(1,1);
    spriteTexturesRef.current = textures;
    spriteMaterialsRef.current = spriteMaterials;
    const globe = Globe({animateIn:false})(mount.current)
      .backgroundColor('rgba(0,0,0,0)')
      .globeImageUrl(import.meta.env.BASE_URL + 'earth-cinematic-night.jpg')
      .showAtmosphere(false)
      .polygonsData(countries)
      .polygonCapColor(() => 'rgba(4,22,41,0.025)')
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonStrokeColor(() => 'rgba(104,171,192,0.16)')
      .polygonAltitude(.0011)
      // Dots are mapped directly to their geographic epicenters.
      .objectsData([])
      .objectLat('lat').objectLng('lng')
      .objectAltitude(.0018)
      .objectFacesSurface(true)
      .objectThreeObject(d => {
        const marker=makeSurfaceDot(d, d._selected, spriteMaterials, textures, markerGeometry);
        markersRef.current.add(marker);
        return marker;
      })
      .objectLabel(d => '<div class="map-tooltip"><strong>M '+formatMagnitude(d.mag)+'</strong><span>'+escapeHtml(d.title)+'</span></div>')
      .onObjectClick(d => onSelectRef.current?.(d))
      .ringsData([])
      .ringLat('lat').ringLng('lng')
      .ringAltitude(.016)
      .ringMaxRadius(d => waveRadiusForMagnitude(d.mag))
      .ringPropagationSpeed(d => waveSpeedForMagnitude(d.mag))
      .ringRepeatPeriod(d => waveRepeatForMagnitude(d.mag))
      .ringResolution(96)
      .ringColor(d => t => fadingRing(d,t))
      .pathsData([])
      .pathPoints('coordinates')
      .pathPointLat(p => p[1])
      .pathPointLng(p => p[0])
      .pathPointAlt(.013)
      .pathColor(() => '#ff453a')
      .pathStroke(.80)
      .pathResolution(3)
      .pathTransitionDuration(0)
      .labelsData([])
      .labelLat('lat').labelLng('lng')
      .labelText('name')
      .labelSize(.98)
      .labelColor(() => '#d9f2fa')
      .labelAltitude(.028)
      .labelResolution(2)
      .labelDotRadius(.0)
      .labelIncludeDot(false);

    // The supplied city-lights texture already encodes Earth's nighttime
    // appearance. Self-lit rendering preserves city lights without daylight
    // illumination washing out oceans or whole continents.
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: '#f8fcff',
      depthWrite: true
    });
    // Camera-relative *cinematic* illumination: upper-left surface detail
    // remains visible; far-side oceans remain deep navy, not a wireframe.
    // The globe texture itself retains land, ocean, terrain and city lights.
    earthMaterial.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vQuakoNormal;')
        .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nvQuakoNormal = normalize(normalMatrix * objectNormal);');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vQuakoNormal;')
        .replace('#include <color_fragment>', `#include <color_fragment>
          vec3 quakoNormal = normalize(vQuakoNormal);
          float quakoLight = dot(quakoNormal, normalize(vec3(-0.27, 0.69, 0.67)));
          float quakoShading = mix(0.53, 1.22, smoothstep(-0.49, 0.91, quakoLight));
          diffuseColor.rgb *= quakoShading;
          float quakoRim = pow(1.0 - max(quakoNormal.z, 0.0), 6.0);
          diffuseColor.rgb += vec3(0.016, 0.085, 0.16) * quakoRim * 0.40;
        `);
    };
    earthMaterial.customProgramCacheKey = () => 'quako-cinematic-earth-v1';
    globe.globeMaterial(earthMaterial);

    const disposeRim = createAtmosphericRim(globe);
    const disposeClouds = createEarthCloudLayer(globe);
    waveLayerRef.current = createSeismicWaveLayer(globe);
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = .23;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = .075;
    controls.minDistance = 112;
    controls.maxDistance = 580;
    globe.pointOfView({lat:12,lng:135,altitude:1.68},0);

    const resize = () => {
      if (mount.current) globe.width(mount.current.clientWidth).height(mount.current.clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount.current);
    resize();
    globeRef.current = globe;
    // Keep dot sizes proportional to the visible globe rather than forcing
    // a large fixed pixel marker at every zoom. Geographic anchors stay fixed.
    let markerFrame = 0;
    const vector = new THREE.Vector3();
    const direction = new THREE.Vector3();
    function syncMarkerScreenSizes() {
      const camera = globe.camera();
      if (camera?.isPerspectiveCamera && mount.current) {
        camera.getWorldDirection(direction);
        const height = Math.max(1, mount.current.clientHeight);
        const globeDistance = camera.position.length();
        // Reveal finer graticules only when zooming toward the surface.
        const gridStrength = THREE.MathUtils.smoothstep(globeDistance, 150, 350);
        if (gridRef.current) {
          for (const line of gridRef.current.children) {
            line.material.opacity = line.userData.tier === 'major'
              ? THREE.MathUtils.lerp(.145, .095, gridStrength)
              : THREE.MathUtils.lerp(.075, .010, gridStrength);
          }
        }
        for (const marker of markersRef.current) {
          marker.getWorldPosition(vector);
          const depth = vector.sub(camera.position).dot(direction);
          const worldDiameter = markerWorldDiameter(
            depth, camera.fov, height,
            markerPixelDiameter(marker.userData.magnitude, globeDistance, marker.userData.selected),
            camera.zoom
          );
          if(worldDiameter > 0) marker.scale.setScalar(worldDiameter);
        }
      }
      markerFrame = requestAnimationFrame(syncMarkerScreenSizes);
    }
    markerFrame = requestAnimationFrame(syncMarkerScreenSizes);
    onReadyRef.current?.(true);

    return () => {
      isCurrent = false;
      observer.disconnect();
      cancelAnimationFrame(markerFrame);
      markersRef.current.clear();
      if (gridRef.current) {
        globe.scene().remove(gridRef.current);
        gridRef.current.traverse(obj => { obj.geometry?.dispose(); obj.material?.dispose(); });
        gridRef.current = null;
      }
      controls.autoRotate = false;
      waveLayerRef.current?.dispose();
      waveLayerRef.current = null;
      disposeClouds();
      disposeRim();
      globe.pauseAnimation();
      if (typeof globe._destructor === 'function') globe._destructor();
      spriteMaterials.forEach(pair => {pair.glow.dispose(); pair.core.dispose();});
      textures.glow.dispose(); textures.core.dispose();
      markerGeometry.dispose();
      spriteMaterialsRef.current=null; spriteTexturesRef.current=null;
      if (mount.current) mount.current.replaceChildren();
      globeRef.current = null;
      onReadyRef.current?.(false);
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    markersRef.current.clear();
    globe.objectsData(events.slice(0,1600).map(d => ({...d,_selected:d.id === selected?.id && view === 'detail'})));
    // Minor events are dots only. Stronger, recent events receive localized,
    // magnitude-dependent visual pulses; never a regional intensity footprint.
    globe.ringsData([]);
    waveLayerRef.current?.setEvents(waves ? selectWaveEvents(events,Date.now(),selected?.id) : []);
    globe.labelsData(view === 'map' && showPlates ? plateLabels :
      view === 'detail' && selected ? [{lat:selected.lat,lng:selected.lng,name:'M '+formatMagnitude(selected.mag)+' · '+selected.title.slice(0,34)}] : []);
  }, [events,selected,waves,view,showPlates]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    controls.autoRotate = rotating && view !== 'detail';
  }, [rotating,view]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    if (gridRef.current) {
      globe.scene().remove(gridRef.current);
      gridRef.current.traverse(obj => {obj.geometry?.dispose();obj.material?.dispose();});
    }
    gridRef.current = createGrid(globe,grid);
    if (gridRef.current) globe.scene().add(gridRef.current);
  }, [grid]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.globeImageUrl(night ? import.meta.env.BASE_URL + 'earth-cinematic-night.jpg' : import.meta.env.BASE_URL + 'earth-blue-marble.jpg');
    // The custom self-lit Earth material stays consistent across texture changes.
  }, [night]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.pathsData(showPlates ? plateRef.current : []);
  }, [showPlates,view]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !selected || view !== 'detail') return;
    globe.pointOfView({lat:selected.lat,lng:selected.lng,altitude:1.34},1400);
  }, [selected,view]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const current = globe.pointOfView();
    if (!zoomSignal) return;
    const altitude = Math.min(4, Math.max(.35, current.altitude + (zoomSignal.direction === 'in' ? -.27 : .27)));
    globe.pointOfView({...current, altitude},420);
  }, [zoomSignal]);

  useEffect(() => {
    if (!focusTarget || !globeRef.current) return;
    globeRef.current.pointOfView({lat:focusTarget.lat,lng:focusTarget.lng,altitude:focusTarget.altitude || 1.7},1200);
  }, [focusTarget]);

  return <div className="globe-mount" ref={mount} role="application"
    aria-label="Interactive Earth globe displaying earthquake epicenters. Drag to rotate, scroll to zoom, or select a quake marker." />;
}
