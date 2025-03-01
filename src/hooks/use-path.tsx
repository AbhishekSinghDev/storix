"use client";

import { usePathname } from "next/navigation";

const usePath = () => {
  const pathname = usePathname();

  const cleanPath = pathname?.replace(/^\/dashboard/, "") || "/";

  return {
    path: cleanPath,
    segments: cleanPath.split("/").filter(Boolean),
    isRoot: cleanPath === "/home",
  };
};

export default usePath;
