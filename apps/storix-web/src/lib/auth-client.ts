import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, getSession, useSession } =
  createAuthClient({
    baseURL: "http://localhost:3000",
  });
