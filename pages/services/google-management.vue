<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Google Management — DH Agentur' : 'Google Management — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Google Ads, SEO und Google My Business — professionelles Google-Management für mehr Sichtbarkeit.'
    : 'Google Ads, SEO and Google My Business — professional Google management for more visibility.'),
})

const data = computed(() => ({
  label: 'Google Management',
  title: locale.value === 'de' ? 'Besser gefunden,' : 'Found more,',
  outcome: locale.value === 'de' ? 'mehr Anfragen.' : 'more inquiries.',
  heroDesc: locale.value === 'de'
    ? 'Wir übernehmen Ihr komplettes Google-Management: von Ads über SEO bis My Business — für maximale Sichtbarkeit genau dort, wo Ihre Kunden suchen.'
    : 'We take over your complete Google management: from Ads to SEO to My Business — for maximum visibility exactly where your customers are searching.',
  forWhom: locale.value === 'de' ? [
    'Lokale Unternehmen mit regionaler Zielgruppe',
    'Betriebe, die mehr über Google-Suche gefunden werden wollen',
    'Shops mit Google Shopping Potenzial',
    'Unternehmen ohne eigene SEO/SEA-Expertise',
  ] : [
    'Local businesses with a regional target audience',
    'Businesses that want to be found more via Google search',
    'Shops with Google Shopping potential',
    'Companies without their own SEO/SEA expertise',
  ],
  problems: locale.value === 'de' ? [
    'Schlechtes lokales Ranking bei Google',
    'Veraltetes oder nicht optimiertes My Business-Profil',
    'Google Ads ohne ROI und klare Strategie',
    'Konkurrenten werden immer besser gefunden',
  ] : [
    'Poor local ranking on Google',
    'Outdated or non-optimized My Business profile',
    'Google Ads without ROI and clear strategy',
    'Competitors are always found more easily',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Google Ads', desc: 'Search, Display, Shopping und Performance Max Kampagnen.' },
    { title: 'SEO-Optimierung', desc: 'Technisches SEO, On-Page und Linkaufbau.' },
    { title: 'Google My Business', desc: 'Einrichtung, Optimierung und laufende Pflege.' },
    { title: 'Google Analytics 4', desc: 'Setup, Conversion-Tracking und Reporting.' },
    { title: 'Keyword-Strategie', desc: 'Tiefe Keyword-Recherche für organisch und bezahlt.' },
    { title: 'Monatliche Reports', desc: 'Transparente Berichte über alle Kennzahlen.' },
  ] : [
    { title: 'Google Ads', desc: 'Search, Display, Shopping and Performance Max campaigns.' },
    { title: 'SEO Optimization', desc: 'Technical SEO, on-page and link building.' },
    { title: 'Google My Business', desc: 'Setup, optimization and ongoing management.' },
    { title: 'Google Analytics 4', desc: 'Setup, conversion tracking and reporting.' },
    { title: 'Keyword Strategy', desc: 'Deep keyword research for organic and paid.' },
    { title: 'Monthly Reports', desc: 'Transparent reports on all KPIs.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Audit', desc: 'Analyse des aktuellen Google-Auftritts und Potenziale.' },
    { title: 'Strategie', desc: 'Entwicklung einer ganzheitlichen Google-Strategie.' },
    { title: 'Setup & Optimierung', desc: 'Einrichtung und Optimierung aller Kanäle.' },
    { title: 'Laufende Betreuung', desc: 'Wöchentliche Optimierung und Anpassungen.' },
    { title: 'Reporting', desc: 'Monatliche Berichte und Strategie-Calls.' },
  ] : [
    { title: 'Audit', desc: 'Analysis of current Google presence and potential.' },
    { title: 'Strategy', desc: 'Development of a holistic Google strategy.' },
    { title: 'Setup & Optimization', desc: 'Setup and optimization of all channels.' },
    { title: 'Ongoing Management', desc: 'Weekly optimization and adjustments.' },
    { title: 'Reporting', desc: 'Monthly reports and strategy calls.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Wie viel Budget brauche ich für Google Ads?', answer: 'Für erste Ergebnisse empfehlen wir ein Mindest-Budget von 500–1.000 € pro Monat für die Anzeigen, plus unsere Betreuungsgebühr. Wir arbeiten aber auch mit kleineren Budgets.' },
    { question: 'Wie schnell wirkt SEO?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sieht man oft nach 2–3 Monaten, signifikante Ergebnisse nach 6–12 Monaten.' },
    { question: 'Betreut ihr auch mehrere Standorte?', answer: 'Ja, wir haben Erfahrung mit Multi-Location-Setups bei Google My Business und lokaler SEO für mehrere Standorte.' },
  ] : [
    { question: 'How much budget do I need for Google Ads?', answer: 'For initial results, we recommend a minimum budget of €500–1,000 per month for ads, plus our management fee. However, we also work with smaller budgets.' },
    { question: 'How quickly does SEO work?', answer: 'SEO is a long-term strategy. First improvements are often seen after 2–3 months, significant results after 6–12 months.' },
    { question: 'Do you manage multiple locations?', answer: 'Yes, we have experience with multi-location setups in Google My Business and local SEO for multiple locations.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Mehr Sichtbarkeit bei Google?' : 'More visibility on Google?',
  ctaDesc: locale.value === 'de'
    ? 'Starten Sie mit einem kostenlosen Google-Audit und erfahren Sie, wo Ihr Potenzial liegt.'
    : 'Start with a free Google audit and find out where your potential lies.',
}))
</script>
