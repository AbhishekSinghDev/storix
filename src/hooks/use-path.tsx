"use client";

import { cleanPathString } from "@/lib/functions";
import { usePathname } from "next/navigation";

const usePath = () => {
  const pathname = usePathname();

  const cleanPath = pathname ? cleanPathString(pathname) : "/";
  console.log(cleanPath);

  return {
    path: cleanPath,
    segments: cleanPath.split("/").filter(Boolean),
    isRoot: cleanPath === "/home",
  };
};

export default usePath;
