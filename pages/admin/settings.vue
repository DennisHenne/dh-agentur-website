<template>
  <div class="overflow-y-auto" style="height:calc(100vh - 0px);">
    <div class="px-8 py-5 border-b" style="border-color:rgba(255,255,255,0.07);">
      <h1 class="text-xl font-bold text-white">Settings</h1>
      <p class="text-sm mt-1" style="color:rgba(255,255,255,0.4);">Account & security settings</p>
    </div>

    <div class="p-8 max-w-2xl">

      <!-- 2FA Card -->
      <div class="rounded-2xl p-6" style="background:#0a1520; border:1px solid rgba(255,255,255,0.07);">
        <div class="flex items-start justify-between mb-5">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style="background:rgba(122,158,126,0.15);">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#B3EFB2" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h2 class="text-sm font-semibold" style="color:#e2e8f0;">Two-Factor Authentication</h2>
              <p class="text-xs mt-0.5" style="color:rgba(255,255,255,0.4);">Protect your account with an authenticator app</p>
            </div>
          </div>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0" :style="twoFAEnabled ? 'background:rgba(122,158,126,0.15); color:#B3EFB2;' : 'background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.4);'">
            {{ twoFAEnabled ? 'Aktiv' : 'Inaktiv' }}
          </span>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.06);" class="pt-5">

          <!-- ── 2FA ACTIVE: show disable form ── -->
          <template v-if="twoFAEnabled">
            <p class="text-sm mb-4" style="color:rgba(255,255,255,0.5);">
              2FA ist aktiv. Bei jedem Login wird ein Code aus deiner Authenticator-App verlangt.
            </p>

            <div class="rounded-xl p-4 space-y-3" style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15);">
              <p class="text-xs font-medium" style="color:#f87171;">2FA deaktivieren</p>
              <p class="text-xs" style="color:rgba(255,255,255,0.4);">Gib dein Passwort ein um die Zwei-Faktor-Authentifizierung zu deaktivieren:</p>
              <input
                v-model="disablePassword"
                type="password"
                placeholder="Passwort eingeben"
                class="settings-input w-full"
                @keyup.enter="disable2FA"
              />
              <div v-if="disableError" class="text-xs px-3 py-2 rounded-lg" style="background:rgba(239,68,68,0.1); color:#f87171; border:1px solid rgba(239,68,68,0.2);">
                {{ disableError }}
              </div>
              <button @click="disable2FA" :disabled="disableLoading || !disablePassword" class="action-btn danger-btn">
                {{ disableLoading ? 'Wird deaktiviert…' : '2FA deaktivieren' }}
              </button>
            </div>
          </template>

          <!-- ── 2FA INACTIVE: setup flow ── -->
          <template v-else>

            <!-- Step: idle -->
            <template v-if="setupStep === 'idle'">
              <p class="text-sm mb-4" style="color:rgba(255,255,255,0.5);">
                Füge eine zusätzliche Sicherheitsebene hinzu. Du benötigst Google Authenticator, Authy oder eine andere TOTP-App.
              </p>
              <button @click="startSetup" :disabled="setupLoading" class="action-btn primary-btn">
                {{ setupLoading ? 'Wird generiert…' : '2FA einrichten' }}
              </button>
              <div v-if="setupError" class="mt-3 text-xs px-3 py-2 rounded-lg" style="background:rgba(239,68,68,0.1); color:#f87171; border:1px solid rgba(239,68,68,0.2);">
                {{ setupError }}
              </div>
            </template>

            <!-- Step: scan QR code -->
            <template v-else-if="setupStep === 'scan'">
              <p class="text-sm mb-5" style="color:rgba(255,255,255,0.5);">
                Scanne den QR-Code mit deiner Authenticator-App und gib danach den 6-stelligen Code zur Bestätigung ein.
              </p>

              <div class="flex flex-col sm:flex-row gap-5 mb-6">
                <!-- QR Code -->
                <div class="flex-shrink-0 flex items-center justify-center">
                  <div class="p-3 rounded-xl" style="background:#fff;">
                    <canvas ref="qrCanvas" width="160" height="160" />
                  </div>
                </div>

                <!-- Secret key -->
                <div class="flex-1 flex flex-col justify-center gap-2">
                  <p class="text-xs" style="color:rgba(255,255,255,0.4);">Oder manuell den Key eingeben:</p>
                  <div class="flex items-center gap-2">
                    <code class="flex-1 text-xs px-3 py-2 rounded-lg font-mono break-all" style="background:rgba(255,255,255,0.06); color:#B3EFB2;">{{ totpSecret }}</code>
                    <button @click="copySecret" class="flex-shrink-0 text-xs px-3 py-2 rounded-lg transition-colors" style="background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.5);" title="Kopieren">
                      {{ copied ? '✓' : 'Kopieren' }}
                    </button>
                  </div>
                  <p class="text-xs" style="color:rgba(255,255,255,0.3);">
                    Issuer: <span style="color:rgba(255,255,255,0.5);">DH Admin</span> · SHA1 · 6 Stellen · 30s
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <label class="block text-xs font-medium" style="color:rgba(255,255,255,0.5);">Bestätigungscode aus der App:</label>
                <input
                  v-model="confirmCode"
                  ref="confirmInput"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9 ]*"
                  maxlength="7"
                  placeholder="000000"
                  class="settings-input w-full text-center text-lg tracking-[0.4em] font-mono"
                  @keyup.enter="confirmSetup"
                />
                <div v-if="setupError" class="text-xs px-3 py-2 rounded-lg" style="background:rgba(239,68,68,0.1); color:#f87171; border:1px solid rgba(239,68,68,0.2);">
                  {{ setupError }}
                </div>
                <div class="flex gap-2">
                  <button @click="confirmSetup" :disabled="setupLoading || !confirmCode" class="action-btn primary-btn">
                    {{ setupLoading ? 'Wird verifiziert…' : '2FA aktivieren' }}
                  </button>
                  <button @click="cancelSetup" class="action-btn secondary-btn">Abbrechen</button>
                </div>
              </div>
            </template>

          </template>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const twoFAEnabled = ref(false)

