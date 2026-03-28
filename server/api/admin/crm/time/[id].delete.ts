import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM crm_time_entries WHERE id = ?').run(id)
  return { ok: true }
})
