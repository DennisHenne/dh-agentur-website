import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const contact = db.prepare('SELECT id FROM crm_contacts WHERE id = ?').get(id)
  if (!contact) throw createError({ statusCode: 404, message: 'Contact not found' })

  db.prepare(`
    UPDATE crm_contacts
    SET name=?, email=?, phone=?, company=?, position=?, address=?, website=?,
        notes=?, status=?, tags=?, folder_url=?, updated_at=datetime('now')
    WHERE id=?
  `).run(
    body.name?.trim() || '',
    body.email || '',
    body.phone || '',
    body.company || '',
    body.position || '',
    body.address || '',
    body.website || '',
    body.notes || '',
    body.status || 'lead',
    JSON.stringify(body.tags || []),
    body.folder_url || '',
    id,
  )

  return db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(id)
})
