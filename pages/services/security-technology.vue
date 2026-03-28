<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Sicherheitstechnik — DH Agentur' : 'Security Technology — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Professionelle Sicherheitstechnik — Überwachungskameras, Zugangssysteme und Alarmanlagen für Ihr Unternehmen.'
    : 'Professional security technology — surveillance cameras, access systems and alarm systems for your business.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Sicherheitstechnik' : 'Security Technology',
  title: locale.value === 'de' ? 'Immer im Blick,' : 'Always in sight,',
  outcome: locale.value === 'de' ? 'jederzeit sicher.' : 'always secure.',
  heroDesc: locale.value === 'de'
    ? 'Wir planen und installieren professionelle Sicherheitstechnik — von Überwachungskameras über Zugangskontrollsysteme bis hin zu Alarmanlagen. Schützen Sie Ihr Eigentum, Ihre Mitarbeiter und Ihre Daten.'
    : 'We plan and install professional security technology — from surveillance cameras to access control systems and alarm systems. Protect your property, employees and data.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die ihre Räumlichkeiten absichern wollen',
    'Betriebe mit sensiblen Bereichen und Zugangsbeschränkungen',
    'Eigentümer von Gewerbeimmobilien',
    'Unternehmen nach einem Einbruch oder Sicherheitsvorfall',
  ] : [
    'Companies that want to secure their premises',
    'Businesses with sensitive areas and access restrictions',
    'Owners of commercial properties',
    'Companies following a break-in or security incident',
  ],
  problems: locale.value === 'de' ? [
    'Keine Kontrolle darüber, wer die Räumlichkeiten betritt',
    'Fehlende Videoüberwachung bei Vorfällen',
    'Veraltete Schlösser und Schlüsselsysteme',
    'Kein Einbruchschutz oder Alarmanlage',
  ] : [
    'No control over who enters the premises',
    'Missing video surveillance during incidents',
    'Outdated locks and key systems',
    'No burglar protection or alarm system',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Überwachungskameras', desc: 'HD- und 4K-Kamerasysteme für Innen- und Außenbereiche inkl. Nachtsicht.' },
    { title: 'Zugangskontrolle', desc: 'Digitale Zugangssysteme mit Chip, PIN oder biometrischer Erkennung.' },
    { title: 'Alarmanlagen', desc: 'Einbruchmeldesysteme mit stiller und akustischer Alarmierung.' },
    { title: 'Video-Management', desc: 'Software zur zentralen Verwaltung und Auswertung aller Kamerastreams.' },
    { title: 'Fernüberwachung', desc: 'Zugriff auf alle Kameras und Systeme per App oder Browser — jederzeit.' },
    { title: 'Wartung & Service', desc: 'Regelmäßige Wartung und schnelle Entstörung bei Problemen.' },
  ] : [
    { title: 'Surveillance Cameras', desc: 'HD and 4K camera systems for indoor and outdoor areas including night vision.' },
    { title: 'Access Control', desc: 'Digital access systems with chip, PIN or biometric recognition.' },
    { title: 'Alarm Systems', desc: 'Burglar alarm systems with silent and acoustic alerting.' },
    { title: 'Video Management', desc: 'Software for central management and evaluation of all camera streams.' },
    { title: 'Remote Monitoring', desc: 'Access to all cameras and systems via app or browser — at any time.' },
    { title: 'Maintenance & Service', desc: 'Regular maintenance and fast troubleshooting in case of problems.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Sicherheitsanalyse', desc: 'Begehung und Bewertung der zu sichernden Objekte und Risikobereiche.' },
    { title: 'Konzept', desc: 'Erstellung eines maßgeschneiderten Sicherheitskonzepts.' },
    { title: 'Installation', desc: 'Professionelle Montage und Verkabelung aller Komponenten.' },
    { title: 'Konfiguration', desc: 'Einrichtung und Feinabstimmung aller Systeme.' },
    { title: 'Einweisung & Übergabe', desc: 'Schulung der Nutzer und vollständige Übergabe.' },
  ] : [
    { title: 'Security Analysis', desc: 'Inspection and assessment of the objects and risk areas to be secured.' },
    { title: 'Concept', desc: 'Creation of a tailored security concept.' },
    { title: 'Installation', desc: 'Professional mounting and cabling of all components.' },
    { title: 'Configuration', desc: 'Setup and fine-tuning of all systems.' },
    { title: 'Briefing & Handover', desc: 'User training and complete handover.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Kamerasysteme installiert ihr?', answer: 'Wir arbeiten mit namhaften Herstellern wie Hikvision, Dahua und Axis. Wir empfehlen immer das System, das am besten zu Ihren Anforderungen und Ihrem Budget passt.' },
    { question: 'Ist die Videoüberwachung DSGVO-konform?', answer: 'Ja, wir achten bei der Planung und Installation auf alle datenschutzrechtlichen Vorgaben und unterstützen Sie bei der erforderlichen Dokumentation.' },
    { question: 'Kann ich die Kameras auch von unterwegs abrufen?', answer: 'Ja, alle unsere Systeme können per App oder Browser von überall aus aufgerufen werden — mit verschlüsselter Verbindung.' },
  ] : [
    { question: 'Which camera systems do you install?', answer: 'We work with renowned manufacturers such as Hikvision, Dahua and Axis. We always recommend the system that best fits your requirements and budget.' },
    { question: 'Is the video surveillance GDPR-compliant?', answer: 'Yes, we pay attention to all data protection requirements during planning and installation and support you with the required documentation.' },
    { question: 'Can I access the cameras remotely?', answer: 'Yes, all our systems can be accessed from anywhere via app or browser — with an encrypted connection.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Sicherheitstechnik anfragen?' : 'Request security technology?',
  ctaDesc: locale.value === 'de'
    ? 'Kontaktieren Sie uns für eine kostenlose Sicherheitsanalyse Ihrer Räumlichkeiten.'
    : 'Contact us for a free security analysis of your premises.',
}))
</script>
