<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'Digital Marketing Boost — DH Agentur' : 'Digital Marketing Boost — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Schnelle Wachstumsimpulse durch gezielte Digital-Marketing-Maßnahmen.'
    : 'Rapid growth through targeted digital marketing measures.'),
})

const data = computed(() => ({
  label: locale.value === 'de' ? 'Marketing Boost' : 'Digital Marketing Boost',
  title: locale.value === 'de' ? 'Schnelles Wachstum,' : 'Fast growth,',
  outcome: locale.value === 'de' ? 'sofort spürbar.' : 'felt immediately.',
  heroDesc: locale.value === 'de'
    ? 'Wenn Sie schnelle Ergebnisse brauchen, ist unser Marketing Boost das Richtige: gezielte Maßnahmen mit maximalem Impact in kürzester Zeit.'
    : 'When you need fast results, our Marketing Boost is the right choice: targeted measures with maximum impact in the shortest time.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen vor einem wichtigen Launch oder Event',
    'Betriebe mit kurzfristigem Wachstumsbedarf',
    'Startups, die schnell Traktion gewinnen wollen',
    'Marken, die eine Kampagne für eine Saison brauchen',
  ] : [
    'Companies before an important launch or event',
    'Businesses with short-term growth needs',
    'Startups that want to gain traction quickly',
    'Brands that need a campaign for a season',
  ],
  problems: locale.value === 'de' ? [
    'Zu wenig Zeit für eine langfristige Strategie',
    'Kurzfristiger Umsatz-Push nötig',
    'Neues Produkt oder Service braucht Bekanntheit',
    'Saisonales Geschäft mit Spitzenzeiten',
  ] : [
    'Too little time for a long-term strategy',
    'Short-term revenue push needed',
    'New product or service needs awareness',
    'Seasonal business with peak times',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Sprint-Kampagnen', desc: 'Intensive 4–8-Wochen-Kampagnen mit klarem Ziel.' },
    { title: 'Paid Social Ads', desc: 'Meta, TikTok und LinkedIn Ads für sofortige Reichweite.' },
    { title: 'Google Ads Fast-Track', desc: 'Schnell aufgesetzte und optimierte Suchkampagnen.' },
    { title: 'Landing Pages', desc: 'Conversion-optimierte Seiten für die Kampagne.' },
    { title: 'Retargeting', desc: 'Wiederansprache von Interessenten für höhere Conversion.' },
    { title: 'Daily Reporting', desc: 'Tägliche Reports während der Kampagne.' },
  ] : [
    { title: 'Sprint Campaigns', desc: 'Intensive 4–8 week campaigns with a clear goal.' },
    { title: 'Paid Social Ads', desc: 'Meta, TikTok and LinkedIn ads for instant reach.' },
    { title: 'Google Ads Fast-Track', desc: 'Quickly set up and optimized search campaigns.' },
    { title: 'Landing Pages', desc: 'Conversion-optimized pages for the campaign.' },
    { title: 'Retargeting', desc: 'Re-engagement of interested parties for higher conversion.' },
    { title: 'Daily Reporting', desc: 'Daily reports during the campaign.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Briefing', desc: 'Klares Ziel definieren und Budgets festlegen.' },
    { title: 'Schnell-Setup', desc: 'Kampagnen und Creatives in 48–72 Stunden live.' },
    { title: 'Optimierung', desc: 'Tägliche Optimierung für maximalen ROAS.' },
    { title: 'Scale', desc: 'Budgetskalierung bei guten Ergebnissen.' },
    { title: 'Abschluss-Report', desc: 'Detaillierter Bericht und Handlungsempfehlungen.' },
  ] : [
    { title: 'Briefing', desc: 'Define clear goals and set budgets.' },
    { title: 'Quick Setup', desc: 'Campaigns and creatives live within 48–72 hours.' },
    { title: 'Optimization', desc: 'Daily optimization for maximum ROAS.' },
    { title: 'Scale', desc: 'Budget scaling with good results.' },
    { title: 'Final Report', desc: 'Detailed report and recommendations for action.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Was ist der Unterschied zum normalen Digital Marketing?', answer: 'Der Marketing Boost ist auf schnelle, kurzfristige Ergebnisse ausgerichtet — ideal für Launches, Events oder saisonale Aktionen. Normales Digital Marketing ist eine langfristige Strategie.' },
    { question: 'Wie schnell sind die Kampagnen live?', answer: 'Bei einem vollständigen Briefing können wir Kampagnen innerhalb von 48–72 Stunden live schalten.' },
    { question: 'Was ist ein realistischer ROAS?', answer: 'Das hängt stark von Branche, Budget und Produkt ab. In vielen Fällen erzielen wir einen ROAS von 3x–6x. Wir kommunizieren realistische Erwartungen von Anfang an.' },
  ] : [
    { question: 'What is the difference from regular digital marketing?', answer: 'The Marketing Boost is focused on fast, short-term results — ideal for launches, events or seasonal promotions. Regular digital marketing is a long-term strategy.' },
    { question: 'How quickly are campaigns live?', answer: 'With a complete briefing, we can launch campaigns within 48–72 hours.' },
    { question: 'What is a realistic ROAS?', answer: 'This depends heavily on industry, budget and product. In many cases we achieve a ROAS of 3x–6x. We communicate realistic expectations from the start.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Schnelles Wachstum gewünscht?' : 'Want fast growth?',
  ctaDesc: locale.value === 'de'
    ? 'Schildern Sie uns Ihr Ziel und wir sagen Ihnen, was in Ihrem Zeitfenster möglich ist.'
    : "Tell us your goal and we'll tell you what's possible within your timeframe.",
}))
</script>
