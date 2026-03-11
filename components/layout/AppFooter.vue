<template>
  <footer class="pt-16 pb-8" style="border-top:1px solid rgba(122,158,126,0.18); background:#051d26;">
    <div class="container">
      <!-- Top Row -->
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2 mb-4">
            <IconsLogoDH :size="80" class="text-light" />
            <span class="font-display text-xl font-bold text-white">Agentur</span>
          </NuxtLink>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs">{{ t('footer.tagline') }}</p>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{{ t('nav.services') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="service in services" :key="service.to">
              <NuxtLink :to="service.to" class="text-sm text-white/60 hover:text-white transition-colors">
                {{ service.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{{ t('nav.about') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-white/60 hover:text-white transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style="border-top:1px solid rgba(122,158,126,0.15)">
        <p class="text-xs text-white/30">
          © {{ year }} DH Agentur. {{ t('footer.allRights') }}
        </p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/faq" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.faq') }}</NuxtLink>
          <NuxtLink to="/legal" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.legal') }}</NuxtLink>
          <NuxtLink to="/privacy" class="text-xs text-white/40 hover:text-white transition-colors">{{ t('footer.privacy') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()

const services = computed(() => [
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/digital-marketing', label: 'Digital Marketing' },
  { to: '/services/ai-projects', label: 'AI Projects' },
  { to: '/services/process-optimization', label: 'Process Optimization' },
  { to: '/services/custom-web-apps', label: 'Custom Web Apps' },
])

const footerLinks = computed(() => [
  { to: '/about', label: t('nav.about') },
  { to: '/work', label: t('nav.work') },
  { to: '/insights', label: t('nav.insights') },
  { to: '/careers', label: t('nav.careers') },
  { to: '/contact', label: t('nav.contact') },
])
</script>
