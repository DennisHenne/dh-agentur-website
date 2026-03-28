import matter from 'gray-matter'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const dir = join(process.cwd(), 'content/insights')
  if (!existsSync(dir)) return []

  const files = readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map((file) => {
    const raw = readFileSync(join(dir, file), 'utf-8')
    const { data } = matter(raw)
    return {
      slug: file.replace('.md', ''),
      title: data.title || '',
      status: data.status || 'published',
      date: data.date || '',
      author: data.author || '',
      category: data.category || '',
      aiGenerated: data.aiGenerated || false,
    }
  }).sort((a, b) => (b.date > a.date ? 1 : -1))
})
