import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // Only guard /api/admin/* routes, skip login and 2FA verify (they handle their own auth)
  const publicAuthPaths = ['/api/admin/auth/login', '/api/admin/auth/2fa/verify']
  if (!path.startsWith('/api/admin/') || publicAuthPaths.includes(path)) return

  const token = getCookie(event, 'admin_token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    deleteCookie(event, 'admin_token')
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  // Attach user info to context
  event.context.adminUser = payload
})
