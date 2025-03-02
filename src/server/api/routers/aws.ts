import { z } from "zod";
import { S3Service } from "../service/s3service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const awsRouter = createTRPCRouter({
  // Get a presigned URL for direct upload (small files)
  getUploadUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        path: z.string().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const s3Service = new S3Service();
      const userId = ctx.session.user.id;
      const { filename, contentType, path } = input;

      const key = path ? `${path}/${filename}` : filename;

      return {
        url: await s3Service.getPresignedUploadUrl(userId, key, contentType),
        key,
      };
    }),

  // Initiate multipart upload (large files)
  initiateMultipartUpload: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        path: z.string().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const s3Service = new S3Service();
      const userId = ctx.session.user.id;
      const { filename, contentType, path } = input;

      const key = path ? `${path}/${filename}` : filename;

      return s3Service.initiateMultipartUpload(userId, key, contentType);
    }),

  // Get URL to upload a part
  getPartUploadUrl: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        uploadId: z.string(),
        partNumber: z.number().int().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const s3Service = new S3Service();
      const userId = ctx.session.user.id;

      return {
        url: await s3Service.getPartUploadUrl(
          userId,
          input.key,
          input.uploadId,
          input.partNumber,
        ),
        partNumber: input.partNumber,
      };
    }),

  // Complete multipart upload
  completeMultipartUpload: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        uploadId: z.string(),
        parts: z.array(
          z.object({
            ETag: z.string(),
            PartNumber: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const s3Service = new S3Service();
      const userId = ctx.session.user.id;

      await s3Service.completeMultipartUpload(
        userId,
        input.key,
        input.uploadId,
        input.parts,
      );

      // Record the file in your database if needed
      return { success: true, key: input.key };
    }),

  // List files/folders
  listFiles: protectedProcedure
    .input(
      z.object({
        path: z.string().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      const s3Service = new S3Service();
      const userId = ctx.session.user.id;

      const response = await s3Service.listFiles(userId, input.path);

      // Process the response to create a folder-like structure
      const files =
        response.Contents?.map((item) => ({
          key: item.Key ?? "",
          size: item.Size ?? 0,
          lastModified: item.LastModified,
          isFolder: item.Key?.endsWith("/") ?? false,
        })) ?? [];

      return files;
    }),
});

export default awsRouter;
