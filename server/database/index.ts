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
  runMigrations(_db)
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

    -- ── CRM ──────────────────────────────────────────────────────────────────

    CREATE TABLE IF NOT EXISTS crm_contacts (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      name             TEXT NOT NULL,
      email            TEXT,
      phone            TEXT,
      company          TEXT,
      position         TEXT,
      address          TEXT,
      website          TEXT,
      notes            TEXT,
      status           TEXT DEFAULT 'lead',
      tags             TEXT DEFAULT '[]',
      nextcloud_uid    TEXT,
      nextcloud_synced TEXT,
      created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS crm_activities (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id  INTEGER NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
      type        TEXT DEFAULT 'note',
      title       TEXT NOT NULL,
      description TEXT,
      author      TEXT,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS crm_time_entries (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id  INTEGER NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
      activity_id INTEGER REFERENCES crm_activities(id) ON DELETE SET NULL,
      description TEXT,
      duration    INTEGER NOT NULL DEFAULT 0,
      date        TEXT,
      author      TEXT,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS crm_nextcloud (
      id          INTEGER PRIMARY KEY CHECK (id = 1),
      url         TEXT DEFAULT '',
      username    TEXT DEFAULT '',
      password    TEXT DEFAULT '',
      addressbook TEXT DEFAULT 'contacts',
      auto_sync   INTEGER DEFAULT 0
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

  // Seed Nextcloud settings row
  const ncExists = db.prepare('SELECT id FROM crm_nextcloud LIMIT 1').get()
  if (!ncExists) {
    db.prepare('INSERT INTO crm_nextcloud (id) VALUES (1)').run()
  }
}

// Add columns that didn't exist in the original schema — safe to re-run.
function runMigrations(db: Database.Database) {
  const cols = [
    "ALTER TABLE crm_activities ADD COLUMN status TEXT NOT NULL DEFAULT 'active'",
    'ALTER TABLE crm_activities ADD COLUMN locked_at DATETIME',
    'ALTER TABLE crm_activities ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE crm_activities ADD COLUMN in_planning INTEGER NOT NULL DEFAULT 0',
    "ALTER TABLE crm_contacts ADD COLUMN folder_url TEXT NOT NULL DEFAULT ''",
    'ALTER TABLE users ADD COLUMN totp_secret TEXT',
    'ALTER TABLE users ADD COLUMN totp_enabled INTEGER DEFAULT 0',
  ]
  for (const sql of cols) {
    try { db.exec(sql) } catch { /* column already exists — safe to ignore */ }
  }
}
