import { getDb } from '../../../database/index'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const db = getDb()
  const career = db.prepare('SELECT * FROM careers WHERE id = ?').get(id)
  if (!career) throw createError({ statusCode: 404, message: 'Career not found' })
  return career
})
