<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Social Media Marketing — DH Agentur' : 'Social Media Marketing — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Strategische Präsenz auf Instagram, LinkedIn, TikTok und mehr — Content, Community und Kampagnen.'
    : 'Strategic presence on Instagram, LinkedIn, TikTok and more — content, community and campaigns.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Social Media Marketing' : 'Social Media Marketing',
  title: locale.value === 'de' ? 'Sichtbar sein,' : 'Be visible,',
  outcome: locale.value === 'de' ? 'Reichweite aufbauen.' : 'build reach.',
  heroDesc: locale.value === 'de'
    ? 'Wir entwickeln und betreuen Ihre Social-Media-Präsenz — von der Strategie über Content-Erstellung bis zur Community-Pflege.'
    : 'We develop and manage your social media presence — from strategy and content creation to community management.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen ohne oder mit schwacher Social-Media-Präsenz',
    'Brands, die ihre Reichweite steigern wollen',
    'B2B-Anbieter, die auf LinkedIn sichtbar sein wollen',
    'E-Commerce, die über Instagram und TikTok verkaufen wollen',
  ] : [
    'Companies without or with weak social media presence',
    'Brands that want to increase their reach',
    'B2B providers that want to be visible on LinkedIn',
    'E-commerce that want to sell via Instagram and TikTok',
  ],
  problems: locale.value === 'de' ? [
    'Social Media ohne klare Strategie',
    'Keine konsistente Content-Produktion',
    'Geringe Reichweite trotz regelmäßiger Posts',
    'Keine messbaren Ergebnisse',
  ] : [
    'Social media without clear strategy',
    'No consistent content production',
    'Low reach despite regular posts',
    'No measurable results',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Social-Media-Strategie', desc: 'Kanalauswahl, Zielgruppe und Content-Konzept.' },
    { title: 'Content-Erstellung', desc: 'Posts, Stories, Reels und Video-Content.' },
    { title: 'Community-Management', desc: 'Antworten, Moderation und Engagement.' },
    { title: 'Paid Social', desc: 'Zielgerichtete Werbung auf Meta, LinkedIn, TikTok.' },
    { title: 'Influencer-Kooperationen', desc: 'Partnerschaften mit passenden Creator:innen.' },
    { title: 'Reporting & Analyse', desc: 'Reichweite, Engagement und ROI-Tracking.' },
  ] : [
    { title: 'Social Media Strategy', desc: 'Channel selection, target audience and content concept.' },
    { title: 'Content Creation', desc: 'Posts, stories, reels and video content.' },
    { title: 'Community Management', desc: 'Responses, moderation and engagement.' },
    { title: 'Paid Social', desc: 'Targeted advertising on Meta, LinkedIn, TikTok.' },
    { title: 'Influencer Partnerships', desc: 'Collaborations with relevant creators.' },
    { title: 'Reporting & Analysis', desc: 'Reach, engagement and ROI tracking.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Audit & Zieldefinition', desc: 'Analyse Ihrer aktuellen Präsenz und Ziele.' },
    { title: 'Strategie & Content-Plan', desc: 'Kanalauswahl und redaktioneller Fahrplan.' },
    { title: 'Setup & Onboarding', desc: 'Einrichtung der Kanäle und Brand Guidelines.' },
    { title: 'Produktion & Publishing', desc: 'Regelmäßige Content-Erstellung und Veröffentlichung.' },
    { title: 'Optimierung', desc: 'Laufende Anpassung basierend auf Performance-Daten.' },
  ] : [
    { title: 'Audit & Goal Definition', desc: 'Analysis of your current presence and goals.' },
    { title: 'Strategy & Content Plan', desc: 'Channel selection and editorial roadmap.' },
    { title: 'Setup & Onboarding', desc: 'Channel setup and brand guidelines.' },
    { title: 'Production & Publishing', desc: 'Regular content creation and publication.' },
    { title: 'Optimization', desc: 'Ongoing adjustment based on performance data.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Plattformen betreut ihr?', answer: 'Wir betreuen Instagram, LinkedIn, TikTok, Facebook, X (Twitter) und YouTube — je nach Ihrer Zielgruppe und Ziele.' },
    { question: 'Wie oft wird gepostet?', answer: 'Das hängt von der Plattform und Strategie ab. Typisch: Instagram 3–5x/Woche, LinkedIn 2–3x/Woche, TikTok 4–7x/Woche.' },
  ] : [
    { question: 'What platforms do you manage?', answer: 'We manage Instagram, LinkedIn, TikTok, Facebook, X (Twitter) and YouTube — depending on your target audience and goals.' },
    { question: 'How often do you post?', answer: 'It depends on the platform and strategy. Typical: Instagram 3–5x/week, LinkedIn 2–3x/week, TikTok 4–7x/week.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Social Media auf das nächste Level?' : 'Social media to the next level?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam Ihre Social-Media-Strategie entwickeln.'
    : "Let's develop your social media strategy together.",
}))
</script>
