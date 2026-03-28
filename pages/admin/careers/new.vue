<template>
  <div>
    <div class="px-8 py-5 flex items-center gap-4 border-b" style="border-color:rgba(255,255,255,0.07);">
      <NuxtLink to="/admin/careers" class="text-sm" style="color:rgba(255,255,255,0.4);">← Careers</NuxtLink>
      <h1 class="text-xl font-bold text-white">New Career Listing</h1>
    </div>
    <AdminCareerForm @save="onSave" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const router = useRouter()

async function onSave(data: any) {
  try {
    const res = await $fetch<any>('/api/admin/careers', { method: 'POST', body: data })
    router.push(`/admin/careers/${res.id}`)
  } catch (e: any) {
    alert(e?.data?.message || 'Failed to create listing')
  }
}
</script>
