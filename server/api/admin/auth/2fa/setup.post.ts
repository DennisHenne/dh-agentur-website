import * as OTPAuth from 'otpauth'
import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const user = event.context.adminUser as { userId?: number; email?: string } | undefined
  if (!user?.userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const db = getDb()
  const row = db.prepare('SELECT email FROM users WHERE id = ?').get(user.userId) as any
  if (!row) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  const totp = new OTPAuth.TOTP({
    issuer: 'DH Admin',
    label: row.email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  })

  const secret = totp.secret.base32
  const uri = totp.toString()

  // Store secret temporarily (not yet enabled) until user confirms with a valid code
  db.prepare('UPDATE users SET totp_secret = ?, totp_enabled = 0 WHERE id = ?').run(secret, user.userId)

  return { secret, uri }
})
