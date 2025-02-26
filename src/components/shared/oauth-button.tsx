"use client";

import type { ButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type OAuthButtonProps = ButtonProps & {
  alt: string;
  icon: string;
  text: string;
  iconClassName?: string;
};

const OAuthButton = ({
  alt,
  icon,
  text,
  className,
  iconClassName,
  ...props
}: OAuthButtonProps) => {
  return (
    <Button variant="outline" className={cn("w-full", className)} {...props}>
      <Image
        src={icon}
        alt={alt}
        height={100}
        width={100}
        className={cn("size-6 dark:invert", iconClassName)}
      />
      {text}
    </Button>
  );
};

export default OAuthButton;
