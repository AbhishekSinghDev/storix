import FileContainer from "@/components/shared/file-container";
import FolderContainer from "@/components/shared/folder-container";
import NewFolderButton from "@/components/shared/new-folder-button";
import UploadFileButton from "@/components/shared/upload-file-button";
import UploadFileDropZone from "@/components/shared/upload-file-dropzone";
import type { TFile, TFolder } from "@/lib/prisma-extended-types";
import { auth } from "@/server/auth";
import { Folder, HardDrive, File } from "lucide-react";

type DashboardProps = {
  folders: TFolder[];
  files: TFile[];
};

const Dashboard = async ({ folders, files }: DashboardProps) => {
  const session = await auth();
  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="w-full">
      {/* this was just for testing purpose i will remove it later */}
      {/* <img
        src="https://storix-test.s3.ap-south-1.amazonaws.com/github-svgrepo-com.svg"
        alt="github"
        height={100}
        width={100}
        className="size-[200px]"
      /> */}

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
            {folders.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
                {folders.map((item) => (
                  <FolderContainer
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    href={item.path + "/" + item.name}
                    createdAt={item.createdAt.toLocaleDateString()}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="folder" />
            )}
          </div>

          {/* Files Section */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Files</h3>
            {files.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
                {files.map((item) => (
                  <FileContainer
                    key={item.id}
                    name={item.name}
                    size={Number(item.size)}
                    type={item.type}
                    createdAt={item.createdAt}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="file" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

const EmptyState = ({ type }: { type: "folder" | "file" }) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
      {type === "folder" ? (
        <>
          <Folder className="mb-2 size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No folders created yet
          </p>
          <p className="text-xs text-muted-foreground">
            Click the &quot;New Folder&quot; button to create one
          </p>
        </>
      ) : (
        <>
          <File className="mb-2 size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No files uploaded yet</p>
          <p className="text-xs text-muted-foreground">
            Drag and drop files or use the &quot;Upload&quot; button
          </p>
        </>
      )}
    </div>
  );
};
