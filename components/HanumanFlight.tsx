import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ============================================================================
   HANUMAN'S LEAP — An immersive WebGL flight across the ocean to Lanka
   - Custom GLSL ocean (Gerstner-like sums) + procedural sky dome
   - Scroll progress (0 → 1) controls camera dolly + encounter reveals
   - Encounters: Mahendragiri launch · Mainaka · Surasa · Sinhika · Lanka
   - HTML narrative milestones overlay the canvas
   ========================================================================== */

type Milestone = {
  id: string;
  start: number;          // progress 0..1 when this milestone starts fading in
  end: number;            // progress when this milestone has fully faded out
  sanskrit: string;
  english: string;
  title: string;
  body: string;
};

const MILESTONES: Milestone[] = [
  {
    id: 'launch',
    start: 0.0,
    end: 0.18,
    sanskrit: 'मनोजवं मारुततुल्यवेगम्',
    english: 'Swift as thought, swift as the wind himself',
    title: 'I · Mahendragiri',
    body:
      'On the summit of Mount Mahendra, the son of the Wind crouches. The mountain trembles, the trees bow, and with a single breath he rises — a comet of devotion hurled across the southern sea.',
  },
  {
    id: 'mainaka',
    start: 0.18,
    end: 0.38,
    sanskrit: 'विश्राम्यतां वत्स',
    english: '“Rest awhile, dear child” — Mount Mainaka',
    title: 'II · Mount Mainaka rises',
    body:
      'The golden mountain Mainaka surges from the deep, offering rest to the flying hero. Hanuman touches him in gratitude — but does not pause. His vow allows no rest until Sita is found.',
  },
  {
    id: 'surasa',
    start: 0.38,
    end: 0.58,
    sanskrit: 'सूक्ष्मरूपेण प्रविश्य निर्गतः',
    english: 'Entering tiny, he slipped free in a flash',
    title: 'III · Surasa, mother of serpents',
    body:
      'Surasa rises from the waves, her jaws an abyss. Hanuman swells to a hundred yojanas — she opens wider. Then, in a heartbeat, he shrinks to the size of a thumb, darts through her mouth, and is gone.',
  },
  {
    id: 'sinhika',
    start: 0.58,
    end: 0.78,
    sanskrit: 'छायाग्राहिणी निहता',
    english: 'The shadow-catcher, slain in mid-flight',
    title: 'IV · Sinhika of the grasping shadow',
    body:
      'Below the waves lurks Sinhika, who seizes flying beings by their shadow. She drags Hanuman down — but he tears through her body from within and bursts back into the storming sky.',
  },
  {
    id: 'lanka',
    start: 0.78,
    end: 1.001,
    sanskrit: 'लङ्कां प्राप्तो महाबलः',
    english: 'The mighty one reaches Lanka',
    title: 'V · Trikuta, the citadel of Lanka',
    body:
      'The golden city blazes upon three peaks. Hanuman alights on Trikuta as the last light fades — small now, silent, a single bead of devotion against the empire of demons. The first chapter of the rescue has begun.',
  },
];

