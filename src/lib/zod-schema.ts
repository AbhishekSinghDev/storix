import { z } from "zod";
import { AWS_REGIONS } from "./constant";
import type { AWSRegion } from "./types";

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// TODO: improve schema after implementing 'credentials' login using next-auth
export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const bucketConfigurationSchema = z
  .object({
    s3AccessKey: z
      .string({
        required_error: "S3 Access Key is required",
        invalid_type_error: "S3 Access Key must be a string",
      })
      .min(16, "S3 Access Key must be at least 16 characters long")
      .max(128, "S3 Access Key must not exceed 128 characters")
      .trim(),

    s3SecretKey: z
      .string({
        required_error: "S3 Secret Key is required",
        invalid_type_error: "S3 Secret Key must be a string",
      })
      .min(32, "S3 Secret Key must be at least 32 characters long")
      .max(256, "S3 Secret Key must not exceed 256 characters")
      .trim(),

    s3BucketKey: z
      .string({
        required_error: "S3 Bucket name is required",
        invalid_type_error: "S3 Bucket name must be a string",
      })
      .min(3, "Bucket name must be at least 3 characters long")
      .max(63, "Bucket name must not exceed 63 characters")
      .regex(
        /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/,
        "Bucket name must contain only lowercase letters, numbers, dots, and hyphens",
      )
      .trim(),

    s3Region: z.enum(Object.keys(AWS_REGIONS) as [AWSRegion, ...AWSRegion[]], {
      required_error: "S3 Region is required",
      invalid_type_error: "Please select a valid AWS region",
    }),
  })
  .strict();
