<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-32 pt-40 md:pt-48">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('services.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-5xl font-display font-black text-white md:text-6xl">
          {{ t('services.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60">{{ t('services.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Services grid -->
    <section class="section">
      <div class="container">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="`/services/${service.slug}`"
            class="group card flex flex-col gap-5"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400 transition-all group-hover:bg-brand-600 group-hover:text-white">
              <span v-html="service.icon" />
            </div>
            <div class="flex-1">
              <h3 class="mb-2 text-lg font-display font-bold text-white">{{ service.title }}</h3>
              <p class="text-sm text-white/50 leading-relaxed">{{ service.desc }}</p>
            </div>
            <div class="flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:gap-2 transition-all">
              {{ t('services.learnMore') }}
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container max-w-3xl">
        <h2 class="mb-10 text-2xl font-display font-bold text-white text-center">{{ t('services.faqTitle') }}</h2>
        <UiFaqAccordion :items="generalFaq" />
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2 class="mb-4 text-3xl font-display font-bold text-white">{{ locale === 'de' ? 'Welche Leistung brauchen Sie?' : 'Which service do you need?' }}</h2>
        <p class="mb-8 text-white/60">{{ locale === 'de' ? 'Sprechen Sie uns an — wir finden gemeinsam die richtige Lösung.' : 'Get in touch — we\'ll find the right solution together.' }}</p>
        <NuxtLink to="/contact" class="btn-primary">
          {{ t('services.cta') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.services.title'),
  description: t('meta.services.description'),
})

const services = computed(() => [
  {
    slug: 'web-development',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    title: locale.value === 'de' ? 'Webentwicklung' : 'Web Development',
    desc: locale.value === 'de' ? 'Moderne, schnelle Websites und Webpräsenzen auf Top-Niveau.' : 'Modern, fast websites and web presences at top level.',
  },
  {
    slug: 'process-optimization',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    title: locale.value === 'de' ? 'Prozessoptimierung' : 'Process Optimization',
    desc: locale.value === 'de' ? 'Digitalisierung und Automatisierung Ihrer Geschäftsprozesse.' : 'Digitization and automation of your business processes.',
  },
  {
    slug: 'digital-marketing',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>',
    title: 'Digital Marketing',
    desc: locale.value === 'de' ? 'Strategisches Online-Marketing für nachhaltiges Wachstum.' : 'Strategic online marketing for sustainable growth.',
  },
  {
    slug: 'ai-projects',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>',
    title: locale.value === 'de' ? 'KI-Projekte' : 'AI Projects',
    desc: locale.value === 'de' ? 'KI-Integration, Chatbots und intelligente Automatisierung.' : 'AI integration, chatbots and intelligent automation.',
  },
  {
    slug: 'google-management',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>',
    title: 'Google Management',
    desc: locale.value === 'de' ? 'Google Ads, SEO und My Business — vollständig betreut.' : 'Google Ads, SEO and My Business — fully managed.',
  },
  {
    slug: 'custom-web-apps',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>',
    title: locale.value === 'de' ? 'Individual-Webapps' : 'Custom Web Apps',
    desc: locale.value === 'de' ? 'Maßgeschneiderte Webanwendungen nach Ihren Anforderungen.' : 'Tailored web applications to your requirements.',
  },
  {
    slug: 'it-security-cloud',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    title: locale.value === 'de' ? 'IT-Sicherheit & Cloud' : 'IT Security & Cloud',
    desc: locale.value === 'de' ? 'Sichere Infrastruktur, Cloud-Migration und IT-Beratung.' : 'Secure infrastructure, cloud migration and IT consulting.',
  },
  {
    slug: 'digital-marketing-boost',
    icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
    title: locale.value === 'de' ? 'Marketing Boost' : 'Digital Marketing Boost',
    desc: locale.value === 'de' ? 'Schnelle Wachstumsimpulse durch gezielte Maßnahmen.' : 'Rapid growth through targeted marketing measures.',
  },
])

const generalFaq = computed(() => locale.value === 'de' ? [
  { question: 'Wie läuft ein Projekt bei DH Agentur ab?', answer: 'Wir starten mit einem kostenlosen Erstgespräch, um Ihre Ziele zu verstehen. Dann erstellen wir ein Angebot, starten mit einer Kickoff-Phase und arbeiten in kurzen Iterationen mit regelmäßigem Feedback.' },
  { question: 'Was kostet eine Zusammenarbeit mit DH Agentur?', answer: 'Die Kosten hängen stark vom Umfang des Projekts ab. Wir bieten faire Festpreise für klar definierte Projekte und Stundenmodelle für laufende Betreuung an.' },
  { question: 'Wie lange dauert die Umsetzung?', answer: 'Eine einfache Website ist oft in 2–4 Wochen fertig. Komplexere Projekte wie Custom-Apps oder umfangreiche Marketing-Kampagnen dauern entsprechend länger. Wir geben Ihnen immer einen konkreten Zeitplan.' },
  { question: 'Bietet ihr auch Wartung und Support an?', answer: 'Ja, wir bieten verschiedene Wartungs- und Support-Pakete an, damit Ihr digitales Produkt immer aktuell und sicher bleibt.' },
] : [
  { question: 'How does a project at DH Agentur work?', answer: 'We start with a free discovery call to understand your goals. Then we create a proposal, start with a kickoff phase, and work in short iterations with regular feedback.' },
  { question: 'What does working with DH Agentur cost?', answer: 'Costs depend heavily on the scope of the project. We offer fair fixed prices for clearly defined projects and hourly models for ongoing support.' },
  { question: 'How long does implementation take?', answer: 'A simple website is often ready in 2–4 weeks. More complex projects like custom apps or extensive marketing campaigns take correspondingly longer. We always give you a concrete timeline.' },
  { question: 'Do you offer maintenance and support?', answer: 'Yes, we offer various maintenance and support packages to keep your digital product always up-to-date and secure.' },
])
</script>


