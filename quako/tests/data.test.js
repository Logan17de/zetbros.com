import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeEarthquakes, magnitudeColor, magnitudeLabel, timelineData, coordinates } from '../src/data.js';

test('normalizes and sorts validated GeoJSON earthquake records', () => {
  const result = normalizeEarthquakes({features:[
    {id:'first', properties:{mag:4.5,place:'Near Earth',time:1000},geometry:{coordinates:[138,35,15]}},
    {id:'second', properties:{mag:6.2,place:'Test region',time:2000},geometry:{coordinates:[-130,-25,45]}},
    {id:'missing', properties:{mag:null,time:3000},geometry:{coordinates:[0,0,0]}}
  ]});
  assert.equal(result.length,2);
  assert.deepEqual(result.map(x=>x.id),['second','first']);
  assert.equal(result[0].lat,-25);
  assert.equal(result[0].lng,-130);
  assert.equal(result[0].depth,45);
});

test('rejects malformed earthquake feed', () => {
  assert.throws(()=>normalizeEarthquakes({features:null}),/Unexpected/);
});

test('defines magnitude color thresholds correctly', () => {
  assert.equal(magnitudeColor(7.0),'#fa3654');
  assert.equal(magnitudeColor(6.0),'#ff7b42');
  assert.equal(magnitudeColor(5.1),'#f3b94d');
  assert.equal(magnitudeColor(4),'#b0df45');
  assert.equal(magnitudeColor(3.5),'#30cbd1');
  assert.equal(magnitudeColor(2.5),'#8c72e4');
  assert.equal(magnitudeLabel(5.0),'Strong');
});

test('time histogram ignores out-of-range earthquakes', () => {
  const now = Date.UTC(2026,9,17);
  const bins=timelineData([{time:now-1000},{time:now-8*3600000},{time:now-30*3600000}],24,now);
  assert.equal(bins.reduce((s,x)=>s+x,0),2);
  assert.equal(bins.at(-1),1);
});

test('produces recognizable hemisphere coordinate labels', () => {
  assert.equal(coordinates(-35.5,139.2),'35.50° S, 139.20° E');
});

test("30-day earthquake feed uses the official USGS magnitude 4.5+ monthly catalog", async () => {
  const { USGS_FEEDS } = await import("../src/data.js");
  assert.match(USGS_FEEDS["30D"], /^https:\/\/earthquake\.usgs\.gov\/earthquakes\/feed\/v1\.0\/summary\/4\.5_month\.geojson$/);
});
