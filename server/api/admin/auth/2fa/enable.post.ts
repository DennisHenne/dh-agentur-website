import * as OTPAuth from 'otpauth'
import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const user = event.context.adminUser as { userId?: number } | undefined
  if (!user?.userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { code } = body || {}
  if (!code) {
    throw createError({ statusCode: 400, message: 'Code required' })
  }

  const db = getDb()
  const row = db.prepare('SELECT totp_secret, totp_enabled FROM users WHERE id = ?').get(user.userId) as any
  if (!row?.totp_secret) {
    throw createError({ statusCode: 400, message: 'Run setup first' })
  }

  const totp = new OTPAuth.TOTP({
    issuer: 'DH Admin',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(row.totp_secret),
  })

  const delta = totp.validate({ token: String(code).replace(/\s/g, ''), window: 1 })
  if (delta === null) {
    throw createError({ statusCode: 401, message: 'Invalid code' })
  }

  db.prepare('UPDATE users SET totp_enabled = 1 WHERE id = ?').run(user.userId)

  return { success: true }
})
