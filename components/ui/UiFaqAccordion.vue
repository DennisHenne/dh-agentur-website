<template>
  <div class="divide-y divide-white/10">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="py-5"
    >
      <button
        class="flex w-full items-center justify-between gap-4 text-left"
        @click="toggle(i)"
      >
        <span class="font-semibold text-white">{{ item.question }}</span>
        <span class="flex-shrink-0 rounded-full border border-white/20 p-1.5 text-white/60 transition-transform"
          :class="open === i ? 'rotate-45 border-brand-500 text-brand-400' : ''">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <Transition name="accordion">
        <div v-if="open === i" class="mt-3 text-sm leading-relaxed text-white/60 pr-10">
          {{ item.answer }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: { question: string; answer: string }[]
}>()

const open = ref<number | null>(null)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
