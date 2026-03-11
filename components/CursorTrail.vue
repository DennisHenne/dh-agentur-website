<template>
  <canvas ref="canvasEl" class="pointer-events-none fixed inset-0 z-[1]" />
</template>

<script setup lang="ts">
const canvasEl = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Each particle = one glow dot with a finite lifetime
  interface Particle { x: number; y: number; alpha: number }
  const particles: Particle[] = []

  const RADIUS   = 72    // glow radius px (55 * 1.3)
  const LIFETIME = 0.0083 // alpha decrease per frame → 1/0.0083 ≈ 120 frames ≈ 2s at 60fps

  let animId: number

  function resize() {
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }

  function onMouseMove(e: MouseEvent) {
    particles.push({ x: e.clientX, y: e.clientY, alpha: 1 })
  }

  function draw() {
    if (!canvas || !ctx) return

    // Full clear every frame — no residue ever
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw each particle
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.alpha -= LIFETIME

      if (p.alpha <= 0) {
        particles.splice(i, 1)
        continue
      }

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, RADIUS)
      glow.addColorStop(0,   `rgba(179, 239, 178, ${0.22 * p.alpha})`)
      glow.addColorStop(0.5, `rgba(179, 239, 178, ${0.08 * p.alpha})`)
      glow.addColorStop(1,   'rgba(179, 239, 178, 0)')

      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    animId = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
  })
})
</script>
