<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'KI-Projekte — DH Agentur' : 'AI Projects — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'KI-Integration, Chatbots und intelligente Automatisierung für Ihr Unternehmen.'
    : 'AI integration, chatbots and intelligent automation for your business.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'KI-Projekte' : 'AI Projects',
  title: locale.value === 'de' ? 'KI, die' : 'AI that',
  outcome: locale.value === 'de' ? 'wirklich arbeitet.' : 'actually works.',
  heroDesc: locale.value === 'de'
    ? 'Wir integrieren KI-Lösungen in Ihr Unternehmen — von intelligenten Chatbots bis zur vollständigen Prozessautomatisierung mit Large Language Models.'
    : 'We integrate AI solutions into your business — from intelligent chatbots to full process automation with large language models.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die repetitive Aufgaben automatisieren wollen',
    'Teams mit hohem Volumen an Kundenanfragen',
    'Betriebe, die datengetriebene Entscheidungen treffen wollen',
    'Firmen, die KI-Trends nicht verpassen wollen',
  ] : [
    'Companies that want to automate repetitive tasks',
    'Teams with high volume of customer inquiries',
    'Businesses that want to make data-driven decisions',
    'Companies that don\'t want to miss AI trends',
  ],
  problems: locale.value === 'de' ? [
    'Hoher manueller Aufwand für Standard-Aufgaben',
    'Kundenanfragen können nicht schnell genug beantwortet werden',
    'Wertvolle Daten werden nicht genutzt',
    'Unsicherheit, wo KI sinnvoll eingesetzt werden kann',
  ] : [
    'High manual effort for standard tasks',
    'Customer inquiries cannot be answered fast enough',
    'Valuable data is not being utilized',
    'Uncertainty about where AI can be usefully deployed',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'KI-Chatbots', desc: 'Intelligente Assistenten für Website, WhatsApp und mehr.' },
    { title: 'LLM-Integration', desc: 'OpenAI, Anthropic und andere Modelle in Ihre Apps.' },
    { title: 'Dokument-Analyse', desc: 'Automatische Extraktion von Daten aus Dokumenten.' },
    { title: 'KI-Beratung', desc: 'Strategische Beratung, wo KI Ihren größten Mehrwert bringt.' },
    { title: 'Custom AI-Tools', desc: 'Maßgeschneiderte KI-Werkzeuge für Ihre Workflows.' },
    { title: 'Daten-Pipelines', desc: 'Aufbau von Dateninfrastruktur für KI-Anwendungen.' },
  ] : [
    { title: 'AI Chatbots', desc: 'Intelligent assistants for website, WhatsApp and more.' },
    { title: 'LLM Integration', desc: 'OpenAI, Anthropic and other models in your apps.' },
    { title: 'Document Analysis', desc: 'Automatic extraction of data from documents.' },
    { title: 'AI Consulting', desc: 'Strategic advice on where AI brings you the most value.' },
    { title: 'Custom AI Tools', desc: 'Tailored AI tools for your workflows.' },
    { title: 'Data Pipelines', desc: 'Building data infrastructure for AI applications.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'KI-Audit', desc: 'Analyse Ihrer Prozesse auf KI-Potenzial.' },
    { title: 'Proof of Concept', desc: 'Schneller Prototyp zur Validierung der Idee.' },
    { title: 'Entwicklung', desc: 'Umsetzung der KI-Lösung in Ihr System.' },
    { title: 'Testing & Tuning', desc: 'Optimierung und Qualitätssicherung.' },
    { title: 'Deployment & Monitoring', desc: 'Produktivbetrieb und laufendes Monitoring.' },
  ] : [
    { title: 'AI Audit', desc: 'Analysis of your processes for AI potential.' },
    { title: 'Proof of Concept', desc: 'Quick prototype to validate the idea.' },
    { title: 'Development', desc: 'Implementation of the AI solution into your system.' },
    { title: 'Testing & Tuning', desc: 'Optimization and quality assurance.' },
    { title: 'Deployment & Monitoring', desc: 'Production operation and ongoing monitoring.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche KI-Modelle nutzt ihr?', answer: 'Wir arbeiten mit OpenAI (GPT-4o), Anthropic (Claude), Mistral und lokalen Open-Source-Modellen — je nach Anforderung und Datenschutz-Bedürfnissen.' },
    { question: 'Sind meine Daten sicher?', answer: 'Datenschutz hat höchste Priorität. Wir können KI-Lösungen auch on-premise oder in deutschen Rechenzentren betreiben, um DSGVO-Konformität zu gewährleisten.' },
    { question: 'Was kostet ein KI-Projekt?', answer: 'Das hängt stark vom Umfang ab. Ein einfacher Chatbot startet ab ca. 1.500 €, komplexe KI-Integrationen können deutlich mehr betragen. Nach einem Erstgespräch geben wir ein genaues Angebot.' },
  ] : [
    { question: 'Which AI models do you use?', answer: 'We work with OpenAI (GPT-4o), Anthropic (Claude), Mistral and local open-source models — depending on requirements and privacy needs.' },
    { question: 'Is my data safe?', answer: 'Data protection is our highest priority. We can also operate AI solutions on-premise or in German data centers to ensure GDPR compliance.' },
    { question: 'What does an AI project cost?', answer: 'This depends heavily on the scope. A simple chatbot starts at around €1,500, complex AI integrations can be considerably more. After a discovery call we provide an exact quote.' },
  ],
  ctaTitle: locale.value === 'de' ? 'KI für Ihr Unternehmen nutzen?' : 'Want to use AI for your business?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam herausfinden, wo KI bei Ihnen den größten Mehrwert schafft.'
    : "Let's find out together where AI creates the most value for you.",
}))
</script>
