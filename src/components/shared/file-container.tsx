"use client";

import React from "react";

import type { DivProps } from "@/lib/types";
import { cn, formatFileSize, getFileIcon } from "@/lib/utils";
import type { FileTypeEnum } from "@prisma/client";

type FileProps = DivProps & {
  name: string;
  size: number;
  createdAt: Date;
  type: FileTypeEnum;
};

const FileContainer = ({
  name,
  size,
  type,
  createdAt,
  className,
  ...props
}: FileProps) => {
  const Icon = getFileIcon(type);

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border p-4 transition-colors hover:bg-secondary",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {
            <Icon
              className={cn(
                "size-6 text-gray-500",
                type === "IMAGE" && "text-green-500",
                type === "VIDEO" && "text-purple-500",
                type === "AUDIO" && "text-orange-500",
                type === "DOCUMENT" && "text-blue-500",
              )}
            />
          }
          <span className="truncate group-hover:text-blue-500">{name}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatFileSize(size)}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FileContainer;
