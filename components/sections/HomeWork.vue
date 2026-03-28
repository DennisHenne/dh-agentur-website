<template>
  <section class="section">
    <div class="container">
      <div class="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <UiBadge class="mb-4">{{ t('home.workLabel') }}</UiBadge>
          <h2 class="section-title">{{ t('home.workTitle') }}</h2>
          <p class="section-subtitle mt-3 max-w-lg">{{ t('home.workSubtitle') }}</p>
        </div>
        <NuxtLink to="/work" class="btn-outline flex-shrink-0">
          {{ t('home.workAll') }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <WorkCarousel3D :projects="projects" />
    </div>
  </section>
</template>

<script setup lang="ts">
import WorkCarousel3D from '~/components/ui/WorkCarousel3D.vue'
const { t, locale } = useI18n()

const projects = computed(() => {
  return [
    {
      slug: 'techvision',
      type: 'IT Consulting',
      title: 'TechVision GmbH',
      desc: locale.value === 'de'
        ? 'Komplette IT-Infrastruktur und Cloud-Migration für ein wachsendes Technologieunternehmen.'
        : 'Complete IT infrastructure and cloud migration for a growing technology company.',
      tags: ['Nuxt 3', 'Tailwind CSS', 'Cloud', 'SEO'],
      color: '#4a90d9',
      image: '/logo-techvision.webp',
    },
    {
      slug: 'greenleaf',
      type: 'E-Commerce',
      title: 'GreenLeaf Organics',
      desc: locale.value === 'de'
        ? 'Moderner Online-Shop für Bio-Produkte mit nahtloser Zahlungsabwicklung und Kundenverwaltung.'
        : 'Modern online shop for organic products with seamless payment processing and customer management.',
      tags: ['Nuxt 3', 'Stripe', 'Supabase', 'Tailwind CSS'],
      color: '#6fcf97',
      image: '/logo-greenleaf.webp',
    },
    {
      slug: 'urbanspace',
      type: 'Web App',
      title: 'UrbanSpace',
      desc: locale.value === 'de'
        ? 'Buchungs- und Verwaltungsplattform für Immobilien und Co-Working-Spaces in Wien.'
        : 'Booking and management platform for real estate and co-working spaces in Vienna.',
      tags: ['Vue 3', 'Node.js', 'PostgreSQL', 'Stripe'],
      color: '#f5a623',
      image: '/logo-urbanspace.webp',
    },
    {
      slug: 'swiftdrop',
      type: 'Mobile App',
      title: 'SwiftDrop',
      desc: locale.value === 'de'
        ? 'Echtzeit-Lieferverfolgung und Logistik-Dashboard für einen modernen Kurierdienst.'
        : 'Real-time delivery tracking and logistics dashboard for a modern courier service.',
      tags: ['React Native', 'Node.js', 'Maps API', 'Firebase'],
      color: '#7c3aed',
      image: '/logo-swiftdrop.webp',
    },
    {
      slug: 'medcore',
      type: 'Web App',
      title: 'MedCore Klinik',
      desc: locale.value === 'de'
        ? 'Digitales Patientenportal mit Terminbuchung, Befundansicht und sicherer Kommunikation.'
        : 'Digital patient portal with appointment booking, results view and secure communication.',
      tags: ['Nuxt 3', 'Vue 3', 'Supabase', 'DSGVO'],
      color: '#00b8a9',
      image: '/logo-medcore.webp',
    },
    {
      slug: 'bauwerk',
      type: 'Web Development',
      title: 'BauWerk Konstruktion',
      desc: locale.value === 'de'
        ? 'Professioneller Unternehmensauftritt mit Projektportfolio und integrierter Anfragenverwaltung.'
        : 'Professional company website with project portfolio and integrated inquiry management.',
      tags: ['Nuxt 3', 'Tailwind CSS', 'Strapi CMS'],
      color: '#f5c518',
      image: '/logo-bauwerk.webp',
    },
    {
      slug: 'finedge',
      type: 'Fintech Dashboard',
      title: 'FinEdge Capital',
      desc: locale.value === 'de'
        ? 'Investmentplattform mit Echtzeit-Marktdaten, Portfolio-Analyse und KI-gestützten Empfehlungen.'
        : 'Investment platform with real-time market data, portfolio analysis and AI-driven recommendations.',
      tags: ['Vue 3', 'D3.js', 'Node.js', 'PostgreSQL'],
      color: '#c9a84c',
      image: '/logo-finedge.webp',
    },
    {
      slug: 'foodbox',
      type: 'Mobile App',
      title: 'FoodBox',
      desc: locale.value === 'de'
        ? 'Lieferdienst-App mit Echtzeit-Tracking, Restaurantsuche und integriertem Zahlungssystem.'
        : 'Food delivery app with real-time tracking, restaurant search and integrated payment system.',
      tags: ['React Native', 'Firebase', 'Stripe', 'Maps'],
      color: '#ff4757',
      image: '/logo-foodbox.webp',
    },
    {
      slug: 'edupath',
      type: 'E-Learning',
      title: 'EduPath',
      desc: locale.value === 'de'
        ? 'Lernplattform mit interaktiven Kursen, Fortschrittstracking und Zertifikatsvergabe.'
        : 'Learning platform with interactive courses, progress tracking and certificate issuance.',
      tags: ['Nuxt 3', 'Supabase', 'Video Streaming', 'Stripe'],
      color: '#5c6bc0',
      image: '/logo-edupath.webp',
    },
    {
      slug: 'sportpulse',
      type: 'Booking System',
      title: 'SportPulse Fitness',
      desc: locale.value === 'de'
        ? 'Online-Buchungssystem für Fitnesskurse mit Mitgliederverwaltung und automatisierten Erinnerungen.'
        : 'Online booking system for fitness classes with member management and automated reminders.',
      tags: ['Vue 3', 'Node.js', 'Stripe', 'Tailwind CSS'],
      color: '#e63946',
      image: '/logo-sportpulse.webp',
    },
    {
      slug: 'legalhub',
      type: 'Legal Tech',
      title: 'LegalHub',
      desc: locale.value === 'de'
        ? 'Dokumentenmanagement-Plattform für Kanzleien mit KI-gestützter Vertragsprüfung.'
        : 'Document management platform for law firms with AI-powered contract review.',
      tags: ['Nuxt 3', 'OpenAI API', 'Supabase', 'PDF.js'],
      color: '#4a7c59',
      image: '/logo-legalhub.webp',
    },
    {
      slug: 'solartech',
      type: 'Web Development',
      title: 'SolarTech Energy',
      desc: locale.value === 'de'
        ? 'Unternehmenswebsite mit Live-Energiedaten-Dashboard und Angebotskonfigurator für Solaranlagen.'
        : 'Company website with live energy data dashboard and solar system quote configurator.',
      tags: ['Nuxt 3', 'Chart.js', 'Tailwind CSS', 'API'],
      color: '#ffd166',
      image: '/logo-solartech.webp',
    },
  ]
})
</script>
