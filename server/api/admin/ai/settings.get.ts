import { getDb } from '../../../database/index'

export default defineEventHandler(() => {
  const db = getDb()
  const settings = db.prepare('SELECT * FROM ai_settings WHERE id = 1').get() as any
  const feeds = db.prepare('SELECT * FROM rss_feeds ORDER BY created_at DESC').all()
  const topics = db.prepare('SELECT * FROM ai_topics').all()
  const models = db.prepare('SELECT * FROM ai_models').all()

  return { settings: settings || {}, feeds, topics, models }
})
