-- AlterTable
ALTER TABLE "User" ADD COLUMN     "s3AccessKeyIv" TEXT,
ADD COLUMN     "s3BucketIv" TEXT,
ADD COLUMN     "s3RegionIv" TEXT,
ADD COLUMN     "s3SecretKeyIv" TEXT;
