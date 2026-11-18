import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMobileFrames, ATLAS } from '../components/capa/MobileFrames.ts';

function harness() {
  const requests = [];
  let ready = 0, visible = true;
  const loader = createMobileFrames({
    source: (room, sheet) => `${room}/${sheet}`,
    canLoad: () => visible,
    onReady: () => ready++,
    image: () => {
      const image = { decode: async () => {}, removeAttribute() {}, onload: null, onerror: null };
      Object.defineProperty(image, 'src', { set(url) { requests.push({ url, image, done: false }); } });
      return image;
    }
  });
  const finish = async request => { request.done = true; await request.image.onload(); };
  const drain = async () => {
    for (let i = 0; i < requests.length; i++) if (!requests[i].done) await finish(requests[i]);
  };
  return { loader, requests, finish, drain, setVisible: value => { visible = value; }, ready: () => ready };
}

test('one decode supplies all eight adjacent frames without extra requests', async () => {
  const h = harness();
  h.loader.setViews([[0, 9]], []);
  assert.equal(h.requests.length, 3);
  await h.drain();
  const count = h.requests.length;
  for (let n = 9; n <= 16; n++) {
    h.loader.setViews([[0, n]], []);
    const frame = h.loader.get(0, n);
    assert.equal(frame.frame, n);
    assert.equal(frame.x, (n - 9) % 4 * 540);
    assert.equal(frame.y, Math.floor((n - 9) / 4) * 960);
  }
  assert.equal(h.requests.length, count);
});

test('rapid forward/reverse seeks keep the requested frame and bound decoded memory', async () => {
  const h = harness();
  h.loader.setViews([[0, 1]], []);
  h.loader.setViews([[4, 192]], [[2, 77]]);
  await h.drain();
  assert.equal(h.loader.get(4, 192).frame, 192);
  for (const n of [80, 160, 64, 32, 8, 16]) {
    h.loader.setViews([[0, n]], [[1, 1]]);
    await h.drain();
    assert.equal(h.loader.get(0, n).frame, n);
    assert.ok(h.loader.size <= ATLAS.limit);
    assert.ok(h.requests.filter(r => !r.done).length <= 3);
  }
  assert.equal(h.loader.get(3, 100), undefined);
});

test('background work pauses and late responses cannot revive a disposed loader', async () => {
  const h = harness();
  h.setVisible(false);
  h.loader.setViews([[1, 120]], []);
  assert.equal(h.requests.length, 0);
  h.setVisible(true); h.loader.resume();
  assert.equal(h.requests.length, 3);
  h.loader.dispose();
  await h.drain();
  assert.equal(h.loader.size, 0);
  assert.equal(h.ready(), 0);
});

test('decoded bitmap memory is released on eviction and disposal', async () => {
  const previous = globalThis.createImageBitmap;
  const bitmaps = [];
  globalThis.createImageBitmap = async () => {
    const bitmap = { closed: false, close() { this.closed = true; } };
    bitmaps.push(bitmap); return bitmap;
  };
  try {
    const h = harness();
    for (const n of [1, 40, 80, 120, 160, 192]) {
      h.loader.setViews([[0, n]], []); await h.drain();
      assert.ok(bitmaps.filter(b => !b.closed).length <= ATLAS.limit);
    }
    h.loader.dispose();
    assert.ok(bitmaps.every(b => b.closed));
  } finally { globalThis.createImageBitmap = previous; }
});
