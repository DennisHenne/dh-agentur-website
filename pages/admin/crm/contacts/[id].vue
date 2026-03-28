<template>
  <div class="admin-page">
    <!-- ── Header ─────────────────────────────────────────────────────────── -->
    <div class="admin-header">
      <div>
        <NuxtLink to="/admin/crm/contacts" class="text-xs mb-1 flex items-center gap-1" style="color:rgba(255,255,255,0.4);">
          ← Kontakte
        </NuxtLink>
        <h1 class="admin-title flex items-center gap-3">
          {{ contact.name }}
          <span class="crm-status" :class="contact.status">{{ statusLabel(contact.status) }}</span>
        </h1>
        <p v-if="contact.company" class="admin-subtitle">{{ contact.company }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="admin-btn-ghost text-xs flex items-center gap-1.5" :class="{ 'opacity-50': syncing }" @click="syncToNextcloud">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          {{ syncing ? 'Sync …' : 'Nextcloud' }}
        </button>
        <button class="admin-btn-ghost text-xs" style="color:#ef4444;" @click="deleteContact">Löschen</button>
        <button :disabled="saving" class="admin-btn-primary text-sm" @click="saveContact">
          {{ saving ? 'Speichert …' : 'Speichern' }}
        </button>
      </div>
    </div>

    <div v-if="contact.nextcloud_synced" class="mb-4 text-xs px-3 py-2 rounded-lg flex items-center gap-2" style="background:rgba(122,158,126,0.1);color:#B3EFB2;border:1px solid rgba(122,158,126,0.2);">
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      Zuletzt in Nextcloud: {{ formatDate(contact.nextcloud_synced) }}
    </div>

    <div class="grid lg:grid-cols-5 gap-6">

      <!-- ── Left: Contact form + Time tracking ───────────────────────────── -->
      <div class="lg:col-span-2 space-y-4">
        <div class="admin-card">
          <h3 class="text-sm font-semibold mb-4" style="color:rgba(255,255,255,0.7);">Kontaktdaten</h3>
          <div class="space-y-3">
            <div><label class="admin-label">Name *</label><input v-model="form.name" type="text" class="admin-input w-full" /></div>
            <div><label class="admin-label">E-Mail</label><input v-model="form.email" type="email" class="admin-input w-full" /></div>
            <div><label class="admin-label">Telefon</label><input v-model="form.phone" type="tel" class="admin-input w-full" /></div>
            <div><label class="admin-label">Firma</label><input v-model="form.company" type="text" class="admin-input w-full" /></div>
            <div><label class="admin-label">Position</label><input v-model="form.position" type="text" class="admin-input w-full" /></div>
            <div><label class="admin-label">Website</label><input v-model="form.website" type="url" class="admin-input w-full" placeholder="https://" /></div>
            <div><label class="admin-label">Adresse</label><input v-model="form.address" type="text" class="admin-input w-full" /></div>
            <div>
              <label class="admin-label">Status</label>
              <select v-model="form.status" class="admin-input w-full">
                <option value="lead">Lead</option>
                <option value="prospect">Interessent</option>
                <option value="customer">Kunde</option>
                <option value="inactive">Inaktiv</option>
              </select>
            </div>
            <div><label class="admin-label">Notizen</label><textarea v-model="form.notes" class="admin-input w-full h-24 resize-none" /></div>
          </div>
        </div>

        <!-- ── Time tracking ─────────────────────────────────────────────── -->
        <div class="admin-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold" style="color:rgba(255,255,255,0.7);">Zeiterfassung</h3>
            <div class="text-lg font-black" style="color:#B3EFB2;">{{ formatDuration(totalMinutes) }}</div>
          </div>
          <div class="mb-4 rounded-xl p-4 text-center" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <div class="text-3xl font-black font-mono mb-3" style="color:#e2e8f0;">{{ stopwatchDisplay }}</div>
            <div class="flex items-center gap-2 justify-center mb-3">
              <button v-if="!timerRunning" class="admin-btn-primary text-xs px-4" @click="startTimer">▶ Start</button>
              <button v-else class="text-xs px-4 py-1.5 rounded-lg border transition-colors" style="color:#fbbf24;border-color:#fbbf24;background:rgba(251,191,36,0.08);" @click="stopTimer">⏹ Stop & Speichern</button>
            </div>
            <input v-if="timerRunning" v-model="timerDescription" type="text" class="admin-input w-full text-sm text-center" placeholder="Woran arbeitest du? …" />
          </div>
          <div class="flex gap-2 mb-4">
            <input v-model="manualDesc" type="text" class="admin-input flex-1 text-sm" placeholder="Manuell: Beschreibung" />
            <input v-model.number="manualMinutes" type="number" min="1" class="admin-input w-16 text-sm" placeholder="min" />
            <button class="admin-btn-ghost text-sm px-3" @click="addManualTime">+</button>
          </div>
          <div class="space-y-1 max-h-64 overflow-y-auto">
            <div
              v-for="entry in timeEntries" :key="entry.id"
              class="group rounded-lg px-3 py-2.5"
              style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);"
            >
              <div class="flex items-center gap-2">
                <span class="text-sm font-mono font-black flex-shrink-0" style="color:#B3EFB2;">{{ formatDuration(entry.duration) }}</span>
                <span class="text-xs flex-1 truncate" style="color:rgba(255,255,255,0.65);">{{ entry.description || '—' }}</span>
                <button class="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-1.5 py-0.5 rounded" style="color:#ef4444;background:rgba(239,68,68,0.1);" @click="deleteTime(entry.id)">Löschen</button>
              </div>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs flex items-center gap-1" style="color:rgba(255,255,255,0.3);">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Arbeitstag: {{ formatDateShort(entry.date) }}
                </span>
                <span class="text-xs flex items-center gap-1" style="color:rgba(255,255,255,0.2);">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Erfasst: {{ formatDateTime(entry.created_at) }}
                </span>
              </div>
            </div>
            <div v-if="!timeEntries.length" class="text-xs text-center py-2" style="color:rgba(255,255,255,0.25);">Noch keine Einträge</div>
          </div>
        </div>

        <!-- ── Kundenordner ──────────────────────────────────────────────── -->
        <div class="admin-card">
          <div class="flex items-center gap-2 mb-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0" style="background:rgba(122,158,126,0.15);border:1px solid rgba(122,158,126,0.2);">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#B3EFB2" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold leading-none" style="color:#e2e8f0;">Kundenordner</p>
              <p class="text-xs mt-0.5" style="color:rgba(255,255,255,0.35);">Link zu Nextcloud, Drive o.ä.</p>
            </div>
          </div>

          <div class="flex gap-2">
            <input
              v-model="form.folder_url"
              type="url"
              class="admin-input flex-1 text-sm"
              placeholder="https://cloud.example.com/s/xyz …"
              @keyup.enter="saveContact"
            />
            <a
              v-if="form.folder_url"
              :href="form.folder_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-shrink-0 transition-all"
              style="background:rgba(122,158,126,0.2);color:#B3EFB2;border:1px solid rgba(122,158,126,0.3);"
              title="Ordner öffnen"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Öffnen
            </a>
            <span
              v-else
              class="flex items-center px-3 py-2 rounded-lg text-xs flex-shrink-0"
              style="background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.07);"
            >Kein Link</span>
          </div>

          <p v-if="form.folder_url" class="mt-2 text-xs truncate" style="color:rgba(255,255,255,0.25);">
            {{ form.folder_url }}
          </p>
        </div>
      </div>

      <!-- ── Right: Activity timeline ──────────────────────────────────────── -->
      <div class="lg:col-span-3">
        <div class="admin-card h-full">
          <h3 class="text-sm font-semibold mb-4" style="color:rgba(255,255,255,0.7);">Aktivitäten</h3>

          <!-- New activity form -->
          <div class="mb-6 rounded-xl p-4" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
            <div class="flex flex-wrap gap-2 mb-3">
              <button
                v-for="t in activityTypes" :key="t.value"
                class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all"
                :style="newAct.type === t.value
                  ? `background:${t.color}20;border-color:${t.color};color:${t.color};`
                  : 'border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.45);'"
                @click="newAct.type = t.value"
              >{{ t.icon }} {{ t.label }}</button>
            </div>
            <input v-model="newAct.title" type="text" class="admin-input w-full mb-2" :placeholder="newActPlaceholder" @keyup.enter="addActivity" />
            <textarea v-model="newAct.description" class="admin-input w-full h-16 resize-none text-sm mb-3" placeholder="Details (optional) …" />
            <div class="flex justify-end">
              <button :disabled="!newAct.title.trim()" class="admin-btn-primary text-sm" @click="addActivity">
                Hinzufügen
              </button>
            </div>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <div v-if="localActivities.length" class="absolute left-3.5 top-2 bottom-0 w-px" style="background:rgba(255,255,255,0.06);" />

            <div class="space-y-3">
              <div
                v-for="(act, idx) in localActivities" :key="act.id"
                class="act-card relative flex gap-3"
                :class="{
                  'act-done': act.status === 'done' || act.status === 'accepted',
                  'act-planning': act.in_planning && act.status === 'active',
                  'act-inactive': act.status === 'inactive',
                  'act-locked': act.locked_at,
                }"
              >
                <!-- Type bubble -->
                <div
                  class="relative z-10 flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-sm mt-0.5"
                  :style="`background:${actColor(act.type)}18;border:1px solid ${actColor(act.type)}35;`"
                >{{ actIcon(act.type) }}</div>

                <!-- Card body -->
                <div class="flex-1 min-w-0 rounded-xl p-3" :class="actCardStyle(act)">

                  <!-- Title row -->
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <div class="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
                      <span
                        class="text-sm font-medium leading-snug"
                        :style="act.status === 'done' || act.status === 'accepted' ? 'color:#B3EFB2;' : 'color:#e2e8f0;'"
                      >{{ act.title }}</span>
                      <!-- Type badge -->
                      <span class="act-badge" :style="`background:${actColor(act.type)}15;color:${actColor(act.type)};`">
                        {{ actLabel(act.type) }}
                      </span>
                      <!-- Status badges -->
                      <span v-if="act.status === 'done'" class="act-badge" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">✓ Erledigt</span>
                      <span v-if="act.status === 'accepted'" class="act-badge" style="background:rgba(122,158,126,0.2);color:#B3EFB2;">✓ Angenommen</span>
                      <span v-if="act.status === 'inactive'" class="act-badge" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);">Deaktiviert</span>
                      <!-- Planning badge -->
                      <span v-if="act.in_planning && act.status === 'active'" class="act-badge" style="background:rgba(234,179,8,0.15);color:#fbbf24;">⏳ In Planung</span>
                    </div>

                    <!-- Lock indicator (top-right) -->
                    <span v-if="act.locked_at" class="flex-shrink-0 text-base" title="Gesperrt">🔒</span>
                  </div>

                  <!-- Inline edit form -->
                  <div v-if="editingId === act.id && !act.locked_at" class="mt-2 mb-3 space-y-2">
                    <div class="flex flex-wrap gap-1 mb-2">
                      <button
                        v-for="t in activityTypes" :key="t.value"
                        class="text-xs px-2 py-1 rounded-full border transition-all"
                        :style="editForm.type === t.value
                          ? `background:${t.color}20;border-color:${t.color};color:${t.color};`
                          : 'border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.4);'"
                        @click="editForm.type = t.value"
                      >{{ t.icon }} {{ t.label }}</button>
                    </div>
                    <input v-model="editForm.title" type="text" class="admin-input w-full text-sm" placeholder="Titel" />
                    <textarea v-model="editForm.description" class="admin-input w-full h-16 resize-none text-sm" placeholder="Beschreibung …" />
                    <div class="flex items-center gap-2">
                      <label class="flex items-center gap-1.5 text-xs cursor-pointer" style="color:rgba(255,255,255,0.5);">
                        <input v-model="editForm.in_planning" type="checkbox" class="rounded" /> In Planung
                      </label>
                      <div class="ml-auto flex gap-2">
                        <button class="text-xs px-3 py-1 rounded-lg" style="color:rgba(255,255,255,0.4);" @click="editingId = null">Abbrechen</button>
                        <button class="text-xs px-3 py-1 rounded-lg" style="background:rgba(122,158,126,0.2);color:#B3EFB2;" @click="saveEdit(act)">Speichern</button>
                      </div>
                    </div>
                  </div>

                  <!-- Description (not in edit mode) -->
                  <p v-else-if="act.description" class="text-xs leading-relaxed mb-1" style="color:rgba(255,255,255,0.5);">{{ act.description }}</p>

                  <!-- Lock timestamp -->
                  <div v-if="act.locked_at" class="flex items-center gap-1 text-xs mt-1" style="color:rgba(251,191,36,0.6);">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Gesperrt {{ formatDateTime(act.locked_at) }}
                  </div>

                  <!-- Meta: date + author -->
                  <p class="text-xs mt-1" style="color:rgba(255,255,255,0.25);">
                    {{ formatDateTime(act.created_at) }}<span v-if="act.author"> · {{ act.author }}</span>
                  </p>

                  <!-- ── Action toolbar ─────────────────────────────────────── -->
                  <div class="act-toolbar flex flex-wrap items-center gap-1 mt-2 pt-2" style="border-top:1px solid rgba(255,255,255,0.06);">

                    <!-- Reorder (only unlocked, non-inactive) -->
                    <template v-if="!act.locked_at && act.status !== 'inactive'">
                      <button :disabled="idx === 0" class="act-btn" title="Nach oben" @click="moveUp(idx)">↑</button>
                      <button :disabled="idx === localActivities.length - 1" class="act-btn" title="Nach unten" @click="moveDown(idx)">↓</button>
                      <div class="w-px h-4 mx-0.5" style="background:rgba(255,255,255,0.08);" />
                    </template>

                    <!-- Edit (unlocked + not inactive) -->
                    <button
                      v-if="!act.locked_at && act.status !== 'inactive'"
                      class="act-btn"
                      :style="editingId === act.id ? 'color:#B3EFB2;' : ''"
                      title="Bearbeiten"
                      @click="startEdit(act)"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>

                    <!-- In Planung toggle (active + unlocked) -->
                    <button
                      v-if="act.status === 'active' && !act.locked_at"
                      class="act-btn"
                      :style="act.in_planning ? 'color:#fbbf24;' : ''"
                      title="In Planung umschalten"
                      @click="togglePlanning(act)"
                    >⏳</button>

                    <!-- Complete (task) -->
                    <button
                      v-if="act.type === 'task' && act.status !== 'inactive'"
                      class="act-btn"
                      :style="act.status === 'done' ? 'color:#B3EFB2;' : ''"
                      :title="act.status === 'done' ? 'Als offen markieren' : 'Als erledigt markieren'"
                      @click="toggleDone(act)"
                    >✅</button>

                    <!-- Accept (deal) -->
                    <button
                      v-if="act.type === 'deal' && act.status !== 'inactive'"
                      class="act-btn"
                      :style="act.status === 'accepted' ? 'color:#B3EFB2;' : ''"
                      :title="act.status === 'accepted' ? 'Als offen markieren' : 'Als angenommen markieren'"
                      @click="toggleAccepted(act)"
                    >💰</button>

                    <!-- Lock / Unlock -->
                    <button
                      v-if="act.status !== 'inactive'"
                      class="act-btn"
                      :style="act.locked_at ? 'color:#fbbf24;' : ''"
                      :title="act.locked_at ? 'Entsperren' : 'Sperren (Position festsetzen)'"
                      @click="toggleLock(act)"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="act.locked_at" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <div class="flex-1" />

                    <!-- Deactivate (when active) -->
                    <button
                      v-if="act.status !== 'inactive'"
                      class="act-btn"
                      style="color:rgba(255,255,255,0.3);"
                      title="Deaktivieren (vor dem Löschen erforderlich)"
                      @click="deactivate(act)"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    </button>

                    <!-- Delete (only when inactive) -->
                    <button
                      v-if="act.status === 'inactive'"
                      class="act-btn"
                      style="color:#ef4444;"
                      title="Endgültig löschen"
                      @click="deleteActivity(act.id)"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="!localActivities.length" class="text-center py-8 text-sm" style="color:rgba(255,255,255,0.25);">
                Noch keine Aktivitäten — fange oben an.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Password confirmation modal ──────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="delConfirm.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="cancelDel" />
        <div class="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl" style="background:#0d1c28;border:1px solid rgba(255,255,255,0.1);">
          <!-- Icon -->
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-full" style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#ef4444" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h3 class="text-base font-bold mb-1" style="color:#e2e8f0;">Löschen bestätigen</h3>
          <p class="text-sm mb-5" style="color:rgba(255,255,255,0.45);">
            Bitte gib dein Passwort ein, um den Eintrag endgültig zu löschen.
          </p>

          <input
            ref="pwInput"
            v-model="delConfirm.password"
            type="password"
            class="admin-input w-full mb-3"
            placeholder="Passwort eingeben …"
            autocomplete="current-password"
            @keyup.enter="confirmDel"
          />

          <p v-if="delConfirm.error" class="text-xs mb-3 flex items-center gap-1.5" style="color:#f87171;">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            {{ delConfirm.error }}
          </p>

          <div class="flex gap-3 justify-end">
            <button class="admin-btn-ghost text-sm" @click="cancelDel">Abbrechen</button>
            <button
              class="text-sm px-4 py-2 rounded-lg font-medium transition-opacity"
              style="background:#ef4444;color:#fff;"
              :class="{ 'opacity-50': delConfirm.loading || !delConfirm.password }"
              :disabled="delConfirm.loading || !delConfirm.password"
              @click="confirmDel"
            >
              {{ delConfirm.loading ? 'Prüfe …' : 'Endgültig löschen' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { data: raw, refresh } = await useFetch<any>(`/api/admin/crm/contacts/${id}`)

const contact    = computed(() => raw.value || {})
const timeEntries = computed<any[]>(() => raw.value?.timeEntries || [])
const totalMinutes = computed(() => raw.value?.totalMinutes || 0)

// Keep a local copy of activities for optimistic reordering
const localActivities = ref<any[]>([])
watch(raw, v => { if (v?.activities) localActivities.value = [...v.activities] }, { immediate: true })

// ── Contact form ──────────────────────────────────────────────────────────────
const form = reactive({ name:'', email:'', phone:'', company:'', position:'', address:'', website:'', notes:'', status:'lead', tags:[] as string[], folder_url:'' })
watch(raw, v => {
  if (!v) return
  Object.assign(form, { name:v.name||'', email:v.email||'', phone:v.phone||'', company:v.company||'', position:v.position||'', address:v.address||'', website:v.website||'', notes:v.notes||'', status:v.status||'lead', tags:JSON.parse(v.tags||'[]'), folder_url:v.folder_url||'' })
}, { immediate: true })

const saving = ref(false)
async function saveContact() {
  if (!form.name.trim()) return
  saving.value = true
  try { await $fetch(`/api/admin/crm/contacts/${id}`, { method: 'PUT', body: form }); refresh() }
  finally { saving.value = false }
}
async function deleteContact() {
  requestDel(async () => {
    await $fetch(`/api/admin/crm/contacts/${id}`, { method: 'DELETE' })
    router.push('/admin/crm/contacts')
  })
}

// ── Activity helpers ──────────────────────────────────────────────────────────
const activityTypes = [
  { value:'note',    label:'Notiz',     icon:'📝', color:'#94a3b8' },
  { value:'call',    label:'Anruf',     icon:'📞', color:'#60a5fa' },
  { value:'email',   label:'E-Mail',    icon:'📧', color:'#818cf8' },
  { value:'meeting', label:'Meeting',   icon:'🤝', color:'#34d399' },
  { value:'task',    label:'Aufgabe',   icon:'✅', color:'#fbbf24' },
  { value:'deal',    label:'Deal',      icon:'💰', color:'#B3EFB2' },
]
function actIcon(t: string)  { return activityTypes.find(a => a.value === t)?.icon  || '📝' }
function actColor(t: string) { return activityTypes.find(a => a.value === t)?.color || '#94a3b8' }
function actLabel(t: string) { return activityTypes.find(a => a.value === t)?.label || t }

function actCardStyle(act: any): string {
  if (act.status === 'done' || act.status === 'accepted')
    return 'act-card-done'
  if (act.in_planning && act.status === 'active')
    return 'act-card-planning'
  if (act.status === 'inactive')
    return 'act-card-inactive'
  return 'act-card-default'
}

// ── New activity ──────────────────────────────────────────────────────────────
const newAct = reactive({ type: 'note', title: '', description: '' })
const newActPlaceholder = computed(() => ({
  note:'Notiz …', call:'Anruf besprochen …', email:'E-Mail: Betreff …',
  meeting:'Meeting zu …', task:'Aufgabe: …', deal:'Angebot / Deal …',
}[newAct.type] || 'Aktivität …'))

async function addActivity() {
  if (!newAct.title.trim()) return
  await $fetch('/api/admin/crm/activities', { method: 'POST', body: { contact_id: id, ...newAct } })
  newAct.title = ''; newAct.description = ''
  refresh()
}

// ── Edit ──────────────────────────────────────────────────────────────────────
const editingId = ref<number | null>(null)
const editForm = reactive({ type: 'note', title: '', description: '', in_planning: false })

function startEdit(act: any) {
  if (editingId.value === act.id) { editingId.value = null; return }
  editingId.value = act.id
  Object.assign(editForm, { type: act.type, title: act.title, description: act.description || '', in_planning: !!act.in_planning })
}

async function saveEdit(act: any) {
  await patchActivity(act.id, { type: editForm.type, title: editForm.title, description: editForm.description, in_planning: editForm.in_planning })
  editingId.value = null
}

// ── Status actions ────────────────────────────────────────────────────────────
async function toggleDone(act: any) {
  await patchActivity(act.id, { status: act.status === 'done' ? 'active' : 'done' })
}
async function toggleAccepted(act: any) {
  await patchActivity(act.id, { status: act.status === 'accepted' ? 'active' : 'accepted' })
}
async function togglePlanning(act: any) {
  await patchActivity(act.id, { in_planning: !act.in_planning })
}
async function toggleLock(act: any) {
  await patchActivity(act.id, { locked: !act.locked_at })
}
async function deactivate(act: any) {
  if (!confirm('Aktivität deaktivieren? Sie kann danach gelöscht werden.')) return
  await patchActivity(act.id, { status: 'inactive' })
}
async function deleteActivity(actId: number) {
  requestDel(async () => {
    await $fetch(`/api/admin/crm/activities/${actId}`, { method: 'DELETE' })
    localActivities.value = localActivities.value.filter(a => a.id !== actId)
    refresh()
  })
}

// ── Reorder ───────────────────────────────────────────────────────────────────
async function moveUp(idx: number) {
  if (idx === 0) return
  await swapActivities(idx, idx - 1)
}
async function moveDown(idx: number) {
  if (idx >= localActivities.value.length - 1) return
  await swapActivities(idx, idx + 1)
}

async function swapActivities(i: number, j: number) {
  const arr = [...localActivities.value]
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
  // Assign sequential sort_orders
  const updates = arr.map((a, k) => ({ id: a.id, sort_order: k }))
  localActivities.value = arr.map((a, k) => ({ ...a, sort_order: k }))
  await Promise.all(updates.map(u =>
    $fetch(`/api/admin/crm/activities/${u.id}`, { method: 'PUT', body: { sort_order: u.sort_order } })
  ))
}

// Optimistic patch + refresh
async function patchActivity(actId: number, patch: Record<string, any>) {
  localActivities.value = localActivities.value.map(a => a.id === actId ? { ...a, ...patch } : a)
  await $fetch(`/api/admin/crm/activities/${actId}`, { method: 'PUT', body: patch })
  refresh()
}

// ── Time tracking ─────────────────────────────────────────────────────────────
const timerRunning = ref(false)
const timerStart = ref(0)
const timerElapsed = ref(0)
const timerDescription = ref('')
const manualDesc = ref('')
const manualMinutes = ref<number | null>(null)
let timerInterval: ReturnType<typeof setInterval> | null = null

const stopwatchDisplay = computed(() => {
  const s = Math.floor(timerElapsed.value / 1000)
  return `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
})

function startTimer() {
  timerStart.value = Date.now() - timerElapsed.value
  timerRunning.value = true
  timerInterval = setInterval(() => { timerElapsed.value = Date.now() - timerStart.value }, 1000)
}
async function stopTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerRunning.value = false
  const minutes = Math.max(1, Math.round(timerElapsed.value / 60000))
  await $fetch('/api/admin/crm/time', { method: 'POST', body: { contact_id: id, duration: minutes, description: timerDescription.value || 'Stoppuhr', date: new Date().toISOString().slice(0,10) } })
  timerElapsed.value = 0; timerDescription.value = ''; refresh()
}
async function addManualTime() {
  if (!manualMinutes.value || manualMinutes.value <= 0) return
  await $fetch('/api/admin/crm/time', { method: 'POST', body: { contact_id: id, duration: manualMinutes.value, description: manualDesc.value, date: new Date().toISOString().slice(0,10) } })
  manualDesc.value = ''; manualMinutes.value = null; refresh()
}
async function deleteTime(timeId: number) {
  requestDel(async () => {
    await $fetch(`/api/admin/crm/time/${timeId}`, { method: 'DELETE' }); refresh()
  })
}
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

// ── Password-confirmed delete ─────────────────────────────────────────────────
const pwInput = ref<HTMLInputElement | null>(null)

const delConfirm = reactive({
  open: false,
  password: '',
  error: '',
  loading: false,
  action: null as (() => Promise<void>) | null,
})

function requestDel(action: () => Promise<void>) {
  delConfirm.open = true
  delConfirm.password = ''
  delConfirm.error = ''
  delConfirm.action = action
  nextTick(() => pwInput.value?.focus())
}

function cancelDel() {
  delConfirm.open = false
  delConfirm.password = ''
  delConfirm.error = ''
  delConfirm.action = null
}

async function confirmDel() {
  if (!delConfirm.password || delConfirm.loading) return
  delConfirm.loading = true
  delConfirm.error = ''
  try {
    await $fetch('/api/admin/auth/verify-password', { method: 'POST', body: { password: delConfirm.password } })
    if (delConfirm.action) await delConfirm.action()
    cancelDel()
  } catch (e: any) {
    delConfirm.error = e.data?.message || 'Falsches Passwort'
  } finally {
    delConfirm.loading = false
  }
}

// ── Nextcloud ─────────────────────────────────────────────────────────────────
const syncing = ref(false)
async function syncToNextcloud() {
  syncing.value = true
  try {
    const r = await $fetch<any>('/api/admin/crm/nextcloud/sync', { method: 'POST', body: { contact_id: id } })
    if (r.failed > 0) alert(`Sync fehlgeschlagen: ${r.errors?.join(', ')}`)
    else alert('Erfolgreich synchronisiert ✓'); refresh()
  } catch (e: any) { alert(`Fehler: ${e.data?.message || e.message}`) }
  finally { syncing.value = false }
}

// ── Formatters ────────────────────────────────────────────────────────────────
function statusLabel(s: string) { return { lead:'Lead', prospect:'Interessent', customer:'Kunde', inactive:'Inaktiv' }[s] || s }
function formatDate(d: string) { return d ? new Date(d).toLocaleDateString('de-AT', { day:'2-digit', month:'short', year:'numeric' }) : '—' }
function formatDateShort(d: string) { return d ? new Date(d).toLocaleDateString('de-AT', { day:'2-digit', month:'short', year:'numeric' }) : '—' }
function formatDateTime(d: string) { if (!d) return '—'; return new Date(d).toLocaleString('de-AT', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) }
function formatDuration(mins: number) { if (!mins) return '0 min'; return mins < 60 ? `${mins} min` : `${Math.floor(mins/60)}h${mins%60>0?' '+(mins%60)+'m':''}` }
</script>

<style scoped>
/* ── Status badge ── */
.crm-status { font-size:0.65rem; font-weight:600; padding:0.15rem 0.5rem; border-radius:9999px; text-transform:uppercase; letter-spacing:0.05em; }
.crm-status.lead     { background:rgba(234,179,8,0.15);  color:#fbbf24; }
.crm-status.prospect { background:rgba(59,130,246,0.15); color:#60a5fa; }
.crm-status.customer { background:rgba(122,158,126,0.2); color:#B3EFB2; }
.crm-status.inactive { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.4); }

/* ── Activity badge ── */
.act-badge { font-size:0.6rem; font-weight:700; padding:0.1rem 0.45rem; border-radius:9999px; text-transform:uppercase; letter-spacing:0.04em; white-space:nowrap; }

/* ── Activity card states ── */
.act-card { padding-bottom: 0.75rem; }

.act-card-default  { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); }
.act-card-done     { background:rgba(122,158,126,0.08); border:1px solid rgba(122,158,126,0.2); border-left:3px solid #7A9E7E; }
.act-card-planning { background:rgba(234,179,8,0.06);  border:1px solid rgba(234,179,8,0.2);   border-left:3px solid #fbbf24; }
.act-card-inactive { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); opacity:0.45; }
.act-card-locked   { /* locked is combined with another state — padlock icon handles it visually */ }

/* ── Action button ── */
.act-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.35rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  transition: color 0.15s, background 0.15s;
}
.act-btn:hover:not(:disabled) { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.08); }
.act-btn:disabled { opacity: 0.2; cursor: not-allowed; }

/* ── Toolbar visibility ── */
.act-toolbar { opacity: 0.4; transition: opacity 0.15s; }
.act-card:hover .act-toolbar { opacity: 1; }

/* ── Modal transition ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
