<template>
  <section class="section">
    <div class="container">
      <div class="mb-14 text-center">
        <UiBadge class="mb-4">{{ t('home.refsLabel') }}</UiBadge>
        <h2 class="section-title">{{ t('home.refsTitle') }}</h2>
      </div>

      <!-- Logos -->
      <div class="mb-16 flex flex-wrap items-center justify-center gap-8 opacity-50">
        <div
          v-for="logo in logos"
          :key="logo"
          class="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white/60"
        >
          {{ logo }}
        </div>
      </div>

      <!-- Testimonials -->
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="card"
        >
          <!-- Stars -->
          <div class="mb-4 flex gap-1">
            <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p class="mb-5 text-sm text-white/60 leading-relaxed italic">"{{ testimonial.quote }}"</p>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;">
              {{ testimonial.name[0] }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ testimonial.name }}</div>
              <div class="text-xs text-white/40">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const logos = ['Acme GmbH', 'TechStart', 'Vienna Co-Work', 'Digital Labs', 'CloudScale']

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
      ? 'Die Zusammenarbeit war professionell und unkompliziert. Das Ergebnis übertraf unsere Erwartungen.'
      : 'The collaboration was professional and straightforward. The result exceeded our expectations.',
    name: 'Thomas Bauer',
    role: locale.value === 'de' ? 'CTO, TechStart' : 'CTO, TechStart',
  },
  {
    quote: locale.value === 'de'
      ? 'Dank DH Agentur haben wir unsere Online-Präsenz komplett transformiert. Unsere Anfragen haben sich verdoppelt.'
      : 'Thanks to DH Agentur, we completely transformed our online presence. Our inquiries doubled.',
    name: 'Sarah Weber',
    role: locale.value === 'de' ? 'Marketing Lead, Vienna Co-Work' : 'Marketing Lead, Vienna Co-Work',
  },
])
</script>
