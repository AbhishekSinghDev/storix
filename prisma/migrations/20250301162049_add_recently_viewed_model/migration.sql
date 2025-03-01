-- CreateTable
CREATE TABLE "RecentlyVisitedFolders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecentlyVisitedFolders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentlyVisitedFolders" ADD CONSTRAINT "RecentlyVisitedFolders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyVisitedFolders" ADD CONSTRAINT "RecentlyVisitedFolders_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
