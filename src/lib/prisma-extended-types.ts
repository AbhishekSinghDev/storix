import type { File, Folder, Prisma } from "@prisma/client";

export type TFolder = Folder;
export type TFile = File;
export type TRecentlyVisitedFolder = Prisma.RecentlyVisitedFoldersGetPayload<{
  select: {
    id: true;
    folder: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
