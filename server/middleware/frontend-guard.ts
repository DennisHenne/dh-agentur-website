// When this instance runs as the public frontend (IS_BACKEND=false),
// block all access to admin pages and admin API routes so they are
// unreachable even if someone knows the URL.
export default defineEventHandler((event) => {
  if (process.env.IS_BACKEND !== 'false') return

  const path = getRequestURL(event).pathname
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
})
