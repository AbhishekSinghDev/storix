import { env } from "@/env";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ENCRYPTION_KEY = Buffer.from(env.ENCRYPTION_KEY, "hex");

export function encryptCredential(text: string): {
  encryptedData: string;
  iv: string;
} {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  };
}

export function decryptCredential(encryptedData: string, iv: string): string {
  const decipher = createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex"),
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
