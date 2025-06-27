import { S3ValidationError } from "../errors/S3Error";

export const validateKey = (key: string): void => {
  if (!key || typeof key !== "string") {
    throw new S3ValidationError("Key must be a non-empty string");
  }
  if (key.length > 1024) {
    throw new S3ValidationError("Key must be less than 1024 characters");
  }
};

export const validateContentType = (contentType: string): void => {
  if (!contentType || typeof contentType !== "string") {
    throw new S3ValidationError("Content type must be a non-empty string");
  }
};

export const validateExpiresIn = (expiresIn: number): void => {
  if (expiresIn <= 0 || expiresIn > 604800) {
    // Max 7 days
    throw new S3ValidationError(
      "ExpiresIn must be between 1 and 604800 seconds"
    );
  }
};
