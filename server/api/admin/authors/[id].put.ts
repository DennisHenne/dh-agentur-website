import matter from 'gray-matter'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { content, ...meta } = body

  const dir = join(process.cwd(), 'content/authors')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const markdown = matter.stringify(content || '', {
    name: meta.name || '',
    slug: id,
    bio: meta.bio || '',
    bioEn: meta.bioEn || '',
    photo: meta.photo || '',
    email: meta.email || '',
    twitter: meta.twitter || '',
    linkedin: meta.linkedin || '',
    metaTitle: meta.metaTitle || '',
    metaDescription: meta.metaDescription || '',
  })

  writeFileSync(join(dir, `${id}.md`), markdown, 'utf-8')
  return { slug: id, success: true }
})
