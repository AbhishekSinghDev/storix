import type { FileTypeEnum } from "@prisma/client";
import { Folder, File, Image, Video, Music, BookText } from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFileIcon = (type: FileTypeEnum) => {
  switch (type) {
    case "IMAGE":
      return Image;
    case "VIDEO":
      return Video;
    case "AUDIO":
      return Music;
    case "DOCUMENT":
      return BookText;
    default:
      return File;
  }
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};
