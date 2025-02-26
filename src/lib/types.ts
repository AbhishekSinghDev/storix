import type { FileTypeEnum } from "@prisma/client";
import type { HTMLAttributes } from "react";
import type { AWS_REGIONS } from "./constant";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type DivProps = React.DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TStatus = "loading" | "error" | "success" | "idle";
export type AWSRegion = keyof typeof AWS_REGIONS;

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
