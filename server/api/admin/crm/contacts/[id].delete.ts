import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const contact = db.prepare('SELECT id FROM crm_contacts WHERE id = ?').get(id)
  if (!contact) throw createError({ statusCode: 404, message: 'Not found' })
  db.prepare('DELETE FROM crm_contacts WHERE id = ?').run(id)
  return { ok: true }
})
