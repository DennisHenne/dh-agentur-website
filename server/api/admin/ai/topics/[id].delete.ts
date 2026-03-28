import { getDb } from '../../../../database/index'

export default defineEventHandler((event) => {
  getDb().prepare('DELETE FROM ai_topics WHERE id = ?').run(getRouterParam(event, 'id'))
  return { success: true }
})
