<template>
  <div class="overflow-y-auto" style="height:calc(100vh - 0px);">
    <div class="px-8 py-5 border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">AI Generator</h1>
      <p class="text-sm mt-1" style="color:rgba(255,255,255,0.4);">Automatically generate SEO-optimized blog posts using OpenRouter AI models.</p>
    </div>

    <div class="p-8 grid lg:grid-cols-2 gap-8">
      <!-- Settings panel -->
      <div class="space-y-6">
        <div class="rounded-xl p-5 space-y-4" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="text-sm font-semibold text-white">API & Model Settings</h2>

          <div>
            <label class="admin-label">OpenRouter API Key</label>
            <input v-model="settings.openrouter_key" type="password" class="admin-input w-full font-mono" placeholder="sk-or-…" />
            <p class="text-xs mt-1" style="color:rgba(255,255,255,0.3);">Get your key at <a href="https://openrouter.ai/keys" target="_blank" class="underline" style="color:#7A9E7E;">openrouter.ai</a></p>
          </div>

          <div>
            <label class="admin-label">Default Model</label>
            <select v-model="settings.default_model" class="admin-input w-full">
              <option v-for="m in aiData?.models" :key="m.model_id" :value="m.model_id">{{ m.name }} ({{ m.model_id }})</option>
            </select>
          </div>

          <div>
            <label class="admin-label">Content Language</label>
            <select v-model="settings.language" class="admin-input w-full">
              <option value="de">German (Deutsch)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label class="admin-label">Default Author</label>
            <input v-model="settings.default_author" type="text" class="admin-input w-full" placeholder="DH Agentur" />
          </div>

          <div>
            <label class="admin-label">Default Category</label>
            <select v-model="settings.default_category" class="admin-input w-full">
              <option value="webdev">Webentwicklung</option>
              <option value="marketing">Marketing</option>
              <option value="ai">KI & Automatisierung</option>
              <option value="strategy">Strategie</option>
            </select>
          </div>
        </div>

        <!-- Scheduling -->
        <div class="rounded-xl p-5 space-y-4" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="text-sm font-semibold text-white">Auto-Generation Schedule</h2>

          <div class="flex items-center justify-between">
            <span class="text-sm" style="color:rgba(255,255,255,0.6);">Enable auto-generation</span>
            <button @click="settings.auto_generate = !settings.auto_generate"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              :style="settings.auto_generate ? 'background:#7A9E7E;' : 'background:rgba(255,255,255,0.15);'">
              <span class="inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm"
                :style="settings.auto_generate ? 'transform:translateX(1.375rem);' : 'transform:translateX(0.25rem);'" />
            </button>
          </div>

          <div>
            <label class="admin-label">Interval (hours)</label>
            <input v-model.number="settings.interval_hours" type="number" min="1" max="720" class="admin-input w-full" />
          </div>

          <div v-if="aiData?.settings?.next_run" class="text-xs" style="color:rgba(255,255,255,0.4);">
            Next run: {{ new Date(aiData.settings.next_run).toLocaleString() }}
          </div>
        </div>

        <button @click="saveSettings" :disabled="savingSettings" class="admin-btn-primary w-full py-2.5 text-sm justify-center">
          {{ savingSettings ? 'Saving…' : 'Save Settings' }}
        </button>
        <p v-if="settingsSaved" class="text-sm text-center" style="color:#B3EFB2;">✓ Settings saved</p>
      </div>

      <!-- Right column: topics, feeds, models + manual generate -->
      <div class="space-y-6">
        <!-- Topics -->
        <div class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="text-sm font-semibold text-white mb-3">Topics</h2>
          <div class="flex flex-wrap gap-2 mb-3">
            <div v-for="t in topics" :key="t.id" class="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
              style="background:rgba(122,158,126,0.15); border:1px solid rgba(122,158,126,0.2); color:#B3EFB2;">
              {{ t.topic }}
              <button @click="deleteTopic(t.id)" class="opacity-60 hover:opacity-100 transition-opacity">✕</button>
            </div>
            <p v-if="!topics.length" class="text-xs" style="color:rgba(255,255,255,0.3);">No topics yet</p>
          </div>
          <div class="flex gap-2">
            <input v-model="newTopic" type="text" class="admin-input flex-1 text-sm" placeholder="Add topic…" @keydown.enter="addTopic" />
            <button @click="addTopic" class="text-sm px-3 py-1.5 rounded-lg" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">Add</button>
          </div>
        </div>

        <!-- RSS Feeds -->
        <div class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="text-sm font-semibold text-white mb-3">RSS Feeds</h2>
          <div class="space-y-2 mb-3">
            <div v-for="f in feeds" :key="f.id" class="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg" style="background:rgba(255,255,255,0.04);">
              <div>
                <span class="text-white font-medium">{{ f.name }}</span>
                <span class="ml-2" style="color:rgba(255,255,255,0.35);">{{ f.url }}</span>
              </div>
              <button @click="deleteFeed(f.id)" class="text-xs px-2 py-0.5 rounded" style="color:#f87171;">✕</button>
            </div>
            <p v-if="!feeds.length" class="text-xs py-2" style="color:rgba(255,255,255,0.3);">No RSS feeds configured</p>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <input v-model="newFeed.name" type="text" class="admin-input col-span-2 text-sm" placeholder="Name" />
            <input v-model="newFeed.url" type="url" class="admin-input col-span-2 text-sm" placeholder="https://…/feed.xml" />
            <button @click="addFeed" class="text-sm px-2 py-1.5 rounded-lg" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">Add</button>
          </div>
        </div>

        <!-- Models -->
        <div class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="text-sm font-semibold text-white mb-3">Available Models</h2>
          <div class="space-y-1.5 mb-3">
            <div v-for="m in aiData?.models" :key="m.id" class="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg" style="background:rgba(255,255,255,0.04);">
              <div>
                <span class="text-white font-medium">{{ m.name }}</span>
                <code class="ml-2 text-xs" style="color:rgba(255,255,255,0.35);">{{ m.model_id }}</code>
              </div>
              <button @click="deleteModel(m.id)" class="text-xs px-2 py-0.5 rounded" style="color:#f87171;">✕</button>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <input v-model="newModel.name" type="text" class="admin-input col-span-2 text-sm" placeholder="Display name" />
            <input v-model="newModel.model_id" type="text" class="admin-input col-span-2 text-sm font-mono" placeholder="provider/model-id" />
            <button @click="addModel" class="text-sm px-2 py-1.5 rounded-lg" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">Add</button>
          </div>
        </div>

        <!-- Manual Generate -->
        <div class="rounded-xl p-5 space-y-4" style="background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.2);">
          <h2 class="text-sm font-semibold text-white">Generate Now</h2>
          <div>
            <label class="admin-label">Manual Topic Override <span style="color:rgba(255,255,255,0.3);">(optional)</span></label>
            <input v-model="manualTopic" type="text" class="admin-input w-full" placeholder="Leave empty to use configured topics + RSS" />
          </div>
          <div>
            <label class="admin-label">Model Override</label>
            <select v-model="overrideModel" class="admin-input w-full">
              <option value="">Use default model</option>
              <option v-for="m in aiData?.models" :key="m.model_id" :value="m.model_id">{{ m.name }}</option>
            </select>
          </div>
          <button @click="generate" :disabled="generating"
            class="w-full py-3 rounded-xl font-semibold text-sm transition-all"
            style="background:linear-gradient(135deg,#6366f1,#8b5cf6); color:white;">
            {{ generating ? '✨ Generating post…' : '✨ Generate Post' }}
          </button>

          <!-- Generation result -->
          <div v-if="generateResult" class="rounded-xl p-4 mt-2" style="background:rgba(122,158,126,0.1); border:1px solid rgba(122,158,126,0.2);">
            <p class="text-sm font-semibold text-white mb-1">✓ Post generated as draft!</p>
            <p class="text-xs mb-2" style="color:#B3EFB2;">{{ generateResult.title }}</p>
            <NuxtLink :to="`/admin/insights/${generateResult.slug}`" class="text-xs px-3 py-1.5 rounded-lg inline-block" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">
              Open & edit →
            </NuxtLink>
          </div>
          <div v-if="generateError" class="rounded-xl p-4" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#f87171;">
            <p class="text-sm font-semibold">Generation failed</p>
            <p class="text-xs mt-1">{{ generateError }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: aiData, refresh } = await useFetch<any>('/api/admin/ai/settings')

