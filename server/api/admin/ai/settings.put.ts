import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()

  db.prepare(`
    UPDATE ai_settings SET
      openrouter_key  = ?,
      default_model   = ?,
      auto_generate   = ?,
      interval_hours  = ?,
      default_author  = ?,
      default_category = ?,
      language        = ?
    WHERE id = 1
  `).run(
    body.openrouter_key ?? null,
    body.default_model ?? 'openai/gpt-4o',
    body.auto_generate ? 1 : 0,
    body.interval_hours ?? 24,
    body.default_author ?? null,
    body.default_category ?? 'ai',
    body.language ?? 'de',
  )

  // Schedule next run if auto_generate enabled
  if (body.auto_generate) {
    const hours = Number(body.interval_hours) || 24
    const nextRun = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString()
    db.prepare('UPDATE ai_settings SET next_run = ? WHERE id = 1').run(nextRun)
  }

  return { success: true }
})
