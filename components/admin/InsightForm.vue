<template>
  <div class="flex flex-col lg:flex-row gap-0 min-h-0" style="height:calc(100vh - 65px);">
    <!-- Main editor -->
    <div class="flex-1 overflow-y-auto p-8 space-y-6">
      <!-- Slug -->
      <div class="flex gap-4 items-start">
        <div class="flex-1">
          <label class="admin-label">Post Title *</label>
          <input v-model="form.title" type="text" class="admin-input w-full text-lg font-semibold" placeholder="Post title…" @input="autoSlug" />
        </div>
        <div class="w-64">
          <label class="admin-label">Slug *</label>
          <input v-model="form.slug" type="text" class="admin-input w-full font-mono text-sm" placeholder="post-slug" />
        </div>
      </div>

      <!-- Title EN -->
      <div>
        <label class="admin-label">Title (English)</label>
        <input v-model="form.titleEn" type="text" class="admin-input w-full" placeholder="English title…" />
      </div>

      <!-- Excerpt -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Excerpt / Description (DE)</label>
          <textarea v-model="form.description" rows="2" class="admin-input w-full resize-none" placeholder="Kurze Zusammenfassung…" />
        </div>
        <div>
          <label class="admin-label">Excerpt / Description (EN)</label>
          <textarea v-model="form.descriptionEn" rows="2" class="admin-input w-full resize-none" placeholder="Short summary…" />
        </div>
      </div>

      <!-- Content editor -->
      <div>
        <label class="admin-label">Content</label>
        <AdminRichEditor v-model="form.content" placeholder="Write your post content…" />
      </div>

      <!-- Citations -->
      <div>
        <label class="admin-label">Citations / Sources</label>
        <AdminCitationsEditor v-model="form.citations" />
      </div>

      <!-- Save bar -->
      <div class="flex items-center gap-3 pt-2">
        <button @click="save" :disabled="saving" class="admin-btn-primary px-6 py-2.5 text-sm">
          {{ saving ? 'Saving…' : 'Save post' }}
        </button>
        <span v-if="saved" class="text-sm" style="color:#B3EFB2;">✓ Saved</span>
        <span v-if="saveError" class="text-sm" style="color:#f87171;">{{ saveError }}</span>
      </div>
    </div>

    <!-- Right sidebar -->
    <aside class="lg:w-80 flex-shrink-0 overflow-y-auto p-6 space-y-5 border-l" style="border-color:rgba(255,255,255,0.07); background:rgba(255,255,255,0.02);">
      <!-- Status + date -->
      <div>
        <label class="admin-label">Status</label>
        <select v-model="form.status" class="admin-input w-full">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div>
        <label class="admin-label">Publish Date</label>
        <input v-model="form.date" type="date" class="admin-input w-full" />
      </div>

      <!-- Author + Category -->
      <div>
        <label class="admin-label">Author</label>
        <select v-if="authors?.length" v-model="selectedAuthorSlug" class="admin-input w-full" @change="onAuthorSelect">
          <option value="">— Select author —</option>
          <option v-for="a in authors" :key="a.slug" :value="a.slug">
            {{ a.name || a.slug }}
          </option>
        </select>
        <!-- Preview of selected author -->
        <div v-if="selectedAuthor" class="flex items-center gap-2 mt-2 px-2.5 py-2 rounded-lg" style="background:rgba(122,158,126,0.08); border:1px solid rgba(122,158,126,0.15);">
          <img v-if="selectedAuthor.photo" :src="selectedAuthor.photo" class="h-6 w-6 rounded-full object-cover flex-shrink-0" />
          <div v-else class="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2);color:#001A23;">
            {{ (selectedAuthor.name || selectedAuthor.slug)[0]?.toUpperCase() }}
          </div>
          <span class="text-xs" style="color:#B3EFB2;">{{ selectedAuthor.name }}</span>
          <NuxtLink :to="`/admin/authors/${selectedAuthor.slug}`" target="_blank" class="text-xs ml-auto" style="color:rgba(255,255,255,0.4);">Edit ↗</NuxtLink>
        </div>
        <div v-else-if="!authors?.length" class="flex items-center gap-2">
          <input v-model="form.author" type="text" class="admin-input flex-1" placeholder="Author name" />
          <NuxtLink to="/admin/authors" target="_blank" class="text-xs px-2.5 py-2 rounded-lg flex-shrink-0" style="background:rgba(122,158,126,0.15);color:#B3EFB2;">+ Add</NuxtLink>
        </div>
        <p v-if="!authors?.length" class="text-xs mt-1" style="color:rgba(255,255,255,0.3);">
          No authors yet. <NuxtLink to="/admin/authors" target="_blank" style="color:#7A9E7E;">Create one first →</NuxtLink>
        </p>
      </div>
      <div>
        <label class="admin-label">Category</label>
        <select v-model="form.category" class="admin-input w-full">
          <option value="webdev">Webentwicklung</option>
          <option value="marketing">Marketing</option>
          <option value="ai">KI & Automatisierung</option>
          <option value="strategy">Strategie</option>
        </select>
      </div>

      <!-- Tags -->
      <div>
        <label class="admin-label">Tags <span style="color:rgba(255,255,255,0.3);">(comma-separated)</span></label>
        <input :value="tagsInput" @input="parseTags" type="text" class="admin-input w-full" placeholder="nuxt, vue, typescript" />
      </div>

      <!-- Featured image -->
      <div>
        <label class="admin-label">Featured Image</label>
        <AdminImageUpload v-model="form.image" folder="posts" />
      </div>

      <!-- SEO -->
      <AdminSeoFields v-model="seoData" />
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ initial: Record<string, any>; isNew?: boolean }>()
const emit = defineEmits<{ (e: 'save', v: { slug: string; data: Record<string, any>; content: string }): void }>()

