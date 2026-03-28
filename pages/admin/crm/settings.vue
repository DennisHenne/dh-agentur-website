<template>
  <div class="admin-page max-w-xl">
    <div class="admin-header">
      <div>
        <NuxtLink to="/admin/crm" class="text-xs mb-1 flex items-center gap-1" style="color:rgba(255,255,255,0.4);">← CRM</NuxtLink>
        <h1 class="admin-title">Nextcloud Integration</h1>
        <p class="admin-subtitle">Kontakte per CardDAV mit deiner Nextcloud synchronisieren</p>
      </div>
    </div>

    <!-- Connection status -->
    <div
      class="mb-6 flex items-center gap-3 rounded-xl px-4 py-3"
      :style="settings?.configured
        ? 'background:rgba(122,158,126,0.1);border:1px solid rgba(122,158,126,0.25);'
        : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);'"
    >
      <div class="h-2.5 w-2.5 rounded-full flex-shrink-0" :style="settings?.configured ? 'background:#B3EFB2;' : 'background:rgba(255,255,255,0.2);'" />
      <span class="text-sm" :style="settings?.configured ? 'color:#B3EFB2;' : 'color:rgba(255,255,255,0.4);'">
        {{ settings?.configured ? 'Verbunden — Nextcloud ist konfiguriert' : 'Nicht konfiguriert' }}
      </span>
    </div>

    <div class="admin-card space-y-4">
      <div>
        <label class="admin-label">Nextcloud URL</label>
        <input v-model="form.url" type="url" class="admin-input w-full" placeholder="https://cloud.dein-server.de" />
        <p class="text-xs mt-1" style="color:rgba(255,255,255,0.3);">Basis-URL deiner Nextcloud-Instanz</p>
      </div>
      <div>
        <label class="admin-label">Benutzername</label>
        <input v-model="form.username" type="text" class="admin-input w-full" placeholder="admin" />
      </div>
      <div>
        <label class="admin-label">App-Passwort</label>
        <input v-model="form.password" type="password" class="admin-input w-full" placeholder="Neues Passwort eingeben (leer lassen = unveränderter)" />
        <p class="text-xs mt-1" style="color:rgba(255,255,255,0.3);">
          In Nextcloud: Einstellungen → Sicherheit → App-Passwort erstellen.
          Niemals dein Hauptpasswort verwenden.
        </p>
      </div>
      <div>
        <label class="admin-label">Adressbuch-Name</label>
        <input v-model="form.addressbook" type="text" class="admin-input w-full" placeholder="contacts" />
        <p class="text-xs mt-1" style="color:rgba(255,255,255,0.3);">
          Standard: <code class="text-xs px-1 rounded" style="background:rgba(255,255,255,0.07);">contacts</code>.
          Muss in Nextcloud Kontakte bereits existieren.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <input id="auto-sync" v-model="form.auto_sync" type="checkbox" class="rounded" />
        <label for="auto-sync" class="text-sm" style="color:rgba(255,255,255,0.7);">
          Automatisch synchronisieren beim Speichern von Kontakten
        </label>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button
          :disabled="!settings?.configured || syncing"
          class="admin-btn-ghost text-sm flex items-center gap-2"
          @click="syncAll"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          {{ syncing ? 'Synchronisiere …' : 'Alle Kontakte synchronisieren' }}
        </button>
        <button :disabled="saving" class="admin-btn-primary" @click="save">
          {{ saving ? 'Speichert …' : 'Einstellungen speichern' }}
        </button>
      </div>

      <div v-if="syncResult" class="rounded-lg px-4 py-3 text-sm" :style="syncResult.error ? 'background:rgba(239,68,68,0.1);color:#fca5a5;' : 'background:rgba(122,158,126,0.1);color:#B3EFB2;'">
        {{ syncResult.message }}
      </div>
    </div>

    <!-- CardDAV URL info -->
    <div class="admin-card mt-4">
      <h3 class="text-sm font-semibold mb-3" style="color:rgba(255,255,255,0.7);">CardDAV-Endpunkt</h3>
      <p class="text-xs mb-2" style="color:rgba(255,255,255,0.4);">
        Der Sync schreibt Kontakte in folgendes Adressbuch:
      </p>
      <code class="block text-xs p-3 rounded-lg break-all" style="background:rgba(255,255,255,0.05);color:#B3EFB2;">
        {{ cardDavUrl }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: settings, refresh } = await useFetch<any>('/api/admin/crm/nextcloud/settings')

const form = reactive({
  url: '',
  username: '',
  password: '',
  addressbook: 'contacts',
  auto_sync: false,
})

watch(settings, (v) => {
  if (!v) return
  form.url = v.url || ''
  form.username = v.username || ''
  form.addressbook = v.addressbook || 'contacts'
  form.auto_sync = !!v.auto_sync
}, { immediate: true })

const cardDavUrl = computed(() => {
  if (!form.url || !form.username) return '{URL}/remote.php/dav/addressbooks/users/{user}/contacts/'
  return `${form.url.replace(/\/$/, '')}/remote.php/dav/addressbooks/users/${form.username}/${form.addressbook}/`
})

const saving = ref(false)
const syncing = ref(false)
const syncResult = ref<{ message: string; error?: boolean } | null>(null)

async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/crm/nextcloud/settings', { method: 'PUT', body: form })
    refresh()
  } finally {
    saving.value = false
  }
}

async function syncAll() {
  syncing.value = true
  syncResult.value = null
  try {
    const r = await $fetch<any>('/api/admin/crm/nextcloud/sync', { method: 'POST' })
    syncResult.value = {
      message: `${r.synced} Kontakt${r.synced !== 1 ? 'e' : ''} synchronisiert.` + (r.failed > 0 ? ` ${r.failed} fehlgeschlagen: ${r.errors?.join(', ')}` : ''),
      error: r.failed > 0,
    }
  } catch (e: any) {
    syncResult.value = { message: `Fehler: ${e.data?.message || e.message}`, error: true }
  } finally {
    syncing.value = false
  }
}
</script>
