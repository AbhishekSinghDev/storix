import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { AppRouter } from "../trpc-server.handler";
// Import the generated route tree
import { ThemeProvider } from "./-components/providers/theme-provider";
import { Spinner } from "./routes/-components/spinner";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      httpBatchLink({
        // since we are using Vinxi, the server is running on the same port,
        // this means in dev the url is `http://localhost:3000/trpc`
        // and since its from the same origin, we don't need to explicitly set the full URL
        url: "/trpc",
      }),
    ],
  }),
  queryClient,
});

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      trpc,
      queryClient,
    },
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        <Spinner />
      </div>
    ),
    Wrap: function WrapComponent({ children }) {
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      );
    },
  });

  return router;
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
