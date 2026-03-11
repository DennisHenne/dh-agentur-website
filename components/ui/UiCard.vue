<template>
  <div
    class="group rounded-2xl border border-white/10 bg-dark-100 p-6 transition-all duration-300"
    :class="hoverable ? 'hover:border-white/20 hover:bg-dark-200 cursor-pointer' : ''"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hoverable?: boolean
}>()
</script>
