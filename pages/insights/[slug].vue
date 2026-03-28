<template>
  <div>
    <article v-if="article">
      <!-- Hero -->
      <section class="relative pb-16 pt-36 md:pt-44">
        <div class="container max-w-3xl">
          <NuxtLink
            to="/insights"
            class="mb-8 inline-flex items-center gap-2 text-sm text-dark/50 hover:text-dark transition-colors"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ t('insights.backToInsights') }}
          </NuxtLink>

          <div class="mb-6 flex items-center gap-3 flex-wrap">
            <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600">
              {{ getCategoryLabel(article.category) }}
            </span>
            <span class="text-xs text-dark/45">{{ formatDate(article.date) }}</span>
            <span class="text-xs text-dark/40">{{ article.readingTime }} min {{ locale === 'de' ? 'Lesezeit' : 'read' }}</span>
          </div>

          <h1 class="mb-6 text-4xl font-display font-black text-dark md:text-5xl leading-tight">
            {{ locale === 'en' && article.titleEn ? article.titleEn : article.title }}
          </h1>

          <p class="text-lg text-dark/65 leading-relaxed mb-8">
            {{ locale === 'en' && article.descriptionEn ? article.descriptionEn : article.description }}
          </p>

          <div class="flex items-center gap-3 border-t pt-6" style="border-color:rgba(49,73,60,0.12);">
            <NuxtLink
              v-if="article.authorSlug"
              :to="`/authors/${article.authorSlug}`"
              class="flex items-center gap-3 group"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold flex-shrink-0 transition-opacity group-hover:opacity-80"
                style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;"
              >
                {{ article.author?.[0] }}
              </div>
              <div>
                <div class="text-sm font-semibold text-dark group-hover:text-brand-600 transition-colors">{{ article.author }}</div>
                <div class="text-xs text-dark/45">DH Agentur</div>
              </div>
            </NuxtLink>
            <div v-else class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold flex-shrink-0"
                style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23;"
              >
                {{ article.author?.[0] }}
              </div>
              <div>
                <div class="text-sm font-semibold text-dark">{{ article.author }}</div>
                <div class="text-xs text-dark/45">DH Agentur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured image -->
      <section v-if="article.image" class="pb-8">
        <div class="container max-w-3xl">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full rounded-2xl object-cover"
            style="max-height:420px; border:1px solid rgba(49,73,60,0.1);"
            loading="eager"
          />
        </div>
      </section>

      <!-- Content -->
      <section class="pb-12 sm:pb-16 md:pb-20">
        <div class="container max-w-3xl">
          <div class="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-dark
            prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-dark/70 prose-p:leading-relaxed
            prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-code:text-forest prose-code:bg-brand-500/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-medium
            prose-pre:bg-dark/5 prose-pre:border prose-pre:border-dark/8 prose-pre:rounded-xl
            prose-blockquote:border-brand-500 prose-blockquote:text-dark/60 prose-blockquote:not-italic
            prose-strong:text-dark
            prose-li:text-dark/70
            prose-img:rounded-xl prose-img:shadow-sm
            prose-hr:border-forest/10">
            <!-- API mode: content is pre-rendered HTML -->
            <div v-if="isApiMode" v-html="article.content" />
            <!-- Local/backend mode: let Nuxt Content render the Markdown -->
            <ContentRenderer v-else :value="article" />
          </div>

          <!-- Citations -->
          <div v-if="article.citations?.length" class="mt-10 pt-8" style="border-top:1px solid rgba(49,73,60,0.12);">
            <h4 class="text-xs font-semibold uppercase tracking-widest mb-4" style="color:rgba(0,26,35,0.4);">
              {{ locale === 'de' ? 'Quellen' : 'Sources' }}
            </h4>
            <ol class="space-y-2">
              <li v-for="(cite, i) in article.citations" :key="i" class="flex items-start gap-2 text-sm text-dark/55">
                <span class="flex-shrink-0 font-mono text-xs mt-0.5" style="color:rgba(49,73,60,0.5);">[{{ i + 1 }}]</span>
                <a v-if="cite.url" :href="cite.url" target="_blank" rel="noopener noreferrer"
                  class="text-brand-600 hover:underline transition-colors">
                  {{ cite.title }}
                </a>
                <span v-else>{{ cite.title }}</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section pt-0">
        <div class="container max-w-3xl">
          <div class="rounded-2xl p-8 text-center" style="background:rgba(255,255,255,0.7); border:1px solid rgba(122,158,126,0.25);">
            <h3 class="mb-3 text-xl font-display font-bold text-dark">
              {{ locale === 'de' ? 'Hat Ihnen dieser Artikel geholfen?' : 'Did this article help you?' }}
            </h3>
            <p class="mb-6 text-dark/60">
              {{ locale === 'de'
                ? 'Sprechen Sie uns an — wir helfen Ihnen, diese Konzepte in Ihrem Unternehmen umzusetzen.'
                : "Let's talk — we'll help you implement these concepts in your business." }}
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
      <p class="text-dark/50">{{ t('common.notFound') }}</p>
      <NuxtLink to="/insights" class="btn-primary mt-6">
        {{ t('insights.backToInsights') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

const slugParam = route.params.slug
const slug = typeof slugParam === 'string' ? slugParam : slugParam?.[0] ?? ''

const { data: article } = backendUrl
  ? await useFetch<any>(`${backendUrl}/api/public/insights/${slug}`, { key: `insight-${slug}` })
  : await useAsyncData(`insight-${slug}`, () =>
      slug ? queryContent(`/insights/${slug}`).findOne() : Promise.resolve(null),
    )

// True when content was served via the API (HTML string vs Nuxt Content object)
const isApiMode = computed(() => !!backendUrl)

if (!article.value) {
  throw createError({ statusCode: 404, message: 'Article not found' })
}

const metaTitle = computed(() => {
  if (!article.value) return ''
  const t = locale.value === 'en' && article.value.titleEn ? article.value.titleEn : article.value.title
  return article.value.metaTitle || `${t} — DH Agentur`
})

const metaDesc = computed(() => {
  if (!article.value) return ''
  return article.value.metaDescription
    || (locale.value === 'en' && article.value.descriptionEn ? article.value.descriptionEn : article.value.description)
    || ''
})

useSeoMeta({
  title: metaTitle,
  description: metaDesc,
  ogTitle: metaTitle,
  ogDescription: metaDesc,
  ogImage: computed(() => article.value?.ogImage || article.value?.image || ''),
})

// Article JSON-LD schema
useHead({
  link: [
    article.value?.canonicalUrl
      ? { rel: 'canonical', href: article.value.canonicalUrl }
      : undefined,
  ].filter(Boolean) as any[],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.value?.metaTitle || article.value?.title,
      description: article.value?.metaDescription || article.value?.description,
      datePublished: article.value?.date,
      author: {
        '@type': 'Person',
        name: article.value?.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'DH Agentur',
        url: 'https://dh-agentur.de',
      },
      image: article.value?.ogImage || article.value?.image || undefined,
    }),
  }],
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
