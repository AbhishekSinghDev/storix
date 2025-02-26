import type { FileTypeEnum } from "@prisma/client";
import type { HTMLAttributes } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type DivProps = React.DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TStatus = "loading" | "error" | "success" | "idle";

export interface MockFile {
  id: string;
  name: string;
  type: FileTypeEnum;
  size: number;
  createdAt: string;
}

export interface MockFolder {
  id: string;
  name: string;
  createdAt: string;
}
