export interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

export interface PresignedUrlOptions {
  expiresIn?: number;
  contentType?: string;
  isPublic?: boolean;
}

export interface UploadResult {
  url: string;
  key: string;
}

export interface FileOperationResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface ListObjectsOptions {
  prefix?: string;
  maxKeys?: number;
  continuationToken?: string;
}

export interface S3Object {
  key: string;
  lastModified: Date;
  size: number;
  etag: string;
}

export interface ListObjectsResult {
  objects: S3Object[];
  isTruncated: boolean;
  nextContinuationToken?: string;
}

export interface CopyObjectOptions {
  sourceKey: string;
  destinationKey: string;
  isPublic?: boolean;
}
