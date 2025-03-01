import { headers } from "next/headers";
import Dashboard from "../dashboard";
import { api } from "@/trpc/server";

const Main = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");

  const data = await api.dashboard.getFoldersAndFilesAccordingToPath({
    path: pathname?.replace(/^\/dashboard/, "") ?? "/home",
  });

  return <Dashboard folders={data.folders} files={data.files} />;
};

export default Main;
