<template>
  <section class="section">
    <div class="container">
      <div class="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <UiBadge class="mb-4">{{ t('home.workLabel') }}</UiBadge>
          <h2 class="section-title">{{ t('home.workTitle') }}</h2>
          <p class="section-subtitle mt-3 max-w-lg">{{ t('home.workSubtitle') }}</p>
        </div>
        <NuxtLink to="/work" class="btn-outline flex-shrink-0">
          {{ t('home.workAll') }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <WorkCarousel3D :projects="projects" />
    </div>
  </section>
</template>

<script setup lang="ts">
import WorkCarousel3D from '~/components/ui/WorkCarousel3D.vue'
const { t, locale } = useI18n()

const projects = computed(() => {
  return [
    {
      slug: 'testwebsites',
      type: 'Web Development',
      title: locale.value === 'de' ? 'Testwebsites Plattform' : 'Test Websites Platform',
      desc: locale.value === 'de'
        ? 'Entwicklung einer Plattform zum schnellen Prototyping und Testing von Webseiten-Konzepten.'
        : 'Development of a platform for rapid prototyping and testing of website concepts.',
      tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Supabase'],
      color: '#4a5eff',
      image: '/Schwarz-transparent.svg',
    },
    {
      slug: 'co-working-space',
      type: 'Custom Web App',
      title: locale.value === 'de' ? 'Co-Working Space' : 'Co-Working Space',
      desc: locale.value === 'de'
        ? 'Buchungs- und Verwaltungssystem für einen modernen Co-Working-Anbieter in Wien.'
        : 'Booking and management system for a modern co-working provider in Vienna.',
      tags: ['Nuxt 3', 'Node.js', 'PostgreSQL', 'Stripe'],
      color: '#a855f7',
      image: '/Schwarz-transparent.svg',
    },
  ]
})
</script>
