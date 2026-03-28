import { getDb } from '../../../database/index'

export default defineEventHandler(() => {
  return getDb().prepare('SELECT * FROM rss_feeds ORDER BY created_at DESC').all()
})
