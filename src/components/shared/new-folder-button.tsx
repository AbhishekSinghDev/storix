"use client";

import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { NEW_FOLDER_DIALOG_STATE_KEY } from "@/lib/constant";

const NewFolderButton = ({
  className,
  textClassName,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  const openNewFolderDialog = () => {
    const url = new URL(window.location.href);
    url.searchParams.set(NEW_FOLDER_DIALOG_STATE_KEY, "true");
    history.pushState({}, "", url.toString());
  };

  return (
    <Button className={cn(className)} {...props} onClick={openNewFolderDialog}>
      <FolderPlus /> <span className={cn(textClassName)}>New Folder</span>
    </Button>
  );
};

export default NewFolderButton;
