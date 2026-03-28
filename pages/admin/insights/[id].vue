<template>
  <div>
    <div class="px-8 py-5 flex items-center gap-4 border-b" style="border-color:rgba(255,255,255,0.07);">
      <NuxtLink to="/admin/insights" class="text-sm" style="color:rgba(255,255,255,0.4);">← Insights</NuxtLink>
      <h1 class="text-xl font-bold text-white truncate max-w-xl">{{ post?.title || route.params.id }}</h1>
      <a v-if="post" :href="`/insights/${route.params.id}`" target="_blank" class="ml-auto text-xs px-3 py-1.5 rounded-lg" style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);">Preview ↗</a>
    </div>

    <div v-if="pending" class="p-8 text-center" style="color:rgba(255,255,255,0.4);">Loading…</div>
    <div v-else-if="!post" class="p-8 text-center" style="color:#f87171;">Post not found.</div>
    <AdminInsightForm v-else :initial="post" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.id as string)

const { data: post, pending } = await useFetch<any>(() => `/api/admin/insights/${slug.value}`)

async function onSave({ slug: newSlug, data, content }: any) {
  await $fetch(`/api/admin/insights/${slug.value}`, {
    method: 'PUT',
    body: { newSlug, content, ...data },
  })
  if (newSlug && newSlug !== slug.value) {
    router.push(`/admin/insights/${newSlug}`)
  }
}
</script>
