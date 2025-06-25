export const phoneNumberRegex = /^[\+]?[1-9][\d]{0,15}$/;
export const fullNameRegex = /^[a-zA-Z\s]+$/;
export const nameRegex = /^[a-zA-Z]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
export const websiteRegex =
  /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const usernameRegex = /^[a-zA-Z0-9_]+$/;

// S3 related regex patterns
export const s3BucketNameRegex = /^[a-z0-9.-]*$/;
export const s3BucketStartEndRegex = /^[a-z0-9]/;
export const s3BucketEndRegex = /[a-z0-9]$/;
export const s3IpAddressRegex = /^\d+\.\d+\.\d+\.\d+$/;
export const s3ControlCharactersRegex = /[\x00-\x1F\x7F]/;
export const s3RegionFormatRegex = /^[a-z0-9-]+$/;
export const s3MetadataKeyRegex = /^[a-zA-Z0-9-_]+$/;
