import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  getDb().prepare('DELETE FROM rss_feeds WHERE id = ?').run(id)
  return { success: true }
})
