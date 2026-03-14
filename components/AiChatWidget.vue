<template>
  <div>
    <!-- Chat Bubble Button -->
    <button
      class="fixed bottom-6 right-6 z-50 flex h-14 w-14 min-w-[56px] min-h-[56px] items-center justify-center rounded-full bg-brand-600 shadow-lg shadow-brand-600/30 transition-all duration-300 hover:bg-brand-500 hover:scale-110 active:scale-95"
      :aria-label="open ? t('chat.close') : t('chat.title')"
      @click="open = !open"
    >
      <Transition name="icon" mode="out-in">
        <!-- Chat icon -->
        <svg v-if="!open" key="chat" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <!-- Close icon -->
        <svg v-else key="close" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Transition>
      <!-- Notification dot -->
      <span v-if="!open && hasNewMessage" class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
    </button>

    <!-- Chat Window -->
    <Transition name="chat">
      <div
        v-if="open"
        class="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 flex h-[min(480px,85vh)] w-[min(360px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/20 bg-dark-100 shadow-2xl shadow-black/50"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-white/10 bg-dark-50 px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
              <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ t('chat.title') }}</div>
              <div class="flex items-center gap-1.5 text-xs text-white/40">
                <span class="h-1.5 w-1.5 rounded-full bg-green-400" />
                Online
              </div>
            </div>
          </div>
          <button class="text-white/40 hover:text-white" @click="open = false">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesEl" class="flex-1 overflow-y-auto p-4 space-y-4">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'rounded-br-sm bg-brand-600 text-white'
                : 'rounded-bl-sm bg-white/10 text-white/80'"
            >
              {{ msg.content }}
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="typing" class="flex justify-start">
            <div class="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
              <div class="flex gap-1">
                <span class="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style="animation-delay: 0ms" />
                <span class="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style="animation-delay: 150ms" />
                <span class="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style="animation-delay: 300ms" />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick replies -->
        <div v-if="messages.length === 1" class="px-4 pb-3 flex flex-wrap gap-2">
          <button
            v-for="q in quickReplies"
            :key="q"
            class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/60 hover:border-brand-500 hover:text-brand-400 transition-all"
            @click="sendMessage(q)"
          >
            {{ q }}
          </button>
        </div>

        <!-- Input -->
        <div class="border-t border-white/10 p-4">
          <form class="flex items-center gap-2" @submit.prevent="handleSend">
            <input
              v-model="inputText"
              type="text"
              class="flex-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-500"
              :placeholder="t('chat.placeholder')"
            />
            <button
              type="submit"
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-500 disabled:opacity-40"
              :disabled="!inputText.trim() || typing"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const open = ref(false)
const inputText = ref('')
const typing = ref(false)
const hasNewMessage = ref(true)
const messagesEl = ref<HTMLElement>()

const messages = ref([
  { role: 'assistant', content: t('chat.greeting') },
])

const quickReplies = computed(() => locale.value === 'de' ? [
  'Was kostet eine Website?',
  'Welche Services bietet ihr an?',
  'Wie läuft ein Projekt ab?',
] : [
  'What does a website cost?',
  'What services do you offer?',
  'How does a project work?',
])

watch(open, (val) => {
  if (val) hasNewMessage.value = false
})

async function handleSend() {
  const text = inputText.value.trim()
  if (!text) return
  await sendMessage(text)
}

async function sendMessage(text: string) {
  inputText.value = ''
  messages.value.push({ role: 'user', content: text })
  await nextTick()
  scrollToBottom()

  typing.value = true
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800))
  typing.value = false

  const reply = getAutoReply(text)
  messages.value.push({ role: 'assistant', content: reply })
  await nextTick()
  scrollToBottom()
}

function getAutoReply(text: string): string {
  const lower = text.toLowerCase()

  if (locale.value === 'de') {
    if (lower.includes('preis') || lower.includes('kost') || lower.includes('euro') || lower.includes('budget')) {
      return 'Eine einfache Website startet ab ca. 3.000–5.000 €. Für ein genaues Angebot empfehle ich ein kostenloses Erstgespräch — einfach über das Kontaktformular anmelden!'
    }
    if (lower.includes('service') || lower.includes('leistung') || lower.includes('angebot')) {
      return 'Unsere Hauptleistungen: Webentwicklung, Digital Marketing, KI-Projekte, Prozessoptimierung und Custom Web-Apps. Was interessiert Sie am meisten?'
    }
    if (lower.includes('projekt') || lower.includes('ablauf') || lower.includes('wie')) {
      return 'Ein Projekt startet immer mit einem kostenlosen Erstgespräch. Danach: Angebot → Kickoff → agile Entwicklung → Launch. Klingt gut?'
    }
    if (lower.includes('kontakt') || lower.includes('gespräch') || lower.includes('termin')) {
      return 'Kein Problem! Am schnellsten erreichen Sie uns über das Kontaktformular auf /contact oder direkt per E-Mail: hallo@dh-agentur.at'
    }
    return 'Danke für Ihre Frage! Für eine detaillierte Antwort empfehle ich unser kostenloses Erstgespräch. Soll ich Ihnen den Link zum Kontaktformular geben?'
  } else {
    if (lower.includes('price') || lower.includes('cost') || lower.includes('euro') || lower.includes('budget')) {
      return 'A simple website starts at around €3,000–5,000. For an exact quote, I recommend a free discovery call — just sign up via the contact form!'
    }
    if (lower.includes('service') || lower.includes('offer')) {
      return 'Our main services: web development, digital marketing, AI projects, process optimization and custom web apps. What interests you most?'
    }
    if (lower.includes('project') || lower.includes('process') || lower.includes('how')) {
      return 'A project always starts with a free discovery call. Then: proposal → kickoff → agile development → launch. Sounds good?'
    }
    if (lower.includes('contact') || lower.includes('call') || lower.includes('meeting')) {
      return 'No problem! The fastest way to reach us is via the contact form at /contact or directly by email: hallo@dh-agentur.at'
    }
    return 'Thanks for your question! For a detailed answer, I recommend our free discovery call. Can I give you the link to the contact form?'
  }
}

function scrollToBottom() {
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}
</script>

<style scoped>
.chat-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.chat-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.7) rotate(45deg);
}
</style>
