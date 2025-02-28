import { registerFormSchema } from "@/lib/zod-schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "@/lib/password";

const authRouter = createTRPCRouter({
  createRootFolderOnOAuthSignup: protectedProcedure.mutation(
    async ({ ctx }) => {
      try {
        await ctx.db.folder.create({
          data: {
            name: "home",
            path: "/home",
            userId: ctx.session.user.id,
          },
        });

        return {
          message: "Root folder created successfully!",
        };
      } catch (err) {
        console.error(
          "Failed to create oauth signup user default folder: ",
          err,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create root folder for the user.",
        });
      }
    },
  ),
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

        const hashedPassword = await hashPassword(confirmPassword);

        await ctx.db.$transaction(async (tx) => {
          // create new user
          const newUser = await tx.user.create({
            data: {
              name: name,
              email: email,
              password: hashedPassword,
            },
            select: {
              id: true,
              email: true,
            },
          });

          // creating a default folder 'home'. this folder will work as root or entry point to the user's drive
          await tx.folder.create({
            data: {
              name: "home",
              path: "/home",
              userId: newUser.id,
            },
          });
        });

        return {
          message: "Please login to your account.",
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
