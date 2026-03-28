import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const body = await readBody(event)

  const existing = db.prepare('SELECT id FROM crm_nextcloud LIMIT 1').get()
  if (existing) {
    // Only update password if explicitly provided (non-empty)
    if (body.password) {
      db.prepare(`UPDATE crm_nextcloud SET url=?, username=?, password=?, addressbook=?, auto_sync=? WHERE id=1`)
        .run(body.url || '', body.username || '', body.password, body.addressbook || 'contacts', body.auto_sync ? 1 : 0)
    } else {
      db.prepare(`UPDATE crm_nextcloud SET url=?, username=?, addressbook=?, auto_sync=? WHERE id=1`)
        .run(body.url || '', body.username || '', body.addressbook || 'contacts', body.auto_sync ? 1 : 0)
    }
  } else {
    db.prepare(`INSERT INTO crm_nextcloud (id, url, username, password, addressbook, auto_sync) VALUES (1,?,?,?,?,?)`)
      .run(body.url || '', body.username || '', body.password || '', body.addressbook || 'contacts', body.auto_sync ? 1 : 0)
  }

  return { ok: true }
})
