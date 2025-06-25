import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { S3ConfigurationError, S3Error } from "./error";
import type {
  CopyObjectOptions,
  FileOperationResult,
  ListObjectsOptions,
  ListObjectsResult,
  PresignedUrlOptions,
  S3Config,
  S3Object,
} from "./types";
import { validateContentType, validateExpiresIn, validateKey } from "./utils";

export class S3Service {
  private client: S3Client;
  private bucketName: string;

  constructor(config: S3Config) {
    this.validateConfig(config);

    this.bucketName = config.bucketName;
    this.client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  private validateConfig(config: S3Config): void {
    const required = ["region", "accessKeyId", "secretAccessKey", "bucketName"];
    for (const field of required) {
      if (!config[field as keyof S3Config]) {
        throw new S3ConfigurationError(
          `Missing required configuration: ${field}`
        );
      }
    }
  }

  /**
   * Generate a presigned URL for uploading a file
   */
  async getPresignedUploadUrl(
    key: string,
    options: PresignedUrlOptions = {}
  ): Promise<FileOperationResult> {
    try {
      validateKey(key);

      const {
        expiresIn = 600,
        contentType = "application/octet-stream",
        isPublic = false,
      } = options;

      if (contentType) validateContentType(contentType);
      validateExpiresIn(expiresIn);

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType,
        ACL: isPublic ? ObjectCannedACL.public_read : ObjectCannedACL.private,
      });

      const url = await getSignedUrl(this.client, command, { expiresIn });

      return { success: true, url };
    } catch (error) {
      return this.handleError("Failed to generate presigned upload URL", error);
    }
  }

  /**
   * Generate a presigned URL for downloading a private file
   */
  async getPresignedDownloadUrl(
    key: string,
    expiresIn = 600
  ): Promise<FileOperationResult> {
    try {
      validateKey(key);
      validateExpiresIn(expiresIn);

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.client, command, { expiresIn });

      return { success: true, url };
    } catch (error) {
      return this.handleError(
        "Failed to generate presigned download URL",
        error
      );
    }
  }

  /**
   * Get public URL for a file (assumes bucket/object is public)
   */
  getPublicUrl(key: string): string {
    validateKey(key);
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<FileOperationResult> {
    try {
      validateKey(key);

      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.client.send(command);

      return { success: true };
    } catch (error) {
      return this.handleError("Failed to delete file", error);
    }
  }

  /**
   * Check if a file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      validateKey(key);

      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.client.send(command);
      return true;
    } catch (error) {
      console.error("File existence check failed", error);
      return false;
    }
  }

  /**
   * List objects in the bucket
   */
  async listObjects(
    options: ListObjectsOptions = {}
  ): Promise<ListObjectsResult> {
    try {
      const { prefix = "", maxKeys = 1000, continuationToken } = options;

      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys,
        ContinuationToken: continuationToken,
      });

      const response = await this.client.send(command);

      if (!response.Contents || response.Contents.length === 0) {
        throw new S3Error("No contents found", "NO_CONTENTS");
      }

      const objects: S3Object[] = response.Contents.map((obj) => ({
        key: obj.Key,
        lastModified: obj.LastModified,
        size: obj.Size,
        etag: obj.ETag,
      }));

      return {
        objects,
        isTruncated: response.IsTruncated ?? false,
        nextContinuationToken: response.NextContinuationToken,
      };
    } catch (error) {
      console.error("Failed to list objects", error);
      throw new S3Error("Failed to list objects", "LIST_ERROR");
    }
  }

  /**
   * Copy a file within the bucket
   */
  async copyFile(options: CopyObjectOptions): Promise<FileOperationResult> {
    try {
      const { sourceKey, destinationKey, isPublic = false } = options;

      validateKey(sourceKey);
      validateKey(destinationKey);

      const command = new CopyObjectCommand({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${sourceKey}`,
        Key: destinationKey,
        ACL: isPublic ? ObjectCannedACL.public_read : ObjectCannedACL.private,
      });

      await this.client.send(command);

      return { success: true };
    } catch (error) {
      return this.handleError("Failed to copy file", error);
    }
  }

  /**
   * Delete multiple files
   */
  async deleteFiles(
    keys: string[]
  ): Promise<{ success: boolean; failed: string[] }> {
    const failed: string[] = [];

    await Promise.allSettled(
      keys.map(async (key) => {
        const result = await this.deleteFile(key);
        if (!result.success) {
          failed.push(key);
        }
      })
    );

    return {
      success: failed.length === 0,
      failed,
    };
  }

  private handleError(message: string, error: unknown): FileOperationResult {
    console.error(message, error);

    if (error instanceof S3Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: message };
  }
}
