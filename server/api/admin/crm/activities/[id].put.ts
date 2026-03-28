import { getDb } from '../../../../database/index'

export default defineEventHandler(async (event) => {
  const db = getDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const act = db.prepare('SELECT * FROM crm_activities WHERE id = ?').get(id) as any
  if (!act) throw createError({ statusCode: 404, message: 'Not found' })

  // Locking: set timestamp the first time; unlocking clears it
  const lockedAt = 'locked' in body
    ? (body.locked ? (act.locked_at ?? new Date().toISOString()) : null)
    : act.locked_at

  // Completing a task/deal removes the "in planning" flag
  const newStatus = body.status ?? act.status
  const inPlanning = newStatus === 'done' || newStatus === 'accepted'
    ? 0
    : (body.in_planning !== undefined ? (body.in_planning ? 1 : 0) : act.in_planning)

  db.prepare(`
    UPDATE crm_activities
    SET type        = ?,
        title       = ?,
        description = ?,
        status      = ?,
        in_planning = ?,
        sort_order  = ?,
        locked_at   = ?
    WHERE id = ?
  `).run(
    body.type        ?? act.type,
    body.title?.trim() ?? act.title,
    body.description !== undefined ? body.description : act.description,
    newStatus,
    inPlanning,
    body.sort_order !== undefined ? body.sort_order : act.sort_order,
    lockedAt,
    id,
  )

  return db.prepare('SELECT * FROM crm_activities WHERE id = ?').get(id)
})
