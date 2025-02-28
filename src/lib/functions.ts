import { env } from "@/env";
import {
  GetObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getPresignedUrl = async (
  fileName: string,
  contentType: string,
  isPublic: boolean,
) => {
  try {
    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: "text",
      // Expires: addSeconds(new Date(), 600),
      ACL: isPublic ? ObjectCannedACL.public_read : ObjectCannedACL.private,
    };
    // try {
    const command = new PutObjectCommand(fileParams);
    const url = await getSignedUrl(client, command, { expiresIn: 10 * 60 });

    return { url };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while uploading the file." };
  }
};

export const getPublicFileUrl = (key: string) => {
  return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
};

export const getPrivateFileUrl = async (key: string, expiry = 10 * 60) => {
  try {
    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const fileParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    };
    const command = new GetObjectCommand(fileParams);
    return {
      url: await getSignedUrl(client, command, { expiresIn: expiry }),
    };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong while getting the file." };
  }
};

import {
  FileTypeEnumForUpload,
  FileUploadResponse,
  UploadFile,
} from "@/lib/types";
import { FILE_EXTENSIONS } from "@/lib/constant";

export const getFileTypeFromExtension = (
  fileName: string,
): FileTypeEnumForUpload => {
  const extension = `.${fileName.split(".").pop()?.toLowerCase()}`;

  if (FILE_EXTENSIONS.IMAGE.includes(extension))
    return FileTypeEnumForUpload.IMAGE;
  if (FILE_EXTENSIONS.AUDIO.includes(extension))
    return FileTypeEnumForUpload.AUDIO;
  if (FILE_EXTENSIONS.VIDEO.includes(extension))
    return FileTypeEnumForUpload.VIDEO;
  if (FILE_EXTENSIONS.DOCUMENT.includes(extension))
    return FileTypeEnumForUpload.DOCUMENT;
  if (FILE_EXTENSIONS.ARCHIVE.includes(extension))
    return FileTypeEnumForUpload.ARCHIVE;
  if (FILE_EXTENSIONS.CODE.includes(extension))
    return FileTypeEnumForUpload.CODE;
  return FileTypeEnumForUpload.OTHER;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const prepareFilesForUpload = (
  files: UploadFile[],
): FileUploadResponse => {
  const result: FileUploadResponse = {
    images: [],
    audio: [],
    video: [],
    documents: [],
    archives: [],
    code: [],
    other: [],
  };

  files.forEach((file) => {
    const url = file.preview ?? URL.createObjectURL(file.file);
    switch (file.type) {
      case FileTypeEnumForUpload.IMAGE:
        result.images.push(url);
        break;
      case FileTypeEnumForUpload.AUDIO:
        result.audio.push(url);
        break;
      case FileTypeEnumForUpload.VIDEO:
        result.video.push(url);
        break;
      case FileTypeEnumForUpload.DOCUMENT:
        result.documents.push(url);
        break;
      case FileTypeEnumForUpload.ARCHIVE:
        result.archives.push(url);
        break;
      case FileTypeEnumForUpload.CODE:
        result.code.push(url);
        break;
      default:
        result.other.push(url);
    }
  });

  return result;
};
