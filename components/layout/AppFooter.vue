<template>
  <footer ref="footerRef" class="footer relative pt-16 pb-8 pb-safe" style="background:#051d26;">
    <!-- Liquid wave - Übergang vom Content zum Footer -->
    <div class="liquid-wave-wrapper" :class="{ 'wave-visible': isWaveVisible }">
      <canvas ref="waveCanvas" class="liquid-wave-canvas" />
    </div>
    <div class="container relative z-10">
      <!-- Top Row -->
      <div class="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <!-- Brand -->
        <div class="footer-col lg:col-span-2" :class="{ 'footer-visible': isVisible }">
          <NuxtLink to="/" class="flex items-center gap-2 mb-4">
            <IconsLogoDH :size="80" class="hidden md:block text-light" />
            <span class="font-display text-xl font-bold text-white">Agentur</span>
          </NuxtLink>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs">{{ t('footer.tagline') }}</p>
        </div>

        <!-- Services -->
        <div class="footer-col footer-col-1" :class="{ 'footer-visible': isVisible }">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{{ t('nav.services') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="service in services" :key="service.to">
              <NuxtLink :to="service.to" class="text-sm text-white/60 hover:text-white transition-colors">
                {{ service.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div class="footer-col footer-col-2" :class="{ 'footer-visible': isVisible }">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{{ t('nav.about') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-white/60 hover:text-white transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-center md:text-left" :class="{ 'footer-visible': isVisible }" style="border-top:1px solid rgba(122,158,126,0.15)">
        <p class="text-xs text-white/30 order-2 md:order-1">
          © {{ year }} DH Agentur. {{ t('footer.allRights') }}
        </p>
        <div class="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 order-1 md:order-2">
          <NuxtLink to="/faq" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.faq') }}</NuxtLink>
          <NuxtLink to="/legal" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.legal') }}</NuxtLink>
          <NuxtLink to="/privacy" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.privacy') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
const footerRef = ref<HTMLElement | null>(null)
const waveCanvas = ref<HTMLCanvasElement | null>(null)
const isVisible = ref(false)
const isWaveVisible = ref(false)
const scrollProgress = ref(0)
let animationId = 0
let time = 0

function drawLiquidWave() {
  const canvas = waveCanvas.value
  if (!canvas) return

  const w = window.innerWidth
  const h = 220
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  if (canvas.width !== w * dpr) {
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.scale(dpr, dpr)

  const amp = 12 + scrollProgress.value * 20
  const freq1 = 0.008
  const freq2 = 0.018

  ctx.beginPath()
  ctx.moveTo(0, h + 10)
  ctx.lineTo(w + 20, h + 10)
  ctx.lineTo(w + 20, 0)

  /* Wave line höher im Canvas – Täler bleiben über dem Footer-Inhalt */
  const waveBaseY = 55
  for (let x = w + 20; x >= -20; x -= 3) {
    const y = waveBaseY
      + Math.sin(x * freq1 + time * 0.6) * amp
      + Math.sin(x * freq2 + time * 1.1) * amp * 0.6
    ctx.lineTo(x, y)
  }

  ctx.closePath()
  ctx.fillStyle = '#051d26'
  ctx.fill()

  ctx.strokeStyle = 'rgba(122,158,126,0.15)'
  ctx.lineWidth = 1
  ctx.stroke()

  time += 0.05
}

function updateScrollProgress() {
  if (!footerRef.value) return
  const rect = footerRef.value.getBoundingClientRect()
  const vh = window.innerHeight
  const progress = Math.max(0, Math.min(1, (vh - rect.top + 100) / (vh * 0.5)))
  scrollProgress.value = progress
}

onMounted(() => {
  if (!footerRef.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        isWaveVisible.value = true
      }
    },
    { threshold: 0.05, rootMargin: '0px 0px -80px 0px' }
  )
  observer.observe(footerRef.value)

  const tick = () => {
    updateScrollProgress()
    drawLiquidWave()
    animationId = requestAnimationFrame(tick)
  }
  tick()

  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  window.addEventListener('resize', () => {
    if (waveCanvas.value) drawLiquidWave()
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('scroll', updateScrollProgress)
})

const services = computed(() => [
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/digital-marketing', label: 'Digital Marketing' },
  { to: '/services/ai-projects', label: 'AI Projects' },
  { to: '/services/process-optimization', label: 'Process Optimization' },
  { to: '/services/custom-web-apps', label: 'Custom Web Apps' },
])

const footerLinks = computed(() => [
  { to: '/work', label: t('nav.work') },
  { to: '/insights', label: t('nav.insights') },
  { to: '/careers', label: t('nav.careers') },
  { to: '/contact', label: t('nav.contact') },
])
</script>

<style scoped>
.liquid-wave-wrapper {
  position: absolute;
  top: -120px;
  left: 0;
  width: 100%;
  height: 220px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.liquid-wave-wrapper.wave-visible {
  opacity: 1;
}

.liquid-wave-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.footer-col,
.footer-bottom {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.footer-col.footer-visible,
.footer-bottom.footer-visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-col-1 { transition-delay: 0.1s; }
.footer-col-2 { transition-delay: 0.2s; }
.footer-bottom { transition-delay: 0.3s; }
</style>
