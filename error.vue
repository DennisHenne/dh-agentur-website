<template>
  <NuxtLayout>
    <div class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div class="mb-6 text-8xl font-display font-black text-white/10">{{ error?.statusCode }}</div>
      <h1 class="mb-4 text-3xl font-display font-bold text-white">
        {{ error?.statusCode === 404 ? t('common.notFound') : 'Etwas ist schiefgelaufen' }}
      </h1>
      <p class="mb-8 text-white/60">
        {{ error?.statusCode === 404 ? t('common.notFoundText') : error?.message }}
      </p>
      <button class="btn-primary" @click="handleError">
        {{ t('common.backHome') }}
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{ error: { statusCode: number; message: string } | null }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
