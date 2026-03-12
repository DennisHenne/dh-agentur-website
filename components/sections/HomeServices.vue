<template>
  <section class="section">
    <div class="container mb-10 text-center">
      <UiBadge class="mb-4">{{ t('home.servicesLabel') }}</UiBadge>
      <h2 class="section-title">{{ t('home.servicesTitle') }}</h2>
      <p class="section-subtitle mt-3 mx-auto max-w-lg">{{ t('home.servicesSubtitle') }}</p>
    </div>

    <!-- Immersive 3D Carousel - User feels surrounded by services -->
    <div
      class="immersive-stage"
      ref="stageEl"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
    >
      <div class="carousel-container" :style="{ transform: `translateZ(-${RADIUS}px) rotateX(${tilt}deg) rotateY(${rotation}deg)` }">
        <div
          v-for="(svc, i) in services"
          :key="svc.slug"
          class="card-container"
          :style="cardStyle(i)"
          @click="handleClick(svc, i)"
        >
          <div 
            class="card-panel"
            :class="{ active: isCenter(i), next: isNext(i), prev: isPrev(i) }"
            :style="{ background: svc.gradient }"
          >
            <div class="card-glow" />
            <div class="card-content">
              <div class="card-icon" v-html="svc.icon" />
              <h3 class="card-title">{{ svc.title }}</h3>
              <p class="card-desc">{{ svc.desc }}</p>
              <div v-if="isCenter(i)" class="card-cta">
                {{ locale === 'de' ? 'Mehr erfahren' : 'Learn more' }}
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ambient particles for immersion -->
      <div class="ambient-particles">
        <div v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)" />
      </div>
    </div>

    <!-- Navigation dots -->
    <div class="mt-8 flex justify-center gap-2">
      <button
        v-for="(_, i) in services"
        :key="i"
        class="nav-dot"
        :class="{ active: activeIdx === i }"
        @click="snapTo(i)"
      />
    </div>

    <div class="mt-8 text-center">
      <NuxtLink to="/services" class="btn-outline">
        {{ t('home.servicesAll') }}
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const router = useRouter()

const navigateTo = (path: string) => router.push(path)

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

// ── Carousel Geometry ─────────────────────────────────────────────────────────────
// Show all cards in a circle
const N = computed(() => services.value.length)
const STEP = computed(() => 360 / N.value)
const RADIUS = 600  // Larger radius for more immersion

const rotation = ref(0)
const target = ref(0)
const tilt = ref(-8)  // Slight tilt for depth

const activeIdx = computed(() => {
  const norm = ((rotation.value % 360) + 360) % 360
  return Math.round(norm / STEP.value) % N.value
})

// Check if card is in center position
function isCenter(i: number) {
  const diff = getCardDistance(i)
  return diff === 0
}

// Check if card is next to center (right side)
function isNext(i: number) {
  const diff = getCardDistance(i)
  return diff === 1
}

// Check if card is next to center (left side)
function isPrev(i: number) {
  const diff = getCardDistance(i)
  return diff === -1
}

function getCardDistance(i: number) {
  const current = activeIdx.value
  let diff = i - current
  // Handle wrapping
  if (diff > N.value / 2) diff -= N.value
  if (diff < -N.value / 2) diff += N.value
  return diff
}

function cardStyle(i: number) {
  const angle = STEP.value * i
  const diff = getCardDistance(i)
  
  // Calculate depth and scale based on position
  const scale = Math.max(0.5, 1 - Math.abs(diff) * 0.1)
  const opacity = Math.max(0.2, 1 - Math.abs(diff) * 0.2)

  return {
    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
    opacity,
    cursor: 'pointer',
  }
}

function snapTo(i: number) {
  const cur = Math.round(rotation.value / STEP.value)
  const diff = i - (((cur % N.value) + N.value) % N.value)
  target.value = rotation.value + diff * STEP.value
  animate()
}

function handleClick(svc: { slug: string }, i: number) {
  if (isCenter(i)) navigateTo(`/services/${svc.slug}`)
  else snapTo(i)
}

let raf = 0
function animate() {
  cancelAnimationFrame(raf)
  const tick = () => {
    const d = target.value - rotation.value
    if (Math.abs(d) < 0.02) { rotation.value = target.value; return }
    rotation.value += d * 0.1
    // Subtle tilt animation
    tilt.value = -8 + Math.sin(rotation.value * Math.PI / 180) * 3
    raf = requestAnimationFrame(tick)
  }
  tick()
}

