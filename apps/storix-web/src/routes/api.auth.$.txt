import { createAPIFileRoute } from "@tanstack/react-start/api";

import { auth } from "~/utils/auth";

export const Route = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }) => {
    return auth.handler(request);
  },
  POST: ({ request }) => {
    return auth.handler(request);
  },
});

// function RouteComponent() {
//   return <div>Hello "/api/auth"!</div>
// }
