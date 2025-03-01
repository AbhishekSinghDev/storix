import { headers } from "next/headers";
import Dashboard from "../dashboard";
import { api } from "@/trpc/server";

const Main = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");

  // this check is for both the pathname must not be null and pathname must include '/home'. before that there will be no api call.
  if (!pathname?.includes("/home")) return null;

  const folders = await api.dashboard.getFoldersAccordingToPath({
    path: pathname.replace(/^\/dashboard/, "") || "/",
  });
  const files = await api.dashboard.getFilesAccordingToParentPath({
    parentPath: pathname.replace(/^\/dashboard/, "") || "/",
  });

  return <Dashboard folders={folders} files={files} />;
};

export default Main;
