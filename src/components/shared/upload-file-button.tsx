"use client";

import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { UPLOAD_DIALOG_STATE_KEY } from "@/lib/constant";

const UploadFileButton = ({
  textClassName,
  className,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  const openUploadDialog = () => {
    const url = new URL(window.location.href);
    url.searchParams.set(UPLOAD_DIALOG_STATE_KEY, "true");
    history.pushState({}, "", url.toString());
  };

  return (
    <Button className={cn(className)} {...props} onClick={openUploadDialog}>
      <CloudUpload /> <span className={cn(textClassName)}>Upload File</span>
    </Button>
  );
};

export default UploadFileButton;
