<template>
  <div>
    <SectionsHomeHero />
    <client-only>
      <SectionsHomeServicesThreeJs />
      <SectionsHomeReferencesThreeJs />
    </client-only>
    <SectionsHomeCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.home.title'),
  description: t('meta.home.description'),
})
</script>
