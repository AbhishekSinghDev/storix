"use client";

import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { NEW_FOLDER_DIALOG_STATE_KEY } from "@/lib/constant";

const NewFolderButton = ({
  className,
  textClassName,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  const router = useRouter();

  const openNewFolderDialog = () => {
    router.replace(`?${NEW_FOLDER_DIALOG_STATE_KEY}=true`, { scroll: false });
  };

  return (
    <Button className={cn(className)} {...props} onClick={openNewFolderDialog}>
      <FolderPlus /> <span className={cn(textClassName)}>New Folder</span>
    </Button>
  );
};

export default NewFolderButton;
