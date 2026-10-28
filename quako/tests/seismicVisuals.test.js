import test from 'node:test';
import assert from 'node:assert/strict';
import {waveRadiusForMagnitude,waveRepeatForMagnitude,angularDistanceDegrees,selectWaveEvents} from '../src/seismicVisuals.js';

test('minor and light magnitudes have dots without regional wave rings',()=>{
  for(const m of [0,1.4,2.9,3.8,3.99]) assert.equal(waveRadiusForMagnitude(m),0);
});
test('visual pulse radius varies by magnitude with a strict upper cap',()=>{
  const mags=[4,5,6,7,8,9];
  const radii=mags.map(waveRadiusForMagnitude);
  assert.ok(radii[0]>0 && radii[0]<2);
  assert.ok(radii[0]<radii[1]&&radii[1]<radii[2]&&radii[2]<radii[3]&&radii[3]<radii[4]);
  assert.ok(radii.at(-1)<=9);
  assert.ok(waveRepeatForMagnitude(5)>waveRepeatForMagnitude(6));
});
test('close earthquake clusters retain dots but only one visual wave',()=>{
  const now=Date.now();
  const events=[
    {id:'strong',mag:6.3,lat:35,lng:139,time:now-1800000},
    {id:'near',mag:5.2,lat:35.15,lng:139.15,time:now-1700000},
    {id:'far',mag:4.7,lat:-19,lng:-175,time:now-5000000},
    {id:'minor',mag:2.2,lat:34,lng:139,time:now-20000}
  ];
  assert.deepEqual(selectWaveEvents(events,now).map(e=>e.id),['strong','far']);
});
test('old reports no longer pulse, except on explicit selection',()=>{
  const now=Date.now();
  const old={id:'old',mag:4.8,lat:10,lng:100,time:now-20*3600000};
  assert.equal(selectWaveEvents([old],now).length,0);
  assert.equal(selectWaveEvents([old],now,'old').length,1);
});
test('great-circle separation crosses the date line correctly',()=>{
  assert.ok(angularDistanceDegrees({lat:0,lng:179},{lat:0,lng:-179})<3);
});
