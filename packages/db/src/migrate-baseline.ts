/**
 * Marks the initial migration as already applied in drizzle.__drizzle_migrations.
 * Run this once when your database already has the tables but drizzle-kit migrate
 * fails with "relation already exists".
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import { readFileSync, existsSync } from "fs";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../../apps/web/.env") });

const MIGRATIONS_DIR = resolve(__dirname, "migrations");
const JOURNAL_PATH = resolve(MIGRATIONS_DIR, "meta/_journal.json");

const migrationsTable = "__drizzle_migrations";
const migrationsSchema = "drizzle";

async function baseline() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment");
    process.exit(1);
  }

  if (!existsSync(JOURNAL_PATH)) {
    console.error("❌ migrations meta journal not found");
    process.exit(1);
  }

  const journal = JSON.parse(readFileSync(JOURNAL_PATH, "utf-8")) as {
    entries: Array<{ tag: string; when: number }>;
  };
  const first = journal.entries[0];
  if (!first) {
    console.error("❌ No migration entries in journal");
    process.exit(1);
  }

  const migrationPath = resolve(MIGRATIONS_DIR, `${first.tag}.sql`);
  if (!existsSync(migrationPath)) {
    console.error("❌ Migration file not found:", migrationPath);
    process.exit(1);
  }

  const query = readFileSync(migrationPath, "utf-8");
  const hash = createHash("sha256").update(query).digest("hex");
  const created_at = first.when;

  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();

  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${migrationsSchema}`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${migrationsSchema}.${migrationsTable} (
        id SERIAL PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      )
    `);

    const existing = await client.query(
      `SELECT 1 FROM ${migrationsSchema}.${migrationsTable} WHERE hash = $1`,
      [hash]
    );
    if (existing.rows.length > 0) {
      console.log("✅ Migration already marked as applied.");
      return;
    }

    await client.query(
      `INSERT INTO ${migrationsSchema}.${migrationsTable} (hash, created_at) VALUES ($1, $2)`,
      [hash, created_at]
    );
    console.log("✅ Baseline applied: initial migration marked as applied.");
  } finally {
    await client.end();
  }
}

export default baseline;

if (process.argv[1]?.includes("migrate-baseline")) {
  baseline().catch((err) => {
    console.error("❌ Baseline failed:", err);
    process.exit(1);
  });
}
