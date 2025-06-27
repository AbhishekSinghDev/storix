export { S3ServiceFactory } from "./factory";
export { S3Service } from "./service";

export type {
  CopyObjectOptions,
  FileOperationResult,
  ListObjectsOptions,
  ListObjectsResult,
  PresignedUrlOptions,
  S3Config,
  S3Object,
  UploadResult,
} from "./types";

export { S3ConfigurationError, S3Error, S3ValidationError } from "./error";
