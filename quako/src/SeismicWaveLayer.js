import * as THREE from 'three';
import { magnitudeColor } from './data.js';
import { waveRadiusForMagnitude, waveRepeatForMagnitude } from './seismicVisuals.js';

// These are illustrative ripples tied to recorded epicenters, NOT measured
// shaking, arrivals, attenuation or a hazard footprint.
const SEGMENTS = 88;
const FALLOFF = [0, .12, .44, 1, .51, .16, 0];
const BAND_OFFSETS = [-1, -.66, -.34, 0, .34, .70, 1.07];
const BANDS = FALLOFF.length;
const RAD = Math.PI / 180;
const COOL = new THREE.Color('#33b8d7');
const HEIGHT = .0032; // Hug the Earth surface. The graticule is even lower.
const TWO_PI = 2 * Math.PI;

function hashSeed(id) {
  let hash = 2166136261;
  for (const char of String(id ?? '')) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function makeRippleGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions = new THREE.BufferAttribute(new Float32Array((SEGMENTS + 1) * BANDS * 3), 3);
  positions.setUsage(THREE.DynamicDrawUsage);
  const falloff = new Float32Array((SEGMENTS + 1) * BANDS);
  for (let a = 0; a <= SEGMENTS; a++) {
    for (let b = 0; b < BANDS; b++) {
      falloff[a * BANDS + b] = FALLOFF[b];
    }
  }
  const indices = [];
  for (let a = 0; a < SEGMENTS; a++) {
    for (let b = 0; b < BANDS - 1; b++) {
      const v = a * BANDS + b;
      const n = v + BANDS;
      indices.push(v, n, v + 1, n, n + 1, v + 1);
    }
  }
  geometry.setIndex(indices);
  geometry.setAttribute('position', positions);
  geometry.setAttribute('aFalloff', new THREE.Float32BufferAttribute(falloff, 1));
  return { geometry, positions };
}

function makeRippleMaterial(color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: color.clone() },
      uOpacity: { value: .58 }
    },
    vertexShader: `
      attribute float aFalloff;
      varying float vFalloff;
      void main() {
        vFalloff = aFalloff;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFalloff;
      void main() {
        float alpha = pow(vFalloff, 0.88) * uOpacity * 1.15;
        if (alpha < 0.008) discard;
        gl_FragColor = vec4(uColor * 1.48, clamp(alpha, 0.0, 1.0));
      }`,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
}

function positionRipple(globe, item, phase, seconds) {
  const { quake, positions, seed } = item;
  const centerLat = quake.lat * RAD;
  const centerLng = quake.lng * RAD;
  const sinLat = Math.sin(centerLat);
  const cosLat = Math.cos(centerLat);
  const maxRadius = waveRadiusForMagnitude(quake.mag);
  // Slightly irregular, low-frequency curves rather than mathematical circles.
  const radius = maxRadius * (.16 + phase * .84);
  const halfWidth = .18 + radius * .11;
  const arr = positions.array;

  for (let segment = 0; segment <= SEGMENTS; segment++) {
    const theta = segment * TWO_PI / SEGMENTS;
    const organic =
      .53 * Math.sin(3 * theta + seed * 6.3 + seconds * .10) +
      .30 * Math.sin(7 * theta - seed * 5.4 - seconds * .075) +
      .17 * Math.sin(11 * theta + seed * 13.2 + seconds * .11);
    const deviation = organic * Math.min(.24, .05 + radius * .032);
    const anisotropy = 1 + .025 * Math.cos(theta * 2 + seed * 4);
    const ringCenter = radius * anisotropy + deviation;

    for (let band = 0; band < BANDS; band++) {
      const arc = Math.max(.035, ringCenter + BAND_OFFSETS[band] * halfWidth) * RAD;
      const targetLat = Math.asin(sinLat * Math.cos(arc) + cosLat * Math.sin(arc) * Math.cos(theta));
      const targetLng = centerLng + Math.atan2(
        Math.sin(theta) * Math.sin(arc) * cosLat,
        Math.cos(arc) - sinLat * Math.sin(targetLat)
      );
      // Globe coordinates, not screen coordinates: wave remains glued to surface.
      const point = globe.getCoords(targetLat / RAD, targetLng / RAD, HEIGHT);
      const offset = (segment * BANDS + band) * 3;
      arr[offset] = point.x;
      arr[offset + 1] = point.y;
      arr[offset + 2] = point.z;
    }
  }
  positions.needsUpdate = true;
}

export function createSeismicWaveLayer(globe) {
  const group = new THREE.Group();
  group.name = 'Quako illustrative, surface-hugging earthquake wavefronts';
  globe.scene().add(group);

  let entries = [];
  let frame = 0;
  let last = 0;
  let destroyed = false;

  function clear() {
    for (const { mesh } of entries) {
      group.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    entries = [];
  }

  function setEvents(events) {
    if (destroyed) return;
    clear();
    for (const quake of events) {
      const loops = quake.mag >= 6 ? 3 : quake.mag >= 5 ? 2 : 1;
      const seed = hashSeed(quake.id);
      for (let index = 0; index < loops; index++) {
        const { geometry, positions } = makeRippleGeometry();
        const color = new THREE.Color(magnitudeColor(quake.mag));
        const mesh = new THREE.Mesh(geometry, makeRippleMaterial(color));
        mesh.frustumCulled = false;
        mesh.renderOrder = 3;
        group.add(mesh);
        entries.push({ quake, index, loops, mesh, positions, color, seed });
      }
    }
    renderRipples(performance.now(), true);
  }

  function renderRipples(now, force = false) {
    if (destroyed) return;
    if (force || now - last >= 48) {
      last = now;
      for (const item of entries) {
        const period = waveRepeatForMagnitude(item.quake.mag);
        const phase = (now / period + item.index / item.loops + item.seed * .6) % 1;
        positionRipple(globe, item, phase, now / 1000);
        item.mesh.material.uniforms.uColor.value.copy(item.color).lerp(COOL, phase * .30);
        // Fade both in and out. The crest softens as it travels.
        const fadeIn = Math.min(1, phase * 7);
        const fadeOut = Math.pow(1 - phase, .92);
        const strength = item.quake.mag >= 6 ? 1.17 : item.quake.mag >= 5 ? 1.01 : .83;
        item.mesh.material.uniforms.uOpacity.value = strength * fadeIn * fadeOut;
      }
    }
    if (!force) frame = requestAnimationFrame(renderRipples);
  }

  frame = requestAnimationFrame(renderRipples);

  return {
    setEvents,
    count: () => entries.length,
    dispose() {
      destroyed = true;
      cancelAnimationFrame(frame);
      clear();
      globe.scene().remove(group);
    }
  };
}
