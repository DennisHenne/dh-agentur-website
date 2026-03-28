import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const db = getDb()
  const q = getQuery(event)
  const search = (q.search as string) || ''
  const status = (q.status as string) || ''

  let sql = 'SELECT * FROM crm_contacts WHERE 1=1'
  const params: any[] = []

  if (search) {
    sql += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ?)'
    const s = `%${search}%`
    params.push(s, s, s)
  }
  if (status) {
    sql += ' AND status = ?'
    params.push(status)
  }

  sql += ' ORDER BY updated_at DESC'
  return db.prepare(sql).all(...params)
})