// ── Drag Controls ─────────────────────────────────────────────────────────────
const stageEl = ref<HTMLElement | null>(null)
let dragging = false
let dragStartX = 0
let dragStartRot = 0
let velocity = 0
let lastX = 0
let lastT = 0

function startDrag(e: MouseEvent | TouchEvent) {
  cancelAnimationFrame(raf)
  dragging = true
  dragStartX = cx(e)
  dragStartRot = rotation.value
  lastX = dragStartX; lastT = Date.now(); velocity = 0
  window.addEventListener('mousemove', onDrag, { passive: true })
  window.addEventListener('touchmove', onDrag, { passive: true })
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!dragging) return
  const x = cx(e)
  rotation.value = dragStartRot + (x - dragStartX) * 0.25
  const now = Date.now()
  velocity = (x - lastX) / Math.max(1, now - lastT) * 16
  lastX = x; lastT = now
}

function stopDrag() {
  dragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
  const step = STEP.value
  const nearest = Math.round((rotation.value + velocity * 2.5) / step) * step
  target.value = nearest
  animate()
}

function cx(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].clientX : e.clientX
}

// Particle animation for extra immersion
function particleStyle(n: number) {
  const delay = n * 0.5
  const duration = 15 + Math.random() * 10
  const size = 2 + Math.random() * 4
  return {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`,
  }
}

onUnmounted(() => cancelAnimationFrame(raf))
</script>

<style scoped>
/* ── Immersive Stage ───────────────────────────────────────────────────────── */
.immersive-stage {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  height: 520px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  position: relative;
  background: radial-gradient(ellipse at center, rgba(10, 40, 35, 0.3) 0%, transparent 70%);
}

.immersive-stage:active {
  cursor: grabbing;
}

/* ── Carousel Container ─────────────────────────────────────────────────────── */
.carousel-container {
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-out;
}

/* ── Card Container ─────────────────────────────────────────────────────────── */
.card-container {
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  height: 340px;
  aspect-ratio: 1/1;
}

/* ── Card Panel ─────────────────────────────────────────────────────────────── */
.card-panel {
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  border-radius: 28px;
  border: 1px solid rgba(179, 239, 178, 0.15);
  backface-visibility: hidden;
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(179, 239, 178, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-panel.active {
  border-color: rgba(179, 239, 178, 0.35);
  box-shadow: 
    0 50px 100px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(179, 239, 178, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.card-panel.next,
.card-panel.prev {
  filter: brightness(0.85) saturate(0.9);
}

/* Ambient glow behind cards */
.card-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(179, 239, 178, 0.08) 0%, transparent 60%);
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ── Card Content ───────────────────────────────────────────────────────────── */
.card-content {
  position: relative;
  z-index: 1;
  padding: 40px 36px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border: 1px solid rgba(179, 239, 178, 0.25);
  background: rgba(179, 239, 178, 0.1);
  color: #B3EFB2;
  margin-bottom: 28px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.card-panel.active .card-icon {
  transform: scale(1.1);
  background: rgba(179, 239, 178, 0.15);
  box-shadow: 0 0 30px rgba(179, 239, 178, 0.2);
}

.card-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: #E8F1F2;
  margin-bottom: 16px;
  font-family: var(--font-display, system-ui);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(232, 241, 242, 0.65);
  flex: 1;
}

.card-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #B3EFB2;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 30px;
  background: rgba(179, 239, 178, 0.1);
  border: 1px solid rgba(179, 239, 178, 0.2);
  transition: all 0.3s ease;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-cta:hover {
  background: rgba(179, 239, 178, 0.2);
  transform: translateX(4px);
}

/* ── Navigation Dots ───────────────────────────────────────────────────────── */
.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(122, 158, 126, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot:hover {
  background: rgba(179, 239, 178, 0.5);
  transform: scale(1.2);
}

.nav-dot.active {
  background: #B3EFB2;
  transform: scale(1.4);
  box-shadow: 0 0 15px rgba(179, 239, 178, 0.5);
}

/* ── Ambient Particles ─────────────────────────────────────────────────────── */
.ambient-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(179, 239, 178, 0.3);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) scale(0);
    opacity: 0;
  }
}
</style>
