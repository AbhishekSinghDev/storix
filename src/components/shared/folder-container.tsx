"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Folder } from "lucide-react";
import Link, { type LinkProps } from "next/link";

type FolderContainerProps = LinkProps & {
  id: string;
  name: string;
  className?: string;
  createdAt: string;
};

const FolderContainer = ({
  id,
  name,
  href,
  createdAt,
  className,
  ...props
}: FolderContainerProps) => {
  const { mutate: addToHistory } =
    api.dashboard.addFolderToUserRecentlyViewedFolders.useMutation();

  const fullPath =
    typeof href === "string"
      ? `/dashboard${href}`
      : {
          pathname: `/dashboard${href.pathname ?? ""}`,
          ...href,
        };

  const handleAddToUserHistory = () => {
    addToHistory({ folderId: id });
  };

  return (
    <Link
      href={fullPath}
      onClick={handleAddToUserHistory}
      className={cn(
        "group flex cursor-pointer flex-col rounded-lg border p-4 transition-colors hover:bg-secondary",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Folder className="h-6 w-6 text-blue-500" />
        <span className="truncate group-hover:text-blue-500">{name}</span>
      </div>
      <div className="self-end text-xs text-gray-500">{createdAt}</div>
    </Link>
  );
};

export default FolderContainer;
