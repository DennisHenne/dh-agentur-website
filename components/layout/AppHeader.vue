<template>
  <header class="fixed left-0 right-0 top-0 z-50">
    <div class="flex w-full items-center justify-between pl-[45px] pr-[55px] pt-[30px] pb-4">

      <!-- Logo: always visible, color flips based on overlay state -->
      <NuxtLink
        to="/"
        class="flex items-center transition-opacity duration-200"
        @click="closeMenu"
      >
        <IconsLogoDH
          :size="80"
          :class="menuOpen ? 'text-dark' : 'text-light'"
          class="transition-colors duration-300"
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

      <!-- Right: language switch + hamburger/close -->
      <div class="flex items-center gap-4">
        <div v-if="!menuOpen" class="hidden items-center gap-4 lg:flex">
          <LayoutLanguageSwitch :dark="false" />
        </div>

        <!-- Hamburger that morphs into × -->
        <button
          class="flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300"
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
      <!-- Content — pt accounts for header height -->
      <div class="flex h-full flex-col px-[26px] pb-10 pt-36 md:px-[42px] lg:flex-row lg:items-center lg:pt-0">

        <!-- Left column: contact info (desktop only) -->
        <div class="hidden lg:flex lg:w-72 lg:flex-col lg:justify-end lg:pb-4 xl:w-80">
          <p class="mb-5 text-xs font-semibold uppercase tracking-widest" style="color: #31493C;">
            {{ locale === 'de' ? 'Kontakt' : 'Get in touch' }}
          </p>
          <a href="mailto:hallo@dh-agentur.at" class="mb-1.5 text-base font-medium" style="color: #001A23;">
            hallo@dh-agentur.at
          </a>
          <a href="tel:+4312345678" class="mb-6 text-base font-medium" style="color: #001A23;">
            +43 1 234 5678
          </a>
          <address class="not-italic text-sm leading-relaxed" style="color: #7A9E7E;">
            Wipplingerstraße 1<br />1010 Wien
          </address>
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
        </nav>

        <!-- Mobile bottom bar -->
        <div class="mt-8 flex items-center justify-between border-t pt-5 lg:hidden" style="border-color: rgba(0,26,35,0.12);">
          <div>
            <p class="mb-0.5 text-xs font-semibold uppercase tracking-widest" style="color: #31493C;">
              {{ locale === 'de' ? 'Kontakt' : 'Contact' }}
            </p>
            <a href="mailto:hallo@dh-agentur.at" class="text-sm font-medium" style="color: #001A23;">
              hallo@dh-agentur.at
            </a>
          </div>
          <LayoutLanguageSwitch :dark="true" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const scrolled = ref(false)
const menuOpen = ref(false)

const overlayNavLinks = computed(() => [
  { to: '/work',     label: t('nav.work')     },
  { to: '/services', label: t('nav.services') },
  { to: '/about',    label: t('nav.about')    },
  { to: '/insights', label: t('nav.insights') },
  { to: '/careers',  label: t('nav.careers')  },
  { to: '/contact',  label: t('nav.contact')  },
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
