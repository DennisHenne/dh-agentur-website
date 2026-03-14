<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-16 pt-32 md:pt-40">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('footer.privacy') }}</UiBadge>
        <h1 class="mb-6 text-4xl font-display font-black text-dark sm:text-5xl md:text-6xl">
          {{ locale === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy' }}
        </h1>
        <p class="text-lg text-dark/60">
          {{ locale === 'de' ? 'Informationen gemäß DSGVO' : 'Information according to GDPR' }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container max-w-3xl">
        <div class="prose prose-lg max-w-none space-y-8">
          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '1. Verantwortlicher' : '1. Controller' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              DH Online&Eventagentur<br>
              An der Stadtgärtnerei 47<br>
              46485 Wesel, Deutschland<br>
              E-Mail: dennish@dhagentur.de
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '2. Erhebung und Speicherung personenbezogener Daten' : '2. Collection and storage of personal data' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Beim Besuch unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Dabei werden u.a. IP-Adresse, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, übertragene Datenmenge sowie der anfragende Provider erfasst.'
                : 'When you visit our website, information is automatically sent to the server of our website by the browser used on your device. This information is temporarily stored in a so-called log file. This includes, among other things, IP address, date and time of access, name and URL of the requested file, amount of data transferred and the requesting provider.' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '3. Kontaktformular' : '3. Contact form' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Eine Weitergabe dieser Daten an Dritte erfolgt nicht ohne Ihre Einwilligung.'
                : 'If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored with us for the purpose of processing the inquiry and in case of follow-up questions. This data will not be passed on to third parties without your consent.' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '4. Cookies' : '4. Cookies' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie dienen der Benutzerfreundlichkeit und der Analyse des Nutzungsverhaltens. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und diese einzeln erlauben oder ablehnen.'
                : 'Our website uses cookies. Cookies are small text files that are stored on your device. They serve to improve user experience and analyze usage behavior. You can set your browser to inform you about the setting of cookies and to allow or reject them individually.' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '5. Ihre Rechte' : '5. Your rights' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              {{ locale === 'de'
                ? 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Sie können sich bei Beschwerden an die Aufsichtsbehörde wenden (in Österreich: Datenschutzbehörde).'
                : 'You have the right to information, correction, deletion, restriction of processing, data portability and objection. You can lodge a complaint with the supervisory authority (in Austria: Data Protection Authority).' }}
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? '6. Stand' : '6. Last updated' }}
            </h2>
            <p class="text-dark/70 leading-relaxed">
              {{ locale === 'de' ? 'Diese Datenschutzerklärung hat den Stand März 2026.' : 'This privacy policy was last updated in March 2026.' }}
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
  title: () => locale.value === 'de' ? 'Datenschutz — DH Agentur' : 'Privacy Policy — DH Agentur',
  description: () => locale.value === 'de'
    ? 'Datenschutzerklärung der DH Agentur. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.'
    : 'Privacy policy of DH Agentur. Information on the processing of your personal data.',
})
</script>
