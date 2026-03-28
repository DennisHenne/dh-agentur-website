import { unlinkSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const filePath = join(process.cwd(), 'content/insights', `${id}.md`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  unlinkSync(filePath)
  return { success: true }
})
