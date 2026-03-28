import matter from 'gray-matter'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const filePath = join(process.cwd(), 'content/insights', `${id}.md`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  const raw = readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return { slug: id, ...data, content: content.trim() }
})
