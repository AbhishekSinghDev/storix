// src/env.ts
import { z } from "zod/v4";

// Define schema for public URLs (add more keys as needed)
const publicUrlSchema = z.object({
  VITE_PUBLIC_NAME: z.string(),
});

// Extract only import.meta.env (client + build)
type ViteEnv = Record<string, string | undefined>;
const rawEnv = import.meta.env as ViteEnv;

// Validate at runtime (dev or build)
export const env = publicUrlSchema.parse(rawEnv);
