import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  email: t.varchar({ length: 256 }).notNull(),
  password: t.varchar({ length: 256 }).notNull(),
  userName: t.varchar({ length: 50 }).notNull(),
  image: t.varchar(),
}));

export * from "./auth-schema";
