import LandingPage from "@/components/landing-page/landing-page";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <LandingPage />
    </HydrateClient>
  );
}
