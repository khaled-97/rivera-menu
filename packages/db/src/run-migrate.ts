/**
 * Runs Drizzle migrations. If the migration fails because tables already exist
 * (e.g. "relation \"account\" already exists"), marks the initial migration as
 * applied (baseline) and runs migrate again.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../../apps/web/.env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

const migrationsFolder = resolve(__dirname, "migrations");

async function runMigrate() {
  const db = drizzle(DATABASE_URL!);
  await migrate(db, {
    migrationsFolder,
    migrationsSchema: "drizzle",
    migrationsTable: "__drizzle_migrations",
  });
}

async function main() {
  try {
    await runMigrate();
    console.log("✅ Migrations complete.");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("already exists") || (err as NodeJS.ErrnoException)?.cause?.toString?.().includes("already exists")) {
      console.warn("⚠️ Migration failed (tables already exist). Marking initial migration as applied and retrying...");
      const { default: runBaseline } = await import("./migrate-baseline.js");
      await runBaseline();
      await runMigrate();
      console.log("✅ Migrations complete.");
    } else {
      throw err;
    }
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Migrate failed:", err);
  process.exit(1);
});
