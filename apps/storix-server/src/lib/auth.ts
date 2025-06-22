import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";

// Debug your environment variables first
console.log("=== Environment Check ===")
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("GITHUB_CLIENT_ID exists:", !!process.env.GITHUB_CLIENT_ID)
console.log("GITHUB_CLIENT_SECRET exists:", !!process.env.GITHUB_CLIENT_SECRET)
console.log("BETTER_AUTH_SECRET exists:", !!process.env.BETTER_AUTH_SECRET)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
    debugLogs : true
  
  }),
  logger : {
    level : "debug"
  },
  trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:3001"],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: { 
        clientId: process.env.GITHUB_CLIENT_ID!, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
    }, 
},
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

});

