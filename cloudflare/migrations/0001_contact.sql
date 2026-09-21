CREATE TABLE IF NOT EXISTS zetbros_contact_messages (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK(length(email) BETWEEN 3 AND 320),
  company TEXT,
  service TEXT,
  message TEXT NOT NULL CHECK(length(message) BETWEEN 10 AND 5000),
  source TEXT NOT NULL DEFAULT 'zetbros.com',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS contact_created_at ON zetbros_contact_messages(created_at);
