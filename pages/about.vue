<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container">
        <UiBadge class="mb-4">{{ t('about.label') }}</UiBadge>
        <h1 class="section-title mb-6 max-w-3xl">{{ t('about.title') }}</h1>
        <p class="section-subtitle max-w-2xl">{{ t('about.subtitle') }}</p>
      </div>
    </section>

    <!-- Team -->
    <section class="section">
      <div class="container">
        <div class="mb-12 text-center">
          <UiBadge class="mb-4">{{ t('about.teamLabel') }}</UiBadge>
          <h2 class="section-title mb-4">{{ t('about.teamTitle') }}</h2>
          <p class="section-subtitle mx-auto max-w-2xl">{{ t('about.teamSubtitle') }}</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="member in team"
            :key="member.name"
            class="card text-center"
          >
            <div class="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-display font-bold" style="background:linear-gradient(135deg,#31493C,#7A9E7E); color:#B3EFB2;">
              {{ member.initials }}
            </div>
            <h3 class="mb-1 font-display text-lg font-bold text-light">{{ member.name }}</h3>
            <p class="mb-3 text-sm" style="color:#B3EFB2;">{{ member.role }}</p>
            <p class="text-sm text-white/60">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <div class="container">
        <div class="mb-12 text-center">
          <UiBadge class="mb-4">{{ t('about.valuesLabel') }}</UiBadge>
          <h2 class="section-title mb-4">{{ t('about.valuesTitle') }}</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="value in values"
            :key="value.title"
            class="card"
          >
            <div class="mb-4 text-3xl">{{ value.icon }}</div>
            <h3 class="mb-2 font-display font-bold text-light">{{ value.title }}</h3>
            <p class="text-sm text-white/60">{{ value.desc }}</p>
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
              <h3 class="mb-2 font-display font-bold text-light">{{ step.title }}</h3>
              <p class="text-sm text-white/60">{{ step.desc }}</p>
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
              style="background:#001A23;"
            >
              <span class="mb-2 font-display text-5xl font-black" style="color:#B3EFB2;">{{ stat.value }}</span>
              <span class="text-sm font-medium text-white/55">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="relative overflow-hidden rounded-3xl p-12 text-center md:p-20" style="border:1px solid rgba(122,158,126,0.22); background:linear-gradient(135deg,#31493C 0%,#0c2a35 60%,#001A23 100%)">
          <div class="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style="background:rgba(179,239,178,0.1)" />
          <div class="relative">
            <h2 class="section-title mb-4">{{ t('about.ctaTitle') }}</h2>
            <p class="section-subtitle mx-auto mb-8 max-w-xl">{{ t('about.ctaSubtitle') }}</p>
            <NuxtLink to="/contact" class="btn-primary">
              {{ t('about.ctaButton') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.aboutTitle'),
  description: () => t('seo.aboutDescription'),
})

const team = [
  { initials: 'DH', name: 'David Hofer', role: 'Founder & CEO', bio: 'Visionär und strategischer Kopf hinter DH Agentur. Experte für digitale Transformation.' },
  { initials: 'MK', name: 'Maria Klein', role: 'Head of Development', bio: 'Full-Stack-Entwicklerin mit Leidenschaft für sauberen Code und performante Lösungen.' },
  { initials: 'JS', name: 'Jonas Schwarz', role: 'Digital Marketing Lead', bio: 'SEO-, SEA- und Content-Stratege mit über 8 Jahren Erfahrung in wachstumsstarken Märkten.' },
]

const values = [
  { icon: '🎯', title: 'Ergebnisorientiert', desc: 'Wir messen uns an konkreten, messbaren Ergebnissen — nicht an Aktivitäten.' },
  { icon: '🤝', title: 'Partnerschaftlich', desc: 'Wir arbeiten auf Augenhöhe, transparent und mit klarer Kommunikation.' },
  { icon: '⚡', title: 'Pragmatisch', desc: 'Lösungen, die funktionieren — ohne unnötige Komplexität.' },
  { icon: '🔬', title: 'Datengetrieben', desc: 'Entscheidungen auf Basis von Daten, nicht Bauchgefühl.' },
]

const processSteps = [
  { title: 'Kennenlernen & Analyse', desc: 'Wir lernen euer Unternehmen, eure Ziele und eure Herausforderungen kennen.' },
  { title: 'Strategie & Konzept', desc: 'Gemeinsam entwickeln wir einen klaren Plan mit definierten Zielen und KPIs.' },
  { title: 'Umsetzung', desc: 'Agile Umsetzung in kurzen Sprints — mit regelmäßigen Updates und Feedback-Schleifen.' },
  { title: 'Launch & Optimierung', desc: 'Go-live, Monitoring und kontinuierliche Verbesserung auf Basis von echten Daten.' },
]

const stats = [
  { value: '50+', label: 'Projekte abgeschlossen' },
  { value: '98%', label: 'Kundenzufriedenheit' },
  { value: '5+', label: 'Jahre Erfahrung' },
  { value: '3×', label: 'Ø ROI unserer Kunden' },
]
</script>

