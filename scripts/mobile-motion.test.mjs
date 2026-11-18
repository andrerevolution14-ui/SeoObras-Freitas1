import {test} from 'node:test';
import assert from 'node:assert/strict';
import {advanceMobileProgress} from '../components/capa/MobileMotion.ts';

test('60 Hz and 120 Hz displays converge at the same speed', () => {
  const run = hz => {
    let p = 0;
    for (let n = 0; n < hz / 5; n++) p = advanceMobileProgress(p, .01, 1000 / hz);
    return p;
  };
  assert.ok(Math.abs(run(60) - run(120)) < 1e-10);
  assert.ok(run(60) > .0097);
});

test('forward and reverse gestures never overshoot or move the wrong way', () => {
  let p = .3;
  for (let n = 0; n < 10; n++) {
    const next = advanceMobileProgress(p, .31, 16.67);
    assert.ok(next > p && next <= .31); p = next;
  }
  const reverse = advanceMobileProgress(p, .29, 16.67);
  assert.ok(reverse < p && reverse >= .29);
});

test('fast swipes bound visual lag and navigation jumps are immediate', () => {
  const p = advanceMobileProgress(.2, .28, 16.67);
  assert.ok(.28 - p < .014);
  assert.equal(advanceMobileProgress(.2, .9, 16.67), .9);
});

test('the playhead reaches the exact resting position and stops', () => {
  let p = .5;
  for (let n = 0; n < 30; n++) p = advanceMobileProgress(p, .51, 16.67);
  assert.equal(p, .51);
  assert.equal(advanceMobileProgress(p, .51, 16.67), .51);
});
