<template>
  <section class="section section-references">
    <div class="references-wrapper">
      <div class="references-text">
        <UiBadge class="mb-4">{{ t('home.refsLabel') }}</UiBadge>
        <h2 class="section-title">{{ t('home.refsTitle') }}</h2>
        <div class="subtitle-row">
          <p class="section-subtitle">{{ t('home.refsSubtitle') }}</p>
          <NuxtLink to="/work" class="btn-outline btn-inline">
            {{ t('home.refsAll') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div ref="threeContainer" class="immersive-stage">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { gsap } from 'gsap';

let CSS3DRenderer: any;
let CSS3DObject: any;

const { t, locale } = useI18n()
const router = useRouter()

const navigateTo = (path: string) => router.push(path)

const references = computed(() => [
  { slug: 'reference-1', title: locale.value === 'de' ? 'Referenzprojekt 1' : 'Reference Project 1', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 1.' : 'Placeholder description for project 1.' },
  { slug: 'reference-2', title: locale.value === 'de' ? 'Referenzprojekt 2' : 'Reference Project 2', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 2.' : 'Placeholder description for project 2.' },
  { slug: 'reference-3', title: locale.value === 'de' ? 'Referenzprojekt 3' : 'Reference Project 3', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 3.' : 'Placeholder description for project 3.' },
  { slug: 'reference-4', title: locale.value === 'de' ? 'Referenzprojekt 4' : 'Reference Project 4', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 4.' : 'Placeholder description for project 4.' },
  { slug: 'reference-5', title: locale.value === 'de' ? 'Referenzprojekt 5' : 'Reference Project 5', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 5.' : 'Placeholder description for project 5.' },
  { slug: 'reference-6', title: locale.value === 'de' ? 'Referenzprojekt 6' : 'Reference Project 6', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 6.' : 'Placeholder description for project 6.' },
  { slug: 'reference-7', title: locale.value === 'de' ? 'Referenzprojekt 7' : 'Reference Project 7', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 7.' : 'Placeholder description for project 7.' },
  { slug: 'reference-8', title: locale.value === 'de' ? 'Referenzprojekt 8' : 'Reference Project 8', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 8.' : 'Placeholder description for project 8.' },
  { slug: 'reference-9', title: locale.value === 'de' ? 'Referenzprojekt 9' : 'Reference Project 9', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 9.' : 'Placeholder description for project 9.' },
  { slug: 'reference-10', title: locale.value === 'de' ? 'Referenzprojekt 10' : 'Reference Project 10', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 10.' : 'Placeholder description for project 10.' },
  { slug: 'reference-11', title: locale.value === 'de' ? 'Referenzprojekt 11' : 'Reference Project 11', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 11.' : 'Placeholder description for project 11.' },
  { slug: 'reference-12', title: locale.value === 'de' ? 'Referenzprojekt 12' : 'Reference Project 12', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 12.' : 'Placeholder description for project 12.' },
])

const threeContainer = ref<HTMLDivElement>();

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let css3dRenderer: any;
let animationId: number;

let referenceObjects: any[] = [];
let carouselGroup!: THREE.Group;  // Assigned in initThreeJs before any interaction

const SCROLL_FACTOR = 0.00035;
const SCROLL_SMOOTH = 0.06;  // Lerp factor: dampens wobble, lower = smoother
let scrollOffset = 0;
let targetScrollOffset = 0;

let dragging = false;
let dragStartX = 0;
let dragStartRot = 0;
let velocity = 0;
let lastX = 0;
let lastT = 0;
let snapping = false;
let dragMoved = false;
let wasCoasting = false;
let targetRotation = 0;

const DRAG_SENSITIVITY = 0.0024;
const TARGET_SMOOTH = 0.22;
const FOLLOW_LERP = 0.18;
const FRICTION = 0.99;
const VELOCITY_MULT = 10;
const COAST_FACTOR = 0.012;
const COAST_DECAY = COAST_FACTOR / (1 - FRICTION);

function cx(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].clientX : e.clientX;
}

function onMouseLeave() {
  if (dragging && dragMoved) stopDrag();
}

function onWindowMouseUp(e: MouseEvent | TouchEvent) {
  if (dragging) stopDrag(e);
}

function getCardIndexAtScreenX(clientX: number): number {
  if (!threeContainer.value || !scene || !camera || referenceObjects.length === 0) return getTargetIndex();
  const rect = threeContainer.value.getBoundingClientRect();
  const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const vec = new THREE.Vector3();
  let bestIdx = 0;
  let bestDist = Infinity;
  const W = rect.width;
  for (let i = 0; i < referenceObjects.length; i++) {
    referenceObjects[i].getWorldPosition(vec);
    vec.project(camera);
    const screenX = (vec.x * 0.5 + 0.5) * W;
    let d = Math.abs(screenX - clickX);
    if (d > W / 2) d = W - d;
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  return bestIdx;
}

function startDrag(e: MouseEvent | TouchEvent) {
  if (!carouselGroup) return;
  wasCoasting = Math.abs(velocity) > 0.02 || snapping;
  dragging = true;
  dragMoved = false;
  dragStartX = cx(e);
  dragStartRot = carouselGroup.rotation.y;
  targetRotation = carouselGroup.rotation.y;
  lastX = dragStartX;
  lastT = Date.now();
  gsap.killTweensOf(carouselGroup.rotation);
  velocity = 0;
  snapping = false;
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return;
  const x = cx(e);
  const dx = x - dragStartX;

  if (!dragMoved) {
    if (Math.abs(dx) < 8) return;
    gsap.killTweensOf(carouselGroup.rotation);
    snapping = false;
    dragMoved = true;
    dragStartX = x;
    dragStartRot = carouselGroup.rotation.y;
    targetRotation = carouselGroup.rotation.y;
    velocity = 0;
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
    if (wasCoasting) return;
    velocity = 0;
    const clientX = e ? ('changedTouches' in e && e.changedTouches[0] ? e.changedTouches[0].clientX : (e as MouseEvent).clientX) : lastX;
    const idx = e ? getCardIndexAtScreenX(clientX) : getTargetIndex();
    navigateTo(`/work/${references.value[idx].slug}`);
    return;
  }

  const N = references.value.length;
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

function getTargetIndex() {
  const N = references.value.length;
  if (!carouselGroup) return 0;
  const total = scrollOffset + carouselGroup.rotation.y;
  const nr = ((-total % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.round(nr / (2 * Math.PI / N)) % N;
}

function snapToIndex(index: number, velocityRads = 0) {
  if (!carouselGroup) return;
  gsap.killTweensOf(carouselGroup.rotation);

  const N = references.value.length;
  const targetAngle = -(index * 2 * Math.PI / N) - scrollOffset;
  let current = carouselGroup.rotation.y;
  let delta = targetAngle - current;
  while (delta > Math.PI) delta -= 2 * Math.PI;
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
    onUpdate: updateCardStates,
    onComplete: () => { snapping = false; },
  });
}

function updateCardStates() {
  referenceObjects.forEach((obj) => {
    obj.element.className = 'reference-card';
    const content = obj.element.querySelector('.reference-card-content') as HTMLElement | null;
    if (!content) return;
    content.style.transform = 'scale(1)';
    content.style.opacity = '1';
    content.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
  });
}

const initThreeJs = () => {
  if (!threeContainer.value) return;
  scene = new THREE.Scene();
  scene.rotation.order = 'ZYX';
  scene.rotation.z = (8 * Math.PI) / 180;  // Tilt 5° (reduced for less wobble)

  carouselGroup = new THREE.Group();
  scene.add(carouselGroup);

  const W = threeContainer.value.clientWidth;
  const H = threeContainer.value.clientHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, -1);

  css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(W, H);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top = '0';
  css3dRenderer.domElement.style.left = '0';
  threeContainer.value.appendChild(css3dRenderer.domElement);

  createReferenceCards();
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

const createReferenceCards = () => {
  const N = references.value.length;
  const CARD_W = window.innerWidth < 480 ? 360 : window.innerWidth < 768 ? 468 : 612;
  const CARD_H = CARD_W;
  const RADIUS = Math.ceil((CARD_W + 120) * N / (2 * Math.PI));

  references.value.forEach((ref, index) => {
    const angle = (index * 2 * Math.PI) / N;
    const x = RADIUS * Math.sin(angle);
    const y = 0;
    const z = -RADIUS * Math.cos(angle);

    const el = document.createElement('div');
    el.className = 'reference-card';
    el.style.cssText = `
      width: ${CARD_W}px;
      height: ${CARD_H}px;
      pointer-events: auto;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    `;

    el.innerHTML = `
      <div class="reference-card-content" style="
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
      </div>`;

    el.addEventListener('click', () => {
      if (!dragMoved && !wasCoasting) navigateTo(`/work/${ref.slug}`);
    });

    const obj = new CSS3DObject(el);
    obj.position.set(x, y, z);
    obj.lookAt(new THREE.Vector3(0, 0, 0));

    carouselGroup.add(obj);
    referenceObjects.push(obj);
  });
};

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
  referenceObjects = [];
  createReferenceCards();
  updateCardStates();
};

onMounted(async () => {
  const css3d = await import('three/examples/jsm/renderers/CSS3DRenderer.js');
  CSS3DRenderer = css3d.CSS3DRenderer;
  CSS3DObject = css3d.CSS3DObject;
  await nextTick();
  initThreeJs();
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('mouseup', onWindowMouseUp);
  window.addEventListener('touchend', onWindowMouseUp, { passive: true });
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (css3dRenderer && threeContainer.value) {
    threeContainer.value.removeChild(css3dRenderer.domElement);
  }
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mouseup', onWindowMouseUp);
  window.removeEventListener('touchend', onWindowMouseUp);
});
</script>

<style scoped>
.section-references {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: -1rem;
}

.references-wrapper {
  position: relative;
}

.references-text {
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  top: -2rem;
  z-index: 20;
  max-width: 28rem;
  margin-right: auto;
  pointer-events: none;
}

.references-text .subtitle-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.references-text .subtitle-row .btn-inline {
  margin-left: auto;
}

.references-text .btn-inline {
  pointer-events: auto;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .references-text {
    left: 2rem;
    top: -3rem;
    max-width: 32rem;
  }
}

.immersive-stage {
  position: relative;
  width: 100%;
  height: 130vh;
  overflow: hidden;
  cursor: default;
}

.click-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: auto;
  cursor: default;
}
</style>
