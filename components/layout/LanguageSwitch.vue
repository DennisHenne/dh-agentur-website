<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all"
      :class="dark
        ? 'border-stone-900/20 text-stone-600 hover:border-stone-900/40 hover:text-stone-900'
        : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'"
      @click.stop="toggle"
    >
      <span>{{ currentLocale === 'de' ? 'DE' : 'EN' }}</span>
      <svg class="h-3 w-3 transition-transform" :class="{ 'rotate-180': open }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute left-0 top-full mt-2 w-28 overflow-hidden rounded-xl border shadow-xl"
        :class="dark
          ? 'border-stone-900/10 bg-white'
          : 'border-white/10 bg-dark-100'"
        @click.stop
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors"
          :class="[
            loc.code === currentLocale
              ? dark ? 'text-brand-600' : 'text-brand-400'
              : dark ? 'text-stone-600 hover:bg-stone-100' : 'text-white/70 hover:bg-white/10'
          ]"
          @click="switchLocale(loc.code)"
        >
          <span class="font-semibold uppercase">{{ loc.code }}</span>
          <span class="text-xs" :class="dark ? 'text-stone-400' : 'text-white/40'">{{ loc.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const open = ref(false)

withDefaults(defineProps<{ dark?: boolean }>(), { dark: false })

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value as { code: string; name: string }[])

function toggle() {
  open.value = !open.value
}

function switchLocale(code: string) {
  setLocale(code as 'de' | 'en')
  open.value = false
}

onMounted(() => {
  document.addEventListener('click', () => { open.value = false })
})

onUnmounted(() => {
  document.removeEventListener('click', () => { open.value = false })
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
