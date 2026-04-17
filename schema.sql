-- Run this against your PostgreSQL database once (e.g. psql or GUI client).

CREATE TABLE IF NOT EXISTS wishes (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
