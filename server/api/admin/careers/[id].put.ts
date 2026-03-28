import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()

  const existing = db.prepare('SELECT id FROM careers WHERE id = ?').get(id)
  if (!existing) throw createError({ statusCode: 404, message: 'Career not found' })

  db.prepare(`
    UPDATE careers SET
      title = ?, title_en = ?, department = ?, location = ?, location_en = ?,
      type = ?, type_en = ?, description = ?, description_en = ?,
      requirements = ?, requirements_en = ?, benefits = ?, salary_range = ?,
      status = ?, meta_title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    body.title, body.title_en || null, body.department || null,
    body.location || null, body.location_en || null, body.type || null, body.type_en || null,
    body.description, body.description_en || null, body.requirements || null,
    body.requirements_en || null, body.benefits || null, body.salary_range || null,
    body.status || 'active', body.meta_title || null, body.meta_description || null, id,
  )

  return { success: true }
})
