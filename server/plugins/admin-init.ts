import { getDb } from '../database/index'
import { hashPassword } from '../utils/auth'

export default defineNitroPlugin(async () => {
  const db = getDb()

  // Create default admin user from env if none exists
  const userCount = (db.prepare('SELECT COUNT(*) as count FROM users').get() as any)?.count || 0

  if (userCount === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@dh-agentur.de'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const hash = await hashPassword(password)
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash)
    console.log(`[Admin] Default user created: ${email}`)
  }

  // Scheduler: check every 5 minutes if auto-generation is due
  setInterval(async () => {
    try {
      const settings = db.prepare('SELECT * FROM ai_settings WHERE id = 1').get() as any
      if (!settings?.auto_generate || !settings?.openrouter_key) return
      if (!settings.next_run) return

      const nextRun = new Date(settings.next_run).getTime()
      if (Date.now() < nextRun) return

      console.log('[AI Scheduler] Triggering auto generation...')
      await $fetch('/api/admin/ai/generate', { method: 'POST', body: {} })
        .catch(e => console.error('[AI Scheduler] Error:', e))

      const hours = Number(settings.interval_hours) || 24
      const next = new Date(Date.now() + hours * 3600000).toISOString()
      db.prepare('UPDATE ai_settings SET next_run = ? WHERE id = 1').run(next)
      console.log(`[AI Scheduler] Next run scheduled: ${next}`)
    } catch (e) {
      console.error('[AI Scheduler] Unexpected error:', e)
    }
  }, 5 * 60 * 1000)
})
