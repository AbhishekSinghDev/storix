"use client";

import type { DivProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

type FolderContainerProps = DivProps & {
  name: string;
  createdAt: string;
};

const FolderContainer = ({
  name,
  createdAt,
  className,
  ...props
}: FolderContainerProps) => {
  return (
    <div
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
    </div>
  );
};

export default FolderContainer;
