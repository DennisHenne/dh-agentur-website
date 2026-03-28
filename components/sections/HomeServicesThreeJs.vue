<template>
  <section class="section section-services">
    <div class="services-wrapper">
      <div class="services-text">
        <UiBadge class="mb-4">{{ t('home.servicesLabel') }}</UiBadge>
        <h2 class="section-title">{{ t('home.servicesTitle') }}</h2>
        <div class="subtitle-row">
          <p class="section-subtitle">{{ t('home.servicesSubtitle') }}</p>
          <NuxtLink to="/services" class="btn-outline btn-inline">
            {{ t('home.servicesAll') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div ref="threeContainer" class="immersive-stage">
      <!-- CSS3DRenderer renders here -->
      <!-- Transparentes Klick-Overlay: fängt alle Klicks (auch Zwischenräume) ab -->
      <div
        class="click-overlay touch-pan-y"
        @mousedown="startDrag"
        @touchstart.passive="startDrag"
        @mousemove="onDrag"
        @touchmove.passive="onDrag"
        @mouseup="stopDrag"
        @touchend="stopDrag"
        @mouseleave="onMouseLeave"
      />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { gsap } from 'gsap';

// Dynamically loaded in onMounted to avoid SSR issues
let CSS3DRenderer: any;
let CSS3DObject: any;
// Import service data and other dependencies

const { locale, t } = useI18n()
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
    slug: 'process-optimization',
    image: '/prozess-optimierung.jpg',
    title: locale.value === 'de' ? 'Prozessoptimierung' : 'Process Optimization',
    desc:  locale.value === 'de' ? 'Automatisierung & Digitalisierung Ihrer Geschäftsprozesse.' : 'Automation & digitization of your business processes.',
  },
  {
    slug: 'web-development',
    image: '/Websites.jpg',
    title: locale.value === 'de' ? 'Webentwicklung' : 'Web Development',
    desc:  locale.value === 'de' ? 'Schnelle, moderne Websites mit Top-Performance & sauberem Code.' : 'Fast, modern websites with top performance & clean code.',
  },
  {
    slug: 'hardware',
    image: '/hardware.jpg',
    title: 'Hardware',
    desc:  locale.value === 'de' ? 'Beschaffung, Einrichtung und Wartung von IT-Hardware.' : 'Procurement, setup and maintenance of IT hardware.',
  },
  {
    slug: 'e-commerce',
    image: '/e-comerce.jpg',
    title: 'E-Commerce',
    desc:  locale.value === 'de' ? 'Professionelle Online-Shops mit maximaler Conversion-Rate.' : 'Professional online shops with maximum conversion rate.',
  },
  {
    slug: 'consulting',
    image: '/consulting.jpg',
    title: 'Consulting',
    desc:  locale.value === 'de' ? 'Strategische IT- und Digitalberatung für Ihr Unternehmen.' : 'Strategic IT and digital consulting for your business.',
  },
  {
    slug: 'custom-web-apps',
    image: '/web-apps.jpg',
    title: locale.value === 'de' ? 'Web-Apps' : 'Web Apps',
    desc:  locale.value === 'de' ? 'Maßgeschneiderte Webanwendungen für komplexe Anforderungen.' : 'Tailored web applications for complex requirements.',
  },
  {
    slug: 'security-technology',
    image: '/Sicherheitstechnik.jpg',
    title: locale.value === 'de' ? 'Sicherheitstechnik' : 'Security Technology',
    desc:  locale.value === 'de' ? 'Überwachungskameras, Zugangssysteme und Alarmanlagen.' : 'Surveillance cameras, access systems and alarm systems.',
  },
  {
    slug: 'google-management',
    image: '/google.jpg',
    title: 'Google Management',
    desc:  locale.value === 'de' ? 'Google Ads, SEO & My Business — alles aus einer Hand.' : 'Google Ads, SEO & My Business — all from one source.',
  },
  {
    slug: 'it-security-cloud',
    image: '/it-sicherheit.jpg',
    title: locale.value === 'de' ? 'IT-Sicherheit & Cloud' : 'IT Security & Cloud',
    desc:  locale.value === 'de' ? 'Sichere Infrastruktur und Cloud-Lösungen für Ihr Business.' : 'Secure infrastructure and cloud solutions.',
  },
  {
    slug: 'ai-projects',
    image: '/ki-projekte.jpg',
    title: locale.value === 'de' ? 'KI-Projekte' : 'AI Projects',
    desc:  locale.value === 'de' ? 'KI-Integration und Automatisierung für Ihr Unternehmen.' : 'AI integration and automation for your business.',
  },
  {
    slug: 'smarthome',
    image: '/Smarthome.jpg',
    title: 'Smarthome',
    desc:  locale.value === 'de' ? 'Intelligente Heimautomatisierung — vernetzt gesteuert.' : 'Intelligent home automation — centrally controlled.',
  },
  {
    slug: 'social-media-marketing',
    image: '/social-media.jpg',
    title: locale.value === 'de' ? 'Social Media' : 'Social Media',
    desc:  locale.value === 'de' ? 'Strategische Präsenz auf Instagram, LinkedIn, TikTok und mehr.' : 'Strategic presence on Instagram, LinkedIn, TikTok and more.',
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
let carouselGroup: THREE.Group;  // Holds cards; drag rotation. Scene gets scroll offset.

// Scroll: snap points move along axis (scene.rotation.y), drag unchanged (carouselGroup.rotation.y)
const SCROLL_FACTOR = 0.00035;
const SCROLL_SMOOTH = 0.06;  // Lerp factor: dampens wobble, lower = smoother
let scrollOffset = 0;
let targetScrollOffset = 0;

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
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const DRAG_SENSITIVITY = isTouchDevice ? 0.0012 : 0.0024;
const TARGET_SMOOTH   = 0.22;     // Delay: left/right cancel each other during smoothing
const FOLLOW_LERP     = 0.18;     // How quickly wheel follows target (not braking)
const FRICTION        = 0.99;     // Coast decay – higher = longer spin
const VELOCITY_MULT   = isTouchDevice ? 3 : 10;   // Lower on mobile: light swipe = less spin
const COAST_FACTOR    = isTouchDevice ? 0.005 : 0.012;
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
  let bestIdx = getTargetIndex();
  let bestDist = Infinity;
  const W = rect.width;
  for (let i = 0; i < serviceObjects.length; i++) {
    serviceObjects[i].getWorldPosition(vec);
    // Skip cards behind the camera — their projections produce garbage screen positions
    if (vec.z > camera.position.z) continue;
    vec.project(camera);
    const screenX = (vec.x * 0.5 + 0.5) * W;
    const d = Math.abs(screenX - clickX);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  return bestIdx;
}

// ─── Drag ────────────────────────────────────────────────────────────────────

function startDrag(e: MouseEvent | TouchEvent) {
  if (!carouselGroup) return;
  wasCoasting  = Math.abs(velocity) > 0.02 || snapping;
  dragging     = true;
  dragMoved    = false;
  dragStartX   = cx(e);
  dragStartRot = carouselGroup.rotation.y;
  targetRotation = carouselGroup.rotation.y;
  lastX        = dragStartX;
  lastT        = Date.now();
  gsap.killTweensOf(carouselGroup.rotation);
  velocity = 0;
  snapping = false;
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return;
  const x  = cx(e);
  const dx = x - dragStartX;

  if (!dragMoved) {
    if (Math.abs(dx) < 8) return;
    gsap.killTweensOf(carouselGroup.rotation);
    snapping     = false;
    dragMoved    = true;
    dragStartX   = x;
    dragStartRot = carouselGroup.rotation.y;
    targetRotation = carouselGroup.rotation.y;
    velocity     = 0;
    return;
  }

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

  const naturalStop = carouselGroup.rotation.y - v * COAST_DECAY;
  const totalAtStop = naturalStop + scrollOffset;
  const nr = ((totalAtStop % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const raw = nr / step;
  const velDir = Math.sign(v);
  const targetIdx = ((velDir > 0 ? Math.ceil(raw - 1e-6) : Math.floor(raw + 1e-6)) + N) % N;
  const targetAngle = -(targetIdx * step) - scrollOffset;
  let delta = targetAngle - carouselGroup.rotation.y;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  // Prefer the direction that matches the user's velocity to avoid spinning the wrong way
  if (delta * v > 0) delta -= Math.sign(delta) * 2 * Math.PI;

  const neededV = -delta / COAST_DECAY;
  const sameDir = Math.sign(neededV) === Math.sign(v);
  if (sameDir && Math.abs(neededV) <= Math.abs(v) * 1.05) {
    velocity = neededV;
  } else {
    velocity = 0;
    const vRads = Math.abs(v) * COAST_FACTOR * 60;
    const T = Math.min(2.8, Math.max(0.4, 2 * Math.abs(delta) / vRads));
    snapping = true;
    gsap.to(carouselGroup.rotation, {
      y: carouselGroup.rotation.y + delta,
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

// Nearest snap point — total rotation = scroll + drag.
function getTargetIndex() {
  const N = services.value.length;
  if (!carouselGroup) return 0;
  const total = scrollOffset + carouselGroup.rotation.y;
  const nr = ((-total % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.round(nr / (2 * Math.PI / N)) % N;
}

// velocityRads: current speed in rad/s at the moment of snap.
// When provided, duration is calculated to match that speed (smooth handoff).
// When 0 (dot-button clicks), a fixed 0.9 s duration is used.
function snapToIndex(index: number, velocityRads = 0) {
  if (!carouselGroup) return;
  gsap.killTweensOf(carouselGroup.rotation);

  const N          = services.value.length;
  const targetAngle = -(index * 2 * Math.PI / N) - scrollOffset;
  let   current    = carouselGroup.rotation.y;
  let   delta      = targetAngle - current;
  while (delta >  Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  if (Math.abs(delta) < 0.0005) { updateCardStates(); return; }

  const T = velocityRads > 0.05
    ? Math.min(2.8, Math.max(0.4, 2 * Math.abs(delta) / velocityRads))
    : Math.max(0.4, Math.abs(delta) * 1.8);

  snapping = true;
  gsap.to(carouselGroup.rotation, {
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
  scene.rotation.z = (-8 * Math.PI) / 180;  // Tilt 5° (reduced for less wobble)

  carouselGroup = new THREE.Group();
  scene.add(carouselGroup);

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

    scrollOffset += (targetScrollOffset - scrollOffset) * (1 - Math.pow(1 - SCROLL_SMOOTH, 60 * dt));
    scene.rotation.y = scrollOffset;

    if (dragging && dragMoved) {
      const diff = targetRotation - carouselGroup.rotation.y;
      carouselGroup.rotation.y += diff * (1 - Math.pow(1 - FOLLOW_LERP, 60 * dt));
      updateCardStates();
    } else if (!snapping && Math.abs(velocity) > 0.0003) {
      carouselGroup.rotation.y -= velocity * COAST_FACTOR * (60 * dt);
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
        background-image: url('${service.image}');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        text-align: left;
        color: white;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
        opacity: 1;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
      ">
        <!-- Dark gradient overlay for readability -->
        <div style="
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        "></div>
        <!-- Text content -->
        <div style="
          position: relative;
          z-index: 1;
          padding: ${CARD_W >= 612 ? '36px' : CARD_W >= 468 ? '28px' : '22px'};
          width: 100%;
        ">
          <h3 style="
            font-size: ${CARD_W >= 612 ? '1.75rem' : CARD_W >= 468 ? '1.4rem' : '1.1rem'};
            font-weight: 800;
            margin: 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 12px rgba(0,0,0,0.6);
            color: #ffffff;
          ">${service.title}</h3>
        </div>
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

    carouselGroup.add(obj);
    serviceObjects.push(obj);
  });
};

// ─── Resize ───────────────────────────────────────────────────────────────────

function handleScroll() {
  targetScrollOffset = window.scrollY * SCROLL_FACTOR;
}

const handleResize = () => {
  if (!camera || !css3dRenderer || !threeContainer.value || !carouselGroup) return;
  const W = threeContainer.value.clientWidth;
  const H = threeContainer.value.clientHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  css3dRenderer.setSize(W, H);
  carouselGroup.clear();
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
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
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
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize',  handleResize);
  window.removeEventListener('mouseup', onWindowMouseUp);
  window.removeEventListener('touchend', onWindowMouseUp);
});
</script>

<style scoped>
.section-services {
  padding-bottom: 0;
}

.services-wrapper {
  position: relative;
}

.services-text {
  position: absolute;
  right: 0.75rem;
  left: 0.75rem;
  top: -2rem;
  z-index: 20;
  max-width: 28rem;
  margin-left: auto;
  text-align: right;
  pointer-events: none;
}

.services-text .subtitle-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.services-text .subtitle-row .btn-inline {
  margin-left: auto;
}

.services-text .btn-inline {
  pointer-events: auto;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .services-text {
    right: 2rem;
    top: -3rem;
    max-width: 32rem;
  }
}

/* Three.js container – extra height for 5° tilt so bottom isn't cut off */
.immersive-stage {
  position: relative;
  width: 100%;
  height: 130vh;
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