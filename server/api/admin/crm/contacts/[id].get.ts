import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')

  const contact = db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(id)
  if (!contact) throw createError({ statusCode: 404, message: 'Contact not found' })

  // Enrich with recent activity + total logged time
  const activities = db.prepare(
    'SELECT * FROM crm_activities WHERE contact_id = ? ORDER BY sort_order ASC, created_at DESC',
  ).all(id)

  const timeEntries = db.prepare(
    'SELECT * FROM crm_time_entries WHERE contact_id = ? ORDER BY created_at DESC',
  ).all(id)

  const totalMinutes = (timeEntries as any[]).reduce((s: number, e: any) => s + (e.duration || 0), 0)

  return { ...contact as object, activities, timeEntries, totalMinutes }
})
