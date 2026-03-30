<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background:linear-gradient(135deg,#061018 0%,#0a1a24 100%);">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="inline-block mb-4 text-2xl font-black tracking-tight" style="color:#B3EFB2;">DH Admin</div>
        <p class="text-sm" style="color:rgba(255,255,255,0.4);">
          {{ step === 'credentials' ? 'Sign in to your admin panel' : 'Two-Factor Authentication' }}
        </p>
      </div>

      <!-- Step 1: Email + Password -->
      <form v-if="step === 'credentials'" @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-xs font-medium mb-1.5" style="color:rgba(255,255,255,0.5);">Email</label>
          <input v-model="email" type="email" required autocomplete="email"
            class="admin-input w-full"
            placeholder="admin@dh-agentur.de" />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1.5" style="color:rgba(255,255,255,0.5);">Password</label>
          <input v-model="password" type="password" required autocomplete="current-password"
            class="admin-input w-full"
            placeholder="••••••••" />
        </div>

        <div v-if="error" class="text-sm px-3 py-2 rounded-lg" style="background:rgba(239,68,68,0.1); color:#f87171; border:1px solid rgba(239,68,68,0.2);">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all"
          style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23;">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <!-- Step 2: TOTP code -->
      <form v-else-if="step === 'totp'" @submit.prevent="verifyTotp" class="space-y-4">
        <div class="text-center mb-2">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style="background:rgba(122,158,126,0.15);">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#B3EFB2" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <p class="text-sm" style="color:rgba(255,255,255,0.5);">Enter the 6-digit code from your authenticator app</p>
        </div>

        <div>
          <label class="block text-xs font-medium mb-1.5" style="color:rgba(255,255,255,0.5);">Authentication Code</label>
          <input
            v-model="totpCode"
            ref="totpInput"
            type="text"
            inputmode="numeric"
            pattern="[0-9 ]*"
            maxlength="7"
            required
            autocomplete="one-time-code"
            class="admin-input w-full text-center text-xl tracking-[0.5em] font-mono"
            placeholder="000000"
          />
        </div>

        <div v-if="error" class="text-sm px-3 py-2 rounded-lg" style="background:rgba(239,68,68,0.1); color:#f87171; border:1px solid rgba(239,68,68,0.2);">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all"
          style="background:linear-gradient(135deg,#7A9E7E,#B3EFB2); color:#001A23;">
          {{ loading ? 'Verifying…' : 'Verify' }}
        </button>

        <button type="button" @click="step = 'credentials'; error = ''"
          class="w-full py-2 text-sm transition-colors"
          style="color:rgba(255,255,255,0.3);">
          ← Back to login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: [] })

const router = useRouter()
const email = ref('')
const password = ref('')
const totpCode = ref('')
const error = ref('')
const loading = ref(false)
const step = ref<'credentials' | 'totp'>('credentials')
const totpInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  const ok = await $fetch('/api/admin/auth/me').catch(() => null)
  if (ok) router.push('/admin/dashboard')
})

async function login() {
  error.value = ''
  loading.value = true
  try {
    const res = await $fetch<{ requires2fa?: boolean; success?: boolean }>('/api/admin/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    if (res.requires2fa) {
      step.value = 'totp'
      await nextTick()
      totpInput.value?.focus()
    } else {
      router.push('/admin/dashboard')
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}

async function verifyTotp() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/auth/2fa/verify', {
      method: 'POST',
      body: { code: totpCode.value },
    })
    router.push('/admin/dashboard')
  } catch (e: any) {
    error.value = e?.data?.message || 'Invalid code'
    totpCode.value = ''
    await nextTick()
    totpInput.value?.focus()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-input {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
}
.admin-input:focus { border-color: rgba(122,158,126,0.6); }
.admin-input::placeholder { color: rgba(255,255,255,0.25); }
</style>
