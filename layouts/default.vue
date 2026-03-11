<template>
  <!-- ── Global full-page background (fixed → no section boundaries) ──────── -->
  <!-- z-index 0: below canvas (1) and below content (2), but above body bg  -->
  <div
    class="pointer-events-none"
    style="position:fixed; inset:0; z-index:0;"
  >
    <div
      class="absolute rounded-full"
      style="top:0; left:22%; width:520px; height:520px; filter:blur(140px); background:rgba(49,73,60,0.22);"
    />
    <div
      class="absolute rounded-full"
      style="top:30%; right:18%; width:420px; height:420px; filter:blur(140px); background:rgba(122,158,126,0.09);"
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
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
    <AiChatWidget />
  </div>
</template>