// Load authors for the dropdown
const { data: authors } = await useFetch<any[]>('/api/admin/authors')

const saving = ref(false)
const saved = ref(false)
const saveError = ref('')

const form = reactive({
  title: props.initial.title || '',
  titleEn: props.initial.titleEn || '',
  slug: props.initial.slug || '',
  description: props.initial.description || '',
  descriptionEn: props.initial.descriptionEn || '',
  date: props.initial.date || new Date().toISOString().split('T')[0],
  author: props.initial.author || '',
  authorSlug: props.initial.authorSlug || '',
  category: props.initial.category || 'webdev',
  tags: props.initial.tags || [],
  image: props.initial.image || '',
  status: props.initial.status || 'draft',
  content: props.initial.content || '',
  citations: props.initial.citations || [],
})

// Pre-select the dropdown if editing an existing post
const selectedAuthorSlug = ref(props.initial.authorSlug || '')

function onAuthorSelect() {
  const found = authors.value?.find((a: any) => a.slug === selectedAuthorSlug.value)
  if (found) {
    form.author = found.name || found.slug
    form.authorSlug = found.slug
  } else {
    form.author = ''
    form.authorSlug = ''
  }
}

// Keep selectedAuthorSlug in sync when authors load (edit mode)
watch(authors, () => {
  if (props.initial.authorSlug && !selectedAuthorSlug.value) {
    selectedAuthorSlug.value = props.initial.authorSlug
  }
}, { immediate: true })

const selectedAuthor = computed(() =>
  authors.value?.find((a: any) => a.slug === selectedAuthorSlug.value) ?? null
)

const seoData = reactive({
  metaTitle: props.initial.metaTitle || '',
  metaDescription: props.initial.metaDescription || '',
  ogImage: props.initial.ogImage || '',
  canonicalUrl: props.initial.canonicalUrl || '',
})

const tagsInput = computed(() => form.tags.join(', '))

function parseTags(e: Event) {
  const val = (e.target as HTMLInputElement).value
  form.tags = val.split(',').map(t => t.trim()).filter(Boolean)
}

function slugify(t: string) {
  return t.toLowerCase()
    .replace(/[äöü]/g, c => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c] || c))
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

let slugManuallySet = !!props.initial.slug
function autoSlug() {
  if (!slugManuallySet) form.slug = slugify(form.title)
}
watch(() => form.slug, () => { slugManuallySet = true })

async function save() {
  if (!form.title || !form.slug) { saveError.value = 'Title and slug are required'; return }

  // Sync author from dropdown selection before saving
  if (selectedAuthorSlug.value && selectedAuthor.value) {
    form.author = selectedAuthor.value.name || selectedAuthor.value.slug
    form.authorSlug = selectedAuthor.value.slug
  }

  saving.value = true
  saved.value = false
  saveError.value = ''
  try {
    emit('save', {
      slug: form.slug,
      content: form.content,
      data: { ...form, ...seoData },
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
.admin-btn-primary { display:inline-flex; align-items:center; gap:0.375rem; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; border:none; cursor:pointer; transition:opacity 0.15s; }
.admin-btn-primary:hover:not(:disabled) { opacity:0.9; }
.admin-btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
</style>
