import { credentialsSchema } from "@/lib/zod-schema";
import { db } from "../db";
import bcrypt from "bcrypt";

export const authenticate = async (
  credentials: Partial<Record<"email" | "password", unknown>>,
) => {
  try {
    // Validate credentials
    const parsedCredentials = credentialsSchema.parse(credentials);

    // Find user
    const user = await db.user.findUnique({
      where: { email: parsedCredentials.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
        otpSentAt: true,
      },
    });

    if (!user?.password) {
      return null;
    }

    // Verify password
    const passwordsMatch = await bcrypt.compare(
      parsedCredentials.password,
      user.password,
    );

    if (!passwordsMatch) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};
