"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Upload,
  File as FileIcon,
  X,
  Image as ImageIcon,
  Music,
  Video,
  FileText,
  Archive,
  Code,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { FileTypeEnumForUpload, type UploadFile } from "@/lib/types";
import {
  formatFileSize,
  getFileTypeFromExtension,
  prepareFilesForUpload,
} from "@/lib/functions";
import Image from "next/image";

const getFileIcon = (type: FileTypeEnumForUpload) => {
  switch (type) {
    case FileTypeEnumForUpload.IMAGE:
      return <ImageIcon className="size-10 text-blue-500" />;
    case FileTypeEnumForUpload.AUDIO:
      return <Music className="size-10 text-purple-500" />;
    case FileTypeEnumForUpload.VIDEO:
      return <Video className="size-10 text-red-500" />;
    case FileTypeEnumForUpload.DOCUMENT:
      return <FileText className="size-10 text-yellow-500" />;
    case FileTypeEnumForUpload.ARCHIVE:
      return <Archive className="size-10 text-orange-500" />;
    case FileTypeEnumForUpload.CODE:
      return <Code className="size-10 text-green-500" />;
    default:
      return <FileIcon className="size-10 text-gray-500" />;
  }
};

type UploadFileDropZoneProps = {
  onClose?: () => void;
  className?: string;
};

const UploadFileDropZone = ({
  onClose,
  className,
}: UploadFileDropZoneProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      progress: 0,
      status: "queued" as const,
      type: getFileTypeFromExtension(file.name),
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((rejection) => {
        toast.error(
          `Failed to add ${rejection.file.name}: ${rejection.errors[0]?.message}`,
        );
      });
    },
  });

  const removeFile = (id: string) => {
    setUploadFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const simulateUpload = async (id: string) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading" } : f)),
    );

    try {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f)),
        );
      }

      setUploadFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "success" } : f)),
      );
    } catch (error) {
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, status: "error", error: "Upload failed" } : f,
        ),
      );
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const filesByType = prepareFilesForUpload(uploadFiles);
      console.log("Files ready for upload:", filesByType);

      for (const file of uploadFiles.filter((f) => f.status === "queued")) {
        await simulateUpload(file.id);
      }

      toast.success("Files uploaded successfully!");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="grid gap-6">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/50",
          className,
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Drop files here"
              : "Drag & drop files or click to browse"}
          </p>
          <p className="text-xs text-gray-400">
            Supports images, audio, video, and documents up to 1GB
          </p>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {uploadFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-h-[50vh] space-y-3 overflow-y-auto"
          >
            {uploadFiles.map(
              ({ id, file, preview, status, progress, error, type }) => (
                <div
                  key={id}
                  className="relative flex items-center gap-3 rounded-lg p-4 dark:border dark:border-dashed"
                >
                  {/* File Preview/Icon */}
                  {preview ? (
                    <Image
                      src={preview}
                      alt={file.name}
                      height={500}
                      width={500}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    getFileIcon(type)
                  )}

                  {/* File Info */}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{type.toLowerCase()}</span>
                      {status === "success" && (
                        <span className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Uploaded
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {status === "error" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-yellow-500"
                        onClick={() => simulateUpload(id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFile(id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {status !== "queued" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1">
                      <div
                        className={cn("h-full transition-all duration-300", {
                          "bg-blue-500": status === "uploading",
                          "bg-green-500": status === "success",
                          "bg-red-500": status === "error",
                        })}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <p className="absolute -bottom-5 left-4 text-xs text-red-500">
                      {error}
                    </p>
                  )}
                </div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {uploadFiles.length} file{uploadFiles.length !== 1 && "s"} selected
        </p>
        <div className="flex gap-3">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button
            onClick={handleUpload}
            disabled={
              uploadFiles.length === 0 ||
              uploadFiles.every((f) => f.status === "success")
            }
          >
            Upload Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileDropZone;
