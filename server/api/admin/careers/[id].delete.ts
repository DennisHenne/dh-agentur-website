import { getDb } from '../../../database/index'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()
  const existing = db.prepare('SELECT id FROM careers WHERE id = ?').get(id)
  if (!existing) throw createError({ statusCode: 404, message: 'Career not found' })
  db.prepare('DELETE FROM careers WHERE id = ?').run(id)
  return { success: true }
})
