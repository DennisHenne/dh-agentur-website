<template>
  <div>
    <!-- Hero -->
    <section class="relative pb-32 pt-40 md:pt-48">
      <div class="container text-center max-w-3xl mx-auto">
        <UiBadge class="mb-4">{{ t('insights.pageLabel') }}</UiBadge>
        <h1 class="mb-6 text-5xl font-display font-black text-white md:text-6xl">
          {{ t('insights.pageTitle') }}
        </h1>
        <p class="text-lg text-white/60">{{ t('insights.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="border-t py-6 sticky top-0 z-30 backdrop-blur-xl" style="border-color:rgba(122,158,126,0.18); background:rgba(0,26,35,0.85)">
      <div class="container">
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all"
            :class="activeCategory === cat.key
              ? 'border-brand-500 bg-brand-500/20 text-brand-400'
              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="section">
      <div class="container">
        <div v-if="filteredArticles.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in filteredArticles"
            :key="article._path"
            :to="article._path"
            class="group card flex flex-col gap-4"
          >
            <div class="flex items-center gap-3">
              <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                {{ getCategoryLabel(article.category) }}
              </span>
              <span class="text-xs text-white/30">{{ formatDate(article.date) }}</span>
            </div>
            <div class="flex-1">
              <h3 class="mb-2 font-display font-bold text-white leading-snug group-hover:text-brand-400 transition-colors">
                {{ locale === 'en' && article.titleEn ? article.titleEn : article.title }}
              </h3>
              <p class="text-sm text-white/50 leading-relaxed">
                {{ locale === 'en' && article.descriptionEn ? article.descriptionEn : article.description }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;">
                  {{ article.author?.[0] }}
                </div>
                <span class="text-xs text-white/40">{{ article.author }}</span>
              </div>
              <span class="text-xs text-white/30">{{ article.readingTime }} min</span>
            </div>
          </NuxtLink>
        </div>
        <p v-else class="text-center text-white/50 py-12">
          {{ locale === 'de' ? 'Keine Artikel in dieser Kategorie gefunden.' : 'No articles found in this category.' }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.insights.title'),
  description: t('meta.insights.description'),
})

const activeCategory = ref('all')

const categories = computed(() => [
  { key: 'all', label: t('insights.categories.all') },
  { key: 'webdev', label: t('insights.categories.webdev') },
  { key: 'marketing', label: t('insights.categories.marketing') },
  { key: 'ai', label: t('insights.categories.ai') },
  { key: 'strategy', label: t('insights.categories.strategy') },
])

const { data: articles } = await useAsyncData('insights', () =>
  queryContent('/insights').sort({ date: -1 }).find()
)

const filteredArticles = computed(() => {
  if (!articles.value) return []
  if (activeCategory.value === 'all') return articles.value
  return articles.value.filter((a: any) => a.category === activeCategory.value)
})

function getCategoryLabel(key: string) {
  const map: Record<string, string> = {
    webdev: t('insights.categories.webdev'),
    marketing: t('insights.categories.marketing'),
    ai: t('insights.categories.ai'),
    strategy: t('insights.categories.strategy'),
  }
  return map[key] || key
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'de' ? 'de-AT' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>

