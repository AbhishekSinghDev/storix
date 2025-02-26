import S3ConfigurationCard from "@/components/shared/s3-configuration-card";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const config = await api.user.isS3Configured();

  if (config.isS3Configured) {
    redirect("/dashboard/home");
  }

  return <S3ConfigurationCard />;
};

export default page;
