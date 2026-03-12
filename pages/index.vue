<template>
  <div>
    <SectionsHomeHero />
    <SectionsHomeWork />
    <client-only>
      <SectionsHomeServicesThreeJs />
    </client-only>
    <SectionsHomeReferences />
    <SectionsHomeAbout />
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
