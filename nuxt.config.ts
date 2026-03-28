export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  // Enable polling for Docker on Windows (inotify events don't propagate from NTFS)
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/fonts',
  ],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Syne', provider: 'google', weights: [700, 800] },
    ],
  },

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
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#001A23' },
        {
          name: 'description',
          content:
            'DH Agentur — Webentwicklung, Prozessoptimierung, Digital Marketing, KI-Projekte und mehr.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production-min-32chars!!',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@dh-agentur.de',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    rollupConfig: {
      external: ['better-sqlite3'],
    },
  },
})
