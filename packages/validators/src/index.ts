// This file is just to add common zod schemas for validation purposes.
// Add schema in this file only when you think it can be used in multiple places within the package or across packages.

import { z } from "zod/v4";

import {
  dateRegex,
  fullNameRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex,
  slugRegex,
  usernameRegex,
  websiteRegex,
} from "./regex";

// Basic string schemas
export const emailSchema = z
  .email({ error: "Please enter a valid email address" })
  .min(1, { error: "Email is required" });

export const phoneNumberSchema = z
  .string()
  .regex(phoneNumberRegex, {
    error: "Please enter a valid phone number",
  })
  .min(10, { error: "Phone number must be at least 10 digits" })
  .max(15, { error: "Phone number must be at most 15 digits" });

export const fullNameSchema = z
  .string()
  .min(2, { error: "Full name must be at least 2 characters" })
  .max(100, { error: "Full name must be less than 100 characters" })
  .regex(fullNameRegex, {
    error: "Full name can only contain letters and spaces",
  });

export const firstNameSchema = z
  .string()
  .min(1, { error: "First name is required" })
  .max(50, { error: "First name must be less than 50 characters" })
  .regex(nameRegex, { error: "First name can only contain letters" });

export const lastNameSchema = z
  .string()
  .min(1, { error: "Last name is required" })
  .max(50, { error: "Last name must be less than 50 characters" })
  .regex(nameRegex, { error: "Last name can only contain letters" });

// Password schemas
export const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters" })
  .regex(passwordRegex, {
    error:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

export const strongPasswordSchema = z
  .string()
  .min(12, { error: "Password must be at least 12 characters" })
  .regex(passwordRegex, {
    error:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

// URL and domain schemas
export const urlSchema = z.string().url({ error: "Please enter a valid URL" });

export const websiteSchema = z.string().regex(websiteRegex, {
  error: "Please enter a valid website URL",
});

// Date schemas
export const dateSchema = z
  .string()
  .regex(dateRegex, { error: "Date must be in YYYY-MM-DD format" });

export const birthdateSchema = z
  .string()
  .regex(dateRegex, {
    error: "Birthdate must be in YYYY-MM-DD format",
  })
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    },
    { error: "Must be between 13 and 120 years old" },
  );

// Numeric schemas
export const positiveIntegerSchema = z
  .number()
  .int({ error: "Must be a whole number" })
  .positive({ error: "Must be a positive number" });

// Text content schemas
export const slugSchema = z
  .string()
  .regex(slugRegex, {
    error: "Slug must be lowercase letters, numbers, and hyphens only",
  })
  .min(3, { error: "Slug must be at least 3 characters" })
  .max(50, { error: "Slug must be less than 50 characters" });

export const usernameSchema = z
  .string()
  .regex(usernameRegex, {
    error: "Username can only contain letters, numbers, and underscores",
  })
  .min(3, { error: "Username must be at least 3 characters" })
  .max(30, { error: "Username must be less than 30 characters" });

// File and image schemas
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    error: "File size must be less than 5MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    { error: "File must be a JPEG, PNG, or WebP image" },
  );

export const documentFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    error: "File size must be less than 10MB",
  })
  .refine(
    (file) =>
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    { error: "File must be a PDF or Word document" },
  );
