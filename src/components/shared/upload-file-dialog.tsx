"use client";

import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { UPLOAD_DIALOG_STATE_KEY } from "@/lib/constant";
import UploadFileDropZone from "./upload-file-dropzone";

const UploadFileDialog = () => {
  const searchParams = useSearchParams();
  const isOpen = !!searchParams.get(UPLOAD_DIALOG_STATE_KEY);

  const handleClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(UPLOAD_DIALOG_STATE_KEY);
    history.pushState({}, "", url.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </DialogTitle>
        </DialogHeader>
        <UploadFileDropZone onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileDialog;
