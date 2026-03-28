<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Consulting — DH Agentur' : 'Consulting — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Strategische IT- und Digitalberatung für nachhaltige Unternehmensentwicklung — von der Analyse bis zur Umsetzung.'
    : 'Strategic IT and digital consulting for sustainable business development — from analysis to implementation.'),
})

const data = computed(() => ({
  label: 'Consulting',
  title: locale.value === 'de' ? 'Klare Strategie,' : 'Clear strategy,',
  outcome: locale.value === 'de' ? 'messbare Ergebnisse.' : 'measurable results.',
  heroDesc: locale.value === 'de'
    ? 'Wir analysieren Ihre digitale Situation, entwickeln eine maßgeschneiderte Strategie und begleiten Sie auf dem Weg zur erfolgreichen Umsetzung — mit klarem Fokus auf Ihre Geschäftsziele.'
    : 'We analyze your digital situation, develop a tailored strategy and guide you through successful implementation — with a clear focus on your business goals.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die ihre digitale Strategie neu ausrichten wollen',
    'Geschäftsführer mit konkreten Wachstumszielen',
    'Betriebe vor größeren IT-Investitionen',
    'Organisationen mit komplexen Digitalisierungsvorhaben',
  ] : [
    'Companies that want to realign their digital strategy',
    'Managing directors with concrete growth goals',
    'Businesses before major IT investments',
    'Organizations with complex digitization projects',
  ],
  problems: locale.value === 'de' ? [
    'Unklare digitale Roadmap und fehlende Priorisierung',
    'Hohe IT-Kosten ohne erkennbaren Mehrwert',
    'Mangelnde Abstimmung zwischen IT und Business',
    'Fehlende Expertise für strategische Entscheidungen',
  ] : [
    'Unclear digital roadmap and missing prioritization',
    'High IT costs without recognizable added value',
    'Lack of alignment between IT and business',
    'Missing expertise for strategic decisions',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Ist-Analyse', desc: 'Vollständige Bestandsaufnahme Ihrer digitalen Infrastruktur und Prozesse.' },
    { title: 'Digitale Roadmap', desc: 'Priorisierter Maßnahmenplan mit klaren Meilensteinen.' },
    { title: 'Technologie-Auswahl', desc: 'Unabhängige Empfehlung der richtigen Tools und Plattformen.' },
    { title: 'Change Management', desc: 'Begleitung der Veränderungsprozesse im Unternehmen.' },
    { title: 'KPI-Framework', desc: 'Definition und Tracking relevanter Erfolgskennzahlen.' },
    { title: 'Umsetzungsbegleitung', desc: 'Laufende Beratung und Kontrolle während der Implementierung.' },
  ] : [
    { title: 'As-Is Analysis', desc: 'Complete inventory of your digital infrastructure and processes.' },
    { title: 'Digital Roadmap', desc: 'Prioritized action plan with clear milestones.' },
    { title: 'Technology Selection', desc: 'Independent recommendation of the right tools and platforms.' },
    { title: 'Change Management', desc: 'Supporting transformation processes within the organization.' },
    { title: 'KPI Framework', desc: 'Definition and tracking of relevant success metrics.' },
    { title: 'Implementation Support', desc: 'Ongoing consulting and oversight during implementation.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Erstgespräch', desc: 'Kennenlernen, Zieldefinition und Erwartungsabgleich.' },
    { title: 'Analyse', desc: 'Tiefgehende Untersuchung der aktuellen Situation.' },
    { title: 'Strategie-Workshop', desc: 'Gemeinsame Entwicklung der digitalen Strategie.' },
    { title: 'Roadmap & Präsentation', desc: 'Ausarbeitung und Vorstellung des Maßnahmenplans.' },
    { title: 'Begleitung', desc: 'Laufende Unterstützung bei der Umsetzung.' },
  ] : [
    { title: 'Discovery Call', desc: 'Getting to know each other, goal definition and expectation alignment.' },
    { title: 'Analysis', desc: 'In-depth examination of the current situation.' },
    { title: 'Strategy Workshop', desc: 'Joint development of the digital strategy.' },
    { title: 'Roadmap & Presentation', desc: 'Development and presentation of the action plan.' },
    { title: 'Ongoing Support', desc: 'Continuous support during implementation.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Wie unabhängig ist eure Beratung?', answer: 'Wir sind herstellerunabhängig und empfehlen ausschließlich Lösungen, die zu Ihren Anforderungen passen — ohne versteckte Interessen.' },
    { question: 'Führt ihr die Maßnahmen auch selbst um?', answer: 'Ja, wir begleiten den gesamten Prozess — von der Strategie bis zur operativen Umsetzung. So müssen Sie nicht mehrere Dienstleister koordinieren.' },
    { question: 'Für welche Unternehmensgrößen ist das geeignet?', answer: 'Unser Consulting-Angebot ist für KMUs ebenso wie für größere Unternehmen geeignet. Wir passen den Umfang flexibel an Ihren Bedarf an.' },
  ] : [
    { question: 'How independent is your consulting?', answer: 'We are vendor-independent and only recommend solutions that fit your requirements — without hidden interests.' },
    { question: 'Do you also implement the measures yourselves?', answer: 'Yes, we support the entire process — from strategy to operational implementation. So you do not need to coordinate multiple service providers.' },
    { question: 'What company sizes is this suitable for?', answer: 'Our consulting offering is suitable for SMEs as well as larger companies. We flexibly adapt the scope to your needs.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Strategische Beratung gesucht?' : 'Looking for strategic consulting?',
  ctaDesc: locale.value === 'de'
    ? 'Vereinbaren Sie ein kostenloses Erstgespräch und erfahren Sie, wie wir Ihr Unternehmen voranbringen können.'
    : 'Book a free discovery call and find out how we can take your business forward.',
}))
</script>
