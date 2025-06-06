import { createFileRoute, Link } from "@tanstack/react-router";

import { env } from "~/env";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className={`p-2`}>
      <div className={`text-lg`}>Welcome Home!</div>
      <hr className={`my-2`} />
      <Link
        to="/dashboard/posts/$postId"
        params={{
          postId: "3",
        }}
        className={`rounded-full bg-blue-500 px-2 py-1 text-xs text-white`}
      >
        2 New Invoice
      </Link>
      <hr className={`my-2`} />
      <div className={`max-w-xl`}>
        {/* {JSON.stringify(env, null, 2)}
         */}
        As you navigate around take note of the UX. It should feel
        suspense-like, where routes are only rendered once all of their data and
        elements are ready.
        <hr className={`my-2`} />
        To exaggerate async effects, play with the artificial request delay
        slider in the bottom-left corner.
        <hr className={`my-2`} />
        The last 2 sliders determine if link-hover preloading is enabled (and
        how long those preloads stick around) and also whether to cache rendered
        route data (and for how long). Both of these default to 0 (or off).
        {env.VITE_PUBLIC_NAME}
      </div>
    </div>
  );
}
