import matter from 'gray-matter'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const dir = join(process.cwd(), 'content/insights')
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map((file) => {
      const { data } = matter(readFileSync(join(dir, file), 'utf-8'))
      if (data.status !== 'published') return null
      return {
        slug:           file.replace('.md', ''),
        title:          data.title || '',
        titleEn:        data.titleEn || '',
        description:    data.description || '',
        descriptionEn:  data.descriptionEn || '',
        date:           data.date || '',
        author:         data.author || '',
        authorSlug:     data.authorSlug || '',
        category:       data.category || '',
        tags:           data.tags || [],
        image:          data.image || '',
        readingTime:    data.readingTime || 5,
        aiGenerated:    data.aiGenerated || false,
      }
    })
    .filter(Boolean)
    .sort((a, b) => (b!.date > a!.date ? 1 : -1))
})
