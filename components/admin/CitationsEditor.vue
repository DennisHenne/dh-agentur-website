<template>
  <div class="space-y-3">
    <div v-for="(cite, i) in citations" :key="i" class="flex gap-2">
      <div class="flex-1 grid grid-cols-2 gap-2">
        <input v-model="cite.title" type="text" class="admin-input" placeholder="Source title" @input="emit" />
        <input v-model="cite.url" type="url" class="admin-input" placeholder="https://…" @input="emit" />
      </div>
      <button type="button" @click="remove(i)" class="text-xs px-2 rounded-lg flex-shrink-0" style="background:rgba(239,68,68,0.1); color:#f87171;">✕</button>
    </div>
    <button type="button" @click="add" class="text-sm px-3 py-1.5 rounded-lg" style="background:rgba(122,158,126,0.15); color:#B3EFB2; border:1px solid rgba(122,158,126,0.2);">
      + Add citation
    </button>
  </div>
</template>

<script setup lang="ts">
interface Citation { title: string; url: string }
const props = defineProps<{ modelValue: Citation[] }>()
const emits = defineEmits<{ (e: 'update:modelValue', v: Citation[]): void }>()

const citations = ref<Citation[]>([...(props.modelValue || [])])

watch(() => props.modelValue, (v) => { citations.value = [...(v || [])] }, { deep: true })

function emit() { emits('update:modelValue', citations.value) }
function add() { citations.value.push({ title: '', url: '' }); emits('update:modelValue', citations.value) }
function remove(i: number) { citations.value.splice(i, 1); emits('update:modelValue', citations.value) }
</script>

<style scoped>
.admin-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; outline: none; transition: border-color 0.15s; width: 100%; }
.admin-input:focus { border-color: rgba(122,158,126,0.6); }
.admin-input::placeholder { color: rgba(255,255,255,0.25); }
</style>
