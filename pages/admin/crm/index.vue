<template>
  <div class="admin-page">
    <div class="admin-header">
      <div>
        <h1 class="admin-title">CRM</h1>
        <p class="admin-subtitle">Kontakte, Aktivitäten & Zeiterfassung</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin/crm/settings" class="admin-btn-ghost">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Nextcloud
        </NuxtLink>
        <NuxtLink to="/admin/crm/contacts/new" class="admin-btn-primary">+ Neuer Kontakt</NuxtLink>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="admin-card p-5">
        <div class="text-2xl font-black mb-1" style="color:#B3EFB2;">{{ stat.value }}</div>
        <div class="text-xs" style="color:rgba(255,255,255,0.45);">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Recent contacts -->
    <div class="admin-card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold" style="color:#e2e8f0;">Letzte Kontakte</h2>
        <NuxtLink to="/admin/crm/contacts" class="text-xs" style="color:#7A9E7E;">Alle anzeigen →</NuxtLink>
      </div>
      <div class="divide-y" style="border-color:rgba(255,255,255,0.06);">
        <NuxtLink
          v-for="c in recent"
          :key="c.id"
          :to="`/admin/crm/contacts/${c.id}`"
          class="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
        >
          <div class="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2);color:#001A23;">
            {{ c.name?.[0]?.toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium truncate" style="color:#e2e8f0;">{{ c.name }}</div>
            <div class="text-xs truncate" style="color:rgba(255,255,255,0.4);">{{ c.company || c.email || '—' }}</div>
          </div>
          <span class="crm-status" :class="c.status">{{ statusLabel(c.status) }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: contacts } = await useFetch<any[]>('/api/admin/crm/contacts')

const recent = computed(() => (contacts.value || []).slice(0, 8))

const stats = computed(() => {
  const all = contacts.value || []
  return [
    { label: 'Gesamt', value: all.length },
    { label: 'Kunden', value: all.filter((c: any) => c.status === 'customer').length },
    { label: 'Leads', value: all.filter((c: any) => c.status === 'lead').length },
    { label: 'Interessenten', value: all.filter((c: any) => c.status === 'prospect').length },
  ]
})

function statusLabel(s: string) {
  return { lead: 'Lead', prospect: 'Interessent', customer: 'Kunde', inactive: 'Inaktiv' }[s] || s
}
</script>

<style scoped>
.crm-status {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.crm-status.lead { background: rgba(234,179,8,0.15); color: #fbbf24; }
.crm-status.prospect { background: rgba(59,130,246,0.15); color: #60a5fa; }
.crm-status.customer { background: rgba(122,158,126,0.2); color: #B3EFB2; }
.crm-status.inactive { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); }
</style>