const disablePassword = ref('')
const disableError = ref('')
const disableLoading = ref(false)

const setupStep = ref<'idle' | 'scan'>('idle')
const setupLoading = ref(false)
const setupError = ref('')
const totpSecret = ref('')
const totpUri = ref('')
const confirmCode = ref('')
const copied = ref(false)

const qrCanvas = ref<HTMLCanvasElement | null>(null)
const confirmInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  const res = await $fetch<{ enabled: boolean }>('/api/admin/auth/2fa/status').catch(() => null)
  twoFAEnabled.value = res?.enabled ?? false
})

async function renderQR(uri: string) {
  await nextTick()
  if (!qrCanvas.value) return
  try {
    const { default: QRCode } = await import('qrcode')
    await QRCode.toCanvas(qrCanvas.value, uri, { width: 160, margin: 2, color: { dark: '#000', light: '#fff' } })
  } catch (e) {
    console.error('QR render failed', e)
  }
}

async function startSetup() {
  setupLoading.value = true
  setupError.value = ''
  try {
    const res = await $fetch<{ secret: string; uri: string }>('/api/admin/auth/2fa/setup', { method: 'POST' })
    totpSecret.value = res.secret
    totpUri.value = res.uri
    setupStep.value = 'scan'
    await renderQR(res.uri)
    await nextTick()
    confirmInput.value?.focus()
  } catch (e: any) {
    setupError.value = e?.data?.message || 'Setup fehlgeschlagen'
  } finally {
    setupLoading.value = false
  }
}

async function confirmSetup() {
  if (!confirmCode.value) return
  setupLoading.value = true
  setupError.value = ''
  try {
    await $fetch('/api/admin/auth/2fa/enable', {
      method: 'POST',
      body: { code: confirmCode.value },
    })
    twoFAEnabled.value = true
    setupStep.value = 'idle'
    totpSecret.value = ''
    totpUri.value = ''
    confirmCode.value = ''
  } catch (e: any) {
    setupError.value = e?.data?.message || 'Ungültiger Code, bitte erneut versuchen'
    confirmCode.value = ''
    await nextTick()
    confirmInput.value?.focus()
  } finally {
    setupLoading.value = false
  }
}

function cancelSetup() {
  setupStep.value = 'idle'
  totpSecret.value = ''
  totpUri.value = ''
  confirmCode.value = ''
  setupError.value = ''
}

async function disable2FA() {
  if (!disablePassword.value) return
  disableLoading.value = true
  disableError.value = ''
  try {
    await $fetch('/api/admin/auth/2fa/disable', {
      method: 'POST',
      body: { password: disablePassword.value },
    })
    twoFAEnabled.value = false
    disablePassword.value = ''
  } catch (e: any) {
    disableError.value = e?.data?.message || '2FA konnte nicht deaktiviert werden'
  } finally {
    disableLoading.value = false
  }
}

async function copySecret() {
  await navigator.clipboard.writeText(totpSecret.value).catch(() => {})
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.settings-input {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
}
.settings-input:focus { border-color: rgba(122,158,126,0.6); }
.settings-input::placeholder { color: rgba(255,255,255,0.25); }

.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;
  border: none;
}
.action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.primary-btn {
  background: linear-gradient(135deg, #7A9E7E, #B3EFB2);
  color: #001A23;
}
.primary-btn:hover:not(:disabled) { opacity: 0.9; }

.danger-btn {
  background: rgba(239,68,68,0.12);
  color: #f87171;
  border: 1px solid rgba(239,68,68,0.25);
}
.danger-btn:hover:not(:disabled) { background: rgba(239,68,68,0.2); }

.secondary-btn {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.5);
}
.secondary-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
</style>
