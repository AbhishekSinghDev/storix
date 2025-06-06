import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema.js";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is missing.");
}

const sql = neon(dbUrl);

export const db = drizzle({
  client: sql,
  schema,
  casing: "snake_case",
  logger: true,
});
