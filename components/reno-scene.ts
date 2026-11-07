// ============================================================
// components/reno-scene.ts — Casa de banho em corte (Three.js)
// Montagem realista peça a peça controlada pelo scroll (p: 0 → 1).
// Carregado dinamicamente apenas quando a secção se aproxima do ecrã.
// ============================================================
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type Mode = "drop" | "slide" | "rise" | "grow" | "pop" | "fade" | "none";

interface Piece {
  obj: THREE.Object3D;
  a: number;
  b: number;
  c?: number;
  e?: number;
  mode: Mode;
  from: THREE.Vector3;
  basePos: THREE.Vector3;
  baseScale: THREE.Vector3;
  mats: THREE.Material[];
  lastOp: number;
}

export interface RenoScene {
  setProgress: (p: number) => void;
  /** Projeta um ponto 3D da cena para coordenadas (px) do elemento anfitrião. */
  project: (x: number, y: number, z: number) => { x: number; y: number };
  resize: () => void;
  dispose: () => void;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------------- Texturas procedimentais ---------------- */
function canvasTex(size: number, draw: (g: CanvasRenderingContext2D, s: number) => void, repeat = 1) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  draw(g, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  return t;
}
function noise(g: CanvasRenderingContext2D, s: number, n: number, alpha: number, light = true) {
  for (let i = 0; i < n; i++) {
    const v = light ? 255 : 0;
    g.fillStyle = `rgba(${v},${v},${v},${Math.random() * alpha})`;
    const r = Math.random() * 2 + 0.5;
    g.fillRect(Math.random() * s, Math.random() * s, r, r);
  }
}
const stoneTex = (base: string, vein = true) =>
  canvasTex(512, (g, s) => {
    g.fillStyle = base;
    g.fillRect(0, 0, s, s);
    noise(g, s, 9000, 0.08, true);
    noise(g, s, 9000, 0.06, false);
    if (vein) {
      g.strokeStyle = "rgba(120,110,95,0.10)";
      for (let i = 0; i < 6; i++) {
        g.lineWidth = Math.random() * 2 + 0.5;
        g.beginPath();
        let x = Math.random() * s, y = 0;
        g.moveTo(x, y);
        while (y < s) {
          x += (Math.random() - 0.5) * 40;
          y += 30;
          g.lineTo(x, y);
        }
        g.stroke();
      }
    }
  });
const brickTex = () =>
  canvasTex(512, (g, s) => {
    g.fillStyle = "#b9b2a6";
    g.fillRect(0, 0, s, s);
    const bh = s / 8, bw = s / 3;
    for (let r = 0; r < 8; r++) {
      for (let c = -1; c < 4; c++) {
        const x = c * bw + (r % 2 ? bw / 2 : 0);
        const tone = 150 + Math.random() * 30;
        g.fillStyle = `rgb(${tone + 25},${tone - 40},${tone - 65})`;
        g.fillRect(x + 4, r * bh + 4, bw - 8, bh - 8);
      }
    }
    noise(g, s, 6000, 0.12, false);
  }, 3);
const concreteTex = () =>
  canvasTex(256, (g, s) => {
    g.fillStyle = "#9a9792";
    g.fillRect(0, 0, s, s);
    noise(g, s, 7000, 0.12, false);
    noise(g, s, 5000, 0.1, true);
  }, 3);
const woodTex = () =>
  canvasTex(512, (g, s) => {
    g.fillStyle = "#7a5238";
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < 140; i++) {
      g.strokeStyle = `rgba(${Math.random() > 0.5 ? "40,22,10" : "160,115,80"},${Math.random() * 0.25})`;
      g.lineWidth = Math.random() * 3 + 0.5;
      const y = Math.random() * s;
      g.beginPath();
      g.moveTo(0, y);
      g.bezierCurveTo(s * 0.3, y + (Math.random() - 0.5) * 12, s * 0.7, y + (Math.random() - 0.5) * 12, s, y);
      g.stroke();
    }
  });
const gridTile = (base: string, line: string, n: number) =>
  canvasTex(256, (g, s) => {
    g.fillStyle = base;
    g.fillRect(0, 0, s, s);
    noise(g, s, 2500, 0.06, false);
    g.strokeStyle = line;
    g.lineWidth = 2;
    for (let i = 0; i <= n; i++) {
      const p = (i * s) / n;
      g.beginPath(); g.moveTo(p, 0); g.lineTo(p, s); g.stroke();
      g.beginPath(); g.moveTo(0, p); g.lineTo(s, p); g.stroke();
    }
  }, 3);
