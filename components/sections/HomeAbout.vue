<template>
  <section class="section section-about">
    <div class="container flex flex-col items-center">
      <UiBadge class="mb-6">{{ t('home.aboutLabel') }}</UiBadge>
      <img
        src="/Profilbild (2).webp"
        alt="Dennis Henne"
        class="h-48 w-48 rounded-2xl object-cover shadow-xl sm:h-56 sm:w-56 md:h-64 md:w-64"
        style="border: 2px solid rgba(122,158,126,0.25);"
        loading="lazy"
      />
      <p class="mt-6 font-display text-2xl font-bold text-dark sm:text-3xl">
        Dennis Henne
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.section-about {
  padding-top: 0;
  margin-top: -1rem;
}
</style>
