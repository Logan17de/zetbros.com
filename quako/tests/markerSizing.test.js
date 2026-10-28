import test from 'node:test';
import assert from 'node:assert/strict';
import { markerPixelDiameter, markerWorldDiameter } from '../src/markerSizing.js';

test('earthquake markers stay compact, with stronger magnitudes slightly more visible',()=>{
  const minor=markerPixelDiameter(2,240);
  const major=markerPixelDiameter(7,240);
  assert.ok(minor>=5 && minor<7, 'minor quake dot should be small');
  assert.ok(major>minor && major<10, 'major quake dot should remain compact');
  assert.ok(markerPixelDiameter(7,240,true)>major, 'selected quake must be subtly larger');
});

test('markers gently grow as you zoom in, and shrink with a smaller globe',()=>{
  const far=markerPixelDiameter(6,550);
  const normal=markerPixelDiameter(6,240);
  const near=markerPixelDiameter(6,115);
  assert.ok(far<normal && normal<near, 'dynamic zoom scaling must be monotonic');
  assert.ok(far>=3.6 && near<=11.5, 'unselected markers must remain capped');
  assert.ok(near/far<2.5, 'zoom must not cause enormous marker growth');
});

test('all zoom distances and magnitudes enforce legibility bounds',()=>{
  for(const mag of [0,1,3,4.5,6,8,10]){
    for(const distance of [65,115,200,240,360,580,1200]){
      const value=markerPixelDiameter(mag,distance);
      assert.ok(value>=3.6 && value<=11.5, 'marker out of bounds');
      assert.ok(markerPixelDiameter(mag,distance,true)<=14);
    }
  }
});

test('projection converts requested pixels to the correct 3D size at each distance',()=>{
  for(const distance of [100,160,240,400,580]){
    const desired=markerPixelDiameter(5.8,distance);
    const world=markerWorldDiameter(distance,45,900,desired);
    const projected=world*900/(2*distance*Math.tan(45*Math.PI/360));
    assert.ok(Math.abs(projected-desired)<1e-8);
  }
});
test('screen-pixel calculation works for viewport resizing and zoom',()=>{
  const desired=8;
  for(const [height,zoom] of [[600,1],[900,1],[1200,1],[900,2],[900,.75]]) {
    const world=markerWorldDiameter(225,50,height,desired,zoom);
    const rendered=world*height*zoom/(2*225*Math.tan(50*Math.PI/360));
    assert.ok(Math.abs(rendered-desired)<1e-8);
  }
});
test('invalid inputs produce safe sizes',()=>{
  assert.equal(markerWorldDiameter(0,45,900,8),0);
  assert.equal(markerWorldDiameter(300,45,0,8),0);
  assert.equal(markerWorldDiameter(300,45,900,8,0),0);
  assert.equal(markerWorldDiameter(Infinity,45,900,8),0);
  assert.ok(Number.isFinite(markerPixelDiameter(5,NaN)));
});
