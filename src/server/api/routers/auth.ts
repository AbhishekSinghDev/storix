import { registerFormSchema } from "@/lib/zod-schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, confirmPassword } = input;

      try {
        // check weither user already registered or not
        const user = await ctx.db.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User already exists with the provided email address.",
          });
        }

        await ctx.db.user.create({
          data: {
            name: name,
            email: email,
            password: confirmPassword,
          },
        });

        return {
          message: "Account created successfully!",
        };
      } catch (err) {
        console.error("Failed to register user: ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register user",
        });
      }
    }),
});

export default authRouter;
