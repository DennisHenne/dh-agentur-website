import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const body = await readBody(event)

  if (!body.contact_id) throw createError({ statusCode: 400, message: 'contact_id required' })
  if (!body.duration || body.duration <= 0) throw createError({ statusCode: 400, message: 'duration (minutes) required' })

  const result = db.prepare(`
    INSERT INTO crm_time_entries (contact_id, activity_id, description, duration, date, author)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    body.contact_id,
    body.activity_id || null,
    body.description || '',
    Math.round(body.duration),
    body.date || new Date().toISOString().slice(0, 10),
    body.author || '',
  )

  db.prepare("UPDATE crm_contacts SET updated_at=datetime('now') WHERE id=?").run(body.contact_id)

  return db.prepare('SELECT * FROM crm_time_entries WHERE id = ?').get(result.lastInsertRowid)
})
