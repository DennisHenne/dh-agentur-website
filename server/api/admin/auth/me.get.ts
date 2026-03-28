export default defineEventHandler((event) => {
  const user = event.context.adminUser as any
  return { email: user?.email }
})
