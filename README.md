# DH Agentur Website

Vollständige Nuxt 3 Agentur-Website mit bilingualer DE/EN Unterstützung (kein URL-Prefix).  
Farbpalette: `#001A23` · `#31493C` · `#7A9E7E` · `#B3EFB2` · `#E8F1F2`

---

## Tech Stack

| Technologie | Version | Zweck |
|---|---|---|
| **Nuxt 3** | ^3.15 | Vue 3 Framework, SSR, Auto-Imports |
| **@nuxtjs/i18n** | ^9.1 | DE/EN ohne URL-Prefix (`no_prefix`) |
| **@nuxt/content** | ^2.13 | Markdown-Blog (`/insights`) |
| **Tailwind CSS** | ^3.4 | Utility-First Styling |
| **Pinia** | ^2.3 | State Management |
| **Docker** | — | Containerisiertes Deployment |

---

## Schnellstart

### Voraussetzungen
- Node.js 20+
- npm 10+
- (Optional) Docker Desktop

### Lokale Entwicklung

```bash
# 1. Dependencies installieren
npm install

# 2. Dev-Server starten
npm run dev
# → http://localhost:3000
```

> **Wichtig:** Nach größeren Änderungen an Komponenten (insbesondere `AppHeader.vue`, Layouts) **Dev-Server neu starten** (Strg+C → `npm run dev`), damit der SSR-Bundle aktualisiert wird. HMR aktualisiert nur den Client-Bundle.

### Production Build

```bash
npm run build
npm run preview
# → http://localhost:3000
```

### Docker

```bash
# Production Preview (Port 3000)
docker-compose up --build app

# Dev-Server mit Hot-Reload im Container (Port 3001)
docker-compose --profile dev up dev
```

---

## Projektstruktur

```
DH Agentur Website/
│
├── assets/
│   └── css/
│       └── main.css              # Tailwind-Direktiven + globale Komponenten-Klassen
│                                 # (.btn-primary, .card, .section-label, .gradient-text …)
│
├── components/
│   ├── icons/
│   │   └── LogoDH.vue            # SVG-Logo inline (currentColor, skalierbar per :size prop)
│   ├── layout/
│   │   ├── AppHeader.vue         # Transparente Sticky-Bar, Logo-Animation, Hamburger→X
│   │   ├── AppFooter.vue         # Footer mit Links und Logo
│   │   └── LanguageSwitch.vue    # DE/EN Dropdown (:dark prop für helle/dunkle BG)
│   ├── sections/
│   │   ├── HomeHero.vue          # Hero-Sektion Startseite
│   │   ├── HomeServices.vue      # Services-Teaser
│   │   ├── HomeWork.vue          # Work-Teaser
│   │   ├── HomeReferences.vue    # Referenzen & Testimonials
│   │   ├── HomeAbout.vue         # Über-uns-Teaser
│   │   ├── HomeCta.vue           # Call-to-Action
│   │   ├── ServiceDetail.vue     # Template für alle 8 Service-Seiten
│   │   └── WorkDetail.vue        # Template für Projekt-Detail-Seiten
│   ├── ui/
│   │   ├── UiBadge.vue           # Pill-Label (verwendet .section-label CSS-Klasse)
│   │   ├── UiButton.vue          # Button (primary / secondary / outline / ghost)
│   │   ├── UiCard.vue            # Card-Komponente
│   │   └── UiFaqAccordion.vue    # Akkordeon für FAQs
│   └── AiChatWidget.vue          # Floating KI-Chat Widget (sitewide)
│
├── content/
│   └── insights/                 # Blog-Artikel als .md Dateien
│       ├── ki-im-mittelstand.md
│       ├── seo-strategie-2025.md
│       └── web-performance.md
│
├── i18n/
│   └── locales/
│       ├── de.json               # Deutsche Übersetzungen
│       └── en.json               # Englische Übersetzungen
│
├── layouts/
│   └── default.vue               # Haupt-Layout: Header + <slot> + Footer + ChatWidget
│                                 # KEIN pt-16 mehr — Hero-Sektionen handhaben Top-Padding selbst
│
├── pages/
│   ├── index.vue                 # / Startseite (assembliert alle Home-Sections)
│   ├── about.vue                 # /about
│   ├── careers.vue               # /careers
│   ├── contact.vue               # /contact
│   ├── faq.vue                   # /faq (Footer-Link, nicht im Hauptmenü)
│   ├── error.vue                 # Fehlerseite (404 etc.)
│   ├── insights/
│   │   ├── index.vue             # /insights Blog-Übersicht
│   │   └── [slug].vue            # /insights/:slug Artikel-Detail
│   ├── services/
│   │   ├── index.vue             # /services Leistungsübersicht
│   │   ├── web-development.vue
│   │   ├── process-optimization.vue
│   │   ├── digital-marketing.vue
│   │   ├── ai-projects.vue
│   │   ├── google-management.vue
│   │   ├── custom-web-apps.vue
│   │   ├── it-security-cloud.vue
│   │   └── digital-marketing-boost.vue
│   └── work/
│       ├── index.vue             # /work Projekte & Referenzen
│       ├── testwebsites.vue      # /work/testwebsites
│       └── co-working-space.vue  # /work/co-working-space
│
├── public/
│   └── Schwarz-transparent.svg   # Original-SVG (Referenz, nicht mehr direkt verwendet)
│                                 # Logo wird inline via LogoDH.vue gerendert
│
├── .env.example                  # Umgebungsvariablen-Vorlage
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── nuxt.config.ts                # Nuxt-Konfiguration (i18n, content, head, inline CSS)
├── tailwind.config.ts            # Farbpalette + Custom Tokens
└── tsconfig.json
```

