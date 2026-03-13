<template>
  <section class="section">
    <!-- Header content unchanged -->
    <div class="container mb-10 text-center">
      <!-- Existing header content -->
    </div>

    <!-- Three.js Container -->
    <div ref="threeContainer" class="immersive-stage">
      <!-- CSS3DRenderer renders here -->
      <!-- Transparentes Klick-Overlay: fängt alle Klicks (auch Zwischenräume) ab -->
      <div
        class="click-overlay"
        @mousedown="startDrag"
        @touchstart.passive="startDrag"
        @mousemove="onDrag"
        @touchmove.passive="onDrag"
        @mouseup="stopDrag"
        @touchend="stopDrag"
        @mouseleave="onMouseLeave"
      />
    </div>

    <!-- Existing CTA link -->
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { gsap } from 'gsap';

// Dynamically loaded in onMounted to avoid SSR issues
let CSS3DRenderer: any;
let CSS3DObject: any;
// Import service data and other dependencies

const { locale } = useI18n()
const router = useRouter()

const navigateTo = (path: string) => router.push(path)

// WebGL detection function
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext &&
           (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

// Fallback flag
const webglSupported = ref(isWebGLAvailable());
console.log('WebGL supported:', webglSupported.value);
console.log('Component setup executed');

const services = computed(() => {
  return [
  {
    slug: 'web-development',
    gradient: 'linear-gradient(135deg, #0c2a35 0%, #1a4a3a 50%, #0d3328 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    title: locale.value === 'de' ? 'Webentwicklung' : 'Web Development',
    desc:  locale.value === 'de' ? 'Schnelle, moderne Websites mit Top-Performance & sauberem Code.' : 'Fast, modern websites with top performance & clean code.',
  },
  {
    slug: 'process-optimization',
    gradient: 'linear-gradient(135deg, #0f2d1a 0%, #1c4030 50%, #0f2918 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    title: locale.value === 'de' ? 'Prozessoptimierung' : 'Process Optimization',
    desc:  locale.value === 'de' ? 'Automatisierung & Digitalisierung Ihrer Geschäftsprozesse.' : 'Automation & digitization of your business processes.',
  },
  {
    slug: 'digital-marketing',
    gradient: 'linear-gradient(135deg, #071e26 0%, #163a2a 50%, #0a1f1c 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>',
    title: 'Digital Marketing',
    desc:  locale.value === 'de' ? 'Strategisches Online-Marketing für nachhaltiges Wachstum.' : 'Strategic online marketing for sustainable growth.',
  },
  {
    slug: 'ai-projects',
    gradient: 'linear-gradient(135deg, #0a2630 0%, #1a3d30 50%, #0c2820 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>',
    title: locale.value === 'de' ? 'KI-Projekte' : 'AI Projects',
    desc:  locale.value === 'de' ? 'KI-Integration und Automatisierung für Ihr Unternehmen.' : 'AI integration and automation for your business.',
  },
  {
    slug: 'google-management',
    gradient: 'linear-gradient(135deg, #081c24 0%, #153525 50%, #0a1f1a 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
    title: 'Google Management',
    desc:  locale.value === 'de' ? 'Google Ads, SEO & My Business — alles aus einer Hand.' : 'Google Ads, SEO & My Business — all from one source.',
  },
  {
    slug: 'custom-web-apps',
    gradient: 'linear-gradient(135deg, #0c2a35 0%, #1a4535 50%, #0d2f25 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>',
    title: locale.value === 'de' ? 'Individual-Webapps' : 'Custom Web Apps',
    desc:  locale.value === 'de' ? 'Maßgeschneiderte Webanwendungen für komplexe Anforderungen.' : 'Tailored web applications for complex requirements.',
  },
  {
    slug: 'it-security-cloud',
    gradient: 'linear-gradient(135deg, #091e28 0%, #163828 50%, #0a1f1d 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    title: locale.value === 'de' ? 'IT-Sicherheit & Cloud' : 'IT Security & Cloud',
    desc:  locale.value === 'de' ? 'Sichere Infrastruktur und Cloud-Lösungen für Ihr Business.' : 'Secure infrastructure and cloud solutions.',
  },
  {
    slug: 'digital-marketing-boost',
    gradient: 'linear-gradient(135deg, #0e2c1a 0%, #1c4530 50%, #0f2f1f 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
    title: locale.value === 'de' ? 'Marketing Boost' : 'Digital Marketing Boost',
    desc:  locale.value === 'de' ? 'Schnelle Wachstumsimpulse durch gezielte Maßnahmen.' : 'Rapid growth through targeted measures.',
  },
  {
    slug: 'e-commerce',
    gradient: 'linear-gradient(135deg, #0d2535 0%, #1a3f45 50%, #0b2a30 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
    title: locale.value === 'de' ? 'E-Commerce' : 'E-Commerce',
    desc:  locale.value === 'de' ? 'Professionelle Online-Shops mit maximaler Conversion-Rate.' : 'Professional online shops with maximum conversion rate.',
  },
  {
    slug: 'consulting',
    gradient: 'linear-gradient(135deg, #112030 0%, #1e3d2a 50%, #0e2820 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    title: locale.value === 'de' ? 'Beratung & Strategie' : 'Consulting & Strategy',
    desc:  locale.value === 'de' ? 'Digitale Strategie und Transformation für Ihr Unternehmen.' : 'Digital strategy and transformation for your business.',
  },
  {
    slug: 'branding',
    gradient: 'linear-gradient(135deg, #0a1e2a 0%, #163530 50%, #0b2420 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    title: locale.value === 'de' ? 'Branding & Design' : 'Branding & Design',
    desc:  locale.value === 'de' ? 'Einzigartiges Markendesign, das im Gedächtnis bleibt.' : 'Unique brand design that stays in memory.',
  },
  {
    slug: 'support',
    gradient: 'linear-gradient(135deg, #0c2030 0%, #1a3d28 50%, #0d2a1e 100%)',
    icon: '<svg class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    title: locale.value === 'de' ? 'Support & Wartung' : 'Support & Maintenance',
    desc:  locale.value === 'de' ? 'Zuverlässiger technischer Support und laufende Pflege.' : 'Reliable technical support and ongoing maintenance.',
  },
]
})

// Refs
const threeContainer = ref<HTMLDivElement>();

// Three.js variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let css3dRenderer: any;
let animationId: number;

// Array to track CSS3DObjects for state updates
let serviceObjects: any[] = [];

// Drag control state variables
let dragging      = false;
let dragStartX    = 0;
let dragStartRot  = 0;
let velocity      = 0;
let lastX         = 0;
let lastT         = 0;
let snapping      = false;
let dragMoved     = false;   // true once pointer moved > 8 px (committed drag)
let wasCoasting   = false;   // true if carousel was already moving at mousedown
let targetRotation = 0;

// ─── Physics (simplified) ────────────────────────────────────────────────────
const DRAG_SENSITIVITY = 0.0024;
const TARGET_SMOOTH   = 0.22;     // Delay: left/right cancel each other during smoothing
const FOLLOW_LERP     = 0.18;     // How quickly wheel follows target (not braking)
const FRICTION        = 0.99;     // Coast decay – higher = longer spin
const VELOCITY_MULT   = 10;       // Faster pull = longer coast
const COAST_FACTOR    = 0.012;
const COAST_DECAY     = COAST_FACTOR / (1 - FRICTION);

// Helper function to get coordinates from events
function cx(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].clientX : e.clientX;
}

