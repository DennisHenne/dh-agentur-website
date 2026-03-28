import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const dataDir = join(process.cwd(), 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

const DB_PATH = join(dataDir, 'admin.db')

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (_db) return _db
  _db = new Database(DB_PATH)
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')
  setupSchema(_db)
  return _db
}

function setupSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS careers (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT UNIQUE NOT NULL,
      title       TEXT NOT NULL,
      title_en    TEXT,
      department  TEXT,
      location    TEXT,
      location_en TEXT,
      type        TEXT,
      type_en     TEXT,
      description TEXT NOT NULL,
      description_en TEXT,
      requirements   TEXT,
      requirements_en TEXT,
      benefits       TEXT,
      salary_range   TEXT,
      status      TEXT DEFAULT 'active',
      meta_title  TEXT,
      meta_description TEXT,
      published_at DATETIME,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ai_settings (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      openrouter_key  TEXT,
      default_model   TEXT DEFAULT 'openai/gpt-4o',
      auto_generate   INTEGER DEFAULT 0,
      interval_hours  INTEGER DEFAULT 24,
      next_run        DATETIME,
      default_author  TEXT,
      default_category TEXT DEFAULT 'ai',
      language        TEXT DEFAULT 'de'
    );

    CREATE TABLE IF NOT EXISTS rss_feeds (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT NOT NULL,
      url          TEXT NOT NULL,
      active       INTEGER DEFAULT 1,
      last_fetched DATETIME,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ai_topics (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      topic  TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS ai_models (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      model_id   TEXT UNIQUE NOT NULL,
      is_default INTEGER DEFAULT 0
    );
  `)

  // Seed default AI settings row if none exists
  const existing = db.prepare('SELECT id FROM ai_settings LIMIT 1').get()
  if (!existing) {
    db.prepare('INSERT INTO ai_settings (id) VALUES (1)').run()
  }

  // Seed default models
  const models = [
    { name: 'GPT-4o', model_id: 'openai/gpt-4o' },
    { name: 'Claude 3.5 Sonnet', model_id: 'anthropic/claude-3.5-sonnet' },
    { name: 'Gemini 1.5 Pro', model_id: 'google/gemini-pro-1.5' },
  ]
  const insertModel = db.prepare(
    'INSERT OR IGNORE INTO ai_models (name, model_id) VALUES (?, ?)',
  )
  for (const m of models) insertModel.run(m.name, m.model_id)
}
