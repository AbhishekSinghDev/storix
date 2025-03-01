/*
  Warnings:

  - A unique constraint covering the columns `[userId,folderId]` on the table `RecentlyVisitedFolders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecentlyVisitedFolders_userId_folderId_key" ON "RecentlyVisitedFolders"("userId", "folderId");
