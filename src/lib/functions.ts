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
