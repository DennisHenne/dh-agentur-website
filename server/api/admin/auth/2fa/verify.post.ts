import * as OTPAuth from 'otpauth'
import { getDb } from '../../../../database/index'
import { verifyToken, signToken } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code } = body || {}
  if (!code) {
    throw createError({ statusCode: 400, message: 'Code required' })
  }

  const pendingToken = getCookie(event, 'pending_2fa')
  if (!pendingToken) {
    throw createError({ statusCode: 401, message: 'No pending authentication' })
  }

  const payload = await verifyToken(pendingToken)
  if (!payload?.pendingUserId) {
    deleteCookie(event, 'pending_2fa', { path: '/' })
    throw createError({ statusCode: 401, message: 'Session expired, please log in again' })
  }

  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(payload.pendingUserId) as any
  if (!user || !user.totp_secret || !user.totp_enabled) {
    deleteCookie(event, 'pending_2fa', { path: '/' })
    throw createError({ statusCode: 401, message: 'Invalid session' })
  }

  const totp = new OTPAuth.TOTP({
    issuer: 'DH Admin',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(user.totp_secret),
  })

  const delta = totp.validate({ token: String(code).replace(/\s/g, ''), window: 1 })
  if (delta === null) {
    throw createError({ statusCode: 401, message: 'Invalid code' })
  }

  deleteCookie(event, 'pending_2fa', { path: '/' })

  const token = await signToken({ userId: user.id, email: user.email })
  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true, email: user.email }
})
