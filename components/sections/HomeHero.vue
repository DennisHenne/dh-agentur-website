<template>
  <section class="relative flex min-h-[85vh] sm:min-h-[90vh] md:min-h-[92vh] flex-col items-center justify-center">


    <!-- Layer 2: video card — centered, behind text, moved up -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      style="z-index:1; margin-top:-120px;"
    >
      <div
        ref="videoWrapper"
        class="video-tilt"
        style="pointer-events:auto; width:min(520px, 80vw);"
        :style="tiltStyle"
      >
        <video autoplay muted loop playsinline class="video-card">
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div class="vignette" />
      </div>
    </div>

    <!-- Layer 3: text + console — in front of video -->
    <div class="container relative pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-24 md:pt-40" style="z-index:10;">
      <div class="mx-auto max-w-4xl text-center">

        <div class="animate-fade-up">
          <UiBadge class="mb-6">{{ t('home.heroLabel') }}</UiBadge>
        </div>

        <h1
          class="animate-fade-up mb-8 font-display font-black leading-[1.1] tracking-tight text-white text-5xl sm:text-6xl md:text-7xl"
          style="animation-delay:100ms"
        >
          {{ heroTitleFirst }}
          <span class="gradient-text">{{ heroTitleHighlight }}</span>
        </h1>

        <!-- Fake Terminal Console -->
        <div class="animate-fade-up mx-auto max-w-2xl mt-20" style="animation-delay:200ms">
          <div class="console-window" @click="focusInput">

            <!-- Title bar -->
            <div class="console-titlebar">
              <span class="dot bg-[#ff5f57]" />
              <span class="dot bg-[#febc2e]" />
              <span class="dot bg-[#28c840]" />
              <span class="console-title">dh-agentur — console</span>
            </div>

            <!-- Output history (fixed height, scrollable) -->
            <div ref="outputEl" class="console-output">
              <TransitionGroup name="line">
                <div
                  v-for="line in history"
                  :key="line.id"
                  class="console-line"
                  v-html="line.html"
                />
              </TransitionGroup>
            </div>

            <!-- Input row: hidden real input + displayed text + cursor -->
            <div class="console-input-row">
              <span class="console-prompt">~/dh-agentur %&nbsp;</span>
              <span class="console-slash">/</span>
              <span class="console-typed">{{ inputValue }}</span>
              <span v-if="isFocused" class="console-cursor">▌</span>
              <!-- invisible input captures all keyboard input -->
              <input
                ref="inputEl"
                v-model="inputValue"
                class="console-input-hidden"
                spellcheck="false"
                autocomplete="off"
                @keydown.enter="handleCommand"
                @keydown.tab.prevent
                @focus="isFocused = true"
                @blur="isFocused = false"
              />
            </div>

          </div>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const heroTitleFirst = computed(() =>
  locale.value === 'de' ? 'Wir machen Ihr Unternehmen' : 'We make your business'
)
const heroTitleHighlight = computed(() =>
  locale.value === 'de' ? ' digital stark.' : ' digitally strong.'
)


// ── Fake console ─────────────────────────────────────────────────────────────
interface HistoryLine { id: number; html: string }

const inputEl   = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const outputEl  = ref<HTMLElement | null>(null)
const inputValue = ref('')
let   nextId = 0

const history = ref<HistoryLine[]>([
  { id: nextId++, html: '<span style="color:#B3EFB2">DH Agentur Console</span> <span style="color:rgba(255,255,255,0.35)">v1.0.0</span>' },
  { id: nextId++, html: '<span style="color:rgba(255,255,255,0.4)">Tippe /help um Hilfe zu erhalten.</span>' },
])

function focusInput() {
  inputEl.value?.focus()
}

/** Add a line. autoRemoveMs = 0 → stays forever */
function addLine(html: string, autoRemoveMs = 4500) {
  const id = nextId++
  history.value.push({ id, html })
  if (autoRemoveMs > 0) {
    setTimeout(() => {
      const idx = history.value.findIndex(l => l.id === id)
      if (idx !== -1) history.value.splice(idx, 1)
    }, autoRemoveMs)
  }
  nextTick(() => {
    if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
  })
}

