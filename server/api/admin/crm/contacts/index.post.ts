import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const body = await readBody(event)

  if (!body.name?.trim()) {
    throw createError({ statusCode: 400, message: 'Name is required' })
  }

  const result = db.prepare(`
    INSERT INTO crm_contacts (name, email, phone, company, position, address, website, notes, status, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.name.trim(),
    body.email || '',
    body.phone || '',
    body.company || '',
    body.position || '',
    body.address || '',
    body.website || '',
    body.notes || '',
    body.status || 'lead',
    JSON.stringify(body.tags || []),
  )

  return db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(result.lastInsertRowid)
})
