<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('faq.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-5xl font-display font-black text-white md:text-6xl">
          {{ t('faq.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60">{{ t('faq.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- FAQ Sections -->
    <section class="section">
      <div class="container max-w-3xl">
        <div
          v-for="section in faqSections"
          :key="section.title"
          class="mb-12"
        >
          <h2 class="mb-6 text-xl font-display font-bold text-white flex items-center gap-3">
            <span class="text-2xl">{{ section.emoji }}</span>
            {{ section.title }}
          </h2>
          <UiFaqAccordion :items="section.items" />
        </div>
      </div>
    </section>

    <!-- Still questions -->
    <section class="section">
      <div class="container text-center">
        <h2 class="mb-4 text-2xl font-display font-bold text-white">
          {{ locale === 'de' ? 'Noch Fragen?' : 'Still have questions?' }}
        </h2>
        <p class="mb-8 text-white/60">
          {{ locale === 'de' ? 'Schreiben Sie uns — wir antworten innerhalb von 24 Stunden.' : 'Write to us — we respond within 24 hours.' }}
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          {{ t('common.getInTouch') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'FAQ — DH Agentur' : 'FAQ — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Häufige Fragen zu unseren Leistungen, Abläufen und Zusammenarbeit.'
    : 'Frequently asked questions about our services, processes and collaboration.'),
})

const faqSections = computed(() => locale.value === 'de' ? [
  {
    emoji: '🤝',
    title: 'Allgemein & Zusammenarbeit',
    items: [
      { question: 'Wie läuft ein Projekt bei DH Agentur ab?', answer: 'Wir starten mit einem kostenlosen Erstgespräch, danach folgt ein Angebot. Nach Auftragserteilung: Kickoff, agile Entwicklung mit regelmäßigem Feedback, Launch und Übergabe.' },
      { question: 'Für wen ist DH Agentur geeignet?', answer: 'Wir arbeiten mit KMUs, Startups und wachsenden Unternehmen aus dem DACH-Raum. Unsere Stärke liegt in der Kombination aus technischer Exzellenz und strategischem Verständnis.' },
      { question: 'Arbeitet ihr remote?', answer: 'Ja, wir sind ein remote-first Team und arbeiten mit Kunden aus ganz Österreich, Deutschland und der Schweiz zusammen. Meetings finden per Video-Call statt.' },
      { question: 'Wie kommuniziert ihr während eines Projekts?', answer: 'Primär über Slack oder Teams (je nach Kundenpräferenz), wöchentliche Status-Updates und regelmäßige Video-Calls für Feedback-Runden.' },
    ],
  },
  {
    emoji: '💻',
    title: 'Webentwicklung & Technik',
    items: [
      { question: 'Welche Technologien setzt ihr ein?', answer: 'Frontend: Nuxt 3, Vue 3, TypeScript, Tailwind CSS. Backend: Node.js, PostgreSQL, Supabase. Hosting: Vercel, Hetzner, AWS.' },
      { question: 'Kann ich die Website nach dem Projekt selbst bearbeiten?', answer: 'Ja, wir integrieren auf Wunsch ein CMS (z.B. Nuxt Content, Contentful oder Sanity), damit Sie Inhalte eigenständig pflegen können.' },
      { question: 'Bietet ihr Hosting an?', answer: 'Wir richten das Hosting ein und begleiten den Launch. Für laufendes Hosting empfehlen wir Vercel oder Hetzner — günstiger und effizienter als viele Managed-Lösungen.' },
      { question: 'Was ist der Unterschied zwischen einer Website und einer Web-App?', answer: 'Eine Website präsentiert Inhalte und Leistungen. Eine Web-App ermöglicht komplexe Interaktionen (z.B. Buchungssysteme, Portale, SaaS). Wir entwickeln beides.' },
    ],
  },
  {
    emoji: '📈',
    title: 'Marketing & SEO',
    items: [
      { question: 'Wie lange dauert es, bis SEO-Maßnahmen wirken?', answer: 'SEO ist langfristig. Erste Verbesserungen nach 2–3 Monaten, signifikante Ergebnisse nach 6–12 Monaten. Google Ads wirken sofort.' },
      { question: 'Welches Ads-Budget empfehlt ihr?', answer: 'Minimum 500–1.000 € / Monat für Anzeigenbudget (Google oder Meta). Darunter ist die Datenmenge zu gering für sinnvolle Optimierung.' },
      { question: 'Erhalte ich regelmäßige Reports?', answer: 'Ja, monatliche Reports mit allen relevanten KPIs — Traffic, Conversion, Kosten pro Lead, ROAS etc. Auf Wunsch auch wöchentlich.' },
    ],
  },
  {
    emoji: '💰',
    title: 'Kosten & Konditionen',
    items: [
      { question: 'Was kostet eine Website?', answer: 'Eine einfache Unternehmenswebsite ab ca. 3.000–5.000 €. Komplexere Projekte mit CMS, Animationen und Custom-Funktionen entsprechend mehr. Nach dem Erstgespräch erhalten Sie ein genaues Angebot.' },
      { question: 'Gibt es monatliche Kosten nach dem Projekt?', answer: 'Nur wenn Sie ein Wartungs- oder Marketing-Paket wählen. Die einmalige Entwicklung ist abgeschlossen bezahlt — keine versteckten Kosten.' },
      { question: 'Welche Zahlungsmodalitäten gibt es?', answer: 'Standard: 30% bei Projektstart, 40% bei Fertigstellung der Hauptfunktionen, 30% bei Launch. Abweichende Konditionen nach Absprache.' },
    ],
  },
] : [
  {
    emoji: '🤝',
    title: 'General & Collaboration',
    items: [
      { question: 'How does a project at DH Agentur work?', answer: 'We start with a free discovery call, followed by a proposal. After contract: kickoff, agile development with regular feedback, launch and handover.' },
      { question: 'Who is DH Agentur suitable for?', answer: 'We work with SMEs, startups and growing companies from the DACH region. Our strength lies in combining technical excellence with strategic understanding.' },
      { question: 'Do you work remotely?', answer: 'Yes, we are a remote-first team and work with clients from all over Austria, Germany and Switzerland. Meetings take place via video call.' },
      { question: 'How do you communicate during a project?', answer: 'Primarily via Slack or Teams (depending on client preference), weekly status updates and regular video calls for feedback rounds.' },
    ],
  },
  {
    emoji: '💻',
    title: 'Web Development & Technology',
    items: [
      { question: 'What technologies do you use?', answer: 'Frontend: Nuxt 3, Vue 3, TypeScript, Tailwind CSS. Backend: Node.js, PostgreSQL, Supabase. Hosting: Vercel, Hetzner, AWS.' },
      { question: 'Can I edit the website myself after the project?', answer: 'Yes, we can integrate a CMS (e.g. Nuxt Content, Contentful or Sanity) so you can manage content independently.' },
      { question: 'Do you offer hosting?', answer: 'We set up the hosting and guide the launch. For ongoing hosting we recommend Vercel or Hetzner — cheaper and more efficient than many managed solutions.' },
      { question: 'What is the difference between a website and a web app?', answer: 'A website presents content and services. A web app enables complex interactions (e.g. booking systems, portals, SaaS). We develop both.' },
    ],
  },
  {
    emoji: '📈',
    title: 'Marketing & SEO',
    items: [
      { question: 'How long does it take for SEO to work?', answer: 'SEO is long-term. First improvements after 2–3 months, significant results after 6–12 months. Google Ads work immediately.' },
      { question: 'What ad budget do you recommend?', answer: 'Minimum €500–1,000 / month for ad spend (Google or Meta). Below this, the data volume is too small for meaningful optimization.' },
      { question: 'Do I receive regular reports?', answer: 'Yes, monthly reports with all relevant KPIs — traffic, conversion, cost per lead, ROAS etc. Weekly on request.' },
    ],
  },
  {
    emoji: '💰',
    title: 'Costs & Terms',
    items: [
      { question: 'What does a website cost?', answer: 'A simple business website from approx. €3,000–5,000. More complex projects with CMS, animations and custom features correspondingly more. After the discovery call you receive an exact quote.' },
      { question: 'Are there monthly costs after the project?', answer: 'Only if you choose a maintenance or marketing package. The one-time development is paid in full — no hidden costs.' },
      { question: 'What payment terms are available?', answer: 'Standard: 30% at project start, 40% at completion of main features, 30% at launch. Different terms by arrangement.' },
    ],
  },
])
</script>


