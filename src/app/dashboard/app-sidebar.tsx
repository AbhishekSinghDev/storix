"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavTabs from "./nav-tabs";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import ProductBranding from "./product-branding";
import type { Session } from "next-auth";
import { SIDEBAR_LINKS } from "@/lib/constant";
import { Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { TRecentlyVisitedFolder } from "@/lib/prisma-extended-types";

type AppSidebarProps = {
  session?: Session;
  recentFolders: TRecentlyVisitedFolder[];
};

export function AppSidebar({
  session,
  recentFolders,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <ProductBranding />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton tooltip="Home" asChild>
              <Link
                href="/dashboard/home"
                className={cn(
                  pathname === "/dashboard/home" && "bg-secondary px-4 py-5",
                )}
              >
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>

        <NavMain recentFolders={recentFolders} />
        <NavTabs projects={SIDEBAR_LINKS.tabs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
