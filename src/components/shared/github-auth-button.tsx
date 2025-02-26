"use client";

import { useRouter } from "next/navigation";
import OAuthButton from "./oauth-button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import type { TStatus } from "@/lib/types";

type GithubAuthButtonProps = {
  purpose: "login" | "register";
  setStatus: (v: TStatus) => void;
};

const GithubAuthButton = ({ setStatus, purpose }: GithubAuthButtonProps) => {
  const router = useRouter();

  const handleGithubAuth = async () => {
    try {
      setStatus("loading");
      const res = await signIn("github");

      if (res?.ok) {
        setStatus("success");
        router.push("/");
        toast.success("Authentication Successfull");
        return;
      }

      if (!res?.ok || !res.error) {
        setStatus("error");
        toast.error("Unauthorized!");
        return;
      }

      setStatus("error");
      toast.error("Something unexpected happend!");
    } catch (err) {
      setStatus("error");
      console.error(err);
      toast.error("Internal Server Error");
    }
  };

  return (
    <OAuthButton
      alt="github"
      icon="/icons/github.svg"
      text={purpose === "login" ? "Login with Github" : "Continue with Github"}
      iconClassName="size-6"
      onClick={async () => await handleGithubAuth()}
    />
  );
};

export default GithubAuthButton;