const checkerTex = () =>
  canvasTex(256, (g, s) => {
    const n = 8, q = s / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      g.fillStyle = (i + j) % 2 ? "#a4603f" : "#c9a37f";
      g.fillRect(i * q, j * q, q, q);
    }
    noise(g, s, 3000, 0.1, false);
  }, 3);
const woolTex = () =>
  canvasTex(256, (g, s) => {
    g.fillStyle = "#dcbf6a";
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < 900; i++) {
      g.strokeStyle = `rgba(${Math.random() > 0.5 ? "255,240,190" : "150,115,40"},${Math.random() * 0.35})`;
      g.beginPath();
      const x = Math.random() * s, y = Math.random() * s;
      g.moveTo(x, y);
      g.quadraticCurveTo(x + 10, y + (Math.random() - 0.5) * 20, x + 24, y + (Math.random() - 0.5) * 8);
      g.stroke();
    }
  });
const boardTex = () =>
  canvasTex(256, (g, s) => {
    g.fillStyle = "#b8c4b6";
    g.fillRect(0, 0, s, s);
    noise(g, s, 3000, 0.05, false);
    g.fillStyle = "rgba(60,60,60,0.5)";
    for (let y = 16; y < s; y += 48) for (const x of [10, s / 2, s - 10]) g.fillRect(x - 1.5, y - 1.5, 3, 3);
  });

