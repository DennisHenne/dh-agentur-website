<template>
  <section class="section">
    <div class="container">
        <div class="relative overflow-hidden rounded-3xl border p-12 text-center md:p-20" style="border-color:rgba(122,158,126,0.25); background: linear-gradient(135deg, #31493C 0%, #0c2a35 60%, #001A23 100%)">
        <!-- Background glow -->
        <div class="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style="background:rgba(179,239,178,0.12)" />

        <div class="relative">
          <UiBadge class="mb-6">{{ locale === 'de' ? 'Nächster Schritt' : 'Next Step' }}</UiBadge>
          <h2 class="section-title mb-4">{{ t('home.ctaTitle') }}</h2>
          <p class="section-subtitle mb-10 max-w-xl mx-auto">{{ t('home.ctaSubtitle') }}</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/contact" class="btn-primary text-base px-8 py-4">
              {{ t('home.ctaButton') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/work" class="btn-secondary text-base px-8 py-4">
              {{ t('home.workAll') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
</script>
