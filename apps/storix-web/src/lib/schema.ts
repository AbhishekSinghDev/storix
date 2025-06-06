import z from "zod/v3";

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

export const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" });

export const nameSchema = z
  .string()
  .min(1, { message: "Name is required" })
  .min(2, { message: "Name must be at least 2 characters" });

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginFormValues = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
