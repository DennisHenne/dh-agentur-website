<template>
  <div class="carousel-container relative h-[500px] w-full overflow-hidden" :style="`--perspective: ${props.perspective}px`" ref="container">
    <div class="carousel-scene relative flex h-full w-full items-center justify-center" ref="scene">
      <div
        v-for="(project, index) in projects"
        :key="project.slug"
        :class="`carousel-item absolute h-[${props.cardHeight}px] w-[${props.cardWidth}px] cursor-pointer rounded-3xl border border-white/10 bg-dark-100 p-6 transition-all duration-300`"
        @mouseenter="pauseRotation"
        @mouseleave="resumeRotation"
      >
        <div class="carousel-item-img-inner absolute inset-0 overflow-hidden rounded-3xl">
          <img :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
          <div class="gradient-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        <div class="relative z-10 flex h-full flex-col justify-between">
          <div>
            <span class="mb-4 inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/60">
              {{ project.type }}
            </span>
            <h3 class="mb-3 text-xl font-display font-bold text-white">{{ project.title }}</h3>
            <p class="text-sm text-white/50 leading-relaxed">{{ project.desc }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full bg-white/5 px-2 py-1 text-[10px] text-white/50"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const props = withDefaults(defineProps<{
  projects: any[]
  radius?: number
  perspective?: number
  cardWidth?: number
  cardHeight?: number
}>(), {
  radius: 400,
  perspective: 1000,
  cardWidth: 250,
  cardHeight: 300
})

const container = ref<HTMLElement | null>(null)
const scene = ref<HTMLElement | null>(null)
const items = ref<HTMLElement[]>([])
let autoRotateTween: gsap.core.Tween | null = null

const pauseRotation = () => {
  if (autoRotateTween) autoRotateTween.pause()
}

const resumeRotation = () => {
  if (autoRotateTween) autoRotateTween.resume()
}

onMounted(() => {
  items.value = gsap.utils.toArray('.carousel-item')
  const itemCount = items.value.length
  const angle = 360 / itemCount
  const radius = props.radius

  items.value.forEach((item, index) => {
    const itemAngle = index * angle
    gsap.set(item, {
      transformOrigin: `50% 50% 0`,
      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(180deg)`
    })
  })

  autoRotateTween = gsap.to(scene.value, {
    rotationY: -360,
    duration: 40,
    repeat: -1,
    ease: 'none'
  })

  Draggable.create(scene.value, {
    type: 'rotation',
    inertia: true,
    onDrag: function() {
      updateParallax()
    },
    onThrowUpdate: function() {
      updateParallax()
    },
    snap: {
      rotation: (value) => Math.round(value / angle) * angle
    }
  })

  const updateParallax = () => {
    items.value.forEach((item, index) => {
      const rotation = gsap.getProperty(scene.value, 'rotationY') as number
      const itemAngle = (index * angle + rotation) % 360
      const imgInner = item.querySelector('.carousel-item-img-inner')
      if (imgInner) {
        gsap.set(imgInner, { x: -itemAngle * 0.5 })
      }
    })
  }
  
  gsap.ticker.add(updateParallax)
})
</script>

<style scoped>
.carousel-container {
  perspective: var(--perspective);
  perspective-origin: 50% 50%;
}
.carousel-scene {
  transform-style: preserve-3d;
}
.carousel-item {
  backface-visibility: hidden;
}
.carousel-item-img-inner {
  transition: transform 0.3s ease-out;
}
.carousel-item:hover .carousel-item-img-inner {
  transform: scale(1.05);
}
.gradient-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}
</style>
