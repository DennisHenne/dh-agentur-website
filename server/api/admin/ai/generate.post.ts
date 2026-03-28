import { getDb } from '../../../database/index'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

interface RssItem { title?: string; summary?: string; link?: string; pubDate?: string }
interface RssFeed { items?: RssItem[] }

async function fetchRssItems(url: string): Promise<RssItem[]> {
  try {
    // Dynamic import to avoid SSR issues
    const Parser = (await import('rss-parser')).default
    const parser = new Parser({ timeout: 8000 })
    const feed: RssFeed = await parser.parseURL(url)
    return (feed.items || []).slice(0, 5)
  } catch {
    return []
  }
}

async function callOpenRouter(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NUXT_PUBLIC_SITE_URL || 'https://dh-agentur.de',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter error: ${res.status} ${err}`)
  }

  const json = await res.json() as any
  return json.choices?.[0]?.message?.content || ''
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöü]/g, c => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c] || c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export default defineEventHandler(async (event) => {
  const db = getDb()
  const settings = db.prepare('SELECT * FROM ai_settings WHERE id = 1').get() as any

  const { overrideModel, manualTopic } = (await readBody(event).catch(() => ({}))) as any

  const apiKey = settings?.openrouter_key
  if (!apiKey) throw createError({ statusCode: 400, message: 'OpenRouter API key not configured' })

  const model = overrideModel || settings?.default_model || 'openai/gpt-4o'
  const lang = settings?.language || 'de'
  const isDE = lang === 'de'

  // 1. Gather context from RSS feeds and topics
  const activeFeeds = db.prepare('SELECT * FROM rss_feeds WHERE active = 1').all() as any[]
  const activeTopics = db.prepare('SELECT topic FROM ai_topics WHERE active = 1').all() as any[]

  const rssSnippets: string[] = []
  for (const feed of activeFeeds.slice(0, 4)) {
    const items = await fetchRssItems(feed.url)
    for (const item of items.slice(0, 3)) {
      if (item.title) rssSnippets.push(`- ${item.title}`)
    }
  }

  const topicList = manualTopic
    ? [manualTopic]
    : activeTopics.map((t: any) => t.topic)

  const context = [
    topicList.length > 0 ? `Topics: ${topicList.join(', ')}` : '',
    rssSnippets.length > 0 ? `Recent news context:\n${rssSnippets.slice(0, 15).join('\n')}` : '',
  ].filter(Boolean).join('\n\n')

  // 2. Generate 10 title candidates + pick best
  const titlesPrompt = isDE
    ? `Generiere exakt 10 Blog-Post-Titel auf Deutsch für eine Digitalagenentur (DH Agentur).
Jeder Titel soll SEO-freundlich, clickbait-frei aber fesselnd sein und zu den Topics passen.
Antworte NUR mit einer JSON-Liste: ["Titel 1", "Titel 2", ..., "Titel 10"]

${context}`
    : `Generate exactly 10 blog post titles in English for a digital agency (DH Agentur).
Each title should be SEO-friendly, non-clickbait but compelling, matching the topics.
Reply ONLY with a JSON array: ["Title 1", "Title 2", ..., "Title 10"]

${context}`

  const titlesRaw = await callOpenRouter(
    apiKey, model,
    isDE ? 'Du bist ein SEO-Experte für eine deutsche Digitalagentur.' : 'You are an SEO expert for a digital agency.',
    titlesPrompt,
  )

  let titles: string[] = []
  try {
    const match = titlesRaw.match(/\[[\s\S]*\]/)
    if (match) titles = JSON.parse(match[0])
  } catch { /* empty */ }

  if (!titles.length) titles = [titlesRaw.trim().split('\n')[0]]

  // 3. Pick the best-ranking title
  const pickPrompt = isDE
    ? `Aus diesen 10 Blog-Titeln, wähle den mit dem höchsten SEO-Rankingpotenzial.
Berücksichtige: Suchvolumen-Relevanz, Longtail-Keywords, Klarheit, Einzigartigkeit.
Antworte NUR mit dem vollständigen ausgewählten Titel, ohne Erklärung.

${titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`
    : `From these 10 blog titles, choose the one with highest SEO ranking potential.
Consider: search volume relevance, longtail keywords, clarity, uniqueness.
Reply ONLY with the full chosen title, no explanation.

${titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`

  const chosenTitle = (await callOpenRouter(
    apiKey, model,
    isDE ? 'Du bist ein SEO-Stratege.' : 'You are an SEO strategist.',
    pickPrompt,
  )).trim().replace(/^["']|["']$/g, '')

  // 4. Generate the full article
  const articlePrompt = isDE
    ? `Schreibe einen vollständigen, SEO-optimierten Blog-Artikel auf Deutsch für den Titel:
"${chosenTitle}"

Anforderungen:
- Mindestens 800 Wörter
- Klare Überschriften (H2, H3)
- Natürliche Keyword-Integration
- Praktische, wertvolle Inhalte
- Keine Quellenangaben oder Links (werden separat hinzugefügt)
- Gib NUR den Markdown-Inhalt zurück (ohne Frontmatter)`
    : `Write a complete, SEO-optimized blog article in English for the title:
"${chosenTitle}"

Requirements:
- At least 800 words
- Clear headings (H2, H3)
- Natural keyword integration
- Practical, valuable content
- No citations or links (added separately)
- Return ONLY the Markdown content (no frontmatter)`

  const articleContent = await callOpenRouter(
    apiKey, model,
    isDE
      ? 'Du bist ein erfahrener Content-Writer und SEO-Experte für digitale Themen auf Deutsch.'
      : 'You are an experienced content writer and SEO expert for digital topics.',
    articlePrompt,
  )

  // 5. Generate SEO metadata
  const seoPrompt = isDE
    ? `Für den Blog-Artikel mit Titel "${chosenTitle}", generiere SEO-Metadaten.
Antworte NUR mit validem JSON:
{
  "metaTitle": "SEO-Titel (max 60 Zeichen)",
  "metaDescription": "SEO-Beschreibung (max 160 Zeichen)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "excerpt": "Kurze Zusammenfassung in 2-3 Sätzen"
}`
    : `For the blog article titled "${chosenTitle}", generate SEO metadata.
Reply ONLY with valid JSON:
{
  "metaTitle": "SEO title (max 60 chars)",
  "metaDescription": "SEO description (max 160 chars)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "excerpt": "Short 2-3 sentence summary"
}`

  const seoRaw = await callOpenRouter(
    apiKey, model,
    'You are an SEO metadata specialist.',
    seoPrompt,
  )

  let seoData: any = {}
  try {
    const jsonMatch = seoRaw.match(/\{[\s\S]*\}/)
    if (jsonMatch) seoData = JSON.parse(jsonMatch[0])
  } catch { /* empty */ }

  // 6. Build and save the markdown file
  const slug = slugify(chosenTitle)
  const today = new Date().toISOString().split('T')[0]
  const dir = join(process.cwd(), 'content/insights')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  // Ensure unique slug
  let finalSlug = slug
  let counter = 1
  while (existsSync(join(dir, `${finalSlug}.md`))) {
    finalSlug = `${slug}-${counter++}`
  }

  const wordCount = articleContent.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const markdown = matter.stringify(articleContent, {
    title: chosenTitle,
    description: seoData.excerpt || seoData.metaDescription || '',
    date: today,
    author: settings?.default_author || 'DH Agentur',
    category: settings?.default_category || 'ai',
    tags: seoData.tags || [],
    readingTime,
    status: 'draft',
    metaTitle: seoData.metaTitle || chosenTitle,
    metaDescription: seoData.metaDescription || '',
    aiGenerated: true,
    image: '',
    citations: [],
  })

  writeFileSync(join(dir, `${finalSlug}.md`), markdown, 'utf-8')

  return {
    slug: finalSlug,
    title: chosenTitle,
    candidates: titles,
    metaTitle: seoData.metaTitle,
    metaDescription: seoData.metaDescription,
    tags: seoData.tags,
    success: true,
  }
})