/* ---------------- Cena ---------------- */
export function createRenoScene(host: HTMLElement, opts: { mobile: boolean }): RenoScene {
  const { mobile } = opts;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.6 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);

  /* Luzes */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc8bd, 0.55));
  const key = new THREE.DirectionalLight(0xfff3e4, 2.3);
  key.position.set(4.5, 7, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 1, far: 20 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe6ecf8, 0.45);
  fill.position.set(-5, 3, 2);
  scene.add(fill);
  const warm = new THREE.PointLight(0xffc98a, 0, 3.2, 2);
  warm.position.set(0.3, 1.7, -0.45);
  scene.add(warm);
  const spot = new THREE.SpotLight(0xffe2b8, 0, 5, 0.85, 0.7, 1.5);
  spot.position.set(-0.3, 2.3, -0.4);
  spot.target.position.set(-0.3, 0, -0.2);
  scene.add(spot, spot.target);

  /* Chão de sombra */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0.14 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.22;
  ground.receiveShadow = true;
  scene.add(ground);

  /* Materiais */
  const T = {
    brick: brickTex(), concrete: concreteTex(), wood: woodTex(), wool: woolTex(), board: boardTex(),
    oldGreen: gridTile("#a9c3b3", "rgba(255,255,255,0.8)", 8), oldPink: gridTile("#dcb3ab", "rgba(255,255,255,0.8)", 8),
    checker: checkerTex(), floorStone: stoneTex("#d9d2c6"), wallStone: stoneTex("#e4dccf"), showerStone: stoneTex("#b9a891"),
    trayStone: stoneTex("#efece6", false),
  };
  const std = (o: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(o);
  const MAT = {
    brick: std({ map: T.brick, roughness: 0.9 }),
    concrete: std({ map: T.concrete, roughness: 0.95 }),
    screed: std({ color: 0xb3aea6, map: T.concrete, roughness: 0.95 }),
    oldGreen: std({ map: T.oldGreen, roughness: 0.4 }),
    oldPink: std({ map: T.oldPink, roughness: 0.4 }),
    oldPaint: std({ color: 0xe8dcb8, roughness: 0.9 }),
    checker: std({ map: T.checker, roughness: 0.5 }),
    ceramic: std({ color: 0xf6f5f2, roughness: 0.22, metalness: 0 }),
    oldCeramic: std({ color: 0xf1efe6, roughness: 0.3 }),
    pvc: std({ color: 0x8e9396, roughness: 0.5 }),
    pexRed: std({ color: 0xc8432f, roughness: 0.45 }),
    pexBlue: std({ color: 0x2f6fb5, roughness: 0.45 }),
    conduit: std({ color: 0x3a3a3a, roughness: 0.6 }),
    jbox: std({ color: 0xe0782f, roughness: 0.5 }),
    steel: std({ color: 0xbfc3c6, roughness: 0.35, metalness: 0.85 }),
    wool: std({ map: T.wool, roughness: 1 }),
    board: std({ map: T.board, roughness: 0.85 }),
    membrane: std({ color: 0x7f95a4, roughness: 0.55 }),
    floorTile: std({ map: T.floorStone, roughness: 0.32 }),
    wallTile: std({ map: T.wallStone, roughness: 0.28 }),
    showerTile: std({ map: T.showerStone, roughness: 0.3 }),
    tray: std({ map: T.trayStone, roughness: 0.45 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.2, envMapIntensity: 1.4 }),
    black: std({ color: 0x1b1b1b, roughness: 0.4, metalness: 0.4 }),
    chrome: std({ color: 0xe8e8e8, roughness: 0.12, metalness: 1 }),
    brushed: std({ color: 0xcfcfcf, roughness: 0.38, metalness: 1 }),
    mirror: std({ color: 0xffffff, roughness: 0.02, metalness: 1 }),
    wood: std({ map: T.wood, roughness: 0.55 }),
    counter: std({ map: T.trayStone, roughness: 0.3 }),
    led: std({ color: 0xfff3dc, emissive: 0xffd49a, emissiveIntensity: 0 }),
    halo: std({ color: 0x000000, emissive: 0xffc98a, emissiveIntensity: 0, transparent: true, opacity: 0.95 }),
    plant: std({ color: 0x4f7a43, roughness: 0.6 }),
    pot: std({ color: 0x2a2a2a, roughness: 0.7 }),
    rubble: std({ color: 0x9c8f80, roughness: 1 }),
    bag: std({ color: 0xeae7df, roughness: 0.8 }),
    bottle: std({ color: 0xd8cbb6, roughness: 0.3 }),
  };

  /* Construtores */
  const pieces: Piece[] = [];
  const meshOf = (geo: THREE.BufferGeometry, mat: THREE.Material, shadow = true) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = shadow;
    m.receiveShadow = true;
    return m;
  };
  /** Caixa definida pelos limites; origem na base (para "rise"). */
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, mat: THREE.Material, r = 0) => {
    const w = x1 - x0, h = y1 - y0, d = z1 - z0;
    const geo = r > 0 ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d);
    geo.translate(0, h / 2, 0);
    const m = meshOf(geo, mat);
    m.position.set((x0 + x1) / 2, y0, (z0 + z1) / 2);
    return m;
  };
  const Y = new THREE.Vector3(0, 1, 0);
  /** Tubo de A para B; origem em A (para "grow"). */
  const pipe = (a: [number, number, number], b: [number, number, number], r: number, mat: THREE.Material) => {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const dir = B.clone().sub(A);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(r, r, len, 16);
    geo.translate(0, len / 2, 0);
    const m = meshOf(geo, mat);
    m.position.copy(A);
    m.quaternion.setFromUnitVectors(Y, dir.normalize());
    return m;
  };
  const group = (...objs: THREE.Object3D[]) => {
    const g = new THREE.Group();
    objs.forEach((o) => g.add(o));
    return g;
  };
  const add = (obj: THREE.Object3D, a: number, b: number, mode: Mode = "fade", extra: { c?: number; e?: number; from?: [number, number, number] } = {}) => {
    const mats: THREE.Material[] = [];
    obj.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const m = (mesh.material as THREE.Material).clone();
        m.userData.baseOpacity = (m as THREE.MeshStandardMaterial).opacity ?? 1;
        m.userData.baseTransparent = m.transparent;
        mesh.material = m;
        mats.push(m);
      }
    });
    scene.add(obj);
    pieces.push({
      obj, a, b, c: extra.c, e: extra.e, mode,
      from: new THREE.Vector3(...(extra.from ?? [0, 0, 0.9])),
      basePos: obj.position.clone(), baseScale: obj.scale.clone(), mats, lastOp: -1,
    });
  };
  const PRE = [-1, 0] as const; // já existe no início

  /* ===== Estrutura existente ===== */
  add(box(-1.35, 1.25, -0.22, 0, -1.15, 1.05, MAT.concrete), ...PRE, "none");
  add(box(-1.35, 1.25, 0, 2.55, -1.15, -1.0, MAT.brick), ...PRE, "none");
  add(box(-1.35, -1.2, 0, 2.55, -1.0, 1.05, MAT.brick), ...PRE, "none");
  add(box(-1.35, 1.25, 2.55, 2.72, -1.15, -0.25, MAT.concrete), ...PRE, "none");

  /* ===== 1 · Casa de banho antiga (demolição) ===== */
  add(box(-1.2, 1.2, 0, 0.1, -1.0, 1.0, MAT.screed), ...PRE, "none", { c: 0.1, e: 0.135 });
  add(box(-1.2, 1.2, 0.1, 0.115, -1.0, 1.0, MAT.checker), ...PRE, "none", { c: 0.085, e: 0.12 });
  add(box(-1.2, 1.2, 0.1, 1.6, -1.0, -0.988, MAT.oldGreen), ...PRE, "none", { c: 0.05, e: 0.09 });
  add(box(-1.2, 1.2, 1.6, 2.55, -1.0, -0.992, MAT.oldPaint), ...PRE, "none", { c: 0.06, e: 0.1 });
  add(box(-1.2, -1.188, 0.1, 1.6, -0.988, 1.0, MAT.oldPink), ...PRE, "none", { c: 0.055, e: 0.095 });
  add(box(-1.2, -1.192, 1.6, 2.55, -0.988, 1.0, MAT.oldPaint), ...PRE, "none", { c: 0.065, e: 0.105 });
  add(group(box(-1.18, 0.28, 0.115, 0.6, -0.985, -0.3, MAT.oldCeramic, 0.06), box(-1.1, 0.2, 0.45, 0.602, -0.92, -0.37, MAT.membrane, 0.04)), ...PRE, "none", { c: 0.015, e: 0.05 });
  add(group(pipe([0.65, 0.115, -0.82], [0.65, 0.68, -0.82], 0.08, MAT.oldCeramic), box(0.38, 0.92, 0.68, 0.84, -0.985, -0.6, MAT.oldCeramic, 0.05)), ...PRE, "none", { c: 0.025, e: 0.06 });
  add(group(pipe([1.0, 0.115, -0.68], [1.0, 0.5, -0.68], 0.17, MAT.oldCeramic), box(0.8, 1.2, 0.5, 0.9, -0.985, -0.8, MAT.oldCeramic, 0.04)), ...PRE, "none", { c: 0.03, e: 0.07 });
  add(box(0.4, 0.9, 1.25, 1.85, -0.988, -0.89, MAT.oldPaint, 0.02), ...PRE, "none", { c: 0.02, e: 0.055 });
  // entulho e sacos
  const rubbleSpots: [number, number, number][] = [[-0.6, 0.1, 0.2], [-0.2, 0.08, 0.5], [0.3, 0.1, 0.1], [0.6, 0.07, 0.55], [-0.9, 0.09, 0.6], [0.1, 0.06, -0.3], [-0.4, 0.08, -0.4], [0.8, 0.09, 0.2]];
  rubbleSpots.forEach(([x, r, z], i) => {
    const m = meshOf(new THREE.DodecahedronGeometry(r, 0), i % 3 ? MAT.rubble : MAT.brick);
    m.position.set(x, 0.12 + r * 0.6, z);
    m.rotation.set(i, i * 2, i * 0.5);
    add(m, 0.05 + i * 0.004, 0.075 + i * 0.004, "pop", { c: 0.105, e: 0.13 });
  });
  add(box(0.55, 0.9, 0.115, 0.45, 0.55, 0.9, MAT.bag, 0.08), 0.07, 0.09, "drop", { c: 0.11, e: 0.13 });
  add(box(0.15, 0.48, 0.115, 0.4, 0.62, 0.95, MAT.bag, 0.08), 0.075, 0.095, "drop", { c: 0.11, e: 0.13 });

  /* ===== 2 · Canalização, esgotos e eletricidade ===== */
  add(pipe([0.95, 0.06, -0.9], [0.95, 0.06, 1.08], 0.055, MAT.pvc), 0.13, 0.18, "grow");
  add(pipe([-0.7, 0.05, -0.45], [0.95, 0.05, -0.45], 0.04, MAT.pvc), 0.15, 0.19, "grow");
  add(pipe([0.3, 0.05, -0.92], [0.3, 0.05, -0.45], 0.035, MAT.pvc), 0.17, 0.2, "grow");
  add(pipe([-0.05, 0.035, 1.08], [-0.05, 0.035, -0.97], 0.013, MAT.pexBlue), 0.19, 0.23, "grow");
  add(pipe([-0.1, 0.035, 1.08], [-0.1, 0.035, -0.97], 0.013, MAT.pexRed), 0.2, 0.24, "grow");
  add(pipe([-0.05, 0.035, -0.975], [-0.05, 0.28, -0.975], 0.013, MAT.pexBlue), 0.225, 0.24, "grow");
  add(pipe([-0.1, 0.035, -0.975], [-0.1, 0.34, -0.975], 0.013, MAT.pexRed), 0.235, 0.25, "grow");
  add(pipe([-0.05, 0.28, -0.975], [-1.1, 0.28, -0.975], 0.013, MAT.pexBlue), 0.24, 0.27, "grow");
  add(pipe([-0.05, 0.28, -0.975], [1.0, 0.28, -0.975], 0.013, MAT.pexBlue), 0.245, 0.275, "grow");
  add(pipe([-0.1, 0.34, -0.975], [-0.76, 0.34, -0.975], 0.013, MAT.pexRed), 0.25, 0.275, "grow");
  add(pipe([-0.1, 0.34, -0.975], [0.36, 0.34, -0.975], 0.013, MAT.pexRed), 0.255, 0.28, "grow");
  add(pipe([-0.7, 0.28, -0.975], [-0.7, 1.05, -0.975], 0.013, MAT.pexBlue), 0.27, 0.29, "grow");
  add(pipe([-0.76, 0.34, -0.975], [-0.76, 1.05, -0.975], 0.013, MAT.pexRed), 0.275, 0.295, "grow");
  add(pipe([-0.73, 1.05, -0.975], [-0.73, 2.08, -0.975], 0.013, MAT.pexBlue), 0.285, 0.305, "grow");
  add(pipe([0.24, 0.28, -0.975], [0.24, 0.58, -0.975], 0.013, MAT.pexBlue), 0.28, 0.295, "grow");
  add(pipe([0.36, 0.34, -0.975], [0.36, 0.58, -0.975], 0.013, MAT.pexRed), 0.285, 0.3, "grow");
  add(pipe([0.95, 0.28, -0.975], [0.95, 0.9, -0.975], 0.013, MAT.pexBlue), 0.29, 0.305, "grow");
  add(pipe([-1.15, 2.2, -0.975], [0.3, 2.2, -0.975], 0.012, MAT.conduit), 0.29, 0.31, "grow");
  add(pipe([0.3, 2.2, -0.975], [0.3, 1.72, -0.975], 0.012, MAT.conduit), 0.305, 0.315, "grow");
  add(pipe([-1.175, 0.15, 0.6], [-1.175, 2.2, 0.6], 0.012, MAT.conduit), 0.3, 0.315, "grow");
  add(box(0.25, 0.35, 1.62, 1.72, -0.99, -0.96, MAT.jbox), 0.31, 0.32, "pop");
  add(box(-1.19, -1.16, 1.0, 1.1, 0.55, 0.65, MAT.jbox), 0.31, 0.32, "pop");

  /* ===== 3 · Estrutura metálica, isolamento e betonilha ===== */
  [-1.175, -0.6, 0, 0.6, 1.175].forEach((x, i) => add(box(x - 0.025, x + 0.025, 0, 2.38, -1.0, -0.95, MAT.steel), 0.32 + i * 0.008, 0.345 + i * 0.008, "rise"));
  add(box(-1.2, 1.2, 0, 0.04, -1.0, -0.95, MAT.steel), 0.33, 0.35, "grow");
  add(box(-1.2, 1.2, 2.34, 2.38, -1.0, -0.95, MAT.steel), 0.335, 0.355, "drop");
  [-0.975, -0.4, 0.2, 0.975].forEach((z, i) => add(box(-1.2, -1.15, 0, 2.38, z - 0.025, z + 0.025, MAT.steel), 0.345 + i * 0.008, 0.37 + i * 0.008, "rise"));
  add(group(box(0.78, 1.12, 0.12, 1.1, -0.99, -0.95, MAT.steel), box(0.82, 1.08, 0.8, 1.06, -0.995, -0.952, MAT.ceramic)), 0.37, 0.39, "rise");
  [[-1.15, -0.625], [-0.575, -0.025], [0.025, 0.575]].forEach(([x0, x1], i) => add(box(x0 + 0.005, x1 - 0.005, 0.04, 2.34, -0.995, -0.96, MAT.wool), 0.385 + i * 0.01, 0.405 + i * 0.01, "pop"));
  [[-0.95, -0.425], [-0.375, 0.175], [0.225, 0.95]].forEach(([z0, z1], i) => add(box(-1.195, -1.16, 0.04, 2.34, z0 + 0.005, z1 - 0.005, MAT.wool), 0.4 + i * 0.01, 0.42 + i * 0.01, "pop"));
  add(box(-1.2, 1.2, 0, 0.12, -0.95, 1.0, MAT.screed), 0.43, 0.48, "rise");

  /* ===== 4 · Placas hidrófugas, teto falso e impermeabilização ===== */
  [[-1.2, -0.6], [-0.6, 0], [0, 0.6], [0.6, 1.2]].forEach(([x0, x1], i) => add(box(x0 + 0.002, x1 - 0.002, 0.12, 2.38, -0.95, -0.9375, MAT.board), 0.48 + i * 0.012, 0.505 + i * 0.012, "slide", { from: [0, 0, 0.8] }));
  [[-0.9375, -0.45], [-0.45, 0.1], [0.1, 0.55], [0.55, 1.0]].forEach(([z0, z1], i) => add(box(-1.15, -1.1375, 0.12, 2.38, z0 + 0.002, z1 - 0.002, MAT.board), 0.505 + i * 0.012, 0.53 + i * 0.012, "slide", { from: [0, 0, 1.3] }));
  [-0.9, 0, 0.9].forEach((x, i) => add(pipe([x, 2.55, -0.62], [x, 2.4, -0.62], 0.006, MAT.steel), 0.54 + i * 0.005, 0.555 + i * 0.005, "grow"));
  add(box(-1.1375, 1.25, 2.38, 2.4, -0.9375, -0.3, MAT.board), 0.555, 0.58, "drop");
  add(box(-1.2, 1.2, 0.12, 0.124, -0.95, 1.0, MAT.membrane), 0.58, 0.6, "fade");
  add(box(-1.1375, -0.2, 0.12, 2.1, -0.9375, -0.934, MAT.membrane), 0.585, 0.61, "rise");
  add(box(-1.1375, -1.134, 0.12, 2.1, -0.934, -0.05, MAT.membrane), 0.59, 0.615, "rise");

  /* ===== 5 · Revestimentos peça a peça ===== */
  let k = 0;
  for (let zi = 0; zi < 4; zi++) {
    for (let xi = 0; xi < 4; xi++) {
      const x0 = -1.134 + xi * 0.5835, z0 = -0.934 + zi * 0.4835;
      const a = 0.62 + k * 0.0075;
      add(box(x0 + 0.003, x0 + 0.5805, 0.124, 0.14, z0 + 0.003, z0 + 0.4805, MAT.floorTile, 0.004), a, a + 0.02, "drop");
      k++;
    }
  }
  k = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const x0 = -1.134 + col * 0.5835;
      const shower = col < 2;
      const y0 = 0.14 + row * 1.12;
      const a = 0.67 + k * 0.008;
      add(box(x0 + 0.002, x0 + 0.5815, y0 + 0.002, y0 + 1.118, -0.934, -0.924, shower ? MAT.showerTile : MAT.wallTile, 0.003), a, a + 0.022, "slide", { from: [0, 0, 0.7] });
      k++;
    }
  }
  k = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const z0 = -0.924 + col * 0.481;
      const y0 = 0.14 + row * 1.12;
      const a = 0.705 + k * 0.008;
      add(box(-1.134, -1.124, y0 + 0.002, y0 + 1.118, z0 + 0.002, z0 + 0.479, col < 2 ? MAT.showerTile : MAT.wallTile, 0.003), a, a + 0.022, "slide", { from: [0, 0, 1.2] });
      k++;
    }
  }
  // nicho com LED e frascos
  add(group(box(-0.95, -0.45, 1.05, 1.32, -0.924, -0.92, MAT.showerTile), box(-0.94, -0.46, 1.3, 1.31, -0.924, -0.912, MAT.led)), 0.775, 0.79, "fade");
  add(group(pipe([-0.8, 1.06, -0.9], [-0.8, 1.2, -0.9], 0.025, MAT.bottle), pipe([-0.72, 1.06, -0.9], [-0.72, 1.17, -0.9], 0.022, MAT.ceramic)), 0.79, 0.8, "pop");

  /* ===== 6 · Loiças, móveis e iluminação ===== */
  add(box(-1.124, -0.2, 0.14, 0.165, -0.924, -0.05, MAT.tray, 0.01), 0.8, 0.825, "drop");
  add(box(-0.95, -0.4, 0.165, 0.168, -0.6, -0.55, MAT.brushed), 0.815, 0.83, "fade");
  {
    const glass = box(-0.215, -0.207, 0.165, 2.1, -0.924, -0.12, MAT.glass);
    glass.castShadow = false;
    add(group(glass, box(-0.218, -0.204, 2.1, 2.115, -0.924, -0.12, MAT.black), box(-0.218, -0.204, 0.165, 2.115, -0.924, -0.905, MAT.black)), 0.825, 0.85, "drop");
  }
  add(group(pipe([-0.73, 2.05, -0.924], [-0.73, 2.05, -0.62], 0.012, MAT.chrome), pipe([-0.73, 2.02, -0.62], [-0.73, 2.05, -0.62], 0.14, MAT.chrome)), 0.84, 0.86, "drop");
  add(group(box(-0.78, -0.68, 1.0, 1.12, -0.924, -0.89, MAT.chrome, 0.01), pipe([-0.73, 1.06, -0.89], [-0.73, 1.06, -0.84], 0.012, MAT.chrome)), 0.845, 0.86, "pop");
  add(group(box(-0.1, 0.7, 0.45, 0.85, -0.924, -0.464, MAT.wood, 0.01), box(-0.095, 0.695, 0.645, 0.652, -0.466, -0.462, MAT.black)), 0.85, 0.875, "slide", { from: [0, 0, 0.9] });
  add(box(-0.11, 0.71, 0.85, 0.88, -0.924, -0.45, MAT.counter, 0.008), 0.865, 0.885, "drop");
  {
    const prof = [new THREE.Vector2(0, 0), new THREE.Vector2(0.15, 0), new THREE.Vector2(0.19, 0.13), new THREE.Vector2(0.18, 0.13), new THREE.Vector2(0.14, 0.015), new THREE.Vector2(0, 0.015)];
    const basin = meshOf(new THREE.LatheGeometry(prof, 48), MAT.ceramic);
    (basin.material as THREE.Material).side = THREE.DoubleSide;
    basin.position.set(0.3, 0.88, -0.69);
    add(basin, 0.875, 0.895, "drop");
  }
  add(group(pipe([0.3, 0.88, -0.88], [0.3, 1.08, -0.88], 0.014, MAT.chrome), pipe([0.3, 1.08, -0.885], [0.3, 1.08, -0.76], 0.012, MAT.chrome)), 0.885, 0.9, "pop");
  {
    const halo = box(-0.04, 0.64, 1.24, 2.06, -0.9235, -0.9232, MAT.halo);
    halo.castShadow = false;
    add(group(halo, box(0.0, 0.6, 1.28, 2.02, -0.92, -0.9, MAT.mirror, 0.06)), 0.885, 0.91, "fade");
  }
  add(group(box(0.77, 1.13, 0.28, 0.56, -0.924, -0.4, MAT.ceramic, 0.09), box(0.765, 1.135, 0.56, 0.58, -0.92, -0.39, MAT.ceramic, 0.012)), 0.895, 0.92, "slide", { from: [0, 0, 0.8] });
  add(box(0.84, 1.06, 0.95, 1.1, -0.924, -0.916, MAT.brushed, 0.006), 0.905, 0.92, "pop");
  add(group(
    pipe([-1.11, 0.7, 0.35], [-1.11, 1.5, 0.35], 0.012, MAT.chrome),
    pipe([-1.11, 0.7, 0.75], [-1.11, 1.5, 0.75], 0.012, MAT.chrome),
    ...[0.8, 0.96, 1.12, 1.28, 1.44].map((y) => pipe([-1.11, y, 0.35], [-1.11, y, 0.75], 0.008, MAT.chrome))
  ), 0.91, 0.93, "pop");
  {
    const leaves: THREE.Object3D[] = [];
    for (let i = 0; i < 9; i++) {
      const l = meshOf(new THREE.SphereGeometry(0.05, 12, 8), MAT.plant);
      l.scale.set(0.35, 1.4, 0.7);
      const ang = (i / 9) * Math.PI * 2;
      l.position.set(0.62 + Math.cos(ang) * 0.04, 1.02 + (i % 3) * 0.03, -0.8 + Math.sin(ang) * 0.04);
      l.rotation.set(Math.sin(ang) * 0.6, ang, Math.cos(ang) * 0.6);
      leaves.push(l);
    }
    add(group(pipe([0.62, 0.88, -0.8], [0.62, 0.98, -0.8], 0.05, MAT.pot), ...leaves), 0.925, 0.945, "pop");
  }
  /* ===== Secção em corte (frente): camadas do pavimento à vista ===== */
  add(box(-1.2, 1.2, -0.22, 0.0, 1.0, 1.05, MAT.concrete), ...PRE, "none");
  add(box(-1.2, 1.2, 0, 0.12, 1.0, 1.04, MAT.screed), 0.43, 0.48, "rise");
  add(box(-1.2, 1.2, 0.12, 0.124, 0.99, 1.03, MAT.membrane), 0.58, 0.6, "fade");
  add(box(-1.2, 1.2, 0.124, 0.14, 0.985, 1.0, MAT.floorTile), 0.74, 0.76, "fade");

  const ledStrip = box(-1.1, 1.2, 2.37, 2.38, -0.32, -0.3, MAT.led);
  ledStrip.castShadow = false;
  add(ledStrip, 0.6, 0.62, "fade");
  [-0.65, 0.3].forEach((x, i) => {
    const d = pipe([x, 2.37, -0.62], [x, 2.38, -0.62], 0.05, MAT.led);
    d.castShadow = false;
    add(d, 0.6 + i * 0.005, 0.62 + i * 0.005, "fade");
  });

  // materiais emissivos a animar no fim
  const glowMats: THREE.MeshStandardMaterial[] = [];
  pieces.forEach((pc) => pc.mats.forEach((m) => {
    const s = m as THREE.MeshStandardMaterial;
    if (s.emissive && (s.emissive.r > 0 || s.emissive.g > 0)) glowMats.push(s);
  }));

  /* ---------------- Animação ---------------- */
  const target = new THREE.Vector3();
  let current = -1;
  let raf = 0;
  let aspect = 1;

  const setOpacity = (pc: Piece, op: number) => {
    if (Math.abs(op - pc.lastOp) < 0.001) return;
    pc.lastOp = op;
    pc.mats.forEach((m) => {
      const base = m.userData.baseOpacity as number;
      const wantT = op < 0.999 || (m.userData.baseTransparent as boolean);
      if (m.transparent !== wantT) {
        m.transparent = wantT;
        m.needsUpdate = true;
      }
      m.opacity = base * op;
    });
  };

  const apply = (p: number) => {
    for (const pc of pieces) {
      const t = ease(clamp01((p - pc.a) / (pc.b - pc.a)));
      const u = pc.c !== undefined ? ease(clamp01((p - pc.c) / ((pc.e as number) - pc.c))) : 0;
      const vis = t > 0.002 && u < 0.998;
      pc.obj.visible = vis;
      if (!vis) continue;
      pc.obj.position.copy(pc.basePos);
      pc.obj.scale.copy(pc.baseScale);
      let op = 1;
      switch (pc.mode) {
        case "drop": pc.obj.position.y += (1 - t) * 1.3; op = Math.min(1, t * 2.2); break;
        case "slide": pc.obj.position.addScaledVector(pc.from, 1 - t); op = Math.min(1, t * 2.2); break;
        case "rise": pc.obj.scale.y = Math.max(0.001, t); break;
        case "grow": pc.obj.scale.y = Math.max(0.001, t); break;
        case "pop": pc.obj.scale.multiplyScalar(0.6 + 0.4 * t); op = t; break;
        case "fade": op = t; break;
      }
      if (u > 0) {
        pc.obj.position.y += u * 0.9;
        op *= 1 - u;
      }
      setOpacity(pc, op);
    }
    const glow = ease(clamp01((p - 0.9) / 0.09));
    glowMats.forEach((m) => (m.emissiveIntensity = (m.userData.glowMax ?? 2.6) * glow));
    warm.intensity = 3.2 * glow;
    spot.intensity = 9 * glow;
    key.intensity = 2.3 - 0.5 * glow;
    renderer.toneMappingExposure = 1.05 + 0.12 * glow;

    // câmara: órbita suave + aproximação
    const az = THREE.MathUtils.degToRad(lerp(46, 30, p));
    const el = THREE.MathUtils.degToRad(lerp(26, 20, p));
    let r = lerp(9.4, 8.4, p);
    if (aspect < 0.95) r *= 0.95 / aspect;
    target.set(lerp(-0.05, 0.0, p), lerp(1.1, 1.05, p), -0.05);
    camera.position.set(target.x + r * Math.cos(el) * Math.sin(az), target.y + r * Math.sin(el), target.z + r * Math.cos(el) * Math.cos(az));
    camera.lookAt(target);
  };

  const render = () => {
    raf = 0;
    renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  const resize = () => {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    aspect = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    apply(Math.max(0, current));
    schedule();
  };

  resize();

  const tmpV = new THREE.Vector3();
  return {
    project(x: number, y: number, z: number) {
      tmpV.set(x, y, z).project(camera);
      return { x: (tmpV.x * 0.5 + 0.5) * (host.clientWidth || 1), y: (-tmpV.y * 0.5 + 0.5) * (host.clientHeight || 1) };
    },
    setProgress(p: number) {
      if (Math.abs(p - current) < 0.0004) return;
      current = p;
      apply(p);
      schedule();
    },
    resize,
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry.dispose();
          (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose());
        }
      });
      Object.values(T).forEach((t) => t.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
