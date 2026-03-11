<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'IT-Sicherheit & Cloud — DH Agentur' : 'IT Security & Cloud — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Sichere IT-Infrastruktur, Cloud-Migration und IT-Sicherheitsberatung für Ihr Unternehmen.'
    : 'Secure IT infrastructure, cloud migration and IT security consulting for your business.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'IT-Sicherheit & Cloud' : 'IT Security & Cloud',
  title: locale.value === 'de' ? 'Sicher,' : 'Secure,',
  outcome: locale.value === 'de' ? 'skalierbar, zuverlässig.' : 'scalable, reliable.',
  heroDesc: locale.value === 'de'
    ? 'Wir schützen Ihre digitale Infrastruktur, begleiten Cloud-Migrationen und sorgen für sichere, skalierbare Systeme, die mit Ihrem Unternehmen wachsen.'
    : 'We protect your digital infrastructure, guide cloud migrations and ensure secure, scalable systems that grow with your business.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit sensiblen Daten und hohen Compliance-Anforderungen',
    'Betriebe, die in die Cloud migrieren wollen',
    'Teams, die ihre DevOps-Prozesse verbessern wollen',
    'Unternehmen nach einem Sicherheitsvorfall',
  ] : [
    'Companies with sensitive data and high compliance requirements',
    'Businesses that want to migrate to the cloud',
    'Teams that want to improve their DevOps processes',
    'Companies after a security incident',
  ],
  problems: locale.value === 'de' ? [
    'Unklare Sicherheitslage und ungepatchte Systeme',
    'On-Premise-Infrastruktur wird zum Kostentreiber',
    'Kein Disaster Recovery Plan',
    'DSGVO-Konformität unklar',
  ] : [
    'Unclear security situation and unpatched systems',
    'On-premise infrastructure is becoming a cost driver',
    'No disaster recovery plan',
    'GDPR compliance unclear',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Security Audit', desc: 'Überprüfung Ihrer gesamten IT-Infrastruktur auf Schwachstellen.' },
    { title: 'Cloud-Migration', desc: 'Planung und Umsetzung der Migration in die Cloud (AWS, Hetzner, GCP).' },
    { title: 'DevOps & CI/CD', desc: 'Automatisierte Deployment-Pipelines und Infrastruktur-as-Code.' },
    { title: 'Monitoring & Alerting', desc: 'Proaktives Monitoring und Alert-Systeme.' },
    { title: 'Backup & Recovery', desc: 'Backup-Strategien und getestete Wiederherstellungsprozesse.' },
    { title: 'DSGVO-Beratung', desc: 'Technische Maßnahmen für DSGVO-Konformität.' },
  ] : [
    { title: 'Security Audit', desc: 'Review of your entire IT infrastructure for vulnerabilities.' },
    { title: 'Cloud Migration', desc: 'Planning and execution of migration to the cloud (AWS, Hetzner, GCP).' },
    { title: 'DevOps & CI/CD', desc: 'Automated deployment pipelines and infrastructure-as-code.' },
    { title: 'Monitoring & Alerting', desc: 'Proactive monitoring and alert systems.' },
    { title: 'Backup & Recovery', desc: 'Backup strategies and tested recovery processes.' },
    { title: 'GDPR Consulting', desc: 'Technical measures for GDPR compliance.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Security Assessment', desc: 'Bestandsaufnahme und Risikobewertung.' },
    { title: 'Konzept', desc: 'Maßnahmenplan und Priorisierung.' },
    { title: 'Umsetzung', desc: 'Schrittweise Implementierung der Maßnahmen.' },
    { title: 'Testing', desc: 'Penetration Tests und Validierung.' },
    { title: 'Monitoring', desc: 'Laufendes Monitoring und Incident-Response.' },
  ] : [
    { title: 'Security Assessment', desc: 'Inventory and risk assessment.' },
    { title: 'Concept', desc: 'Action plan and prioritization.' },
    { title: 'Implementation', desc: 'Step-by-step implementation of measures.' },
    { title: 'Testing', desc: 'Penetration tests and validation.' },
    { title: 'Monitoring', desc: 'Ongoing monitoring and incident response.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Cloud-Anbieter betreut ihr?', answer: 'Wir haben Erfahrung mit AWS, Google Cloud Platform, Hetzner und DigitalOcean. Wir empfehlen immer die für Ihre Anforderungen und Budget passende Lösung.' },
    { question: 'Wie läuft eine Cloud-Migration ab?', answer: 'Wir starten mit einem Assessment, erstellen einen Migrationsplan und führen die Migration schrittweise durch — ohne Produktionsausfälle.' },
    { question: 'Bietet ihr auch laufendes Security-Monitoring an?', answer: 'Ja, wir bieten Managed Security Services an, die Ihre Systeme rund um die Uhr überwachen und bei Vorfällen sofort reagieren.' },
  ] : [
    { question: 'Which cloud providers do you work with?', answer: 'We have experience with AWS, Google Cloud Platform, Hetzner and DigitalOcean. We always recommend the solution that fits your requirements and budget.' },
    { question: 'How does a cloud migration work?', answer: 'We start with an assessment, create a migration plan and carry out the migration step by step — without production downtime.' },
    { question: 'Do you offer ongoing security monitoring?', answer: 'Yes, we offer managed security services that monitor your systems around the clock and respond immediately to incidents.' },
  ],
  ctaTitle: locale.value === 'de' ? 'IT-Sicherheit verbessern?' : 'Want to improve IT security?',
  ctaDesc: locale.value === 'de'
    ? 'Starten Sie mit einem kostenlosen Security-Assessment und erfahren Sie, wo Ihre Schwachstellen liegen.'
    : 'Start with a free security assessment and find out where your vulnerabilities are.',
}))
</script>
