import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, extname } from 'path'
import { randomBytes } from 'crypto'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData[0]
  if (!file.filename || !file.data) {
    throw createError({ statusCode: 400, message: 'Invalid file' })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (file.type && !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, message: 'File type not allowed' })
  }

  const ext = extname(file.filename).toLowerCase() || '.jpg'
  const folder = (getQuery(event).folder as string) || 'misc'
  const filename = `${Date.now()}-${randomBytes(4).toString('hex')}${ext}`

  const uploadDir = join(process.cwd(), 'public/uploads/admin', folder)
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

  writeFileSync(join(uploadDir, filename), file.data)

  return { url: `/uploads/admin/${folder}/${filename}` }
})
