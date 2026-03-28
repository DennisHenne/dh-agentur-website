import matter from 'gray-matter'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { marked } from 'marked'

function toHtml(raw: string): string {
  if (!raw || !raw.trim()) return ''
  if (raw.trim().startsWith('<')) return raw
  return String(marked(raw, { async: false }))
}

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const dir = join(process.cwd(), 'content/authors')
  const filePath = join(dir, `${slug}.md`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Author not found' })
  }

  const { data, content } = matter(readFileSync(filePath, 'utf-8'))

  // Fetch published posts by this author
  const insightsDir = join(process.cwd(), 'content/insights')
  const posts = existsSync(insightsDir)
    ? readdirSync(insightsDir)
        .filter(f => f.endsWith('.md'))
        .map((f) => {
          const { data: pd } = matter(readFileSync(join(insightsDir, f), 'utf-8'))
          if (pd.author !== data.name || pd.status !== 'published') return null
          return {
            slug:          f.replace('.md', ''),
            title:         pd.title || '',
            titleEn:       pd.titleEn || '',
            description:   pd.description || '',
            descriptionEn: pd.descriptionEn || '',
            date:          pd.date || '',
            category:      pd.category || '',
            readingTime:   pd.readingTime || 5,
          }
        })
        .filter(Boolean)
        .sort((a, b) => (b!.date > a!.date ? 1 : -1))
    : []

  return {
    slug,
    name:            data.name || '',
    bio:             data.bio || '',
    bioEn:           data.bioEn || '',
    photo:           data.photo || '',
    email:           data.email || '',
    twitter:         data.twitter || '',
    linkedin:        data.linkedin || '',
    metaTitle:       data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    content:         toHtml(content.trim()),
    posts,
  }
})
