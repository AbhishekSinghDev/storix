"use client";

import OAuthButton from "./oauth-button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import type { TStatus } from "@/lib/types";

type GithubAuthButtonProps = {
  purpose: "login" | "register";
  setStatus: (v: TStatus) => void;
};

const GithubAuthButton = ({ setStatus, purpose }: GithubAuthButtonProps) => {
  const handleGithubAuth = async () => {
    try {
      setStatus("loading");

      const result = await signIn("github", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setStatus("error");
        toast.error(
          result.error === "OAuthSignin"
            ? "Authentication failed"
            : result.error,
        );
        return;
      }

      setStatus("success");
      toast.success("Authentication successful");
    } catch (err) {
      setStatus("error");
      console.error("GitHub authentication error:", err);
      toast.error("Failed to authenticate with GitHub");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <OAuthButton
      alt="github"
      icon="/icons/github.svg"
      text={purpose === "login" ? "Login with Github" : "Continue with Github"}
      iconClassName="size-6"
      onClick={handleGithubAuth}
    />
  );
};

export default GithubAuthButton;
