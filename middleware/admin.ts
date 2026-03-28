export default defineNuxtRouteMiddleware(async (to) => {
  // /admin (login page) is always accessible
  if (to.path === '/admin') return

  // All other /admin/* pages require auth
  if (!to.path.startsWith('/admin/')) return

  try {
    await $fetch('/api/admin/auth/me')
  } catch {
    return navigateTo('/admin')
  }
})
