<template>
  <section class="section">
    <div class="container">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Left: Text -->
        <div>
          <UiBadge class="mb-4">{{ t('home.aboutLabel') }}</UiBadge>
          <h2 class="section-title mb-4">{{ t('home.aboutTitle') }}</h2>
          <p class="section-subtitle mb-8">{{ t('home.aboutSubtitle') }}</p>

          <ul class="mb-8 space-y-4">
            <li
              v-for="point in points"
              :key="point"
              class="flex items-start gap-3 text-sm text-white/60"
            >
              <span class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style="background:rgba(179,239,178,0.15); color:#B3EFB2;">
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {{ point }}
            </li>
          </ul>

          <NuxtLink to="/about" class="btn-primary">
            {{ t('home.aboutMore') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Values grid -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="value in values"
            :key="value.label"
            class="rounded-2xl border border-white/10 bg-dark-100 p-6"
            :class="value.full ? 'col-span-2' : ''"
          >
            <div class="mb-3 text-2xl">{{ value.emoji }}</div>
            <div class="mb-1 font-display font-bold text-white">{{ value.label }}</div>
            <p class="text-sm text-white/50">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const points = computed(() => locale.value === 'de' ? [
  'Transparente Kommunikation und klare Abläufe',
  'Moderne Technologien und bewährte Frameworks',
  'Fester Ansprechpartner für Ihr Projekt',
  'Schnelle Umsetzung ohne Qualitätsverlust',
] : [
  'Transparent communication and clear processes',
  'Modern technologies and proven frameworks',
  'Dedicated contact person for your project',
  'Fast execution without loss of quality',
])

const values = computed(() => [
  {
    emoji: '🎯',
    label: locale.value === 'de' ? 'Ergebnisorientiert' : 'Result-oriented',
    desc: locale.value === 'de' ? 'Wir messen uns an messbaren Resultaten, nicht an Stunden.' : 'We measure ourselves by measurable results, not hours.',
  },
  {
    emoji: '⚡',
    label: locale.value === 'de' ? 'Schnell & agil' : 'Fast & agile',
    desc: locale.value === 'de' ? 'Kurze Iterationen, schnelle Ergebnisse.' : 'Short iterations, fast results.',
  },
  {
    emoji: '🤝',
    label: locale.value === 'de' ? 'Partnerschaftlich' : 'Collaborative',
    desc: locale.value === 'de' ? 'Ihr Erfolg ist unser Erfolg — echte Partnerschaft.' : 'Your success is our success — true partnership.',
    full: true,
  },
])
</script>