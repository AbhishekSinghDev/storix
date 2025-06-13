import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema.js";

// const dbUrl = process.env.DATABASE_URL;
const dbUrl =
  "postgresql://neondb_owner:npg_MJwRP12oprOV@ep-old-hat-a1jlxubw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// console.log(process.env, "fjdkf");
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
