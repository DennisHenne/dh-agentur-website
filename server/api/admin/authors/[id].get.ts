import matter from 'gray-matter'
import { readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const dir = join(process.cwd(), 'content/authors')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const filePath = join(dir, `${id}.md`)
  if (!existsSync(filePath)) {
    // Return empty template for new authors
    return { slug: id, name: '', bio: '', bioEn: '', photo: '', email: '', twitter: '', linkedin: '', metaTitle: '', metaDescription: '', content: '' }
  }

  const { data, content } = matter(readFileSync(filePath, 'utf-8'))
  return { slug: id, ...data, content: content.trim() }
})
