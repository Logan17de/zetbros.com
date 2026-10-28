// Keep earthquakes readable as the globe changes apparent size, but never
// turn them into huge glowing patches or sub-pixel specks.
// Values are target CSS-pixel diameters for the textured dot quad.
export function markerPixelDiameter(magnitude, cameraDistance = 240, selected = false) {
  const mag = Number.isFinite(magnitude) ? Math.max(0, Math.min(8, magnitude)) : 0;
  const distance = Number.isFinite(cameraDistance) && cameraDistance > 0 ? cameraDistance : 240;
  const base = 5.0 + 0.52 * mag;
  const zoomFactor = Math.min(1.32, Math.max(0.58, Math.pow(240 / distance, 0.58)));
  const diameter = Math.min(11.5, Math.max(3.6, base * zoomFactor));
  return selected ? Math.min(14, diameter * 1.23) : diameter;
}

// Convert the chosen screen diameter back into world units using the camera
// projection. The geographic origin of the tangent-plane marker is unchanged.
export function markerWorldDiameter(depth, fovDegrees, viewportPixels, diameterPixels, zoom = 1) {
  if (![depth, fovDegrees, viewportPixels, diameterPixels, zoom].every(Number.isFinite)
      || depth <= 0 || viewportPixels <= 0 || zoom <= 0 || diameterPixels <= 0) return 0;
  return (2 * depth * Math.tan(fovDegrees * Math.PI / 360) * diameterPixels)
    / (viewportPixels * zoom);
}
