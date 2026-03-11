<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-32 pt-40 md:pt-48">
      <div class="container">
        <NuxtLink to="/work" class="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ t('work.backToWork') }}
        </NuxtLink>
        <div class="max-w-3xl">
          <div class="mb-4 flex items-center gap-3">
            <span class="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/60">{{ data.type }}</span>
            <span class="text-xs text-white/30">{{ data.year }}</span>
          </div>
          <h1 class="mb-6 text-5xl font-display font-black text-white md:text-6xl leading-tight">
            {{ data.title }}
          </h1>
          <p class="text-lg text-white/60 leading-relaxed mb-8">{{ data.desc }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in data.tags" :key="tag" class="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Challenge / Solution / Result -->
    <section class="section">
      <div class="container">
        <div class="grid gap-8 md:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-dark-100 p-8">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
              <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="mb-3 font-display font-bold text-white text-lg">{{ t('work.challenge') }}</h2>
            <p class="text-sm text-white/60 leading-relaxed">{{ data.challenge }}</p>
          </div>

          <div class="rounded-2xl border border-white/10 bg-dark-100 p-8">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style="background:rgba(179,239,178,0.12)">
              <svg class="h-5 w-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 class="mb-3 font-display font-bold text-white text-lg">{{ t('work.solution') }}</h2>
            <p class="text-sm text-white/60 leading-relaxed">{{ data.solution }}</p>
          </div>

          <div class="rounded-2xl border border-white/10 bg-dark-100 p-8">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
              <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="mb-3 font-display font-bold text-white text-lg">{{ t('work.result') }}</h2>
            <p class="text-sm text-white/60 leading-relaxed">{{ data.result }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-white">{{ t('work.features') }}</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in data.features" :key="feature.title" class="card">
            <h3 class="mb-2 font-semibold text-white">{{ feature.title }}</h3>
            <p class="text-sm text-white/50">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section v-if="data.stack" class="section">
      <div class="container">
        <h2 class="mb-8 text-2xl font-display font-bold text-white">{{ t('work.techStack') }}</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="tech in data.stack"
            :key="tech"
            class="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="relative overflow-hidden rounded-3xl p-12 text-center md:p-16" style="border:1px solid rgba(122,158,126,0.22); background:linear-gradient(135deg,#31493C 0%,#0c2a35 60%,#001A23 100%)">
          <div class="absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style="background:rgba(179,239,178,0.12)" />
          <div class="relative">
            <h2 class="mb-4 text-3xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Ähnliches Projekt?' : 'Similar project?' }}
            </h2>
            <p class="mb-8 text-white/60">
              {{ locale === 'de' ? 'Lassen Sie uns gemeinsam herausfinden, wie wir Ihre Vision umsetzen können.' : "Let's find out together how we can implement your vision." }}
            </p>
            <NuxtLink to="/contact" class="btn-primary">
              {{ t('work.cta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

defineProps<{
  data: {
    title: string
    type: string
    year: string
    desc: string
    tags: string[]
    color: string
    challenge: string
    solution: string
    result: string
    features: { title: string; desc: string }[]
    stack?: string[]
  }
}>()
</script>

