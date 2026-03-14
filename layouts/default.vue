<script setup lang="ts">
const route = useRoute()
const isIndex = computed(() => route.path === '/' || route.path === '')
</script>

<template>
  <!-- ── Global full-page background (fixed → no section boundaries) ──────── -->
  <!-- z-index 0: below canvas (1) and below content (2), but above body bg  -->
  <div
    class="pointer-events-none"
    style="position:fixed; inset:0; z-index:0;"
  >
    <div
      class="absolute rounded-full w-[min(520px,80vw)] h-[min(520px,80vw)] md:w-[520px] md:h-[520px]"
      style="top:0; left:22%; filter:blur(140px); background:rgba(49,73,60,0.22);"
    />
    <div
      class="absolute rounded-full w-[min(420px,65vw)] h-[min(420px,65vw)] md:w-[420px] md:h-[420px]"
      style="top:30%; right:18%; filter:blur(140px); background:rgba(122,158,126,0.09);"
    />
    <div class="noise-bg absolute inset-0" />
  </div>

  <!-- ── Cursor trail canvas: z-index 1 ─────────────────────────────────── -->
  <ClientOnly>
    <CursorTrail />
  </ClientOnly>

  <!-- ── Page content: z-index 2 ───────────────────────────────────────── -->
  <div class="relative z-[2] min-h-screen flex flex-col">
    <LayoutAppHeader />
    <main class="flex-1" :class="{ 'pb-16 lg:pb-24': !isIndex }">
      <slot />
    </main>
    <LayoutAppFooter />
    <AiChatWidget />
  </div>
</template>
