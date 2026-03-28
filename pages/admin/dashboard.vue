<template>
  <div>
    <div class="px-8 py-6 border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">Dashboard</h1>
    </div>
    <div class="p-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div v-for="s in stats" :key="s.label" class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <div class="text-2xl font-black text-white mb-1">{{ s.value }}</div>
          <div class="text-xs" style="color:rgba(255,255,255,0.45);">{{ s.label }}</div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Recent posts -->
        <div class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-white text-sm">Recent Insights</h2>
            <NuxtLink to="/admin/insights" class="text-xs" style="color:#7A9E7E;">View all →</NuxtLink>
          </div>
          <div class="space-y-2">
            <div v-for="p in recentPosts" :key="p.slug" class="flex items-center justify-between py-2" style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <div>
                <div class="text-sm text-white truncate max-w-48">{{ p.title }}</div>
                <div class="text-xs mt-0.5" style="color:rgba(255,255,255,0.35);">{{ p.date }}</div>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full" :style="p.status === 'published' ? 'background:rgba(122,158,126,0.2);color:#B3EFB2;' : 'background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);'">
                {{ p.status }}
              </span>
            </div>
            <p v-if="!recentPosts.length" class="text-xs py-4 text-center" style="color:rgba(255,255,255,0.3);">No posts yet</p>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <h2 class="font-semibold text-white text-sm mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <NuxtLink to="/admin/insights/new" class="quick-action-btn">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              New Insight Post
            </NuxtLink>
            <NuxtLink to="/admin/careers/new" class="quick-action-btn">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              New Career Listing
            </NuxtLink>
            <NuxtLink to="/admin/ai" class="quick-action-btn">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Run AI Generator
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posts } = await useFetch<any[]>('/api/admin/insights')
const { data: careers } = await useFetch<any[]>('/api/admin/careers')
const { data: authors } = await useFetch<any[]>('/api/admin/authors')

const recentPosts = computed(() => (posts.value || []).slice(0, 6))
const stats = computed(() => [
  { label: 'Total Posts', value: posts.value?.length || 0 },
  { label: 'Published', value: posts.value?.filter((p: any) => p.status === 'published').length || 0 },
  { label: 'Authors', value: authors.value?.length || 0 },
  { label: 'Active Jobs', value: careers.value?.filter((c: any) => c.status === 'active').length || 0 },
])
</script>

<style scoped>
.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  text-decoration: none;
  transition: all 0.15s;
}
.quick-action-btn:hover {
  background: rgba(122,158,126,0.15);
  color: #B3EFB2;
  border-color: rgba(122,158,126,0.3);
}
</style>
