<template>
  <div>
    <article v-if="article">
      <!-- Hero -->
      <section class="relative pb-24 pt-36 md:pt-44">
        <div class="container max-w-3xl">
          <NuxtLink to="/insights" class="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ t('insights.backToInsights') }}
          </NuxtLink>

          <div class="mb-6 flex items-center gap-3 flex-wrap">
            <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
              {{ getCategoryLabel(article.category) }}
            </span>
            <span class="text-xs text-white/40">{{ formatDate(article.date) }}</span>
            <span class="text-xs text-white/30">{{ article.readingTime }} min {{ locale === 'de' ? 'Lesezeit' : 'read' }}</span>
          </div>

          <h1 class="mb-6 text-4xl font-display font-black text-white md:text-5xl leading-tight">
            {{ locale === 'en' && article.titleEn ? article.titleEn : article.title }}
          </h1>

          <p class="text-lg text-white/60 leading-relaxed mb-8">
            {{ locale === 'en' && article.descriptionEn ? article.descriptionEn : article.description }}
          </p>

          <div class="flex items-center gap-3 border-t border-white/10 pt-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;">
              {{ article.author?.[0] }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ article.author }}</div>
              <div class="text-xs text-white/40">DH Agentur</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section">
        <div class="container max-w-3xl">
          <div class="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-white/70 prose-p:leading-relaxed
            prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
            prose-code:text-brand-300 prose-code:bg-white/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
            prose-pre:bg-dark-100 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-brand-500 prose-blockquote:text-white/60
            prose-strong:text-white
            prose-li:text-white/70">
            <ContentRenderer :value="article" />
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section">
        <div class="container max-w-3xl">
          <div class="rounded-2xl border border-white/10 bg-dark-100 p-8 text-center">
            <h3 class="mb-3 text-xl font-display font-bold text-white">
              {{ locale === 'de' ? 'Hat Ihnen dieser Artikel geholfen?' : 'Did this article help you?' }}
            </h3>
            <p class="mb-6 text-white/60">
              {{ locale === 'de' ? 'Sprechen Sie uns an — wir helfen Ihnen, diese Konzepte in Ihrem Unternehmen umzusetzen.' : "Let's talk — we'll help you implement these concepts in your business." }}
            </p>
            <NuxtLink to="/contact" class="btn-primary">
              {{ t('common.getInTouch') }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </article>

    <!-- 404 state -->
    <div v-else class="container py-32 text-center">
      <p class="text-white/50">{{ t('common.notFound') }}</p>
      <NuxtLink to="/insights" class="btn-primary mt-6">
        {{ t('insights.backToInsights') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const slugParam = route.params.slug
const slug = typeof slugParam === 'string' ? slugParam : slugParam?.[0] ?? ''

const { data: article } = await useAsyncData(`insight-${slug}`, () =>
  slug
    ? queryContent(`/insights/${slug}`).findOne()
    : Promise.resolve(null),
)

if (!article.value) {
  throw createError({ statusCode: 404, message: 'Article not found' })
}

useSeoMeta({
  title: computed(() => {
    if (!article.value) return ''
    const title = locale.value === 'en' && article.value.titleEn ? article.value.titleEn : article.value.title
    return `${title} — DH Agentur`
  }),
  description: computed(() => {
    if (!article.value) return ''
    return locale.value === 'en' && article.value.descriptionEn ? article.value.descriptionEn : article.value.description
  }),
})

function getCategoryLabel(key: string) {
  const map: Record<string, Record<string, string>> = {
    de: { webdev: 'Webentwicklung', marketing: 'Marketing', ai: 'KI & Automatisierung', strategy: 'Strategie' },
    en: { webdev: 'Web Development', marketing: 'Marketing', ai: 'AI & Automation', strategy: 'Strategy' },
  }
  return map[locale.value]?.[key] || key
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'de' ? 'de-AT' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
