import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { bucketConfigurationSchema } from "@/lib/zod-schema";
import { encryptCredential } from "@/lib/s3";

const userRouter = createTRPCRouter({
  configureS3: protectedProcedure
    .input(bucketConfigurationSchema)
    .mutation(async ({ ctx, input }) => {
      const { s3AccessKey, s3BucketKey, s3Region, s3SecretKey } = input;

      const encryptedAccessKey = encryptCredential(s3AccessKey);
      const encryptedSecretKey = encryptCredential(s3SecretKey);
      const encryptedBucketName = encryptCredential(s3BucketKey);
      const encryptedRegionName = encryptCredential(s3Region);

      try {
        await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            s3AccessKey: encryptedAccessKey.encryptedData,
            s3AccessKeyIv: encryptedAccessKey.iv,
            s3Bucket: encryptedBucketName.encryptedData,
            s3BucketIv: encryptedBucketName.iv,
            s3Region: encryptedRegionName.encryptedData,
            s3RegionIv: encryptedRegionName.iv,
            s3SecretKey: encryptedSecretKey.encryptedData,
            s3SecretKeyIv: encryptedSecretKey.iv,
            s3ConfiguredAt: new Date(),
          },
        });

        return {
          message: "Your bucket has been configured successfully!",
        };
      } catch (err) {
        console.error("Failed to configure s3: ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to configure your bucket.",
        });
      }
    }),
  isS3Configured: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          s3ConfiguredAt: true,
        },
      });

      return {
        isS3Configured: !!user?.s3ConfiguredAt,
      };
    } catch (err) {
      console.error("Failed to check weither s3 configured or not: ", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check s3 configuration",
      });
    }
  }),
});

export default userRouter;
