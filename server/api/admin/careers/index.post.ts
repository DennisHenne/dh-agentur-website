import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  if (!body.slug || !body.title) {
    throw createError({ statusCode: 400, message: 'slug and title are required' })
  }

  const existing = db.prepare('SELECT id FROM careers WHERE slug = ?').get(body.slug)
  if (existing) throw createError({ statusCode: 409, message: 'Slug already exists' })

  const stmt = db.prepare(`
    INSERT INTO careers (slug, title, title_en, department, location, location_en, type, type_en,
      description, description_en, requirements, requirements_en, benefits, salary_range,
      status, meta_title, meta_description, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    body.slug, body.title, body.title_en || null, body.department || null,
    body.location || null, body.location_en || null, body.type || null, body.type_en || null,
    body.description, body.description_en || null, body.requirements || null,
    body.requirements_en || null, body.benefits || null, body.salary_range || null,
    body.status || 'active', body.meta_title || null, body.meta_description || null,
    body.status === 'active' ? new Date().toISOString() : null,
  )

  return { id: result.lastInsertRowid, success: true }
})
