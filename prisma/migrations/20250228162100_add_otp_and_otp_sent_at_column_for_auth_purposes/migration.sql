/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpSentAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_otp_key" ON "User"("otp");
