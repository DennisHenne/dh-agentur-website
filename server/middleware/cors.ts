// Adds CORS headers to all /api/public/* responses so the
// separately-deployed frontend can call the backend API.
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/api/public/')) return

  const allowedOrigin = process.env.FRONTEND_URL || '*'

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  })

  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
    return null
  }
})
