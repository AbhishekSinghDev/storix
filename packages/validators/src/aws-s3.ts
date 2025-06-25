import { z } from "zod/v4";

import {
  s3BucketEndRegex,
  s3BucketNameRegex,
  s3BucketStartEndRegex,
  s3ControlCharactersRegex,
  s3IpAddressRegex,
  s3MetadataKeyRegex,
  s3RegionFormatRegex,
} from "./regex";

export const s3BucketNameSchema = z
  .string()
  .min(3, { error: "Bucket name must be at least 3 characters" })
  .max(63, { error: "Bucket name must be at most 63 characters" })
  .regex(s3BucketNameRegex, {
    error:
      "Bucket name can only contain lowercase letters, numbers, dots, and hyphens",
  })
  .regex(s3BucketStartEndRegex, {
    error: "Bucket name must start with a letter or number",
  })
  .regex(s3BucketEndRegex, {
    error: "Bucket name must end with a letter or number",
  })
  .refine((name) => !name.includes(".."), {
    error: "Bucket name cannot contain consecutive dots",
  })
  .refine((name) => !name.includes(".-") && !name.includes("-."), {
    error: "Bucket name cannot contain dot-hyphen or hyphen-dot combinations",
  })
  .refine((name) => !s3IpAddressRegex.test(name), {
    error: "Bucket name cannot be formatted as an IP address",
  });

export const s3ObjectKeySchema = z
  .string()
  .min(1, { error: "Object key cannot be empty" })
  .max(1024, { error: "Object key must be at most 1024 characters" })
  .refine((key) => !key.startsWith("/"), {
    error: "Object key cannot start with a forward slash",
  })
  .refine((key) => !s3ControlCharactersRegex.test(key), {
    error: "Object key cannot contain control characters",
  });

export const s3RegionSchema = z
  .string()
  .regex(s3RegionFormatRegex, { error: "Invalid AWS region format" })
  .refine(
    (region) =>
      [
        "us-east-1",
        "us-east-2",
        "us-west-1",
        "us-west-2",
        "eu-west-1",
        "eu-west-2",
        "eu-west-3",
        "eu-central-1",
        "eu-north-1",
        "ap-south-1",
        "ap-southeast-1",
        "ap-southeast-2",
        "ap-northeast-1",
        "ap-northeast-2",
        "ca-central-1",
        "sa-east-1",
        "af-south-1",
        "me-south-1",
      ].includes(region),
    { error: "Invalid AWS region" },
  );

export const s3MetadataSchema = z.record(
  z.string().regex(s3MetadataKeyRegex, {
    error:
      "Metadata key can only contain alphanumeric characters, hyphens, and underscores",
  }),
  z
    .string()
    .max(2048, { error: "Metadata value must be at most 2048 characters" }),
);

export const s3TagSchema = z.object({
  Key: z
    .string()
    .min(1, { error: "Tag key cannot be empty" })
    .max(128, { error: "Tag key must be at most 128 characters" }),
  Value: z
    .string()
    .max(256, { error: "Tag value must be at most 256 characters" }),
});

export const s3TagSetSchema = z
  .array(s3TagSchema)
  .max(10, { error: "Maximum 10 tags allowed" });
