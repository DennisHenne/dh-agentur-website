import { getDb } from '../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const query = getQuery(event)
  const status = query.status as string | undefined

  const sql = status
    ? 'SELECT * FROM careers WHERE status = ? ORDER BY created_at DESC'
    : 'SELECT * FROM careers ORDER BY created_at DESC'

  return db.prepare(sql).all(...(status ? [status] : []))
})
