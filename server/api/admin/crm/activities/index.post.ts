import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const body = await readBody(event)

  if (!body.contact_id) throw createError({ statusCode: 400, message: 'contact_id required' })
  if (!body.title?.trim()) throw createError({ statusCode: 400, message: 'title required' })

  const result = db.prepare(`
    INSERT INTO crm_activities (contact_id, type, title, description, author, status, in_planning, sort_order)
    VALUES (?, ?, ?, ?, ?, 'active', 0, 0)
  `).run(
    body.contact_id,
    body.type || 'note',
    body.title.trim(),
    body.description || '',
    body.author || '',
  )

  // Bump contact updated_at
  db.prepare("UPDATE crm_contacts SET updated_at=datetime('now') WHERE id=?").run(body.contact_id)

  return db.prepare('SELECT * FROM crm_activities WHERE id = ?').get(result.lastInsertRowid)
})
