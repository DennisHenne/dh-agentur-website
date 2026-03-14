<template>
  <SectionsServiceDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: computed(() => locale.value === 'de' ? 'E-Commerce — DH Agentur' : 'E-Commerce — DH Agentur'),
  description: computed(() => locale.value === 'de'
    ? 'Online-Shops und Verkaufsplattformen, die verkaufen — Shopify, WooCommerce, Custom Lösungen.'
    : 'Online shops and sales platforms that convert — Shopify, WooCommerce, custom solutions.'),
})

const data = computed(() => ({
  label: 'E-Commerce',
  title: locale.value === 'de' ? 'Online-Shops,' : 'Online shops,',
  outcome: locale.value === 'de' ? 'die verkaufen.' : 'that convert.',
  heroDesc: locale.value === 'de'
    ? 'Wir entwickeln und optimieren E-Commerce-Lösungen — von Shopify über WooCommerce bis zu maßgeschneiderten Plattformen.'
    : 'We develop and optimize e-commerce solutions — from Shopify and WooCommerce to custom platforms.',
  forWhom: locale.value === 'de' ? [
    'Unternehmen, die online verkaufen wollen',
    'Bestehende Shops mit Performance-Problemen',
    'Marken, die ihre Customer Journey optimieren wollen',
    'B2B-Anbieter mit komplexen Bestellprozessen',
  ] : [
    'Companies that want to sell online',
    'Existing shops with performance issues',
    'Brands that want to optimize their customer journey',
    'B2B providers with complex ordering processes',
  ],
  problems: locale.value === 'de' ? [
    'Hohe Abbruchrate im Checkout',
    'Langsame Ladezeiten kosten Umsatz',
    'Mobile-Erlebnis nicht optimiert',
    'Keine Integration mit ERP oder Buchhaltung',
  ] : [
    'High checkout abandonment rate',
    'Slow load times cost revenue',
    'Mobile experience not optimized',
    'No integration with ERP or accounting',
  ],
  deliverables: locale.value === 'de' ? [
    { title: 'Shop-Entwicklung', desc: 'Moderne E-Commerce-Plattformen mit Shopify, WooCommerce oder Custom.' },
    { title: 'Checkout-Optimierung', desc: 'Reduzierte Abbruchrate durch UX-Verbesserungen.' },
    { title: 'Payment-Integration', desc: 'Stripe, PayPal, Klarna und weitere Zahlungsanbieter.' },
    { title: 'ERP-Anbindung', desc: 'Schnittstellen zu Buchhaltung und Warenwirtschaft.' },
    { title: 'Performance-Tuning', desc: 'Schnelle Ladezeiten für bessere Conversion.' },
    { title: 'Analytics & A/B-Tests', desc: 'Datenbasierte Optimierung des Shops.' },
  ] : [
    { title: 'Shop Development', desc: 'Modern e-commerce platforms with Shopify, WooCommerce or custom.' },
    { title: 'Checkout Optimization', desc: 'Reduced abandonment through UX improvements.' },
    { title: 'Payment Integration', desc: 'Stripe, PayPal, Klarna and other payment providers.' },
    { title: 'ERP Integration', desc: 'Interfaces to accounting and inventory management.' },
    { title: 'Performance Tuning', desc: 'Fast load times for better conversion.' },
    { title: 'Analytics & A/B Testing', desc: 'Data-driven shop optimization.' },
  ],
  process: locale.value === 'de' ? [
    { title: 'Anforderungsanalyse', desc: 'Wir erfassen Ihre Produkte, Prozesse und Ziele.' },
    { title: 'Konzept & Architektur', desc: 'Technische und UX-Konzeption des Shops.' },
    { title: 'Entwicklung', desc: 'Umsetzung mit bewährten E-Commerce-Technologien.' },
    { title: 'Integration', desc: 'Anbindung von Payment, Versand und Buchhaltung.' },
    { title: 'Launch & Optimierung', desc: 'Go-Live und laufende Conversion-Optimierung.' },
  ] : [
    { title: 'Requirements Analysis', desc: 'We capture your products, processes and goals.' },
    { title: 'Concept & Architecture', desc: 'Technical and UX concept of the shop.' },
    { title: 'Development', desc: 'Implementation with proven e-commerce technologies.' },
    { title: 'Integration', desc: 'Connection of payment, shipping and accounting.' },
    { title: 'Launch & Optimization', desc: 'Go-live and ongoing conversion optimization.' },
  ],
  faq: locale.value === 'de' ? [
    { question: 'Welche Plattform ist die richtige?', answer: 'Das hängt von Ihrem Produktportfolio, Volumen und Anforderungen ab. Wir beraten Sie und empfehlen Shopify, WooCommerce oder eine Custom-Lösung.' },
    { question: 'Wie lange dauert ein Shop-Projekt?', answer: 'Ein Standard-Shop mit 50–200 Produkten dauert 4–8 Wochen. Komplexe Projekte entsprechend länger.' },
  ] : [
    { question: 'Which platform is right?', answer: 'It depends on your product portfolio, volume and requirements. We advise you and recommend Shopify, WooCommerce or a custom solution.' },
    { question: 'How long does a shop project take?', answer: 'A standard shop with 50–200 products takes 4–8 weeks. Complex projects take longer accordingly.' },
  ],
  ctaTitle: locale.value === 'de' ? 'Ihr Online-Shop als nächstes?' : 'Your online shop next?',
  ctaDesc: locale.value === 'de'
    ? 'Lassen Sie uns gemeinsam die beste E-Commerce-Lösung für Ihr Business finden.'
    : "Let's find the best e-commerce solution for your business together.",
}))
</script>
