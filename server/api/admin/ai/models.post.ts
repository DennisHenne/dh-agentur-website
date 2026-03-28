import { getDb } from '../../../database/index'

export default defineEventHandler(async (event) => {
  const { name, model_id } = await readBody(event)
  if (!name || !model_id) throw createError({ statusCode: 400, message: 'name and model_id required' })
  try {
    const r = getDb().prepare('INSERT INTO ai_models (name, model_id) VALUES (?, ?)').run(name, model_id)
    return { id: r.lastInsertRowid, success: true }
  } catch {
    throw createError({ statusCode: 409, message: 'Model already exists' })
  }
})
