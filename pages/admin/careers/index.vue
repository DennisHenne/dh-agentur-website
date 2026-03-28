<template>
  <div>
    <div class="px-8 py-5 flex items-center justify-between border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">Careers</h1>
      <NuxtLink to="/admin/careers/new" class="admin-btn-primary text-sm px-4 py-2">+ New Listing</NuxtLink>
    </div>
    <div class="p-8">
      <div class="rounded-xl overflow-hidden" style="border:1px solid rgba(255,255,255,0.07);">
        <table class="w-full text-sm">
          <thead>
            <tr style="background:rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.07);">
              <th class="text-left px-5 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Title</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Type</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Location</th>
              <th class="text-left px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Status</th>
              <th class="text-right px-4 py-3 text-xs font-semibold" style="color:rgba(255,255,255,0.4);">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in careers" :key="job.id" style="border-bottom:1px solid rgba(255,255,255,0.05);" class="hover:bg-white/[0.02] transition-colors">
              <td class="px-5 py-3.5">
                <div class="text-white font-medium">{{ job.title }}</div>
                <div class="text-xs mt-0.5" style="color:rgba(255,255,255,0.3);">/careers/{{ job.slug }}</div>
              </td>
              <td class="px-4 py-3.5 text-xs" style="color:rgba(255,255,255,0.5);">{{ job.type }}</td>
              <td class="px-4 py-3.5 text-xs" style="color:rgba(255,255,255,0.5);">{{ job.location }}</td>
              <td class="px-4 py-3.5">
                <span class="text-xs px-2 py-0.5 rounded-full" :style="job.status === 'active' ? 'background:rgba(122,158,126,0.2);color:#B3EFB2;' : 'background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.45);'">
                  {{ job.status }}
                </span>
              </td>
              <td class="px-4 py-3.5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="`/admin/careers/${job.id}`" class="text-xs px-2.5 py-1 rounded-lg" style="background:rgba(122,158,126,0.1);color:#B3EFB2;">Edit</NuxtLink>
                  <button @click="deleteJob(job.id)" class="text-xs px-2.5 py-1 rounded-lg" style="background:rgba(239,68,68,0.1);color:#f87171;">Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="!careers?.length">
              <td colspan="5" class="px-5 py-10 text-center text-sm" style="color:rgba(255,255,255,0.3);">No career listings yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: careers, refresh } = await useFetch<any[]>('/api/admin/careers')

async function deleteJob(id: number) {
  if (!confirm('Delete this career listing?')) return
  await $fetch(`/api/admin/careers/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<style scoped>
.admin-btn-primary { display:inline-flex; align-items:center; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; text-decoration:none; padding-left:1rem; padding-right:1rem; transition:opacity 0.15s; }
.admin-btn-primary:hover { opacity:0.9; }
</style>
