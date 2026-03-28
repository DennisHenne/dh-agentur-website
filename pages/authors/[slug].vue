<template>
  <div v-if="author">
    <!-- Hero -->
    <section class="relative pb-16 pt-36 md:pt-44">
      <div class="container max-w-4xl">
        <NuxtLink
          to="/insights"
          class="mb-8 inline-flex items-center gap-2 text-sm text-dark/50 hover:text-dark transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ locale === 'de' ? 'Zurück zu Insights' : 'Back to Insights' }}
        </NuxtLink>

        <div class="flex flex-col sm:flex-row items-start gap-8">
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <img
              v-if="author.photo"
              :src="author.photo"
              :alt="author.name"
              class="h-28 w-28 rounded-2xl object-cover"
              style="border:1px solid rgba(122,158,126,0.25); box-shadow:0 4px 24px rgba(0,26,35,0.08);"
            />
            <div
              v-else
              class="h-28 w-28 rounded-2xl flex items-center justify-center text-4xl font-black"
              style="background:linear-gradient(135deg,#B3EFB2,#7A9E7E); color:#001A23; box-shadow:0 4px 24px rgba(0,26,35,0.08);"
            >
              {{ author.name?.[0] }}
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1">
            <UiBadge class="mb-3">{{ locale === 'de' ? 'Autor' : 'Author' }}</UiBadge>
            <h1 class="text-3xl md:text-4xl font-display font-black text-dark mb-3">{{ author.name }}</h1>
            <p class="text-dark/65 text-lg leading-relaxed max-w-lg">
              {{ locale === 'en' && author.bioEn ? author.bioEn : author.bio }}
            </p>
            <div class="flex items-center gap-4 mt-5">
              <a
                v-if="author.twitter"
                :href="`https://twitter.com/${author.twitter.replace('@','')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-dark/50 hover:text-dark transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.265 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                {{ author.twitter }}
              </a>
              <a
                v-if="author.linkedin"
                :href="author.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-dark/50 hover:text-dark transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Extended bio (rich content) -->
    <section v-if="author.body || (isApiMode && author.content)" class="pb-12">
      <div class="container max-w-3xl">
        <div class="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:font-bold prose-headings:text-dark
          prose-p:text-dark/70 prose-p:leading-relaxed
          prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-dark
          prose-li:text-dark/70">
          <div v-if="isApiMode" v-html="author.content" />
          <ContentRenderer v-else :value="author" />
        </div>
      </div>
    </section>

    <!-- Author's posts -->
    <section class="section pt-0">
      <div class="container max-w-4xl">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="text-2xl font-display font-bold text-dark">
            {{ locale === 'de' ? `Beiträge von ${author.name}` : `Posts by ${author.name}` }}
          </h2>
          <span class="text-sm text-dark/45">{{ authorPosts?.length || 0 }} {{ locale === 'de' ? 'Artikel' : 'articles' }}</span>
        </div>

        <div v-if="authorPosts?.length" class="grid sm:grid-cols-2 gap-6">
          <NuxtLink
            v-for="post in authorPosts"
            :key="post._path || post.slug"
            :to="post._path || `/insights/${post.slug}`"
            class="group card flex flex-col gap-3"
          >
            <div class="flex items-center gap-2 flex-wrap">
              <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600">
                {{ post.category }}
              </span>
              <span class="text-xs text-dark/45">{{ post.date }}</span>
            </div>
            <h3 class="font-display font-bold text-dark leading-snug group-hover:text-brand-600 transition-colors">
              {{ locale === 'en' && post.titleEn ? post.titleEn : post.title }}
            </h3>
            <p class="text-sm text-dark/60 leading-relaxed line-clamp-2">
              {{ locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description }}
            </p>
            <div class="text-xs text-dark/40 mt-auto">{{ post.readingTime }} min {{ locale === 'de' ? 'Lesezeit' : 'read' }}</div>
          </NuxtLink>
        </div>

        <p v-else class="text-dark/50 text-sm py-8">
          {{ locale === 'de' ? 'Noch keine Beiträge veröffentlicht.' : 'No posts published yet.' }}
        </p>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="container py-32 text-center">
    <p class="text-dark/50">{{ locale === 'de' ? 'Autor nicht gefunden.' : 'Author not found.' }}</p>
    <NuxtLink to="/insights" class="btn-primary mt-6">
      {{ locale === 'de' ? 'Zurück zu Insights' : 'Back to Insights' }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl
const slug = route.params.slug as string

// In API mode the backend returns author + posts in one call.
// In local mode we make two separate queryContent calls.
const { data: author } = backendUrl
  ? await useFetch<any>(`${backendUrl}/api/public/authors/${slug}`, { key: `author-${slug}` })
  : await useAsyncData(`author-${slug}`, () =>
      queryContent(`/authors/${slug}`).findOne().catch(() => null),
    )

const { data: authorPosts } = backendUrl
  ? { data: computed(() => author.value?.posts || []) }
  : await useAsyncData(`author-posts-${slug}`, () =>
      author.value?.name
        ? queryContent('/insights').where({ author: author.value.name }).sort({ date: -1 }).find().catch(() => [])
        : Promise.resolve([]),
    )

const isApiMode = computed(() => !!backendUrl)

if (!author.value) {
  throw createError({ statusCode: 404, message: 'Author not found' })
}

useSeoMeta({
  title: computed(() => `${author.value?.name || ''} — DH Agentur`),
  description: computed(() => author.value?.metaDescription || author.value?.bio || ''),
  ogTitle: computed(() => `${author.value?.name || ''} — DH Agentur`),
  ogDescription: computed(() => author.value?.bio || ''),
})

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.value?.name,
      image: author.value?.photo,
      description: author.value?.bio,
      sameAs: [author.value?.twitter, author.value?.linkedin].filter(Boolean),
    }),
  }],
})
</script>
