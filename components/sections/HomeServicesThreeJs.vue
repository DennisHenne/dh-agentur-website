<template>
  <section class="section">
    <!-- Header content unchanged -->
    <div class="container mb-10 text-center">
      <!-- Existing header content -->
    </div>

    <!-- Three.js Container -->
    <div
      ref="threeContainer"
      class="immersive-stage"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
      @mousemove="onDrag"
      @touchmove.passive="onDrag"
      @mouseup="stopDrag"
      @touchend="stopDrag"
    >
      <!-- CSS3DRenderer will render here -->
    </div>

    <!-- Navigation dots -->
    <div class="mt-8 flex justify-center gap-2">
      <button
        v-for="(service, index) in services"
        :key="index"
        @click="snapToIndex(index)"
        :class="['w-3 h-3 rounded-full transition-all duration-300', activeServiceIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70']"
      ></button>
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
]
})

// Refs
const threeContainer = ref<HTMLDivElement>();
const activeServiceIndex = ref(0);

// Three.js variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let css3dRenderer: any;
let animationId: number;

// Array to track CSS3DObjects for state updates
let serviceObjects: any[] = [];

// Drag control state variables
let dragging = false;
let dragStartX = 0;
let dragStartRot = 0;
let velocity = 0;
let lastX = 0;
let lastT = 0;

// Helper function to get coordinates from events
function cx(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].clientX : e.clientX;
}

// ─── Drag ────────────────────────────────────────────────────────────────────

function startDrag(e: MouseEvent | TouchEvent) {
  dragging = true;
  dragStartX = cx(e);
  dragStartRot = scene.rotation.y;
  lastX = dragStartX;
  lastT = Date.now();
  velocity = 0;
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return;
  const x = cx(e);
  // Negate: drag right → ring appears to move right → left card comes to front
  scene.rotation.y = dragStartRot - (x - dragStartX) * 0.004;
  const now = Date.now();
  velocity = (x - lastX) / Math.max(1, now - lastT) * 16;
  lastX = x;
  lastT = now;
}

function stopDrag() {
  dragging = false;
  snapToIndex(getTargetIndex());
}

// ─── Index helpers ────────────────────────────────────────────────────────────

// Camera is at z≈0 (center of ring), looking along –Z.
// Cards: x = R·sin(θ_i),  z = –R·cos(θ_i)
// Drag is negated → rotation.y DECREASES when dragging right.
// Front position (z = –R) is reached when scene.rotation.y = –(i · 2π/N)  ← NEGATIVE
function getTargetIndex() {
  const N = services.value.length;
  const normalizedRotation = ((-scene.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const index = Math.round(normalizedRotation / (2 * Math.PI / N)) % N;
  return (index + N) % N;
}

function isCenterIndex(index: number) {
  return index === getTargetIndex();
}

function snapToIndex(index: number) {
  const N = services.value.length;
  // Front = scene.rotation.y = –(i · 2π/N)  (matches negated drag)
  const targetAngle = -(index * 2 * Math.PI) / N;

  // Shortest-path wrap: never spin more than π
  let current = scene.rotation.y;
  let delta = targetAngle - current;
  while (delta >  Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  gsap.to(scene.rotation, {
    y: current + delta,
    duration: 0.7,
    ease: 'power2.out',
    onUpdate: updateCardStates,
  });
}

function updateCardStates() {
  const N   = services.value.length;
  const cur = getTargetIndex();
  activeServiceIndex.value = cur;
  serviceObjects.forEach((obj, i) => {
    const diff = ((i - cur + N) % N);
    const isCenter   = diff === 0;
    const isAdjacent = diff === 1 || diff === N - 1;
    obj.element.className = `service-card ${isCenter ? 'center' : isAdjacent ? 'adjacent' : 'side'}`;

    // Apply emphasis via inline style on the inner content div
    // (scoped CSS can't reach dynamically created elements)
    const content = obj.element.querySelector('.service-card-content') as HTMLElement | null;
    if (!content) return;
    if (isCenter) {
      content.style.transform     = 'scale(1.15)';
      content.style.opacity       = '1';
      content.style.boxShadow     = '0 16px 64px rgba(0,200,150,0.35)';
    } else if (isAdjacent) {
      content.style.transform     = 'scale(1)';
      content.style.opacity       = '0.75';
      content.style.boxShadow     = '0 8px 32px rgba(0,0,0,0.3)';
    } else {
      content.style.transform     = 'scale(1)';
      content.style.opacity       = '0.45';
      content.style.boxShadow     = '0 8px 32px rgba(0,0,0,0.3)';
    }
  });
}

function handleServiceClick(index: number) {
  if (isCenterIndex(index)) {
    router.push(`/services/${services.value[index].slug}`);
  } else {
    snapToIndex(index);
  }
}

// ─── Three.js setup ───────────────────────────────────────────────────────────

const initThreeJs = () => {
  if (!threeContainer.value) return;
  scene = new THREE.Scene();

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
  camera = new THREE.PerspectiveCamera(80, W / H, 1, 10000);
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

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!dragging && Math.abs(velocity) > 0.001) {
      scene.rotation.y -= velocity * 0.008;  // matches negated drag direction
      velocity *= 0.93;
    }
    css3dRenderer.render(scene, camera);
  };
  animate();
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
        background: ${service.gradient};
        width: 100%;
        height: 100%;
        border-radius: 12px;
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
        opacity: 0.55;
        box-sizing: border-box;
      ">
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
      </div>`;
    el.addEventListener('click', () => handleServiceClick(index));

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
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (css3dRenderer && threeContainer.value) {
    threeContainer.value.removeChild(css3dRenderer.domElement);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Three.js container */
.immersive-stage {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  cursor: grab;
}

.immersive-stage:active {
  cursor: grabbing;
}

/* Dimensions + emphasis are applied via inline styles in JS (createServiceCards /
   updateCardStates) because Vue scoped CSS cannot reach dynamically created elements.
   Only structural rules that apply to the template itself live here. */
</style>