<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'UX/UI Design — DH Agentur' : 'UX/UI Design — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Benutzerfreundliche Interfaces und durchdachte Nutzererlebnisse — von Wireframes bis zum fertigen Design.'
    : 'User-friendly interfaces and well-thought-out user experiences — from wireframes to finished design.'),
})

const data = computed(() => ({
  label: 'UX/UI Design',
  title: locale.value === 'de' ? 'Intuitiv nutzbar,' : 'Intuitive to use,',
  outcome: locale.value === 'de' ? 'visuell überzeugend.' : 'visually compelling.',
  heroDesc: locale.value === 'de'
    ? 'Wir gestalten digitale Produkte, die Nutzer lieben — von der Nutzerforschung über Wireframes bis zum fertigen UI-Design.'
    : 'We design digital products that users love — from user research and wireframes to finished UI design.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit veralteten oder unübersichtlichen Interfaces',
    'Startups, die ein neues Produkt designen',
    'B2B-Anbieter mit komplexen Workflows',
    'E-Commerce, die Conversion verbessern wollen',
  ] : [
    'Companies with outdated or confusing interfaces',
    'Startups designing a new product',
    'B2B providers with complex workflows',
    'E-commerce that want to improve conversion',
  ],
  problems: locale.value === 'de' ? [
    'Hohe Abbruchrate durch schlechte UX',
    'Nutzer finden Funktionen nicht',
    'Design wirkt veraltet oder uneinheitlich',
    'Keine mobile Optimierung',
  ] : [
    'High abandonment rate due to poor UX',
    'Users cannot find features',
    'Design looks outdated or inconsistent',
    'No mobile optimization',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'UX-Research', desc: 'Nutzerinterviews, Personas und User Journeys.' },
    { title: 'Wireframes & Prototypen', desc: 'Klickbare Prototypen zur Validierung.' },
    { title: 'UI-Design', desc: 'Visuelles Design mit Design System.' },
    { title: 'Usability-Testing', desc: 'Tests mit echten Nutzern.' },
    { title: 'Design-Handoff', desc: 'Spezifikationen für die Entwicklung.' },
    { title: 'Design-System', desc: 'Wiederverwendbare Komponenten und Guidelines.' },
  ] : [
    { title: 'UX Research', desc: 'User interviews, personas and user journeys.' },
    { title: 'Wireframes & Prototypes', desc: 'Clickable prototypes for validation.' },
    { title: 'UI Design', desc: 'Visual design with design system.' },
    { title: 'Usability Testing', desc: 'Testing with real users.' },
    { title: 'Design Handoff', desc: 'Specifications for development.' },
    { title: 'Design System', desc: 'Reusable components and guidelines.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Discovery', desc: 'Verständnis von Zielgruppe, Zielen und Kontext.' },
    { title: 'Konzeption', desc: 'Information Architecture, Wireframes, User Flows.' },
    { title: 'Design', desc: 'Visuelles Design, Prototypen, Iteration.' },
    { title: 'Testing', desc: 'Usability-Tests und Feedback-Einbindung.' },
    { title: 'Handoff', desc: 'Übergabe an Entwicklung mit Spezifikationen.' },
  ] : [
    { title: 'Discovery', desc: 'Understanding target audience, goals and context.' },
    { title: 'Concept', desc: 'Information architecture, wireframes, user flows.' },
    { title: 'Design', desc: 'Visual design, prototypes, iteration.' },
    { title: 'Testing', desc: 'Usability tests and feedback integration.' },
    { title: 'Handoff', desc: 'Handover to development with specifications.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Arbeitet ihr mit Figma?', answer: 'Ja, wir arbeiten primär mit Figma für Design und Prototyping. Handoff erfolgt mit Dev-Mode und Style Guides.' },
    { question: 'Design only oder auch Entwicklung?', answer: 'Wir bieten beides. Design kann eigenständig oder als Teil eines Full-Service-Projekts gebucht werden.' },
  ] : [
    { question: 'Do you work with Figma?', answer: 'Yes, we primarily work with Figma for design and prototyping. Handoff is done with Dev Mode and style guides.' },
    { question: 'Design only or development too?', answer: 'We offer both. Design can be booked standalone or as part of a full-service project.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Besseres Design für Ihr Produkt?' : 'Better design for your product?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam die UX/UI Ihres digitalen Produkts verbessern.'
    : "Let's improve the UX/UI of your digital product together.",
}))
</script>
