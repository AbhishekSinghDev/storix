import { createFileRoute } from "@tanstack/react-router";

import LandingPage from "~/components/landing-page";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  ssr: false,
  // Disable SSR for this route to fix Framer Motion
});

function IndexComponent() {
  return (
    <main className="mx-auto flex min-h-[100dvh] flex-col">
      <LandingPage />
    </main>
  );
}
