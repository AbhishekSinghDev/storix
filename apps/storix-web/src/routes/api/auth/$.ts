import { createServerFileRoute } from "@tanstack/react-start/server";

import { auth } from "~/utils/auth";

//@ts-expect-error
export const Route = createServerFileRoute().methods({
  GET: ({ request }) => {
    console.log("sent req to server");
    return auth.handler(request);
  },
  POST: ({ request }) => {
    return auth.handler(request);
  },
});

// function RouteComponent() {
//   return <div>Hello "/api/auth"!</div>
// }
