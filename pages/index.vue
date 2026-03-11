<template>
  <div>
    <SectionsHomeHero />
    <SectionsHomeWork />
    <SectionsHomeServices />
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
