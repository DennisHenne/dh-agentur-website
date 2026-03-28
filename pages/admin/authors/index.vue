<template>
  <div>
    <div class="px-8 py-5 flex items-center justify-between border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">Authors</h1>
      <button @click="showNew = true" class="admin-btn-primary text-sm px-4 py-2">+ New Author</button>
    </div>

    <div class="p-8">
      <!-- New author modal -->
      <div v-if="showNew" class="mb-6 p-5 rounded-xl" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);">
        <h3 class="text-sm font-semibold text-white mb-3">Create Author</h3>
        <div class="flex gap-3">
          <input v-model="newSlug" type="text" class="admin-input flex-1" placeholder="author-slug (e.g. david-h)" />
          <button @click="createAuthor" class="admin-btn-primary px-4 py-2 text-sm">Create</button>
          <button @click="showNew = false" class="text-sm px-4 py-2 rounded-xl" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);">Cancel</button>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="author in authors" :key="author.slug"
          class="rounded-xl p-5" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);">
          <div class="flex items-center gap-3 mb-3">
            <img v-if="author.photo" :src="author.photo" class="h-10 w-10 rounded-full object-cover" />
            <div v-else class="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold" style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2);color:#001A23;">
              {{ (author.name || author.slug)[0]?.toUpperCase() }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ author.name || author.slug }}</div>
              <div class="text-xs" style="color:rgba(255,255,255,0.35);">/authors/{{ author.slug }}</div>
            </div>
          </div>
          <p v-if="author.bio" class="text-xs mb-3 line-clamp-2" style="color:rgba(255,255,255,0.45);">{{ author.bio }}</p>
          <NuxtLink :to="`/admin/authors/${author.slug}`" class="text-xs px-3 py-1.5 rounded-lg inline-block" style="background:rgba(122,158,126,0.15);color:#B3EFB2;">Edit</NuxtLink>
        </div>
        <div v-if="!authors?.length" class="col-span-full py-10 text-center text-sm" style="color:rgba(255,255,255,0.3);">No authors yet</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const router = useRouter()
const { data: authors, refresh } = await useFetch<any[]>('/api/admin/authors')
const showNew = ref(false)
const newSlug = ref('')

async function createAuthor() {
  const slug = newSlug.value.trim().toLowerCase().replace(/\s+/g, '-')
  if (!slug) return
  await $fetch(`/api/admin/authors/${slug}`, { method: 'PUT', body: { name: slug } })
  router.push(`/admin/authors/${slug}`)
}
</script>

<style scoped>
.admin-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; padding:0.5rem 0.75rem; border-radius:0.5rem; font-size:0.875rem; outline:none; transition:border-color 0.15s; }
.admin-input:focus { border-color:rgba(122,158,126,0.6); }
.admin-btn-primary { display:inline-flex; align-items:center; gap:0.375rem; background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23; font-weight:600; border-radius:0.625rem; border:none; cursor:pointer; transition:opacity 0.15s; }
.admin-btn-primary:hover { opacity:0.9; }
</style>
