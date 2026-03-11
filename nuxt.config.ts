export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@pinia/nuxt',
  ],

  i18n: {
    strategy: 'no_prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
    defaultLocale: 'de',
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'dh_locale',
      redirectOn: 'root',
      fallbackLocale: 'de',
    },
  },

  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'DH Agentur — Digitale Lösungen für Ihr Unternehmen',
      // Inline style sets bg immediately — prevents white/unstyled flash before CSS loads
      style: [
        { children: 'html,body{background-color:#001A23;color:#E8F1F2;}' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#001A23' },
        {
          name: 'description',
          content:
            'DH Agentur — Webentwicklung, Prozessoptimierung, Digital Marketing, KI-Projekte und mehr.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
})
