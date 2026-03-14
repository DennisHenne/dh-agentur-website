<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('footer.legal') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-white sm:text-5xl md:text-6xl">
          {{ locale === 'de' ? 'Impressum' : 'Legal Notice' }}
        </h1>
        <p class="text-lg text-white/60">
          {{ locale === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG' }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container max-w-3xl">
        <div class="prose prose-invert prose-lg max-w-none space-y-8">
          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Anbieter' : 'Provider' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              DH Online&Eventagentur<br>
              An der Stadtgärtnerei 47<br>
              46485 Wesel<br>
              Deutschland
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Kontakt' : 'Contact' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              E-Mail: dennish@dhagentur.de<br>
              Telefon: 0159 01078280
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Umsatzsteuer-ID' : 'VAT ID' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              {{ locale === 'de' ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz' : 'VAT identification number according to § 27a German VAT Act' }}<br>
              DE123456789
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Verantwortlich für den Inhalt' : 'Responsible for content' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              Dennis Henne<br>
              DH Online&Eventagentur<br>
              An der Stadtgärtnerei 47<br>
              46485 Wesel
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'EU-Streitschlichtung' : 'EU dispute resolution' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Sie werden von uns nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board.' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Haftung für Inhalte' : 'Liability for content' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                : 'As a service provider, we are responsible for our own content on these pages in accordance with § 7 Paragraph 1 TMG under general laws. However, according to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Haftung für Links' : 'Liability for links' }}
            </h2>
            <p class="text-white/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
                : 'Our offer contains links to external third-party websites, the content of which we have no influence on. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.' }}
            </p>
          </div>

          <NuxtLink to="/" class="btn-outline mt-8 inline-flex">
            {{ locale === 'de' ? '← Zur Startseite' : '← Back to home' }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: () => locale.value === 'de' ? 'Impressum — DH Agentur' : 'Legal Notice — DH Agentur',
  description: () => locale.value === 'de'
    ? 'Impressum und rechtliche Angaben der DH Agentur.'
    : 'Legal notice and company information of DH Agentur.',
})
</script>
