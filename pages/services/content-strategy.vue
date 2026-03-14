<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Content Strategie — DH Agentur' : 'Content Strategy — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Redaktionelle Konzepte und Content-Planung für Website, Blog, Social Media und mehr.'
    : 'Editorial concepts and content planning for website, blog, social media and more.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Content Strategie' : 'Content Strategy',
  title: locale.value === 'de' ? 'Der richtige Content,' : 'The right content,',
  outcome: locale.value === 'de' ? 'zur richtigen Zeit.' : 'at the right time.',
  heroDesc: locale.value === 'de'
    ? 'Wir entwickeln Content-Strategien, die Ihre Zielgruppe erreichen — von der Konzeption über die Redaktionsplanung bis zur Umsetzung.'
    : 'We develop content strategies that reach your target audience — from concept and editorial planning to implementation.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit Content-Bedarf über mehrere Kanäle',
    'Brands, die ihre Markenstimme schärfen wollen',
    'B2B-Anbieter mit komplexen Themen',
    'Startups, die schnell Content aufbauen wollen',
  ] : [
    'Companies with content needs across multiple channels',
    'Brands that want to sharpen their brand voice',
    'B2B providers with complex topics',
    'Startups that want to build content quickly',
  ],
  problems: locale.value === 'de' ? [
    'Kein klares Content-Konzept',
    'Inhalte wirken beliebig oder widersprüchlich',
    'Keine Redaktionsplanung',
    'Content wird ad-hoc erstellt',
  ] : [
    'No clear content concept',
    'Content seems arbitrary or contradictory',
    'No editorial planning',
    'Content is created ad-hoc',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Content-Audit', desc: 'Analyse bestehender Inhalte und Lücken.' },
    { title: 'Content-Strategie', desc: 'Ziele, Zielgruppe, Themen und Tonalität.' },
    { title: 'Redaktionsplan', desc: 'Kalender für Blog, Social Media, Newsletter.' },
    { title: 'Content-Briefings', desc: 'Vorgaben für Texter und Creator.' },
    { title: 'SEO-Content', desc: 'Suchmaschinenoptimierte Texte und Strukturen.' },
    { title: 'Content-Guidelines', desc: 'Markenstimme, Formate und Qualitätsstandards.' },
  ] : [
    { title: 'Content Audit', desc: 'Analysis of existing content and gaps.' },
    { title: 'Content Strategy', desc: 'Goals, target audience, topics and tone.' },
    { title: 'Editorial Plan', desc: 'Calendar for blog, social media, newsletter.' },
    { title: 'Content Briefings', desc: 'Specifications for copywriters and creators.' },
    { title: 'SEO Content', desc: 'Search engine optimized texts and structures.' },
    { title: 'Content Guidelines', desc: 'Brand voice, formats and quality standards.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Analyse & Zieldefinition', desc: 'Erfassung Ihrer Ziele, Zielgruppe und Kanäle.' },
    { title: 'Content-Audit', desc: 'Bewertung bestehender Inhalte.' },
    { title: 'Strategie-Entwicklung', desc: 'Konzept, Themen und Redaktionsplan.' },
    { title: 'Umsetzung', desc: 'Erstellung oder Koordination von Content.' },
    { title: 'Review & Optimierung', desc: 'Laufende Anpassung basierend auf Performance.' },
  ] : [
    { title: 'Analysis & Goal Definition', desc: 'Capture of your goals, target audience and channels.' },
    { title: 'Content Audit', desc: 'Evaluation of existing content.' },
    { title: 'Strategy Development', desc: 'Concept, topics and editorial plan.' },
    { title: 'Implementation', desc: 'Creation or coordination of content.' },
    { title: 'Review & Optimization', desc: 'Ongoing adjustment based on performance.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Erstellt ihr den Content selbst?', answer: 'Wir können Texte, Konzepte und Redaktionspläne erstellen. Für Video und Grafik arbeiten wir mit spezialisierten Partnern.' },
    { question: 'Wie lange dauert eine Content-Strategie?', answer: 'Ein Grundkonzept dauert 2–3 Wochen. Die vollständige Strategie mit Redaktionsplan 4–6 Wochen.' },
  ] : [
    { question: 'Do you create the content yourself?', answer: 'We can create texts, concepts and editorial plans. For video and graphics we work with specialized partners.' },
    { question: 'How long does a content strategy take?', answer: 'A basic concept takes 2–3 weeks. The full strategy with editorial plan 4–6 weeks.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Content-Strategie für Ihr Business?' : 'Content strategy for your business?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam Ihre Content-Strategie entwickeln.'
    : "Let's develop your content strategy together.",
}))
</script>
