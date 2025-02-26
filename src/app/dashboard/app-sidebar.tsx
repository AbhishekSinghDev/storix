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

type AppSidebarProps = {
  session: Session;
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <ProductBranding />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton tooltip="Home" asChild>
              <Link href="/dashboard/home">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>

        <NavMain />
        <NavTabs projects={SIDEBAR_LINKS.tabs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
