<template>
  <SectionsWorkDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Testwebsites Plattform — DH Agentur' : 'Test Websites Platform — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Wie wir eine Plattform für schnelles Website-Prototyping entwickelt haben.'
    : 'How we developed a platform for rapid website prototyping.'),
})

const data = computed(() => ({
  title: locale.value === 'de' ? 'Testwebsites Plattform' : 'Test Websites Platform',
  type: 'Web Development',
  year: '2024',
  desc: locale.value === 'de'
    ? 'Eine moderne Plattform, die Agenturen und Freelancern ermöglicht, Website-Konzepte in Minuten zu prototypen, zu testen und Kunden zu präsentieren.'
    : 'A modern platform that enables agencies and freelancers to prototype, test and present website concepts to clients in minutes.',
  tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Supabase', 'TypeScript', 'Vercel'],
  color: '#4a5eff',
  challenge: locale.value === 'de'
    ? 'Agenturen verbringen zu viel Zeit mit dem Erstellen von Präsentationswebsites. Der Prozess vom ersten Entwurf bis zur Kundenpräsentation dauert Tage — Zeit, die besser investiert werden könnte.'
    : 'Agencies spend too much time creating presentation websites. The process from first draft to client presentation takes days — time that could be better invested.',
  solution: locale.value === 'de'
    ? 'Wir entwickelten eine intuitive Plattform mit vorgefertigten Blocks, Drag-and-Drop-Oberfläche und direktem Preview-Link für Kunden. Integration mit Nuxt Content für einfache Content-Pflege.'
    : 'We developed an intuitive platform with pre-built blocks, drag-and-drop interface and direct preview link for clients. Integration with Nuxt Content for easy content management.',
  result: locale.value === 'de'
    ? 'Die Präsentationszeit wurde um 65% reduziert. Über 120 Agenturen nutzen die Plattform aktiv. Durchschnittliche Bewertung von 4,8/5 Sternen. Konversionsrate der Kundenpräsentationen stieg um 40%.'
    : 'Presentation time was reduced by 65%. Over 120 agencies actively use the platform. Average rating of 4.8/5 stars. Client presentation conversion rate increased by 40%.',
  features: locale.value === 'de' ? [
    { title: 'Block-Library', desc: '50+ vorgefertigte, anpassbare Website-Blocks.' },
    { title: 'Live-Preview', desc: 'Sofortige Vorschau auf Desktop und Mobile.' },
    { title: 'Client-Share-Link', desc: 'Passwortgeschützter Link für Kunden-Previews.' },
    { title: 'Version-History', desc: 'Alle Versionen gespeichert und abrufbar.' },
    { title: 'Team-Collaboration', desc: 'Mehrere Nutzer können gleichzeitig arbeiten.' },
    { title: 'Export-Funktion', desc: 'Export als statisches HTML oder Nuxt-Projekt.' },
  ] : [
    { title: 'Block Library', desc: '50+ pre-built, customizable website blocks.' },
    { title: 'Live Preview', desc: 'Instant preview on desktop and mobile.' },
    { title: 'Client Share Link', desc: 'Password-protected link for client previews.' },
    { title: 'Version History', desc: 'All versions saved and retrievable.' },
    { title: 'Team Collaboration', desc: 'Multiple users can work simultaneously.' },
    { title: 'Export Function', desc: 'Export as static HTML or Nuxt project.' },
  ],
  stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel', 'Redis'],
}))
</script>
