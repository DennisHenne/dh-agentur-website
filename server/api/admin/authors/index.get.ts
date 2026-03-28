import matter from 'gray-matter'
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const dir = join(process.cwd(), 'content/authors')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const files = readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map((file) => {
    const { data } = matter(readFileSync(join(dir, file), 'utf-8'))
    return { slug: file.replace('.md', ''), ...data }
  })
})
