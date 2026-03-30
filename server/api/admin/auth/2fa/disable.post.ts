import { getDb } from '../../../../database/index'
import { verifyPassword } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = event.context.adminUser as { userId?: number } | undefined
  if (!user?.userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { password } = body || {}
  if (!password) {
    throw createError({ statusCode: 400, message: 'Password required' })
  }

  const db = getDb()
  const row = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(user.userId) as any
  if (!row) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  const valid = await verifyPassword(password, row.password_hash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Wrong password' })
  }

  db.prepare('UPDATE users SET totp_secret = NULL, totp_enabled = 0 WHERE id = ?').run(user.userId)

  return { success: true }
})
