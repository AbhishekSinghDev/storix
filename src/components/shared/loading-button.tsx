import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const LoadingButton = ({
  text,
  className,
  textClassName,
  ...props
}: ButtonProps & { text: string; textClassName?: string }) => {
  return (
    <Button className={cn(className)} {...props} disabled>
      <Loader2 className="animate-spin" />
      <span className={cn(textClassName)}>{text}</span>
    </Button>
  );
};

export default LoadingButton;