const settings = reactive({
  openrouter_key: aiData.value?.settings?.openrouter_key || '',
  default_model: aiData.value?.settings?.default_model || 'openai/gpt-4o',
  auto_generate: !!aiData.value?.settings?.auto_generate,
  interval_hours: aiData.value?.settings?.interval_hours || 24,
  default_author: aiData.value?.settings?.default_author || '',
  default_category: aiData.value?.settings?.default_category || 'ai',
  language: aiData.value?.settings?.language || 'de',
})

const topics = ref<any[]>(aiData.value?.topics || [])
const feeds = ref<any[]>(aiData.value?.feeds || [])
const newTopic = ref('')
const newFeed = reactive({ name: '', url: '' })
const newModel = reactive({ name: '', model_id: '' })
const manualTopic = ref('')
const overrideModel = ref('')

const savingSettings = ref(false)
const settingsSaved = ref(false)
const generating = ref(false)
const generateResult = ref<any>(null)
const generateError = ref('')

async function saveSettings() {
  savingSettings.value = true
  await $fetch('/api/admin/ai/settings', { method: 'PUT', body: { ...settings } })
  savingSettings.value = false
  settingsSaved.value = true
  setTimeout(() => (settingsSaved.value = false), 2500)
}

async function addTopic() {
  if (!newTopic.value.trim()) return
  const res = await $fetch<any>('/api/admin/ai/topics', { method: 'POST', body: { topic: newTopic.value.trim() } })
  topics.value.push({ id: res.id, topic: newTopic.value.trim() })
  newTopic.value = ''
}

