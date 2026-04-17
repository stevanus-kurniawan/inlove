import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "development") {
  console.warn(
    "[db] DATABASE_URL is not set. Set it in .env.local to use the database."
  );
}

export const pool = new Pool({
  connectionString,
  ssl:
    process.env.PGSSLMODE === "require" || process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});
