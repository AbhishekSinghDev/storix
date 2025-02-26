import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import type { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const UploadButton = ({
  textClassName,
  className,
  ...props
}: ButtonProps & { textClassName?: string }) => {
  return (
    <Button className={cn(className)} {...props}>
      <CloudUpload /> <span className={cn(textClassName)}>Upload File</span>
    </Button>
  );
};

export default UploadButton;
