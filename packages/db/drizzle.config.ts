import type { Config } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error("DATABASE_URL is missing.");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: dbUrl },
  casing: "snake_case",
} satisfies Config;
