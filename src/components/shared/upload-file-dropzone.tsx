"use client";

import { useCallback, useRef, useState } from "react";
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
import { formatFileSize, getFileTypeFromExtension } from "@/lib/functions";
import Image from "next/image";
import { api } from "@/trpc/react";
import LoadingButton from "./loading-button";

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

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

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
  const abortControllerRef = useRef<Record<string, AbortController>>({});

  const getUploadUrl = api.aws.getUploadUrl.useMutation();
  const initiateMultipart = api.aws.initiateMultipartUpload.useMutation();
  const getPartUrl = api.aws.getPartUploadUrl.useMutation();
  const completeMultipart = api.aws.completeMultipartUpload.useMutation();

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

  const uploadFile = useCallback(async (file: File) => {
    try {
      // Create abort controller for this upload
      const controller = new AbortController();
      abortControllerRef.current[file.name] = controller;

      if (file.size <= CHUNK_SIZE) {
        await handleSimpleUpload(file, controller.signal);
      } else {
        await handleMultipartUpload(file, controller.signal);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadFiles((prev) =>
        prev.map((u) =>
          u.file.name === file.name
            ? {
                ...u,
                status: "error" as const,
                error: (error as Error).message,
              }
            : u,
        ),
      );
    }
  }, []);

  const handleSimpleUpload = async (file: File, signal: AbortSignal) => {
    // Get presigned URL from your backend
    const { url, key } = await getUploadUrl.mutateAsync({
      filename: file.name,
      contentType: file.type,
    });

    // Upload directly to S3
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    // Update file status
    setUploadFiles((prev) =>
      prev.map((u) =>
        u.file.name === file.name
          ? { ...u, progress: 100, status: "success" as const }
          : u,
      ),
    );
  };

  const handleMultipartUpload = async (file: File, signal: AbortSignal) => {
    // 1. Initiate multipart upload
    const { uploadId, key } = await initiateMultipart.mutateAsync({
      filename: file.name,
      contentType: file.type,
    });

    // 2. Split file into chunks
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    const parts: { ETag: string; PartNumber: number }[] = [];

    for (let partNumber = 1; partNumber <= chunks; partNumber++) {
      if (signal.aborted) {
        throw new Error("Upload aborted");
      }

      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(partNumber * CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      if (!uploadId) {
        return;
      }

      // Get signed URL for this part
      const { url } = await getPartUrl.mutateAsync({
        key,
        uploadId,
        partNumber,
      });

      // Upload part
      const response = await fetch(url, {
        method: "PUT",
        body: chunk,
        signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload part ${partNumber}`);
      }

      const ETag = response.headers.get("ETag")?.replace(/"/g, "") ?? "";
      parts.push({ ETag, PartNumber: partNumber });

      // Update progress
      const progress = Math.round((partNumber / chunks) * 100);
      setUploadFiles((prev) =>
        prev.map((u) => (u.file.name === file.name ? { ...u, progress } : u)),
      );
    }

    if (!uploadId) {
      console.error("Upload Id not found in multipart upload func.");
      return;
    }

    // 3. Complete multipart upload
    await completeMultipart.mutateAsync({
      key,
      uploadId,
      parts,
    });

    // Mark as completed
    setUploadFiles((prev) =>
      prev.map((u) =>
        u.file.name === file.name
          ? { ...u, progress: 100, status: "success" as const }
          : u,
      ),
    );
  };

  const cancelUpload = (filename: string) => {
    const controller = abortControllerRef.current[filename];
    if (controller) {
      controller.abort();
      delete abortControllerRef.current[filename];
    }

    setUploadFiles((prev) =>
      prev.map((u) =>
        u.file.name === filename
          ? { ...u, status: "error" as const, error: "Upload cancelled" }
          : u,
      ),
    );
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      // Upload each file
      await Promise.all(
        uploadFiles
          .filter((f) => f.status === "queued")
          .map((f) => uploadFile(f.file)),
      );

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
          {isUploading ? (
            <LoadingButton text="Uploading Files..." />
          ) : (
            <Button
              onClick={handleUpload}
              disabled={
                uploadFiles.length === 0 ||
                uploadFiles.every((f) => f.status === "success")
              }
            >
              Upload Files
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFileDropZone;
