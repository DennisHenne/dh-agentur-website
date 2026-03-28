import { getDb } from '../../../database/index'
import { verifyPassword } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.password) {
    throw createError({ statusCode: 400, message: 'Passwort fehlt' })
  }

  // The admin-auth middleware already validated the JWT and put the user on context
  const contextUser = event.context.adminUser as { email?: string } | undefined
  if (!contextUser?.email) {
    throw createError({ statusCode: 401, message: 'Nicht angemeldet' })
  }

  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(contextUser.email) as any
  if (!user) {
    throw createError({ statusCode: 404, message: 'Benutzer nicht gefunden' })
  }

  const valid = await verifyPassword(body.password, user.password_hash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Falsches Passwort' })
  }

  return { ok: true }
})
