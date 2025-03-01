import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import NavigationBreadcumbs from "../navigation-breadcrumbs";
import UploadFileButton from "@/components/shared/upload-file-button";
import NewFolderButton from "@/components/shared/new-folder-button";
import UploadFileDialog from "@/components/shared/upload-file-dialog";
import { api } from "@/trpc/server";
import NewFolderDialog from "@/components/shared/new-folder-dialog";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  const config = await api.user.isS3Configured();
  if (!config.isS3Configured) {
    redirect("/dashboard");
  }

  const rootFolder = await api.dashboard.getRootFolder();
  if (!rootFolder) {
    redirect("/signin");
  }

  const recentFolders = await api.dashboard.getRecentlyVisitedFolders();

  return (
    <>
      <SidebarProvider>
        <AppSidebar session={session} recentFolders={recentFolders} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex flex-1 items-center justify-between">
                <NavigationBreadcumbs />
                <div className="flex items-center gap-2">
                  <UploadFileButton
                    className="lg:hidden"
                    textClassName="sr-only"
                    variant="secondary"
                  />
                  <NewFolderButton
                    className="lg:hidden"
                    textClassName="sr-only"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>

      <UploadFileDialog />
      <NewFolderDialog folder={rootFolder} />
    </>
  );
};

export default Layout;
