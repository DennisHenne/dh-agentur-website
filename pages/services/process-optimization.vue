<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Prozessoptimierung — DH Agentur' : 'Process Optimization — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Digitalisierung und Automatisierung Ihrer Geschäftsprozesse — weniger Aufwand, mehr Ergebnis.'
    : 'Digitization and automation of your business processes — less effort, more results.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Prozessoptimierung' : 'Process Optimization',
  title: locale.value === 'de' ? 'Mehr Effizienz,\n' : 'More efficiency,',
  outcome: locale.value === 'de' ? 'weniger Aufwand.' : 'less effort.',
  heroDesc: locale.value === 'de'
    ? 'Wir analysieren Ihre Geschäftsprozesse, identifizieren Engpässe und implementieren digitale Lösungen, die Zeit und Kosten sparen.'
    : 'We analyze your business processes, identify bottlenecks and implement digital solutions that save time and money.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit hohem manuellem Aufwand in Prozessen',
    'Teams mit Kommunikations- und Koordinationsproblemen',
    'Betriebe, die skalieren wollen ohne mehr Personal',
    'Organisationen mit veralteten, fragmentierten Systemen',
  ] : [
    'Companies with high manual effort in processes',
    'Teams with communication and coordination problems',
    'Businesses that want to scale without more staff',
    'Organizations with outdated, fragmented systems',
  ],
  problems: locale.value === 'de' ? [
    'Zu viele manuelle, zeitraubende Prozesse',
    'Daten liegen in verschiedenen, nicht vernetzten Systemen',
    'Fehleranfällige manuelle Dateneingabe',
    'Keine Übersicht über den Status von Aufgaben',
  ] : [
    'Too many manual, time-consuming processes',
    'Data is spread across different, unconnected systems',
    'Error-prone manual data entry',
    'No overview of task status',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Prozessanalyse', desc: 'Detaillierte Aufnahme und Bewertung Ihrer aktuellen Abläufe.' },
    { title: 'Automatisierung', desc: 'Workflow-Automatisierung mit Zapier, Make oder Custom-Code.' },
    { title: 'System-Integration', desc: 'Verbindung bestehender Tools und Plattformen über APIs.' },
    { title: 'Reporting & Dashboards', desc: 'Echtzeit-Übersichten für bessere Entscheidungen.' },
    { title: 'Mitarbeiterschulung', desc: 'Einführung und Schulung aller Beteiligten.' },
    { title: 'Dokumentation', desc: 'Vollständige Dokumentation aller optimierten Prozesse.' },
  ] : [
    { title: 'Process Analysis', desc: 'Detailed recording and evaluation of your current workflows.' },
    { title: 'Automation', desc: 'Workflow automation with Zapier, Make or custom code.' },
    { title: 'System Integration', desc: 'Connecting existing tools and platforms via APIs.' },
    { title: 'Reporting & Dashboards', desc: 'Real-time overviews for better decisions.' },
    { title: 'Staff Training', desc: 'Introduction and training of all stakeholders.' },
    { title: 'Documentation', desc: 'Complete documentation of all optimized processes.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Ist-Analyse', desc: 'Wir dokumentieren und bewerten alle bestehenden Prozesse.' },
    { title: 'Soll-Konzept', desc: 'Entwicklung des optimierten Zielzustands.' },
    { title: 'Implementierung', desc: 'Schrittweise Umsetzung der Verbesserungen.' },
    { title: 'Testing', desc: 'Überprüfung der Automatisierungen und Workflows.' },
    { title: 'Schulung & Go-Live', desc: 'Übergabe und Einweisung aller Beteiligten.' },
  ] : [
    { title: 'As-Is Analysis', desc: 'We document and evaluate all existing processes.' },
    { title: 'To-Be Concept', desc: 'Development of the optimized target state.' },
    { title: 'Implementation', desc: 'Step-by-step implementation of improvements.' },
    { title: 'Testing', desc: 'Verification of automations and workflows.' },
    { title: 'Training & Go-Live', desc: 'Handover and briefing of all stakeholders.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Tools nutzt ihr für Automatisierungen?', answer: 'Je nach Anforderung nutzen wir Zapier, Make (ehem. Integromat), n8n oder entwickeln eigene API-Integrationen. Wir empfehlen immer die für Sie passende Lösung.' },
    { question: 'Muss ich bestehende Software ersetzen?', answer: 'Nein, wir versuchen immer, bestehende Systeme zu integrieren und zu vernetzen. Nur wenn ein System wirklich nicht mehr zeitgemäß ist, empfehlen wir eine Alternative.' },
    { question: 'Wie schnell sind die Ergebnisse spürbar?', answer: 'Erste Verbesserungen sind oft nach wenigen Wochen messbar. Komplexere Transformationen brauchen entsprechend mehr Zeit — das besprechen wir transparent vorab.' },
  ] : [
    { question: 'What tools do you use for automation?', answer: 'Depending on requirements, we use Zapier, Make (formerly Integromat), n8n or develop custom API integrations. We always recommend the right solution for you.' },
    { question: 'Do I need to replace existing software?', answer: 'No, we always try to integrate and connect existing systems. Only if a system is truly outdated do we recommend an alternative.' },
    { question: 'How quickly will results be noticeable?', answer: 'First improvements are often measurable after a few weeks. More complex transformations require correspondingly more time — we discuss this transparently upfront.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Prozesse verschlanken?' : 'Want to streamline processes?',
  ctaDesc: locale.value === 'de'
    ? 'Vereinbaren Sie ein kostenloses Erstgespräch und erfahren Sie, wo wir den größten Hebel bei Ihnen sehen.'
    : "Book a free discovery call and find out where we see the biggest lever for you.",
}))
</script>
