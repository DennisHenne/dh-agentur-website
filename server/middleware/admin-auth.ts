import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // Only guard /api/admin/* routes, skip /api/admin/auth/login
  if (!path.startsWith('/api/admin/') || path === '/api/admin/auth/login') return

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
