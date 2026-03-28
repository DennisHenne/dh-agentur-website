<template>
  <div>
    <div v-if="modelValue" class="mb-3 relative inline-block">
      <img :src="modelValue" class="h-28 w-auto rounded-lg object-cover" style="border:1px solid rgba(255,255,255,0.1);" />
      <button type="button" @click="$emit('update:modelValue', '')"
        class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs"
        style="background:#ef4444; color:white;">✕</button>
    </div>

    <label class="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-colors"
      style="background:rgba(255,255,255,0.04); border:1px dashed rgba(255,255,255,0.15); color:rgba(255,255,255,0.6);"
      onmouseover="this.style.background='rgba(255,255,255,0.07)'"
      onmouseout="this.style.background='rgba(255,255,255,0.04)'">
      <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
      <span class="text-sm">{{ uploading ? 'Uploading…' : (label || 'Upload image') }}</span>
      <input type="file" accept="image/*" class="hidden" :disabled="uploading" @change="onFile" />
    </label>

    <p v-if="error" class="mt-1.5 text-xs" style="color:#f87171;">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string; folder?: string; label?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const uploading = ref(false)
const error = ref('')

async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  error.value = ''
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch<{ url: string }>(`/api/admin/upload?folder=${props.folder || 'misc'}`, {
      method: 'POST',
      body: form,
    })
    emit('update:modelValue', res.url)
  } catch (e: any) {
    error.value = e?.data?.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}
</script>
