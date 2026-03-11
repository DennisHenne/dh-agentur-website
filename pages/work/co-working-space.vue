<template>
  <SectionsWorkDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Co-Working Space Plattform — DH Agentur' : 'Co-Working Space Platform — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Wie wir ein komplettes Buchungs- und Verwaltungssystem für einen Co-Working-Anbieter entwickelt haben.'
    : 'How we developed a complete booking and management system for a co-working provider.'),
})

const data = computed(() => ({
  title: locale.value === 'de' ? 'Co-Working Space Plattform' : 'Co-Working Space Platform',
  type: 'Custom Web App',
  year: '2024',
  desc: locale.value === 'de'
    ? 'Ein vollständiges Ökosystem für einen Co-Working-Anbieter: Member-Portal, Buchungskalender, Zugangskontrolle und automatisierte Abrechnung mit Stripe.'
    : 'A complete ecosystem for a co-working provider: member portal, booking calendar, access control and automated billing with Stripe.',
  tags: ['Nuxt 3', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker', 'TypeScript', 'Prisma'],
  color: '#a855f7',
  challenge: locale.value === 'de'
    ? 'Der Co-Working-Anbieter verwaltete alle Buchungen manuell per E-Mail und Excel. Das führte zu Doppelbuchungen, hohem Verwaltungsaufwand und frustrierten Mitgliedern, die keine Echtzeit-Übersicht über freie Plätze hatten.'
    : 'The co-working provider managed all bookings manually via email and Excel. This led to double bookings, high administrative effort and frustrated members who had no real-time overview of available spaces.',
  solution: locale.value === 'de'
    ? 'Wir entwickelten eine maßgeschneiderte Web-App mit Echtzeit-Buchungskalender, automatisierter Stripe-Abrechnung, Member-Portal mit Vertragsmanagement und einer Admin-Oberfläche für die vollständige Verwaltung des Spaces.'
    : 'We developed a tailored web app with real-time booking calendar, automated Stripe billing, member portal with contract management and an admin interface for complete management of the space.',
  result: locale.value === 'de'
    ? 'Der manuelle Verwaltungsaufwand sank um 80%. Buchungsabbrüche reduzierten sich um 45%. Die Mitgliederzufriedenheit stieg von 3,2 auf 4,7/5. Umsatz wuchs innerhalb von 6 Monaten um 35% durch bessere Auslastung.'
    : 'Manual administrative effort decreased by 80%. Booking abandonment was reduced by 45%. Member satisfaction increased from 3.2 to 4.7/5. Revenue grew by 35% within 6 months through better utilization.',
  features: locale.value === 'de' ? [
    { title: 'Echtzeit-Buchungskalender', desc: 'Live-Verfügbarkeit und Sofortbuchung für alle Arbeitsplätze und Räume.' },
    { title: 'Member-Portal', desc: 'Persönliches Dashboard für Buchungen, Rechnungen und Vertragsmanagement.' },
    { title: 'Stripe-Integration', desc: 'Automatische monatliche Abrechnung und Einzel-Buchungszahlungen.' },
    { title: 'Zugangskontrolle', desc: 'QR-Code-basierter Zugang, der mit dem Buchungssystem synchronisiert ist.' },
    { title: 'Admin-Dashboard', desc: 'Vollständige Verwaltung: Mitglieder, Buchungen, Auslastung, Finanzen.' },
    { title: 'Automatische E-Mails', desc: 'Buchungsbestätigungen, Erinnerungen und Rechnungen vollautomatisch.' },
  ] : [
    { title: 'Real-time Booking Calendar', desc: 'Live availability and instant booking for all workstations and rooms.' },
    { title: 'Member Portal', desc: 'Personal dashboard for bookings, invoices and contract management.' },
    { title: 'Stripe Integration', desc: 'Automatic monthly billing and individual booking payments.' },
    { title: 'Access Control', desc: 'QR code-based access synchronized with the booking system.' },
    { title: 'Admin Dashboard', desc: 'Complete management: members, bookings, utilization, finances.' },
    { title: 'Automated Emails', desc: 'Booking confirmations, reminders and invoices fully automated.' },
  ],
  stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'Prisma', 'Stripe', 'Docker', 'Redis', 'GitHub Actions'],
}))
</script>