// Mouse left the container while dragging → release cleanly
function onMouseLeave() {
  if (dragging && dragMoved) stopDrag();
}

// Global mouseup safety net: catches releases outside the container
function onWindowMouseUp(e: MouseEvent | TouchEvent) {
  if (dragging) stopDrag(e);
}

// ─── Click zones: Klickposition → nächste Karte (Grenzen mittig zwischen Karten) ─
function getCardIndexAtScreenX(clientX: number): number {
  if (!threeContainer.value || !scene || !camera || serviceObjects.length === 0) return getTargetIndex();
  const rect = threeContainer.value.getBoundingClientRect();
  const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const vec = new THREE.Vector3();
  let bestIdx = 0;
  let bestDist = Infinity;
  const W = rect.width;
  for (let i = 0; i < serviceObjects.length; i++) {
    serviceObjects[i].getWorldPosition(vec);
    vec.project(camera);
    const screenX = (vec.x * 0.5 + 0.5) * W;
    let d = Math.abs(screenX - clickX);
    if (d > W / 2) d = W - d;
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  return bestIdx;
}

// ─── Drag ────────────────────────────────────────────────────────────────────

function startDrag(e: MouseEvent | TouchEvent) {
  wasCoasting  = Math.abs(velocity) > 0.02 || snapping;
  dragging     = true;
  dragMoved    = false;
  dragStartX   = cx(e);
  dragStartRot = scene.rotation.y;
  targetRotation = scene.rotation.y;
  lastX        = dragStartX;
  lastT        = Date.now();
  gsap.killTweensOf(scene.rotation);
  velocity = 0;
  snapping = false;
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return;
  const x  = cx(e);
  const dx = x - dragStartX;

  if (!dragMoved) {
    if (Math.abs(dx) < 8) return;
    gsap.killTweensOf(scene.rotation);
    snapping     = false;
    dragMoved    = true;
    dragStartX   = x;
    dragStartRot = scene.rotation.y;
    targetRotation = scene.rotation.y;
    velocity     = 0;
    return;
  }

  // Raw target from mouse; smoothing makes left/right cancel during rapid direction changes
  const rawTarget = dragStartRot - (x - dragStartX) * DRAG_SENSITIVITY;
  targetRotation += (rawTarget - targetRotation) * TARGET_SMOOTH;
  const now = Date.now();
  velocity = (x - lastX) / Math.max(1, now - lastT) * VELOCITY_MULT;
  lastX = x;
  lastT = now;
}

function stopDrag(e?: MouseEvent | TouchEvent) {
  dragging = false;
  if (!dragMoved) {
    // Pictures only clickable when carousel stands still or is very slow
    if (wasCoasting) return;
    velocity = 0;
    const clientX = e ? ('changedTouches' in e && e.changedTouches[0] ? e.changedTouches[0].clientX : (e as MouseEvent).clientX) : lastX;
    const idx = e ? getCardIndexAtScreenX(clientX) : getTargetIndex();
    // Every picture links to its service page
    navigateTo(`/services/${services.value[idx].slug}`);
    return;
  }

  const N = services.value.length;
  const step = (2 * Math.PI) / N;
  const v = (Date.now() - lastT > 150) ? 0 : velocity;

  if (Math.abs(v) < 0.003) {
    velocity = 0;
    snapToIndex(getTargetIndex());
    return;
  }

  const naturalStop = scene.rotation.y - v * COAST_DECAY;
  const nr = ((naturalStop % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const raw = nr / step;
  const velDir = Math.sign(v);
  const targetIdx = ((velDir > 0 ? Math.ceil(raw - 1e-6) : Math.floor(raw + 1e-6)) + N) % N;
  const targetAngle = -(targetIdx * step);
  let delta = targetAngle - scene.rotation.y;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  const neededV = -delta / COAST_DECAY;
  const sameDir = Math.sign(neededV) === Math.sign(v);
  if (sameDir && Math.abs(neededV) <= Math.abs(v) * 1.05) {
    velocity = neededV;
  } else {
    velocity = 0;
    const vRads = Math.abs(v) * COAST_FACTOR * 60;
    const T = Math.min(2.8, Math.max(0.4, 2 * Math.abs(delta) / vRads));
    snapping = true;
    gsap.to(scene.rotation, {
      y: scene.rotation.y + delta,
      duration: T,
      ease: 'power2.out',
      onUpdate: updateCardStates,
      onComplete: () => { snapping = false; },
    });
  }
}

// ─── Index helpers ────────────────────────────────────────────────────────────

// Camera is at z≈0 (center of ring), looking along –Z.
// Cards: x = R·sin(θ_i),  z = –R·cos(θ_i)
// Drag is negated → rotation.y DECREASES when dragging right.
// Front position (z = –R) is reached when scene.rotation.y = –(i · 2π/N)  ← NEGATIVE

// Nearest snap point — used by dot buttons (no direction preference).
function getTargetIndex() {
  const N = services.value.length;
  const nr = ((-scene.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.round(nr / (2 * Math.PI / N)) % N;
}

// velocityRads: current speed in rad/s at the moment of snap.
// When provided, duration is calculated to match that speed (smooth handoff).
// When 0 (dot-button clicks), a fixed 0.9 s duration is used.
function snapToIndex(index: number, velocityRads = 0) {
  gsap.killTweensOf(scene.rotation);

  const N          = services.value.length;
  const targetAngle = -(index * 2 * Math.PI / N);
  let   current    = scene.rotation.y;
  let   delta      = targetAngle - current;
  while (delta >  Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  if (Math.abs(delta) < 0.0005) { updateCardStates(); return; }

  // power2.out: initial velocity ≈ 2×|delta|/T → T für sanften Übergang
  const T = velocityRads > 0.05
    ? Math.min(2.8, Math.max(0.4, 2 * Math.abs(delta) / velocityRads))
    : Math.max(0.4, Math.abs(delta) * 1.8);

  snapping = true;
  gsap.to(scene.rotation, {
    y: current + delta,
    duration: T,
    ease: 'power2.out',
    onUpdate:   updateCardStates,
    onComplete: () => { snapping = false; },
  });
}

function updateCardStates() {
  // Alle Karten gleich – keine Auswahl-Logik
  serviceObjects.forEach((obj) => {
    obj.element.className = 'service-card';
    const content = obj.element.querySelector('.service-card-content') as HTMLElement | null;
    if (!content) return;
    content.style.transform   = 'scale(1)';
    content.style.opacity     = '1';
    content.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.3)';
  });
}

function handleServiceClick(index: number) {
  router.push(`/services/${services.value[index].slug}`);
}

// ─── Three.js setup ───────────────────────────────────────────────────────────

const initThreeJs = () => {
  if (!threeContainer.value) return;
  scene = new THREE.Scene();
  scene.rotation.order = 'ZYX';  // Erst Neigung (Z), dann Drehung (Y) auf geneigter Achse
  scene.rotation.z = (-10 * Math.PI) / 180;  // Tilt 10° (rechts unten, links oben)

  // Size renderer to the CONTAINER, not the window.
  // This ensures the CSS3D perspective center == the container center.
  // (Using window dimensions shifts the 3D origin below the visible area.)
  const W = threeContainer.value.clientWidth;
  const H = threeContainer.value.clientHeight;

  // Camera sits at the CENTER of the ring, looking along –Z.
  // Placed at z=–1 (not exact z=0) to avoid the CSS3D perspective singularity:
  // side cards at z=0 would have infinite CSS scale at z=0; at z=–1 they get a
  // large-negative scale → hidden by backface-visibility. No infinite values.
  // With camera inside + lookAt(0,0,0) the CSS3D Y-flip cancels out and cards
  // show their READABLE face (verified by 2×2 CSS-matrix determinant = +1).
  camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, -1);
  // Default Three.js camera orientation already looks along –Z — no lookAt needed.

  css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(W, H);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top      = '0';
  css3dRenderer.domElement.style.left     = '0';
  threeContainer.value.appendChild(css3dRenderer.domElement);

  createServiceCards();
  updateCardStates();

  let lastFrameTime = 0;
  const animate = (now: number) => {
    animationId = requestAnimationFrame(animate);
    const dt = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.1) : 0.016;
    lastFrameTime = now;

    if (dragging && dragMoved) {
      const diff = targetRotation - scene.rotation.y;
      scene.rotation.y += diff * (1 - Math.pow(1 - FOLLOW_LERP, 60 * dt));
      updateCardStates();
    } else if (!snapping && Math.abs(velocity) > 0.0003) {
      scene.rotation.y -= velocity * COAST_FACTOR * (60 * dt);
      velocity *= Math.pow(FRICTION, 60 * dt);
      updateCardStates();
      if (Math.abs(velocity) < 0.003) {
        const corrVRads = Math.abs(velocity) * COAST_FACTOR * 60;
        velocity = 0;
        snapToIndex(getTargetIndex(), corrVRads);
      }
    }
    css3dRenderer.render(scene, camera);
  };
  animate(performance.now());
};

// ─── Card factory ─────────────────────────────────────────────────────────────

const createServiceCards = () => {
  const N = services.value.length;
  // Card size — square.  Vue scoped CSS does NOT apply to dynamically created
  // elements (no data-v-* attribute), so ALL dimensions must be set inline here.
  const CARD_W = window.innerWidth < 480 ? 360 : window.innerWidth < 768 ? 468 : 612;
  const CARD_H = CARD_W;   // square

  // Radius so that arc between adjacent cards = CARD_W + 120px gap.
  // arc = R · (2π / N)  →  R = (CARD_W + 120) · N / (2π)
  const RADIUS = Math.ceil((CARD_W + 120) * N / (2 * Math.PI));

  services.value.forEach((service, index) => {
    const angle = (index * 2 * Math.PI) / N;

    // Horizontal ring in the XZ plane.
    // Camera at z≈0 looks along –Z.  Front card (angle=0) → z = –R (ahead).
    //   z = –R·cos(angle)  ← NEGATIVE cos
    const x =  RADIUS * Math.sin(angle);
    const y =  0;
    const z = -RADIUS * Math.cos(angle);   // front at z=–R when angle=0

    const el = document.createElement('div');
    el.className = 'service-card';
    // Dimensions must be set inline — scoped CSS won't reach dynamic elements
    el.style.cssText = `
      width: ${CARD_W}px;
      height: ${CARD_H}px;
      pointer-events: auto;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    `;

    el.innerHTML = `
      <div class="service-card-content" style="
        background-image: url('/test-pitcture-carussel.jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
        opacity: 1;
        box-sizing: border-box;
      ">
        <!-- Schrift vorerst auskommentiert
        <div style="margin-bottom:14px; opacity:0.9;">${service.icon}</div>
        <h3 style="
          font-size: ${CARD_W >= 612 ? '1.5rem' : CARD_W >= 468 ? '1.25rem' : '1rem'};
          font-weight: 600;
          margin: 0 0 8px;
          line-height: 1.3;
        ">${service.title}</h3>
        <p style="
          font-size: ${CARD_W >= 612 ? '1rem' : CARD_W >= 468 ? '0.875rem' : '0.8rem'};
          opacity: 0.85;
          line-height: 1.4;
          margin: 0;
        ">${service.desc}</p>
        -->
      </div>`;
    // Fire click only when:
    // • pointer didn't move (no committed drag), AND
    // • carousel was NOT already coasting at mousedown
    // This prevents a tap during a coast from snapping to the wrong card.
    el.addEventListener('click', () => {
      if (!dragMoved && !wasCoasting) handleServiceClick(index);
    });

    const obj = new CSS3DObject(el);
    obj.position.set(x, y, z);

    // lookAt(0,0,0): card's +Z points INWARD toward the camera at origin.
    // Camera-inside + inward-facing = CSS3D 2×2 determinant is +1 → READABLE text.
    obj.lookAt(new THREE.Vector3(0, 0, 0));

    scene.add(obj);
    serviceObjects.push(obj);
  });
};

// ─── Resize ───────────────────────────────────────────────────────────────────

const handleResize = () => {
  if (!camera || !css3dRenderer || !threeContainer.value) return;
  const W = threeContainer.value.clientWidth;
  const H = threeContainer.value.clientHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  css3dRenderer.setSize(W, H);
  scene.clear();
  serviceObjects = [];
  createServiceCards();
  updateCardStates();
};

// Lifecycle hooks
onMounted(async () => {
  const css3d = await import('three/examples/jsm/renderers/CSS3DRenderer.js');
  CSS3DRenderer = css3d.CSS3DRenderer;
  CSS3DObject = css3d.CSS3DObject;
  // nextTick ensures the container has its final layout dimensions before we read them
  await nextTick();
  initThreeJs();
  window.addEventListener('resize',  handleResize);
  window.addEventListener('mouseup', onWindowMouseUp);
  window.addEventListener('touchend', onWindowMouseUp, { passive: true });
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (css3dRenderer && threeContainer.value) {
    threeContainer.value.removeChild(css3dRenderer.domElement);
  }
  window.removeEventListener('resize',  handleResize);
  window.removeEventListener('mouseup', onWindowMouseUp);
  window.removeEventListener('touchend', onWindowMouseUp);
});
</script>

<style scoped>
/* Three.js container – höher für 10° Neigung, damit Karten nicht abgeschnitten werden */
.immersive-stage {
  position: relative;
  width: 100%;
  height: 120vh;
  overflow: hidden;
  cursor: default;
}

/* Transparentes Overlay: Klick = Karte wählen, Klick+Halten+Ziehen = drehen */
.click-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: auto;
  cursor: default;
}

/* Dimensions + emphasis are applied via inline styles in JS (createServiceCards /
   updateCardStates) because Vue scoped CSS cannot reach dynamically created elements.
   Only structural rules that apply to the template itself live here. */
</style>