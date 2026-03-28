import matter from 'gray-matter'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

function buildMarkdown(slug: string, data: Record<string, any>, content: string): string {
  const frontmatter = matter.stringify(content || '', {
    title: data.title,
    titleEn: data.titleEn || '',
    description: data.description || '',
    descriptionEn: data.descriptionEn || '',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || '',
    authorSlug: data.authorSlug || '',
    category: data.category || 'webdev',
    tags: data.tags || [],
    image: data.image || '',
    readingTime: data.readingTime || estimateReadingTime(content),
    status: data.status || 'draft',
    metaTitle: data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    ogImage: data.ogImage || '',
    canonicalUrl: data.canonicalUrl || '',
    aiGenerated: data.aiGenerated || false,
    citations: data.citations || [],
  })
  return frontmatter
}

function estimateReadingTime(content: string): number {
  const words = content?.split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, content, ...meta } = body

  if (!slug || !meta.title) {
    throw createError({ statusCode: 400, message: 'slug and title are required' })
  }

  const dir = join(process.cwd(), 'content/insights')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const filePath = join(dir, `${slug}.md`)
  if (existsSync(filePath)) {
    throw createError({ statusCode: 409, message: 'A post with this slug already exists' })
  }

  const markdown = buildMarkdown(slug, meta, content || '')
  writeFileSync(filePath, markdown, 'utf-8')

  return { slug, success: true }
})
