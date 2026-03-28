<template>
  <section class="section section-cta">
    <div class="container">
      <div class="relative overflow-hidden rounded-[50px] text-center min-h-[280px] sm:min-h-[360px] md:min-h-[420px]" style="background: #0a1f28; border: 1px solid rgba(122,158,126,0.12);">
        <!-- Video background -->
        <video
          autoplay
          muted
          loop
          playsinline
          class="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/rocket.webm" type="video/webm">
          <source src="/rocket.mp4" type="video/mp4">
        </video>
        <!-- Dark overlay for readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div class="relative flex flex-col items-center justify-center gap-6 p-12 md:p-20 min-h-[420px]">
          <h2 class="section-title text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{{ t('home.ctaTitle') }}</h2>
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

<style scoped>
/* Näher an Unser Team, mehr Abstand zum Footer */
.section-cta {
  padding-top: 3rem;
  padding-bottom: 10rem;
}
@media (min-width: 768px) {
  .section-cta {
    padding-top: 4rem;
    padding-bottom: 12rem;
  }
}
</style>
