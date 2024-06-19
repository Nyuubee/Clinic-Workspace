//
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema"
// Must import pg as temp fix to Client not being directly importable.
const { Client } = pg;
/**
 * Alias of schema
 */
export const tables = schema;
/**
 * The PostgreSQL client used for connecting to the database.
 */
const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    connectionTimeoutMillis: 5000,
});
export const db = drizzle(client, {schema});
await client.connect();