/* ----------------------------- shader helpers ----------------------------- */
const oceanVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying float vH;
  varying vec2 vUv;

  // Sum of sines that look like Gerstner waves
  float wave(vec2 p, vec2 dir, float amp, float freq, float speed, float t) {
    return sin(dot(p, dir) * freq + t * speed) * amp;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime;
    // Progress also stirs up the sea — storms intensify in mid-journey
    float storm = smoothstep(0.30, 0.65, uProgress) * (1.0 - smoothstep(0.78, 0.95, uProgress));
    float amp1 = 4.0 + storm * 6.0;
    float amp2 = 2.4 + storm * 3.5;
    float amp3 = 1.2 + storm * 2.0;

    float h = 0.0;
    h += wave(pos.xy, normalize(vec2( 1.0, 0.4)), amp1, 0.018, 0.55, t);
    h += wave(pos.xy, normalize(vec2(-0.6, 1.0)), amp2, 0.034, 0.85, t);
    h += wave(pos.xy, normalize(vec2( 0.2,-1.0)), amp3, 0.071, 1.20, t);
    h += wave(pos.xy, normalize(vec2( 1.0,-0.7)), amp3 * 0.6, 0.110, 1.60, t);

    pos.z += h;
    vH = h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const oceanFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uProgress;
  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uFoam;
  varying float vH;
  varying vec2 vUv;

  void main() {
    // Base water gradient based on wave height
    float k = smoothstep(-8.0, 12.0, vH);
    vec3 col = mix(uDeep, uShallow, k);

    // Crest foam where the height is highest
    float foam = smoothstep(7.5, 11.5, vH);
    col = mix(col, uFoam, foam * 0.85);

    // Sun glitter — a moving specular streak along v
    float glitter = pow(max(0.0, sin((vUv.x + uTime * 0.05) * 280.0) * 0.5 + 0.5), 24.0);
    glitter *= smoothstep(0.30, 0.55, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
    col += vec3(1.0, 0.78, 0.45) * glitter * 0.35;

    // Distance haze toward the horizon (top of plane)
    float haze = smoothstep(0.55, 1.0, vUv.y);
    vec3 horizon = mix(vec3(0.10, 0.05, 0.20), vec3(0.85, 0.35, 0.20), uProgress);
    col = mix(col, horizon, haze * 0.65);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const skyVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vWorld = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragment = /* glsl */ `
  precision highp float;
  uniform float uProgress;
  uniform float uTime;
  varying vec3 vWorld;

  // Hash for pseudo stars
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

  void main() {
    vec3 dir = normalize(vWorld);
    float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);

    // Three sky palettes blended by journey progress
    // Night → Dawn → Storm → Lanka glow
    vec3 night  = mix(vec3(0.02,0.01,0.06), vec3(0.07,0.04,0.16), h);
    vec3 dawn   = mix(vec3(0.45,0.15,0.25), vec3(0.10,0.05,0.22), h);
    vec3 storm  = mix(vec3(0.16,0.10,0.20), vec3(0.04,0.03,0.10), h);
    vec3 lanka  = mix(vec3(0.55,0.20,0.10), vec3(0.10,0.04,0.18), h);

    float a = smoothstep(0.0, 0.30, uProgress);
    float b = smoothstep(0.30, 0.65, uProgress);
    float c = smoothstep(0.65, 1.00, uProgress);

    vec3 col = night;
    col = mix(col, dawn,  a);
    col = mix(col, storm, b);
    col = mix(col, lanka, c);

    // Sun / moon glow on horizon
    float sun = pow(max(0.0, 1.0 - length(dir.xy - vec2(0.55, 0.05)) * 1.8), 6.0);
    col += vec3(1.0, 0.65, 0.35) * sun * (0.55 + 0.45 * uProgress);

    // Stars (only when sky is dark)
    vec2 sp = floor(dir.xz * 220.0);
    float s = step(0.997, hash(sp));
    float starFade = (1.0 - smoothstep(0.05, 0.35, uProgress)) * smoothstep(0.05, 0.6, dir.y);
    col += vec3(0.95, 0.92, 0.75) * s * starFade;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* --------------------------- procedural Hanuman --------------------------- */
function buildHanuman(): THREE.Group {
  const g = new THREE.Group();

  // Materials
  const skin = new THREE.MeshStandardMaterial({
    color: 0xc1440e, roughness: 0.55, metalness: 0.15, emissive: 0x3a0d02, emissiveIntensity: 0.4,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: 0xf5d061, roughness: 0.25, metalness: 0.95, emissive: 0xd4af37, emissiveIntensity: 0.55,
  });
  const cloth = new THREE.MeshStandardMaterial({
    color: 0xff8c42, roughness: 0.5, metalness: 0.2, emissive: 0x6b1a00, emissiveIntensity: 0.35,
  });

  // Body — barrel chest
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(2.4, 3.0, 6, 12), skin);
  torso.rotation.z = Math.PI / 2;
  g.add(torso);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 18), skin);
  head.position.set(4.4, 0.6, 0);
  g.add(head);

  // Snout
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), skin);
  snout.position.set(5.7, 0.35, 0);
  snout.scale.set(1.1, 0.8, 0.85);
  g.add(snout);

  // Crown
  const crown = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.6, 12), gold);
  crown.position.set(4.3, 2.1, 0);
  g.add(crown);

  // Front arm extended forward (the famous Hanuman pose)
  const armFront = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 4.6, 5, 10), skin);
  armFront.rotation.z = Math.PI / 2;
  armFront.position.set(6.2, -0.2, 1.0);
  g.add(armFront);

  // Fist (front) holding gada (mace)
  const fist = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12), skin);
  fist.position.set(9.0, -0.15, 1.0);
  g.add(fist);

  // Gada — the mighty mace
  const gadaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.4, 12), gold);
  gadaShaft.rotation.z = Math.PI / 2;
  gadaShaft.position.set(10.7, -0.15, 1.0);
  g.add(gadaShaft);
  const gadaHead = new THREE.Mesh(new THREE.SphereGeometry(1.0, 18, 14), gold);
  gadaHead.position.set(12.5, -0.15, 1.0);
  g.add(gadaHead);

  // Trailing arm
  const armBack = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 3.6, 5, 10), skin);
  armBack.rotation.z = Math.PI / 2 + 0.6;
  armBack.position.set(-1.6, 0.6, -1.0);
  g.add(armBack);

  // Folded leg (tucked behind for flight)
  const legA = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 3.2, 5, 10), skin);
  legA.rotation.z = Math.PI / 2 + 0.8;
  legA.position.set(-2.4, -1.4, 0.8);
  g.add(legA);
  const legB = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 3.0, 5, 10), skin);
  legB.rotation.z = Math.PI / 2 + 0.5;
  legB.position.set(-2.0, -1.1, -1.0);
  g.add(legB);

  // Dhoti — orange cloth around waist
  const dhoti = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.4, 1.4, 18), cloth);
  dhoti.rotation.z = Math.PI / 2;
  dhoti.position.set(-0.4, -0.3, 0);
  g.add(dhoti);

  // Tail — curved tube
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.0,  0.5,  0.0),
    new THREE.Vector3(-5.5,  2.0,  1.2),
    new THREE.Vector3(-7.5,  3.6, -1.0),
    new THREE.Vector3(-8.5,  5.2,  0.8),
  ]);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 32, 0.35, 10, false), skin);
  g.add(tail);

  // Aura — glowing halo behind the body
  const aura = new THREE.Mesh(
    new THREE.RingGeometry(4.0, 6.5, 48),
    new THREE.MeshBasicMaterial({
      color: 0xf5d061, transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    })
  );
  aura.position.set(0, 0.4, -0.6);
  aura.rotation.y = Math.PI / 2;
  g.add(aura);

  // Inner light to make Hanuman glow against storm clouds
  const halo = new THREE.PointLight(0xffd089, 3.2, 80, 2);
  halo.position.set(2, 1, 0);
  g.add(halo);

  // Scale entire figure (he is COLOSSAL — a hundred yojanas tall)
  g.scale.setScalar(1.0);
  return g;
}

/* ------------------------------- encounters ------------------------------- */
function buildMainaka(): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, roughness: 0.45, metalness: 0.85, emissive: 0x6b4a00, emissiveIntensity: 0.45,
  });
  const peak = new THREE.Mesh(new THREE.ConeGeometry(40, 90, 7), mat);
  peak.position.y = 30;
  g.add(peak);
  const collar = new THREE.Mesh(new THREE.ConeGeometry(55, 30, 7), mat);
  collar.position.y = -5;
  g.add(collar);

  // Crown of golden lotuses (spheres)
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const lotus = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xfff4d4 })
    );
    lotus.position.set(Math.cos(a) * 14, 70, Math.sin(a) * 14);
    g.add(lotus);
  }

  const glow = new THREE.PointLight(0xffd089, 4, 250, 2);
  glow.position.y = 60;
  g.add(glow);
  return g;
}

function buildSurasa(): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2a0a3a, roughness: 0.4, metalness: 0.6, emissive: 0xe879f9, emissiveIntensity: 0.4,
  });

  // Coiled serpent body using a tube along a helix
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    const a = t * Math.PI * 6;
    const r = 30 - t * 10;
    pts.push(new THREE.Vector3(Math.cos(a) * r, t * 60 - 10, Math.sin(a) * r));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const body = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 3.5, 14, false), mat);
  g.add(body);

  // Head — open jaws
  const head = new THREE.Mesh(new THREE.SphereGeometry(7, 20, 16), mat);
  head.position.set(pts[pts.length - 1].x, pts[pts.length - 1].y + 4, pts[pts.length - 1].z);
  g.add(head);

  // Glowing eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff3030 });
  for (const dx of [-2.2, 2.2]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 8), eyeMat);
    eye.position.set(head.position.x + dx, head.position.y + 1.5, head.position.z + 5);
    g.add(eye);
  }

  const glow = new THREE.PointLight(0xe879f9, 3, 200, 2);
  glow.position.set(0, 30, 0);
  g.add(glow);
  return g;
}

function buildSinhika(): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0a0010, roughness: 0.9, metalness: 0.1, emissive: 0x3b0764, emissiveIntensity: 0.6,
  });

  // Massive jagged silhouette below the waterline
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(36, 1), mat);
  body.position.y = -8;
  g.add(body);

  // Spikes
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 12 + Math.random() * 10, 6),
      mat
    );
    spike.position.set(Math.cos(a) * 30, 4 + Math.random() * 8, Math.sin(a) * 30);
    spike.rotation.z = -Math.cos(a) * 1.1;
    spike.rotation.x =  Math.sin(a) * 1.1;
    g.add(spike);
  }

  // Sinister glow
  const glow = new THREE.PointLight(0x9333ea, 4, 220, 2);
  glow.position.y = 10;
  g.add(glow);
  return g;
}

function buildLanka(): THREE.Group {
  const g = new THREE.Group();
  const rock = new THREE.MeshStandardMaterial({
    color: 0x3a1a1a, roughness: 0.85, metalness: 0.1, emissive: 0x6b1a00, emissiveIntensity: 0.3,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: 0xf5d061, roughness: 0.2, metalness: 0.95, emissive: 0xd4af37, emissiveIntensity: 0.85,
  });

  // Three towering peaks (Trikuta)
  const peaks = [
    { x: -120, h: 180, r: 70 },
    { x:    0, h: 240, r: 90 },
    { x:  130, h: 200, r: 75 },
  ];
  peaks.forEach((p) => {
    const peak = new THREE.Mesh(new THREE.ConeGeometry(p.r, p.h, 6), rock);
    peak.position.set(p.x, p.h / 2, 0);
    g.add(peak);
  });

  // Golden city on the central peak
  for (let i = 0; i < 14; i++) {
    const tower = new THREE.Mesh(
      new THREE.ConeGeometry(4 + Math.random() * 4, 22 + Math.random() * 18, 6),
      gold
    );
    tower.position.set(-50 + Math.random() * 100, 220 + Math.random() * 30, -10 + Math.random() * 20);
    g.add(tower);
  }

  // Atmospheric glow
  const glow = new THREE.PointLight(0xffb080, 6, 700, 2);
  glow.position.set(0, 250, 0);
  g.add(glow);
  return g;
}

/* ------------------------------ React component ----------------------------- */
const HanumanFlight: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    /* ---------------------- renderer / scene / camera --------------------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x140820, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 5000);
    camera.position.set(0, 28, 90);
    camera.lookAt(0, 22, 0);

    /* ------------------------------ lights ------------------------------ */
    const hemi = new THREE.HemisphereLight(0xffd089, 0x1a0a2e, 0.85);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff0c8, 1.6);
    sun.position.set(120, 80, -40);
    scene.add(sun);

    /* ------------------------------- sky ------------------------------- */
    const skyUniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
    };
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(2500, 32, 20),
      new THREE.ShaderMaterial({
        vertexShader: skyVertex,
        fragmentShader: skyFragment,
        uniforms: skyUniforms,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    scene.add(sky);

    /* ------------------------------ ocean ----------------------------- */
    const oceanUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uDeep: { value: new THREE.Color(0x0a0822) },
      uShallow: { value: new THREE.Color(0x1d3a8a) },
      uFoam: { value: new THREE.Color(0xf5e9c8) },
    };
    const ocean = new THREE.Mesh(
      new THREE.PlaneGeometry(4000, 4000, 240, 240),
      new THREE.ShaderMaterial({
        vertexShader: oceanVertex,
        fragmentShader: oceanFragment,
        uniforms: oceanUniforms,
      })
    );
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -2;
    scene.add(ocean);

    /* ----------------------------- clouds ----------------------------- */
    const cloudGroup = new THREE.Group();
    const cloudGeo = new THREE.PlaneGeometry(120, 60);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xe8dbff, transparent: true, opacity: 0.4, depthWrite: false,
    });
    for (let i = 0; i < 28; i++) {
      const c = new THREE.Mesh(cloudGeo, cloudMat.clone());
      c.position.set(
        (Math.random() - 0.5) * 1600,
        40 + Math.random() * 120,
        -200 - Math.random() * 800
      );
      c.scale.setScalar(0.6 + Math.random() * 1.8);
      c.rotation.z = (Math.random() - 0.5) * 0.4;
      (c.material as THREE.MeshBasicMaterial).opacity = 0.25 + Math.random() * 0.35;
      cloudGroup.add(c);
    }
    scene.add(cloudGroup);

    /* ----------------------------- particles ----------------------------- */
    const sparkCount = 380;
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3 + 0] = (Math.random() - 0.5) * 800;
      sparkPositions[i * 3 + 1] =  Math.random() * 180 + 5;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 800 - 100;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({
        color: 0xffd089,
        size: 1.4,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(sparks);

    /* ----------------------------- hanuman ----------------------------- */
    const hanuman = buildHanuman();
    hanuman.position.set(0, 32, 30);
    hanuman.scale.setScalar(1.4);
    scene.add(hanuman);

    // Comet trail behind Hanuman — additive sprite tail
    const trailCount = 60;
    const trailPos = new Float32Array(trailCount * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trail = new THREE.Points(
      trailGeo,
      new THREE.PointsMaterial({
        color: 0xffd089,
        size: 6,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(trail);
    const trailHistory: THREE.Vector3[] = [];

    /* --------------------------- encounters --------------------------- */
    const mainaka = buildMainaka();
    mainaka.position.set(140, -30, -200);
    scene.add(mainaka);

    const surasa = buildSurasa();
    surasa.position.set(-160, 10, -260);
    scene.add(surasa);

    const sinhika = buildSinhika();
    sinhika.position.set(120, -10, -260);
    scene.add(sinhika);

    const lanka = buildLanka();
    lanka.position.set(0, -20, -800);
    scene.add(lanka);

    // Flight path — Hanuman traces a gentle arc from launch to Lanka
    const flightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(   0, 28,  140),  // Mahendragiri launch
      new THREE.Vector3(  60, 55,  -50),  // crest above Mainaka
      new THREE.Vector3( -40, 80, -250),  // banking past Surasa
      new THREE.Vector3(  80, 60, -480),  // diving toward Sinhika
      new THREE.Vector3( -30, 95, -650),  // ascending into storm
      new THREE.Vector3(   0, 60, -780),  // Lanka approach
    ]);

    /* ----------------------------- resize ----------------------------- */
    const handleResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    /* ----------------------------- scroll ----------------------------- */
    let targetProgress = 0;
    let smoothedProgress = 0;
    const updateProgress = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const rect = scroller.getBoundingClientRect();
      const total = scroller.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      targetProgress = total > 0 ? scrolled / total : 0;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* --------------------------- render loop --------------------------- */
    const clock = new THREE.Clock();
    let frame = 0;
    const tmp = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    let raf = 0;

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      smoothedProgress += (targetProgress - smoothedProgress) * Math.min(1, dt * 4.5);
      const p = THREE.MathUtils.clamp(smoothedProgress, 0, 1);

      // Update uniforms
      oceanUniforms.uTime.value = t;
      oceanUniforms.uProgress.value = p;
      skyUniforms.uTime.value = t;
      skyUniforms.uProgress.value = p;

      // Move Hanuman along the curve
      flightCurve.getPointAt(p, tmp);
      hanuman.position.lerp(tmp, 0.18);
      // Subtle bob and rotation
      hanuman.position.y += Math.sin(t * 1.2) * 0.6;
      flightCurve.getTangentAt(p, tangent).normalize();
      const facing = Math.atan2(-tangent.x, -tangent.z);
      hanuman.rotation.y = facing - Math.PI / 2;
      hanuman.rotation.z = Math.sin(t * 1.6) * 0.05 - tangent.y * 0.4;

      // Trail update — every few frames record current head position
      if (frame % 2 === 0) {
        trailHistory.unshift(new THREE.Vector3(
          hanuman.position.x + Math.cos(facing) * 6,
          hanuman.position.y + 1,
          hanuman.position.z + Math.sin(facing) * 6
        ));
        if (trailHistory.length > trailCount) trailHistory.length = trailCount;
        for (let i = 0; i < trailCount; i++) {
          const v = trailHistory[i] || trailHistory[trailHistory.length - 1] || hanuman.position;
          trailPos[i * 3 + 0] = v.x;
          trailPos[i * 3 + 1] = v.y;
          trailPos[i * 3 + 2] = v.z;
        }
        (trail.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
      }

      // Camera dolly — follows the curve from behind, slightly above
      const camLook = tmp.clone();
      const camPos = tmp.clone()
        .add(new THREE.Vector3(Math.cos(facing) * -70 + Math.sin(t * 0.2) * 8, 22, Math.sin(facing) * -70));
      camera.position.lerp(camPos, 0.04);
      camera.lookAt(camLook.x, camLook.y + 4, camLook.z);

      // Encounter reveals — scale up as we approach them
      const showAt = (m: THREE.Object3D, start: number, end: number, max = 1) => {
        const k = THREE.MathUtils.smoothstep(p, start, (start + end) / 2)
                * (1 - THREE.MathUtils.smoothstep(p, (start + end) / 2, end));
        m.scale.setScalar(0.001 + k * max);
        m.visible = k > 0.002;
      };
      showAt(mainaka,   0.13, 0.42, 1.0);
      showAt(surasa,    0.33, 0.62, 1.0);
      showAt(sinhika,   0.53, 0.82, 1.0);

      // Lanka grows from a far glow into a colossal vista
      const lankaK = THREE.MathUtils.smoothstep(p, 0.55, 1.0);
      lanka.scale.setScalar(0.15 + lankaK * 1.0);
      lanka.position.z = -1100 + lankaK * 500;

      // Slowly drift clouds & sparkles
      cloudGroup.children.forEach((c, i) => {
        c.position.x += (i % 2 === 0 ? 0.05 : -0.05) * (1 + p * 1.6);
        if (c.position.x > 900) c.position.x = -900;
        if (c.position.x < -900) c.position.x = 900;
      });
      sparks.rotation.y += dt * 0.02;

      renderer.render(scene, camera);
      frame++;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    /* ------------------------------ cleanup ------------------------------ */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateProgress);
      renderer.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = (m as any).material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) (mat as THREE.Material).dispose();
      });
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* ----------------------- React progress mirror for UI ---------------------- */
  useEffect(() => {
    const onScroll = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const rect = scroller.getBoundingClientRect();
      const total = scroller.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --------------------------- narrative milestones --------------------------- */
  const fade = (m: Milestone) => {
    const mid = (m.start + m.end) / 2;
    const half = (m.end - m.start) / 2;
    const d = Math.abs(progress - mid);
    return Math.max(0, 1 - (d / half));
  };

  return (
    <div className="hf-root">
      {/* WebGL canvas mounts inside this fixed background */}
      <div ref={mountRef} className="hf-canvas-wrap" aria-hidden="true" />

      {/* Vignette + atmospheric color wash on top of the canvas */}
      <div className="hf-vignette" aria-hidden="true" />

      {/* Header — exit button, title, progress bar */}
      <div className="hf-header">
        <button onClick={onExit} className="hf-exit" aria-label="Return to Ramayana Codex">
          <span aria-hidden="true">←</span>&nbsp;Return to Codex
        </button>
        <div className="hf-title-block">
          <div className="hf-eyebrow">Sundara Kāṇḍa · सुन्दर काण्ड</div>
          <div className="hf-title">Hanuman’s Leap</div>
        </div>
        <div className="hf-progress" aria-hidden="true">
          <div className="hf-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Intro panel — visible only at the very start */}
      <div
        className="hf-intro"
        style={{ opacity: progress < 0.02 ? 1 : Math.max(0, 1 - progress * 8) }}
        aria-hidden={progress > 0.02}
      >
        <div className="hf-intro-shloka font-sanskrit">
          यस्य द्विरदवक्त्राद्याः पारिषद्याः परः शतम्<br />
          विघ्नं निघ्नन्ति सततं विष्वक्सेनं तमाश्रये
        </div>
        <h2 className="hf-intro-title font-display">
          Across the <span className="text-gradient-saffron">ocean</span>,<br />on the wings of <span className="text-gradient-gold">devotion</span>.
        </h2>
        <p className="hf-intro-body font-serif">
          Scroll to fly with Hanuman from the cliffs of Mahendra to the gates of Lanka. You will pass a
          golden mountain that begs you to rest, a serpent goddess whose mouth becomes the sky, and a
          shadow-witch beneath the waves — all in a single, monumental leap.
        </p>
        <div className="hf-scroll-hint">
          <span>scroll to fly</span>
          <span className="hf-arrow">↓</span>
        </div>
      </div>

      {/* Milestone narrative panels — pinned, cross-faded by progress */}
      <div className="hf-milestones" aria-live="polite">
        {MILESTONES.map((m) => {
          const o = fade(m);
          if (o < 0.01) return null;
          return (
            <article
              key={m.id}
              className="hf-milestone"
              style={{ opacity: o, transform: `translateY(${(1 - o) * 16}px)` }}
            >
              <div className="hf-milestone-eyebrow font-cinzel">{m.title}</div>
              <div className="hf-milestone-sanskrit font-sanskrit">{m.sanskrit}</div>
              <div className="hf-milestone-english font-serif italic">“{m.english}”</div>
              <p className="hf-milestone-body font-serif">{m.body}</p>
            </article>
          );
        })}
      </div>

      {/* Arrival panel — celebratory CTA at journey's end */}
      <div
        className="hf-arrival"
        style={{ opacity: progress > 0.96 ? 1 : 0, pointerEvents: progress > 0.96 ? 'auto' : 'none' }}
      >
        <div className="hf-arrival-inner">
          <div className="font-sanskrit text-2xl text-saffron tracking-widest">॥ जय श्री राम ॥</div>
          <h3 className="font-display text-4xl md:text-6xl text-gradient-gold mt-4">Lanka, at last.</h3>
          <p className="mt-4 font-serif italic text-[#ece2c8] max-w-xl mx-auto">
            “He saw the city — vast, golden, terrible — and knew, in that breath, that Sita lived.”
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-ghost">
              Take the leap again
            </button>
            <button onClick={onExit} className="btn-gold">
              Return to the Codex
            </button>
          </div>
        </div>
      </div>

      {/* The tall scroll surface that drives the flight */}
      <div ref={scrollerRef} className="hf-scroller" aria-hidden="true" />
    </div>
  );
};

export default HanumanFlight;
