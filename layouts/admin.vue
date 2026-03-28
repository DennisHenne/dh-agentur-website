<template>
  <div class="min-h-screen flex" style="background:#0a1520; color:#e2e8f0; font-family:'Inter',sans-serif;">
    <!-- Sidebar -->
    <aside class="w-60 flex-shrink-0 flex flex-col" style="background:#061018; border-right:1px solid rgba(255,255,255,0.07);">
      <!-- Logo -->
      <div class="px-5 py-5 border-b" style="border-color:rgba(255,255,255,0.07);">
        <span class="text-sm font-bold tracking-widest uppercase" style="color:#7A9E7E;">DH Admin</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
        <NuxtLink to="/admin/dashboard" class="nav-link" :class="{ active: $route.path === '/admin/dashboard' }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
          Dashboard
        </NuxtLink>

        <div class="pt-3 pb-1 px-2 text-xs font-semibold uppercase tracking-wider" style="color:rgba(255,255,255,0.3);">Content</div>

        <NuxtLink to="/admin/insights" class="nav-link" :class="{ active: $route.path.startsWith('/admin/insights') }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Insights
        </NuxtLink>

        <NuxtLink to="/admin/authors" class="nav-link" :class="{ active: $route.path.startsWith('/admin/authors') }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Authors
        </NuxtLink>

        <NuxtLink to="/admin/careers" class="nav-link" :class="{ active: $route.path.startsWith('/admin/careers') }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Careers
        </NuxtLink>

        <div class="pt-3 pb-1 px-2 text-xs font-semibold uppercase tracking-wider" style="color:rgba(255,255,255,0.3);">CRM</div>

        <NuxtLink to="/admin/crm" class="nav-link" :class="{ active: $route.path.startsWith('/admin/crm') }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Kontakte
        </NuxtLink>

        <div class="pt-3 pb-1 px-2 text-xs font-semibold uppercase tracking-wider" style="color:rgba(255,255,255,0.3);">AI</div>

        <NuxtLink to="/admin/ai" class="nav-link" :class="{ active: $route.path === '/admin/ai' }">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          AI Generator
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t" style="border-color:rgba(255,255,255,0.07);">
        <div class="text-xs mb-3 truncate" style="color:rgba(255,255,255,0.4);">{{ userEmail }}</div>
        <button @click="logout" class="w-full text-sm py-2 px-3 rounded-lg text-left transition-colors" style="color:rgba(255,255,255,0.5); background:rgba(255,255,255,0.04);" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const userEmail = ref('')

onMounted(async () => {
  const data = await $fetch<{ email: string }>('/api/admin/auth/me').catch(() => null)
  userEmail.value = data?.email || ''
})

async function logout() {
  await $fetch('/api/admin/auth/logout', { method: 'POST' })
  router.push('/admin')
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.55);
  transition: all 0.15s;
  text-decoration: none;
}
.nav-link:hover {
  color: rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.07);
}
.nav-link.active {
  color: #B3EFB2;
  background: rgba(122,158,126,0.15);
}
</style>
