import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const { name, url } = await readBody(event)
  if (!name || !url) throw createError({ statusCode: 400, message: 'name and url required' })
  const r = getDb().prepare('INSERT INTO rss_feeds (name, url) VALUES (?, ?)').run(name, url)
  return { id: r.lastInsertRowid, success: true }
})
