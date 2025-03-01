"use client";

import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UPLOAD_DIALOG_STATE_KEY } from "@/lib/constant";

const UploadFileButton = ({
  textClassName,
  className,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  const router = useRouter();

  const openUploadDialog = () => {
    router.replace(`?${UPLOAD_DIALOG_STATE_KEY}=true`, { scroll: false });
  };

  return (
    <Button className={cn(className)} {...props} onClick={openUploadDialog}>
      <CloudUpload /> <span className={cn(textClassName)}>Upload File</span>
    </Button>
  );
};

export default UploadFileButton;
