<template>
  <header class="fixed left-0 right-0 top-0 z-50">
    <div class="flex w-full items-center justify-between px-4 pt-4 pb-3 sm:px-6 sm:pt-5 md:pl-[45px] md:pr-[55px] md:pt-[30px] md:pb-4">

      <!-- Logo: always visible, color flips based on overlay state -->
      <NuxtLink
        to="/"
        class="flex items-center transition-opacity duration-200"
        @click="closeMenu"
      >
        <IconsLogoDH
          :size="logoSize"
          :class="menuOpen ? 'text-dark' : 'text-light'"
          class="transition-colors duration-300 flex-shrink-0"
        />

        <!-- "Agentur" slides into logo on scroll. Hidden when overlay is open. -->
        <div
          class="overflow-hidden transition-all duration-500 ease-in-out"
          :style="(scrolled || menuOpen)
            ? 'max-width: 0; opacity: 0; margin-left: 0'
            : 'max-width: 220px; opacity: 1; margin-left: 7px'"
        >
          <span
            class="block whitespace-nowrap font-display text-3xl font-bold text-light transition-transform duration-500 ease-in-out"
            :style="(scrolled || menuOpen) ? 'transform: translateX(-10px)' : 'transform: translateX(0)'"
          >
            Agentur
          </span>
        </div>
      </NuxtLink>

      <!-- Right: language switch + Kontaktieren + hamburger/close -->
      <div class="flex items-center gap-4">
        <div v-if="!menuOpen" class="hidden items-center gap-4 lg:flex">
          <LayoutLanguageSwitch :dark="false" />
        </div>
        <NuxtLink
          v-if="!menuOpen"
          to="/contact"
          class="btn-primary hidden sm:inline-flex h-12 min-h-[48px] sm:h-14 sm:min-h-[56px] md:h-16 md:min-h-[64px] items-center justify-center"
        >
          {{ t('nav.contactButton') }}
        </NuxtLink>

        <!-- Hamburger that morphs into × (min 44px touch target) -->
        <button
          class="flex h-12 w-12 min-w-[48px] min-h-[48px] sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full border transition-all duration-300"
          :class="menuOpen
            ? 'border-forest/30 text-forest'
            : 'border-white/25 text-white hover:border-white/50'"
          :aria-label="menuOpen ? t('nav.close') : t('nav.menu')"
          @click="toggleMenu"
        >
          <span class="burger" :class="{ 'is-open': menuOpen }">
            <span class="burger-line burger-line--top" />
            <span class="burger-line burger-line--mid" />
            <span class="burger-line burger-line--bot" />
          </span>
        </button>
      </div>
    </div>
  </header>

  <!-- ─── Full-screen Overlay ──────────────────────────────────────────────── -->
  <Transition name="overlay">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 overflow-hidden"
      style="background-color: #E8F1F2;"
    >
      <!-- Content — pt accounts for header height; lg:pt-24 ensures menu links stay below sticky header on desktop -->
      <div class="flex h-full flex-col px-4 pb-10 pt-28 sm:px-6 sm:pt-32 md:px-[42px] md:pt-36 lg:flex-row lg:items-center lg:pt-28 lg:pb-20">

        <!-- Left column: contact info (desktop only) -->
        <div class="hidden lg:flex lg:w-72 lg:flex-col lg:justify-end lg:pb-4 xl:w-80">
          <p class="mb-5 text-xs font-semibold uppercase tracking-widest" style="color: #31493C;">
            {{ locale === 'de' ? 'Kontakt' : 'Get in touch' }}
          </p>
          <a href="mailto:dennish@dhagentur.de" class="mb-1.5 text-base font-medium" style="color: #001A23;">
            dennish@dhagentur.de
          </a>
          <a href="tel:+4915901078280" class="mb-6 text-base font-medium" style="color: #001A23;">
            0159 01078280
          </a>
          <address class="not-italic text-sm leading-relaxed mb-6" style="color: #7A9E7E;">
            An der Stadtgärtnerei 47<br />46485 Wesel
          </address>
          <div class="flex flex-wrap gap-3">
            <a href="tel:+4915901078280" class="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-forest/10" style="border-color: rgba(49,73,60,0.3); color: #31493C;">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {{ t('nav.call') }}
            </a>
            <a href="https://wa.me/message/H6VB4BUBUKSMK1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-green-500/10" style="border-color: rgba(34,197,94,0.4); color: #22c55e;">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {{ t('nav.whatsapp') }}
            </a>
          </div>
          <div class="mt-10">
            <LayoutLanguageSwitch :dark="true" />
          </div>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-1 flex-col justify-center lg:pl-16 xl:pl-24">
          <NuxtLink
            v-for="(link, i) in overlayNavLinks"
            :key="link.to"
            :to="link.to"
            class="menu-link py-0.5 font-display font-black leading-none transition-colors hover:text-forest"
            :style="{ color: '#001A23', fontSize: 'clamp(2.5rem, 7vw, 7rem)', '--delay': `${i * 55}ms` }"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>

          <!-- Stats am unteren Menürand -->
          <div class="menu-link mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" style="--delay: 400ms">
            <div
              v-for="stat in menuStats"
              :key="stat.label"
              class="flex flex-col"
            >
              <span class="font-display text-2xl font-black lg:text-3xl" style="color:#31493C;">{{ stat.value }}</span>
              <span class="text-sm font-medium" style="color:#7A9E7E;">{{ stat.label }}</span>
            </div>
          </div>
        </nav>

        <!-- Mobile bottom bar -->
        <div class="mt-8 flex flex-col gap-4 border-t pt-5 lg:hidden" style="border-color: rgba(0,26,35,0.12);">
          <div class="flex items-center justify-between">
            <div>
              <p class="mb-0.5 text-xs font-semibold uppercase tracking-widest" style="color: #31493C;">
                {{ locale === 'de' ? 'Kontakt' : 'Contact' }}
              </p>
              <a href="mailto:dennish@dhagentur.de" class="text-sm font-medium" style="color: #001A23;">
                dennish@dhagentur.de
              </a>
            </div>
            <LayoutLanguageSwitch :dark="true" />
          </div>
          <div class="flex flex-wrap gap-2">
            <a href="tel:+4915901078280" class="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors" style="border-color: rgba(49,73,60,0.3); color: #31493C;">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {{ t('nav.call') }}
            </a>
            <a href="https://wa.me/message/H6VB4BUBUKSMK1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors" style="border-color: rgba(34,197,94,0.4); color: #22c55e;">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {{ t('nav.whatsapp') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const scrolled = ref(false)
const isMd = ref(true)
onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  isMd.value = mq.matches
  mq.addEventListener('change', (e) => { isMd.value = e.matches })
})
const logoSize = computed(() => isMd.value ? 80 : 56)
const menuOpen = ref(false)

