<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('work.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-white sm:text-5xl md:text-6xl">
          {{ t('work.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60">{{ t('work.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Projects -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-white">{{ t('work.projectsTitle') }}</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="project in projects"
            :key="project.slug"
            :to="`/work/${project.slug}`"
            class="group relative overflow-hidden rounded-3xl border border-white/10 bg-dark-100 transition-all duration-300 hover:border-white/20"
          >
            <div class="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              :style="`background: radial-gradient(ellipse at top left, ${project.color}15, transparent 60%)`" />

            <div class="relative p-8">
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
                <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Referenzen / Testimonials -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-white">{{ t('work.refsTitle') }}</h2>

        <!-- Logos -->
        <div class="mb-12 flex flex-wrap items-center gap-6 opacity-50">
          <div v-for="logo in logos" :key="logo" class="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/60">
            {{ logo }}
          </div>
        </div>

        <!-- Testimonials -->
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="t2 in testimonials" :key="t2.name" class="card">
            <div class="mb-4 flex gap-1">
              <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="mb-5 text-sm text-white/60 italic leading-relaxed">"{{ t2.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;">
                {{ t2.name[0] }}
              </div>
              <div>
                <div class="text-sm font-semibold text-white">{{ t2.name }}</div>
                <div class="text-xs text-white/40">{{ t2.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2 class="mb-4 text-3xl font-display font-bold text-white">{{ locale === 'de' ? 'Ihr Projekt als nächstes?' : 'Your project next?' }}</h2>
        <p class="mb-8 text-white/60">{{ locale === 'de' ? 'Lassen Sie uns gemeinsam etwas Großartiges bauen.' : "Let's build something great together." }}</p>
        <NuxtLink to="/contact" class="btn-primary">
          {{ t('work.cta') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.work.title'),
  description: t('meta.work.description'),
})

const logos = ['Acme GmbH', 'TechStart', 'Vienna Co-Work', 'Digital Labs', 'CloudScale', 'MarketBoost']

const projects = computed(() => [
  {
    slug: 'testwebsites',
    type: 'Web Development',
    title: locale.value === 'de' ? 'Testwebsites Plattform' : 'Test Websites Platform',
    desc: locale.value === 'de'
      ? 'Entwicklung einer modernen Plattform für schnelles Prototyping und Testing von Webseiten-Konzepten für Agenturen und Freelancer.'
      : 'Development of a modern platform for rapid prototyping and testing of website concepts for agencies and freelancers.',
    tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    color: '#4a5eff',
  },
  {
    slug: 'co-working-space',
    type: 'Custom Web App',
    title: locale.value === 'de' ? 'Co-Working Space Plattform' : 'Co-Working Space Platform',
    desc: locale.value === 'de'
      ? 'Vollständiges Buchungs- und Verwaltungssystem für einen modernen Co-Working-Anbieter mit Member-Portal, Buchungskalender und Stripe-Integration.'
      : 'Complete booking and management system for a modern co-working provider with member portal, booking calendar and Stripe integration.',
    tags: ['Nuxt 3', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    color: '#a855f7',
  },
])

const testimonials = computed(() => [
  {
    quote: locale.value === 'de'
      ? 'DH Agentur hat unser Projekt pünktlich und genau nach unseren Vorstellungen umgesetzt. Absolute Empfehlung!'
      : 'DH Agentur delivered our project on time and exactly to our specifications. Highly recommended!',
    name: 'Anna Müller',
    role: locale.value === 'de' ? 'Geschäftsführerin, Acme GmbH' : 'CEO, Acme GmbH',
  },
  {
    quote: locale.value === 'de'
      ? 'Das Co-Working-System hat unser Business komplett transformiert. Buchungen laufen jetzt vollautomatisch.'
      : 'The co-working system completely transformed our business. Bookings now run fully automatically.',
    name: 'Thomas Bauer',
    role: locale.value === 'de' ? 'Gründer, Vienna Co-Work' : 'Founder, Vienna Co-Work',
  },
  {
    quote: locale.value === 'de'
      ? 'Die Testwebsite-Plattform hat unsere Präsentationszeit um 60% reduziert. Einfach genial.'
      : 'The test website platform reduced our presentation time by 60%. Simply brilliant.',
    name: 'Sarah Weber',
    role: locale.value === 'de' ? 'Creative Director, TechStart' : 'Creative Director, TechStart',
  },
])
</script>


