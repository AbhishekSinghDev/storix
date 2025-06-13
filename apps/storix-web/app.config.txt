import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import tsConfigPaths from "vite-tsconfig-paths";

export default createApp({
  server: {
    preset: "node-server", // change to 'netlify' or 'bun' or anyof the supported presets for nitro (nitro.unjs.io)

    experimental: {
      asyncContext: true,
    },
  },
  routers: [
    {
      type: "static",
      name: "public",
      dir: "./public",
    },
    {
      type: "http",
      name: "trpc",
      base: "/trpc",
      handler: "./trpc-server.handler.ts",
      target: "server",
      plugins: () => [],
    },
    {
      type: "spa",
      name: "client",
      handler: "./index.html",

      target: "browser",
      plugins: () => [
        TanStackRouterVite({
          target: "react",
          autoCodeSplitting: true,

          routesDirectory: "./src/routes",
          generatedRouteTree: "./src/routeTree.gen.ts",
        }),
        reactRefresh(),
        tsConfigPaths({
          projects: ["./tsconfig.json"],
        }),
      ],
    },
  ],
});
