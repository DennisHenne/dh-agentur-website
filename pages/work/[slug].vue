<template>
  <SectionsWorkDetail :data="data" />
</template>

<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const refData = computed(() => {
  const n = slug.replace('reference-', '')
  const num = parseInt(n, 10)
  const title = locale.value === 'de' ? `Referenzprojekt ${num}` : `Reference Project ${num}`
  const desc = locale.value === 'de'
    ? `Placeholder Beschreibung für Projekt ${num}.`
    : `Placeholder description for project ${num}.`
  return { title, desc }
})

useSeoMeta({
  title: computed(() => `${refData.value.title} — DH Agentur`),
  description: computed(() => refData.value.desc),
})

const data = computed(() => ({
  title: refData.value.title,
  type: 'Referenz',
  year: '2024',
  desc: refData.value.desc,
  tags: ['Projekt', 'Referenz'],
  color: '#31493C',
  challenge: locale.value === 'de'
    ? 'Placeholder Ausgangslage für dieses Referenzprojekt.'
    : 'Placeholder challenge for this reference project.',
  solution: locale.value === 'de'
    ? 'Placeholder Lösung für dieses Referenzprojekt.'
    : 'Placeholder solution for this reference project.',
  result: locale.value === 'de'
    ? 'Placeholder Ergebnis für dieses Referenzprojekt.'
    : 'Placeholder result for this reference project.',
  features: locale.value === 'de' ? [
    { title: 'Feature 1', desc: 'Placeholder Beschreibung.' },
    { title: 'Feature 2', desc: 'Placeholder Beschreibung.' },
    { title: 'Feature 3', desc: 'Placeholder Beschreibung.' },
  ] : [
    { title: 'Feature 1', desc: 'Placeholder description.' },
    { title: 'Feature 2', desc: 'Placeholder description.' },
    { title: 'Feature 3', desc: 'Placeholder description.' },
  ],
  stack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS'],
}))
</script>