---

## Seiten-Übersicht

| URL | Seite | Beschreibung |
|---|---|---|
| `/` | Startseite | Hero, Services-Teaser, Work-Teaser, Referenzen, CTA |
| `/work` | Work Hub | Projekte-Grid + Testimonials |
| `/work/testwebsites` | Projektdetail | Template: Ausgangslage → Lösung → Ergebnis |
| `/work/co-working-space` | Projektdetail | — |
| `/services` | Leistungen | Grid aller 8 Services + FAQ |
| `/services/web-development` | Webentwicklung | — |
| `/services/process-optimization` | Prozessoptimierung | — |
| `/services/digital-marketing` | Digital Marketing | — |
| `/services/ai-projects` | KI-Projekte | — |
| `/services/google-management` | Google Management | — |
| `/services/custom-web-apps` | Individual-Webapps | — |
| `/services/it-security-cloud` | IT-Sicherheit & Cloud | — |
| `/services/digital-marketing-boost` | Marketing Boost | — |
| `/about` | Über uns | Team, Werte, Prozess, Stats, CTA |
| `/insights` | Blog | Artikel-Übersicht mit Kategorie-Filter |
| `/insights/:slug` | Artikel-Detail | Markdown-Content aus `content/insights/` |
| `/careers` | Karriere | Stellen, Perks, Bewerbungsprozess |
| `/contact` | Kontakt | Formular, Kontaktdaten, FAQ |
| `/faq` | FAQ | Kategorisierte Fragen (nur Footer-Link) |

---

## Design System / Farbpalette

```ts
// tailwind.config.ts
brand: {
  200: '#B3EFB2',  // Mint   — Labels, Badges, Highlights
  500: '#7A9E7E',  // Sage   — Muted Text, Borders
  600: '#31493C',  // Forest — CTA-Buttons, Akzente
}
dark: {
  DEFAULT: '#001A23',  // Page-Hintergrund
  50:      '#051d26',  // Footer-Hintergrund
  100:     '#0c2a35',  // Cards
  200:     '#132f3a',  // Elevated Cards
}
light: '#E8F1F2'  // Heller Text, Menu-Overlay-Hintergrund
```

### Wichtige CSS-Klassen (`assets/css/main.css`)

