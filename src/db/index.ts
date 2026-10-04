import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

// Only initialize if connectionString is a valid postgres connection URI
if (
  connectionString &&
  (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://'))
) {
  try {
    client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
    });
    dbInstance = drizzle(client, { schema });
  } catch (e) {
    console.warn('Database initialization deferred:', e);
  }
}

export const db = dbInstance;
export const isDbConnected = Boolean(dbInstance);
