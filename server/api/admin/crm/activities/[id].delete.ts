import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM crm_activities WHERE id = ?').run(id)
  return { ok: true }
})
