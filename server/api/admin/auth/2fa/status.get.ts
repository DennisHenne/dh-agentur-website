import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const user = event.context.adminUser as { userId?: number } | undefined
  if (!user?.userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const db = getDb()
  const row = db.prepare('SELECT totp_enabled FROM users WHERE id = ?').get(user.userId) as any

  return { enabled: row?.totp_enabled === 1 }
})
