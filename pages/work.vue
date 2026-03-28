<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ locale === 'de' ? 'Referenzen' : 'Our Work' }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-dark sm:text-5xl md:text-6xl">
          {{ locale === 'de' ? 'Projekte, die' : 'Projects that' }}
          <span class="gradient-text block">{{ locale === 'de' ? 'überzeugen.' : 'deliver.' }}</span>
        </h1>
        <p class="text-lg text-dark/60">
          {{ locale === 'de'
            ? 'Einblicke in ausgewählte Kundenprojekte — von der Idee bis zur fertigen Lösung.'
            : 'Insights into selected client projects — from idea to finished solution.' }}
        </p>
      </div>
    </section>

    <!-- Projects grid -->
    <section class="section pt-0">
      <div class="container">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="project in projects"
            :key="project.slug"
            class="group card overflow-hidden p-0"
          >
            <!-- Image -->
            <div class="relative h-52 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span class="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {{ project.type }}
              </span>
            </div>
            <!-- Content -->
            <div class="p-6">
              <h3 class="mb-2 text-lg font-display font-bold text-dark">{{ project.title }}</h3>
              <p class="mb-4 text-sm text-dark/60 leading-relaxed">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="rounded-full border border-forest/20 bg-forest/5 px-2.5 py-0.5 text-[11px] font-medium text-dark/60"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center">
        <h2 class="mb-4 text-3xl font-display font-bold text-dark">
          {{ locale === 'de' ? 'Ihr Projekt als Nächstes?' : 'Your project next?' }}
        </h2>
        <p class="mb-8 text-dark/60">
          {{ locale === 'de'
            ? 'Kontaktieren Sie uns — wir freuen uns auf Ihre Idee.'
            : 'Contact us — we look forward to your idea.' }}
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          {{ locale === 'de' ? 'Projekt anfragen' : 'Request a project' }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Referenzen — DH Agentur' : 'Our Work — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Einblicke in ausgewählte Kundenprojekte von DH Agentur — Webentwicklung, Apps, E-Commerce und mehr.'
    : 'Insights into selected client projects by DH Agentur — web development, apps, e-commerce and more.'),
})

