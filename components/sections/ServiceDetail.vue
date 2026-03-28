<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-32 pt-40 md:pt-48">
      <div class="container">
        <NuxtLink to="/services" class="mb-8 inline-flex items-center gap-2 text-sm text-dark/50 hover:text-dark transition-colors">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ t('services.backToServices') }}
        </NuxtLink>
        <div class="max-w-3xl">
          <UiBadge class="mb-4">{{ data.label }}</UiBadge>
          <h1 class="mb-6 text-5xl font-display font-black leading-tight text-dark md:text-6xl">
            {{ data.title }}
            <span class="gradient-text block">{{ data.outcome }}</span>
          </h1>
          <p class="text-lg text-dark/60 leading-relaxed mb-10">{{ data.heroDesc }}</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/contact" class="btn-primary">
              {{ t('services.cta') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- For whom / Problems -->
    <section class="section">
      <div class="container grid gap-12 lg:grid-cols-2">
        <!-- For whom -->
        <div>
          <h2 class="mb-6 text-2xl font-display font-bold text-dark">{{ t('services.forWhom') }}</h2>
          <ul class="space-y-3">
            <li
              v-for="item in data.forWhom"
              :key="item"
              class="flex items-start gap-3 text-dark/60"
            >
              <span class="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs" style="background:rgba(49,73,60,0.12); color:#31493C;">✓</span>
              <span class="text-sm">{{ item }}</span>
            </li>
          </ul>
        </div>
        <!-- Problems -->
        <div>
          <h2 class="mb-6 text-2xl font-display font-bold text-dark">{{ t('services.problems') }}</h2>
          <ul class="space-y-3">
            <li
              v-for="item in data.problems"
              :key="item"
              class="flex items-start gap-3 text-dark/60"
            >
              <span class="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">×</span>
              <span class="text-sm">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Deliverables -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-dark">{{ t('services.deliverables') }}</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in data.deliverables"
            :key="item.title"
            class="card"
          >
            <h3 class="mb-2 font-semibold text-dark">{{ item.title }}</h3>
            <p class="text-sm text-dark/50">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section">
      <div class="container">
        <h2 class="mb-10 text-2xl font-display font-bold text-dark">{{ t('services.process') }}</h2>
        <div class="relative">
          <!-- Connector line -->
          <div class="absolute left-5 top-0 h-full w-px lg:hidden" style="background:linear-gradient(to bottom, rgba(122,158,126,0.5), transparent)" />
          <div class="space-y-8">
            <div
              v-for="(step, i) in data.process"
              :key="step.title"
              class="flex items-start gap-6"
            >
              <div class="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-500/50 bg-brand-500/10 text-sm font-bold text-brand-400">
                {{ i + 1 }}
              </div>
              <div>
                <h3 class="mb-1 font-semibold text-dark">{{ step.title }}</h3>
                <p class="text-sm text-dark/50">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container max-w-3xl">
        <h2 class="mb-10 text-2xl font-display font-bold text-dark">{{ t('services.faqTitle') }}</h2>
        <UiFaqAccordion :items="data.faq" />
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="relative overflow-hidden rounded-3xl p-12 text-center md:p-16" style="border:1px solid rgba(122,158,126,0.22); background:linear-gradient(135deg,#31493C 0%,#0c2a35 60%,#001A23 100%)">
          <div class="absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style="background:rgba(179,239,178,0.12)" />
          <div class="relative">
            <h2 class="mb-4 text-3xl font-display font-bold text-white md:text-4xl">
              {{ data.ctaTitle }}
            </h2>
            <p class="mb-8 text-white/60">{{ data.ctaDesc }}</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NuxtLink to="/contact" class="btn-primary">
                {{ t('services.cta') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  data: {
    label: string
    title: string
    outcome: string
    heroDesc: string
    forWhom: string[]
    problems: string[]
    deliverables: { title: string; desc: string }[]
    process: { title: string; desc: string }[]
    faq: { question: string; answer: string }[]
    ctaTitle: string
    ctaDesc: string
  }
}>()
</script>

