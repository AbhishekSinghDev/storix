import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FolderSkeleton = () => {
  return (
    <div className="group flex cursor-pointer flex-col rounded-lg border p-4 transition-colors hover:bg-secondary">
      <Skeleton className="h-6 w-6 text-blue-500" />
      <Skeleton className="truncate group-hover:text-blue-500" />
      <Skeleton className="h-3 self-end text-xs text-gray-500" />
    </div>
  );
};

export default FolderSkeleton;
