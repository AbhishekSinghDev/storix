import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FileSkeleton = () => {
  return (
    <div className="group cursor-pointer rounded-lg border p-4 transition-colors hover:bg-secondary">
      <Skeleton className="size-6 text-gray-500" />
      <Skeleton className="truncate group-hover:text-blue-500" />
      <Skeleton className="flex items-center justify-between text-xs text-gray-500" />
      <Skeleton className="mt-2 h-3" />
    </div>
  );
};

export default FileSkeleton;