const overlayNavLinks = computed(() => [
  { to: '/work',     label: t('nav.work')     },
  { to: '/services', label: t('nav.services') },
  { to: '/about',    label: t('nav.about')    },
  { to: '/insights', label: t('nav.insights') },
  { to: '/careers',  label: t('nav.careers')  },
  { to: '/contact',  label: t('nav.contact')  },
])

const menuStats = computed(() => [
  { value: '50+',  label: t('nav.stats.projects') },
  { value: '98%',  label: t('nav.stats.satisfaction') },
  { value: '5+',   label: t('nav.stats.years') },
  { value: '3×',   label: t('nav.stats.roi') },
])

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

watch(() => route.path, closeMenu)

onMounted(() => {
  const handleScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<style scoped>
/* Overlay öffnen: rollt von oben nach unten aus */
.overlay-enter-active {
  transform-origin: top center;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
.overlay-enter-from {
  transform: scaleY(0);
  opacity: 0;
}

/* Overlay schließen: verschwindet von oben nach unten (bottom bleibt, top geht zuerst weg) */
.overlay-leave-active {
  transform-origin: bottom center;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
.overlay-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

/* ── Morphing hamburger → × ───────────────────────────────────────────────── */
.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
}
.burger-line {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
              opacity   0.25s ease;
  transform-origin: center;
}

/* Open state: lines rotate into × */
.burger.is-open .burger-line--top {
  transform: translateY(8px) rotate(45deg);
}
.burger.is-open .burger-line--mid {
  opacity: 0;
  transform: scaleX(0);
}
.burger.is-open .burger-line--bot {
  transform: translateY(-8px) rotate(-45deg);
}

/* Staggered nav link entrance */
.menu-link {
  opacity: 0;
  transform: translateY(14px);
  animation: linkIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--delay, 0ms);
}
@keyframes linkIn { to { opacity: 1; transform: translateY(0); } }
</style>
