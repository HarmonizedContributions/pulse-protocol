import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import path from 'node:path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from '@/models/Schema';
import { Env } from './Env';

// Store the db connection in the global scope during development to
// prevent multiple instances due to hot reloading with Next.js
const globalForDb = globalThis as unknown as {
  drizzle: NodePgDatabase<typeof schema> | undefined;
};

/**
 * Create a database connection and run migrations when a valid remote
 * DATABASE_URL is provided. When running locally or when DATABASE_URL
 * points to localhost/127.0.0.1, skip connecting and provide a dummy
 * object instead. Skipping the migration prevents build failures on
 * platforms like Netlify that don't have a running Postgres instance.
 */
async function createDb(): Promise<NodePgDatabase<typeof schema>> {
  const databaseUrl = Env.DATABASE_URL;
  // Skip connection if no URL provided or if it's pointing at localhost.
  const shouldSkip =
    !databaseUrl ||
    databaseUrl.includes('127.0.0.1') ||
    databaseUrl.includes('localhost');

  if (shouldSkip) {
    console.log(
      'Skipping database connection and migration because DATABASE_URL is missing or refers to localhost.',
    );
    // Return a dummy object to satisfy the type; any calls to db will
    // throw runtime errors which is acceptable when DB features are not used.
    return {} as unknown as NodePgDatabase<typeof schema>;
  }

  // Reuse existing connection in development to avoid creating multiple
  // connections due to hot reloading.
  if (globalForDb.drizzle) {
    return globalForDb.drizzle;
  }

  const connection = drizzle({
    connection: {
      connectionString: databaseUrl,
      ssl:
        !databaseUrl.includes('localhost') &&
        !databaseUrl.includes('127.0.0.1'),
    },
    schema,
  });

  // Run migrations to ensure the schema is up to date
  await migrate(connection, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });

  // Only store in global during development to prevent hot reload issues
  if (Env.NODE_ENV !== 'production') {
    globalForDb.drizzle = connection;
  }

  return connection;
}

// Immediately create the database connection. Top-level await is
// supported in Next.js configuration files.
const db: NodePgDatabase<typeof schema> = await createDb();

export { db };
