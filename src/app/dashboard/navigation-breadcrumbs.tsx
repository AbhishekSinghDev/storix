"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const NavigationBreadcumbs = () => {
  const pathname = usePathname();
  const paths = useMemo(() => pathname.split("/"), [pathname]);
  const filteredPaths = paths[0] === "" ? paths.slice(1) : paths;

  let currentPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block"></BreadcrumbItem>
        {filteredPaths.map((path, idx) => {
          currentPath += `/${path}`;
          return (
            <React.Fragment key={`path-${path}-${idx}`}>
              <BreadcrumbSeparator
                className={cn("hidden md:block", idx === 0 && "md:hidden")}
              />
              <BreadcrumbItem className="hidden md:block">
                <Link
                  href={currentPath}
                  className="capitalize transition-colors hover:text-foreground"
                >
                  {path}
                </Link>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavigationBreadcumbs;
