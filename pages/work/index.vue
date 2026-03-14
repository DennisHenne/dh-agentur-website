<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('work.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-dark sm:text-5xl md:text-6xl">
          {{ t('work.pageTitle') }}
        </h1>
        <p class="text-lg text-dark/60">{{ t('work.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Projects – 12 Referenzen wie im Karussell, mit Bild und Beschreibung -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-dark">{{ t('work.projectsTitle') }}</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="ref in references"
            :key="ref.slug"
            :to="`/work/${ref.slug}`"
            class="group overflow-hidden rounded-3xl border border-forest/15 bg-white/50 transition-all duration-300 hover:border-forest/25"
          >
            <div class="aspect-square overflow-hidden rounded-t-3xl">
              <img
                src="/test-pitcture-carussel.jpg"
                :alt="ref.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="p-5">
              <h3 class="mb-2 font-display font-bold text-dark">{{ ref.title }}</h3>
              <p class="text-sm text-dark/60 leading-relaxed">{{ ref.desc }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Referenzen / Testimonials -->
    <section class="section">
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

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2 class="mb-4 text-3xl font-display font-bold text-dark">{{ locale === 'de' ? 'Ihr Projekt als nächstes?' : 'Your project next?' }}</h2>
        <p class="mb-8 text-dark/60">{{ locale === 'de' ? 'Lassen Sie uns gemeinsam etwas Großartiges bauen.' : "Let's build something great together." }}</p>
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

const references = computed(() => [
  { slug: 'reference-1', title: locale.value === 'de' ? 'Referenzprojekt 1' : 'Reference Project 1', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 1.' : 'Placeholder description for project 1.' },
  { slug: 'reference-2', title: locale.value === 'de' ? 'Referenzprojekt 2' : 'Reference Project 2', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 2.' : 'Placeholder description for project 2.' },
  { slug: 'reference-3', title: locale.value === 'de' ? 'Referenzprojekt 3' : 'Reference Project 3', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 3.' : 'Placeholder description for project 3.' },
  { slug: 'reference-4', title: locale.value === 'de' ? 'Referenzprojekt 4' : 'Reference Project 4', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 4.' : 'Placeholder description for project 4.' },
  { slug: 'reference-5', title: locale.value === 'de' ? 'Referenzprojekt 5' : 'Reference Project 5', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 5.' : 'Placeholder description for project 5.' },
  { slug: 'reference-6', title: locale.value === 'de' ? 'Referenzprojekt 6' : 'Reference Project 6', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 6.' : 'Placeholder description for project 6.' },
  { slug: 'reference-7', title: locale.value === 'de' ? 'Referenzprojekt 7' : 'Reference Project 7', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 7.' : 'Placeholder description for project 7.' },
  { slug: 'reference-8', title: locale.value === 'de' ? 'Referenzprojekt 8' : 'Reference Project 8', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 8.' : 'Placeholder description for project 8.' },
  { slug: 'reference-9', title: locale.value === 'de' ? 'Referenzprojekt 9' : 'Reference Project 9', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 9.' : 'Placeholder description for project 9.' },
  { slug: 'reference-10', title: locale.value === 'de' ? 'Referenzprojekt 10' : 'Reference Project 10', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 10.' : 'Placeholder description for project 10.' },
  { slug: 'reference-11', title: locale.value === 'de' ? 'Referenzprojekt 11' : 'Reference Project 11', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 11.' : 'Placeholder description for project 11.' },
  { slug: 'reference-12', title: locale.value === 'de' ? 'Referenzprojekt 12' : 'Reference Project 12', desc: locale.value === 'de' ? 'Placeholder Beschreibung für Projekt 12.' : 'Placeholder description for project 12.' },
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


