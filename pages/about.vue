<template>
  <div>
    <!-- Hero mit Profilbild -->
    <section class="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <!-- Dezentes Hintergrundmuster -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 2px 2px, #B3EFB2 1px, transparent 0); background-size: 32px 32px;" />
      <div class="container relative">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div class="flex-shrink-0 order-2 md:order-1">
            <div class="relative">
              <img
                src="/Profilbild (2).webp"
                alt="Dennis Henne"
                class="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl object-cover border-2 shadow-2xl ring-4 ring-white/5"
                style="border-color: rgba(179,239,178,0.25); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(179,239,178,0.1);"
              />
            </div>
          </div>
          <div class="flex-1 order-1 md:order-2 text-center md:text-left">
            <UiBadge class="mb-4">{{ t('about.label') }}</UiBadge>
            <h1 class="section-title mb-6 max-w-3xl">{{ t('about.title') }}</h1>
            <p class="section-subtitle max-w-2xl mb-6">{{ t('about.subtitle') }}</p>
            <div class="flex flex-col items-center md:items-start gap-1">
              <span class="font-display font-bold text-dark text-lg">Dennis Henne</span>
              <span class="text-dark/60 text-sm">{{ t('about.founder') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <!-- Process -->
    <section class="section">
      <div class="container">
        <div class="mb-12 text-center">
          <UiBadge class="mb-4">{{ t('about.processLabel') }}</UiBadge>
          <h2 class="section-title mb-4">{{ t('about.processTitle') }}</h2>
          <p class="section-subtitle mx-auto max-w-2xl">{{ t('about.processSubtitle') }}</p>
        </div>
        <div class="relative mx-auto max-w-3xl">
          <div class="absolute left-6 top-0 h-full w-px" style="background:linear-gradient(to bottom,rgba(179,239,178,0.3),transparent)" />
          <div
            v-for="(step, i) in processSteps"
            :key="step.title"
            class="relative mb-8 pl-16 last:mb-0"
          >
            <div class="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold font-display" style="border-color:rgba(179,239,178,0.3); background:rgba(49,73,60,0.4); color:#B3EFB2;">
              {{ i + 1 }}
            </div>
            <div class="card">
              <h3 class="mb-2 font-display font-bold text-dark">{{ step.title }}</h3>
              <p class="text-sm text-dark/60">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section">
      <div class="container">
        <div class="mx-auto max-w-4xl">
          <div class="mb-10 text-center">
            <UiBadge class="mb-4">{{ t('about.statsLabel') }}</UiBadge>
            <h2 class="section-title">{{ t('about.statsTitle') }}</h2>
          </div>
          <div class="grid grid-cols-2 gap-px lg:grid-cols-4" style="background:rgba(122,158,126,0.15); border-radius:16px; overflow:hidden;">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex flex-col items-center justify-center py-10 px-6 text-center"
              style="background:rgba(255,255,255,0.8);"
            >
              <span class="mb-2 font-display text-5xl font-black" style="color:#31493C;">{{ stat.value }}</span>
              <span class="text-sm font-medium text-dark/70">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Referenzen / Testimonials -->
    <section class="section pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-dark">{{ t('work.refsTitle') }}</h2>

        <!-- Testimonials -->
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="t2 in testimonials" :key="t2.name" class="card">
            <div class="mb-4 flex gap-1">
              <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="mb-5 text-sm text-dark/60 italic leading-relaxed">"{{ t2.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;">
                {{ t2.name[0] }}
              </div>
              <div>
                <div class="text-sm font-semibold text-dark">{{ t2.name }}</div>
                <div class="text-xs text-dark/50">{{ t2.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA (wie Startseite) -->
    <section class="section">
      <div class="container">
        <div class="relative overflow-hidden rounded-[50px] text-center min-h-[280px] sm:min-h-[360px] md:min-h-[420px]" style="background: #0a1f28; border: 1px solid rgba(122,158,126,0.12);">
          <video
            autoplay
            muted
            loop
            playsinline
            class="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/rocket.webm" type="video/webm">
          <source src="/rocket.mp4" type="video/mp4">
          </video>
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div class="relative flex flex-col items-center justify-center gap-6 p-12 md:p-20 min-h-[420px]">
            <h2 class="section-title text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{{ t('about.ctaTitle') }}</h2>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NuxtLink to="/contact" class="btn-primary text-base px-8 py-4">
                {{ t('about.ctaButton') }}
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
              <NuxtLink to="/work" class="btn-secondary text-base px-8 py-4">
                {{ t('home.workAll') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('meta.about.title'),
  description: () => t('meta.about.description'),
})

const team = [
  { initials: 'DH', name: 'Dennis Henne', role: 'Inhaber', bio: 'Gründer und Inhaber der DH Online&Eventagentur. Experte für digitale Transformation und Events.' },
]

const values = [
  { icon: '🎯', title: 'Ergebnisorientiert', desc: 'Wir messen uns an konkreten, messbaren Ergebnissen — nicht an Aktivitäten.' },
  { icon: '🤝', title: 'Partnerschaftlich', desc: 'Wir arbeiten auf Augenhöhe, transparent und mit klarer Kommunikation.' },
  { icon: '⚡', title: 'Pragmatisch', desc: 'Lösungen, die funktionieren — ohne unnötige Komplexität.' },
  { icon: '🔬', title: 'Datengetrieben', desc: 'Entscheidungen auf Basis von Daten, nicht Bauchgefühl.' },
]

const processSteps = computed(() => {
  void locale.value // Reaktivität bei Sprachwechsel
  return [
    { title: t('about.step1Title'), desc: t('about.step1Desc') },
    { title: t('about.step2Title'), desc: t('about.step2Desc') },
    { title: t('about.step3Title'), desc: t('about.step3Desc') },
    { title: t('about.step4Title'), desc: t('about.step4Desc') },
  ]
})

const stats = computed(() => {
  void locale.value // Reaktivität bei Sprachwechsel
  return [
    { value: '50+', label: t('about.stat1Label') },
    { value: '98%', label: t('about.stat2Label') },
    { value: '5+', label: t('about.stat3Label') },
    { value: '3×', label: t('about.stat4Label') },
  ]
})

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

