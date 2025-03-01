import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
import GitHub from "next-auth/providers/github";
import { authenticate } from "./authenticate";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authConfig = {
  providers: [
    GitHub,
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        return await authenticate(credentials);
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
  events: {
    async createUser({ user }) {
      if (!user.id) throw new Error("Failed to create user.");

      try {
        await db.folder.create({
          data: {
            name: "home",
            path: "/",
            userId: user.id,
          },
        });
      } catch (err) {
        console.error("Failed to create root folder for OAuth user: ", err);
      }
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      return token;
    },
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          id: user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        },
      };
    },
  },
} satisfies NextAuthConfig;
