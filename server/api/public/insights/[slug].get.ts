import matter from 'gray-matter'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { marked } from 'marked'

function toHtml(raw: string): string {
  if (!raw || !raw.trim()) return ''
  // TipTap content starts with an HTML tag — return as-is
  if (raw.trim().startsWith('<')) return raw
  // Plain markdown — convert to HTML
  return String(marked(raw, { async: false }))
}

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = join(process.cwd(), 'content/insights', `${slug}.md`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  const { data, content } = matter(readFileSync(filePath, 'utf-8'))

  if (data.status !== 'published') {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return {
    slug,
    title:           data.title || '',
    titleEn:         data.titleEn || '',
    description:     data.description || '',
    descriptionEn:   data.descriptionEn || '',
    date:            data.date || '',
    author:          data.author || '',
    authorSlug:      data.authorSlug || '',
    category:        data.category || '',
    tags:            data.tags || [],
    image:           data.image || '',
    ogImage:         data.ogImage || '',
    canonicalUrl:    data.canonicalUrl || '',
    metaTitle:       data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    readingTime:     data.readingTime || 5,
    aiGenerated:     data.aiGenerated || false,
    citations:       data.citations || [],
    content:         toHtml(content.trim()),
  }
})
