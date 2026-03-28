<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Smarthome — DH Agentur' : 'Smarthome — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Intelligente Heimautomatisierung — Licht, Heizung, Sicherheit und mehr vernetzt gesteuert.'
    : 'Intelligent home automation — lighting, heating, security and more centrally controlled.'),
})

const data = computed(() => ({
  label: 'Smarthome',
  title: locale.value === 'de' ? 'Zuhause,' : 'Home,',
  outcome: locale.value === 'de' ? 'intelligent vernetzt.' : 'intelligently connected.',
  heroDesc: locale.value === 'de'
    ? 'Wir planen und installieren Ihr intelligentes Zuhause — Licht, Heizung, Rollläden, Sicherheit und Unterhaltung, alles zentral gesteuert über App, Sprachbefehl oder Automatisierung.'
    : 'We plan and install your smart home — lighting, heating, blinds, security and entertainment, all centrally controlled via app, voice command or automation.',
  forWhom: locale.value === 'de' ? [
    'Eigenheimbesitzer, die ihr Haus modernisieren wollen',
    'Bauherren im Neubau oder bei Renovierungen',
    'Mieter mit Wunsch nach smarter Ausstattung',
    'Unternehmen, die Showrooms oder Büros smart ausstatten',
  ] : [
    'Homeowners who want to modernize their house',
    'Builders during new construction or renovations',
    'Tenants who want smart features',
    'Companies that want to equip showrooms or offices smartly',
  ],
  problems: locale.value === 'de' ? [
    'Energie wird verschwendet durch schlechte Steuerung',
    'Viele einzelne Apps ohne zentrale Kontrolle',
    'Sicherheit und Komfort lassen sich nicht kombinieren',
    'Komplizierte Installation ohne professionelle Hilfe',
  ] : [
    'Energy is wasted through poor control',
    'Many individual apps without central control',
    'Security and comfort cannot be combined',
    'Complicated installation without professional help',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Lichtsteuerung', desc: 'Intelligente Beleuchtung mit Szenen, Dimmung und automatischen Abläufen.' },
    { title: 'Heizungssteuerung', desc: 'Smarte Thermostate für maximalen Komfort bei minimalem Energieverbrauch.' },
    { title: 'Rollläden & Beschattung', desc: 'Automatisierte Steuerung von Rollläden und Jalousien.' },
    { title: 'Sicherheit', desc: 'Türschlösser, Kameras und Alarmanlagen integriert ins Smarthome-System.' },
    { title: 'Sprachsteuerung', desc: 'Integration mit Alexa, Google Home oder Apple HomeKit.' },
    { title: 'Zentrales Dashboard', desc: 'Alle Funktionen übersichtlich in einer App oder auf einem Wandpanel.' },
  ] : [
    { title: 'Lighting Control', desc: 'Intelligent lighting with scenes, dimming and automatic routines.' },
    { title: 'Heating Control', desc: 'Smart thermostats for maximum comfort at minimal energy consumption.' },
    { title: 'Blinds & Shading', desc: 'Automated control of roller blinds and shutters.' },
    { title: 'Security', desc: 'Door locks, cameras and alarm systems integrated into the smart home system.' },
    { title: 'Voice Control', desc: 'Integration with Alexa, Google Home or Apple HomeKit.' },
    { title: 'Central Dashboard', desc: 'All functions clearly in one app or wall panel.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Beratung', desc: 'Gemeinsame Planung der gewünschten Funktionen und Systeme.' },
    { title: 'Konzept & Angebot', desc: 'Maßgeschneidertes Smarthome-Konzept mit Kostenübersicht.' },
    { title: 'Installation', desc: 'Fachgerechte Montage und Verkabelung aller Komponenten.' },
    { title: 'Einrichtung', desc: 'Konfiguration aller Geräte, Szenen und Automatisierungen.' },
    { title: 'Einweisung', desc: 'Ausführliche Einführung in Ihr neues Smarthome-System.' },
  ] : [
    { title: 'Consultation', desc: 'Joint planning of desired functions and systems.' },
    { title: 'Concept & Quote', desc: 'Tailored smart home concept with cost overview.' },
    { title: 'Installation', desc: 'Professional mounting and cabling of all components.' },
    { title: 'Setup', desc: 'Configuration of all devices, scenes and automations.' },
    { title: 'Briefing', desc: 'Detailed introduction to your new smart home system.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Systeme unterstützt ihr?', answer: 'Wir arbeiten mit führenden Plattformen wie KNX, Loxone, Homematic IP und Philips Hue. Wir wählen das System, das am besten zu Ihren Anforderungen passt.' },
    { question: 'Funktioniert das auch in Mietwohnungen?', answer: 'Ja, für Mietwohnungen gibt es viele nachrüstbare Lösungen ohne Eingriffe in die Elektrik — wie smarte Steckdosen, Heizkörperthermostate und Funk-Lichtschalter.' },
    { question: 'Was passiert bei einem Stromausfall?', answer: 'Gute Smarthome-Systeme haben einen Offline-Modus und können auch bei Internetausfall lokal gesteuert werden. Manuelle Bedienung ist immer als Rückfalloption vorhanden.' },
  ] : [
    { question: 'Which systems do you support?', answer: 'We work with leading platforms such as KNX, Loxone, Homematic IP and Philips Hue. We choose the system that best fits your requirements.' },
    { question: 'Does it work in rented apartments too?', answer: 'Yes, for rented apartments there are many retrofit solutions without interfering with the electrics — such as smart plugs, radiator thermostats and wireless light switches.' },
    { question: 'What happens during a power outage?', answer: 'Good smart home systems have an offline mode and can be controlled locally even without internet. Manual operation is always available as a fallback option.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Smarthome planen?' : 'Plan your smart home?',
  ctaDesc: locale.value === 'de'
    ? 'Vereinbaren Sie ein kostenloses Beratungsgespräch und lassen Sie sich Ihr individuelles Smarthome-Konzept erstellen.'
    : 'Book a free consultation and have your individual smart home concept created.',
}))
</script>
