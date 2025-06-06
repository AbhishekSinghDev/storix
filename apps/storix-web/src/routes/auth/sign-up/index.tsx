import { createFileRoute } from "@tanstack/react-router";

import SignUpForm from "~/components/auth/sign-up-form";

export const Route = createFileRoute("/auth/sign-up/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign up for your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please enter your details to create an account.
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
