"use client";

import { ChevronRight, Folder, History } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { TRecentlyVisitedFolder } from "@/lib/prisma-extended-types";

type NavMainProps = {
  recentFolders: TRecentlyVisitedFolder[];
};

export function NavMain({ recentFolders }: NavMainProps) {
  return (
    <SidebarGroup>
      {recentFolders.length > 0 ? (
        <SidebarGroupLabel>Recently Visited Folders</SidebarGroupLabel>
      ) : null}
      <SidebarMenu>
        {recentFolders.length > 0 ? (
          recentFolders.map((folder) => (
            <SidebarMenuButton tooltip={folder.folder.name} key={folder.id}>
              <Folder className="shrink-0" />
              <span>{folder.folder.name}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-center">
            <History className="h-8 w-8 text-muted-foreground/50" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                No recent folders
              </p>
              <p className="text-xs text-muted-foreground/70">
                Folders you visit will appear here
              </p>
            </div>
          </div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
