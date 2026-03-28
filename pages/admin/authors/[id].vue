<template>
  <div>
    <div class="px-8 py-5 flex items-center gap-4 border-b" style="border-color:rgba(255,255,255,0.07);">
      <NuxtLink to="/admin/authors" class="text-sm" style="color:rgba(255,255,255,0.4);">← Authors</NuxtLink>
      <h1 class="text-xl font-bold text-white">{{ form.name || route.params.id }}</h1>
      <span class="text-sm ml-auto font-mono" style="color:rgba(255,255,255,0.3);">/authors/{{ route.params.id }}</span>
    </div>

    <div class="flex flex-col lg:flex-row min-h-0" style="height:calc(100vh - 65px);">
      <!-- Main -->
      <div class="flex-1 overflow-y-auto p-8 space-y-5">
        <div class="grid grid-cols-2 gap-5">
          <div>
            <label class="admin-label">Full Name *</label>
            <input v-model="form.name" type="text" class="admin-input w-full" placeholder="David H." />
          </div>
          <div>
            <label class="admin-label">Email</label>
            <input v-model="form.email" type="email" class="admin-input w-full" placeholder="author@dh-agentur.de" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div>
            <label class="admin-label">Bio (German)</label>
            <textarea v-model="form.bio" rows="4" class="admin-input w-full resize-none" placeholder="Biografie auf Deutsch…" />
          </div>
          <div>
            <label class="admin-label">Bio (English)</label>
            <textarea v-model="form.bioEn" rows="4" class="admin-input w-full resize-none" placeholder="Biography in English…" />
          </div>
        </div>
        <div>
          <label class="admin-label">Extended Bio (Markdown)</label>
          <AdminRichEditor v-model="form.content" placeholder="Extended author profile…" />
        </div>
        <div class="flex items-center gap-3 pt-2">
          <button @click="save" :disabled="saving" class="admin-btn-primary px-6 py-2.5 text-sm">
            {{ saving ? 'Saving…' : 'Save author' }}
          </button>
          <span v-if="saved" class="text-sm" style="color:#B3EFB2;">✓ Saved</span>
          <span v-if="saveError" class="text-sm" style="color:#f87171;">{{ saveError }}</span>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="lg:w-72 flex-shrink-0 overflow-y-auto p-6 space-y-5 border-l" style="border-color:rgba(255,255,255,0.07); background:rgba(255,255,255,0.02);">
        <div>
          <label class="admin-label">Profile Photo</label>
          <AdminImageUpload v-model="form.photo" folder="authors" />
        </div>
        <div>
          <label class="admin-label">Twitter / X</label>
          <input v-model="form.twitter" type="text" class="admin-input w-full" placeholder="@handle" />
        </div>
        <div>
          <label class="admin-label">LinkedIn URL</label>
          <input v-model="form.linkedin" type="url" class="admin-input w-full" placeholder="https://linkedin.com/in/…" />
        </div>
        <AdminSeoFields v-model="seoData" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const slug = computed(() => route.params.id as string)

const { data: author } = await useFetch<any>(() => `/api/admin/authors/${slug.value}`)

const form = reactive({
  name: author.value?.name || '',
  email: author.value?.email || '',
  bio: author.value?.bio || '',
  bioEn: author.value?.bioEn || '',
  photo: author.value?.photo || '',
  twitter: author.value?.twitter || '',
  linkedin: author.value?.linkedin || '',
  content: author.value?.content || '',
})

const seoData = reactive({
  metaTitle: author.value?.metaTitle || '',
  metaDescription: author.value?.metaDescription || '',
  ogImage: '', canonicalUrl: '',
})

const saving = ref(false)
const saved = ref(false)
const saveError = ref('')

async function save() {
  if (!form.name) { saveError.value = 'Name is required'; return }
  saving.value = true; saved.value = false; saveError.value = ''
  try {
    await $fetch(`/api/admin/authors/${slug.value}`, {
      method: 'PUT',
      body: { ...form, ...seoData },
    })
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } catch (e: any) {
    saveError.value = e?.data?.message || 'Save failed'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.admin-label { display:block; font-size:0.75rem; font-weight:500; color:rgba(255,255,255,0.5); margin-bottom:0.375rem; }
.admin-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; padding:0.5rem 0.75rem; border-radius:0.5rem; font-size:0.875rem; outline:none; transition:border-color 0.15s; }
.admin-input:focus { border-color:rgba(122,158,126,0.6); }
.admin-input::placeholder { color:rgba(255,255,255,0.25); }
.admin-btn-primary { display:inline-flex; align-items:center; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; border:none; cursor:pointer; transition:opacity 0.15s; }
.admin-btn-primary:hover:not(:disabled) { opacity:0.9; }
.admin-btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
</style>
