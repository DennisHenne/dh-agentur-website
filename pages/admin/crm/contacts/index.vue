<template>
  <div class="admin-page">
    <div class="admin-header">
      <div>
        <h1 class="admin-title">Kontakte</h1>
        <p class="admin-subtitle">{{ filtered.length }} Kontakt{{ filtered.length !== 1 ? 'e' : '' }}</p>
      </div>
      <NuxtLink to="/admin/crm/contacts/new" class="admin-btn-primary">+ Neuer Kontakt</NuxtLink>
    </div>

    <!-- Search + chip filters -->
    <div class="mb-6 space-y-3">
      <input
        v-model="search"
        type="search"
        placeholder="Name, E-Mail, Firma suchen …"
        class="admin-input w-full max-w-sm"
      />
      <div class="flex flex-wrap gap-2">
        <button
          v-for="s in statusOptions"
          :key="s.value"
          class="text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all"
          :style="statusFilter === s.value
            ? `background:${s.color}22; border-color:${s.color}55; color:${s.color};`
            : 'background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.09); color:rgba(255,255,255,0.4);'"
          @click="statusFilter = s.value"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="admin-card overflow-hidden p-0">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.03);">
            <th class="text-left px-5 py-3 font-medium" style="color:rgba(255,255,255,0.45);">Name</th>
            <th class="text-left px-4 py-3 font-medium hidden md:table-cell" style="color:rgba(255,255,255,0.45);">Firma</th>
            <th class="text-left px-4 py-3 font-medium hidden lg:table-cell" style="color:rgba(255,255,255,0.45);">E-Mail</th>
            <th class="text-left px-4 py-3 font-medium" style="color:rgba(255,255,255,0.45);">Status</th>
            <th class="text-left px-4 py-3 font-medium hidden lg:table-cell" style="color:rgba(255,255,255,0.45);">Zuletzt aktiv</th>
            <th class="px-4 py-3 w-12" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in filtered"
            :key="c.id"
            class="border-b transition-colors hover:bg-white/[0.03] cursor-pointer"
            style="border-color:rgba(255,255,255,0.05);"
            @click="$router.push(`/admin/crm/contacts/${c.id}`)"
          >
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-2.5">
                <div
                  class="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2);color:#001A23;"
                >{{ c.name?.[0]?.toUpperCase() }}</div>
                <span class="font-medium" style="color:#e2e8f0;">{{ c.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5 hidden md:table-cell" style="color:rgba(255,255,255,0.55);">{{ c.company || '—' }}</td>
            <td class="px-4 py-3.5 hidden lg:table-cell" style="color:rgba(255,255,255,0.45);">{{ c.email || '—' }}</td>
            <td class="px-4 py-3.5">
              <span class="status-chip" :class="c.status">{{ statusLabel(c.status) }}</span>
            </td>
            <td class="px-4 py-3.5 hidden lg:table-cell text-xs" style="color:rgba(255,255,255,0.3);">{{ formatDate(c.updated_at) }}</td>
            <td class="px-4 py-3.5 text-right" @click.stop>
              <button
                class="text-xs px-2 py-1 rounded opacity-40 hover:opacity-100 transition-opacity"
                style="color:#ef4444; background:rgba(239,68,68,0.08);"
                title="Löschen"
                @click="requestDelete(c)"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="6" class="px-5 py-12 text-center text-sm" style="color:rgba(255,255,255,0.28);">
              Keine Kontakte gefunden.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Password confirmation modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="delModal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="cancelDel" />
          <div class="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl" style="background:#0d1c28;border:1px solid rgba(255,255,255,0.1);">
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-full" style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#ef4444" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-base font-bold mb-1" style="color:#e2e8f0;">Kontakt löschen</h3>
            <p class="text-sm mb-1" style="color:rgba(255,255,255,0.6);">
              <span class="font-semibold" style="color:#e2e8f0;">{{ delModal.contact?.name }}</span>
              wird samt allen Aktivitäten und Zeiteinträgen gelöscht.
            </p>
            <p class="text-sm mb-5" style="color:rgba(255,255,255,0.4);">Passwort zur Bestätigung eingeben.</p>
            <input
              ref="pwInput"
              v-model="delModal.password"
              type="password"
              class="admin-input w-full mb-3"
              placeholder="Passwort …"
              autocomplete="current-password"
              @keyup.enter="confirmDel"
            />
            <p v-if="delModal.error" class="text-xs mb-3 flex items-center gap-1" style="color:#f87171;">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              {{ delModal.error }}
            </p>
            <div class="flex gap-3 justify-end">
              <button class="admin-btn-ghost text-sm" @click="cancelDel">Abbrechen</button>
              <button
                class="text-sm px-4 py-2 rounded-lg font-semibold transition-opacity"
                style="background:#ef4444;color:#fff;"
                :class="{ 'opacity-50': delModal.loading || !delModal.password }"
                :disabled="delModal.loading || !delModal.password"
                @click="confirmDel"
              >{{ delModal.loading ? 'Prüfe …' : 'Endgültig löschen' }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const search = ref('')
const statusFilter = ref('')
const { data: contacts, refresh } = await useFetch<any[]>('/api/admin/crm/contacts')

const statusOptions = [
  { value: '',         label: 'Alle',        color: '#94a3b8' },
  { value: 'lead',     label: 'Lead',        color: '#fbbf24' },
  { value: 'prospect', label: 'Interessent', color: '#60a5fa' },
  { value: 'customer', label: 'Kunde',       color: '#B3EFB2' },
  { value: 'inactive', label: 'Inaktiv',     color: '#64748b' },
]

const filtered = computed(() => {
  let list = contacts.value || []
  if (search.value) {
    const s = search.value.toLowerCase()
    list = list.filter((c: any) =>
      c.name?.toLowerCase().includes(s) ||
      c.email?.toLowerCase().includes(s) ||
      c.company?.toLowerCase().includes(s),
    )
  }
  if (statusFilter.value) list = list.filter((c: any) => c.status === statusFilter.value)
  return list
})

function statusLabel(s: string) {
  return { lead: 'Lead', prospect: 'Interessent', customer: 'Kunde', inactive: 'Inaktiv' }[s] || s
}

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('de-AT', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
}

// ── Password-confirmed delete ────────────────────────────────────────────────
const pwInput = ref<HTMLInputElement | null>(null)

const delModal = reactive({
  open: false,
  password: '',
  error: '',
  loading: false,
  contact: null as any,
})

function requestDelete(c: any) {
  delModal.contact = c
  delModal.open = true
  delModal.password = ''
  delModal.error = ''
  nextTick(() => pwInput.value?.focus())
}

function cancelDel() {
  delModal.open = false
  delModal.password = ''
  delModal.error = ''
  delModal.contact = null
}

async function confirmDel() {
  if (!delModal.password || delModal.loading) return
  delModal.loading = true
  delModal.error = ''
  try {
    await $fetch('/api/admin/auth/verify-password', { method: 'POST', body: { password: delModal.password } })
    await $fetch(`/api/admin/crm/contacts/${delModal.contact.id}`, { method: 'DELETE' })
    cancelDel()
    refresh()
  } catch (e: any) {
    delModal.error = e.data?.message || 'Falsches Passwort'
  } finally {
    delModal.loading = false
  }
}
</script>

<style scoped>
.status-chip {
  font-size: 0.65rem; font-weight: 700;
  padding: 0.2rem 0.6rem; border-radius: 9999px;
  text-transform: uppercase; letter-spacing: 0.05em;
  white-space: nowrap;
}
.status-chip.lead     { background: rgba(234,179,8,0.15);  color: #fbbf24; }
.status-chip.prospect { background: rgba(59,130,246,0.15); color: #60a5fa; }
.status-chip.customer { background: rgba(122,158,126,0.2); color: #B3EFB2; }
.status-chip.inactive { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.35); }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