function handleCommand() {
  const raw = inputValue.value.trim()
  const cmd = ('/' + raw).toLowerCase()

  // echo the typed command
  addLine(
    `<span style="color:rgba(255,255,255,0.35)">~/dh-agentur %</span> <span style="color:#B3EFB2">/</span><span style="color:#fff">${escapeHtml(raw)}</span>`,
  )

  if (cmd === '/help') {
    addLine('<span style="color:#B3EFB2">→ Verbinde mit DH Agentur...</span>')
    addLine('<span style="color:rgba(255,255,255,0.6)">Starte Anruf: <a href="tel:+4915901078280" style="text-decoration:underline;color:#B3EFB2">+49 159 0107 8280</a></span>')
    setTimeout(() => { window.location.href = 'tel:+4915901078280' }, 700)
  } else if (raw !== '') {
    addLine(`<span style="color:#f87171">bash: /${escapeHtml(raw)}: command not found</span>`)
    addLine(`<span style="color:rgba(255,255,255,0.35)">Tippe /help für verfügbare Befehle.</span>`)
  }

  inputValue.value = ''
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── 3D tilt via global mouse tracking ────────────────────────────────────────
const videoWrapper = ref<HTMLElement | null>(null)
const tiltStyle = ref<Record<string, string>>({
  transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
})

function onMouseMove(e: MouseEvent) {
  if (!videoWrapper.value) return
  const rect = videoWrapper.value.getBoundingClientRect()
  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 2
  const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth  / 2)))
  const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
  tiltStyle.value = {
    transform: `perspective(800px) rotateX(${-dy * 10}deg) rotateY(${dx * 14}deg) scale(1.025)`,
  }
}

function onMouseLeave() {
  tiltStyle.value = { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)' }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave, { passive: true })
  nextTick(() => focusInput())
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
/* ── 3D video tilt ──────────────────────────────────────── */
.video-tilt {
  transform-style: preserve-3d;
  transition: transform 0.22s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  position: relative;
}

.video-card {
  display: block;
  width: 100%;
  border-radius: 28px;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.65),
    0  0    0  1px rgba(122, 158, 126, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.vignette {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  background: radial-gradient(
    ellipse at center,
    transparent 15%,
    rgba(0, 26, 35, 0.55) 70%,
    rgba(0, 26, 35, 0.82) 100%
  );
  pointer-events: none;
}

/* ── Fake terminal console ──────────────────────────────── */
.console-window {
  background: rgba(5, 15, 20, 0.92);
  border: 1px solid rgba(122, 158, 126, 0.22);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  text-align: left;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  cursor: text;
  /* fixed total height */
  height: 200px;
  display: flex;
  flex-direction: column;
}

.console-titlebar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(122, 158, 126, 0.12);
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.console-title {
  flex: 1;
  text-align: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  font-family: ui-monospace, 'Cascadia Code', monospace;
  margin-right: 30px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (min-width: 380px) {
  .console-title { font-size: 11px; }
}

/* scrollable output fills remaining space */
.console-output {
  flex: 1;
  overflow-y: auto;
  padding: 10px 16px 4px;
  font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.7;
  scrollbar-width: none;
}
.console-output::-webkit-scrollbar { display: none; }

.console-line {
  display: block;
  word-break: break-all;
}

/* fade-out transition for auto-disappearing lines */
.line-leave-active {
  transition: opacity 0.6s ease, max-height 0.4s ease;
  max-height: 2em;
  overflow: hidden;
}
.line-leave-to {
  opacity: 0;
  max-height: 0;
}
.line-enter-active {
  transition: opacity 0.3s ease;
}
.line-enter-from { opacity: 0; }

.console-input-row {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 4px 16px 10px;
  font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  font-size: 13px;
}

.console-prompt {
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
}

.console-slash {
  color: #B3EFB2;
  font-weight: 700;
}

/* visible typed text */
.console-typed {
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  white-space: pre;
}

/* hidden real input — captures keyboard, invisible */
.console-input-hidden {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
  caret-color: transparent;
}

.console-cursor {
  color: #B3EFB2;
  animation: blink 1.1s step-end infinite;
  font-size: 15px;
  line-height: 1;
  pointer-events: none;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

</style>
