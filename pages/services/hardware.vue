<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Hardware — DH Agentur' : 'Hardware — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Professionelle IT-Hardware-Lösungen — Beschaffung, Einrichtung und Wartung für Ihr Unternehmen.'
    : 'Professional IT hardware solutions — procurement, setup and maintenance for your business.'),
})

const data = computed(() => ({
  label: 'Hardware',
  title: locale.value === 'de' ? 'Die richtige Hardware,' : 'The right hardware,',
  outcome: locale.value === 'de' ? 'perfekt eingerichtet.' : 'perfectly set up.',
  heroDesc: locale.value === 'de'
    ? 'Wir beraten Sie bei der Auswahl, beschaffen die passende IT-Hardware und richten alles professionell ein — vom Einzelarbeitsplatz bis zum vollständigen Firmennetzwerk.'
    : 'We advise you on selection, procure the right IT hardware and set everything up professionally — from single workstations to complete company networks.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die neue Arbeitsplätze einrichten wollen',
    'Betriebe mit veralteter Hardware und Performanceproblemen',
    'Firmen, die ein neues Büro beziehen',
    'Organisationen, die ihre IT-Infrastruktur modernisieren',
  ] : [
    'Companies that want to set up new workstations',
    'Businesses with outdated hardware and performance issues',
    'Companies moving into a new office',
    'Organizations modernizing their IT infrastructure',
  ],
  problems: locale.value === 'de' ? [
    'Veraltete Geräte verlangsamen die Arbeitsprozesse',
    'Keine einheitliche Hardware-Strategie im Unternehmen',
    'Hoher Aufwand bei Beschaffung und Einrichtung',
    'Fehlende Wartung führt zu ungeplanten Ausfällen',
  ] : [
    'Outdated devices slow down work processes',
    'No unified hardware strategy in the company',
    'High effort for procurement and setup',
    'Lack of maintenance leads to unplanned downtime',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Bedarfsanalyse', desc: 'Ermittlung des genauen Hardware-Bedarfs für Ihr Unternehmen.' },
    { title: 'Beschaffung', desc: 'Kostenoptimale Beschaffung von Computern, Servern und Peripheriegeräten.' },
    { title: 'Einrichtung & Konfiguration', desc: 'Professionelles Setup aller Geräte inkl. Betriebssystem und Software.' },
    { title: 'Netzwerk-Integration', desc: 'Einbindung in bestehende oder neue Netzwerkinfrastruktur.' },
    { title: 'Wartungsverträge', desc: 'Regelmäßige Wartung und schneller Austausch bei Defekten.' },
    { title: 'Dokumentation', desc: 'Vollständige Inventarisierung und Dokumentation aller Geräte.' },
  ] : [
    { title: 'Needs Analysis', desc: 'Determining the exact hardware requirements for your business.' },
    { title: 'Procurement', desc: 'Cost-optimized procurement of computers, servers and peripherals.' },
    { title: 'Setup & Configuration', desc: 'Professional setup of all devices including OS and software.' },
    { title: 'Network Integration', desc: 'Integration into existing or new network infrastructure.' },
    { title: 'Maintenance Contracts', desc: 'Regular maintenance and fast replacement in case of defects.' },
    { title: 'Documentation', desc: 'Complete inventory and documentation of all devices.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Beratungsgespräch', desc: 'Wir erfassen Ihre Anforderungen und den aktuellen Hardware-Stand.' },
    { title: 'Konzept & Angebot', desc: 'Erstellung eines maßgeschneiderten Hardware-Konzepts mit Kostenübersicht.' },
    { title: 'Beschaffung', desc: 'Bestellung und Lieferung der Hardware zu Ihnen.' },
    { title: 'Einrichtung', desc: 'Professionelle Installation und Konfiguration vor Ort.' },
    { title: 'Übergabe & Support', desc: 'Einweisung der Mitarbeiter und laufender Support.' },
  ] : [
    { title: 'Consultation', desc: 'We capture your requirements and current hardware status.' },
    { title: 'Concept & Quote', desc: 'Creation of a tailored hardware concept with cost overview.' },
    { title: 'Procurement', desc: 'Ordering and delivery of hardware to your location.' },
    { title: 'Setup', desc: 'Professional on-site installation and configuration.' },
    { title: 'Handover & Support', desc: 'Employee briefing and ongoing support.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Hardware-Marken empfehlt ihr?', answer: 'Wir arbeiten mit allen führenden Herstellern wie Lenovo, HP, Dell, Apple und ASUS. Wir empfehlen immer die für Ihren Einsatzzweck und Ihr Budget optimale Lösung.' },
    { question: 'Bietet ihr auch Leasing-Modelle an?', answer: 'Ja, wir können Hardware-Leasing über verschiedene Finanzierungspartner vermitteln, sodass Sie keine hohen Anfangsinvestitionen haben.' },
    { question: 'Was passiert, wenn ein Gerät defekt ist?', answer: 'Im Rahmen unserer Wartungsverträge kümmern wir uns um den schnellen Austausch oder die Reparatur — damit Ausfallzeiten minimal bleiben.' },
  ] : [
    { question: 'Which hardware brands do you recommend?', answer: 'We work with all leading manufacturers such as Lenovo, HP, Dell, Apple and ASUS. We always recommend the optimal solution for your use case and budget.' },
    { question: 'Do you offer leasing models?', answer: 'Yes, we can arrange hardware leasing through various financing partners so you have no high initial investments.' },
    { question: 'What happens if a device is defective?', answer: 'Within our maintenance contracts, we handle fast replacement or repair — keeping downtime to a minimum.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Hardware-Beratung gewünscht?' : 'Looking for hardware advice?',
  ctaDesc: locale.value === 'de'
    ? 'Kontaktieren Sie uns für ein kostenloses Beratungsgespräch rund um Ihre IT-Hardware.'
    : 'Contact us for a free consultation about your IT hardware needs.',
}))
</script>
