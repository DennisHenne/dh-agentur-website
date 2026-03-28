<template>
  <div>
    <div class="px-8 py-5 flex items-center gap-4 border-b" style="border-color:rgba(255,255,255,0.07);">
      <NuxtLink to="/admin/insights" class="text-sm" style="color:rgba(255,255,255,0.4);">← Insights</NuxtLink>
      <h1 class="text-xl font-bold text-white">New Post</h1>
    </div>
    <AdminInsightForm :initial="emptyPost" @save="onSave" :is-new="true" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const router = useRouter()

const emptyPost = {
  title: '', titleEn: '', description: '', descriptionEn: '',
  date: new Date().toISOString().split('T')[0],
  author: '', authorSlug: '', category: 'webdev', tags: [],
  image: '', status: 'draft', content: '',
  metaTitle: '', metaDescription: '', ogImage: '', canonicalUrl: '',
  citations: [],
}

async function onSave({ slug, data, content }: any) {
  try {
    await $fetch('/api/admin/insights', {
      method: 'POST',
      body: { slug, content, ...data },
    })
    router.push(`/admin/insights/${slug}`)
  } catch (e: any) {
    alert(e?.data?.message || 'Failed to create post')
  }
}
</script>
