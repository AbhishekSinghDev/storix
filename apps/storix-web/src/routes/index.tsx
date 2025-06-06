import { createFileRoute } from "@tanstack/react-router";

import { ModeToggle } from "~/-components/shared/mode-toggle";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div>
      <ModeToggle />
    </div>
  );
}
