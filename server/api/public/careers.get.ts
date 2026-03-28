import { getDb } from '../../database/index'

export default defineEventHandler(() => {
  return getDb()
    .prepare('SELECT id, slug, title, title_en, department, location, location_en, type, type_en, description, description_en, requirements, requirements_en, benefits, salary_range, published_at FROM careers WHERE status = ? ORDER BY published_at DESC')
    .all('active')
})
