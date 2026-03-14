<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('contact.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-white sm:text-5xl md:text-6xl">
          {{ t('contact.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60">{{ t('contact.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Form + Info -->
    <section class="section">
      <div class="container grid gap-12 lg:grid-cols-3">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-white/70">{{ t('contact.form.name') }} *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  :placeholder="t('contact.form.name')"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-white/70">{{ t('contact.form.email') }} *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  :placeholder="t('contact.form.email')"
                />
              </div>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-white/70">{{ t('contact.form.company') }}</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  :placeholder="t('contact.form.company')"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-white/70">{{ t('contact.form.subject') }} *</label>
                <input
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  :placeholder="t('contact.form.subject')"
                />
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-white/70">{{ t('contact.form.message') }} *</label>
              <textarea
                v-model="form.message"
                required
                rows="6"
                class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
                :placeholder="t('contact.form.message')"
              />
            </div>

            <!-- Status Messages -->
            <Transition name="fade">
              <div v-if="formStatus === 'success'" class="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                ✓ {{ t('contact.form.success') }}
              </div>
              <div v-else-if="formStatus === 'error'" class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {{ t('contact.form.error') }}
              </div>
            </Transition>

            <button
              type="submit"
              class="btn-primary w-full justify-center"
              :disabled="loading"
            >
              <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ loading ? t('contact.form.sending') : t('contact.form.send') }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <h3 class="text-lg font-display font-bold text-white">{{ t('contact.infoTitle') }}</h3>

          <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
              <span v-html="info.icon" />
            </div>
            <div>
              <div class="text-xs text-white/40 mb-0.5">{{ info.label }}</div>
              <div class="text-sm text-white">{{ info.value }}</div>
            </div>
          </div>

          <!-- Response time -->
          <div class="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div class="flex items-center gap-2 mb-1">
              <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span class="text-xs font-semibold text-green-400">{{ locale === 'de' ? 'Schnelle Antwort' : 'Fast Response' }}</span>
            </div>
            <p class="text-xs text-white/50">
              {{ locale === 'de' ? 'Wir antworten in der Regel innerhalb von 24 Stunden, oft sogar schneller.' : 'We typically respond within 24 hours, often faster.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section">
      <div class="container max-w-3xl">
        <h2 class="mb-10 text-2xl font-display font-bold text-white text-center">{{ t('contact.faqTitle') }}</h2>
        <UiFaqAccordion :items="contactFaq" />
        <div class="mt-8 text-center">
          <NuxtLink to="/faq" class="text-sm text-brand-400 hover:text-brand-300 transition-colors">
            {{ locale === 'de' ? 'Alle Fragen ansehen →' : 'View all questions →' }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.contact.title'),
  description: t('meta.contact.description'),
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
})

const loading = ref(false)
const formStatus = ref<'idle' | 'success' | 'error'>('idle')

async function submitForm() {
  loading.value = true
  formStatus.value = 'idle'

  // Simulate form submission (replace with actual API call)
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Simulate success
  formStatus.value = 'success'
  loading.value = false

  // Reset form after success
  setTimeout(() => {
    Object.assign(form, { name: '', email: '', company: '', subject: '', message: '' })
    formStatus.value = 'idle'
  }, 5000)
}

const contactInfo = computed(() => [
  {
    icon: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    label: 'E-Mail',
    value: 'hallo@dh-agentur.at',
  },
  {
    icon: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>',
    label: locale.value === 'de' ? 'Telefon' : 'Phone',
    value: '+43 1 234 5678',
  },
  {
    icon: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    label: locale.value === 'de' ? 'Standort' : 'Location',
    value: 'Wien, Österreich',
  },
])

const contactFaq = computed(() => locale.value === 'de' ? [
  { question: 'Wie schnell melden Sie sich?', answer: 'Wir melden uns in der Regel innerhalb von 24 Stunden — oft deutlich schneller. An Wochentagen sogar innerhalb weniger Stunden.' },
  { question: 'Ist das Erstgespräch wirklich kostenlos?', answer: 'Ja, absolut. Das erste Gespräch (ca. 30–45 Minuten) ist vollständig kostenlos und unverbindlich.' },
  { question: 'Wie läuft ein erstes Gespräch ab?', answer: 'Wir lernen Ihr Unternehmen und Ihre Ziele kennen, stellen Ihnen Fragen zur aktuellen Situation und geben eine erste Einschätzung. Danach erhalten Sie ein konkretes Angebot.' },
  { question: 'In welchen Regionen arbeitet ihr?', answer: 'Wir arbeiten primär mit Unternehmen aus dem DACH-Raum (Deutschland, Österreich, Schweiz), können aber auch internationale Projekte umsetzen.' },
] : [
  { question: 'How quickly do you respond?', answer: 'We typically respond within 24 hours — often much faster. On weekdays, even within a few hours.' },
  { question: 'Is the first conversation really free?', answer: 'Yes, absolutely. The first conversation (approx. 30–45 minutes) is completely free and non-binding.' },
  { question: 'How does a first conversation work?', answer: 'We get to know your business and goals, ask questions about the current situation and give an initial assessment. Afterwards you receive a concrete proposal.' },
  { question: 'Which regions do you work in?', answer: 'We primarily work with companies from the DACH region (Germany, Austria, Switzerland), but can also implement international projects.' },
])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


