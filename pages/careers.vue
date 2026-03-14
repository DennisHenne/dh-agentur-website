<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('careers.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-white sm:text-5xl md:text-6xl">
          {{ t('careers.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60 leading-relaxed">{{ t('careers.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Why DH Agentur -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-white text-center">
          {{ locale === 'de' ? 'Warum DH Agentur?' : 'Why DH Agentur?' }}
        </h2>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="perk in perks" :key="perk.title" class="card">
            <div class="mb-3 text-2xl">{{ perk.emoji }}</div>
            <h3 class="mb-2 font-semibold text-white">{{ perk.title }}</h3>
            <p class="text-sm text-white/50">{{ perk.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-white">{{ t('careers.openPositions') }}</h2>
        <div class="space-y-4">
          <div
            v-for="job in jobs"
            :key="job.title"
            class="group rounded-2xl border border-white/10 bg-dark-100 p-6 transition-all hover:border-white/20 hover:bg-dark-200"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div class="mb-2 flex items-center gap-3 flex-wrap">
                  <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                    {{ job.type }}
                  </span>
                  <span class="text-xs text-white/40">{{ job.location }}</span>
                </div>
                <h3 class="mb-1 text-lg font-display font-bold text-white">{{ job.title }}</h3>
                <p class="text-sm text-white/50">{{ job.desc }}</p>
              </div>
              <NuxtLink to="/contact" class="btn-outline flex-shrink-0">
                {{ t('careers.apply') }}
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Process -->
    <section class="section">
      <div class="container max-w-3xl">
        <h2 class="mb-10 text-2xl font-display font-bold text-white text-center">{{ t('careers.processTitle') }}</h2>
        <div class="space-y-6">
          <div v-for="(step, i) in applicationProcess" :key="step.title" class="flex items-start gap-6">
            <div class="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-500/50 bg-brand-500/10 text-sm font-bold text-brand-400">
              {{ i + 1 }}
            </div>
            <div>
              <h3 class="mb-1 font-semibold text-white">{{ step.title }}</h3>
              <p class="text-sm text-white/50">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spontaneous Application -->
    <section class="section">
      <div class="container">
        <div class="relative overflow-hidden rounded-3xl p-12 text-center" style="border:1px solid rgba(122,158,126,0.22); background:linear-gradient(135deg,#31493C 0%,#0c2a35 60%,#001A23 100%)">
          <div class="absolute top-0 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl" />
          <div class="relative">
            <div class="mb-4 text-4xl">📬</div>
            <h2 class="mb-3 text-2xl font-display font-bold text-white">{{ t('careers.spontaneous') }}</h2>
            <p class="mb-8 text-white/60 max-w-lg mx-auto">{{ t('careers.spontaneousText') }}</p>
            <NuxtLink to="/contact" class="btn-primary">
              {{ locale === 'de' ? 'Initiativbewerbung senden' : 'Send spontaneous application' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.careers.title'),
  description: t('meta.careers.description'),
})

const perks = computed(() => [
  {
    emoji: '🏡',
    title: locale.value === 'de' ? 'Remote First' : 'Remote First',
    desc: locale.value === 'de' ? 'Arbeite von überall — wir sind ein remote-freundliches Team.' : 'Work from anywhere — we are a remote-friendly team.',
  },
  {
    emoji: '📚',
    title: locale.value === 'de' ? 'Weiterbildung' : 'Learning & Development',
    desc: locale.value === 'de' ? 'Budget für Kurse, Konferenzen und Weiterbildung.' : 'Budget for courses, conferences and development.',
  },
  {
    emoji: '⚡',
    title: locale.value === 'de' ? 'Moderne Tools' : 'Modern Tools',
    desc: locale.value === 'de' ? 'Nuxt 3, TypeScript, Tailwind — wir arbeiten mit dem Best-of-Breed.' : 'Nuxt 3, TypeScript, Tailwind — we work with best-of-breed tools.',
  },
  {
    emoji: '💸',
    title: locale.value === 'de' ? 'Faire Vergütung' : 'Fair Compensation',
    desc: locale.value === 'de' ? 'Marktgerechte Bezahlung und Performance-Boni.' : 'Market-rate pay and performance bonuses.',
  },
  {
    emoji: '🚀',
    title: locale.value === 'de' ? 'Wachstum' : 'Growth',
    desc: locale.value === 'de' ? 'Direkter Einfluss auf Produkt und Strategie — kein Silo.' : 'Direct influence on product and strategy — no siloes.',
  },
  {
    emoji: '🤝',
    title: locale.value === 'de' ? 'Team Spirit' : 'Team Spirit',
    desc: locale.value === 'de' ? 'Kleines Team, große Wirkung. Echte Zusammenarbeit statt Politik.' : 'Small team, big impact. Real collaboration, no politics.',
  },
])

const jobs = computed(() => [
  {
    title: locale.value === 'de' ? 'Senior Frontend-Entwickler (m/w/d)' : 'Senior Frontend Developer',
    type: locale.value === 'de' ? 'Vollzeit' : 'Full-time',
    location: locale.value === 'de' ? 'Remote / Wien' : 'Remote / Vienna',
    desc: locale.value === 'de'
      ? 'Du bringst tiefes Wissen in Vue 3 / Nuxt 3 mit und liebst es, performante, skalierbare UIs zu bauen.'
      : 'You have deep knowledge of Vue 3 / Nuxt 3 and love building performant, scalable UIs.',
  },
  {
    title: locale.value === 'de' ? 'Digital Marketing Manager (m/w/d)' : 'Digital Marketing Manager',
    type: locale.value === 'de' ? 'Vollzeit' : 'Full-time',
    location: locale.value === 'de' ? 'Remote / Wien' : 'Remote / Vienna',
    desc: locale.value === 'de'
      ? 'Du managst Google Ads und Meta-Kampagnen selbstständig und bringst nachweisliche Erfolge mit.'
      : 'You independently manage Google Ads and Meta campaigns and bring proven results.',
  },
  {
    title: locale.value === 'de' ? 'UX/UI Designer (m/w/d)' : 'UX/UI Designer',
    type: locale.value === 'de' ? 'Freelance / Teilzeit' : 'Freelance / Part-time',
    location: locale.value === 'de' ? 'Remote' : 'Remote',
    desc: locale.value === 'de'
      ? 'Du designst Interfaces in Figma mit Fokus auf Conversion-Optimierung und moderne Ästhetik.'
      : 'You design interfaces in Figma with a focus on conversion optimization and modern aesthetics.',
  },
])

const applicationProcess = computed(() => locale.value === 'de' ? [
  { title: 'Bewerbung senden', desc: 'CV, kurzes Motivationsschreiben und (wenn vorhanden) Portfolio über unser Kontaktformular.' },
  { title: 'Erstes Gespräch', desc: '30-minütiges Video-Call, um uns gegenseitig kennenzulernen — entspannte Atmosphäre, keine Tests.' },
  { title: 'Technisches Gespräch / Case', desc: 'Je nach Rolle: technisches Interview oder kleiner bezahlter Case (max. 3 Stunden).' },
  { title: 'Finales Gespräch', desc: 'Kennenlernen des Teams und Klärung aller offenen Fragen zu Konditionen und Start.' },
  { title: 'Angebot & Start', desc: 'Bei gegenseitigem Interesse: schriftliches Angebot und Abstimmung des Startdatums.' },
] : [
  { title: 'Send application', desc: 'CV, short motivation letter and (if available) portfolio via our contact form.' },
  { title: 'First conversation', desc: '30-minute video call to get to know each other — relaxed atmosphere, no tests.' },
  { title: 'Technical interview / case', desc: 'Depending on role: technical interview or small paid case study (max. 3 hours).' },
  { title: 'Final conversation', desc: 'Meet the team and clarify all open questions about terms and start date.' },
  { title: 'Offer & start', desc: 'With mutual interest: written offer and agreement on the start date.' },
])
</script>


