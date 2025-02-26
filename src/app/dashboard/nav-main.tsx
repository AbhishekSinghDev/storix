"use client";

import { ChevronRight, Folder } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MOCK_FOLDERS } from "@/lib/constant";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Visited Folders</SidebarGroupLabel>
      <SidebarMenu>
        {MOCK_FOLDERS.map((folder) => (
          <SidebarMenuButton tooltip={folder.name} key={folder.id}>
            <Folder />
            <span>{folder.name}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
