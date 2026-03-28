<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background:linear-gradient(135deg,#061018 0%,#0a1a24 100%);">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="inline-block mb-4 text-2xl font-black tracking-tight" style="color:#B3EFB2;">DH Admin</div>
        <p class="text-sm" style="color:rgba(255,255,255,0.4);">Sign in to your admin panel</p>
      </div>

      <form @submit.prevent="login" class="space-y-4">
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
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: [] })

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Redirect if already logged in
onMounted(async () => {
  const ok = await $fetch('/api/admin/auth/me').catch(() => null)
  if (ok) router.push('/admin/dashboard')
})

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    router.push('/admin/dashboard')
  } catch (e: any) {
    error.value = e?.data?.message || 'Invalid credentials'
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
