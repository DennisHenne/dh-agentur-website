<template>
  <div class="flex flex-col lg:flex-row min-h-0 overflow-y-auto" style="height:calc(100vh - 65px);">
    <!-- Main -->
    <div class="flex-1 overflow-y-auto p-8 space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Job Title (DE) *</label>
          <input v-model="form.title" type="text" class="admin-input w-full" placeholder="Senior Frontend-Entwickler (m/w/d)" />
        </div>
        <div>
          <label class="admin-label">Job Title (EN)</label>
          <input v-model="form.title_en" type="text" class="admin-input w-full" placeholder="Senior Frontend Developer" />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="admin-label">Department</label>
          <input v-model="form.department" type="text" class="admin-input w-full" placeholder="Engineering" />
        </div>
        <div>
          <label class="admin-label">Location (DE)</label>
          <input v-model="form.location" type="text" class="admin-input w-full" placeholder="Remote / Wien" />
        </div>
        <div>
          <label class="admin-label">Location (EN)</label>
          <input v-model="form.location_en" type="text" class="admin-input w-full" placeholder="Remote / Vienna" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Type (DE)</label>
          <input v-model="form.type" type="text" class="admin-input w-full" placeholder="Vollzeit" />
        </div>
        <div>
          <label class="admin-label">Type (EN)</label>
          <input v-model="form.type_en" type="text" class="admin-input w-full" placeholder="Full-time" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Description (DE) *</label>
          <textarea v-model="form.description" rows="5" class="admin-input w-full resize-none" placeholder="Stellenbeschreibung auf Deutsch…" />
        </div>
        <div>
          <label class="admin-label">Description (EN)</label>
          <textarea v-model="form.description_en" rows="5" class="admin-input w-full resize-none" placeholder="Job description in English…" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Requirements (DE)</label>
          <textarea v-model="form.requirements" rows="4" class="admin-input w-full resize-none" placeholder="Anforderungen…" />
        </div>
        <div>
          <label class="admin-label">Requirements (EN)</label>
          <textarea v-model="form.requirements_en" rows="4" class="admin-input w-full resize-none" placeholder="Requirements…" />
        </div>
      </div>

      <div>
        <label class="admin-label">Benefits</label>
        <textarea v-model="form.benefits" rows="3" class="admin-input w-full resize-none" placeholder="Remote, faire Vergütung, …" />
      </div>

      <div class="flex items-center gap-3 pt-2">
        <button @click="save" :disabled="saving" class="admin-btn-primary px-6 py-2.5 text-sm">
          {{ saving ? 'Saving…' : 'Save listing' }}
        </button>
        <span v-if="saved" class="text-sm" style="color:#B3EFB2;">✓ Saved</span>
        <span v-if="saveError" class="text-sm" style="color:#f87171;">{{ saveError }}</span>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="lg:w-72 flex-shrink-0 overflow-y-auto p-6 space-y-5 border-l" style="border-color:rgba(255,255,255,0.07); background:rgba(255,255,255,0.02);">
      <div>
        <label class="admin-label">Slug *</label>
        <input v-model="form.slug" type="text" class="admin-input w-full font-mono text-sm" placeholder="senior-frontend-dev" :readonly="!!initial" />
      </div>
      <div>
        <label class="admin-label">Status</label>
        <select v-model="form.status" class="admin-input w-full">
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div>
        <label class="admin-label">Salary Range</label>
        <input v-model="form.salary_range" type="text" class="admin-input w-full" placeholder="€60k – €80k" />
      </div>
      <div>
        <label class="admin-label">Meta Title</label>
        <input v-model="form.meta_title" type="text" class="admin-input w-full" placeholder="SEO title…" maxlength="80" />
      </div>
      <div>
        <label class="admin-label">Meta Description</label>
        <textarea v-model="form.meta_description" rows="3" class="admin-input w-full resize-none" placeholder="SEO description…" maxlength="200" />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ initial?: Record<string, any> }>()
const emit = defineEmits<{ (e: 'save', v: Record<string, any>): void }>()

const saving = ref(false)
const saved = ref(false)
const saveError = ref('')

const form = reactive({
  slug: props.initial?.slug || '',
  title: props.initial?.title || '',
  title_en: props.initial?.title_en || '',
  department: props.initial?.department || '',
  location: props.initial?.location || '',
  location_en: props.initial?.location_en || '',
  type: props.initial?.type || '',
  type_en: props.initial?.type_en || '',
  description: props.initial?.description || '',
  description_en: props.initial?.description_en || '',
  requirements: props.initial?.requirements || '',
  requirements_en: props.initial?.requirements_en || '',
  benefits: props.initial?.benefits || '',
  salary_range: props.initial?.salary_range || '',
  status: props.initial?.status || 'active',
  meta_title: props.initial?.meta_title || '',
  meta_description: props.initial?.meta_description || '',
})

// Auto-slug from title for new listings
watch(() => form.title, (v) => {
  if (!props.initial) {
    form.slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
  }
})

async function save() {
  if (!form.title || !form.slug) { saveError.value = 'Title and slug are required'; return }
  saving.value = true; saved.value = false; saveError.value = ''
  try {
    emit('save', { ...form })
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
.admin-input[readonly] { opacity:0.6; cursor:not-allowed; }
.admin-btn-primary { display:inline-flex; align-items:center; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; border:none; cursor:pointer; transition:opacity 0.15s; }
.admin-btn-primary:hover:not(:disabled) { opacity:0.9; }
.admin-btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
</style>
