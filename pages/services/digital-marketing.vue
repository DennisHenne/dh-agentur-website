<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Digital Marketing — DH Agentur' : 'Digital Marketing — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Strategisches Digital Marketing für nachhaltiges Wachstum — SEO, Social Media, Content und Paid Ads.'
    : 'Strategic digital marketing for sustainable growth — SEO, social media, content and paid ads.'),
})

const data = computed(() => ({
  label: 'Digital Marketing',
  title: locale.value === 'de' ? 'Mehr Reichweite,' : 'More reach,',
  outcome: locale.value === 'de' ? 'mehr Umsatz.' : 'more revenue.',
  heroDesc: locale.value === 'de'
    ? 'Wir entwickeln und implementieren ganzheitliche Digital-Marketing-Strategien, die Ihr Unternehmen online sichtbar machen und neue Kunden gewinnen.'
    : 'We develop and implement holistic digital marketing strategies that make your business visible online and win new customers.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen mit geringer Online-Sichtbarkeit',
    'Betriebe, die mehr qualifizierte Leads generieren wollen',
    'Brands, die ihre Social-Media-Präsenz aufbauen wollen',
    'E-Commerce-Shops, die ihren Umsatz steigern wollen',
  ] : [
    'Companies with low online visibility',
    'Businesses that want to generate more qualified leads',
    'Brands that want to build their social media presence',
    'E-commerce shops that want to increase revenue',
  ],
  problems: locale.value === 'de' ? [
    'Kaum organischer Traffic trotz gutem Produkt',
    'Marketingmaßnahmen ohne messbare Ergebnisse',
    'Kein klares Messaging für die Zielgruppe',
    'Social Media ohne Strategie und Ergebnisse',
  ] : [
    'Little organic traffic despite a good product',
    'Marketing measures without measurable results',
    'No clear messaging for the target audience',
    'Social media without strategy and results',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Marketing-Strategie', desc: 'Ganzheitliche Strategie basierend auf Ihrer Zielgruppe und Ziele.' },
    { title: 'Content Marketing', desc: 'Blog, Social Media Inhalte und Whitepapers.' },
    { title: 'SEO & SEA', desc: 'Organisches Ranking und bezahlte Suchanzeigen.' },
    { title: 'Social Media Management', desc: 'Aufbau und Betreuung Ihrer Social-Media-Kanäle.' },
    { title: 'E-Mail-Marketing', desc: 'Newsletter und Automated E-Mail-Kampagnen.' },
    { title: 'Analytics & Reporting', desc: 'Monatliche Reports und KPI-Tracking.' },
  ] : [
    { title: 'Marketing Strategy', desc: 'Holistic strategy based on your target audience and goals.' },
    { title: 'Content Marketing', desc: 'Blog, social media content and whitepapers.' },
    { title: 'SEO & SEA', desc: 'Organic ranking and paid search ads.' },
    { title: 'Social Media Management', desc: 'Building and managing your social media channels.' },
    { title: 'Email Marketing', desc: 'Newsletters and automated email campaigns.' },
    { title: 'Analytics & Reporting', desc: 'Monthly reports and KPI tracking.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Analyse & Audit', desc: 'Wir analysieren Ihre aktuelle Situation und den Wettbewerb.' },
    { title: 'Strategie-Entwicklung', desc: 'Erstellung eines maßgeschneiderten Marketing-Plans.' },
    { title: 'Umsetzung', desc: 'Schrittweise Implementierung aller Maßnahmen.' },
    { title: 'Optimierung', desc: 'Laufende Optimierung basierend auf Daten.' },
    { title: 'Reporting', desc: 'Monatliche Reports und Strategie-Reviews.' },
  ] : [
    { title: 'Analysis & Audit', desc: 'We analyze your current situation and the competition.' },
    { title: 'Strategy Development', desc: 'Creation of a tailored marketing plan.' },
    { title: 'Implementation', desc: 'Step-by-step implementation of all measures.' },
    { title: 'Optimization', desc: 'Ongoing optimization based on data.' },
    { title: 'Reporting', desc: 'Monthly reports and strategy reviews.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Bei bezahlten Anzeigen (SEA) oft innerhalb von Tagen. SEO und organisches Wachstum brauchen 3–6 Monate für erste signifikante Ergebnisse.' },
    { question: 'Kümmert ihr euch um den gesamten Content?', answer: 'Ja, wir übernehmen die Planung, Erstellung und Veröffentlichung aller Inhalte. Sie geben die Richtung vor, wir setzen um.' },
    { question: 'Welche Plattformen betreut ihr?', answer: 'Wir betreuen Google, Meta (Facebook/Instagram), LinkedIn, TikTok und weitere — je nach Ihrer Zielgruppe.' },
  ] : [
    { question: 'How quickly will I see results?', answer: 'With paid ads (SEA) often within days. SEO and organic growth need 3–6 months for first significant results.' },
    { question: 'Do you handle all the content?', answer: 'Yes, we handle the planning, creation and publication of all content. You set the direction, we execute.' },
    { question: 'What platforms do you manage?', answer: 'We manage Google, Meta (Facebook/Instagram), LinkedIn, TikTok and more — depending on your target audience.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Mehr Kunden durch digitales Marketing?' : 'More customers through digital marketing?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam herausfinden, welche Kanäle für Ihr Business die größte Wirkung haben.'
    : "Let's find out together which channels have the greatest impact for your business.",
}))
</script>
