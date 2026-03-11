<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Individual-Webapps — DH Agentur' : 'Custom Web Apps — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Maßgeschneiderte Webanwendungen für komplexe Anforderungen — von Portalen bis zu SaaS-Produkten.'
    : 'Tailored web applications for complex requirements — from portals to SaaS products.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Individual-Webapps' : 'Custom Web Apps',
  title: locale.value === 'de' ? 'Software, die' : 'Software that',
  outcome: locale.value === 'de' ? 'wirklich passt.' : 'truly fits.',
  heroDesc: locale.value === 'de'
    ? 'Wenn Standardsoftware nicht reicht, entwickeln wir maßgeschneiderte Webanwendungen, die exakt auf Ihre Prozesse und Anforderungen zugeschnitten sind.'
    : 'When standard software is not enough, we develop tailored web applications that are precisely tailored to your processes and requirements.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit spezifischen Software-Anforderungen',
    'Startups, die ein eigenes Produkt bauen wollen',
    'Betriebe, die interne Tools digitalisieren wollen',
    'Organisationen mit komplexen Workflow-Anforderungen',
  ] : [
    'Companies with specific software requirements',
    'Startups that want to build their own product',
    'Businesses that want to digitize internal tools',
    'Organizations with complex workflow requirements',
  ],
  problems: locale.value === 'de' ? [
    'Keine Standardsoftware erfüllt alle Anforderungen',
    'Teure Lizenzkosten für halb-passende Software',
    'Manuelle Workflows, die digitalisiert werden könnten',
    'Wachstum wird durch Software-Grenzen gebremst',
  ] : [
    'No standard software meets all requirements',
    'Expensive licensing costs for half-fitting software',
    'Manual workflows that could be digitized',
    'Growth is limited by software constraints',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Technisches Konzept', desc: 'Architektur, Datenbankdesign und API-Spezifikation.' },
    { title: 'Frontend-Entwicklung', desc: 'Moderne UI mit Vue/Nuxt oder React.' },
    { title: 'Backend & API', desc: 'Node.js, PostgreSQL, REST oder GraphQL.' },
    { title: 'Auth & Sicherheit', desc: 'Sichere Authentifizierung und Autorisierung.' },
    { title: 'Testing & QA', desc: 'Unit-, Integration- und E2E-Tests.' },
    { title: 'Deployment & CI/CD', desc: 'Automatisierte Deployment-Pipelines.' },
  ] : [
    { title: 'Technical Concept', desc: 'Architecture, database design and API specification.' },
    { title: 'Frontend Development', desc: 'Modern UI with Vue/Nuxt or React.' },
    { title: 'Backend & API', desc: 'Node.js, PostgreSQL, REST or GraphQL.' },
    { title: 'Auth & Security', desc: 'Secure authentication and authorization.' },
    { title: 'Testing & QA', desc: 'Unit, integration and E2E tests.' },
    { title: 'Deployment & CI/CD', desc: 'Automated deployment pipelines.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Anforderungsanalyse', desc: 'Detaillierte Aufnahme aller funktionalen und nicht-funktionalen Anforderungen.' },
    { title: 'Design & Architektur', desc: 'System-Architektur, DB-Design und UI-Konzept.' },
    { title: 'Sprint-basierte Entwicklung', desc: 'Agile Entwicklung in 2-Wochen-Sprints.' },
    { title: 'Qualitätssicherung', desc: 'Automatisierte Tests und Code Reviews.' },
    { title: 'Launch & Übergabe', desc: 'Deployment, Schulung und Dokumentation.' },
  ] : [
    { title: 'Requirements Analysis', desc: 'Detailed capture of all functional and non-functional requirements.' },
    { title: 'Design & Architecture', desc: 'System architecture, DB design and UI concept.' },
    { title: 'Sprint-based Development', desc: 'Agile development in 2-week sprints.' },
    { title: 'Quality Assurance', desc: 'Automated tests and code reviews.' },
    { title: 'Launch & Handover', desc: 'Deployment, training and documentation.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Wie lange dauert die Entwicklung einer Web-App?', answer: 'Das hängt stark vom Umfang ab. Ein einfaches internes Tool: 4–8 Wochen. Ein komplexes SaaS-Produkt: 3–6 Monate oder mehr. Nach der Anforderungsanalyse geben wir einen genauen Plan.' },
    { question: 'Welchen Tech-Stack verwendet ihr?', answer: 'Frontend: Vue 3 / Nuxt 3 oder React / Next.js. Backend: Node.js mit Express oder Fastify, Datenbank: PostgreSQL oder MongoDB, Hosting: Docker auf Hetzner, AWS oder Vercel.' },
    { question: 'Bekomme ich den Quellcode?', answer: 'Ja, der vollständige Quellcode gehört Ihnen. Wir übergeben alles inklusive Dokumentation und optional CI/CD-Setup.' },
  ] : [
    { question: 'How long does developing a web app take?', answer: 'This depends heavily on scope. A simple internal tool: 4–8 weeks. A complex SaaS product: 3–6 months or more. After requirements analysis, we provide an exact plan.' },
    { question: 'What tech stack do you use?', answer: 'Frontend: Vue 3 / Nuxt 3 or React / Next.js. Backend: Node.js with Express or Fastify, Database: PostgreSQL or MongoDB, Hosting: Docker on Hetzner, AWS or Vercel.' },
    { question: 'Do I get the source code?', answer: 'Yes, the complete source code belongs to you. We hand over everything including documentation and optionally CI/CD setup.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Eine App-Idee umsetzen?' : 'Want to implement an app idea?',
  ctaDesc: locale.value === 'de'
    ? 'Erzählen Sie uns von Ihrer Idee — wir machen daraus ein echtes Produkt.'
    : "Tell us about your idea — we'll turn it into a real product.",
}))
</script>