| Klasse | Verwendung |
|---|---|
| `.btn-primary` | Forest-grüner Button mit Light-Text |
| `.btn-secondary` | Ghost-Button (weißer Rand) |
| `.btn-outline` | Mint-Rand, wird bei Hover forest |
| `.card` | Dunkle Card-Surface mit Sage-Border |
| `.section-label` | Pill-Label über Überschriften (Mint) |
| `.section-title` | H2-Überschriften im Display-Font |
| `.section-subtitle` | Gedämpfter Fließtext |
| `.gradient-text` | Mint→Sage Farbverlauf auf Text |
| `.section` | `py-20 md:py-28` Abstandshelfer |

---

## Header / Navigation

Die Sticky-Bar ist **immer 100% transparent** — kein Hintergrund beim Scrollen.

**Logo-Animation:**
- Oben auf der Seite: `[Logo] Agentur` sichtbar
- Beim Scrollen: "Agentur" gleitet mit `max-width`-Transition nach links ins Logo
- Zurück nach oben: "Agentur" fährt wieder heraus

**Hamburger → X:**
- Reine CSS-Animation (3 `<span>`-Lines)
- Öffnen: Obere/untere Linie rotieren zu ×, mittlere Linie blendet aus
- Schließen: Animation läuft umgekehrt
- Button sitzt im Header (z-50), liegt ÜBER dem Overlay (z-40) → schließt das Menü

**Overlay-Menü:**
- Hintergrund: `#E8F1F2` (helles Blaugrau)
- Links (Desktop): Kontaktdaten + Adresse + Language Switch
- Rechts: Riesige Nav-Links mit gestaffelter Einflug-Animation

**Positionierung** (`AppHeader.vue`):
```html
<div class="flex w-full items-center justify-between px-[25px] pt-[20px] pb-4">
```
→ 25px vom Rand, 20px von oben — direkt in dieser Zeile anpassen.

---

## Sprachen / Texte bearbeiten

Alle UI-Texte in:
- `i18n/locales/de.json` — Deutsch
- `i18n/locales/en.json` — Englisch

Sprache wird per Cookie gespeichert, kein URL-Prefix.

---

## Blog-Artikel hinzufügen

Neue `.md`-Datei in `content/insights/` erstellen:

```md
---
title: "Titel Deutsch"
titleEn: "Title English"
description: "Kurzbeschreibung DE"
descriptionEn: "Short description EN"
category: "webdev"     # webdev | marketing | ai | strategy
author: "Name"
date: "2026-01-15"
readingTime: 5
---

Artikel-Inhalt hier in Markdown...
```

---

## Neue Service-Seite hinzufügen

1. Datei anlegen: `pages/services/neuer-service.vue`
2. `ServiceDetail`-Komponente verwenden:

```vue
<template>
  <ServiceDetail v-bind="data" />
</template>

<script setup lang="ts">
const data = {
  title: 'Service Titel',
  subtitle: 'Kurzbeschreibung',
  // ... siehe ServiceDetail.vue Props
}
</script>
```

3. Link in `i18n/locales/de.json` + `en.json` ergänzen
4. Karte auf `/services/index.vue` hinzufügen

---

## Umgebungsvariablen

Kopiere `.env.example` → `.env`:

```env
NUXT_PUBLIC_SITE_URL=https://dh-agentur.at
```

---

## Bekannte Hinweise

- **Dev-Server neu starten** nach Änderungen an Layout-Komponenten (SSR-Cache)
- **clipPath-IDs** im `LogoDH.vue` werden per `Math.random()` eindeutig generiert — kein Konflikt wenn Logo mehrfach auf einer Seite erscheint
- **`/legal`** und **`/privacy`** Seiten fehlen noch (Router-Warnings im Terminal) — müssen noch angelegt werden
- Alle ersten Sektionen auf Seiten haben `pt-40 md:pt-48` um den transparenten Header freizuhalten (`default.vue` hat kein `pt-16` mehr)
