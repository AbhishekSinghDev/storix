import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default Layout;
