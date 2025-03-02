import { decryptCredential } from "@/lib/s3";
import { db } from "@/server/db";
import {
  S3Client,
  PutObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Service {
  private getS3Client = async (userId: string) => {
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const accessKeyId = decryptCredential(s3AccessKey, s3AccessKeyIv);
    const secretAccessKey = decryptCredential(s3AccessKey, s3AccessKeyIv);
    const region = decryptCredential(s3Region, s3RegionIv);

    return new S3Client({
      region: region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  };

  // For small files - generate presigned URL for direct upload
  async getPresignedUploadUrl(
    userId: string,
    key: string,
    contentType: string,
  ): Promise<string> {
    const s3Client = await this.getS3Client(userId);
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const bucket = decryptCredential(s3Bucket, s3BucketIv);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    // URL expires in 15 minutes
    return getSignedUrl(s3Client, command, { expiresIn: 900 });
  }

  // For large files - initiate multipart upload
  async initiateMultipartUpload(
    userId: string,
    key: string,
    contentType: string,
  ) {
    const s3Client = await this.getS3Client(userId);
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const bucket = decryptCredential(s3Bucket, s3BucketIv);

    const command = new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const response = await s3Client.send(command);

    return {
      uploadId: response.UploadId,
      key: key,
    };
  }

  // Get signed URL for uploading each part
  async getPartUploadUrl(
    userId: string,
    key: string,
    uploadId: string,
    partNumber: number,
  ) {
    const s3Client = await this.getS3Client(userId);
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const bucket = decryptCredential(s3Bucket, s3BucketIv);

    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    return getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  // Complete multipart upload after all parts are uploaded
  async completeMultipartUpload(
    userId: string,
    key: string,
    uploadId: string,
    parts: { ETag: string; PartNumber: number }[],
  ) {
    const s3Client = await this.getS3Client(userId);
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const bucket = decryptCredential(s3Bucket, s3BucketIv);

    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    });

    return s3Client.send(command);
  }

  // List files in bucket
  async listFiles(userId: string, prefix: string) {
    const s3Client = await this.getS3Client(userId);
    const s3Config = await db.user.findUnique({
      where: { id: userId },
      select: {
        s3AccessKey: true,
        s3AccessKeyIv: true,
        s3Bucket: true,
        s3BucketIv: true,
        s3Region: true,
        s3RegionIv: true,
        s3SecretKey: true,
        s3SecretKeyIv: true,
      },
    });

    if (!s3Config) {
      throw new Error("S3 configuration not found");
    }

    const {
      s3AccessKey,
      s3AccessKeyIv,
      s3Bucket,
      s3BucketIv,
      s3Region,
      s3RegionIv,
      s3SecretKey,
      s3SecretKeyIv,
    } = s3Config;

    if (
      !s3AccessKey ||
      !s3AccessKeyIv ||
      !s3Bucket ||
      !s3BucketIv ||
      !s3Region ||
      !s3RegionIv ||
      !s3SecretKey ||
      !s3SecretKeyIv
    ) {
      throw new Error("S3 configuration not found");
    }

    const bucket = decryptCredential(s3Bucket, s3BucketIv);

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    return s3Client.send(command);
  }

  // todo: add more methods to download, delete etc.
}