const projects = computed(() => [
  {
    slug: 'techvision',
    type: 'IT Consulting',
    title: 'TechVision GmbH',
    desc: locale.value === 'de'
      ? 'Komplette IT-Infrastruktur und Cloud-Migration für ein wachsendes Technologieunternehmen.'
      : 'Complete IT infrastructure and cloud migration for a growing technology company.',
    tags: ['Nuxt 3', 'Tailwind CSS', 'Cloud', 'SEO'],
    image: '/work-techvision.webp',
  },
  {
    slug: 'greenleaf',
    type: 'E-Commerce',
    title: 'GreenLeaf Organics',
    desc: locale.value === 'de'
      ? 'Moderner Online-Shop für Bio-Produkte mit nahtloser Zahlungsabwicklung und Kundenverwaltung.'
      : 'Modern online shop for organic products with seamless payment processing and customer management.',
    tags: ['Nuxt 3', 'Stripe', 'Supabase', 'Tailwind CSS'],
    image: '/work-greenleaf.webp',
  },
  {
    slug: 'urbanspace',
    type: 'Web App',
    title: 'UrbanSpace',
    desc: locale.value === 'de'
      ? 'Buchungs- und Verwaltungsplattform für Immobilien und Co-Working-Spaces in Wien.'
      : 'Booking and management platform for real estate and co-working spaces in Vienna.',
    tags: ['Vue 3', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '/work-urbanspace.webp',
  },
  {
    slug: 'swiftdrop',
    type: 'Mobile App',
    title: 'SwiftDrop',
    desc: locale.value === 'de'
      ? 'Echtzeit-Lieferverfolgung und Logistik-Dashboard für einen modernen Kurierdienst.'
      : 'Real-time delivery tracking and logistics dashboard for a modern courier service.',
    tags: ['React Native', 'Node.js', 'Maps API', 'Firebase'],
    image: '/work-swiftdrop.webp',
  },
  {
    slug: 'medcore',
    type: 'Web App',
    title: 'MedCore Klinik',
    desc: locale.value === 'de'
      ? 'Digitales Patientenportal mit Terminbuchung, Befundansicht und sicherer Kommunikation.'
      : 'Digital patient portal with appointment booking, results view and secure communication.',
    tags: ['Nuxt 3', 'Vue 3', 'Supabase', 'DSGVO'],
    image: '/work-medcore.webp',
  },
  {
    slug: 'bauwerk',
    type: 'Web Development',
    title: 'BauWerk Konstruktion',
    desc: locale.value === 'de'
      ? 'Professioneller Unternehmensauftritt mit Projektportfolio und integrierter Anfragenverwaltung.'
      : 'Professional company website with project portfolio and integrated inquiry management.',
    tags: ['Nuxt 3', 'Tailwind CSS', 'Strapi CMS'],
    image: '/work-bauwerk.webp',
  },
  {
    slug: 'finedge',
    type: 'Fintech Dashboard',
    title: 'FinEdge Capital',
    desc: locale.value === 'de'
      ? 'Investmentplattform mit Echtzeit-Marktdaten, Portfolio-Analyse und KI-gestützten Empfehlungen.'
      : 'Investment platform with real-time market data, portfolio analysis and AI-driven recommendations.',
    tags: ['Vue 3', 'D3.js', 'Node.js', 'PostgreSQL'],
    image: '/work-finedge.webp',
  },
  {
    slug: 'foodbox',
    type: 'Mobile App',
    title: 'FoodBox',
    desc: locale.value === 'de'
      ? 'Lieferdienst-App mit Echtzeit-Tracking, Restaurantsuche und integriertem Zahlungssystem.'
      : 'Food delivery app with real-time tracking, restaurant search and integrated payment system.',
    tags: ['React Native', 'Firebase', 'Stripe', 'Maps'],
    image: '/work-foodbox.webp',
  },
  {
    slug: 'edupath',
    type: 'E-Learning',
    title: 'EduPath',
    desc: locale.value === 'de'
      ? 'Lernplattform mit interaktiven Kursen, Fortschrittstracking und Zertifikatsvergabe.'
      : 'Learning platform with interactive courses, progress tracking and certificate issuance.',
    tags: ['Nuxt 3', 'Supabase', 'Video Streaming', 'Stripe'],
    image: '/work-edupath.webp',
  },
  {
    slug: 'sportpulse',
    type: 'Booking System',
    title: 'SportPulse Fitness',
    desc: locale.value === 'de'
      ? 'Online-Buchungssystem für Fitnesskurse mit Mitgliederverwaltung und automatisierten Erinnerungen.'
      : 'Online booking system for fitness classes with member management and automated reminders.',
    tags: ['Vue 3', 'Node.js', 'Stripe', 'Tailwind CSS'],
    image: '/work-sportpulse.webp',
  },
  {
    slug: 'legalhub',
    type: 'Legal Tech',
    title: 'LegalHub',
    desc: locale.value === 'de'
      ? 'Dokumentenmanagement-Plattform für Kanzleien mit KI-gestützter Vertragsprüfung.'
      : 'Document management platform for law firms with AI-powered contract review.',
    tags: ['Nuxt 3', 'OpenAI API', 'Supabase', 'PDF.js'],
    image: '/work-legalhub.webp',
  },
  {
    slug: 'solartech',
    type: 'Web Development',
    title: 'SolarTech Energy',
    desc: locale.value === 'de'
      ? 'Unternehmenswebsite mit Live-Energiedaten-Dashboard und Angebotskonfigurator für Solaranlagen.'
      : 'Company website with live energy data dashboard and solar system quote configurator.',
    tags: ['Nuxt 3', 'Chart.js', 'Tailwind CSS', 'API'],
    image: '/work-solartech.webp',
  },
])

</script>
