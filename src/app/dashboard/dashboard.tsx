"use client";

import FileContainer from "@/components/shared/file-container";
import FolderContainer from "@/components/shared/folder-container";
import NewFileButton from "@/components/shared/new-file-button";
import UploadButton from "@/components/shared/upload-button";
import { DASHBOARD_MOCK_FILES, DASHBOARD_MOCK_FOLDERS } from "@/lib/constant";
import { getFileIcon } from "@/lib/utils";
import { Folder, HardDrive } from "lucide-react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {/* Grid Header */}
      <div className="mb-4 rounded-lg p-4">
        <div className="hidden items-center justify-between lg:flex">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <HardDrive className="size-5" /> {session?.user.name}&apos;s Drive
          </h2>
          <div className="flex gap-2">
            <UploadButton variant="secondary" />
            <NewFileButton variant="secondary" />
          </div>
        </div>
      </div>

      {/* Folders Section */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium">Folders</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {DASHBOARD_MOCK_FOLDERS.map((folder) => (
            <FolderContainer
              key={folder.id}
              name={folder.name}
              createdAt={new Date(folder.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div>
        <h3 className="mb-3 text-sm font-medium">Files</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {DASHBOARD_MOCK_FILES.map((file) => (
            <FileContainer
              key={file.id}
              Icon={getFileIcon(file.type)}
              name={file.name}
              size={file.size}
              type={file.type}
              createdAt={new Date(file.createdAt)}
            />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {DASHBOARD_MOCK_FOLDERS.length === 0 &&
        DASHBOARD_MOCK_FILES.length === 0 && (
          <div className="mt-8 p-8 text-center text-gray-500">
            <Folder className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg">This folder is empty</p>
            <p className="text-sm">Drop files here or use the upload button</p>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
