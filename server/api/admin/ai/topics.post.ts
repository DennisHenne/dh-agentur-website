import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const { topic } = await readBody(event)
  if (!topic) throw createError({ statusCode: 400, message: 'topic required' })
  const r = getDb().prepare('INSERT INTO ai_topics (topic) VALUES (?)').run(topic)
  return { id: r.lastInsertRowid, topic, success: true }
})
