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

      <div class="grid gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="project in projects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="group relative overflow-hidden rounded-3xl border border-white/10 bg-dark-100 transition-all duration-300 hover:border-white/20"
        >
          <!-- Color accent -->
          <div class="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" :style="`background: radial-gradient(ellipse at top left, ${project.color}15, transparent 60%)`" />

          <div class="p-8">
            <div class="mb-6 flex items-center justify-between">
              <span class="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/60">
                {{ project.type }}
              </span>
              <svg class="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            <h3 class="mb-3 text-2xl font-display font-bold text-white">{{ project.title }}</h3>
            <p class="mb-6 text-sm text-white/50 leading-relaxed">{{ project.desc }}</p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const projects = computed(() => [
  {
    slug: 'testwebsites',
    type: 'Web Development',
    title: locale.value === 'de' ? 'Testwebsites Plattform' : 'Test Websites Platform',
    desc: locale.value === 'de'
      ? 'Entwicklung einer Plattform zum schnellen Prototyping und Testing von Webseiten-Konzepten.'
      : 'Development of a platform for rapid prototyping and testing of website concepts.',
    tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Supabase'],
    color: '#4a5eff',
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
  },
])
</script>
