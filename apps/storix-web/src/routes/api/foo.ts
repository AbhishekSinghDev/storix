import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/foo").methods({
  GET: ({ request }) => {
    return Response.json({
      message: "Hello from the Foo API!",
      method: request.method,
      url: request.url,
    });
  },
});
