"use client";

import FileContainer from "@/components/shared/file-container";
import FolderContainer from "@/components/shared/folder-container";
import NewFolderButton from "@/components/shared/new-folder-button";
import UploadFileButton from "@/components/shared/upload-file-button";
import UploadFileDropZone from "@/components/shared/upload-file-dropzone";
import FileSkeleton from "@/components/skeleton/file-skeleton";
import FolderSkeleton from "@/components/skeleton/folder-skeleton";
import usePath from "@/hooks/use-path";
import { getFileIcon } from "@/lib/utils";
import { api } from "@/trpc/react";
import { HardDrive } from "lucide-react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { path } = usePath();
  const { data: session } = useSession();

  const { data: folders, isPending: isPendingFolders } =
    api.dashboard.getFoldersAccordingToPath.useQuery({
      path: path,
    });
  const { data: files, isPending: isPendingFiles } =
    api.dashboard.getFilesAccordingToParentPath.useQuery({
      parentPath: path,
    });

  const isLoading = isPendingFolders || isPendingFiles;
  const isEmpty = !isLoading && folders?.length === 0 && files?.length === 0;

  return (
    <div className="w-full">
      {/* Grid Header */}
      <div className="mb-4 rounded-lg p-4">
        <div className="hidden items-center justify-between lg:flex">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <HardDrive className="size-5" /> {session?.user.name}&apos;s Drive
          </h2>
          <div className="flex gap-2">
            <UploadFileButton variant="secondary" />
            <NewFolderButton variant="secondary" />
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div className="px-4">
          <UploadFileDropZone className="flex min-h-[50vh] items-center justify-center" />
        </div>
      ) : (
        <>
          {/* Folders Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">Folders</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
              {isPendingFolders
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <FolderSkeleton key={idx} />
                  ))
                : folders?.map((item) => (
                    <FolderContainer
                      key={item.id}
                      name={item.name}
                      href={item.path + "/" + item.name}
                      createdAt={item.createdAt.toLocaleDateString()}
                    />
                  ))}
            </div>
          </div>

          {/* Files Section */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Files</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
              {isPendingFiles
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <FileSkeleton key={idx} />
                  ))
                : files?.map((item) => (
                    <FileContainer
                      key={item.id}
                      Icon={getFileIcon(item.type)}
                      name={item.name}
                      size={Number(item.size)}
                      type={item.type}
                      createdAt={item.createdAt}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
