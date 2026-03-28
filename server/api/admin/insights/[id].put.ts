import matter from 'gray-matter'
import { writeFileSync, readFileSync, existsSync, renameSync } from 'fs'
import { join } from 'path'

function estimateReadingTime(content: string): number {
  return Math.max(1, Math.ceil((content?.split(/\s+/).length || 0) / 200))
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const dir = join(process.cwd(), 'content/insights')
  const filePath = join(dir, `${id}.md`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  const body = await readBody(event)
  const { content, newSlug, ...meta } = body

  const existing = matter(readFileSync(filePath, 'utf-8'))
  const merged = { ...existing.data, ...meta }

  const markdown = matter.stringify(content ?? existing.content ?? '', {
    ...merged,
    readingTime: merged.readingTime || estimateReadingTime(content ?? ''),
  })

  const targetSlug = newSlug || id
  const targetPath = join(dir, `${targetSlug}.md`)

  writeFileSync(targetPath, markdown, 'utf-8')

  // Rename file if slug changed
  if (newSlug && newSlug !== id) {
    renameSync(filePath, targetPath)
  }

  return { slug: targetSlug, success: true }
})
