<template>
  <div class="admin-page max-w-2xl">
    <div class="admin-header">
      <div>
        <NuxtLink to="/admin/crm/contacts" class="text-xs mb-1 flex items-center gap-1" style="color:rgba(255,255,255,0.4);">
          ← Kontakte
        </NuxtLink>
        <h1 class="admin-title">Neuer Kontakt</h1>
      </div>
    </div>

    <div class="admin-card">
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="sm:col-span-2">
          <label class="admin-label">Name *</label>
          <input v-model="form.name" type="text" class="admin-input w-full" placeholder="Max Mustermann" />
        </div>
        <div>
          <label class="admin-label">E-Mail</label>
          <input v-model="form.email" type="email" class="admin-input w-full" placeholder="max@firma.de" />
        </div>
        <div>
          <label class="admin-label">Telefon</label>
          <input v-model="form.phone" type="tel" class="admin-input w-full" placeholder="+43 …" />
        </div>
        <div>
          <label class="admin-label">Firma</label>
          <input v-model="form.company" type="text" class="admin-input w-full" />
        </div>
        <div>
          <label class="admin-label">Position</label>
          <input v-model="form.position" type="text" class="admin-input w-full" placeholder="CEO, Marketing …" />
        </div>
        <div class="sm:col-span-2">
          <label class="admin-label">Adresse</label>
          <input v-model="form.address" type="text" class="admin-input w-full" />
        </div>
        <div>
          <label class="admin-label">Website</label>
          <input v-model="form.website" type="url" class="admin-input w-full" placeholder="https://" />
        </div>
        <div>
          <label class="admin-label">Status</label>
          <select v-model="form.status" class="admin-input w-full">
            <option value="lead">Lead</option>
            <option value="prospect">Interessent</option>
            <option value="customer">Kunde</option>
            <option value="inactive">Inaktiv</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="admin-label">Notizen</label>
          <textarea v-model="form.notes" class="admin-input w-full h-24 resize-none" />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <NuxtLink to="/admin/crm/contacts" class="admin-btn-ghost">Abbrechen</NuxtLink>
        <button :disabled="saving || !form.name" class="admin-btn-primary" @click="save">
          {{ saving ? 'Speichert …' : 'Kontakt erstellen' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const router = useRouter()
const saving = ref(false)

const form = reactive({
  name: '', email: '', phone: '', company: '',
  position: '', address: '', website: '',
  notes: '', status: 'lead', tags: [],
})

async function save() {
  if (!form.name.trim()) return
  saving.value = true
  try {
    const result = await $fetch<any>('/api/admin/crm/contacts', { method: 'POST', body: form })
    router.push(`/admin/crm/contacts/${result.id}`)
  } finally {
    saving.value = false
  }
}
</script>
