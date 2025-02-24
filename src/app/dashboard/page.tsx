import { auth } from "@/server/auth";
import Dashboard from "./dashboard";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <Dashboard session={session} />;
};

export default DashboardPage;
