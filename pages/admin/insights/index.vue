<template>
  <div>
    <div class="px-8 py-5 flex items-center justify-between border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">Insights</h1>
      <NuxtLink to="/admin/insights/new" class="admin-btn-primary text-sm px-4 py-2">+ New Post</NuxtLink>
    </div>

    <div class="p-8">
      <!-- Filters -->
      <div class="flex gap-2 mb-5">
        <button v-for="f in filters" :key="f.value" @click="filter = f.value"
          class="text-xs px-3 py-1.5 rounded-full transition-colors"
          :style="filter === f.value ? 'background:rgba(122,158,126,0.25);color:#B3EFB2;border:1px solid rgba(122,158,126,0.3);' : 'background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.08);'">
          {{ f.label }}
        </button>
      </div>

      <div class="rounded-xl overflow-hidden" style="border:1px solid rgba(255,255,255,0.07);">
        <table class="w-full text-sm">
          <thead>
            <tr style="background:rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.07);">
              <th class="text-left px-5 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Title</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Status</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Date</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Author</th>
              <th class="text-right px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filtered" :key="post.slug" style="border-bottom:1px solid rgba(255,255,255,0.05);" class="hover:bg-white/[0.02] transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2">
                  <span v-if="post.aiGenerated" class="text-xs px-1.5 py-0.5 rounded" style="background:rgba(99,102,241,0.2);color:#a5b4fc;">AI</span>
                  <span class="text-white font-medium truncate max-w-xs">{{ post.title }}</span>
                </div>
                <div class="text-xs mt-0.5" style="color:rgba(255,255,255,0.3);">/insights/{{ post.slug }}</div>
              </td>
              <td class="px-4 py-3.5">
                <span class="text-xs px-2 py-0.5 rounded-full"
                  :style="post.status === 'published' ? 'background:rgba(122,158,126,0.2);color:#B3EFB2;' : 'background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.45);'">
                  {{ post.status || 'draft' }}
                </span>
              </td>
              <td class="px-4 py-3.5 text-xs" style="color:rgba(255,255,255,0.45);">{{ post.date }}</td>
              <td class="px-4 py-3.5 text-xs" style="color:rgba(255,255,255,0.45);">{{ post.author }}</td>
              <td class="px-4 py-3.5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <a :href="`/insights/${post.slug}`" target="_blank" class="text-xs px-2.5 py-1 rounded-lg transition-colors" style="background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.45);" title="Preview">↗</a>
                  <NuxtLink :to="`/admin/insights/${post.slug}`" class="text-xs px-2.5 py-1 rounded-lg transition-colors" style="background:rgba(122,158,126,0.1);color:#B3EFB2;">Edit</NuxtLink>
                  <button @click="deletePost(post.slug)" class="text-xs px-2.5 py-1 rounded-lg transition-colors" style="background:rgba(239,68,68,0.1);color:#f87171;">Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="5" class="px-5 py-10 text-center text-sm" style="color:rgba(255,255,255,0.3);">No posts found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posts, refresh } = await useFetch<any[]>('/api/admin/insights')
const filter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'AI Generated', value: 'ai' },
]

const filtered = computed(() => {
  const all = posts.value || []
  if (filter.value === 'all') return all
  if (filter.value === 'ai') return all.filter((p: any) => p.aiGenerated)
  return all.filter((p: any) => (p.status || 'draft') === filter.value)
})

async function deletePost(slug: string) {
  if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
  await $fetch(`/api/admin/insights/${slug}`, { method: 'DELETE' })
  refresh()
}
</script>

<style scoped>
.admin-btn-primary { display:inline-flex; align-items:center; gap:0.375rem; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; text-decoration:none; transition:opacity 0.15s; }
.admin-btn-primary:hover { opacity:0.9; }
</style>
