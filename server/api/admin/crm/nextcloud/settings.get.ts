import { getDb } from '../../../../database/index'

export default defineEventHandler(() => {
  const db = getDb()
  const row = db.prepare('SELECT * FROM crm_nextcloud WHERE id = 1').get() as any
  // Never expose the password in plain-text GET response
  return { url: row?.url || '', username: row?.username || '', addressbook: row?.addressbook || 'contacts', auto_sync: row?.auto_sync || 0, configured: !!(row?.url && row?.username && row?.password) }
})
