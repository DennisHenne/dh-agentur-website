<template>
  <div class="space-y-4 p-4 rounded-xl" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.07);">
    <h3 class="text-xs font-semibold uppercase tracking-wider" style="color:#7A9E7E;">SEO & Meta</h3>

    <div>
      <label class="admin-label">Meta Title <span style="color:rgba(255,255,255,0.3);">(max 60 chars)</span></label>
      <input :value="modelValue.metaTitle" @input="update('metaTitle', ($event.target as HTMLInputElement).value)"
        type="text" maxlength="80" class="admin-input w-full"
        :placeholder="modelValue.title || 'SEO title…'" />
      <div class="text-xs mt-1" :style="(modelValue.metaTitle || '').length > 60 ? 'color:#f87171;' : 'color:rgba(255,255,255,0.3);'">
        {{ (modelValue.metaTitle || '').length }}/60
      </div>
    </div>

    <div>
      <label class="admin-label">Meta Description <span style="color:rgba(255,255,255,0.3);">(max 160 chars)</span></label>
      <textarea :value="modelValue.metaDescription" @input="update('metaDescription', ($event.target as HTMLTextAreaElement).value)"
        rows="3" maxlength="200" class="admin-input w-full resize-none"
        placeholder="SEO description…" />
      <div class="text-xs mt-1" :style="(modelValue.metaDescription || '').length > 160 ? 'color:#f87171;' : 'color:rgba(255,255,255,0.3);'">
        {{ (modelValue.metaDescription || '').length }}/160
      </div>
    </div>

    <div>
      <label class="admin-label">OG Image URL</label>
      <input :value="modelValue.ogImage" @input="update('ogImage', ($event.target as HTMLInputElement).value)"
        type="text" class="admin-input w-full"
        placeholder="/uploads/admin/og-image.webp" />
    </div>

    <div>
      <label class="admin-label">Canonical URL <span style="color:rgba(255,255,255,0.3);">(optional)</span></label>
      <input :value="modelValue.canonicalUrl" @input="update('canonicalUrl', ($event.target as HTMLInputElement).value)"
        type="url" class="admin-input w-full"
        placeholder="https://dh-agentur.de/insights/…" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface SeoData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalUrl?: string
  title?: string
}
const props = defineProps<{ modelValue: SeoData }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: SeoData): void }>()

function update(key: keyof SeoData, value: string) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<style scoped>
.admin-label { display: block; font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 0.375rem; }
.admin-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; outline: none; transition: border-color 0.15s; }
.admin-input:focus { border-color: rgba(122,158,126,0.6); }
.admin-input::placeholder { color: rgba(255,255,255,0.25); }
</style>
