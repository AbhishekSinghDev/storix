import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <HydrateClient>
      <div>page</div>
    </HydrateClient>
  );
}
