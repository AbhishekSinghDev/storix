import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { AppRouter } from "../../trpc-server.handler";
// Use the alias path for more reliable resolution
import { ThemeProvider } from "~/components/providers/theme-provider";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import appCss from "~/styles/app.css?url";

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => {
    // Add debugging to help troubleshoot

    return {
      title: "Storix",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
          // Add key to ensure the link is properly tracked
          key: "main-css",
        },
      ],
    };
  },
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <ThemeProvider defaultTheme="dark">
        <main className="px-4">
          <Header />
          <Outlet />
          <Footer />
        </main>
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </html>
  );
}
