import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const NewFileButton = ({
  className,
  textClassName,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  return (
    <Button className={cn(className)} {...props}>
      <FolderPlus /> <span className={cn(textClassName)}>New Folder</span>
    </Button>
  );
};

export default NewFileButton;
