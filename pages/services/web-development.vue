<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Webentwicklung — DH Agentur' : 'Web Development — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Professionelle Webentwicklung mit Nuxt, Vue, React und mehr. Schnelle, moderne Websites für Ihr Unternehmen.'
    : 'Professional web development with Nuxt, Vue, React and more. Fast, modern websites for your business.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Webentwicklung' : 'Web Development',
  title: locale.value === 'de' ? 'Websites, die' : 'Websites that',
  outcome: locale.value === 'de' ? 'wirklich konvertieren.' : 'actually convert.',
  heroDesc: locale.value === 'de'
    ? 'Wir entwickeln schnelle, moderne und suchmaschinenoptimierte Websites, die nicht nur gut aussehen, sondern auch messbare Ergebnisse liefern.'
    : 'We develop fast, modern and SEO-optimized websites that not only look great but deliver measurable results.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die eine neue oder überarbeitete Website benötigen',
    'Startups, die schnell online gehen möchten',
    'Betriebe mit veralteter, nicht-responsiver Website',
    'Shops, die ihre Online-Präsenz professionalisieren wollen',
  ] : [
    'Companies that need a new or redesigned website',
    'Startups that want to go online quickly',
    'Businesses with an outdated, non-responsive website',
    'Shops that want to professionalize their online presence',
  ],
  problems: locale.value === 'de' ? [
    'Die aktuelle Website ist langsam und verliert Besucher',
    'Schlechtes Mobile-Erlebnis kostet Kunden',
    'Keine organische Sichtbarkeit bei Google',
    'Die Website entspricht nicht mehr der Markenidentität',
  ] : [
    'The current website is slow and losing visitors',
    'Poor mobile experience is costing customers',
    'No organic visibility on Google',
    'The website no longer matches the brand identity',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Responsive Design', desc: 'Perfekte Darstellung auf allen Geräten — Mobile-First.' },
    { title: 'Performance-Optimierung', desc: 'Lighthouse Score 90+, Core Web Vitals bestanden.' },
    { title: 'SEO-Grundlagen', desc: 'Technisches SEO, Metadaten, strukturierte Daten.' },
    { title: 'CMS-Integration', desc: 'Einfache Content-Pflege ohne technisches Know-how.' },
    { title: 'Barrierefreiheit', desc: 'WCAG-konform für maximale Zugänglichkeit.' },
    { title: 'Hosting & Deployment', desc: 'Einrichtung und Übergabe inklusive Dokumentation.' },
  ] : [
    { title: 'Responsive Design', desc: 'Perfect display on all devices — mobile-first.' },
    { title: 'Performance Optimization', desc: 'Lighthouse score 90+, Core Web Vitals passed.' },
    { title: 'SEO Basics', desc: 'Technical SEO, metadata, structured data.' },
    { title: 'CMS Integration', desc: 'Easy content management without technical know-how.' },
    { title: 'Accessibility', desc: 'WCAG-compliant for maximum accessibility.' },
    { title: 'Hosting & Deployment', desc: 'Setup and handover including documentation.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Discovery & Konzept', desc: 'Wir analysieren Ihre Ziele, Zielgruppe und Wettbewerber.' },
    { title: 'Design & Prototyp', desc: 'Wireframes und Design-Entwürfe zur Abstimmung.' },
    { title: 'Entwicklung', desc: 'Umsetzung mit modernen Technologien (Nuxt/Vue/React).' },
    { title: 'Testing & QA', desc: 'Umfassende Tests auf allen Geräten und Browsern.' },
    { title: 'Launch & Übergabe', desc: 'Go-Live, Schulung und Dokumentation.' },
  ] : [
    { title: 'Discovery & Concept', desc: 'We analyze your goals, target audience and competitors.' },
    { title: 'Design & Prototype', desc: 'Wireframes and design drafts for review.' },
    { title: 'Development', desc: 'Implementation with modern technologies (Nuxt/Vue/React).' },
    { title: 'Testing & QA', desc: 'Comprehensive testing on all devices and browsers.' },
    { title: 'Launch & Handover', desc: 'Go-live, training and documentation.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Technologien nutzt ihr?', answer: 'Wir setzen hauptsächlich auf Nuxt 3, Vue 3 und React — je nach Projektanforderung. Für statische Seiten nutzen wir auch Astro. Das Backend bauen wir mit Node.js oder supabase.' },
    { question: 'Kann ich die Website später selbst bearbeiten?', answer: 'Ja, wir integrieren auf Wunsch ein CMS (z.B. Contentful, Sanity oder Nuxt Content), damit Sie Inhalte eigenständig pflegen können.' },
    { question: 'Wie lange dauert eine Webseite?', answer: 'Eine Standard-Website dauert 2–6 Wochen, je nach Umfang und Komplexität. Nach dem Kickoff-Gespräch erhalten Sie einen konkreten Zeitplan.' },
    { question: 'Was passiert nach dem Launch?', answer: 'Wir bieten verschiedene Wartungspakete an und stehen für Anpassungen und Weiterentwicklungen gerne zur Verfügung.' },
  ] : [
    { question: 'What technologies do you use?', answer: 'We mainly use Nuxt 3, Vue 3 and React — depending on project requirements. For static sites we also use Astro. Backend is built with Node.js or Supabase.' },
    { question: 'Can I edit the website myself later?', answer: 'Yes, we can integrate a CMS (e.g. Contentful, Sanity or Nuxt Content) so you can manage content independently.' },
    { question: 'How long does a website take?', answer: 'A standard website takes 2–6 weeks, depending on scope and complexity. After the kickoff call you receive a concrete timeline.' },
    { question: 'What happens after launch?', answer: 'We offer various maintenance packages and are happy to help with adjustments and further development.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Bereit für Ihre neue Website?' : 'Ready for your new website?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam besprechen, wie wir Ihre Online-Präsenz auf das nächste Level bringen.'
    : "Let's discuss together how we can take your online presence to the next level.",
}))
</script>
