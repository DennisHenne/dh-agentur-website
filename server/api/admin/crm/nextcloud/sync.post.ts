import { getDb } from '../../../../database/index'

// Build a vCard 3.0 string from a contact row
function toVCard(c: any): string {
  const uid = c.nextcloud_uid || `dh-crm-${c.id}`
  const nameParts = (c.name as string).split(' ')
  const lastName = nameParts.slice(1).join(' ')
  const firstName = nameParts[0] || ''

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `UID:${uid}`,
    `FN:${c.name}`,
    `N:${lastName};${firstName};;;`,
  ]
  if (c.email) lines.push(`EMAIL;type=WORK:${c.email}`)
  if (c.phone) lines.push(`TEL;type=WORK:${c.phone}`)
  if (c.company) lines.push(`ORG:${c.company}`)
  if (c.position) lines.push(`TITLE:${c.position}`)
  if (c.website) lines.push(`URL:${c.website}`)
  if (c.address) lines.push(`ADR;type=WORK:;;${c.address};;;;`)
  if (c.notes) lines.push(`NOTE:${(c.notes as string).replace(/\r?\n/g, '\\n')}`)
  lines.push(`REV:${new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)}Z`)
  lines.push('END:VCARD')
  return lines.join('\r\n')
}

async function syncOne(c: any, cfg: any): Promise<{ uid: string; ok: boolean; error?: string }> {
  const uid = c.nextcloud_uid || `dh-crm-${c.id}`
  const base = cfg.url.replace(/\/$/, '')
  const url = `${base}/remote.php/dav/addressbooks/users/${cfg.username}/${cfg.addressbook}/${uid}.vcf`
  const auth = 'Basic ' + Buffer.from(`${cfg.username}:${cfg.password}`).toString('base64')

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'text/vcard; charset=utf-8',
      },
      body: toVCard({ ...c, nextcloud_uid: uid }),
    })
    if (!res.ok && res.status !== 201 && res.status !== 204) {
      return { uid, ok: false, error: `HTTP ${res.status}` }
    }
    return { uid, ok: true }
  } catch (err: any) {
    return { uid, ok: false, error: err.message }
  }
}

export default defineEventHandler(async (event) => {
  const db = getDb()
  const body = await readBody(event).catch(() => ({}))

  const cfg = db.prepare('SELECT * FROM crm_nextcloud WHERE id = 1').get() as any
  if (!cfg?.url || !cfg?.username || !cfg?.password) {
    throw createError({ statusCode: 400, message: 'Nextcloud not configured' })
  }

  // Sync a single contact or all contacts
  const contacts: any[] = body.contact_id
    ? [db.prepare('SELECT * FROM crm_contacts WHERE id = ?').get(body.contact_id)]
    : db.prepare('SELECT * FROM crm_contacts').all()

  const results = await Promise.all(contacts.filter(Boolean).map(c => syncOne(c, cfg)))

  // Persist UID and sync timestamp back to DB
  const now = new Date().toISOString()
  for (const r of results.filter(r => r.ok)) {
    db.prepare('UPDATE crm_contacts SET nextcloud_uid=?, nextcloud_synced=? WHERE nextcloud_uid IS NULL AND id = ?')
      .run(r.uid, now, r.uid.replace('dh-crm-', ''))
    db.prepare("UPDATE crm_contacts SET nextcloud_synced=? WHERE nextcloud_uid=?").run(now, r.uid)
  }

  const ok = results.filter(r => r.ok).length
  const failed = results.filter(r => !r.ok)
  return { synced: ok, failed: failed.length, errors: failed.map(f => f.error) }
})
