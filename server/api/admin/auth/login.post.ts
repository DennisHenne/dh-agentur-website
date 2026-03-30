import { getDb } from '../../../database/index'
import { verifyPassword, signToken } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password required' })
  }

  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  // If 2FA is enabled, issue a short-lived pending cookie instead of the full session
  if (user.totp_enabled) {
    const pendingToken = await signToken({ pendingUserId: user.id })
    setCookie(event, 'pending_2fa', pendingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5, // 5 minutes
      path: '/',
    })
    return { requires2fa: true }
  }

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