async function deleteTopic(id: number) {
  await $fetch(`/api/admin/ai/topics/${id}`, { method: 'DELETE' })
  topics.value = topics.value.filter(t => t.id !== id)
}

async function addFeed() {
  if (!newFeed.name || !newFeed.url) return
  const res = await $fetch<any>('/api/admin/ai/feeds', { method: 'POST', body: { ...newFeed } })
  feeds.value.push({ id: res.id, ...newFeed })
  newFeed.name = ''; newFeed.url = ''
}

async function deleteFeed(id: number) {
  await $fetch(`/api/admin/ai/feeds/${id}`, { method: 'DELETE' })
  feeds.value = feeds.value.filter(f => f.id !== id)
}

async function addModel() {
  if (!newModel.name || !newModel.model_id) return
  try {
    await $fetch('/api/admin/ai/models', { method: 'POST', body: { ...newModel } })
    await refresh()
    newModel.name = ''; newModel.model_id = ''
  } catch (e: any) {
    alert(e?.data?.message || 'Failed to add model')
  }
}

async function deleteModel(id: number) {
  await $fetch(`/api/admin/ai/models/${id}`, { method: 'DELETE' })
  await refresh()
}

async function generate() {
  generating.value = true
  generateResult.value = null
  generateError.value = ''
  try {
    const res = await $fetch<any>('/api/admin/ai/generate', {
      method: 'POST',
      body: {
        manualTopic: manualTopic.value || undefined,
        overrideModel: overrideModel.value || undefined,
      },
    })
    generateResult.value = res
  } catch (e: any) {
    generateError.value = e?.data?.message || 'Unknown error'
  } finally {
    generating.value = false
  }
}
</script>

<style scoped>
.admin-label { display:block; font-size:0.75rem; font-weight:500; color:rgba(255,255,255,0.5); margin-bottom:0.375rem; }
.admin-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; padding:0.5rem 0.75rem; border-radius:0.5rem; font-size:0.875rem; outline:none; transition:border-color 0.15s; }
.admin-input:focus { border-color:rgba(122,158,126,0.6); }
.admin-input::placeholder { color:rgba(255,255,255,0.25); }
.admin-btn-primary { display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; border:none; cursor:pointer; transition:opacity 0.15s; }
.admin-btn-primary:hover:not(:disabled) { opacity:0.9; }
.admin-btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
</style>
