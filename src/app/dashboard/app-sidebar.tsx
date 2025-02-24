"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavTabs from "./nav-tabs";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import ProductBranding from "./product-branding";
import type { Session } from "next-auth";
import { SIDEBAR_LINKS } from "@/lib/constant";

type AppSidebarProps = {
  session: Session;
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProductBranding />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_LINKS.navMain} />
        <NavTabs projects={SIDEBAR_LINKS.tabs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
