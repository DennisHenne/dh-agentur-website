<template>
  <div>
    <div class="px-8 py-5 flex items-center gap-4 border-b" style="border-color:rgba(255,255,255,0.07);">
      <NuxtLink to="/admin/careers" class="text-sm" style="color:rgba(255,255,255,0.4);">← Careers</NuxtLink>
      <h1 class="text-xl font-bold text-white">{{ career?.title || 'Edit Career' }}</h1>
    </div>
    <div v-if="pending" class="p-8 text-center" style="color:rgba(255,255,255,0.4);">Loading…</div>
    <AdminCareerForm v-else-if="career" :initial="career" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const id = computed(() => route.params.id as string)

const { data: career, pending } = await useFetch<any>(() => `/api/admin/careers/${id.value}`)

async function onSave(data: any) {
  try {
    await $fetch(`/api/admin/careers/${id.value}`, { method: 'PUT', body: data })
  } catch (e: any) {
    alert(e?.data?.message || 'Save failed')
  }
}
</script>
