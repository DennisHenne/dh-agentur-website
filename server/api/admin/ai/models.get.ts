import { getDb } from '../../../database/index'

export default defineEventHandler(() => getDb().prepare('SELECT * FROM ai_models').all())
